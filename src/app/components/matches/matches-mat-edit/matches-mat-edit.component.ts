import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { Match } from 'src/app/models/match';
import { ScorecardsService } from '../../../services/scorecards.service';
import { AuthService } from '@auth0/auth0-angular';
import { Scorecard } from 'src/app/models/scorecard';
import { distinct } from 'rxjs/operators';
import { MatchesService } from 'src/app/services/matches.service';
// import { ControlMessagesComponent } from '../../../helpers/control-messages/control-messages.component';

@Component({
  selector: 'app-matches-mat-edit',
  templateUrl: './matches-mat-edit.component.html',
  styleUrls: ['./matches-mat-edit.component.css'],
})
export class MatchesMatEditComponent implements OnInit, OnDestroy {
  public authSubscription;
  public matchForm1: UntypedFormGroup;
  public profileJson: string = null;
  public scorecards: Scorecard[];

  constructor(
    private fb: UntypedFormBuilder,
    public auth: AuthService,
    public _scorecardservice: ScorecardsService,
    public _matchesService: MatchesService
  ) {}

  @Input() public match: any; // Model Match contains populated scorecardId which is not avalid Match model
  @Output() public updateMatchEvent = new EventEmitter();
  @Output() public submitAddMatchEvent = new EventEmitter();
  @Output() public pairMatchEvent = new EventEmitter();
  @Output() public lockMatchEvent = new EventEmitter();

  ngOnInit() {
    // Sets value of user to its email address
    this.authSubscription = this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      this.matchForm1.controls.user.setValue(profile.email);
    });
    // Get scorecards for scorecard input dropdown
    this._scorecardservice.getScorecards().subscribe((resSCData) => {
      this.scorecards = resSCData;
      for (let i = 1; i < this.scorecards.length; i++) {
        if (this.scorecards[i].groupName === this.scorecards[i - 1].groupName) {
          this.scorecards.splice(i, 1);
          i = i - 1;
        }
      }
      // console.log('SC', this.scorecards);
    });
    // // Populate form with match data

    if (this.match == null) {
      this.match = new Match();
      this.matchForm1 = this.fb.group({
        name: [this.match.name, [Validators.required, Validators.minLength(5)]],
        course: [this.match.scorecardId, [Validators.required]],
        date: [
          this.match.datePlayed,
          [Validators.required, ValidationService.dateValidator],
        ],
        user: [this.match.user],
      });
    } else {
      this.matchForm1 = this.fb.group({
        name: [this.match.name, [Validators.required, Validators.minLength(5)]],
        course: [this.match.scorecardId, [Validators.required]],
        date: [
          this.match.datePlayed,
          [Validators.required, ValidationService.dateValidator],
        ],
        user: [this.match.user],
      });

    }
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.matchForm1.controls[controlName].hasError(errorName);
  };

  updateMatchForm() {
    this.match.name = this.matchForm1.controls['name'].value;
    this.match.datePlayed = this.matchForm1.controls['date'].value;
    this.match.scorecardId = this.matchForm1.controls['course'].value;
    this.match.scGroupName = this.getScorecardName(
      this.matchForm1.controls['course'].value
    );
    console.log('course', this.matchForm1.controls['course'].value, this.match);
    this.match.user = this.matchForm1.controls['user'].value;
    this.match.players = this._matchesService.playersCountSubject.getValue();
    this.match.status = this._matchesService.matchStatusSubject.getValue();
    this.updateMatchEvent.emit(this.match);
  }

  addMatchForm() {
    this.match.name = this.matchForm1.controls['name'].value;
    this.match.datePlayed = this.matchForm1.controls['date'].value;
    this.match.scorecardId = this.matchForm1.controls['course'].value;
    this.match.user = this.matchForm1.controls['user'].value;
    this.match.scGroupName = this.getScorecardName(
      this.matchForm1.controls['course'].value
    );
    console.log('Control2', this.match);
    this.submitAddMatchEvent.emit(this.match);
  }
  pairMatch() {
    this.match.name = this.matchForm1.controls['name'].value;
    this.match.datePlayed = this.matchForm1.controls['date'].value;
    this.match.scorecardId = this.matchForm1.controls['course'].value;
    this.match.user = this.matchForm1.controls['user'].value;
    this.match.players = this._matchesService.playersCountSubject.getValue();
    this.pairMatchEvent.emit();
  }
  getScorecardName(id: string) {
    if (id) {
      const scorecard = this.scorecards.find((x) => x._id === id);
      console.log('getscorecardName', id, scorecard);
      return scorecard.groupName;
    }
  }
  reset() {
    this.match.scorecardId = this.matchForm1.controls['course'].value;
    this.match.scGroupName = this.getScorecardName(
      this.matchForm1.controls['course'].value
    );
    this.updateMatchEvent.emit(this.match);
  }
}
