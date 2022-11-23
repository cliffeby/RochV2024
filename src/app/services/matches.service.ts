import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from '../models/match';

const baseUrl = 'http://localhost:7000/api/matches';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(private http: HttpClient) {}

  private sortByIndexSubject = new BehaviorSubject(null); //Players for match from match-mat-edit
  public playersCountSubject = new BehaviorSubject(null);
  public matchStatusSubject = new BehaviorSubject('open');
  public matchesSubject = new BehaviorSubject(null);

  numberPlaying(data) {
    this.playersCountSubject.next(data);
  }

  shapePlayers(data) {
    this.sortByIndexSubject.next(
      data.sort((a, b) => a.usgaIndex - b.usgaIndex)
    );
  }

  getShapedPlayers() {
    return this.sortByIndexSubject.asObservable();
  }

  medianUSGAIndex(data) {
    let usgaIndex = data.map(function (data) {
      return data.usgaIndex;
    });
    let median = usgaIndex.sort(function (a, b) {
      return a - b;
    })[Math.floor(usgaIndex.length / 2)];
    return median;
  }

//  http handlers
  getMatches(): Observable<any[]> {
    return this.http.get<Match[]>(baseUrl);
  }

  getMatch(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createMatch(data: Match): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateMatch(data: Match): Observable<any> {
    return this.http.put(`${baseUrl}/${data._id}`, data);
  }

  deleteMatch(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllMatches(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(name: any): Observable<Match[]> {
    return this.http.get<Match[]>(`${baseUrl}?name=${name}`);
  }
}
