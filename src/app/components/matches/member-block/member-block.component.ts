import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-block',
  templateUrl: './member-block.component.html',
  styleUrls: ['./member-block.component.css'],
})
export class MemberBlockComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public members: Member[];
  queryString: String;
  match: any = {}

  constructor(private _membersService: MembersService) {
    this.match.players = 0;
  }

  ngOnInit(): void {
    this.subscription = this._membersService.getMembers().subscribe(
      (data) => {
        this.members = data;
        // this.dataSource = new MatTableDataSource<any>(this.members);
      },
      (error) => {
        console.log(error);
      }
    );
    this.queryString = '';
  }

  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      this.match.players++;
      // this.score.matchId = this.match._id;
      // this.score.memberId = member._id;
      // this.score.cap = member.currentHCap;
      // this.score.name =
        this.match.name + ' ' + member.firstName + ' ' + member.lastName;
      // this.score.memberName = member.firstName + ' ' + member.lastName;
      // this._scoreservice.addScore(this.score).subscribe((resNewScore) => {
      //   this.scores = [...this.scores, resNewScore];


      // console.log(
      //   'From member-block1',
      //   this.match.players,
      //   this.score.name,
      //   this.score.memberName
      // );
    } else {
      this.match.players--;
      // const scoreArray = this.scores;
      // for (let i = 0; i < this.scores.length; i++) {
      //   if (
      //     this.scores[i].memberId === member._id &&
      //     this.scores[i].matchId === this.match._id
      //   ) {
      //     this._scoreservice
      //       .deleteScore(this.scores[i])
      //       .subscribe((resDeletedScore) => {
      //         for (let i = 0; i < scoreArray.length; i++) {
      //           if (scoreArray[i]._id === this.score._id) {
      //             scoreArray.splice(i, 1);
      //           }
      //         }
      //       });
      //   }
      // }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
