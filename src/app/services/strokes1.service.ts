import { splitClasses } from '@angular/compiler';
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
export class Strokes1Service {
  // A service that determines how hadicap differentials are appled by holes,
  scorecard: Scorecard; // adjusts the scores for handicap, ESA, and determines results of matches.
  results: Results[] = []; // Results is a datablob of all data needed to determine results.
  // Only two properties are required, name and scores[].

  constructor(
    public _scorecardsService: ScorecardsService,
    public _scoringUtilService: ScoringUtilitiesService
  ) {}

  public matchResultSubject = new BehaviorSubject(null); // Shaped datastore for the dataSource table
  public loadingSubject = new BehaviorSubject<boolean>(false); // Is data being loaded and calculated?

  public loading$ = this.loadingSubject.asObservable(); //

  newData(data) {
    this.matchResultSubject.next(data); // Function to update the dataSource table
    console.log('Data', data);
  }

  createDataSource(scs: Score[]) {
    // Shapes the data for the dataSource table.  scs is the scores:Scores[] for the match
    for (let i = 0; i < scs.length; i++) {
      // length is the number of players in the match
      this._scorecardsService
        // tslint:disable-next-line: max-line-length
        .getScorecard(scs[i].scorecardId) // Get the scorecard in the Score record for the match.  Players are on the same course, but may play different tees
        .subscribe((data) => {
          this.scorecard = data;
          this.results[i] = new Results(); // Create a consolidated data sources of scores, scorecard and match data to determine results.
          // this.results[i].scores = scs[i].scores; // Players scores for each hole.
          // this.results[i].scores = [], // Add front 9 and back 9 and 18 totals to the array at [18], [19] and [20]
          // this.results[i]._id = scs[i].playerId; //Not used
          this.results[i].name = scs[i].name; // Player name
          // this.results[i].score = scs[i].score; //Player total score
          this.results[i].course = data.scorecard.courseTeeName; // tee name
          this.results[i].rating = data.scorecard.rating; // Tee rating
          this.results[i].slope = data.scorecard.slope; // Tee slope
          this.results[i].par = data.scorecard.par; // Tee par
          this.results[i].pars = []; // Init Hole pars
          this.results[i].pars = this.stringToNumArray(
            data.scorecard.parInputString
          );
          (this.results[i].pars = []), // this.fb18(this.results[i].pars, 0);
            (this.results[i].handicaps = []); // Init Hole handicaps
          this.results[i].handicaps = this.stringToNumArray(
            data.scorecard.hCapInputString
          );
          this.results[i].usgaIndex = scs[i].usgaIndex; // Player USGA Index
          this.results[i].handicap = scs[i].handicap; // Player tee handicap calculated from USGA Index when match was created

          if ((i === scs.length - 1)) {
            // tslint:disable-next-line: max-line-length
            // When all players have been processed, create the net scores.  This holds the newData() method call until getScorecard subscription completes
            // tslint:disable-next-line: max-line-length
            this.newData(this.interWeaveNets(this.netTeamScores(scs))); // Players scores, oneball and match results are integrated into a final score record.
          }
        });
    }
  }

  interWeaveNets(a: Results[]) {
    // Organizes the rows in the dataSource table for a fourball match
    let array = [];
    for (let i = 0; i < a.length - 1; i++) {
      // Players are pre-arranged by team and foursome Row A1, Row B1 vs Row A2, Row B2
      array.push(a[i]); // Player A1 but first two rows of DataSource are headers of Par and Stroke Index for the hole
      array.push(a[i + 1]); // Player B1
      array.push({
        // One Ball Score - betterball net of A and B
        scores: [''],
        name: 'OneBall',
      });
      if (i % 4 === 0) {
        // After four players, add a row for the match result
        array.push({
          scores: [' '],
          name: 'Match',
        });
      }
      i++; // Advance to players A2 and B2...
    }
    console.log('interWeaveNets1111', array);
    return array;
  }

  netTeamScores(scs: Score[]): Results[] {
    // Calculates the net scores for each team in a fourball match.
    let lowCap: number; // Lowest handicap of the four players
    const netTeamScores: Results[] = [];
    let netTeamScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {
      // For each foursome in the match, find the low cap.
      if (i % 4 === 0) {
        lowCap = 999;
        for (let j = i; j < i + 4; j++) {
          if (scs[j].handicap < lowCap) {
            lowCap = scs[j].handicap;
          }
        }
      }
      const temp = this.teamNets(i, lowCap); // Calculate the net scores for each team in a foursome.  Temp is an array of results.
      console.log('nameeeeeee', i, scs.length, this.results[i]);
      netTeamScore = {
        // Create a new Results object for the team score
        name: this.results[i].name,
        // tslint:disable-next-line: max-line-length
        scores: temp[0], // temp[0] is the net scores for the player adjusted by the lowest handicap in foursome. String value with / or // to show strokes
        nets1: temp[1], // temp[1] is the net scores for the player adjusted by the lowest handicap in foursome. Number value.
        // nets2: temp[2], // temp[2] is the net scores for the player adjusted by course handicaps. Number value.
      };
      netTeamScores.push(netTeamScore); // Add the team score to the array of team scores
    }

    this.loadingSubject.next(false); //   When all players have been processed, stop the spinner
    // tslint:disable-next-line: max-line-length
    return netTeamScores; //   Returns object with properties betterBallNet[22], name w/ handicap, nets1[22], nets2[22],                                                     // oneBallNet[22], scoreColor[18], scores[23]
  }

