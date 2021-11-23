import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { AuthService } from '@auth0/auth0-angular';

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
  public profileJson: string = null;
  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.memberForm1 = fb.group({
      firstName: '',
      lastName: '',
      handicap: null,
      email: '',
      user: '',
    });
  }

  @Input() public member: Member;
  public memberForm1: FormGroup;
  @Output() public updateMemberEvent = new EventEmitter();
  @Output() public deleteMemberEvent = new EventEmitter();
  @Output() public submitAddMemberEvent = new EventEmitter();

  ngOnInit() {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      this.memberForm1.controls['user'].setValue(profile.email);
    });
    if (this.member == null) {
      this.member = new Member();
      this.member.firstName = '';
      this.member.lastName = '';
      this.member.handicap = 0;
      this.member.email = '';
      // this.member.user = ''; User is set above in form
    }

    this.memberForm1 = this.fb.group({
      firstName: [
        this.member.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [this.member.lastName, [Validators.required]],
      handicap: [this.member.handicap, [Validators.required]],
      email: [this.member.email, [Validators.email]],
      user: [this.member.user, [Validators.required]],
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm1.controls[controlName].hasError(errorName);
  };

  updateMemberForm() {
    this.member.firstName = this.memberForm1.controls['firstName'].value;
    this.member.lastName = this.memberForm1.controls['lastName'].value;
    this.member.handicap = this.memberForm1.controls['handicap'].value;
    this.member.email = this.memberForm1.controls['email'].value;
    this.member.user = this.memberForm1.controls['user'].value;
    this.updateMemberEvent.emit(this.member);
    console.log('Update form', this.member);
  }
  addMember() {
    this.member.firstName = this.memberForm1.controls['firstName'].value;
    this.member.lastName = this.memberForm1.controls['lastName'].value;
    this.member.handicap = this.memberForm1.controls['handicap'].value;
    this.member.email = this.memberForm1.controls['email'].value;
    this.member.user = this.memberForm1.controls['user'].value;
    this.submitAddMemberEvent.emit(this.member);
  }
}
