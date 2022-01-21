import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Score } from 'src/app/models/score';
import { forkJoin, Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { ScoresService } from 'src/app/services/scores.service';
import { Match } from 'src/app/models/match';
import { map } from 'rxjs/operators';
import { MatchesService } from 'src/app/services/matches.service';
import { ScorecardsService } from 'src/app/services/scorecards.service';
import { Scorecard } from 'src/app/models/scorecard';

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
  public myscore: Score;
  public scores: any[] = [];
  @Output() public pairings: any[] = [];
  queryString: String;
  @Input() public match: Match; // Model Match contains populated scorecard which is not valid
  score: Score = new Score();
  players: number = 0;
  scorecards = [];
  scplayers: any[] = [];

  constructor(
    private _membersService: MembersService,
    private _scoresService: ScoresService,
    private _matchesService: MatchesService,
    private _scorecardsService: ScorecardsService,
    private cd: ChangeDetectorRef
  ) {
    this.players = 0;
  }

  // This component uses a Score record to determine if a Member is playing.
  //  If the Member is playing, the score record is created.
  //  If the Member is not playing, the score record is deleted.

  ngOnInit() {

    this.getPlayers();

    // this._scoreService.getScores(this.match._id).subscribe((data) => {
    //   this.scores = data;
    //   console.log('Scores for this match', this.match, this.scores)
    // });
  }
  getPlayers(): void {
    this.queryString = '';
    if (this.match._id) {
      //Merge the Member and Scores collections for the match into a new Members collection
      //Since Scores are added last, its _id overrides the Member._id.
      //Use the duplicate Member.id property for Members
      //Use the Member._id property for Scores.

      this.subscription1 = forkJoin({
        members: this._membersService.getMembers(), //Get all members
        scores: this._scoresService.getScoresByMatch(this.match._id), //Get only Scores for this match
      })
        .pipe(
          map((response) => {
            const members = <Array<Member>>response.members;
            const scores = <Array<Score>>response.scores;
            const memberBlock: any[] = [];
            members.map((member: any) => {
              memberBlock.push({
                //Where member and score are related, merge properties
                ...member,
                memberId: member._id, //save overlapping _id property
                // ...scores,
                ...scores.find(
                  (score: Score) => score.memberId == member._id
                ),
              });
            });
            return memberBlock;
          })
        )
        .subscribe((data) => {
          console.log('this.scoremembers', data);
          this.members = data;
          this.getScorecardInfo(data);
          // this.whosPlaying();
          return this.scplayers;

        });
    }
  }
  getScorecardInfo(players: any[]) {
    let scorecards: Scorecard[];

    this._scorecardsService.getScorecards().subscribe((data) => {
      scorecards = data;
      let msc: Scorecard | any = scorecards.find(
        (scorecard) => scorecard._id == this.match.scorecardId
      );
      console.log('match SC', msc,'match', this.match, 'mscId',this.match.scorecardId);
      for (var player of players) {
        for (var pscId of player['scorecardsId']) {
          console.log('pscId', pscId, player);
          const psc: Scorecard | any = scorecards.find(
            (psc) => psc._id == pscId
          );
          if (msc.groupName == psc.groupName) {
            player = { ...player, sc: psc.name, scRating: psc.rating, scSlope: psc.slope };
            this.scplayers.push(player);
            console.log(
              'Players with scorecards2',
              msc.groupName,
              psc.groupName,
              player
            );
          }
        }
        if(player.sc == null){
          player = { ...player, sc: 'No Course' };
          this.scplayers.push(player);
          console.log('Players with scorecards3', player, this.scplayers);
        }
      }
      // }
      console.log('SCP', this.scplayers);
      this.whosPlaying();
    });
  }

  // Count the number of players in the match.  Name property only exists in Scores collection
  // So if the merged Memeber collection has a name property, member is playing.
  whosPlaying() {
    for (let j = 0; j < this.scplayers.length; j++) {
      if (this.scplayers[j].hasOwnProperty('name')) {
        this.scplayers[j].isPlaying = true;
        this.players++;
        this.pairings.push(this.scplayers[j]);
        this.sendEmployeeDetail(this.pairings);
        console.log('Member', this.scplayers[j], this.pairings);
      }
    }
    this.updatewhoisplaying.emit(this.pairings);
  }
  sendEmployeeDetail(member) {
    this._matchesService.sendEmployeeDetail(member);
  }

  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      (member as any).scorecard = {};

      //Create a new Score record
      this.players++;
      this.score.matchId = this.match._id;
      this.score.memberId = member.id;
      // Course handicap = Handicap Index X Slope Rating/113 + (Course Rating-Par) divided by 113

      this.score.user = '**' + this.match.user;
      this.score.scorecardId = member.scorecardId;
      this.score.usgaIndex = member.usgaIndex;
      this.score.handicap = Math.round(
        (member.usgaIndex * member.scSlope) / 113 +
          (member.scRating - 72)
      );
      this.score.name =
        this.match.name + ' ' + member.firstName + ' ' + member.lastName + ' score';
      console.log('score', this.score, member);
       this.subscription2 = this._scoresService
         .createScore(this.score)
         .subscribe((data) => {this.score = data;
          member._id = data.scoreCreated._id;
      this.pairings.push(member);
      this.updatewhoisplaying.emit(this.pairings);
      this.sendEmployeeDetail(this.pairings);
      console.log('score', this.score, 'member',member, 'pairings', this.pairings);});

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
      this.sendEmployeeDetail(this.pairings);
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
    // this.subscription3.unsubscribe();
  }
}
