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

  public hideNewMatch = true;
  public hideMemberBlock = true;
  public hidePairMatch = true;
  public hideDrag = true;
  public hideScoreMatch = true;
  public hideSCPrint = true;
  public hideViewMatch = true;
  public hideScoreESATotalMatch = true;
  @Output() public matches: Array<Match>;
  @Output() public update;
  public _reload = true;
  private reload() {
    setTimeout(() => (this._reload = false));
    setTimeout(() => (this._reload = true));
  }

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
      this.hideNewMatch = false;
      console.log('Center1', this.selectedMatch, this.hideNewMatch);
    } else {
      this.selectedMatch = match;
      this.hideNewMatch = true;
      this.hideMemberBlock = false;
      this.hidePairMatch = true;
      this.hideViewMatch = true;
      this.hideScoreESATotalMatch = true;
      console.log('Center2', this.selectedMatch);
    }
  }

  onScoreMatchEvent(match: Match) {
    this.selectedMatch = match;
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideScoreMatch = false;
    this.hideViewMatch = true;
    this.hideScoreESATotalMatch = true;
    console.log('Score Match', this.hideScoreMatch, match.lineUps);
  }

  onPrintMatchEvent(match: Match) {
    console.log('Print Match LineUps', match);
    this._printService.lineUpSubject.next(match.lineUps);
    this._printService.scorecardSubject.next(
      match.lineUps[0].playerA.scorecardId
    );
    console.log(
      'match.lineUps[0].playerA.scorecardId',
      match.lineUps[0].playerA.scorecardId
    );
    this._printService.createPdf(match);
  }

  onPrintSCEvent(match: Match) {
    this.selectedMatch = match;
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideSCPrint = false;
    this.hideViewMatch = true;
  }
  onScoreESATotalEvent(match: Match) {
    this.selectedMatch = match;
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideSCPrint = true;
    this.hideScoreESATotalMatch = false;
    this.hideViewMatch = true;
    console.log('Score MatchESA', this.hideScoreESATotalMatch, match.lineUps);
  }

  onUnLockMatchEvent(match: Match) {
    this.hideNewMatch = true;
    this.hideMemberBlock = false;
    this.hidePairMatch = true;
    this.hideViewMatch = true;
    match.status = 'open';
    console.log('Open Match', match);
    this._matchlockService.unLockLineUps(match.lineUps);
    delete match['lineUps']
    this.onUpdateMatchEvent(match);
  }

  onAddMatchEvent() {
    this.hideNewMatch = false;
    this.hideMemberBlock = false;
    this.hidePairMatch = true;
    this.selectedMatch = null;
    this.hideViewMatch = true;
  }
  onDragMatchEvent(match: any) {
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.selectedMatch = match;
    this.hideDrag = !this.hideDrag;
    this.hideViewMatch = true;
    console.log('Drag Match', match);
  }
  onDraggedMatchEvent(match: any) {
    this.selectedMatch = match;
  }

  onSubmitAddMatch(match: Match) {
    this._matchesService.createMatch(match).subscribe((resNewMatch) => {
      this.matches.push(resNewMatch);
      this.hideNewMatch = true;
      this.hideMemberBlock = false;
      this.hidePairMatch = true;
      this.selectedMatch = null;
      this.hideViewMatch = true;
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
      this.hideNewMatch = true;
      this.hideMemberBlock = true;
      this.selectedMatch = null;
      this.hidePairMatch = true;
      this.hideViewMatch = true;
      this._matchesService
        .getMatches()
        .subscribe((resMatchData) => (this.matches = resMatchData));
    });
  }
  onViewMatchEvent(match: Match) {
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.selectedMatch = null;
    this.hidePairMatch = true;
    this.hideViewMatch = false;
  }
  onReturnMatchEvent(){
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.selectedMatch = null;
    this.hidePairMatch = true;
    this.hideViewMatch = true;
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
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hideViewMatch = true;
    this.hidePairMatch = false;
  }

  onLockMatchEvent(match: Match) {
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.selectedMatch = null;
    this.hideDrag = true;
    this.hideViewMatch = true;
    // this.match.status = 'locked';
    this._matchesService.updateMatch(match);
    // .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
    // console.log('refreshed matches',this.matches);
    this._matchesService.getMatches().subscribe((resMatchData) => {
      this.matches = resMatchData;
    });
    this.reload();
  }

  onUpdateScoresEvent(match: Match) {
    this.hideNewMatch = true;
    this.hideMemberBlock = true;
    this.hidePairMatch = true;
    this.hideScoreMatch = true;
    this.hideViewMatch = true;
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
