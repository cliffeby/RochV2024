import { Component, OnInit, Output } from '@angular/core';
import { MatchesService } from '../../../services/matches.service';
import { Match } from '../../../models/match';
import { AuthService } from '@auth0/auth0-angular';
import { PrinterService } from 'src/app/services/printer.service';
import { MatchLockService } from 'src/app/services/match-lock.service';

@Component({
  selector: 'app-matches-mat-center',
  templateUrl: './matches-mat-center.component.html',
  styleUrls: ['./matches-mat-center.component.css'],
})
export class MatchesMatCenterComponent implements OnInit {
  selectedMatch: Match;

  public hidenewMatch = true;
  public hideMemberBlock = true;
  public hidePairMatch = true;
  public hideDrag = true;
  public hideScoreMatch = true;
  public hideSCPrint = true;
  @Output() public matches: Array<Match>;

  constructor(
    private _matchesService: MatchesService,
    private _matchlockService: MatchLockService,
    private _printService: PrinterService
  ) {}

  ngOnInit() {
    this._matchesService
      .getMatches()
      .subscribe((resMatchData) => (this.matches = resMatchData));
  }

  onSelectMatchEvent(match: Match) {
    if (match === null) {
      this.hidenewMatch = false;
      console.log('Center1', this.selectedMatch, this.hidenewMatch);
    } else {
      this.selectedMatch = match;
      this.hidenewMatch = true;
      this.hideMemberBlock = false;
      this.hidePairMatch = true;
      console.log('Center2', this.selectedMatch);
    }
  }

  onScoreMatchEvent(match: Match) {
    this.selectedMatch = match;
    this.hidenewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideScoreMatch = false;
    console.log('Score Match', this.hideScoreMatch, match.lineUps);
  }

  onPrintMatchEvent(match: Match) {
    console.log('Print Match LineUps', match.lineUps);
    this._printService.lineUpSubject.next(match.lineUps);
    this._printService.scorecardSubject.next(match.lineUps[0].playerA.scorecardId);
    console.log('match.lineUps[0].playerA.scorecardId',match.lineUps[0].playerA.scorecardId)
    this._printService.createPdf(match);
  }
  onPrintSCEvent(match: Match) {
    this.selectedMatch = match;
    this.hidenewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideSCPrint = false;
  }

  onUnLockMatchEvent(match: Match) {
    this.hidenewMatch = true;
    this.hideMemberBlock = false;
    this.hidePairMatch = true;
    match.status = 'open';
    console.log('Open Match', match);
    this._matchlockService.unLockLineUps(match.lineUps);
    this.onUpdateMatchEvent(match);
  }

  onAddMatchEvent() {
    this.hidenewMatch = false;
    this.hideMemberBlock = false;
    this.hidePairMatch = true;
    this.selectedMatch = null;
  }
  onDragMatchEvent(match:any){
    this.hidenewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = false;
    this.selectedMatch = match;
    this.hideDrag = !this.hideDrag;
    console.log('Drag Match', match)
  }
  onDraggedMatchEvent(match:any){
    this.selectedMatch = match;
  }

  onSubmitAddMatch(match: Match) {
    this._matchesService.createMatch(match).subscribe((resNewMatch) => {
      this.matches.push(resNewMatch);
      this.hidenewMatch = true;
      this.hideMemberBlock = false;
      this.hidePairMatch = true;
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
    this._matchesService.createMatch(match).subscribe((resNewMatch) => {
      this.matches.push(resNewMatch);
      this.hidenewMatch = true;
      this.hideMemberBlock = true;
      this.selectedMatch = null;
      this.hidePairMatch = true;
      this._matchesService
        .getMatches()
        .subscribe((resMatchData) => (this.matches = resMatchData));
    });
  }

  onDeleteMatchEvent(match: Match) {
    this.selectedMatch = match;
    const matchArray = this.matches;
    this._matchesService.deleteMatch(match._id).subscribe(() => {
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

  onPairMatchEvent() {
    this.hidenewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = false;
  }

  onLockMatchEvent(match: Match) {
    this.hidenewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.selectedMatch = null;
    this.hideDrag = true;
    this._matchesService.getMatches().subscribe((resMatchData) => {
      this.matches = resMatchData;
    });
  }
  onUpdateScoresEvent(match: Match) {
    this.hidenewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideScoreMatch = true;
    this.selectedMatch = null;
    console.log('Scores Updated');
    this._matchesService.updateMatch(match).subscribe((resUpdatedMatch) => {
      match = resUpdatedMatch;
    });
    this._matchesService.getMatches().subscribe((resMatchData) => {
      this.matches = resMatchData;
    });
  }
}
