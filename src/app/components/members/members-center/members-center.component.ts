import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MembersService } from '../../../services/members.service';
// import { ScoreService } from '../../services/score.service';

import { Member } from '../../../models/member';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-members-center',
  templateUrl: './members-center.component.html',
  styleUrls: ['./members-center.component.css'],
  providers: [MembersService],
})
export class MembersCenterComponent implements OnInit {
  selectedMember: Member;
  public canCreate: boolean;
  public canUpdate: boolean;
  public canDelete: boolean;
  public hidenewMember = true;
  members: Array<Member>;

  constructor(
    public auth: AuthService,
    private _membersService: MembersService
  ) {}

  ngOnInit() {
    this._membersService
      .getMembers()
      .subscribe((resMemberData) => (this.members = resMemberData));
  }

  onSelectMember(member: Member) {
    if (member === null) {
      this.hidenewMember = false;
      console.log('Center', this.selectedMember, this.hidenewMember);
    } else {
      this.selectedMember = member;
      this.hidenewMember = true;
      console.log('Center', this.selectedMember);
    }
  }
  onAddMemberEvent(){
    this.hidenewMember = false;
    this.selectedMember = null;
  }

  onSubmitAddMember(member: Member) {
    this._membersService.createMember(member).subscribe((resNewMember) => {
      this.members.push(resNewMember);
      this.hidenewMember = true;
      this.selectedMember = null;
    });
    // TODO - Is Pipe better to force sort
    this._membersService
      .getMembers()
      .subscribe((resMemberData) => (this.members = resMemberData));
  }

  onUpdateMemberEvent(member: any) {
    this._membersService
      .updateMember(member)
      .subscribe((resUpdatedMember) => (member = resUpdatedMember));
    this.selectedMember = null;
    // TODO - Is Pipe better to force sort
    this._membersService
      .getMembers()
      .subscribe((resMemberData) => (this.members = resMemberData));
  }
  onSubmitAddMemberEvent(member: any) {
    this._membersService
      .createMember(member)
      .subscribe((resNewMember) => {
        this.members.push(resNewMember);
        this.hidenewMember = true;
        this.selectedMember = null;
      });
  }

  onDeleteMemberEvent(member: any) {
    this.selectedMember = member;
    const memberArray = this.members;
    this._membersService.deleteMember(member._id).subscribe((resDeletedMember) => {
      for (let i = 0; i < memberArray.length; i++) {
        if (memberArray[i]._id === member._id) {
          memberArray.splice(i, 1);
        }
      }
      this.members = memberArray;
    });
    this.selectedMember = null;
    this.members = memberArray;
  }
  onNotifyClicked(): void {
    this.selectedMember = null;
  }
}
