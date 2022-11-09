import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ScoresService } from '../../../services/scores.service';
import { Score } from '../../../models/score';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scores-mat-list',
  templateUrl: './scores-mat-list.component.html',
  styleUrls: ['./scores-mat-list.component.css'],
})
export class ScoresMatListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public unauth: boolean;
  // @Input() scores: Score[];
  scores: Score[];
  @Output() ViewScoreEvent = new EventEmitter();
  @Output() public DeleteScorecardEvent = new EventEmitter();
  @Output() RecordScoreEvent = new EventEmitter();
  dataSource: MatTableDataSource<Score[]>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'score', 'postedScore', 'scRating' , 'scSlope' ,'usgaIndexForTodaysScore',  'datePlayed', 'user', 'action'];
  subscription: Subscription;
  queryString: string;

  constructor(
    private _scoresService: ScoresService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //  this.subscription = this._scoresService.getScores().subscribe(
    //    (data) => {
    //      this.scores = data;
    //      this.dataSource = new MatTableDataSource<Score[]>(data);
    //      this.dataSource.paginator = this.paginator;
    //    },
    //    (error) => {
    //      console.log(error);
    //    }
    //  );
    this.subscription = this._activatedRoute.data.subscribe((data) => {
      this.scores = data.scores;
      this.dataSource = new MatTableDataSource<any>(this.scores);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onViewScore(scr: Score) {
    this.ViewScoreEvent.emit(scr);
  }
  onRecordScore(scr:Score){
    this.RecordScoreEvent.emit(scr);
    console.log('onScoreSelect');
  }

  onDelete(index, score) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.subscription = this._scoresService
        .deleteScore(score._id)
        .subscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
