import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Match } from 'src/app/models/match';
import { LineUps } from 'src/app/models/member';
import { Score } from 'src/app/models/score';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css'],
})
export class MatchScoreComponent implements OnInit {
  @Input() public match: Match;
  public scoreForm: FormGroup;
  public arr: FormArray;
  players = [];
  frontTot: number[] = [0];
  backTot: number[] = [0];
  totTot: number[] = [];
  score: number[] = [];
  @Output() public UpdateScoresEvent = new EventEmitter();

  constructor(private fb: FormBuilder, private _scoresService: ScoresService) {}
  ngOnInit(): void {
    this.scoreForm = this.fb.group({
      arr: this.fb.array([]),
    });
    this.players = this.shapePlayers();
    for (let i = 0; i < this.players.length; i++) {
      this.arr = this.scoreForm.get('arr') as FormArray;
      this.arr.push(this.loadItem(this.players[i], i));
    }
  }
  loadItem(player, i) {
    let name_Index = player.fullName + '-' + player.handicap.toString();
    return this.fb.group({
      name: new FormControl({ value: name_Index, disabled: true }),
      front: new FormControl({ value: this.frontTot, disabled: true }),
      back: new FormControl({ value: this.backTot, disabled: true }),
      totTot: new FormControl({ value: this.totTot, disabled: true }),
      score: new FormControl({ value: player.score, disabled: false }),
      scores: new FormArray(this.loadScoreControls(player, i)),
    });
  }

  loadScoreControls(person, i) {
    let y = [];
    this.frontTot[i] = this.backTot[i] = this.totTot[i] = 0;
    for (let ii = 0; ii < 18; ii++) {
      if (person.hasOwnProperty('scores')) {
        y.push(new FormControl({ value: person.scores[ii], disabled: false }));
        if (ii < 9) {
          this.frontTot[i] = this.frontTot[i] + person.scores[ii];
          this.totTot[i] = this.totTot[i] + person.scores[ii];
        } else {
          this.backTot[i] = this.backTot[i] + person.scores[ii];
          this.totTot[i] = this.totTot[i] + person.scores[ii];
        }
      } else {
        y.push(new FormControl({ value: null, disabled: false }));
      }
    }
    console.log("loadScoreControls Y", y);
    return y;
  }

  // returns the inner FormArray based on the index
  scores(index: number): FormArray {
    return this.arr.at(index).get('scores') as FormArray;
  }
  shapePlayers() {
    let players = [];
    const temp = this.match.lineUps;
    if (temp.linupSD) { delete temp.lineUpSD; }
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

  onSubmit() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].name = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['name']['value'];
      this.players[i].tempscore = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['totTot']['value'];
      this.players[i].score = this.scoreForm.get('arr')['controls'][i][
        'controls']['score']['value'];
      this.players[i].scores = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['scores']['value'];
      // this.players[i].score = this.players[i].tempscore[i];
      if (this.players[i].tempscore[i] > 50) {
        this.players[i].score = this.players[i].tempscore[i];
      }
      this.players[i].id = this.players[i]._id;
      console.log('Players', this.players[i]);
      this._scoresService.updateScore(this.players[i]).subscribe((resScore) => {
        console.log('onSubmit', resScore);
      });
    }
    console.log('Match & PLayers', this.match, this.players);
    console.log('ScoreForm', this.scoreForm.value[0]);
    this.UpdateScoresEvent.emit(this.match);
  }

  onKeyUp(event, index, i) {
    if (event.key === 'Tab') {
      console.log('TAB');
      event.srcElement.form[i * 20 + index + 1].setValue() //creates an error which does not clear existing value????
    }
    if (event.key > 0 && event.key <= 9) {
      if ((i * 20 + index + 3) % 20 == 0) {
        this.backTot[i + 1] = 0;
        this.frontTot[i + 1] = 0;
        this.totTot[i + 1] = 0;
        console.log('new i', i, 'index', index);
      }
      if (event.key > 1) {
        if (index < 9) {
          this.frontTot[i] =
            this.frontTot[i] + this.scoreForm.value.arr[i]['scores'][index];
          this.totTot[i] = this.totTot[i] + this.scoreForm.value.arr[i]['scores'][index];
        } else {
          this.backTot[i] =
            this.backTot[i] + this.scoreForm.value.arr[i]['scores'][index];
          this.totTot[i] = this.totTot[i] + this.scoreForm.value.arr[i]['scores'][index];
        }
        if ((index + 3) % 20 == 0) {
          index = index + 2;
        }
        let nextInput = event.srcElement.form[i * 20 + index + 3];
        nextInput.focus();
        // this.arr.controls[i]['controls']['score'].setValue(
        //   this.frontTot[i] + this.backTot[i]
        // );
      }
      if (event.key === 'Tab'){
        console.log('TAB');
        event.srcElement.form[i * 20 + index + 2].focus();
      }
    }
    else {
      // Input Out of Range -- Why does input accept e/E but no other letters?
      event.srcElement.form[i * 20 + index + 2].value = null;
    }
  }
}
