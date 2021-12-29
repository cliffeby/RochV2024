import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member';


const baseUrl = 'http://localhost:7000/api/members';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  getMembers(): Observable<any[]> {
    return this.http.get<Member[]>(baseUrl);
  }

  getMember(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createMember(data: Member): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateMember( data: Member): Observable<any> {
    console.log('updated member222222', data);
    return this.http.put(`${baseUrl}/${data._id}`, data);
  }

  deleteMember(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllMembers(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Member[]> {
    return this.http.get<Member[]>(`${baseUrl}?title=${title}`);
  }
}
