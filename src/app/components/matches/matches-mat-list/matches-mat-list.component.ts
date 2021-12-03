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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatchesService } from '../../../services/matches.service';
import { Match } from 'src/app/models/match';
@Component({
  selector: 'app-matches-mat-list',
  templateUrl: './matches-mat-list.component.html',
  styleUrls: ['./matches-mat-list.component.css']
})
export class MatchesMatListComponent implements OnInit, AfterViewInit {
  private subscription: any;
  @Input() matches: Match[] = [];
  @Output() public SelectMatchEvent = new EventEmitter();
  @Output() public DeleteMatchEvent = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['name', 'scorecardId', 'datePlayed','user', 'action'];

  constructor(private _matchesService: MatchesService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.retrieveMatches();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log('Sort', this.sort);
      // this.sort.sortChange.subscribe((x) => {
      //   console.log(x);
      // });
    }, 1000);
  }

  retrieveMatches(): void {
    this.subscription = this._matchesService.getMatches().subscribe(
      (data) => {
        this.matches = data;
        this.dataSource = new MatTableDataSource<any>(this.matches);
        // this.dataSource.sort = this.sort;
        // console.log('Sort2', this.sort);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAdd(mem) {
    this.SelectMatchEvent.emit(mem);
  }

  onSelect(mem: any) {
    this.SelectMatchEvent.emit(mem);
  }

  onDelete(index, match) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.subscription = this._matchesService
        .deleteMatch(match._id)
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
