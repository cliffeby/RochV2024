import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match';
import { Results } from 'src/app/models/results';
import { Score } from 'src/app/models/score';
import { Scorecard } from 'src/app/models/scorecard';
import { ScorecardsService } from 'src/app/services/scorecards.service';
import { ScoresService } from 'src/app/services/scores.service';
import { StrokesService } from 'src/app/services/strokes.service';

@Component({
  selector: 'app-results-mat-strokes',
  templateUrl: './results-mat-strokes.component.html',
  styleUrls: ['./results-mat-strokes.component.css'],
})
export class ResultsMatStrokesComponent implements OnInit {
  subscription: Subscription;
  public scores;
  public scorecard: Scorecard;
  dataSource: MatTableDataSource<Score[]>;
  dataSource2;
  displayedColumns: string[] = ['name', 'scores[0]', 'scores[1]', 'scores[2]', 'scores[3]'];
  paginator: any;
  @Input() public match: Match;
  results: Results[] = [new Results()];
  frontTot = [];
  backTot = [];
  firstTwoRows;

  constructor(
    private _scoresService: ScoresService,
    private _scorecardsService: ScorecardsService,
    private _strokesService: StrokesService
  ) {}


  ngOnInit(): void {
    console.log("match", this.match);
    this.subscription = this._scoresService
      .getScoresByMatch(this.match._id)
      .subscribe(
        (data) => {
          this.scores = data;
          this.dataSource = new MatTableDataSource(this.scores);
          this.dataSource2 = new MatTableDataSource(this._strokesService.createDataSource(this.scores));
          this.firstTwoRows = this._strokesService.createHeaders(this.scores);
          console.log('dataSource2', this.dataSource2.data);
          console.log('dataSource', this.dataSource.data);
          this.dataSource2.data = this.dataSource2.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onRefresh() {
     this.dataSource2.data = this.dataSource2.data;
     console.log('dataSource2Refresh', this.dataSource2.data);
  }

}
