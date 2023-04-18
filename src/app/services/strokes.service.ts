import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Results } from '../models/results';
import { Score } from '../models/score';
import { Scorecard } from '../models/scorecard';
import { ScorecardsService } from './scorecards.service';
import { ScoringUtilitiesService } from './scoring-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class StrokesService {
  //A service that determines how hadicap differentials are appled by holes,
  scorecard: Scorecard; //adjusts the scores for handicap, ESA, and determines results of matches.
  results: Results[] = []; //Results is a datablob of all data needed to determine results.
  //Only two properties are required, name and scores[].

  constructor(
    public _scorecardsService: ScorecardsService,
    public _scoringUtilService: ScoringUtilitiesService
  ) {}

  public matchResultSubject = new BehaviorSubject(null); //Shaped datastore for the dataSource table
  public loadingSubject = new BehaviorSubject<boolean>(false); //Is data being loaded and calculated?

  public loading$ = this.loadingSubject.asObservable(); //

  newData(data:any) {
    this.matchResultSubject.next(data); //Function to update the dataSource table
  }

  createDataSource(scs: Score[]) {
    //Shapes the data for the dataSource table.  scs is the scores:Scores[] for the match
    for (let i = 0; i < scs.length; i++) {
      //length is the number of players in the match
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
          this.results[i].scores[22] = this.results[i].scores[20]; //Hold gross score until ESAs are calculated
          this.ESAColorNets(i); //Identify ESA scores and color them red.

          if ((i = scs.length - 1)) {
            //When all players have been processed, create the net scores.  This holds the newData() method call until getScorecard subscription completes
            this.newData(this.interWeaveNets(this.netTeamScores(scs))); //Players scores, oneball and match results are integrated into a final score record.
          }
        });
    }
  }

  interWeaveNets(a: Results[]) {
    //Organizes the rows in the dataSource table for a fourball match
    let array:any[] = [];
    for (let i = 0; i < a.length - 1; i++) {
      //Players are pre-arranged by team and foursome Row A1, Row B1 vs Row A2, Row B2
      array.push(a[i]); //Player A1 but first two rows of DataSource are headers of Par and Stroke Index for the hole
      array.push(a[i + 1]); //Player B1
      array.push({
        //One Ball Score - betterball net of A and B
        scores: a[i].oneBallNet,
        name: 'OneBall',
        scoreColor: this._scoringUtilService.initArrayX(22, 'DCDCDC'), //Color all 22 oneball cells gray
      });
      if (i % 4 == 0) {
        //After four players, add a row for the match result
        array.push({
          scores: this.teamMatch(a, i / 4), //Team match result for foursome i in a
          name: 'Match',
          scoreColor: this._scoringUtilService.initArrayX(22, 'ADFF2F'), //Color 22 match scoring green
        });
      }
      if (i % 2 ==0  && i % 4 != 0){
        array.push({
          // scores: this.teamMatch(a, 0), //Team match result for foursome i in a
          scores: [,,,,,,,,,,,,,,,,,,,,,,],
          name: '',
          scoreColor: this._scoringUtilService.initArrayX(23, '000000'), //Color black
        });
      }
      i++; //Advance to players A2 and B2...
    }
    return array;
  }

  netTeamScores(scs: Score[]): Results[] {
    //Calculates the net scores for each team in a fourball match.
    let lowCap: number; //Lowest handicap of the four players
    let netTeamScores: Results[] = [];
    let netTeamScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {
      //For each foursome in the match, find the low cap.
      if (i % 4 == 0) {
        lowCap = 999;
        for (let j = i; j < i + 4; j++) {
          if (scs[j].handicap < lowCap) {
            lowCap = scs[j].handicap;
          }
        }
      }
      const temp = this.teamNets(i, lowCap); //Calculate the net scores for each team in a foursome.  Temp is an array of results.
      let sColor: string[] = [];
      if (this.results[i].name != 'OneBall') {
        //Do not apply ESA red color to OneBall score
        sColor = this.results[i].scoreColor;
      } else {
        sColor = [];
      }
      netTeamScore = {
        //Create a new Results object for the team score
        name: this.results[i].name,
        scores: temp[0], //temp[0] is the net scores for the player adjusted by the lowest handicap in foursome. String value with / or // to show strokes
        scoreColor: sColor, //temp[0] also indicates oneBall strokes where granted.  * or ** to show strokes
        nets1: temp[1], //temp[1] is the net scores for the player adjusted by the lowest handicap in foursome. Number value.
        nets2: temp[2], //temp[2] is the net scores for the player adjusted by course handicaps. Number value.
      };
      netTeamScores.push(netTeamScore); //Add the team score to the array of team scores
    }

    for (let i = 0; i < netTeamScores.length; i++) {
      //For each team, get the better ball scores
      netTeamScores[i].oneBallNet = []; // oneBall is the player's net score using course stroke index
      netTeamScores[i].betterBallNet = []; //  betterBall is net using course lowCap in foursome
      for (let j = 0; j < 18; j++) {
        //Compare A player to B player and pick the lowest net score
        netTeamScores[i].oneBallNet[j] = Math.min(
          //Use net2 for OneBall - using course stroke index
          netTeamScores[i].nets2[j],
          netTeamScores[i + 1].nets2[j]
        );
        netTeamScores[i].betterBallNet[j] = Math.min(
          //Use net1 for betterBall - using fourball lowCap
          netTeamScores[i].nets1[j],
          netTeamScores[i + 1].nets1[j]
        );
      }
      netTeamScores[i].oneBallNet = this.fb18(
        //Add the front, back and 18 hole net scores to the team's results
        netTeamScores[i].oneBallNet,
        this.results[i].par
      );
      netTeamScores[i].betterBallNet = this.fb18(
        netTeamScores[i].betterBallNet,
        this.results[i].par
      );
      console.log('netTeamScores[i]', netTeamScores[i], netTeamScores[i + 1]);

      i++; //Advance to the next team
    }
    this.loadingSubject.next(false); //   When all players have been processed, stop the spinner
    return netTeamScores; //   Returns object with properties betterBallNet[22], name w/ handicap, nets1[22], nets2[22],                                                     // oneBallNet[22], scoreColor[18], scores[23]
  }

  fb18(arr:any[], hcap:number, flag?: boolean) {
    //Sums the scores on the front, back, and 18 and adds them to the array at [18], [19], [20]
    let front: number = 0;
    let back: number = 0;
    for (let i = 0; i < 9; i++) {
      front = front + Number(arr[i]);
    }
    for (let i = 9; i < 18; i++) {
      back = back + Number(arr[i]);
    }
    if (!flag) {
      //If flag is true, do not add the front, back, and 18 hole scores to the array.  Needed for the Yards and Hcap rows
      arr[18] = front;
      arr[19] = back;
      arr[20] = front + back;
      arr[21] = arr[20] - hcap;
    } //Net score minus handicap before ESA adjustment
    else {
      arr[18] = '.'; // A '.' used to fill table cell.  Otherwise a space is assumed to be an empty cell.
      arr[19] = '.';
      arr[20] = '.';
      arr[21] = '.';
    }
    return arr;
  }

  //Up todate?
  ESA(player:any) {
    let scoresToPost = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    // const grossScores = player.scores;
    const hCaps: number[] = player.scHCapInputString
      .split(',')
      .map(function (item:string) {
        return parseInt(item, 10);
      });
    const pars: number[] = player.scParInputString
      .split(',')
      .map(function (item:string) {
        return parseInt(item, 10);
      });
    const par = pars.reduce((acc, cv) => acc + cv, 0);
    const courseHandicap = Math.round(
      (player.usgaIndex * player.scSlope) / 113 + (player.scRating - par)
    );
    player.scores.map((item:number, index:number) => {
      scoresToPost[index] = item;
      if (item - pars[index] >= 3) {
        scoresToPost[index] = pars[index] + 3;
      }
      if (item - pars[index] > 2 && hCaps[index] > courseHandicap) {
        scoresToPost[index] = pars[index] + 2;
      }
      if (item - pars[index] <= 2) {
        scoresToPost[index] = item;
      }
    });
    console.log('STP', scoresToPost, courseHandicap);
    return scoresToPost;
  }

  getHoleIndices(player:any) {
    if (player.hasOwnProperty('scorecards')) {
      console.log('PPP', player.scorecards, player.scorecardId, player.name);
      player.scorecards.forEach((sc:any) => {
        console.log(
          'OOO',
          sc._id,
          player.scorecardId,
          player.scHCapInputString
        );
        if (sc._id == player.scorecardId) {
          return player.scHCapInputString;
        }
      });
    }
  }

  ESAColorNets(j:number) {
    //Sets the color of a hole score to red if it needs to be ESA adjusted
    // let nets: Results[] = [];
    // let net: Results;

    for (let i = 0; i < 18; i++) {
      if (
        this.results[j].scores[i] - this.ESAAdjust(j, i) > //Find scores that are 3 strokes or more over the par plus player's index adjustment
        this.results[j].pars[i] + 2
      ) {
        this.results[j].scoreColor[i] = 'ff0000'; //Set the color to red
        this.results[j].scores[22] = //Keep track of the number of ESA adjusted strokes for susequent posting
          this.results[j].scores[22] -
          (this.results[j].scores[i] -
            this.ESAAdjust(j, i) -
            this.results[j].pars[i] -
            2);
      } else {
        this.results[j].scoreColor[i] = 'black';
      }
    }
  }

  ESAAdjust(j:number, i:number): number {
    //Calculates the ESA adjustment for a hole score.  Players with hanicaps over 18 can take quads on those holes
    let x: number = 0;
    if (this.results[j].handicap >= this.results[j].handicaps[i]) {
      x = 1;
    }
    if (this.results[j].handicap >= this.results[j].handicaps[i] + 18) {
      x = 2;
    }
    return x;
  }

  teamNets(j:number, lowCap:number): any[] {
    //Calculate where strokes are granted for the fourball match (/) and to course par (*)
    let nets3: any[] = []; //nets3 add an * or ** to a score if the player has a handicap over hole's stroke index.  A string value.
    let nets1: any[] = []; //nets1 is the net score adjusted by the lowest handicap in foursome.  A numeric value.
    let nets2: any[] = []; //nets2 is the gross/net score adjusted by match handicaps.  A string value.
    let net: any; // same as above
    let net2: any;
    let net3: any;
    console.log('results', j, this.results);

    for (let i = 0; i < 22; i++) {
      if (this.results[j] !== undefined) {
        if (this.results[j].handicap - lowCap >= this.results[j].handicaps[i]) {
          net =
            this.results[j].scores[i].toString() + // A player getting a stroke from the lowCap player in the match
            '/' +
            (this.results[j].scores[i] - 1).toString();
          net2 = this.results[j].scores[i] - 1;
          if (
            this.results[j].handicap - lowCap - 18 >=
            this.results[j].handicaps[i]
          ) {
            net =
              this.results[j].scores[i].toString() + // A player getting two strokes from the lowCap player in the match
              '//' +
              (this.results[j].scores[i] - 2).toString();
            net2 = this.results[j].scores[i] - 2;
          }
        } else {
          net = this.results[j].scores[i].toString();
          net2 = this.results[j].scores[i];
        }
        net3 = this.results[j].scores[i]; //Now add * to indicate a stroke based on course index.
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
    nets1.push(this.results[j].scores[22]); //ESA adjusted score to post
    return [nets1, nets2, nets3];
  }

  stringToNumArray(aString: string, flag?: boolean) {
    //Parse pars, handicaps and yards from string to number array
    let aNumArray = [];
    let bb = aString.split(',');
    for (let i = 0; i < bb.length; i++) {
      aNumArray.push(Number(bb[i]));
    }
    return this.fb18(aNumArray, 0, flag); //Include front ,back, and 18 totals.  Do not appy a players handicap
  }

  createHeaders(scs:any) {
    //Create headers rows for the table
    let headers = [{ name: '', scores: [], scoreColor: [] }]; //Header needs three properties: name, scores/values, and scoreColor
    this._scorecardsService
      .getScorecard(scs[0].scorecardId) //Get the scorecard for the match to show hole pars and stroke indices
      .subscribe((data) => {
        this.scorecard = data;
        let holeName: any = [...Array(18).keys()].map((i) => i + 1); //Create an array of hole numbers 1-18
        holeName.push('F'); //Push on labels for front, back,...
        holeName.push('B');
        holeName.push('Gross');
        holeName.push('Net');
        holeName.push('Post');

        console.log('createHeadersScorecards', holeName, data);
        headers.push({
          //Row 1 is the hole name/number
          name: 'Holes',
          scores: holeName,
          scoreColor: [''], //Background color set in  css
        });
        headers.push({
          name: 'Pars', //Row 2 is the Par value for each hole
          scores: this.stringToNumArray(data.scorecard.parInputString),
          scoreColor: [''], //Background color set in css
        });
        headers.push({
          name: 'HCap', //Row 3 is the stroke index for each hole
          scores: this.stringToNumArray(data.scorecard.hCapInputString, true), //true flag indicates to that totals for front, back, and 18 are not to be included
          scoreColor: [''], //Background color set in css
        });
      });
    return headers;
  }

  teamMatch(foursome:any, j:number) {
    //Create a row that shows the fourball match status.  Assume auto presses when two down and 18-hole press when closed out
    let nassau = this._scoringUtilService.fourBallAutoNassau(foursome, j, 0); //Utility to calculate the fourball match status hole by hole
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
    nassau[18] = front.toString() + 'x'; // nassau[18,19, and 20] are front, back and 18 number of bets won or lost
    nassau[19] = back.toString() + 'x/' + tempPress.toString() + 'x'; // nassau[18,19,] are front, back with back showing the 18 hole press result
    nassau[20] = (front + back + press).toString() + 'x'; //Number of bets won or lost 
    console.log('nassauF', nassau);

    return nassau;
  }

  matchPress(A:any[], k:number) {
    //Calculate the 18-hole press result A is the array of all scores inthe match k is the index of the player
    //  Assumes players are arranged in foursomes
    let matchScore: number = 0;
    let matchScorePress: number = 0;
    let i = 0; //Hole counter
    while (Math.abs(matchScore) <= 17 - i) {
      //Track match status after each hole
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
        //If match is closed out, start a press
        matchScorePress--;
      }
      if (A[k].betterBallNet[i] < A[k + 2].betterBallNet[i]) {
        matchScorePress++;
      }
    }
    return matchScorePress;
  }
}
