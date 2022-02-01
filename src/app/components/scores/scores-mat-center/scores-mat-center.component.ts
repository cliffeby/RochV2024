import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../../../services/scores.service';
import { Score } from '../../../models/score';

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

  onRecordScoreEvent(score: any) {
    this.selectedScore = score;
    this.hidenewScore = false;
    console.log('onRecordScoreEvent', score);
  }

  onAddScoreEvent() {
    this.hidenewScore = false;
    this.selectedScore = null;
  }

  onUpdateScoreEvent(score: Score) {
    this._scoresService.updateScore(score).subscribe((resNewScore) => {
      // this.scores.push(resNewScore);
      this.hidenewScore = true;
      this.selectedScore = null;
    });
  }

  onCloseScoreEvent(score: any) {
    this.selectedScore = null;
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
