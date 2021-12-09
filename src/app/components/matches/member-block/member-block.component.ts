import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Score } from 'src/app/models/score';
import { forkJoin, Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { ScoresService } from 'src/app/services/scores.service';
import { Match } from 'src/app/models/match';
import { map } from 'rxjs/operators';
import e from 'menu-api/node_modules/@types/express';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-member-block',
  templateUrl: './member-block.component.html',
  styleUrls: ['./member-block.component.css'],
})
export class MemberBlockComponent implements OnInit, OnDestroy {
  private subscription1: Subscription;
  private subscription2: Subscription;
  @Output() public updatewhoisplaying = new EventEmitter();
  public members: Member[];
  public scores: any[] = [];
  @Output() public pairings: any[] = [];
  queryString: String;
  @Input() public match: any; // Model Match contains populated scorecardId which is not valid
  score: Score = new Score();
  players: number = 0;

  constructor(
    private _membersService: MembersService,
    private _scoresService: ScoresService
  ) {
    this.players = 0;
  }

  // This component uses a Score record to determine if a Member is playing.
  //  If the Member is playing, the score record is created.
  //  If the Member is not playing, the score record is deleted.

  ngOnInit(): void {
    this.queryString = '';
    if (this.match._id) {
      //Merge the Member and Scores collections for the match into a new Members collection
      //Since Scores are added last, its _id overrides the Member._id.
      //Use the duplicate Member.id property for Members
      //Use the Member._id property for Scores.
      this.subscription1 = forkJoin({
        members: this._membersService.getMembers(), //Get all members
        scores: this._scoresService.getScoreByMatch(this.match._id), //Get omly Scores for this match
      })
        .pipe(
          map((response) => {
            const members = <Array<any>>response.members;
            const scores = <Array<Score>>response.scores;
            const memberBlock: any[] = [];
            members.map((member: any) => {
              memberBlock.push({
                //Where member and score are related, merge properties
                ...member,
                ...scores.find((score: any) => score.memberId === member._id),
              });
            });
            return memberBlock;
          })
        )
        .subscribe((data) => {
          console.log('this.members', data);
          this.members = data;
          this.whosPlaying();
        });
    }
  }
  // Count the number of players in the match.  Name property only exists in Scores collection
  // So if the merged Memeber collection has a name property, member is playing.
  whosPlaying() {
    console.log('Called', this.members.length);
    for (let j = 0; j < this.members.length; j++) {
      if (this.members[j].hasOwnProperty('name')) {
        this.members[j].isPlaying = true;
        this.players++;
        this.pairings.push(this.members[j]);
        console.log('Member', this.members[j], this.pairings);
      }
    }
    this.updatewhoisplaying.emit(this.pairings);
  }

  // this.subscription1 = this._membersService.getMembers().subscribe(
  //   (data) => {
  //     this.members = data;
  //     console.log('MBInit-members', this.members);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  // this.queryString = '';
  // this.subscription2 = this._scoresService
  //   .getScoreByMatch(this.match._id)
  //   .subscribe(
  //     (data) => {
  //       this.scores = data;
  //       console.log('MBInit-scores', this.scores);
  //       for (let i = 0; i < this.scores.length; i++) {
  //         for (let j = 0; j < this.members.length; j++) {
  //           if (this.scores[i].memberId === this.members[j]._id) {
  //             this.members[j].isPlaying = true;
  //             this.players++;
  //             console.log('Member', this.members[j]);
  //           }
  //         }
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      //Create a new Score record
      this.players++;
      this.score.matchId = this.match._id;
      this.score.memberId = member.id;
      this.score.usgaIndex = member.usgaIndex;
      this.score.name =
        this.match.name + ' ' + member.firstName + ' ' + member.lastName;
      this.pairings.push(member);
      this.updatewhoisplaying.emit(this.pairings);
      console.log('score', this.score);
      this.subscription2 = this._scoresService
        .createScore(this.score)
        .subscribe();

      // this.scores = [...this.scores, resNewScore];
      // this.scores.push(resNewScore);
    } else {
      this.players--;
      this.subscription2 = this._scoresService
        .deleteScore(member._id)
        .subscribe(); //Actually the original score _id

      for (let i = 0; i < this.pairings.length; i++) {
        if (this.pairings[i]._id === member._id) {
          this.pairings.splice(i, 1);
        }
      }
      this.updatewhoisplaying.emit(this.pairings);
      console.log('From member-block2', member, this.pairings);
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
    // this.subscription3.unsubscribe();
  }
}
