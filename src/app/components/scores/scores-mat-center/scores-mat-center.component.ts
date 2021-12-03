import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../../../services/scores.service';
import { Score } from '../../../models/score';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-scores-mat-center',
  templateUrl: './scores-mat-center.component.html',
  styleUrls: ['./scores-mat-center.component.css'],
})


export class ScoresMatCenterComponent implements OnInit {
  selectedScore: Score;
  public hidenewScore = true;
  scores: Array<Score>;

  constructor(
    // public auth: AuthService,
    private _scoresService: ScoresService
  ) {}

  ngOnInit() {
    // this._scoresService
    //   .getScores()
    //   .subscribe((resScoreData) => (this.scores = resScoreData));
  }

  onSelectScore(score: Score) {
    console.log('onSelectScore');
    if (score === null) {
      this.hidenewScore = false;
      console.log('Center', this.selectedScore, this.hidenewScore);
    } else {
      this.selectedScore = score;
      this.hidenewScore = true;
      console.log('Center', this.selectedScore);
    }
  }
  onAddScoreEvent() {
    this.hidenewScore = false;
    this.selectedScore = null;
  }

  onSubmitAddScore(score: Score) {
    this._scoresService.createScore(score).subscribe((resNewScore) => {
      this.scores.push(resNewScore);
      this.hidenewScore = true;
      this.selectedScore = null;
    });
    // TODO - Is Pipe better to force sort
    // this._scoresService
    //   .getScores()
    //   .subscribe((resScoreData) => (this.scores = resScoreData));
  }

  onUpdateScoreEvent(score: any) {
    // this._scoresService
    //   .updateScore(score)
    //   .subscribe((resUpdatedScore) => (score = resUpdatedScore));
    this.selectedScore = null;
    // TODO - Is Pipe better to force sort
    // this._scoresService
    //   .getScores()
    //   .subscribe((resScoreData) => (this.scores = resScoreData));
  }
  onSubmitAddScoreEvent(score: any) {
    this._scoresService.createScore(score).subscribe((resNewScore) => {
      this.scores.push(resNewScore);
      this.hidenewScore = true;
      this.selectedScore = null;
    });
  }

  onDeleteScoreEvent(score: any) {
    this.selectedScore = score;
    const scoreArray = this.scores;
    this._scoresService
      .deleteScore(score._id)
      .subscribe((resDeletedScore) => {
        for (let i = 0; i < scoreArray.length; i++) {
          if (scoreArray[i]._id === score._id) {
            scoreArray.splice(i, 1);
          }
        }
        this.scores = scoreArray;
      });
    this.selectedScore = null;
    this.scores = scoreArray;
  }
  // onNotifyClicked(): void {
  //   this.selectedScore = null;
  // }
}
