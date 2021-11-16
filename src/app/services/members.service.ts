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
// import { Injectable } from '@angular/core';
// import { Member } from '../models/members';

// @Injectable({
//   providedIn: 'root'

// })
// export class MembersService {
//   private _server = "http://localhost:7000";

//   private _getUrl = "/api/members";
//   private _postUrl = "/api/members";
//   private _putUrl = "/api/members/";
//   private _deleteUrl = "/api/members/";

// constructor(public auth: AuthService, public _authHttp: AuthHttp) {}

//   getMembers() {
//     return this._authHttp
//       .get(this._server + this._getUrl)
//       .map((response) => response.json());
//   }
//   getMember(_id: string) {
//     return this._authHttp
//       .get(this._server + this._getUrl + "/" + _id)
//       .map((response) => response.json());
//   }

//   addMember(member: Member) {
//     // const headers = new Headers({ "Content-Type": "application/json" });
//     // const options = new RequestOptions({ headers: headers });
//     return this._authHttp
//       .post(this._server + this._postUrl, JSON.stringify(member))
//       .map((response) => response.json());
//   }

//   updateMember(member: Member) {
//     // const headers = new Headers({ "Content-Type": "application/json" });
//     // const options = new RequestOptions({ headers: headers });
//     return this._authHttp
//       .put(
//         this._server + this._putUrl + member._id,
//         JSON.stringify(member))
//       .map((response) => response.json());
//   }

//   deleteMember(member: Member) {
//     return this._authHttp
//       .delete(this._server + this._deleteUrl + member._id)
//       .map((response) => response.json());
//   }
// }
