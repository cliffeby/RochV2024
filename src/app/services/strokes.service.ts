import { Injectable } from '@angular/core';
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
            data.scorecard.parInputString,
            'Par'
          );
          this.results[i].handicaps = [];
          this.results[i].handicaps = this.stringToNumArray(
            data.scorecard.hCapInputString,
            'HCap'
          );
          this.results[i].usgaIndex = scs[i].usgaIndex;
          this.results[i].handicap = scs[i].handicap;
        });
    }

    setTimeout(() => {
      for (let i = 0; i < scs.length; i++) {
        this.results.splice(1 + 2 * i, 0, this.netScores(scs)[i]);
      }
    }, 1000);

    console.log('createDataSource', this.netScores(scs), this.results);
    return this.results;
  }
  netScores(scs): Results[] {
    let netScores: Results[] = [];
    let netScore: Results = new Results();
    for (let i = 0; i < scs.length; i++) {
      netScore = {
        name: 'Nets',
        scores: ['6/5', '❺/❺', '7/6', i + '**', '⑨'],
        // scores: this.nets(scs, i),
      };
      netScores.push(netScore);
    }
    console.log('netScores1', netScores);
    return netScores;
  }
  nets(scs, j): any[] {
    console.log('results', this.results[0].handicap, this.results[0].handicaps[0]);
    let nets: any[] = [];
    let net: any;
    for (let i = 0; i < 18; i++) {
      if (this.results[j].handicap >= this.results[j].handicaps[i]) {
        console.log('if....', this.results[j].scores[i]);
        net = this.results[j].scores[i].toString() + 'x';
        nets.push(net);
      }
    }
    console.log('netScores2', net);
    return nets;
  }
  stringToNumArray(aString: any, name: string) {
    let aNumArray = [];
    // aNumArray.push(name);
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
          scores: this.stringToNumArray(data.scorecard.parInputString, 'Par'),
        });
        headers.push({
          name: 'HCap',
          scores: this.stringToNumArray(data.scorecard.hCapInputString, 'HCap'),
        });
      });
    headers = headers.slice(1, 2);
    console.log('createHeaders', headers);
    return headers;
  }
}
