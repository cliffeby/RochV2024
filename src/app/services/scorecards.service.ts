import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scorecard } from '../models/scorecard';
import { map } from 'rxjs/operators';
import { MembersService } from './members.service';

const baseUrl = 'http://localhost:7000/api/scorecards';

@Injectable({
  providedIn: 'root',
})
export class ScorecardsService {
  constructor(
    private http: HttpClient,
    private _membersService: MembersService
  ) {}

  getScorecards(): Observable<any[]> {
    return this.http.get<Scorecard[]>(baseUrl);
  }
  getScorecardGroups(): Observable<any[]> {
    return this.http.get<Scorecard[]>(baseUrl).pipe(map((res) => res.sort()));
  }

  getScorecard(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createScorecard(data: Scorecard): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateScorecard(data: Scorecard): Observable<any> {
    const scorecard = this.http.put(`${baseUrl}/${data._id}`, data);
    this.updateMembersScorecard(data);
    return scorecard;
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
  updateMembersScorecard(scorecard: Scorecard) {
    this._membersService.getMembers().subscribe({
      next: (data) => {
        for (const member of data) {
          for (let i = 0; i < member.scorecards.length; i++) {
            if (member.scorecards[i]._id === scorecard._id) {
              member.scorecards.splice(i, 1);
              member.scorecards.push(scorecard);
              member.scorecard = scorecard;
              this._membersService.updateMember(member);
              console.log('updated member', member, scorecard);
            }
          }
        }
        (error: any) => {
          console.log(error);
        };
      },
    });
  }
}
