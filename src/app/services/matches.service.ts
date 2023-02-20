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
  private testSubject = new BehaviorSubject(1);
  testData = this.testSubject.asObservable();
  public lineUpSubject = new BehaviorSubject<any[]>([null]);
  currentData = this.lineUpSubject.asObservable();

  setLineUpSubject(data){
    this.lineUpSubject.next(data);
    console.log('from service', data, this.currentData);
  }
  setTestSubject(data){
    this.testSubject.next(data);
  }
  
  numberPlaying(data:any) {
    this.playersCountSubject.next(data);
  }

  shapePlayers(data:any) {
    this.sortByIndexSubject.next(
      data.sort((a:any, b:any) => a.usgaIndex - b.usgaIndex)
    );
  }
  setDraggedMatch(lineUp:any){
    this.lineUpSubject.next(lineUp);
  }

  getShapedPlayers() {
    return this.sortByIndexSubject.asObservable();
  }

  medianUSGAIndex(data:any) {
    let usgaIndex = data.map(function (data:any) {
      return data.usgaIndex;
    });
    let median = usgaIndex.sort(function (a:any, b:any) {
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
