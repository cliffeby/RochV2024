import { Injectable } from '@angular/core';
import { Member, Team, LineUps } from 'src/app/models/member';
@Injectable({
  providedIn: 'root',
})
export class MatchPairService {
  APlayers: Member[];
  BPlayers: Member[];
  possibleTeams: Team[] = [];
  A: Member;
  B: Member;
  team: Team;

  constructor() {}

  async createRandomPairings(rPlaying: Member[]) {
    const pairings: Team[] = [];
    const randomPlayers: Member[] = rPlaying.sort(() => Math.random() - 0.5);
    for (let j = 0; j < randomPlayers.length; j = j + 2) {
      this.A = { ...randomPlayers[j] };
      this.B = { ...randomPlayers[j + 1] };
      if (this.A.usgaIndex > this.B.usgaIndex) {
        this.team = {
          playerA: this.B,
          playerB: this.A,
          combinedIndex: null,
        };
      } else {
        this.team = {
          playerA: this.A,
          playerB: this.B,
          combinedIndex: null,
        };
      }
      pairings.push(this.team);
    }
    for (let i = 0; i < pairings.length; i++) {
      let combinedIndex =
        pairings[i].playerA.usgaIndex + pairings[i].playerB.usgaIndex;
      pairings[i] = { ...pairings[i], combinedIndex };
    }
    return pairings;
  }

  async generateLineUps(rPlaying:any) {
    let sd: number;
    let foursomeUSGAIndex: number[] = [];
    let combos:any[] = [];
    let combo = [];

    for (let i = 0; i < 10000; i++) {
      combo = await this.createRandomPairings(rPlaying);
      for (let j = 0; j < 4; j++) {
        if (combo[j]) {
          foursomeUSGAIndex.push(combo[j].combinedIndex);
        }
      }
      sd = this.standardDeviation(foursomeUSGAIndex);
      combos.push({ ...combo, lineUpSD: sd });
      foursomeUSGAIndex = [];
    }

    combos.sort((a, b) => (a.lineUpSD > b.lineUpSD ? 1 : -1));
    combos = this.removeItemsWithDuplicateSD(combos);
    console.log('Combo', combos.slice(0, 4));
    return combos.slice(0, 4);
  }

  removeItemsWithDuplicateSD(items: LineUps[]) {
    for (let i = 1; i < items.length; i++) {
      if (items[i].lineUpSD === items[i - 1].lineUpSD) {
        items.splice(i--, 1);
      }
    }
    return items;
  }

  standardDeviation(arr:number[]) {
    // Creating the mean with Array.reduce
    let mean =
      arr.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / arr.length;

    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k) => {
      return (k - mean) ** 2;
    });

    // Calculating the sum of updated array
    let sum = arr.reduce((acc, curr) => acc + curr, 0);

    // Calculating the variance
    //  let variance = sum / arr.length

    // Returning the Standered deviation
    return Math.sqrt(sum / arr.length);
  }
}
