import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, Input, OnDestroy, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MembersService } from 'src/app/services/members.service';
import { SendMemberService } from 'src/app/services/send-members.service';
import { Member } from 'src/app/models/member';
import { Observable, Subscription } from 'rxjs';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-members-mat-edit',
  templateUrl: './members-mat-edit.component.html',
  styleUrls: ['./members-mat-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersMatEditComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder) {
    this.memberForm1 = fb.group({
      firstName: '',
      lastName: '',
    });
  }

  @Input() public member: Member;
  public memberForm1: FormGroup;
  @Output() public updateMemberEvent = new EventEmitter();
  @Output() public deleteMemberEvent = new EventEmitter();
  @Output() public submitAddMemberEvent = new EventEmitter();

  ngOnInit() {
    if (this.member == null) {
      this.member = new Member();
      this.member.firstName = '';
      this.member.lastName = '';
    }

    this.memberForm1 = this.fb.group({
      firstName: [
        this.member.firstName,
        [Validators.required, Validators.minLength(5)],
      ],
      lastName: [this.member.lastName, [Validators.required]],
    });
    console.log('edit ng oninit', this.member);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm1.controls[controlName].hasError(errorName);
  };

  updateMemberForm() {
    this.member.firstName = this.memberForm1.controls['firstName'].value;
    this.member.lastName = this.memberForm1.controls['lastName'].value;
    this.updateMemberEvent.emit(this.member);
    console.log('Update form', this.member);
  }
  addMember() {
    this.member.firstName = this.memberForm1.controls['firstName'].value;
    this.member.lastName = this.memberForm1.controls['lastName'].value;
    this.submitAddMemberEvent.emit(this.member);
  }
}
