import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
  UntypedFormArray,
} from '@angular/forms';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { Score } from 'src/app/models/score';
import { Scorecard } from 'src/app/models/scorecard';
import { ScorecardsService } from 'src/app/services/scorecards.service';
import { StrokesService } from 'src/app/services/strokes.service';

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
  scored: any;
  scorecard$: Observable<Scorecard>;
  holeNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  constructor(
    private fb: UntypedFormBuilder,
    private _scorcardsService: ScorecardsService,
    private _strokesService: StrokesService
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
    // this.score.scPars.pop();
    this.scoreForm1 = this.fb.group({
      name: this.score.name,
      score: this.mySum(this.score.scores),
      postedScore: this.mySum(this.score.scoresToPost),
      usgaIndex: this.score.usgaIndex,
      scSlope: this.score.scSlope,
      scRating: this.score.scRating,
      user: this.score.user,
      // scHCaps: new UntypedFormArray(this.loadScoreControls(this.score.scHCaps)),
      scores: new UntypedFormArray(this.loadScoreControls(this.score.scores)),
      scoresToPost: new UntypedFormArray(
        this.loadScoreControls(this.score.scoresToPost)
      ),
    });
    console.log('SF1', this.scoreForm1, this.score);
    this.scoreForm1.get('scores').valueChanges.subscribe((value) => {
      console.log(value);
      this.score.scores = value;
      console.log('SCORE', this.scoreForm1, this.score);
      // this.score.scoresToPost = this._strokesService.ESA(value);
      // this.scoreForm1.value.scoresToPost = this.score.scoresToPost;
    });
    this.scorecard$ = this._scorcardsService.getScorecard(
      this.score.scorecardId
    );
  }
  mySum(array) {
    if (array.length == 19) {
      array.pop();
    }
    return array.reduce((acc, item) => acc + item, 0);
  }

  loadScoreControls(item) {
    console.log('ITEM', item);
    let y = [];
    for (let ii = 0; ii < 18; ii++) {
      if (item) {
        y.push(new UntypedFormControl({ value: item[ii], disabled: false }));
      } else {
        y.push(new UntypedFormControl({ value: null, disabled: false }));
      }
    }
    y.push(
      new UntypedFormControl({ value: this.mySum(item), disabled: false })
    );

    console.log('loadScoreControls Y', y);
    return y;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.scoreForm1.controls[controlName].hasError(errorName);
  };
  updateScoreForm() {
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
