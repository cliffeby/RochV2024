import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match';
import { ScoresService } from 'src/app/services/scores.service';
import { Strokes1Service } from 'src/app/services/strokes1.service';
import { SCDataSource } from '../../matches/matches-print-scorecards/sc-data-source';

@Component({
  selector: 'app-matches-print-scorecards',
  templateUrl: './matches-print-scorecards.component.html',
  styleUrls: ['./matches-print-scorecards.component.css'],
})
export class MatchesPrintScorecardsComponent implements OnInit {
  @Input() public match: Match; // match selected from results list
  public dataSource3 = new SCDataSource(this._strokes1Service); // See SCDataSource.ts  It creates a data source for the table
  subscription: Subscription;
  public dataSource = new MatTableDataSource();
  public scores;
  @Output() public PrintResultEvent1 = new EventEmitter();
  // displayedColumns;
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
    'scores[18]',
    'scores[19]',
    'scores[20]',
    'scores[21]',
    'scores[22]',
    // 'nine',
  ];
  // paginator: any;

  first3Rows; // First two rows of table are sticky headers.
  loading$ = this._strokes1Service.loadingSubject.asObservable();

  constructor(
    private _scoresService: ScoresService,
    private _strokes1Service: Strokes1Service
  ) {}

  ngOnInit(): void {
    console.log('Match     PrintScorecardsComponent.ngOnInit()', this.match);
    this._strokes1Service.loadingSubject.next(true);
    console.log('ResultsMatStrokesComponent.ngOnInit()', this.displayedColumns);
    this.subscription = this._scoresService
      .getScoresByMatch(this.match._id)
      .subscribe(
        (data) => {
          this.scores = data;
          // const columns = this._strokes1Service.createColumns();
          // this.displayedColumns = columns.map((c) => c.columnDef);
          this._strokes1Service.createDataSource(this.scores); // Shapes data for use by datasource
          this.first3Rows = this._strokes1Service.createHeaders(this.scores); // creates par and hcap sticky header rows.  TODO add Yards
          console.log('ResultsMatStrokesComponent.ngOnInit()', this.first3Rows);
          console.log('dataSource3', this.dataSource3);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onPrint() {
    // this.PrintResultEvent1.emit(this.dataSource3);
    window.print();
  }
}
