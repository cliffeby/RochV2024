import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchPairService } from 'src/app/services/match-pair.service';
import { MatchLockService } from 'src/app/services/match-lock.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Member, Team, LineUps } from 'src/app/models/member';
import { Match } from 'src/app/models/match';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-match-pair',
  templateUrl: './match-pair.component.html',
  styleUrls: ['./match-pair.component.css'],
})
export class MatchPairComponent implements OnInit {
  matchPairings: any;
  todaysLineUp: any[];
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
    this._matchesService.getShapedPlayers().subscribe((data) => {
      this.matchPairings = data;
<<<<<<< HEAD

      this._matchpairService
        .generateLineUps(this.matchPairings)
        .then((data) => {
          this.todaysLineUp = data;
          this.match = { ...this.match, lineUps: data[0] };
          this._matchesService.setLineUpSubject(data[0]);

          // this._matchesService.currentData.subscribe((data) => this.todaysLineUp = data);
          // this.todaysLineUp = this._matchesService.lineUpSubject.getValue();
          // this.match = { ...this.match, lineUps: this.todaysLineUp, status: 'open' };
          console.log('LU', this.todaysLineUp);
          // this.lockMatchEvent.emit(this.match);
        });
=======
    });
    this._matchpairService.generateLineUps(this.matchPairings).then((data) => {
      this.match = {...this.match, lineUps:data}
      this._matchesService.setLineUpSubject(this.match);
      
      this._matchesService.currentData.subscribe((data) => this.match = data);
      // this.todaysLineUp = this._matchesService.lineUpSubject.getValue();
      // this.match = { ...this.match, lineUps: this.todaysLineUp, status: 'open' };
      console.log('MATCH', this.match)
      // this.lockMatchEvent.emit(this.match);
>>>>>>> 6d3ec8f2f06c934e14981f75e445807a5381233b
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
<<<<<<< HEAD
    console.log('from match pair service LOCK', this.index, this.match);
    // this.match = { ...this.match, lineUps: this.todaysLineUp[this.index], status: 'locked' };
    this.match.status = 'locked';
    this._matchesService
      .updateMatch(this.match)
      .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
=======
    console.log('from match pair service LOCK', this.index,this.match)
    // this.match = { ...this.match, lineUps: this.todaysLineUp[this.index], status: 'locked' };
    this.match.status = 'locked';
      this._matchesService
        .updateMatch(this.match)
        .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
>>>>>>> 6d3ec8f2f06c934e14981f75e445807a5381233b
    this.lockMatchEvent.emit(this.match);
    this.lineUpLocked = true;
  }
  onUnLock() {
    this.lineUpLocked = false;
    // this._matchlockService.unLockLineUps(this.todaysLineUp[this.index]);
    console.log(
      'from match pair service UNLOCK',
      this.index,
      this.todaysLineUp
    );
  }
<<<<<<< HEAD
  onDrag() {
    this.dragMatchEvent.emit(this.match);
    this._matchesService.setLineUpSubject(this.todaysLineUp[this.index]);
=======
  onDrag(){
    this.dragMatchEvent.emit(this.match)
    this._matchesService.setLineUpSubject(this.match);
>>>>>>> 6d3ec8f2f06c934e14981f75e445807a5381233b
  }
}
