import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Results } from '../models/results';
import { Scorecard } from '../models/scorecard';
import { ScorecardsService } from './scorecards.service';

@Injectable({
  providedIn: 'root',
})
export class StrokesService {
  scorecard: Scorecard;
  results: Results[] = [];

  constructor(public _scorecardsService: ScorecardsService) {}
  public matchResultSubject = new BehaviorSubject(null);  //Shaped datastore for the dataSource table

  newData(data) {
    this.matchResultSubject.next(data);  //Update the dataSource table
  }

  createDataSource(scs) {  //Shapes the data for the dataSource table.  scs is the scores:Scores[] for the match
    console.log('scs', scs);
    for (let i = 0; i < scs.length; i++) {
      this._scorecardsService
        .getScorecard(scs[i].scorecardId)  //Get the scorecard in the Score record for the match.  Players are on the same course, but may play different tees
        .subscribe((data) => {
          this.scorecard = data;
          this.results[i] = new Results(); //Create a consolidated data sources of scores, scorecard and match data to determine results.
          this.results[i].scores = scs[i].scores;  // Players scores for each hole.
          this.results[i]._id = scs[i].playerId;
          this.results[i].name = scs[i].name;  //Player name
          this.results[i].score = scs[i].score; //Player total score
          this.results[i].course = data.scorecard.courseTeeName;  //tee name
          this.results[i].rating = data.scorecard.rating; //Tee rating
          this.results[i].slope = data.scorecard.slope; //Tee slope
          this.results[i].pars = [];  //Hole pars
          this.results[i].pars = this.stringToNumArray(
            data.scorecard.parInputString
          );
          this.results[i].handicaps = []; //Hole handicaps
          this.results[i].handicaps = this.stringToNumArray(
            data.scorecard.hCapInputString
          );
          this.results[i].usgaIndex = scs[i].usgaIndex; //Player USGA Index
          this.results[i].handicap = scs[i].handicap; //Player tee handicap calculated from USGA Index when match was created
          this.results[i].scoreColor = []; //Player score color used to highlight ESA scores
          this.ESAColorNets(i);

          if(i = scs.length - 1){ //When all players have been processed, create the net scores.  If holds the method call untill getScorecard completes
          this.newData(
            this.interLaceArrays(
              this.results,
              this.netScores(scs),
              this.netTeamScores(scs)
            )
          );}
        });
    }
  }
  interLaceArrays(a: Results[], b: Results[], c: Results[]) {
    let e = [];
    for (let i = 0; i < a.length; i++) {
      e.push(a[i]);
      e.push(b[i]);
      e.push(c[i]);
    }
    return e;
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
      netTeamScore = {
        name: 'MatchNets',
        scores: this.nets(scs, i, lowCap),
        scoreColor: [],
      };

      netTeamScores.push(netTeamScore);
      // console.log('nets i',i, lowCap, this.nets(scs, i, lowCap));
    }
    return netTeamScores;
  }
  netScores(scs): Results[] {
    let netScores: Results[] = [];
    let netScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {
      netScore = {
        name: 'BigMatchNets',
        // scores: ['6/5', '❺/❺', '7/6', i + '**', '⑨'],
        scores: this.nets(scs, i, 0),
        scoreColor: [],
      };
      netScores.push(netScore);
      // console.log('nets i',i, this.nets(scs, i));
    }
    return netScores;
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
        net = this.results[j].scores[i].toString() + '*';
        if (
          this.results[j].handicap - lowCap - 18 >=
          this.results[j].handicaps[i]
        ) {
          net = net + '*';
        }
      } else {
        net = this.results[j].scores[i].toString();
      }
      nets.push(net);
    }
    console.log('netScores2', nets);
    return nets;
  }
  stringToNumArray(aString: any) {
    let aNumArray = [];
    let bb = aString.split(',');
    for (let i = 0; i < bb.length; i++) {
      aNumArray.push(Number(bb[i]));
    }
    return aNumArray;
  }
  createHeaders(scs) {
    console.log('scs', scs);
    let headers = [{ name: '', scores: [] }];

    this._scorecardsService
      .getScorecard(scs[0].scorecardId)
      .subscribe((data) => {
        this.scorecard = data;
        console.log('createHeadersScorecards', data);
        headers.push({
          name: 'Pars',
          scores: this.stringToNumArray(data.scorecard.parInputString),
        });
        headers.push({
          name: 'HCap',
          scores: this.stringToNumArray(data.scorecard.hCapInputString),
        });
      });
    headers = headers.slice(1, 2);
    console.log('createHeaders', headers);
    return headers;
  }
}
