import { Component, OnInit, Output } from '@angular/core';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches.service';
import { PrinterService } from 'src/app/services/printer.service';

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
  public hideResultsMatch = true;

  // @Output() public matches: Array<Match>;

  constructor(
    private _matchesService: MatchesService,
    private _printService: PrinterService
  ) {}

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
  onPrintMatchEvent(match: Match) {
    // this.hidenewMatch = true;
    // this.hideMemberBlock = true;
    // this.hideResultsMatch = false;
    this.selectedMatch1 = match;
    console.log('Print Match LineUps', match.lineUps);
    this._printService.lineUpSubject.next(match.lineUps);
    this._printService.printDocument('scorecards');
  }
  onPrintResultEvent1(results:any) {
    // this.hidenewMatch = true;
    // this.hideMemberBlock = true;
    // this.hideResultsMatch = true;
    this.selectedMatch1 = results;
    // this.selectedMatch1 = match;
    console.log('Print Match Results', results);
    this._printService.lineUpSubject.next(results);
    this._printService.printDocument('results');
  }
}
