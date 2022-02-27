import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createNotEmittedStatement } from 'typescript';
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
  public matchResultSubject = new BehaviorSubject(null);

  newData(data) {
    this.matchResultSubject.next(data);
  }

  createDataSource(scs) {
    console.log('scs', scs);
    for (let i = 0; i < scs.length; i++) {
      this._scorecardsService
        .getScorecard(scs[i].scorecardId)
        .subscribe((data) => {
          this.scorecard = data;
          this.results[i] = new Results();
          this.results[i].scores = scs[i].scores;
          this.results[i]._id = scs[i].playerId;
          this.results[i].name = scs[i].name;
          this.results[i].score = scs[i].score;
          this.results[i].course = data.scorecard.courseTeeName;
          this.results[i].rating = data.scorecard.rating;
          this.results[i].slope = data.scorecard.slope;
          this.results[i].pars = [];
          this.results[i].pars = this.stringToNumArray(
            data.scorecard.parInputString
          );
          this.results[i].handicaps = [];
          this.results[i].handicaps = this.stringToNumArray(
            data.scorecard.hCapInputString
          );
          console.log(
            'this.results[i].handicaps',
            this.results[i].handicaps,
            data.scorecard.hCapInputString
          );
          this.results[i].usgaIndex = scs[i].usgaIndex;
          this.results[i].handicap = scs[i].handicap;
          this.results[i].scoreColor = [];
          this.ESAColorNets(i);
          // this.newData(this.netScores(scs));
          this.newData(this.results.concat(this.netScores(scs)).concat(this.netTeamScores(scs)));
          // this.newData(this.netTeamScores(scs));
        });
    }

    // console.log('createDataSource', this.netScores(scs), this.results);
    // this.newData(this.netScores(scs));
    // return this.netScores(scs);
  }
  netTeamScores(scs): Results[] {
    let lowCap: number;
    let netTeamScores: Results[] = [];
    let netTeamScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {
      if (i % 4 == 0) {
        lowCap = 999;
        for (let j = i ; j < i+4; j++) {
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
    // console.log(
    //   'results',
    //   this.results[j].handicap,
    //   this.results[j].handicaps[0], lowCap
    // );
    let nets: any[] = [];
    let net: any;
    for (let i = 0; i < 17; i++) {
      if (
        this.results[j].scores[i] - this.ESAAdjust(j, i) >
        this.results[j].pars[i] + 2
      ) {
         console.log('if....', this.results[j].scores[i], "player", j, "hole", i, "PHC", this.results[j].handicap, "HHC", this.results[j].handicaps[i]);
        this.results[j].scoreColor[i] = 'ff0000';
      } else {
        this.results[j].scoreColor[i] = 'black';
      }
    }
    console.log('this.results[j].scoreColor', this.results[j].scoreColor);
  }
  ESAAdjust(j, i): number {
    let x: number = 0;
    if (this.results[j].handicap > this.results[j].handicaps[i]) {
      x = 1;
    }
    if (this.results[j].handicap > this.results[j].handicaps[i] + 18) {
      x = 2;
    }
    return x;
  }
  nets(scs, j, lowCap): any[] {
    // console.log(
    //   'results',
    //   this.results[j].handicap,
    //   this.results[j].handicaps[0], lowCap
    // );
    let nets: any[] = [];
    let net: any;
    for (let i = 0; i < 17; i++) {
      if (this.results[j].handicap - lowCap >= this.results[j].handicaps[i]) {
        // console.log('if....', this.results[j].scores[i], "player", j, "hole", i, "PHC", this.results[j].handicap-lowCap, "HHC", this.results[j].handicaps[i]);
        net = this.results[j].scores[i].toString() + '*';
        if (
          this.results[j].handicap - lowCap - 18 >=
          this.results[j].handicaps[i]
        ) {
          net = net + '*';
        }
        nets.push(net);
      } else {
        net = this.results[j].scores[i].toString();
        nets.push(net);
      }
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
