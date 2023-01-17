import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Match } from 'src/app/models/match';
import { LineUps } from 'src/app/models/member';
import { Score } from 'src/app/models/score';
import { MembersService } from 'src/app/services/members.service';
import { ScoresService } from 'src/app/services/scores.service';
import { StrokesService } from 'src/app/services/strokes.service';

@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css'],
})
export class MatchScoreComponent implements OnInit {
  @Input() public match: Match;
  public scoreForm: UntypedFormGroup;
  public arr: UntypedFormArray;
  hideScore = false;
  players: any[] = [];
  frontTot: number[] = [0];
  backTot: number[] = [0];
  totTot: number[] = [];
  score: number[] = [];
  @Output() public UpdateScoresEvent = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private _scoresService: ScoresService,
    private _strokesService: StrokesService,
    private _membersService: MembersService
  ) {}
  ngOnInit(): void {
    this.scoreForm = this.fb.group({
      arr: this.fb.array([]),
    });
    this.players = this.shapePlayers();
    for (let i = 0; i < this.players.length; i++) {
      this.arr = this.scoreForm.get('arr') as UntypedFormArray;
      this.arr.push(this.loadItem(this.players[i], i));
    }
  }
  loadItem(player: any, i: number) {
    let name_Index = player.fullName;
    return this.fb.group({
      name: new UntypedFormControl({ value: name_Index, disabled: true }),
      front: new UntypedFormControl({ value: this.frontTot, disabled: true }),
      back: new UntypedFormControl({ value: this.backTot, disabled: true }),
      totTot: new UntypedFormControl({ value: this.totTot, disabled: true }),
      score: new UntypedFormControl({ value: player.score, disabled: false }),
      scores: new UntypedFormArray(this.loadScoreControls(player, i)),
      scoresToPost: new UntypedFormArray(
        this.loadScoresToPostControl(player, i)
      ),
    });
  }
  loadScoresToPostControl(person, i) {
    let y = [];
    for (let ii = 0; ii < 18; ii++) {
      if (person.hasOwnProperty('scoresToPost')) {
        console.log('STP', person.scoresToPost[ii]);
        y.push(
          new UntypedFormControl({
            value: person.scoresToPost[ii],
            disabled: false,
          })
        );
      } else {
        y.push(new UntypedFormControl({ value: null, disabled: false }));
        person.scoresToPost = [];
      }
    }
    console.log('loadScoreControls scoresToPost Y', y);
    return y;
  }

  loadScoreControls(person, i) {
    let y = [];
    this.frontTot[i] = this.backTot[i] = this.totTot[i] = 0;
    for (let ii = 0; ii < 18; ii++) {
      if (person.hasOwnProperty('scores') && person.scores[ii] != null) {
        y.push(
          new UntypedFormControl({ value: person.scores[ii], disabled: false })
        );
        if (ii < 9) {
          this.frontTot[i] = this.frontTot[i] + person.scores[ii];
          this.totTot[i] = this.totTot[i] + person.scores[ii];
          person.scoresToPost.push(person.scores[ii]);
        } else {
          this.backTot[i] = this.backTot[i] + person.scores[ii];
          this.totTot[i] = this.totTot[i] + person.scores[ii];
          person.scoresToPost.push(person.scores[ii]);
        }
      } else {
        y.push(new UntypedFormControl({ value: null, disabled: false }));
        person.scoresToPost = [];
      }
      // if (person.hasOwnProperty('scoresToPost')) {
      //   console.log('MatchScore', person)
      //   person.scoresToPost.push(person.scores[ii]);
      // } else {
      //   person.scoresToPost = [];
      // }
    }
    console.log('loadScoreControls Y', y);
    return y;
  }

  // returns the inner FormArray based on the index
  scores(index: number): UntypedFormArray {
    return this.arr.at(index).get('scores') as UntypedFormArray;
  }
  scoresToPost(index: number): UntypedFormArray {
    console.log('ARR', this.arr);
    return this.arr.at(index).get('scoresToPost') as UntypedFormArray;
  }
  shapePlayers() {
    let players: Score[] = [];
    const temp = this.match.lineUps;
    if (temp.linupSD) {
      delete temp.lineUpSD;
    }
    let keys: number[] = [];
    for (let key of Object.keys(temp)) {
      if (!isNaN(Number(key))) {
        keys.push(Number(key));
      }
    }
    for (let i = 0; i < keys.length; i++) {
      players.push(temp[i].playerA);
      if (temp[i].playerB) {
        console.log('playerB', temp[i].playerB);
        players.push(temp[i].playerB);
      }
    }
    console.log('shapePlayers', players);
    return players;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.scoreForm.controls[controlName].hasError(errorName);
  };

  save() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].name = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['name']['value'];
      this.players[i].tempscore = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['totTot']['value'];
      this.players[i].score = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['score']['value'];
      this.players[i].postedScore = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['score']['value'];
      this.players[i].scores = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['scores']['value'];

      // this.players[i].score = this.players[i].tempscore[i];
      if (this.players[i].tempscore[i] > 50) {
        this.players[i].score = this.players[i].tempscore[i];
        this.players[i].id = this.players[i]._id;
        this.players[i].scoresToPost = this._strokesService.ESA(
          this.players[i]
        );
        this.players[i].postedScore = this.total18(
          this.players[i].scoresToPost
        );
        console.log('Player ', i, this.players[i]);
      }
      this.players[i].usgaIndexForTodaysScore =
        Math.round(
          (((this.players[i].score - this.players[i].scRating) * 113) /
            this.players[i].scSlope) *
            10
        ) / 10;

      this._scoresService
        .updateScoreANDgetScores(this.players[i])
        .subscribe((resScore) => {
          resScore.sort((a, b) =>
            a.datePlayed.localeCompare(b.datePlayed, undefined)
          );
          console.log('onSubmit', resScore);
          const last = resScore[resScore.length - 1];
          this._membersService
            .getMember(last.memberId)
            .subscribe((resMember) => {
              console.log(
                'onSubmitMember',
                resMember,
                new Date(last.datePlayed),
                new Date(resMember.member.lastDatePlayed)
              );
              if (
                Number(
                  new Date(last.datePlayed) >=
                    new Date(resMember.member.lastDatePlayed)
                ) ||
                resMember.member.lastDatePlayed == null
              ) {
                const x = {
                  ...resMember,
                  _id: last.memberId,
                  usgaIndex: last.usgaIndex,
                  lastDatePlayed: last.datePlayed,
                };
                this._membersService.updateMember(x).subscribe((resMember) => {
                  console.log('onUpdateMember', resMember);
                });
              }
            });
        });
    }
    console.log('Match & PLayers', this.match, this.players);
    console.log('ScoreForm', this.scoreForm.value.arr[0]);
    // this.UpdateScoresEvent.emit(this.match);
    this.hideScore = true;
  }
  finished() {
    this.hideScore = false;
    this.UpdateScoresEvent.emit(this.match);
  }

  onKeyUp(event, index, i) {
    if (event.key === 'Tab') {
      console.log('TAB');
      event.srcElement.form[i * 20 + index + 1].setValue(); //creates an error which does not clear existing value????
    }
    if (event.key > 0 && event.key <= 18) {
      // if ((i * 20 + index + 3) % 20 == 0) {
      //   // this.backTot[i + 1] = 0;
      //   // this.frontTot[i + 1] = 0;
      //   // this.totTot[i + 1] = 0;
      //   console.log('new i', i, 'index', index);
      // }
      if (event.key > 1) {
        // if (index < 18) {
        this.frontTot[i] = this.totalF9(this.scoreForm.value.arr[i].scores);
        this.totTot[i] = this.total18(this.scoreForm.value.arr[i].scores);
        this.backTot[i] = this.totalB9(this.scoreForm.value.arr[i].scores);
        // }
        // if ((index + 3) % 20 == 0) {
        //   // index = index + 2;
        // }
        let nextInput = event.srcElement.form[i * 18 + index + 1];
        nextInput.focus();
        // this.arr.controls[i]['controls']['scoresToPost'].index.setValue(
        //   event.key
        // );
      }
      if (event.key === 'Tab') {
        console.log('TAB');
        event.srcElement.form[i * 20 + index + 2].focus();
      }
    } else {
      // Input Out of Range -- Why does input accept e/E but no other letters?
      event.srcElement.form[i * 20 + index + 2].value = null;
    }
  }
  total18(scores: number[]) {
    return scores.reduce((acc, cv) => acc + cv, 0);
  }
  totalF9(scores: number[]) {
    return scores.slice(0, 9).reduce((acc, cv) => acc + cv, 0);
  }
  totalB9(scores: number[]) {
    return scores.slice(8, 18).reduce((acc, cv) => acc + cv, 0);
  }
}
