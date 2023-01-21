import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

const baseUrl = 'http://localhost:7000/api/scores';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private http: HttpClient) { }

  getScores(): Observable<any[]> {
    return this.http.get<Score[]>(baseUrl);
  }

  getScore(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createScore(data: Score): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateScore(data: Score): Observable<any> {
    return this.http.put(`${baseUrl}/${data._id}`, data);
  }

  deleteScore(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllScores(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  deleteMatchScores(matchId: string): Observable<any> {
    return this.http.delete(`${baseUrl}` + '/ScoresByMatch/' + matchId);
  }

  findByTitle(title: any): Observable<Score[]> {
    return this.http.get<Score[]>(`${baseUrl}?title=${title}`);
  }

  getScoresByMatch(matchId: string) {
    return this.http.get<Score[]>(`${baseUrl}` + '/ScoresByMatch/' + matchId);
  }
  updateScoresByMatch(matchId: string) {
    return this.http.get<Score[]>(`${baseUrl}` + '/ScoresByMatch/' + matchId);
  }
  updateScoreANDgetScores(data:Score){
     this.http.put(`${baseUrl}/${data._id}`, data);
    console.log('updateAND...', data)
    return this.http.get<Score[]>(baseUrl)
    .pipe(tap(x => console.log(x)),
     map( scores =>scores.filter( score => score.memberId == data.memberId)),
    tap(x => console.log(x)))

  }
  stringToArray(myCSV: string) {
    if (myCSV == undefined) return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const myArray: number[] = myCSV
      .split(',')
      .map(function (item) {
        return parseInt(item, 10);
      });
    return myArray;
  }
  stringToArraySC(myCSV: string) {
    if (myCSV == undefined) return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var myArray: number[] = myCSV
      .split(',')
      .map(function (item) {
        return parseInt(item, 10);
      });
    const x: number[] = [0, 0];
    myArray.push(0);
    myArray.push(0);
    myArray.push(0);
    myArray.push(0);
    return myArray;
  }
}
