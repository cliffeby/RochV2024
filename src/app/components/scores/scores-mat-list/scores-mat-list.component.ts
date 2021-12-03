import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ScoresService } from '../../../services/scores.service';
import { Score } from '../../../models/score';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scores-mat-list',
  templateUrl: './scores-mat-list.component.html',
  styleUrls: ['./scores-mat-list.component.css'],
})
export class ScoresMatListComponent implements OnInit, AfterViewInit {
  public unauth: boolean;
  @Input() scores: Score[];
  @Output() SelectScoreEvent = new EventEmitter();
  @Output() public DeleteScorecardEvent = new EventEmitter();
  dataSource: MatTableDataSource<Score[]>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'handicap', 'score', 'user', 'action'];
  subscription: Subscription;

  constructor(private _scoresService: ScoresService) {}

  ngOnInit() {
     this.subscription = this._scoresService.getScores().subscribe(
       (data) => {
         this.scores = data;
         this.dataSource = new MatTableDataSource<Score[]>(data);
         this.dataSource.paginator = this.paginator;
       },
       (error) => {
         console.log(error);
       }
     );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSelectScore(scr: Score) {
    this.SelectScoreEvent.emit(scr);
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
}
