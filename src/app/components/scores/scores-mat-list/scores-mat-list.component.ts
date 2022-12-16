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
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  groupBy,
  map,
  mergeAll,
  mergeMap,
  take,
  toArray,
} from 'rxjs/operators';
import { ItemPermission } from 'menu-api copy/src/items/item-permission';

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
  displayedColumns: string[] = [
    'name',
    'score',
    'postedScore',
    'scRating',
    'scSlope',
    'usgaIndexForTodaysScore',
    'datePlayed',
    'user',
    'action',
  ];
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
  indexCalc() {
    this._activatedRoute.data
      .pipe(
        map((results) =>
          results.scores.reduce((group:any, item:any) => {
            if (group[item.memberId]) {
              group[item.memberId].push([
                item.usgaIndexForTodaysScore,
                item.datePlayed,
                item.memberId,
              ]);
            } else {
              group[item.memberId] = [];
              group[item.memberId].push([
                item.usgaIndexForTodaysScore,
                item.datePlayed,
                item.memberId,
              ]);
            }
            group[item.memberId].sort((a:any, b:any) =>
              a[1] > b[1] ? -1 : b[1] > a[1] ? 1 : 0
            );
            return group;
          }, {})
        )
      )
      .subscribe((group) => {
        Object.keys(group).forEach((key) => {
          console.log(
            group[key]
              .slice(0, 10)
              .sort((a:any, b:any) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0))
              .slice(0, 3)
              .reduce((key:any, item:any) => {
                if (item.memberId) {
                  item.previousValue + item.currentValue;
                } else {
                  item.memberId = [];
                  item.previousValue + item.currentValue;
                }
                // key.push(item);
              })
          );
        });
      });
    // .subscribe(console.log)
  }

  onViewScore(scr: Score) {
    this.ViewScoreEvent.emit(scr);
  }
  onRecordScore(scr: Score) {
    this.RecordScoreEvent.emit(scr);
    console.log('onScoreSelect');
  }

  onDelete(index:number, score:any) {
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
