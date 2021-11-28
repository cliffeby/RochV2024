import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../../services/matches.service';
import { Match } from '../../../models/match';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-matches-mat-center',
  templateUrl: './matches-mat-center.component.html',
  styleUrls: ['./matches-mat-center.component.css']
})
export class MatchesMatCenterComponent implements OnInit {

  selectedMatch: Match;
  public hidenewMatch = true;
  matches: Array<Match>;

  constructor(
    // public auth: AuthService,
    private _matchesService: MatchesService
  ) {}

  ngOnInit() {
    this._matchesService
      .getMatches()
      .subscribe((resMatchData) => (this.matches = resMatchData));
  }

  onSelectMatch(match: Match) {
    if (match === null) {
      this.hidenewMatch = false;
      console.log('Center1', this.selectedMatch, this.hidenewMatch);
    } else {
      this.selectedMatch = match;
      this.hidenewMatch = true;
      console.log('Center2', this.selectedMatch);
    }
  }
  onAddMatchEvent() {
    this.hidenewMatch = false;
    this.selectedMatch = null;
  }

  onSubmitAddMatch(match: Match) {
    this._matchesService
      .createMatch(match)
      .subscribe((resNewMatch) => {
        this.matches.push(resNewMatch);
        this.hidenewMatch = true;
        this.selectedMatch = null;
      });
    // TODO - Is Pipe better to force sort
    this._matchesService
      .getMatches()
      .subscribe((resMatchData) => (this.matches = resMatchData));
  }

  onUpdateMatchEvent(match: Match) {
    this._matchesService
      .updateMatch(match)
      .subscribe((resUpdatedMatch) => (match = resUpdatedMatch));
    this.selectedMatch = null;
    // TODO - Is Pipe better to force sort
    this._matchesService
      .getMatches()
      .subscribe((resMatchData) => (this.matches = resMatchData));
  }

  onSubmitAddMatchEvent(match: Match) {
    this._matchesService
      .createMatch(match)
      .subscribe((resNewMatch) => {
        this.matches.push(resNewMatch);
        this.hidenewMatch = true;
        this.selectedMatch = null;
      });
  }

  onDeleteMatchEvent(match: Match) {
    this.selectedMatch = match;
    const matchArray = this.matches;
    this._matchesService
      .deleteMatch(match._id)
      .subscribe(() => {
        for (let i = 0; i < matchArray.length; i++) {
          if (matchArray[i]._id === match._id) {
            matchArray.splice(i, 1);
          }
        }
        this.matches = matchArray;
      });
    this.selectedMatch = null;
    this.matches = matchArray;
  }
}
