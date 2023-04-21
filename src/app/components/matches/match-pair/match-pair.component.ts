import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchPairService } from 'src/app/services/match-pair.service';
import { MatchLockService } from 'src/app/services/match-lock.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Member, Team, LineUps } from 'src/app/models/member';
import { Match } from 'src/app/models/match';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-match-pair',
  templateUrl: './match-pair.component.html',
  styleUrls: ['./match-pair.component.css'],
})
export class MatchPairComponent implements OnInit {
  matchPairings: any;
  todaysLineUp: LineUps[];
  lineUp: any;
  index = 0;
  lineUpLocked = false;
  @Output() public lockMatchEvent = new EventEmitter();
  @Output() public dragMatchEvent = new EventEmitter();
  @Input() public match;

  constructor(
    public _matchesService: MatchesService,
    private _matchpairService: MatchPairService,
    private _matchlockService: MatchLockService,
    private _router: Router
  ) {
    // this._router.routeReuseStrategy.shouldReuseRoute = () => {
    // return false;
    // };
  }

  ngOnInit(): void {
    this._matchesService
      .getShapedPlayers()
      .pipe(
        // tap((value) => console.log('--> sent out', value)),
        concatMap((value) => this._matchpairService.generateLineUps(value))
      )
      .subscribe((value) => {
        // console.log("<-- received", value)
        this.todaysLineUp = value;
        this.match = { ...this.match, lineUps: value[this.index] };
        this._matchesService.setLineUpSubject(value[this.index]);
      });
  }

  onSelect() {
    //Counter to limit nimber of spins that modify the lineup
    this.index++;
    this.match = { ...this.match, lineUps: this.todaysLineUp[this.index] };
    this._matchesService.setLineUpSubject(this.todaysLineUp[this.index]);
    // this.lockMatchEvent.emit(this.match);
  }

  onLock() {
    // Locks the lineup for no modification other than printing and recording scores
    // this._matchlockService.lockLineUps(this.todaysLineUp[this.index]);
    console.log('from match pair service LOCK', this.index, this.match);
    // this.match = { ...this.match, lineUps: this.todaysLineUp[this.index], status: 'locked' };
    this.match.status = 'locked';
    this._matchesService
      .updateMatch(this.match)
      .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
    this.lockMatchEvent.emit(this.match);
    // this.lineUpLocked = true;
  }
  onUnLock() {
    this.lineUpLocked = false;
    this.match = { ...this.match, lineUps: null };
    this._matchesService
      .updateMatch(this.match)
      .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
    // this._matchlockService.unLockLineUps(this.todaysLineUp[this.index]);
    console.log(
      'from match pair service UNLOCK',
      this.index,
      this.todaysLineUp,
      this.match
    );
  }
  onDrag() {
    this.dragMatchEvent.emit(this.match);
    this._matchesService.setLineUpSubject(this.todaysLineUp[this.index]);
  }
}
