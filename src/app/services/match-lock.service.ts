import { Injectable } from '@angular/core';
import e from 'menu-api copy/node_modules/@types/express';
import { Subscription } from 'rxjs';
import { Member, Team, LineUps, Foursome } from 'src/app/models/member';
import { Score } from 'src/app/models/score';
import { MatchesService } from './matches.service';
import { ScoresService } from './scores.service';

@Injectable({
  providedIn: 'root',
})
export class MatchLockService {
  subscription: Subscription;
  scores: Score[];
  playerData: Score[] = [];

  constructor(
    private _scoresService: ScoresService,
    private _matchesService: MatchesService
  ) {}

  lockLineUps(lineUps: any[]) {
    console.log('lockLineUps', lineUps);
    this.shapeLineUps(lineUps);
    this._matchesService.matchStatusSubject.next('locked'); // For status in match-mat-list.component
  }
  unLockLineUps(lineUps: any[]) {
    // Changes the status in each player's score document to false and removes pairing data
    console.log('unLockLineUps', lineUps);
    this._scoresService
      .getScoresByMatch(lineUps[0].playerA.matchId)
      .subscribe((data: Score[]) => {
        this.scores = data;
        for (let i = 0; i < this.scores.length; i++) {
          this.scores[i].isPaired = false;
          this.scores[i].partnerIds = [];
          this.scores[i].isScored = false;
          this.scores[i].foursomeIds = [];
          this._scoresService.updateScore(this.scores[i]).subscribe();
        }
      });
    this._matchesService.matchStatusSubject.next('open'); // For status in match-mat-list.component
  }
  // shapeLineUps arranges the player's partnerId and foursomeIds to persist in the player/match Score document
  shapeLineUps(lineUps: any[]) {
    // lineUps is not itterable because it contains a property conmbinedIndex
    // Array keys holds the properties that can be numbers.
    // Even keys hold playerA and playerB data for the first two players in a foursome
    // Odd keys hold playerA and playerB data for the second two players in a foursome
    let keys: number[] = [];
    for (let key of Object.keys(lineUps)) {
      if (!isNaN(Number(key))) {
        keys.push(Number(key));
      }
    }

    let a, b, c, d, w, x, y, z;
    for (let i = 0; i < keys.length; i++) {
      a = b = c = d = w = x = y = z = undefined;
      a = lineUps[i].playerA._id;
      b = lineUps[i].playerB._id;
      w = lineUps[i].playerA.memberId;
      x = lineUps[i].playerB.memberId;
      if (i + 1 < keys.length) {
        c = lineUps[i + 1].playerA._id;
        d = lineUps[i + 1].playerB._id;
        y = lineUps[i + 1].playerA.memberId;
        z = lineUps[i + 1].playerB.memberId;
      }
      if (w !== undefined) {
        console.log('w', w);
        this.playerData[2 * i] = {
          ...this.playerData[2 * i],
          memberId: w,
          _id: a,
          partnerIds: [w, x],
          foursomeIds: [w, x, y, z],
          isPaired: true,
        };
        this.updateScores(this.playerData[2 * i]);
      }
      if (x !== undefined) {
        console.log('x', x);
        this.playerData[2 * i + 1] = {
          ...this.playerData[2 * i + 1],
          memberId: x,
          _id: b,
          partnerIds: [w, x],
          foursomeIds: [w, x, y, z],
          isPaired: true,
        };
        this.updateScores(this.playerData[2 * i + 1]);
      }
      if (y !== undefined) {
        console.log('y', y);
        this.playerData[2 * i + 2] = {
          ...this.playerData[2 * i + 2],
          memberId: y,
          _id: c,
          partnerIds: [y, z],
          foursomeIds: [w, x, y, z],
          isPaired: true,
        };
        this.updateScores(this.playerData[2 * i + 2]);
      }
      if (z !== undefined) {
        console.log('z', z);
        this.playerData[2 * i + 3] = {
          ...this.playerData[2 * i + 3],
          memberId: z,
          _id: d,
          partnerIds: [y, z],
          foursomeIds: [w, x, y, z],
          isPaired: true,
        };
        this.updateScores(this.playerData[2 * i + 3]);
      }
      console.log('key', i, this.playerData);
      i++;
      w = x = y = z = undefined;
    }
  }
  updateScores(data: Score) {
    // console.log('updateScores', data);
    this._scoresService.updateScore(data).subscribe(
      (data: Score[]) => {
        this.scores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
