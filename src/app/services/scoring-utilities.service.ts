import { Injectable } from '@angular/core';
import { StrokesService } from './strokes.service';

@Injectable({
  providedIn: 'root',
})
export class ScoringUtilitiesService {
  nassauAutoPress = [
    //Array of possible bets for 2-down presses.  postion 0 is previous hole status
    ['0', '+1', '0', '-1'], // position 1 is a win; postion 2 is a ties, and position 3 is a loss
    ['+1', '+2/', '+1', '0'],
    ['-1', '0', '-1', '-2/'],
    ['+2/', '+3/+1', '+2/', '+1/-1'],
    ['-2/', '-1/+1', '-2/', '-3/-1'],
    ['+1/-1', '+2/', '+1/-1', '0/-2'],
    ['-1/+1', '0/+2', '-1/+1', '-2/0'],
    ['0/-2', '+1/-1', '0/-2', '-1/-3'],
    ['0/+2', '+1/+3', '0/+2', '-1/-1'],
    ['-3/-1', '-2/', '-3/-1', '-4/-2/'],
    ['+3/+1', '+4/+2/', '+3/+1', '+2/'],
    ['+4/+2/', '+5/+3/+1', '+4/+2/', '+3/+1/-1'],
    ['-4/-2/', '-3/-1/+1', '-4/-2/', '-5/-3/-1'],
    ['+3/+1/-1', '+4/+2/', '+3/+1/-1', '+2/0/-2/'],
    ['-3/-1/+1', '-2/0/+2', '-3/-1/+1', '-4/-2/'],
    ['+2/0/-2/', '+3/+1/-1', '-2/0/-2/', '+1/-1/+1'],
    ['-2/0/-2/', '-1/+1/-1', '-2/0/-2/', '-3/-1/-3'],
    ['-2/0/+2', '-1/+1/+3', '-2/0/+2', '-3/-1/+1'],
    ['-5/-3/-1', '-4/-2/', '-5/-3/-1', '-6/-4/-2/'],
    ['+5/+3/+1', '+6/+4/+2/', '+5/+3/+1', '+4/+2/'],
    ['+1/-1/+1', '+2/0/+2/', '+1/-1/+1', '0/-2/'],
    ['-1/+1/-1', '0/+2/', '-1/+1/-1', '-2/0/-2/'],
    ['-1/+3/-1', '0/+4/', '-1/+3/-1', '-2/+2/-2/'],
    ['+1/-3/+1', '+2/-2/+2/', '+1/-3/+1', '0/-4/'],
    ['-4/+2/-4/', '-3/-1/-3/+1', '-4/-2/-4/', '-5/-3/'],
    ['+4/+2/+4/', '+5/+3/+5/+1', '+4/+2/+4/', '+3/+1/+3/-1'],
    ['-5/-3/-1/+1', '-6/-4/-2/', '-5/-3/-1/', '-4/-2/0/+2/'],
    ['+5/+3/+1/-1', '+4/+3/0/-2/', '+5/+3/+1/-1', '+6/+4/+2/'],
    ['+6/+4/+2/', '+7/+5/+3/+1', '+6/+4/+2/', '+5/+3/+1/-1'],
    ['-6/-4/-2/', '-5/-3/-1/+1', '-6/-4/-2/', '-7/-5/-3/-1'],
    ['-7/-5/-3/-1', '-6/-4/-2/', '-7/-5/-3/-1', '-8/-6/-4/-2/'],
    ['+7/+5/+3/+1', '+8/+6/+4/+2/', '+7/+5/+3/+1', '+6/+4/+2/'],
    ['+8/+6/+4/+2/', '+9/+7/+5/+3/+1', '+8/+6/+4/+2/', '+7/+5/+3/+1/-1'],
    ['-8/-6/-4/-2/', '-7/-5/-3/-1/+1', '-8/-6/-4/-2/', '-9/-7/-5/-3/-1'],
  ];
  constructor() {}

  betterBall(teams:any[], i:number, j:number) {
    // teams is an array of all teams playing.  Net betterballs are compared to determine which team won the hole.
    let betterBall: number;
    // console.log('betterBall', team, i, j);
    betterBall = teams[j * 4].betterBallNet[i] - teams[j * 4 + 2].betterBallNet[i];
    return betterBall;
  }

  initArrayX(x: number, v: any): any[] {
    // Initialize an array to multiple elements x of value v.
    let temp: any[] = [];
    for (let i = 0; i < x; i++) {
      temp.push(v);
    }
    return temp;
  }

  fourBallAutoNassau(teamA: number[], j: number, option: number): string[] {
    // Returns a string array corresponding to each hole's cumulative match result
    // e.g. -1, -2/, -1/+1 for loss on the first two holes and a win on the third.
    // option is not yet implemented - resrved as an autopress switch
    let scoring: string[] = this.initArrayX(21, '0'); //Create a 21 element array of '0' strings
    let m = 0;  // Hole index
    for (let k = 0; k < 2; k++) {  //A nassau has a front and back nine bet 
      if (k == 1) {                 // This loop and the one below creates a bet starting on 
        m = 9;                      // hole 1 and 10.  k is the front and back 9 counter
      }                             // m is the hole number
      const win = this.betterBall(teamA, m, j); //win is the stroke difference between the two teams net best ball
      if (win < 0) {
        scoring[0 + m] = '+1';
      } else if (win == 0) {
        scoring[0 + m] = '0';
      } else if (win > 0) {
        scoring[0 + m] = '-1';  // scoring[0] and scoring[10] is set to +1, 0, or -1. 
      }

      for (let i = 1; i < 9; i++) { //each of the nine holes front and back
        for (let a = 0; a < this.nassauAutoPress.length; a++) {  //itterate through the array to find the previous hole's standing
          const win = this.betterBall(teamA, i + m, j);  //get the score on the current hole
          if (scoring[i + m - 1] == this.nassauAutoPress[a][0]) { //and select the array position in nassuaAutoPress of win, tie or loss.
            if (win < 0) {
              scoring[i + m] = this.nassauAutoPress[a][1];
            } else if (win == 0) {
              scoring[i + m] = this.nassauAutoPress[a][2];
            } else if (win > 0) {
              scoring[i + m] = this.nassauAutoPress[a][3];
            }
          }
        }
      }
    }
    return scoring; // array with cummulative scoring resuls for each of the 18 holes.
  }
}
