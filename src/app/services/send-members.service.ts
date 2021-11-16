import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Member } from '../models/member';

@Injectable({ providedIn: 'root' })
export class SendMemberService {
  private _member$ = new BehaviorSubject<any[]>([]);
  private _member1$ = new BehaviorSubject<any[]>([]);
  private _mem$ = new BehaviorSubject<any>({});
  readonly members$ = this._member$.asObservable;
  readonly mem = this._mem$.asObservable;
  private members: Member[] = [];
  private member;
  private nextId = 0;

  // loadAll() {
  //   this.members = [];
  //   this._member$.next(this.members);
  // }

  create(item: Member) {
    // this.members = [];
    this.members.push(item);
    this._member$.next(Object.assign([], this.members));
    console.log('Members from service after create', this.members);
  }
  create2(item: any) {
    // this.member = {};
    // this._mem =(item);
    this._mem$.next(Object.assign({}, item));
    console.log('Members from service after create', this._mem$.getValue);
  }

  remove(id: any) {
    let i = this.members.length;
    this.members.forEach((t, i) => {
      if (t._id === id) {
        this.members.splice(i, 1);
      }
      this._member$.next(Object.assign([], this.members));
    });
  }

  // sendMember(member: any) {
  //   console.log('SendService-send', member);
  //   this._mem$.next({ member });
  // }

  // clearMember() {
  //   this._member.next();
  // }

  getMember(): Observable<Member> {
    console.log('SendService-get', this._mem$.asObservable());
    return this._mem$.asObservable();
  }
}
