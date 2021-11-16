import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
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
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // @Input() member: Member;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  membersForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];
  subscription: Subscription;
  members: Member[] = [];
  member: Member;
  members$: Observable<Member[]>;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private _membersService: MembersService,
    private _sendMembersService: SendMemberService
  ) {
    // var id = this.actRoute.snapshot.paramMap.get('id');
    // console.log('members', this.member);
    // this._membersService.getMember(id).subscribe((olddata) => {
    //   console.log('Olddata', olddata);
    //   this._membersService.updateMember(olddata).subscribe((data) => {
    //     console.log(data.subjects);
    //     this.subjectArray = data.subjects;
    //     this.membersForm = this.fb.group({
    //       _id: [data._id],
    //       firstName: [data.firstName, [Validators.required]],
    //       lastName: [data.lastName, [Validators.required]],
    //       // section: [data.section, [Validators.required]],
    //       // subjects: [data.subjects],
    //       // dob: [data.dob, [Validators.required]],
    //       // gender: [data.gender],
    //     });
    //   });
    // });
    // this.subscription = this._sendMembersService
    //   .getMember()
    //   .subscribe((member) => {
    //     if (member) {
    //       this.member = member;
    //       this.members.push(member);
    //       console.log(
    //         'member subcription in edit members',
    //         this.member,
    //         this.members
    //       );
    //     } else {
    //       // clear messages when empty message received
    //       this.members = [];
    //     }
    //   });
  }

  ngOnInit() {
    this.updateBookForm();
    // this.members$ = this._sendMembersService.members$();
    // console.log('Members#', this.members$);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

  /* Reactive book form */
  updateBookForm() {
    this.membersForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      // section: ['', [Validators.required]],
      // subjects: [this.subjectArray],
      // dob: ['', [Validators.required]],
      // gender: ['Male'],
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    // const input = event.input;
    // const value = event.value;
    // // Add language
    // if ((value || '').trim() && this.subjectArray.length < 5) {
    //   this.subjectArray.push({ name: value.trim() });
    // }
    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    // const index = this.subjectArray.indexOf(subject);
    // if (index >= 0) {
    //   this.subjectArray.splice(index, 1);
    // }
  }

  /* Date */
  formatDate(e) {
    // var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    // this.studentForm.get('dob').setValue(convertDate, {
    //   onlyself: true,
    // });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.membersForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateMembersForm() {
    // console.log(this.studentForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this._membersService
        .updateMember(this.membersForm.value)
        .subscribe((res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/members'));
        });
    }
  }
}
