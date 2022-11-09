import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Score } from 'src/app/models/score';

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
  constructor(private fb: UntypedFormBuilder) {
      this.scoreForm1 = fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        score : null,
        user : '',
      });
  }
  ngOnInit(): void {
    this.scoreForm1 = this.fb.group({
      name: [this.score.name, [Validators.required, Validators.minLength(2)]],
      score: [this.score.score],
      user: [this.score.user],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.scoreForm1.controls[controlName].hasError(errorName);
  };
  updateScoreForm(){
    this.score.name = this.scoreForm1.value.name;
    this.score.score = this.scoreForm1.value.score;
    this.score.user = this.scoreForm1.value.user;
    console.log(this.score);
    this.UpdateScoreEvent.emit(this.score);
  }
}
