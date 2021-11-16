import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css'],
})

export class MembersDetailComponent implements OnInit {
  member: any;
  fbGroup: FormGroup;
  private editTitle: boolean = false;
  public updateMemberEvent = new EventEmitter();
  public deleteMemberEvent = new EventEmitter();
  public notify = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onTitleClick() {
    this.editTitle = true;
  }

  updateMember() {
    this.updateMemberEvent.emit(this.member);
  }

  deleteMember() {
    this.deleteMemberEvent.emit(this.member);
  }
  back() {
    this.notify.emit();
  }
}
