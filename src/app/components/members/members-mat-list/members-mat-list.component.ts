import { Component, ViewChild, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembersService } from 'src/app/services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members-mat-list',
  templateUrl: './members-mat-list.component.html',
  styleUrls: ['./members-mat-list.component.css'],
})
export class MembersMatListComponent implements OnInit {
  data1: any;
  members: any[] = [];
  members$: Observable<any[]>;
  @Output() public SelectMember = new EventEmitter();
  @Output() public DeleteMemberEvent = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'handicap',
    'email',
    'user',
    'action',
  ];

  constructor(
    private _membersService: MembersService // private _sendMemberService: SendMemberService
  ) {}

  ngOnInit() {
    this.retrieveMembers();
  }

  addMember(mem) {
    this.SelectMember.emit(mem);
  }

  retrieveMembers(): void {
    this._membersService.getMembers().subscribe(
      (data) => {
        this.members = data;
        this.dataSource = new MatTableDataSource<any>(this.members);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
        console.log('From retrieve', data, this.members);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSelect(mem: any) {
    this.SelectMember.emit(mem);
  }

  onDelete(index, member) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this._membersService.deleteMember(member._id).subscribe();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
