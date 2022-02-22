import { Component, OnInit, Output } from '@angular/core';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-results-mat-center',
  templateUrl: './results-mat-center.component.html',
  styleUrls: ['./results-mat-center.component.css'],
})
export class ResultsMatCenterComponent implements OnInit {
  selectedMatch: Match;
  selectedMatch1: Match;

  public hidenewMatch = true;
  public hideMemberBlock = true;

  // @Output() public matches: Array<Match>;

  constructor(private _matchesService: MatchesService) {}

  ngOnInit() {
    // this._matchesService
    //   .getMatches()
    //   .subscribe((resMatchData) => (this.matches = resMatchData));
    //   console.log('Center3', this.matches);
  }

  onSelectMatchEvent(match: Match) {
    this.selectedMatch = match;

    console.log('Center2', this.selectedMatch);
  }
  onStrokeMatchEvent(match: Match) {
    this.selectedMatch1 = match;

    console.log('Center3', this.selectedMatch);
  }
}
