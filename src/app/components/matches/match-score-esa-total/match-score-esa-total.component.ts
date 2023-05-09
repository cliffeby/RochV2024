import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-score-esa-total',
  templateUrl: './match-score-esa-total.component.html',
  styleUrls: ['./match-score-esa-total.component.css'],
})
export class MatchScoreESATotalComponent implements OnInit {
  @Input() public match: Match;
  lineup: any;
  myForm;
  playerScoresForm: FormGroup;
  scoreForm: FormGroup;
  public arr: UntypedFormArray;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = new FormGroup({
      formArrayName: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.lineup = this.createPlayerArray(this.match.lineUps);
    // this.buildForm();
    this.playerScoresForm = this.formBuilder.group({
      scores: this.formBuilder.array([this.lineup]),
    });
    this.scoreForm = this.formBuilder.group({
      arr: this.formBuilder.array([]),
    });

    for (let i = 0; i < this.lineup.length; i++) {
      this.arr = this.scoreForm.get('arr') as FormArray;
      this.arr.push(this.loadItem(this.lineup[i], i));
    }
    console.log('CA', this.arr.controls);
  }
  loadItem(player: any, i: number) {
    var name_Index: string;
    // var ESATotalScore:number;
    if (player) {
      name_Index = player.fullName + ' - ' + player.handicap;
      // ESATotalScore = 0;
    } else {
      return this.formBuilder.group({
        name: new FormControl({ value: 'Empty', disabled: true }),
        ESATotalScore: new FormControl({ value: 0, enabled: true }),
      });
    }
    return this.formBuilder.group({
      name: new FormControl({ value: name_Index, disabled: true }),
      ESATotalScore: new FormControl({ value: 0, disabled: true }),
    });
  }

  buildForm() {
    const controlArray = this.myForm.get('formArrayName') as FormArray;

    Object.keys(this.lineup).forEach((i) => {
      controlArray.push(
        this.formBuilder.group({
          name: new FormControl({ value: this.lineup[i].name, disabled: true }),
          type: new FormControl({
            value: this.lineup[i].handicap,
            disabled: true,
          }),
        })
      );
    });

    // console.log('CA', controlArray.controls);
  }
  // createPlayerScore():FormGroup{
  //   return this.formBuilder.group({
  //     namePlusCap:[null,Validators.required],
  //     ESAAdjustedScore:[null,Validators.required]
  //   })
  // }

  createPlayerArray(lineUp) {
    var playerArray: any[] = [];
    var keys = Object.keys(lineUp);
    console.log('lineup and keys', lineUp, keys);
    for (var i = 0; i < keys.length; i++) {
      if (lineUp[i].playerB != undefined) {
        console.log('lineup keys', i, keys, keys.length);
        playerArray.push(lineUp[i].playerA, lineUp[i].playerB);
      } else {
        playerArray.push(lineUp[i].playerA);
      }
    }
    console.log('match.lineups', this.match.lineUps);
    console.log('playerArray', playerArray);
    return playerArray;
  }
  save() {
    for (let i = 0; i < this.lineup.length; i++) {
      this.lineup[i] = {...this.lineup[i], score:0};
      this.lineup[i].score = this.scoreForm.get('arr')['controls'][i][
        'controls'
      ]['ESATotalScore']['value'];
    }
    console.log('CA2', this.arr.controls, this.lineup);
  }
}
