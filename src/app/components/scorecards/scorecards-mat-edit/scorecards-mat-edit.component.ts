import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { Scorecard } from 'src/app/models/scorecard';
import { AuthService } from '@auth0/auth0-angular';
// import { ControlMessagesComponent } from '../../../helpers/control-messages/control-messages.component';

@Component({
  selector: 'app-scorecards-mat-edit',
  templateUrl: './scorecards-mat-edit.component.html',
  styleUrls: ['./scorecards-mat-edit.component.css'],
})
export class ScorecardsMatEditComponent implements OnInit, OnDestroy {
  public authSubscription;
  public scorecardForm1: FormGroup;
  public profileJson: string = null;
  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.scorecardForm1 = fb.group({
      groupName: ['', [Validators.required, ValidationService.nameValidator]],
      name: ['', [Validators.required, ValidationService.nameValidator]],
      // name: '',
      rating: null,
      slope: null,
      user: '',
      parInputString: [''],
      hCapInputString: [''],
      yardsInputString: [''],
    });
  }

  @Input() public scorecard: Scorecard;
  @Output() public updateScorecardEvent = new EventEmitter();
  @Output() public submitAddScorecardEvent = new EventEmitter();

  ngOnInit() {
    this.authSubscription = this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      this.scorecardForm1.controls['user'].setValue(profile.email);
    });
    if (this.scorecard == null) {
      this.scorecard = new Scorecard();
      this.scorecard.parInputString = '';
      this.scorecard.hCapInputString = '';
      this.scorecard.yardsInputString = '';
      this.scorecard.groupName = '';
      this.scorecard.name = '';
      this.scorecard.rating = null;
      this.scorecard.slope = null;
    }
    this.scorecard.hCaps = this.onInitHcapsString(this.scorecard);
    this.scorecard.yards = this.onInitYardsString(this.scorecard);
    this.scorecard.pars = this.onInitParsString(this.scorecard);
    // this.scorecard.user = 'g@g.com'; // Set above
    this.scorecardForm1 = this.fb.group({
      groupName: [this.scorecard.groupName],
      name: [
        this.scorecard.name,
        [Validators.required, Validators.minLength(5)],
      ],
      rating: [this.scorecard.rating],
      slope: [this.scorecard.slope],
      user: [this.scorecard.user],
      parInputString: [
        this.scorecard.parInputString,
        [Validators.required, ValidationService.parsValidator],
      ],
      hCapInputString: [
        this.scorecard.hCapInputString,
        [Validators.required, ValidationService.hCapsValidator],
      ],
      yardsInputString: [
        this.scorecard.yardsInputString,
        [Validators.required, ValidationService.yardsValidator],
      ],
    });
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.scorecardForm1.controls[controlName].hasError(errorName);
  };
  onInitYardsString(scorecard: Scorecard) {
    let front9Yards = 0,
      back9Yards = 0;
    const yards: string[] = ('YARDS,' + scorecard.yardsInputString).split(',');
    for (let i = 1; i < yards.length - 9; i++) {
      front9Yards = front9Yards + Number(yards[i]);
    }
    for (let j = 10; j < yards.length; j++) {
      back9Yards += Number(yards[j]);
    }
    const total18Yards = front9Yards + back9Yards;
    yards.splice(10, 0, String(front9Yards));
    yards.splice(20, 0, String(back9Yards));
    yards.splice(21, 0, String(total18Yards));
    return yards;
  }
  onInitParsString(scorecard: Scorecard) {
    let front9Par = 0,
      back9Par = 0;
    const pars: string[] = ('PAR,' + scorecard.parInputString).split(',');
    for (let i = 1; i < pars.length - 9; i++) {
      front9Par = front9Par + Number(pars[i]);
    }
    for (let j = 10; j < pars.length; j++) {
      back9Par += Number(pars[j]);
    }
    const total18Par = front9Par + back9Par;
    pars.splice(10, 0, String(front9Par));
    pars.splice(20, 0, String(back9Par));
    pars.splice(21, 0, String(total18Par));
    return pars;
  }
  onInitHcapsString(scorecard: Scorecard) {
    const hCaps: string[] = ('HCAP,' + scorecard.hCapInputString).split(',');
    hCaps.splice(10, 0, '  ');
    return hCaps;
  }

  updateScorecardForm() {
    this.scorecard.groupName = this.scorecardForm1.controls['groupName'].value;
    this.scorecard.name = this.scorecardForm1.controls['name'].value;
    this.scorecard.rating = this.scorecardForm1.controls['rating'].value;
    this.scorecard.slope = this.scorecardForm1.controls['slope'].value;
    this.scorecard.user = this.scorecardForm1.controls['user'].value;
    this.scorecard.parInputString = this.scorecardForm1.controls[
      'parInputString'
    ].value;
    this.scorecard.hCapInputString = this.scorecardForm1.controls[
      'hCapInputString'
    ].value;
    this.scorecard.yardsInputString = this.scorecardForm1.controls[
      'yardsInputString'
    ].value;
    this.updateScorecardEvent.emit(this.scorecard);
  }

  addScorecardForm() {
    this.scorecard.groupName = this.scorecardForm1.controls['groupName'].value;
    this.scorecard.name = this.scorecardForm1.controls['name'].value;
    console.log('SCControl1', this.scorecard);
    this.scorecard.user = this.scorecardForm1.controls['user'].value;

    this.scorecard.rating = this.scorecardForm1.controls['rating'].value;
    this.scorecard.slope = this.scorecardForm1.controls['slope'].value;
    this.scorecard.parInputString = this.scorecardForm1.controls[
      'parInputString'
    ].value;
    this.scorecard.hCapInputString = this.scorecardForm1.controls[
      'hCapInputString'
    ].value;
    this.scorecard.yardsInputString = this.scorecardForm1.controls[
      'yardsInputString'
    ].value;
    this.submitAddScorecardEvent.emit(this.scorecard);
    console.log('SCControl2', this.scorecard);
  }
}
