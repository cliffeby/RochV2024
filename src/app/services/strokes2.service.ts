import { Injectable } from '@angular/core';
import { ScoresService } from './scores.service';

@Injectable({
  providedIn: 'root',
})
export class Strokes2Service {
  playerArray: any[] = [];
  lowCap: number[];
  constructor(
    private _scoresService: ScoresService,
    ) {
  }
 
  findLowCapPlayer(pa:any[]) {
    var lowCap: number;
    var capArray: number[] = [];
    for (let i = 0; i < pa.length; i++) {
      //For each foursome in the match, find the low cap.
      if (i % 4 == 0) {
        lowCap = 999;
        for (let j = i; j < i + 4; j++) {
          if (pa[j].handicap < lowCap) {
            lowCap = pa[j].handicap;
          }
        }
        capArray.push(lowCap);
      }
    }
    return capArray;
  }
  createPlayerArrayfromLineUp(lineUp: any[]) {
    var playerArray: any[] = [];
    var keys = Object.keys(lineUp);
    for (var i = 0; i < keys.length - 1; i++) {
      playerArray.push(lineUp[i].playerA, lineUp[i].playerB);
    }
    this.lowCap = this.findLowCapPlayer(playerArray);
    var scHCaps = this._scoresService.stringToArraySC(lineUp[0].playerA.scHCapInputString);
    scHCaps = this.scorecardSplice(scHCaps);
    var scPars = this._scoresService.stringToArraySC(lineUp[0].playerA.scParInputString);
    scPars = this.scorecardSplice(scPars);
    var scYards = this._scoresService.stringToArraySC(lineUp[0].playerA.scYardInputString);
    scYards = this.scorecardSplice(scYards); 
    let markup: string[] = [];
    console.log('foreach playyerArray',playerArray, this.lowCap)
    playerArray.forEach((player, index) => {
      markup = [];
      for (let i = 0; i < 18; i++) {
        markup[i] = '';
        if (player.handicap >= scHCaps[i]) {
          markup[i] = '*';
        }
        if (player.handicap - this.lowCap[0] >= scHCaps[i]) {
          markup[i] = '/*';
        }
        console.log(player.handicap, this.lowCap[0], scHCaps[i], markup);
      }
      this.scorecardSplice(markup);
      player = { ...player, markup: markup };
      playerArray[index] = player;
      console.log('player', player);
    });

    const data = {player: playerArray, scHCaps: scHCaps, scPars: scPars, scYards:scYards  }
    return [data];
  }
  scorecardSplice(holeData: any[]) {
    holeData.splice(0, 0, '');
    holeData.splice(10, 0, '', '');
    holeData.splice(21, 0, '', '','','');
    return holeData;
  }
}