import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatchPairService } from 'src/app/services/match-pair.service';
import { MatchLockService } from 'src/app/services/match-lock.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Member, Team, LineUps } from 'src/app/models/member';

@Component({
  selector: 'app-match-pair',
  templateUrl: './match-pair.component.html',
  styleUrls: ['./match-pair.component.css'],
})
export class MatchPairComponent implements OnInit {
  matchPairings: any;
  todaysLineUp = [];
  index = 0;
  lineUpLocked = false;
  @Output() public lockMatchEvent = new EventEmitter();

  constructor(
    public _matchesService: MatchesService,
    private _matchpairService: MatchPairService,
    private _matchlockService: MatchLockService
  ) {}

  ngOnInit(): void {
    this._matchesService.getEmployeeDetail().subscribe((data) => {
      this.matchPairings = data;
    });
    this._matchpairService.generateLineUps(this.matchPairings).then((data) => {
      this.todaysLineUp = data;
    });
  }

  onSelect() {
    this.index++;
    console.log(this.index);
  }
  onLock() {
    this._matchlockService.lockLineUps(this.todaysLineUp[this.index])
    this.lockMatchEvent.emit();
    this.lineUpLocked = true;
  }
  onUnLock(){
    this.lineUpLocked = false;
  }
}
