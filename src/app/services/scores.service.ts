import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  const baseUrl = 'http://localhost:7000/api/scores';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private http: HttpClient) {}

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

  deleteMatchScores(matchId: string): Observable<any>{
  return this.http.delete(`${baseUrl}` + '/ScoresByMatch/' + matchId);
  }

  findByTitle(title: any): Observable<Score[]> {
    return this.http.get<Score[]>(`${baseUrl}?title=${title}`);
  }

  getScoresByMatch(matchId: string) {
    return this.http.get<Score[]>(`${baseUrl}` + '/ScoresByMatch/' + matchId);

  }
}
