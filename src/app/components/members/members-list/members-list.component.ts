import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  members: Member[];
  currentMember: Member;
  currentIndex = -1;
  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.retrieveMembers();
  }

  retrieveMembers(): void {
    this.membersService.getAll().subscribe(
      (data) => {
        this.members = data;
        console.log(data, this.members);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveMembers();
    // this.currentMembers = {};
    this.currentIndex = -1;
  }

  setActiveMember(member: Member, index: number): void {
    this.currentMember = member;
    this.currentIndex = index;
  }


  searchTitle(): void {
    // this.currentMembers = {};
    this.currentIndex = -1;

    this.membersService.findByTitle(this.currentMember).subscribe(
      (data) => {
        this.members = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
