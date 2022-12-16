import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Score } from 'menu-api copy/src/models/score.model';
import { Scorecard } from 'menu-api copy/src/models/scorecard.model';
import { Observable, Subscription } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Match } from 'src/app/models/match';
import { ScorecardsService } from 'src/app/services/scorecards.service';
import { ScoresService } from 'src/app/services/scores.service';
import { Strokes1Service } from 'src/app/services/strokes1.service';
import { SCDataSource } from '../../matches/matches-print-scorecards/sc-data-source';

@Component({
  selector: 'app-matches-print-scorecards',
  templateUrl: './matches-print-scorecards.component.html',
  styleUrls: ['./matches-print-scorecards.component.css'],
})
export class MatchesPrintScorecardsComponent implements OnInit {
  public dataSource3 = new SCDataSource(this._strokesService); // See ItemsDataSource.ts  It creates a data source for the table
  subscription: Subscription;
  public scores:any;
  @Output() public PrintResultEvent1 = new EventEmitter();
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
  ];
  // paginator: any;
  @Input() public match: Match; // match selected from results list
  first3Rows:any; // First  rows of table are sticky headers.
  loading$ = this._strokesService.loadingSubject.asObservable();
  results$: Observable<any>;
  results1: any[];
  players$: Observable<any>;
  scorecards$: Observable<any>;;

  constructor(
    private _scoresService: ScoresService,
    private _strokesService: Strokes1Service,
    private _scorecardService: ScorecardsService
  ) {}

  ngOnInit(): void {
    this.results$ = this._strokesService.combine(this.match);

  }
  onPrint() {}
}
