import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { AuthService } from '@auth0/auth0-angular';
import { ScorecardsService } from '../../../services/scorecards.service';
import { Scorecard } from 'src/app/models/scorecard';

@Component({
  selector: 'app-members-mat-edit',
  templateUrl: './members-mat-edit.component.html',
  styleUrls: ['./members-mat-edit.component.css'],
})
export class MembersMatEditComponent implements OnInit, OnDestroy {
  public profileJson: string = null;
  public scorecards: Scorecard[];
  tees: any;
  temp: any;
  tempTees = null;
  // mytees: any = [];
  myTees: any = [];

  constructor(
    private fb: UntypedFormBuilder,
    public auth: AuthService,
    public _scorecardsservice: ScorecardsService
  ) {
    this.memberForm1 = fb.group({
      firstName: '',
      lastName: '',
      usgaIndex: null,
      email: '',
      user: '',
      course: '',
    });
  }
  private authSubscription;
  public memberForm1: UntypedFormGroup;
  @Input() public member: Member;
  @Output() public updateMemberEvent = new EventEmitter();
  @Output() public submitAddMemberEvent = new EventEmitter();

  ngOnInit() {
    this.authSubscription = this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      this.memberForm1.controls['user'].setValue(profile.email);
    });
    // (this.member as any).scorecard = {};
    // Get scorecards for scorecard input dropdown
    this._scorecardsservice.getScorecards().subscribe((resSCData) => {
      this.scorecards = resSCData;
    });

    if (this.member == null) {
      this.member = new Member();
      this.member.firstName = '';
      this.member.lastName = '';
      this.member.usgaIndex = 0;
      this.member.email = '';
      this.member.scorecardsId = [];
      // this.member.user = ''; User is set above in form
    }

    this.memberForm1 = this.fb.group({
      firstName: [
        this.member.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [this.member.lastName, [Validators.required]],
      usgaIndex: [this.member.usgaIndex, [Validators.required]],
      email: [this.member.email, [Validators.email]],
      user: [this.member.user, [Validators.required]],
      course: [this.member.scorecardId, [Validators.required]],
    });
    // Get scorecard details for each id in members profile
    // groupName property is the course name which has several sets of tees
    // scorecardId is the id of the scorecard for a specific set of tees
    for (let i = 0; i < this.member.scorecardsId.length; i++) {
      this._scorecardsservice
        .getScorecard(this.member.scorecardsId[i])
        .subscribe((resSCData) => {
          const sc = resSCData;
          this.myTees.push(sc.scorecard);
          // Sort by group name so list is similar for each member
          this.myTees = this.myTees.sort((a, b) =>
            a.groupName > b.groupName ? 1 : -1
          );
        });
    }
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm1.controls[controlName].hasError(errorName);
  };
  // OnClick to add scorecard to member; this function checks if the groupName is already in the member's profile
  // If it is, it will replace that member scorecard.  Players can store many courses (groupNames) but can on have one default set of tees per course.
  addScorecard() {
    if (this.tempTees != null) {
      this.myTees.push(this.tempTees);
      const gn = this.myTees[this.myTees.length - 1].groupName;
      for (let i = 0; i < this.myTees.length - 1; i++) {
        if (this.myTees[i].groupName === gn) {
          this.myTees.splice(i, 1);
        }
      }
      this.tempTees = null;
    }
  }
  removeScorecard(index: number) {
    this.myTees.splice(index, 1);
  }
  // If matselect dropdown is changed, this function will add the new scorecard to tempTees
  scorecardchanged(event: string) {
    this.tempTees = event;
  }

  updateMemberForm() {
    this.member.firstName = this.memberForm1.controls['firstName'].value;
    this.member.lastName = this.memberForm1.controls['lastName'].value;
    this.member.usgaIndex = this.memberForm1.controls['usgaIndex'].value;
    this.member.email = this.memberForm1.controls['email'].value;
    this.member.user = this.memberForm1.controls['user'].value;
    this.member.scorecardsId = this.myTees;
    console.log('member myTees/scorecardsId', this.myTees)
    this.updateMemberEvent.emit(this.member);
  }

  // Identcal to updateMemberForm()???
  addMemberForm() {
    this.member.firstName = this.memberForm1.controls['firstName'].value;
    this.member.lastName = this.memberForm1.controls['lastName'].value;
    this.member.usgaIndex = this.memberForm1.controls['usgaIndex'].value;
    this.member.email = this.memberForm1.controls['email'].value;
    this.member.user = this.memberForm1.controls['user'].value;
    this.member.scorecardsId = this.myTees;
    this.submitAddMemberEvent.emit(this.member);
  }
}
