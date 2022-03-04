import { Component, OnInit } from '@angular/core';
import { ScorecardsService } from '../../../services/scorecards.service';
import { Scorecard } from '../../../models/scorecard';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-scorecards-mat-center',
  templateUrl: './scorecards-mat-center.component.html',
  styleUrls: ['./scorecards-mat-center.component.css'],
  providers: [ScorecardsService]
})
export class ScorecardsMatCenterComponent implements OnInit {
  selectedScorecard: Scorecard;
  public hidenewScorecard = true;
  scorecards: Array<Scorecard>;

  constructor(
    public auth: AuthService,
    private _scorecardsService: ScorecardsService
  ) {}


  ngOnInit() {
  }

  onSelectScorecard(scorecard: Scorecard) {
    if (scorecard === null) {
      this.hidenewScorecard = false;
      console.log('Center1', this.selectedScorecard, this.hidenewScorecard);
    } else {
      this.selectedScorecard = scorecard;
      this.hidenewScorecard = true;
      console.log('Center2', this.selectedScorecard);
    }
  }
  onAddScorecardEvent() {
    this.hidenewScorecard = false;
    this.selectedScorecard = null;
  }

  onSubmitAddScorecard(scorecard: Scorecard) {
    this._scorecardsService.createScorecard(scorecard).subscribe((resNewScorecard) => {
      this.scorecards.push(resNewScorecard);
      this.hidenewScorecard = true;
      this.selectedScorecard = null;
    });
    // TODO - Is Pipe better to force sort
    this._scorecardsService
      .getScorecards()
      .subscribe((resScorecardData) => (this.scorecards = resScorecardData));
  }

  onUpdateScorecardEvent(scorecard: any) {
    this._scorecardsService
      .updateScorecard(scorecard)
      .subscribe((resUpdatedScorecard) => (scorecard = resUpdatedScorecard));
    this.selectedScorecard = null;
    // TODO - Is Pipe better to force sort
    this._scorecardsService
      .getScorecards()
      .subscribe((resScorecardData) => (this.scorecards = resScorecardData));
  }
  onSubmitAddScorecardEvent(scorecard: any) {
    this._scorecardsService.createScorecard(scorecard).subscribe((resNewScorecard) => {
      // this.scorecards.push(resNewScorecard);
      this.hidenewScorecard = true;
      this.selectedScorecard = null;
    });
  }

  onDeleteScorecardEvent(scorecard: any) {
    this.selectedScorecard = scorecard;
    const scorecardArray = this.scorecards;
    this._scorecardsService
      .deleteScorecard(scorecard._id)
      .subscribe((resDeletedScorecard) => {
        for (let i = 0; i < scorecardArray.length; i++) {
          if (scorecardArray[i]._id === scorecard._id) {
            scorecardArray.splice(i, 1);
          }
        }
        this.scorecards = scorecardArray;
      });
    this.selectedScorecard = null;
    this.scorecards = scorecardArray;
  }
}
