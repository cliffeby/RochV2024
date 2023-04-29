import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { ActivatedRoute } from '@angular/router';
import { Score } from '../../../models/score';
import { forkJoin, Subscription } from 'rxjs';
import { MembersService } from 'src/app/services/members.service';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { ScoresService } from 'src/app/services/scores.service';
import { IndexPrintService } from 'src/app/services/index-print.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css'],
})
export class IndexListComponent implements OnInit, AfterViewInit, OnChanges {
  // @Input() public scores: Score[];
  // private subscription: Subscription;
  todayDate : Date = new Date();
  // indexScore: any[] = [];
  indexScore1: any[] = [];
  // name: string = '';
  // accIndex: number = 0;
  scoreIndex: number = 0;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'usgaIndex',
    'lastDatePlayed',
  ];

  constructor(
    private _indexPrintService: IndexPrintService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data.members);
      this.indexScore1 = data.members;
    });
  }
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<any>(this.indexScore1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(changes);
  }
  printIndexes(){
    this._indexPrintService.printPDF(this.indexScore1);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

