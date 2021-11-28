import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match';

const baseUrl = 'http://localhost:7000/api/matches';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(private http: HttpClient) {}

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
