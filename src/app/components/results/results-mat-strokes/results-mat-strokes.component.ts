import { Component, Input, OnInit, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match';

import { ScoresService } from 'src/app/services/scores.service';
import { StrokesService } from 'src/app/services/strokes.service';
import { ItemsDataSource } from './items-data-source';

@Component({
  selector: 'app-results-mat-strokes',
  templateUrl: './results-mat-strokes.component.html',
  styleUrls: ['./results-mat-strokes.component.css'],
})
export class ResultsMatStrokesComponent implements OnInit {
  public dataSource3 = new ItemsDataSource(this._strokesService);  //See ItemsDataSource.ts  It creates a data source for the table
  subscription: Subscription;
  public scores;
  displayedColumns: string[] = [
    'name',
    'scores[0]',
    'scores[1]',
    'scores[2]',
    'scores[3]',
    'scores[4]',
    'scores[5]',
    'scores[6]',
    'scores[7]',
    'scores[8]',
    'scores[9]',
    'scores[10]',
    'scores[11]',
    'scores[12]',
    'scores[13]',
    'scores[14]',
    'scores[15]',
    'scores[16]',
    'scores[17]',
  ];
  // paginator: any;
  @Input() public match: Match;  //match selected from results list
  firstTwoRows; //Fist two rows of table are sticky headers.

  constructor(
    private _scoresService: ScoresService,
    private _strokesService: StrokesService
  ) {}

  ngOnInit(): void {
    this.subscription = this._scoresService
      .getScoresByMatch(this.match._id)
      .subscribe(
        (data) => {
          this.scores = data;
          this._strokesService.createDataSource(this.scores); //Shapes data for use by datasource
          this.firstTwoRows = this._strokesService.createHeaders(this.scores);//creates par and hcap sticky header rows.  TODO add Yards
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onRefresh() {}
}
