import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scorecard } from '../models/scorecard';
import { distinct, map } from 'rxjs/operators';


const baseUrl = 'http://localhost:7000/api/scorecards';

@Injectable({
  providedIn: 'root',
})
export class ScorecardsService {
  constructor(private http: HttpClient) {}

  getScorecards(): Observable<any[]> {
    return this.http.get<Scorecard[]>(baseUrl);
  }
  getScorecardGroups(): Observable<any[]> {
    return this.http.get<Scorecard[]>(baseUrl)
   .pipe(map(res => res.sort()))
  }

  getScorecard(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createScorecard(data: Scorecard): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateScorecard( data: Scorecard): Observable<any> {
    return this.http.put(`${baseUrl}/${data._id}`, data);
  }

  deleteScorecard(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllScorecards(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Scorecard[]> {
    return this.http.get<Scorecard[]>(`${baseUrl}?title=${title}`);
  }
}
