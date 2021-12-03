import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Score } from 'src/app/models/score';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-scores-mat-edit',
  templateUrl: './scores-mat-edit.component.html',
  styleUrls: ['./scores-mat-edit.component.css'],
})
export class ScoresMatEditComponent implements OnInit {
  public scoreForm1: FormGroup;
  @Input() public score: Score;
  @Output() public updateScoreEvent = new EventEmitter();
  scored:any;
  constructor(private fb: FormBuilder) {
  //   this.scoreForm1 = fb.group({
  //     name: ['', [Validators.required, Validators.minLength(3)]],
  //     scorecardId : '',
  //     lineupIds : [''],
  //     memberIds : [''],
  //     partnerIds : [''],
  //     foursomeIds : [''],
  //     score : null,
  //     handicap : null,
  //     wonTwoBall : false,
  //     wonOneBall : false,
  //     matchId : '',
  //     datePlayed : null,
  //     user : '',
  //   });
  }
  ngOnInit(): void {
    // this.scoreForm1 = this.fb.group({
    //   name: [this.score.name, [Validators.required, Validators.minLength(2)]],
    //   scorecardId: [this.score.scorecardId],
    //   lineupIds: [this.score.lineupIds],
    //   memberIds: [this.score.memberIds],
    //   partnerIds: [this.score.partnerIds],
    //   foursomeIds: [this.score.foursomeIds],
    //   score: [this.score.score],
    //   handicap: [this.score.handicap],

    //   wonTwoBall: [this.score.wonTwoBall],
    //   wonOneBall: [this.score.wonOneBall],
    //   matchId: [this.score.matchId],
    //   datePlayed: [this.score.datePlayed],
    //   user: [this.score.user],
    // });
    // console.log(this.scoreForm1);
     this.scored = JSON.stringify(this.score, null, 4);
  }
  ngOnDestroy() {}

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.scoreForm1.controls[controlName].hasError(errorName);
  };

  returnToList() {
    this.updateScoreEvent.emit();
  }
}

