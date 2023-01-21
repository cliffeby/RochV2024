import { Injectable } from '@angular/core';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class IndexCalcService {

  constructor() { }

  calcIndex(history: Score[]) {
    console.log('CALC History', history)
    history.sort((a, b) => Number(new Date(b.datePlayed)) - Number(new Date(a.datePlayed))); //Sort player scores by date
    if (history.length > 20) history.slice(0, 20);  // Take most recent 20 scores
    switch (history.length) {  //history[0] is the player's most recent round
      case 1: history[0].usgaIndex  =  Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
      .sort((a, b) => a - b)  // Sort ascending - smallest first
      .slice(0, 1)  //Take the lowest indices
      .reduce((a, b) => a + b, 0) - 4;
      console.log('history0', history[0].usgaIndex);break;
      case 2: history[0].usgaIndex  =  Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
      .sort((a, b) => a - b)  // Sort ascending - smallest first
      .slice(0, 1)  //Take the  lowest indices
      .reduce((a, b) => a + b, 0) - 3;
      console.log('history1', history[0].usgaIndex);break;
      case 3: history[0].usgaIndex =  Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
      .sort((a, b) => a - b)  // Sort ascending - smallest first
      .slice(0, 1)  //Take the lowest indices
      .reduce((a, b) => a + b, 0) - 1;
      console.log('history2', history[0].usgaIndex);break;
      case 4: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
      .sort((a, b) => a - b)  // Sort ascending - smallest first
      .slice(0, 1)  //Take the lowest indices
      .reduce((a, b) => a + b, 0) - 2;
      console.log('history3', history[0].usgaIndex, history[0].name);
        break;
      case 5: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
      .sort((a, b) => a - b)  // Sort ascending - smallest first
      .slice(0, 1)  //Take the  lowest indices
      .reduce((a, b) => a + b, 0) - 1;
      console.log('history4', history[0].usgaIndex, history[0].name);
        break;
      case 6: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
        .sort((a, b) => a - b)  // Sort ascending - smallest first
        .slice(0, 2)  //Take the first two - lowest indices
        .reduce((a, b) => a + b, 0) / 2 - 1;  //sum then average less adjustment 
        console.log('history5', history[0].usgaIndex, history[0].name);
        break;
      case 7 || 8: history[0].usgaIndex = Math.trunc(Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((a, b) => a + b, 0) / 2 *10)/10
        console.log('history6', history[0].usgaIndex, history[0].name);
        break;
      case 9 || 10 || 11: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 3)
        .reduce((a, b) => a + b, 0) / 3;
        break;
      case 12 || 13 || 14: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 4)
        .reduce((a, b) => a + b, 0) / 4;
        break;
      case 15 || 16: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 5)
        .reduce((a, b) => a + b, 0) / 5;
        break;
      case 17 || 18: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 6)
        .reduce((a, b) => a + b, 0) / 6;
        break;
      case 19: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 7)
        .reduce((a, b) => a + b, 0) / 7;
        break;
      case 20: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 8)
        .reduce((a, b) => a + b, 0) / 8;
        break;
      default:
        console.log("Invalid Score Array");
    }
    history[0].usgaIndex = Math.round(history[0].usgaIndex*10)/10
    return history;
  }
}
