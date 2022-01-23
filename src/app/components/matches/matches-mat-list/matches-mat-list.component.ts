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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScoresService } from 'src/app/services/scores.service';
@Component({
  selector: 'app-matches-mat-list',
  templateUrl: './matches-mat-list.component.html',
  styleUrls: ['./matches-mat-list.component.css'],
})
export class MatchesMatListComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  @Input() matches: Match[] = [];
  @Output() public SelectMatchEvent = new EventEmitter();
  @Output() public ScoreMatchEvent = new EventEmitter();
  @Output() public PrintMatchEvent = new EventEmitter();
  @Output() public UnLockMatchEvent = new EventEmitter();
  @Output() public DeleteMatchEvent = new EventEmitter();
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
      this.dataSource = new MatTableDataSource<any>(this.matches);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onAdd(mem) {
    this.SelectMatchEvent.emit(mem);
  }

  onSelect(mem: any) {
    this.SelectMatchEvent.emit(mem);
  }
  onScore(mem: any) {
    this.ScoreMatchEvent.emit(mem);
  }
  onPrint(mem: any) {
    this.PrintMatchEvent.emit(mem);
  }
  onUnLock(mem: any) {
    this.UnLockMatchEvent.emit(mem);
    this._matchesService.matchStatusSubject.next("open");
  }

  onDelete(index, match) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.subscription = this._scoresService
        .deleteMatchScores(match._id)
        .subscribe();
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
