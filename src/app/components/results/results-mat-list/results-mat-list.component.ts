import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-results-mat-list',
  templateUrl: './results-mat-list.component.html',
  styleUrls: ['./results-mat-list.component.css'],
})
export class ResultsMatListComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  @Input() public matches: any[] = [];
  @Output() public SelectMatchEvent = new EventEmitter();
  @Output() public AdjustScoreEvent = new EventEmitter();
  @Output() public PrintResultEvent = new EventEmitter();
  // @Output() public UnLockMatchEvent = new EventEmitter();
  // @Output() public DeleteMatchEvent = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'scorecardId',
    '#',
    'datePlayed',
    'status',
    'action',
  ];

  constructor(
    private _matchesService: MatchesService,
    private _scoresService: ScoresService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.data.subscribe((data) => {
      this.matches = data.matches;
      console.log('matches2', this.matches);
    });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.matches);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onAdjust(match, i) {
    this.AdjustScoreEvent.emit(match);
  }
  onStrokes(match) {
    this.SelectMatchEvent.emit(match);
  }
  onPrint(mem: any) {
    console.log('Match for Printing', mem);
    this.PrintResultEvent.emit(mem.lineUps);
  }
}
