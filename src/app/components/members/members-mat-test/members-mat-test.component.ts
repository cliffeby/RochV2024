import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SendMemberService } from 'src/app/services/send-members.service';

@Component({
  selector: 'app-members-mat-test',
  templateUrl: './members-mat-test.component.html',
  styleUrls: ['./members-mat-test.component.css'],
})
export class MembersMatTestComponent implements OnInit {

   memberstest$: Observable<any[]>;
   memberstest2$: Observable<any>;
  todoForm: FormGroup;

  constructor(
    private todoService: SendMemberService,
    private formBuilder: FormBuilder
  ) {
    this.todoForm = this.formBuilder.group({
      // id: [""],
      // value: ["", Validators.required]
    });
  }

  ngOnInit() {
    // this.memberstest$ = this.todoService.mem();
    // this.memberstest2$ = this.todoService.getMember();
  }

  onSubmit() {
    this.todoService.create(this.todoForm.value);
    this.todoForm.get("value").setValue("");
  }
}

