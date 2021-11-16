// import { Member } from '../../../models/member';
// import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembersService } from 'src/app/services/members.service';
import { SendMemberService } from 'src/app/services/send-members.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-members-mat-list',
  templateUrl: './members-mat-list.component.html',
  styleUrls: ['./members-mat-list.component.css'],
})
export class MembersMatListComponent implements OnInit {
  data1:any;
  members: any[] = [];
  members$:Observable<any[]>;
  public SelectMember = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    '_id',
    'firstName',
    'lastName',
    // 'section',
    'action',
  ];

  // constructor(private studentApi: ApiService) {
  //   this.studentApi.GetStudents().subscribe((data) => {
  //     this.StudentData = data;
  //     this.dataSource = new MatTableDataSource<Student>(this.StudentData);
  //     setTimeout(() => {
  //       this.dataSource.paginator = this.paginator;
  //     }, 0);
  //   });
  // }
  constructor(
    private _membersService: MembersService,
    private _sendMemberService: SendMemberService
  ) {}

  ngOnInit() {
    this.retrieveMembers();
    // this.members$ = this._sendMemberService.members$();
    // console.log('Members$', this.members$);
  }

  sendMember(sendData): void {
    // send message to subscribers via observable subject
    this._sendMemberService.create(sendData);
    this._sendMemberService.create2(sendData);
  }

  clearMessages(): void {
    // clear messages
    this._sendMemberService.remove(11);
  }

  retrieveMembers(): void {
    this._membersService.getMembers().subscribe(
      (data) => {
        this.members = data;
        this.dataSource = new MatTableDataSource<any>(this.members);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
        console.log('From retrieve',data, this.members);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSelect(mem: any) {
    console.log('mem', mem);
    this.data1 = mem;
    this.sendMember(mem);
    // this.SelectMember.emit(mem);
  }

  deletemember(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this._membersService.deleteMember(e._id).subscribe();
    }
  }
}
