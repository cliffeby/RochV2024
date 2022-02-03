import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Match } from 'src/app/models/match';
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
  @Output() public UpdateScoresEvent = new EventEmitter();

  constructor(private fb: FormBuilder,
    private _scoresService: ScoresService) {
  }
  ngOnInit(): void {
    this.scoreForm = this.fb.group({
      arr: this.fb.array([]),
    });
    this.players = this.shapePlayers();
    for (let i = 0; i < this.players.length; i++) {
      this.arr = this.scoreForm.get('arr') as FormArray;
      this.arr.push(this.loadItem(this.players[i]));
    }
  }
  loadItem(player) {
    return this.fb.group({
      name: new FormControl({ value: player.name, disabled: true }),
      score: player.score,
    });
  }
  shapePlayers() {
    let players = [];
    const temp = this.match.lineUps;
    delete temp.lineUpSD;
    let keys: number[] = [];
    for (let key of Object.keys(temp)) {
      if (!isNaN(Number(key))) {
        keys.push(Number(key));
      }
    }
    for (let i = 0; i < keys.length; i++) {
      players.push(temp[i].playerA);
      players.push(temp[i].playerB);
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
      this.players[i].score = Number(
        this.scoreForm.get('arr')['controls'][i]['controls']['score']['value']);
        this._scoresService.updateScore(this.players[i]).subscribe((resScore) => {
          console.log('onSubmit', resScore);
        });

    }
    console.log(this.match, this.players);
    this.UpdateScoresEvent.emit();
  }
}
