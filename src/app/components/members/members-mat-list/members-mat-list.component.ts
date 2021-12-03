import {
  Component,
  ViewChild,
  OnInit,
  EventEmitter,
  Output,
  Input,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-members-mat-list',
  templateUrl: './members-mat-list.component.html',
  styleUrls: ['./members-mat-list.component.css'],
})
export class MembersMatListComponent implements OnInit, AfterViewInit {
  private subscription: any;
  @Input() members: any[] = [];
  @Output() public SelectMemberEvent = new EventEmitter();
  @Output() public DeleteMemberEvent = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'handicap',
    'email',
    'user',
    'action',
  ];

  constructor(private _membersService: MembersService) {}

  ngOnInit() {
    this.subscription = this._membersService.getMembers().subscribe(
      (data) => {
        this.members = data;
        this.dataSource = new MatTableDataSource<Member[]>(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    }, 500);
  }

  onAdd(mem) {
    this.SelectMemberEvent.emit(mem);
  }

  onSelect(mem: any) {
    this.SelectMemberEvent.emit(mem);
  }

  onDelete(index, member) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.subscription = this._membersService
        .deleteMember(member._id)
        .subscribe();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
