import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results-mat-list',
  templateUrl: './results-mat-list.component.html',
  styleUrls: ['./results-mat-list.component.css'],
})
export class ResultsMatListComponent implements OnInit, AfterViewInit {
  // private subscription: Subscription;
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.subscription = this.activatedRoute.data.subscribe((data) => {
      this.activatedRoute.data.subscribe((data) => {
      // this.matches = data.matches;
      this.dataSource = new MatTableDataSource<any>(data.matches);
      // console.log('matches2', this.matches);
    });
  }
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onAdjust(match:any, i:number) {
    this.AdjustScoreEvent.emit(match);
  }
  onStrokes(match:any) {
    this.SelectMatchEvent.emit(match);
  }
  onPrint(mem: any) {
    console.log('Match for Printing', mem);
    this.PrintResultEvent.emit(mem.lineUps);
  }
}
