import { Injectable } from '@angular/core';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { BehaviorSubject } from 'rxjs';
import { Results } from '../models/results';
import { Score } from '../models/score';
import { Scorecard } from '../models/scorecard';
import { ScorecardsService } from './scorecards.service';
import { ScoringUtilitiesService } from './scoring-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class StrokesService {   //A service that determines how hadicap differentials are appled by holes,
  scorecard: Scorecard;         //adjusts the scores for handicap, ESA, and determines results of matches.
  results: Results[] = [];      //Results is a datablob of all data needed to determine results.
                                //Only two properties are required, name and scores[].

  constructor(
    public _scorecardsService: ScorecardsService,
    public _scoringUtilService: ScoringUtilitiesService
  ) {}

  public matchResultSubject = new BehaviorSubject(null); //Shaped datastore for the dataSource table
  public loadingSubject = new BehaviorSubject<boolean>(false); //Is data being loaded and calculated?

  public loading$ = this.loadingSubject.asObservable(); //

  newData(data) {
    this.matchResultSubject.next(data); //Function to update the dataSource table
  }

  createDataSource(scs:Score[]) {
    //Shapes the data for the dataSource table.  scs is the scores:Scores[] for the match
    for (let i = 0; i < scs.length; i++) {  //length is the number of players in the match
      this._scorecardsService
        .getScorecard(scs[i].scorecardId) //Get the scorecard in the Score record for the match.  Players are on the same course, but may play different tees
        .subscribe((data) => {
          this.scorecard = data;
          this.results[i] = new Results(); //Create a consolidated data sources of scores, scorecard and match data to determine results.
          this.results[i].scores = scs[i].scores; // Players scores for each hole.
          this.results[i].scores = this.fb18(scs[i].scores, scs[i].handicap); // Add front 9 and back 9 and 18 totals to the array at [18], [19] and [20]
          // this.results[i]._id = scs[i].playerId; //Not used
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
          this.results[i].scores[22] = this.results[i].scores[20];//Hold gross score until ESAs are calculated
          this.ESAColorNets(i);  //Identify ESA scores and color them red.

          if ((i = scs.length - 1)) {
            //When all players have been processed, create the net scores.  This holds the newData() method call until getScorecard subscription completes
            this.newData(this.interWeaveNets(this.netTeamScores(scs)));  //Players scores, oneball and match results are integrated into a final score record.
          }
        });
    }
  }

  interWeaveNets(a: Results[]) {  //Organizes the rows in the dataSource table for a fourball match
    let array = [];
    for (let i = 0; i < a.length - 1; i++) { //Players are pre-arranged by team and foursome Row A1, Row B1 vs Row A2, Row B2
      array.push(a[i]); //Player A1 but first two rows of DataSource are headers of Par and Stroke Index for the hole
      array.push(a[i + 1]); //Player B1
      array.push({
        //One Ball Score - betterball net of A and B
        scores: a[i].oneBallNet,
        name: 'OneBall',
        scoreColor: this._scoringUtilService.initArrayX(22, 'DCDCDC'), //Color all 22 oneball cells gray
      });
      if (i % 4 == 0) {  //After four players, add a row for the match result
        array.push({
          scores: this.teamMatch(a, i / 4), //Team match result for foursome i in a
          name: 'Match',
          scoreColor: this._scoringUtilService.initArrayX(22, 'ADFF2F'), //Color 22 match scoring green
        });
      }
      i++;  //Advance to players A2 and B2...
    }
    return array;
  }

  netTeamScores(scs: Score[]): Results[] {  //Calculates the net scores for each team in a fourball match.  
    let lowCap: number;                     //Lowest handicap of the four players
    let netTeamScores: Results[] = [];
    let netTeamScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {  //For each foursome in the match, find the low cap.
      if (i % 4 == 0) {
        lowCap = 999;
        for (let j = i; j < i + 4; j++) {
          if (scs[j].handicap < lowCap) {
            lowCap = scs[j].handicap;
          }
        }
      }
      const temp = this.teamNets( i, lowCap);  //Calculate the net scores for each team in a foursome.  Temp is an array of results.
      let sColor = [];
      if (this.results[i].name != 'OneBall') {  //Do not apply ESA red color to OneBall score
        sColor = this.results[i].scoreColor;
      } else {
        sColor = [];
      }
      netTeamScore = {                        //Create a new Results object for the team score
        name: this.results[i].name,
        scores: temp[0],                      //temp[0] is the net scores for the player adjusted by the lowest handicap in foursome. String value with / or // to show strokes
        scoreColor: sColor,                   //temp[0] also indicates oneBall strokes where granted.  * or ** to show strokes
        nets1: temp[1],                       //temp[1] is the net scores for the player adjusted by the lowest handicap in foursome. Number value.
        nets2: temp[2],                      //temp[2] is the net scores for the player adjusted by course handicaps. Number value.
      };
      netTeamScores.push(netTeamScore);    //Add the team score to the array of team scores
    }

    for (let i = 0; i < netTeamScores.length; i++) {   //For each team, get the better ball scores
      netTeamScores[i].oneBallNet = [];                 // oneBall is net using course stroke index
      netTeamScores[i].betterBallNet = [];              //  betterBall is net using course lowCap in foursome
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
      netTeamScores[i].oneBallNet = this.fb18(          //Calculate the front, back and 18 for scores
        netTeamScores[i].oneBallNet,
        this.results[i].par
      );
      netTeamScores[i].betterBallNet = this.fb18(
        netTeamScores[i].betterBallNet,
        this.results[i].par
      );
      console.log('netTeamScores[i]', netTeamScores[i], netTeamScores[i + 1]);

      i++;                                              //Advance to the next team
    }
     this.loadingSubject.next(false);                 //   When all players have been processed, stop the spinner
    return netTeamScores;                           //   Returns objet with properties betterBallNet[22], name w/ handicap, nets1[22], nets2[22],                                                     // oneBallNet[22], scoreColor[18], scores[23]
  }

  // initArrayX(x: number, v: any): any[] {          //Intialize an array of x elements with value v
  //   let temp: any[] = [];
  //   for (let i = 0; i < x; i++) {
  //     temp.push(v);
  //   }
  //   return temp;
  // }

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
  teamNets( j, lowCap): any[] {
    let nets3: any[] = [];
    let nets1: any[] = [];
    let nets2: any[] = [];
    let net: any;
    let net2: any;
    let net3: any;
    console.log('nets counter', j, this.results[j], this.results.length, lowCap);
    for (let i = 0; i < 22; i++) {
      if (this.results[j] !== undefined) {
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
          scoreColor: this._scoringUtilService.initArrayX(22, 'DCDCDC'),
        });
        headers.push({
          name: 'HCap',
          scores: this.stringToNumArray(data.scorecard.hCapInputString),
          scoreColor: this._scoringUtilService.initArrayX(22, 'DCDCDC'),
        });
      });
    headers = headers.slice(1, 2);
    console.log('createHeaders', headers);
    return headers;
  }

  teamMatch(foursome, j) {

    let nassau = this._scoringUtilService.fourBallAutoNassau(foursome, j, 0);
    const front =
      nassau[8].split('+').length - 1 - (nassau[8].split('-').length - 1); //counts the number of +'s  and -'sat nine to determine the front differential
    const back =
      nassau[17].split('+').length - 1 - (nassau[17].split('-').length - 1); //counts the number of +'s and -'s at eighteen to determine the back differential
    const tempPress = this.matchPress(foursome, 0); //result of the 18-hole press
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