  teamNets(j, lowCap): any[] {
    // Calculate where strokes are granted for the fourball match (/) and to course par (*)

    let nets1: any[] = []; // nets1 is the net score adjusted by the lowest handicap in foursome.  A numeric value.
    let net: any; // same as above
    console.log('results', j, this.results);
    for (let i = 0; i < 18; i++) {
      if (this.results[j] !== undefined) {
        if (this.results[j].handicap - lowCap >= this.results[j].handicaps[i]) {
          net = '/';

          if (
            this.results[j].handicap - lowCap - 18 >=
            this.results[j].handicaps[i]
          ) {
            net = '//';
          }
        } else {
          net = ' ';
        }

        if (this.results[j].handicap >= this.results[j].handicaps[i]) {
          net = net + '*';

          if (this.results[j].handicap - 18 >= this.results[j].handicaps[i]) {
            net = net + '*';
          }
        }
        nets1.push(net);
      }
    }
    nets1.splice(9, 0, '');
    return [nets1];
  }

  // createColumns() {   // Not used.  Creates columns for the table but can't get it to work
  //   const columns = [
  //     {
  //       columnDef: 'name',
  //       header: 'Name',
  //       cell: (element) => `${element.name}`,
  //     },
  //     {
  //       columnDef: 'scores[0]',
  //       header: 'Bob,',  //(data) => `${data.scores[1]}`,
  //       cell: (element) => `${element.scores[0]}`,
  //     },
  //   ];
  //   console.log('columns', columns);
  //   return columns;
  // }

  createHeaders(scs) {
    // Create headers rows for the table
    let headers = [{ name: '', scores: [] }]; // Header needs three properties: name, scores/values, and scoreColor
    this._scorecardsService
      .getScorecard(scs[0].scorecardId) // Get the scorecard for the match to show hole pars and stroke indices
      .subscribe((data) => {
        this.scorecard = data;
        let holeName: any = [...Array(18).keys()].map((i) => i + 1); // Create an array of hole numbers 1-18
        holeName.splice(9, 0, 'F'); // Push on labels for front, back,...
        holeName.push('B');
        holeName.push('Gross');
        holeName.push('Net');
        holeName.push('Post');

        console.log('createHeadersScorecards', holeName, data);
        headers.push({
          // Row 1 is the hole name/number
          name: 'Holes',
          scores: holeName,
        });
        headers.push({
          name: 'Pars', // Row 2 is the Par value for each hole
          scores: this.stringToNumArray(data.scorecard.parInputString),
        });
        headers.push({
          name: 'HCap', // Row 3 is the stroke index for each hole
          // tslint:disable-next-line: max-line-length
          scores: this.stringToNumArray(data.scorecard.hCapInputString, true), // true flag indicates to that totals for front, back, and 18 are not to be included
        });
      });
    return headers;
  }

  stringToNumArray(aString: any, flag?: boolean) {
    // Parse pars, handicaps and yards from string to number array
    let aNumArray = [];
    let bb = aString.split(',');
    for (let i = 0; i < bb.length; i++) {
      aNumArray.push(Number(bb[i]));
    }
    return this.fb18(aNumArray, 0, flag); // Include front ,back, and 18 totals.  Do not appy a players handicap
  }

  fb18(arr, hcap, flag?: boolean) {
    // Sums the scores on the front, back, and 18 and adds them to the array at [18], [19], [20]
    let front: number = 0;
    let back: number = 0;
    for (let i = 0; i < 9; i++) {
      front = front + Number(arr[i]);
    }
    arr.splice(9, 0, '');
    for (let i = 10; i < 19; i++) {
      back = back + Number(arr[i ]);
    }
    if (!flag) {
      // If flag is true, do not add the front, back, and 18 hole scores to the array.  Needed for the Yards and Hcap rows
      arr[9] = front;
      arr[19] = back;
      arr[20] = front + back;
      arr[21] = arr[20] - hcap;
    } // Net score minus handicap before ESA adjustment
    else {
      arr[9] = '.'; // A '.' used to fill table cell.  Otherwise a space is assumed to be an empty cell.
      arr[19] = '.';
      arr[20] = '.';
      arr[21] = '.';
    }
    return arr;
  }
}
