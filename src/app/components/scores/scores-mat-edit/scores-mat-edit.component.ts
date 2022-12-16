import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
  UntypedFormArray,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Score } from 'src/app/models/score';
import { Scorecard } from 'src/app/models/scorecard';
import { ScorecardsService } from 'src/app/services/scorecards.service';

@Component({
  selector: 'app-scores-mat-edit',
  templateUrl: './scores-mat-edit.component.html',
  styleUrls: ['./scores-mat-edit.component.css'],
})
export class ScoresMatEditComponent implements OnInit {
  public scoreForm1: UntypedFormGroup;
  @Input() public score: Score;
  @Output() public UpdateScoreEvent = new EventEmitter();
  @Output() public ReturnScoreEvent = new EventEmitter();
  // scored: any;
  scorecard$: Observable<Scorecard>;
  holeNo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  // newScores = []
  constructor(
    private fb: UntypedFormBuilder,
    private _scorcardsService: ScorecardsService,
  ) {
    this.scoreForm1 = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      score: null,
      scHCaps: [],
      scores: [],
      scoresToPost: [],
      scRating: null,
      scSlope: null,
      usgaIndex: null,
      postedScore: null,
      user: '',
    });
  }
  ngOnInit(): void {
    this.scoreForm1 = this.fb.group({
      name: this.score.name,
      score: this.mySum(this.score.scores),
      postedScore: this.mySum(this.ESA(this.score.scores)),
      usgaIndex: this.score.usgaIndex,
      scSlope: this.score.scSlope,
      scRating: this.score.scRating,
      user: this.score.user,
      scores: new UntypedFormArray(this.loadScoreControls(this.score.scores)),
      scoresToPost: new UntypedFormArray(
        this.loadScoreControls(this.ESA(this.score.scores))
      ),
    });
    // console.log('SF1', this.scoreForm1, this.score);
    this.scoreForm1.get('scores').valueChanges.subscribe((value) => {
      // console.log(value);
      this.score.scores = value;
      // console.log('SCORE', this.scoreForm1, this.score);
    });
    this.scorecard$ = this._scorcardsService.getScorecard(
      this.score.scorecardId
    );
    this.changeScore()
  }
  mySum(array:number[]) {
    if (array.length == 19) {
      array.pop();
    }
    return array.reduce((acc, item) => acc + item, 0);
  }

  loadScoreControls(item:number[]) {
    let y:UntypedFormControl[] = [];
    for (let ii = 0; ii < 18; ii++) {
      if (item) {
        y.push(new UntypedFormControl({ value: item[ii], disabled: false }));
      } else {
        y.push(new UntypedFormControl({ value: null, disabled: false }));
      }
    }
    console.log('loadScoreControls Y', y);
    return y;
  }
  
  changeScore(): void {
    this.scoreForm1.get('scores').valueChanges.subscribe((value) => {
      this.score.scores = value;
      this.scoreForm1.controls['score'].setValue(value[18]);
      console.log('SCORE2', this.scoreForm1, this.score);
      const esa = this.ESA(value);
      this.scoreForm1.get('scoresToPost').patchValue(esa);
      this.scoreForm1.controls['score'].setValue(this.mySum(this.score.scores));
      this.scoreForm1.controls['postedScore'].setValue(this.mySum(this.ESA(this.score.scores)));
    });
  }

  ESA(value: number[]):number[] {
    const data = this.userProp(); //First Subcription to User
    const pars: number[] = data[0];
    const hCaps: number[] = data[1];
    const ci: number = data[2];
    const value1: number[] = [];
    value.forEach((x: number, index: number) =>
      value1[index] = x <= pars[index] + 2
        ? x :
        x > pars[index] + 1 && hCaps[index] <= ci
          ? pars[index] + 3 :
          pars[index] + 2
    )
    console.log('values', value1, value, pars, hCaps, ci);
    return value1;
  }

  userProp() {
    let parsArray: number[] = [];
    let hCapsArray: number[] = [];
    let ci: number;

    parsArray = this.score.scPars
    hCapsArray = this.score.scHCaps
    ci = this.score.handicap;
    return [parsArray, hCapsArray, ci] as const;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.scoreForm1.controls[controlName].hasError(errorName);
  };

  updateScoreForm():void {
    this.score.name = this.scoreForm1.value.name;
    this.score.score = this.scoreForm1.value.score;
    this.score.user = this.scoreForm1.value.user;
    this.score.usgaIndexForTodaysScore =
      Math.round(
        (((this.score.score - this.score.scRating) * this.score.scSlope) /
          113) *
        10
      ) / 10;
    this.score.scores = this.scoreForm1.value.scores;
    console.log(this.score);
    this.UpdateScoreEvent.emit(this.score);
  }
}
