import { Injectable } from '@angular/core';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';

@Injectable({
  providedIn: 'root',
})
export class ScoringUtilitiesService {
  nassauAutoPress = [
    ['0', '+1', '0', '-1'],
    ['+1', '+2/', '+1', '0'],
    ['-1', '0', '-1', '-2/'],
    ['+2/', '+3/+1', '+2/', '+1/-1'],
    ['-2/', '-1/+1', '-2/', '-3/-1'],
    ['+1/-1', '+2/', '+1/-1', '0/-2'],
    ['-1/+1', '0/+2', '-1/+1', '-2/0'],
    ['0/-2', '+1/-1', '0/-2', '-1/-3'],
    ['0/+2', '+1/+3', '0/+2', '-1/-1'],
    ['-3/-1', '-2/', '-3/-1', '-4/-2/'],
    ['+3/+1', '+4/+2/','+3/+1', '+2/'],
    ['+4/+2/', '+5/+3/+1', '+4/+2/', '+3/+1/-1'],
    ['-4/-2/', '-3/-1/+1', '-4/-2/', '-5/-3/-1'],
    ['+3/+1/-1', '+4/+2/', '+3/+1/-1', '+2/0/-2/'],
    ['-3/-1/+1', '-2/0/+2', '-3/-1/+1', '-4/-2/'],
    ['+2/0/-2/', '+3/+1/-1', '-2/0/-2/', '+1/-1/+1'],
    ['-2/0/-2/', '-1/+1/-1', '-2/0/-2/', '-3/-1/-3'],
    ['-5/-3/-1','-4/-2/','-5/-3/-1','-6/-4/-2/'],
    ['+5/+3/+1', '+6/+4/+2/', '+5/+3/+1','+4/+2/'],
    ['+1/-1/+1','+2/0/+2/','+1/-1/+1','0/-2/'],
    ['-1/+1/-1','0/+2/','-1/+1/-1','-2/0/-2/'],
  ];
  constructor() {}

  betterBall(A, i, j) {
    let betterBall: number;
    // console.log('betterBall', A, i, j);
    betterBall = A[j * 4].betterBallNet[i] - A[j * 4 + 2].betterBallNet[i];
    return betterBall;
  }

  initArrayX(x: number, v: any): any[] {
    let temp: any[] = [];
    for (let i = 0; i < x; i++) {
      temp.push(v);
    }
    return temp;
  }

  fourBallAutoNassau(teamA: number[],j, option: number): string[] {
    let scoring: string[] = this.initArrayX(21, '0');
    let m = 0;
    for (let k = 0; k < 2; k++) {
      if (k == 1) {
        m = 9;
      }
      const win = this.betterBall(teamA, m, j);
      if (win < 0) {
        scoring[0 + m] = '+1';
      } else if (win == 0) {
        scoring[0 + m] = '0';
      } else if (win > 0) {
        scoring[0 + m] = '-1';
      }

      for (let i = 1; i < 9; i++) {
        for (let a = 0; a < this.nassauAutoPress.length; a++) {
          const win = this.betterBall(teamA, i + m, j);
          if (scoring[i + m - 1] == this.nassauAutoPress[a][0]) {
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
    return scoring;
  }
}
