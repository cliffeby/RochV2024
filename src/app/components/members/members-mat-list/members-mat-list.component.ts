import {
  Component,
  ViewChild,
  OnInit,
  EventEmitter,
  Output,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-members-mat-list',
  templateUrl: './members-mat-list.component.html',
  styleUrls: ['./members-mat-list.component.css'],
})
export class MembersMatListComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  @Output() public SelectMemberEvent = new EventEmitter();
  @Output() public DeleteMemberEvent = new EventEmitter();
  dataSource: MatTableDataSource<Member[]>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'usgaIndex',
    'lastDatePlayed',
    'email',
    // 'user',
    'action',
  ];

  constructor(
    private _membersService: MembersService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this._activatedRoute.data.subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data.members);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onAdd(mem: Member): void {
    this.SelectMemberEvent.emit(mem);
  }

  onSelect(mem: Member): void {
    this.SelectMemberEvent.emit(mem);
  }

  onDelete(index: number, member: Member): void {
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
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
