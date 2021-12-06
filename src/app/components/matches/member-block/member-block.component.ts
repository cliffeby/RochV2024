import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { ScoresService } from 'src/app/services/scores.service';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-member-block',
  templateUrl: './member-block.component.html',
  styleUrls: ['./member-block.component.css'],
})
export class MemberBlockComponent implements OnInit, OnDestroy {
  private subscription1: Subscription;
  private subscription2: Subscription;
  public members: Member[];
  public scores: any[] = [];
  queryString: String;
  @Input() public match: any; // Model Match contains populated scorecardId which is not valid
  score: Score = new Score();
  players:number = 0;

  constructor(
    private _membersService: MembersService,
    private _scoresService: ScoresService
  ) {
    this.players = 0;
  }

  ngOnInit(): void {
    this.subscription1 = this._membersService.getMembers().subscribe(
      (data) => {
        this.members = data;
        console.log('MBInit-members', this.members);
      },
      (error) => {
        console.log(error);
      }
    );
    this.queryString = '';
    this.subscription2 = this._scoresService
      .getScoreByMatch(this.match._id)
      .subscribe(
        (data) => {
          this.scores = data;
          console.log('MBInit-scores', this.scores);
          for (let i = 0; i < this.scores.length; i++) {
            for (let j = 0; j < this.members.length; j++) {
              if (this.scores[i].memberId === this.members[j]._id) {
                this.members[j].isPlaying = true;
                this.players++;
                console.log('Member', this.members[j]);
              }
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );

  }

  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      this.players++;
      this.score.matchId = this.match._id;
      this.score.memberId = member._id;
      this.score.usgaIndex = member.usgaIndex;
      this.score.name =
        this.match.name + ' ' + member.firstName + ' ' + member.lastName;
      console.log('score', this.score);
      this._scoresService.createScore(this.score).subscribe((resNewScore) => {
        // this.scores = [...this.scores, resNewScore];
        // this.scores.push(resNewScore);

        console.log('From member-block1', this.match.players, this.score, resNewScore, this.scores);
      });

    } else {
      this.players--;
      const scoreArray = this.scores;
      for (let i = 0; i < this.scores.length; i++) {
        if (
          this.scores[i].memberId === member._id &&
          this.scores[i].matchId === this.match._id
        ) {
          this._scoresService
            .deleteScore(this.scores[i])
            .subscribe((resDeletedScore) => {
              for (let i = 0; i < scoreArray.length; i++) {
                if (scoreArray[i]._id === this.score._id) {
                  scoreArray.splice(i, 1);
                }
              }
            });
        }
      }
    }
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
