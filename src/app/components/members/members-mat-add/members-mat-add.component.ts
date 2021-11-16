import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MembersService } from 'src/app/services/members.service';
import {  FormGroup,  FormBuilder,  ReactiveFormsModule, Validators} from '@angular/forms';
import { MatCard } from '@angular/material/card';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-members-mat-add',
  templateUrl: './members-mat-add.component.html',
  styleUrls: ['./members-mat-add.component.css'],
})
export class MembersMatAddComponent implements OnInit {
  visible = true;
  selectable = true;
  selected = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  memberForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];
  ngOnInit() {
    this.emptyMemberForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _membersService: MembersService
  ) {}

  /* Reactive book form */
  emptyMemberForm() {
    this.memberForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      // section: ['', [Validators.required]],
      // subjects: [this.subjectArray],
      // dob: ['', [Validators.required]],
      // gender: ['Male'],
    });
  }

  /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.subjectArray.length < 5) {
  //     this.subjectArray.push({ name: value.trim() });
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Date */
  // formatDate(e) {
  //   var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.memberForm.get('dob').setValue(convertDate, {
  //     onlyself: true,
  //   });
  // }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm.controls[controlName].hasError(errorName);
  };

  /* Submit book */
  submitMemberForm() {
    if (this.memberForm.valid) {
      this._membersService
        .createMember(this.memberForm.value)
        .subscribe((res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/members'));
        });
    }
  }
}
