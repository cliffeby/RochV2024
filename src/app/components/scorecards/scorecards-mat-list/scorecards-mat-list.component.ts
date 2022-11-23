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
import { ScorecardsService } from '../../../services/scorecards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scorecards-mat-list',
  templateUrl: './scorecards-mat-list.component.html',
  styleUrls: ['./scorecards-mat-list.component.css'],
})
export class ScorecardsMatListComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  @Input() scorecards: any[] = [];
  @Output() public SelectScorecardEvent = new EventEmitter();
  @Output() public DeleteScorecardEvent = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['groupName','name', 'rating', 'user', 'action'];

  constructor(private _scorecardsService: ScorecardsService) {}

  ngOnInit() {
     this.retrieveScorecards();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  retrieveScorecards(): void {
    this.subscription = this._scorecardsService.getScorecards().subscribe(
      (data) => {
        this.scorecards = data;
        this.dataSource = new MatTableDataSource<any>(this.scorecards);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAdd(mem) {
    this.SelectScorecardEvent.emit(mem);
  }

  onSelect(mem: any) {
    this.SelectScorecardEvent.emit(mem);
  }

  onDelete(index, scorecard) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.subscription = this._scorecardsService
        .deleteScorecard(scorecard._id)
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
