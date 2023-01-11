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
import { ActivatedRoute } from '@angular/router';
import { Score } from '../../../models/score';
import { forkJoin, Subscription } from 'rxjs';
// import { MatchesService } from 'src/app/services/matches.service';
import { MembersService } from 'src/app/services/members.service';
import { bufferCount, concatMap, map, tap } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css'],
})
export class IndexListComponent implements OnInit {
  @Input() public scores: Score[];
  private subscription: Subscription;
  indexScore: any[] = [];
  indexScore1: any[] = [];
  name: string = '';
  accIndex: number = 0;
  scoreIndex: number = 0;

  constructor(
    private _membersService: MembersService,
    private _scoresService: ScoresService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.indexScore = this.getIndex();
    // this.activatedRoute.data
    //   .pipe(
    //     map((data) => {
    //       this.scores = data.scores;
    //       // console.log('indexScores', data, this.scores);
    //     })
    //   )
    //   .subscribe();
  }
  getIndex(): any[] {
    forkJoin({
      members: this._membersService.getMembers(), //Get all members
      scores: this._scoresService.getScores(),
    })
      .pipe(
        map((response) => {
          const members = <Array<Member>>response.members;
          const scores = <Array<Score>>response.scores;
          const combinedDocuments: any[] = [];
          scores.map((score: any) => {
            combinedDocuments.push({
              //Where member and score are related by _id, merge properties
              myIndex: score.usgaIndex,
              scoreId: score._id, //save overlapping _id property
              datePlayed: score.datePlayed,
              playingIndex: 0,
              ...members.find((member: Member) => score.memberId == member._id),
              memberId: score.memberId
            });
          });
          return combinedDocuments
            .map(({ myIndex, fullName, datePlayed, playingIndex, scoreId, memberId }) => {
              return { fullName, myIndex, datePlayed, playingIndex , scoreId, memberId};
            })
            .sort(
              (a, b) =>
                a.fullName.localeCompare(b.fullName, undefined, {
                  caseFirst: 'upper',
                }) || b.datePlayed.localeCompare(a.datePlayed, undefined)
            );
        })
      )
      .subscribe((data) => {
        var oldName = '';
        var acc = 0;
        var newIndex = 0;
        var oldPlayingIndex = 0;
        var oldMemberId = '';
        var oldDatePlayed = '';

        data.forEach((item, index, arr) => {
          if (item.fullName == oldName) {
            acc = acc + item.myIndex;
            item.playingIndex = acc / (index - newIndex + 1);
            oldPlayingIndex = item.playingIndex;
          } else {
            console.log('Index', oldName, oldPlayingIndex, oldDatePlayed, oldMemberId);
            oldName = item.fullName;
            acc = item.myIndex;
            item.playingIndex = acc;
            newIndex = index;
            oldMemberId = item.memberId;
            oldDatePlayed = item.datePlayed;
            this.indexScore1.push({name:oldName, usgaIndex: oldPlayingIndex, lastDatePlayed: oldDatePlayed, memberId: oldMemberId})
          }
          if (index - newIndex > 4) {
            delete arr[index];
          }
        })
        console.log('Index1', oldName, oldPlayingIndex, oldDatePlayed, oldMemberId);

        this.indexScore = data;
        console.table(data);
        console.table(this.indexScore1)
      });
    return this.indexScore;
  }

  sortByName(a, b) {
    if (a.fullName < b.fullName) return -1;
    if (a.fullName > b.fullName) return 1;
    return 0;
  }
  // sort_by = (field, reverse, primer) => {

  //   const key = primer ?
  //     function(x) {
  //       return primer(x[field])
  //     } :
  //     function(x) {
  //       return x[field]
  //     };

  //   reverse = !reverse ? 1 : -1;

  //   return function(a:any, b:any) {
  //     return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  //   }
  // }
}
