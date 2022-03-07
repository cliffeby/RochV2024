import { Injectable } from '@angular/core';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { BehaviorSubject } from 'rxjs';
import { Results } from '../models/results';
import { Scorecard } from '../models/scorecard';
import { ScorecardsService } from './scorecards.service';
import { ScoringUtilitiesService } from './scoring-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class StrokesService {
  scorecard: Scorecard;
  results: Results[] = [];

  constructor(
    public _scorecardsService: ScorecardsService,
    public _scoringUtilService: ScoringUtilitiesService
  ) {}

  public matchResultSubject = new BehaviorSubject(null); //Shaped datastore for the dataSource table
  public loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  newData(data) {
    this.matchResultSubject.next(data); //Update the dataSource table
  }

  createDataSource(scs) {
    //Shapes the data for the dataSource table.  scs is the scores:Scores[] for the match
    console.log('scs', scs);
    for (let i = 0; i < scs.length; i++) {
      this._scorecardsService
        .getScorecard(scs[i].scorecardId) //Get the scorecard in the Score record for the match.  Players are on the same course, but may play different tees
        .subscribe((data) => {
          this.scorecard = data;
          this.results[i] = new Results(); //Create a consolidated data sources of scores, scorecard and match data to determine results.
          this.results[i].scores = scs[i].scores; // Players scores for each hole.
          this.results[i].scores = this.fb18(scs[i].scores, scs[i].handicap); // Add front 9 and back 9 and 18 totals to the array at [18], [19] and [20]
          this.results[i]._id = scs[i].playerId;
          this.results[i].name = scs[i].name; //Player name
          this.results[i].score = scs[i].score; //Player total score
          this.results[i].course = data.scorecard.courseTeeName; //tee name
          this.results[i].rating = data.scorecard.rating; //Tee rating
          this.results[i].slope = data.scorecard.slope; //Tee slope
          this.results[i].par = data.scorecard.par; //Tee par
          this.results[i].pars = []; //Init Hole pars
          this.results[i].pars = this.stringToNumArray(
            data.scorecard.parInputString
          );
          this.results[i].pars = this.fb18(this.results[i].pars, 0);
          this.results[i].handicaps = []; //Init Hole handicaps
          this.results[i].handicaps = this.stringToNumArray(
            data.scorecard.hCapInputString
          );
          this.results[i].usgaIndex = scs[i].usgaIndex; //Player USGA Index
          this.results[i].handicap = scs[i].handicap; //Player tee handicap calculated from USGA Index when match was created
          this.results[i].scoreColor = []; //Player score color used to highlight ESA scores
          this.results[i].scores[22] = this.results[i].scores[20];
          this.ESAColorNets(i);

          if ((i = scs.length - 1)) {
            //When all players have been processed, create the net scores.  If holds the newData() method call until getScorecard subscription completes
            this.newData(this.interWeaveNets(this.netTeamScores(scs)));
          }
        });
    }
  }

  interWeaveNets(a: Results[]) {
    let array = [];
    for (let i = 0; i < a.length - 1; i++) {
      array.push(a[i]);
      array.push(a[i + 1]);
      array.push({
        scores: a[i].oneBallNet,
        name: 'OneBall',
        scoreColor: this.initArrayX(22, 'DCDCDC'),
      });
      if (i % 4 == 0) {
        array.push({
          scores: this.teamMatch(a, a, i / 4),
          name: 'Match',
          scoreColor: this.initArrayX(22, 'ADFF2F'),
        });
      }
      i++;
      console.log('Array', array);
    }

    return array;
  }
  netTeamScores(scs): Results[] {
    let lowCap: number;
    let netTeamScores: Results[] = [];
    let netTeamScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {
      if (i % 4 == 0) {
        lowCap = 999;
        for (let j = i; j < i + 4; j++) {
          console.log('lowCap1', j, lowCap);
          if (scs[j].handicap < lowCap) {
            lowCap = scs[j].handicap;
            console.log('lowCap2', j, lowCap);
          }
        }
      }
      const temp = this.teamNets(scs, i, lowCap);
      let sColor = [];
      //
      if (this.results[i].name != 'OneBall') {
        sColor = this.results[i].scoreColor;
      } else {
        sColor = [];
      }
      netTeamScore = {
        name: this.results[i].name,
        scores: temp[0],
        scoreColor: sColor,
        nets1: temp[1],
        nets2: temp[2],
      };
      console.log('nets i', i, netTeamScore);
      netTeamScores.push(netTeamScore);
      //
    }

    for (let i = 0; i < netTeamScores.length; i++) {
      netTeamScores[i].oneBallNet = [];
      netTeamScores[i].betterBallNet = [];
      for (let j = 0; j < 18; j++) {
        netTeamScores[i].oneBallNet[j] = Math.min(
          netTeamScores[i].nets2[j],
          netTeamScores[i + 1].nets2[j]
        );
        netTeamScores[i].betterBallNet[j] = Math.min(
          netTeamScores[i].nets1[j],
          netTeamScores[i + 1].nets1[j]
        );
      }
      netTeamScores[i].oneBallNet = this.fb18(
        netTeamScores[i].oneBallNet,
        this.results[i].par
      );
      netTeamScores[i].betterBallNet = this.fb18(
        netTeamScores[i].betterBallNet,
        this.results[i].par
      );
      console.log('netTeamScores[i]', netTeamScores[i], netTeamScores[i + 1]);

      i++;
    }
     this.loadingSubject.next(false); //.complete() did not work
    return netTeamScores;
  }
  initArrayX(x: number, v: any): any[] {
    let temp: any[] = [];
    for (let i = 0; i < x; i++) {
      temp.push(v);
    }
    return temp;
  }

  fb18(arr, hcap) {
    //Sums the scores on the front 9 and back 9 and adds them to the array at [18] and [19]
    let front: number = 0;
    let back: number = 0;
    for (let i = 0; i < 9; i++) {
      front = front + Number(arr[i]);
    }
    for (let i = 9; i < 18; i++) {
      back = back + Number(arr[i]);
    }
    arr[18] = front;
    arr[19] = back;
    arr[20] = front + back;
    arr[21] = arr[20] - hcap;
    return arr;
  }

  ESAColorNets(j) {
    let nets: any[] = [];
    let net: any;

    for (let i = 0; i < 18; i++) {
      if (
        this.results[j].scores[i] - this.ESAAdjust(j, i) >
        this.results[j].pars[i] + 2
      ) {
        this.results[j].scoreColor[i] = 'ff0000';
        this.results[j].scores[22] =
          this.results[j].scores[22] -
          (this.results[j].scores[i] -
            this.ESAAdjust(j, i) -
            this.results[j].pars[i] -
            2);
      } else {
        this.results[j].scoreColor[i] = 'black';
      }
    }
    console.log('this.results[j].scoreColor', this.results[j].scoreColor);
  }
  ESAAdjust(j, i): number {
    let x: number = 0;
    if (this.results[j].handicap >= this.results[j].handicaps[i]) {
      x = 1;
    }
    if (this.results[j].handicap >= this.results[j].handicaps[i] + 18) {
      x = 2;
    }
    return x;
  }
  nets(scs, j, lowCap): any[] {
    let nets: any[] = [];
    let net: any;
    for (let i = 0; i < 18; i++) {
      if (this.results[j].handicap - lowCap >= this.results[j].handicaps[i]) {
        net = '*';
        if (
          this.results[j].handicap - lowCap - 18 >=
          this.results[j].handicaps[i]
        ) {
          net = net + '*';
        }
      } else {
        net = '';
      }
      nets.push(net);
    }
    console.log('netScores2', nets);
    return nets;
  }
  teamNets(scs, j, lowCap): any[] {
    let nets3: any[] = [];
    let nets1: any[] = [];
    let nets2: any[] = [];
    let net: any;
    let net2: any;
    let net3: any;
    console.log('nets counter', j, this.results[j]);
    for (let i = 0; i < 22; i++) {
      if (this.results[j].handicap - lowCap >= this.results[j].handicaps[i]) {
        net =
          this.results[j].scores[i].toString() +
          '/' +
          (this.results[j].scores[i] - 1).toString();
        net2 = this.results[j].scores[i] - 1;
        if (
          this.results[j].handicap - lowCap - 18 >=
          this.results[j].handicaps[i]
        ) {
          net =
            this.results[j].scores[i].toString() +
            '//' +
            (this.results[j].scores[i] - 2).toString();
          net2 = this.results[j].scores[i] - 2;
        }
      } else {
        net = this.results[j].scores[i].toString();
        net2 = this.results[j].scores[i];
      }
      net3 = this.results[j].scores[i];
      if (this.results[j].handicap >= this.results[j].handicaps[i]) {
        net = net + '*';
        net3 = this.results[j].scores[i] - 1;
        if (this.results[j].handicap - 18 >= this.results[j].handicaps[i]) {
          net = net + '*';
          net3 = this.results[j].scores[i] - 2;
        }
      }
      nets1.push(net);
      nets2.push(net2);
      nets3.push(net3);
    }
    nets1.push(this.results[j].scores[22]);
    console.log('postScore', this.results[j].scores[22]);
    return [nets1, nets2, nets3];
  }
  stringToNumArray(aString: any) {
    let aNumArray = [];
    let bb = aString.split(',');
    for (let i = 0; i < bb.length; i++) {
      aNumArray.push(Number(bb[i]));
    }
    return this.fb18(aNumArray, 0);
  }
  createHeaders(scs) {
    console.log('scs', scs);
    let headers = [{ name: '', scores: [], scoreColor: [] }];

    this._scorecardsService
      .getScorecard(scs[0].scorecardId)
      .subscribe((data) => {
        this.scorecard = data;
        console.log('createHeadersScorecards', data);
        headers.push({
          name: 'Pars',
          scores: this.stringToNumArray(data.scorecard.parInputString),
          scoreColor: this.initArrayX(22, 'DCDCDC'),
        });
        headers.push({
          name: 'HCap',
          scores: this.stringToNumArray(data.scorecard.hCapInputString),
          scoreColor: this.initArrayX(22, 'DCDCDC'),
        });
      });
    headers = headers.slice(1, 2);
    console.log('createHeaders', headers);
    return headers;
  }
  teamMatch(teamA, teamB, j) {

    let nassau = this._scoringUtilService.fourBallAutoNassau(teamA, j, 0);
    const front =
      nassau[8].split('+').length - 1 - (nassau[8].split('-').length - 1); //counts the number of +'s  and -'sat nine to determine the front differential
    const back =
      nassau[17].split('+').length - 1 - (nassau[17].split('-').length - 1); //counts the number of +'s and -'s at eighteen to determine the back differential
    const tempPress = this.matchPress(teamA, 0); //result of the 18-hole press
    let press = 0;
    if (tempPress > 0) {
      press = 1;
    } else if (tempPress < 0) {
      press = -1;
    } else {
      press = 0;
    }
    nassau[18] = front.toString() + 'x'; // nassau[18,19, and 20] are front, back and 18 results]
    nassau[19] = back.toString() + 'x/' + tempPress.toString() + 'x';
    nassau[20] = (front + back + press).toString() + 'x';
    console.log('nassauF', nassau);

    return nassau;
  }
  // betterBall(A, B, i, j) {
  //   let betterBall: number;
  //   console.log('betterBall', A, B, i, j);
  //   betterBall = A[j * 4].betterBallNet[i] - A[j * 4 + 2].betterBallNet[i];

  //   return betterBall;
  // }
  matchPress(A, k) {
    let matchScore: number = 0;
    let matchScorePress: number = 0;
    let i = 0;
    while (Math.abs(matchScore) <= 17 - i) {
      if (A[k].betterBallNet[i] > A[k + 2].betterBallNet[i]) {
        matchScore--;
      }
      if (A[k].betterBallNet[i] < A[k + 2].betterBallNet[i]) {
        matchScore++;
      }
      i++;
    }

    const p = Math.abs(matchScore);
    for (let i = 17 - p + 2; i < 18; i++) {
      if (A[k].betterBallNet[i] > A[k + 2].betterBallNet[i]) {
        matchScorePress--;
      }
      if (A[k].betterBallNet[i] < A[k + 2].betterBallNet[i]) {
        matchScorePress++;
      }
    }

    return matchScorePress;
  }
}
