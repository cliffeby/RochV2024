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
  private subscription: Subscription;
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
    this.subscription = this._activatedRoute.data.subscribe((data) => {
      this.indexScore1 = data.members;
    });
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.indexScore1);
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

 // getIndex(): any[] {
  //   forkJoin({
  //     members: this._membersService.getMembers(), //Get all members
  //     scores: this._scoresService.getScores(),
  //   })
  //     .pipe(
  //       map((response) => {
  //         const members = <Array<Member>>response.members;
  //         const scores = <Array<Score>>response.scores;
  //         const combinedDocuments: any[] = [];
  //         scores.map((score: any) => {
  //           combinedDocuments.push({
  //             //Where member and score are related by _id, merge properties
  //             myIndex: score.usgaIndexForTodaysScore,
  //             scoreId: score._id, //save overlapping _id property
  //             datePlayed: score.datePlayed,
  //             playingIndex: 0,
  //             ...members.find((member: Member) => score.memberId == member._id),
  //             memberId: score.memberId
  //           });
  //         });
  //         return combinedDocuments
  //           .map(({ myIndex, fullName, fullNameR, datePlayed, playingIndex, scoreId, memberId }) => {
  //             return { fullName, fullNameR, myIndex, datePlayed, playingIndex , scoreId, memberId};
  //           })
  //           .sort(
  //             (a, b) =>
  //               a.fullNameR.localeCompare(b.fullNameR, undefined, {
  //                 caseFirst: 'upper',
  //               }) || b.datePlayed.localeCompare(a.datePlayed, undefined)
  //           );
  //       })
  //     )
  //     .subscribe((data) => {
  //       var oldName = '';
  //       var acc = 0;
  //       var newIndex = 0;
  //       var oldPlayingIndex = 0;
  //       var oldMemberId = '';
  //       var oldDatePlayed = '';

  //       data.forEach((item, index, arr) => {
  //         if (item.fullNameR == oldName){
  //           if (index - newIndex > 5){
  //             delete arr[index]
  //           }
  //         } else{
  //           newIndex = index;
  //           oldName = item.fullNameR;
  //         }
  //       })
  //       data.sort(
  //         (a, b) =>
  //           a.fullNameR.localeCompare(b.fullNameR, undefined, {
  //             caseFirst: 'upper',
  //           }) || a.datePlayed.localeCompare(b.datePlayed, undefined)
  //       );
  //       oldName = '';
  //       acc = 0;
  //       newIndex = 0;
  //       oldPlayingIndex = 0;
  //       oldMemberId = '';
  //       oldDatePlayed = '';

  //       data.forEach((item, index) => {
  //         if (item.fullNameR == oldName) {
  //           acc = acc + item.myIndex;
  //           item.playingIndex = acc / (index - newIndex + 1);
  //           oldPlayingIndex = item.playingIndex;
  //           oldDatePlayed = item.datePlayed;
  //         } else {
  //           this.indexScore1.push({name:oldName, usgaIndex: oldPlayingIndex, 
  //             lastDatePlayed: oldDatePlayed, memberId: oldMemberId})
          
  //           oldName = item.fullNameR;
  //           acc = item.myIndex;
  //           oldPlayingIndex = acc;
  //           newIndex = index;
  //           oldMemberId = item.memberId;
  //           oldDatePlayed = item.datePlayed;
  //       }})
  //       this.indexScore1.push({name:oldName, usgaIndex: oldPlayingIndex, 
  //         lastDatePlayed: oldDatePlayed, memberId: oldMemberId})
  //       this.indexScore1.shift();  
  //       this.indexScore = data;
  //       console.table(data);
  //       console.table(this.indexScore1)
  //       this.dataSource = new MatTableDataSource(this.indexScore1);
  //     });
  //   return this.indexScore;
  // }

  // sortByName(a, b) {
  //   if (a.fullNameR < b.fullNameR) return -1;
  //   if (a.fullNameR > b.fullNameR) return 1;
  //   return 0;
  // }

