// import { splitClasses } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, forkJoin, merge, Observable, of } from 'rxjs';
import {
  bufferCount,
  concatAll,
  concatMap,
  flatMap,
  map,
  mergeAll,
  mergeMap,
  min,
  switchMap,
  take,
  tap,
  toArray,
} from 'rxjs/operators';
import { Results } from '../models/results';
import { Score } from '../models/score';
import { Scorecard } from '../models/scorecard';
import { ScorecardsService } from './scorecards.service';
import { ScoresService } from './scores.service';
import { ScoringUtilitiesService } from './scoring-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class Strokes1Service {
  //A service that determines how hadicap differentials are appled by holes,
  scorecard: Scorecard; //adjusts the scores for handicap, ESA, and determines results of matches.
  results: Results[] = []; //Results is a datablob of all data needed to determine results.
  //Only two properties are required, name and scores[].
  results$: Observable<Results[]>;
  constructor(
    public _scorecardsService: ScorecardsService,
    public _scoringUtilService: ScoringUtilitiesService,
    public _scoresService: ScoresService
  ) {}

  public matchResultSubject = new BehaviorSubject(null); //Shaped datastore for the dataSource table
  public loadingSubject = new BehaviorSubject<boolean>(false); //Is data being loaded and calculated?

  public loading$ = this.loadingSubject.asObservable(); //
  test$ = of([1, 2, 3]);
  newData(data:any) {
    this.matchResultSubject.next(data); //Function to update the dataSource table
  }
  obData(match:any) {
    const x = this._scoresService.getScoresByMatch(match._id).pipe(
      // bufferCount(4),
      concatMap((players) => {
        bufferCount(4);
        if (players.length > 0) {
          return forkJoin(
            players.map((player) => {
              return this._scorecardsService
                .getScorecard(player.scorecardId)
                .pipe(
                  map((scorecard) => {
                    const y = {
                      player: player.name,
                      tName: scorecard.scorecard.name,
                      handicap: player.handicap,
                      holeHCaps: this.stringToNumArray(
                        scorecard.scorecard.hCapInputString,
                        false
                      ),
                      holePars: this.stringToNumArray(
                        scorecard.scorecard.parInputString,
                        true
                      ),
                      holeName: this.createHeaders(),
                    };
                    return y;
                  }),
                  tap(console.log)
                );
            })
          );
        }
        // return of([]);
      }),

      // for each group we find the low and create
      // the new items with the low value and the diff
      map((buff) => {
        const low = buff.reduce((acc, curr) => {
          return acc < curr.handicap ? acc : curr.handicap;
        }, Infinity);
        return buff.map((v) => ({
          ...v,
          low,
          diff: v.handicap - low,
        }));
      }),

      // with mergeMap we flatten the groups of items
      // and emit each item
      mergeMap((buffEnriched) => buffEnriched)
    );
    return x;
  }
  combine(match) {
    return this.obData(match).pipe(
      // bufferCount will emit an array of arrays of items,
      // therefore creates the groups of four items
      bufferCount(4),
      // for each group we find the low and create
      // the new items with the low value and the diff
      map((buff) => {
        const low = buff.reduce((acc, curr) => {
          return acc < curr.handicap ? acc : curr.handicap;
        }, Infinity);
        return buff.map((v) => ({
          ...v,
          low,
          diff: v.handicap - low,
        }));
      }),

      // with mergeMap we flatten the groups of items
      // and emit each item
      mergeMap((buffEnriched) => buffEnriched),
      // if you want to emit an array rather than each single
      // object you add toArray
      toArray(),
      tap(console.log)
    );
  }

  stringToNumArray(aString: any, flag?: boolean) {
    //Parse pars, handicaps and yards from string to number array
    const aNumArray = [];
    if (flag) {
      aNumArray.push('Par');
    } else {
      aNumArray.push('HCap');
    }
    const bb = aString.split(',');
    for (let i = 0; i < bb.length; i++) {
      aNumArray.push(Number(bb[i]));
    }
    return this.fb18(aNumArray, flag); //Include front ,back, and 18 totals.  Do not appy a players handicap
  }

  fb18(arr:any[], flag?: boolean) {
    //Sums the scores on the front, back, and 18 and adds them to the array at [18], [19], [20]
    let front: number = 0;
    let back: number = 0;
    for (let i = 1; i < 10; i++) {
      front = front + Number(arr[i]);
    }
    for (let i = 10; i < 19; i++) {
      back = back + Number(arr[i]);
    }
    if (flag) {
      //If flag is true, do not add the front, back, and 18 hole scores to the array.  Needed for the Yards and Par rows
      // arr.insert(10, front);
      arr.splice(10, 0, front);
      arr[20] = back;
      arr[21] = front + back;
    } else {
      arr.splice(9, 0, '.');
      arr[20] = '.'; // A '.' used to fill table cell.  Otherwise a space is assumed to be an empty cell.
      arr[21] = '.';
    }
    return arr;
  }
  createHeaders() {
    //Create headers rows for the table
    let holeName: any = [...Array(18).keys()].map((i) => i + 1); //Create an array of hole numbers 1-18
    holeName.splice(0, 0, 'Name'); //Add the name column to the array
    holeName.splice(10, 0, 'F'); //Push on labels for front, back,...
    holeName.push('B');
    holeName.push('Gross');
    holeName.push('Net');
    holeName.push('Post');
    return holeName;
  }

  teamNets(j:any, lowCap:any): any[] {
    //Calculate where strokes are granted for the fourball match (/) and to course par (*)
    let nets3: any[] = []; //nets3 add an * or ** to a score if the player has a handicap over hole's stroke index.  A string value.
    let nets1: any[] = []; //nets1 is the net score adjusted by the lowest handicap in foursome.  A numeric value.
    let nets2: any[] = []; //nets2 is the gross/net score adjusted by match handicaps.  A string value.
    let net: any; // same as above
    let net2: any;
    let net3: any;
    console.log('results from teamnets', j, this.results);

    for (let i = 0; i < 18; i++) {
      if (this.results[j] !== undefined) {
        if (this.results[j].handicap - lowCap >= this.results[j].handicaps[i]) {
          net =
            // this.results[j].scores[i].toString() + // A player getting a stroke from the lowCap player in the match
            '/';
          // (this.results[j].scores[i] - 1).toString();
          // net2 = this.results[j].scores[i] - 1;
          if (
            this.results[j].handicap - lowCap - 18 >=
            this.results[j].handicaps[i]
          ) {
            net =
              // this.results[j].scores[i].toString() + // A player getting two strokes from the lowCap player in the match
              '//';
            // (this.results[j].scores[i] - 2).toString();
            // net2 = this.results[j].scores[i] - 2;
          }
        } else {
          net = '';
          // net2 = this.results[j].scores[i];
        }
        // net3 = this.results[j].scores[i]; //Now add * to indicate a stroke based on course index.
        if (this.results[j].handicap >= this.results[j].handicaps[i]) {
          net = net + '*';
          // net3 = this.results[j].scores[i] - 1;
          if (this.results[j].handicap - 18 >= this.results[j].handicaps[i]) {
            net = net + '*';
            // net3 = this.results[j].scores[i] - 2;
          }
        }
        nets1.push(net);
        // nets2.push(net2);
        // nets3.push(net3);
      }
    }
    // nets1.push(this.results[j].scores[22]); //ESA adjusted score to post
    return [nets1, nets2, nets3];
  }

  interWeaveNets(a: Results[]) {
    //Organizes the rows in the dataSource table for a fourball match
    let array = [];
    for (let i = 0; i < a.length - 1; i++) {
      //Players are pre-arranged by team and foursome Row A1, Row B1 vs Row A2, Row B2
      array.push(a[i]); //Player A1 but first two rows of DataSource are headers of Par and Stroke Index for the hole
      array.push(a[i + 1]); //Player B1
      array.push({
        //One Ball Score - betterball net of A and B
        scores: a[i].oneBallNet,
        name: 'OneBall',
      });
      if (i % 4 == 0) {
        //After four players, add a row for the match result
        array.push({
          scores:[], //Team match result for foursome i in a   MAY NEED []// scores: [], //Team match result for foursome i in a   MAY NEED []
          
          name: 'Match',
          scoreColor: this._scoringUtilService.initArrayX(22, 'ADFF2F'), //Color 22 match scoring green
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

      netTeamScore = {
        //Create a new Results object for the team score
        name: this.results[i].name,
        scores: temp[0], //temp[0] is the net scores for the player adjusted by the lowest handicap in foursome. String value with / or // to show strokes
        //temp[0] also indicates oneBall strokes where granted.  * or ** to show strokes
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
      console.log('netTeamScores[i]', netTeamScores[i], netTeamScores[i + 1]);

      i++; //Advance to the next team
    }
    this.loadingSubject.next(false); //   When all players have been processed, stop the spinner
    return netTeamScores; //   Returns object with properties betterBallNet[22], name w/ handicap, nets1[22], nets2[22],                                                     // oneBallNet[22], scoreColor[18], scores[23]
  }
}
