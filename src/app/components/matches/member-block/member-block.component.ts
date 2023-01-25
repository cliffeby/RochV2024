import {
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Score } from 'src/app/models/score';
import { forkJoin, } from 'rxjs';
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
export class MemberBlockComponent implements OnInit{
  public members: Member[];
  public myscore: Score;
  public scores: any[] = [];
  @Output() public pairings: any[] = [];
  queryString: String;
  @Input() public match: Match = {_id: '1'}; // Karma Tessting requires match to be defined. _id is a dummy value.
  score: Score = new Score();
  players: number = 0; //Player count
  scorecards:any[] = [];
  scplayers: any[] = [];

  constructor(
    private _membersService: MembersService,
    private _scoresService: ScoresService,
    private _matchesService: MatchesService,
    private _scorecardsService: ScorecardsService,
  ) {
    this.players = 0;
  }

  // This component uses a Score record and "Member.isPlaying toggle.
  //  If Score document exists, Member.isPlaying.  If new player is added-
  //       Member is playing, the score record is created.
  //  If Member.isPlaying is toggled false, the score record is deleted.
  //
  //  Score record holds ALL data needed for a players match.

  ngOnInit() {
    this.queryString = '';
    if (this.match._id) {
      //Merge the Member and Scores collections for the match into a new Members collection using FORKJOIN
      //Since Scores are added last, its _id overrides the Member._id.
      //Use the duplicate Member.id property for Members
      //Use the Member._id property for Scores.

      forkJoin({
        members: this._membersService.getMembers(), //Get all members
        scores: this._scoresService.getScoresByMatch(this.match._id), //Get only Scores for this match
      })
        .pipe(
          map((response) => {
            const members = <Array<Member>>response.members;
            const scores = <Array<Score>>response.scores;
            const combinedDocuments: any[] = [];
            members.map((member: any) => {
              combinedDocuments.push({
                //Where member and score are related by _id, merge properties
                ...member,
                memberId: member._id, //save overlapping _id property
                // ...scores,
                ...scores.find((score: Score) => score.memberId == member._id),
              });
            });
            return combinedDocuments;
          })
        )
        .subscribe((data) => {
          console.log('this.combinedDocuments', data);
          this.members = data;
          this.getScorecardInfo(data); //Add scorecard info for each player to document
          return this.scplayers;
        });
    }
  }
  getScorecardInfo(players: any[]) {
    let scorecards: Scorecard[];
    this._scorecardsService.getScorecards().subscribe((data) => {
      scorecards = data;
      // Get the course associated with the match.scorecardId
      let msc: Scorecard | any = scorecards.find(
        (scorecard) => scorecard._id == this.match.scorecardId
      );
      // console.log('match SC', msc,'match', this.match, 'mscId',this.match.scorecardId);

      // For each player, find the scorecard associated with the default tees for the course.
      for (var player of players) {
        for (var pscId of player['scorecardsId']) {
          console.log('pscId', pscId, player);
          const psc: Scorecard | any = scorecards.find(
            (psc) => psc._id == pscId
          );
          // When found, add some scorecard properties to the player document and push the document onto a new scplayers array
          if (msc.groupName == psc.groupName) {
            player = {
              ...player,
              scorecardId: psc._id,
              sc: psc.name,
              scRating: psc.rating,
              scSlope: psc.slope,
              scParInputString: psc.parInputString,
              scHCapInputString: psc.hCapInputString,
              scYardInputString: psc.yardsInputString
            };
            this.scplayers.push(player);
          }
        }
        // If no defualt tees are found, add a No Course sc property
        if (player.sc == null) {
          player = { ...player, sc: 'No Course' };
          this.scplayers.push(player);
        }
      }
      console.log('SCP', this.scplayers);
      // scplayers array now contains ALL player data needed to create a match
      this.whosPlaying();
    });
  }

  // Count the number of players in the match.  name property exists in Scores collection
  // So if the merged Member document has a name property, member is playing.
  whosPlaying() {
    for (let j = 0; j < this.scplayers.length; j++) {
      // scplayers name property is the Score name (match name + player name).
      if (this.scplayers[j].hasOwnProperty('name')) {
        this.scplayers[j].isPlaying = true;
        this.players++;
        this._matchesService.numberPlaying(this.players); //Update number of players in match in matches service.
        this.pairings.push(this.scplayers[j]); //pairings is a new array of those players who are playing
        this._matchesService.shapePlayers(this.pairings); // Sorts players by USGAIndex and stores array in BehaviorSubject - sortByIndexSubject
        console.log('Member', this.scplayers[j], this.pairings);
      }
    }
  }

  // Create and delete score documents for each player.
  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      (member as any).scorecard = {};

      //Create a new Score record
      this.players++;
      this._matchesService.numberPlaying(this.players);
      this.score.matchId = this.match._id;
      this.score.memberId = member.id;
      this.score.user = '**' + this.match.user;
      this.score.scorecardId = member.scorecardId;
      this.score.scSlope = member.scSlope;
      this.score.scRating = member.scRating;
      this.score.usgaIndex = member.usgaIndex;
      this.score.datePlayed = this.match.datePlayed;
      this.score.scHCaps = this._scoresService.stringToArray(member.scHCapInputString);
      this.score.scPars = this._scoresService.stringToArray(member.scParInputString);
      this.score.scYards = this._scoresService.stringToArray(member.yardsInputString);
      // USGA method to determine course handicap from a player's USGAIndex
      // Course handicap = Handicap Index X Slope Rating/113 + (Course Rating-Par) divided by 113
      this.score.handicap = Math.round(
        member.usgaIndex * member.scSlope / 113 + (member.scRating - 72));
      member.handicap = this.score.handicap;
      this.score.name =
        // this.match.name +
        // ' ' +
        member.fullName +
        ' ' 
        // member.lastName;
        // ' ' +
        // member.handicap;
      // console.log('score', this.score, member);
      this._scoresService
        .createScore(this.score)
        .subscribe((data) => {
          this.score = data;
          member._id = data.scoreCreated._id; //The RESponse document is scoreCreated with a _id property.  Recall member._id was previouly ovwerwritten with the score._id.
          this.pairings.push(member);
          this._matchesService.shapePlayers(this.pairings);// Sorts players by USGAIndex and stores array in BehaviorSubject - sortByIndexSubject
        });
    } else {
      this.players--;
      this._matchesService.numberPlaying(this.players);
      this._scoresService
        .deleteScore(member._id)
        .subscribe(); //Actually the original score _id

      for (let i = 0; i < this.pairings.length; i++) {
        if (this.pairings[i]._id === member._id) {
          this.pairings.splice(i, 1);
        }
      }
      this._matchesService.shapePlayers(this.pairings);
    }
  }
}
