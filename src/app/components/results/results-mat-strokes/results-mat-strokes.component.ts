import { CollectionViewer } from '@angular/cdk/collections';
import { Component, Input, OnInit, VERSION } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, of, Subscription } from 'rxjs';
import { Match } from 'src/app/models/match';
import { Results } from 'src/app/models/results';
import { Score } from 'src/app/models/score';
import { Scorecard } from 'src/app/models/scorecard';
import { ScorecardsService } from 'src/app/services/scorecards.service';
import { ScoresService } from 'src/app/services/scores.service';
import { StrokesService } from 'src/app/services/strokes.service';
import { ItemsDataSource } from './items-data-source';

@Component({
  selector: 'app-results-mat-strokes',
  templateUrl: './results-mat-strokes.component.html',
  styleUrls: ['./results-mat-strokes.component.css'],
})
export class ResultsMatStrokesComponent implements OnInit {
  public dataSource3 = new ItemsDataSource(this._strokesService);

  public displayedColumns3: string[] = ['color', 'text'];

  public version = VERSION;

  subscription: Subscription;
  public scores;
  public scorecard: Scorecard;
  dataSource: MatTableDataSource<Score[]>;
  dataSource2;
  displayedColumns: string[] = [
    'name',
    'scores[0]',
    'scores[1]',
    'scores[2]',
    'scores[3]',
    'scores[4]',
  ];
  paginator: any;
  @Input() public match: Match;
  results: Results[] = [new Results()];
  frontTot = [];
  backTot = [];
  firstTwoRows;
  r1:Results =new Results();
  r2:any;


  constructor(
    private _scoresService: ScoresService,
    private _scorecardsService: ScorecardsService,
    private _strokesService: StrokesService
  ) {}

  ngOnInit(): void {
    // this.r1.name = "cliff";
    // this.r1.scores = [1,2,3,4,5,6,7,8,9,10];
    // console.log('match', this.match);
    this.subscription = this._scoresService
      .getScoresByMatch(this.match._id)
      .subscribe(
        (data) => {
          this.scores = data;
          // this.dataSource = new MatTableDataSource(this.scores);
          // this.dataSource2 = new MatTableDataSource(
          //   this._strokesService.createDataSource(this.scores)
          // );
          this.r2 = this._strokesService.createDataSource(this.scores);
          console.log('r2', this.r2);
          // this._strokesService.matchResultSubject.next([this.r1]);
          this.firstTwoRows = this._strokesService.createHeaders(this.scores);
          // console.log('dataSource2', this.dataSource2.data);
          // console.log('dataSource', this.dataSource.data);
          // this.dataSource2.data = this.dataSource2.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // public connect(collectionViewer: CollectionViewer): Observable<Results[]> {
  //   return of(this._strokesService.createDataSource(this.scores));
  // }

  // public disconnect(collectionViewer: CollectionViewer): void {}


  onRefresh() {
    this.dataSource2.data = this.dataSource2.data;
    this.dataSource3 = this.dataSource3;
    console.log('dataSource2Refresh', this.dataSource2.data, this.dataSource3);
     this._strokesService.matchResultSubject.next(this.r2);
  }
}
