import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatchPairService } from 'src/app/services/match-pair.service';
import { MatchLockService } from 'src/app/services/match-lock.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Member, Team, LineUps } from 'src/app/models/member';
import { Match } from 'src/app/models/match';
import { ActivatedRoute, Router } from '@angular/router';
import { DragDropModule, transferArrayItem } from "@angular/cdk/drag-drop";
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  CdkDragMove,
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";

import { ViewportRuler } from "@angular/cdk/overlay";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-match-drop-drag',
  templateUrl: './match-drop-drag.component.html',
  styleUrls: ['./match-drop-drag.component.css']
})

export class MatchDropDragComponent implements OnInit, OnDestroy {
  matchPairings: any;
  todaysLineUp:any[] = [];
  index = 0;
  lineUpLocked = false;
  newPlayers:any[]= [];
  newPlayers1:any[] = [];
  done:any[]=[];
  todo:any[]=[];
  subscription:Subscription;
  @Output() public lockMatchEvent = new EventEmitter();
  @Output() public draggedMatchEvent = new EventEmitter();
  @Input() public match: any;


  // @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  // @ViewChild(CdkDropList) placeholder: CdkDropList;

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer: CdkDropList<any>;

  constructor(private viewportRuler: ViewportRuler,
    public _matchesService: MatchesService,
    private _matchpairService: MatchPairService,
    private _matchlockService: MatchLockService,
    private _router: Router){
      this.target = null;
      this.source = null;
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
    return false;
  };
}

  ngOnInit(): void {
      // this.todaysLineUp = this.match.lineUps;
<<<<<<< HEAD
      this._matchesService.currentData.subscribe((data) => {this.match.lineUps = data
=======
      this._matchesService.currentData.subscribe((data) => {this.match = data
>>>>>>> 6d3ec8f2f06c934e14981f75e445807a5381233b
      console.log(' lineups', this.match.lineUps)
      this.done = this.shapePlayers(this.match.lineUps);
      let offset = Math.round(this.done.length/2)
      for (let i=1; i<offset; i++){
      this.done.splice(i,0,this.done[i*2])
      this.done.splice(i*2+1,1)
    }
  })
  }

  shapePlayers(temp) {
    let players: any[] = [];
    // var temp:any;
    // temp = this.match.lineUps[0];
    console.log('TEMP', temp);
    if (temp.lineUpSD) {
      delete temp[0].lineUpSD;
    }
    let keys: number[] = [];
    for (let key of Object.keys(temp)) {
      if (!isNaN(Number(key))) {
        keys.push(Number(key));
      // }else{
      //   keys.push(key);
      }
    }
    console.log('Keys - Temp', keys, temp)
    for (let i = 0; i < keys.length; i++) {
      if (!temp[i].playerB){
      players.push(temp[0][i].playerA);
      }
      if (temp[i].playerB) {
        players.push([temp[i].playerA, temp[i].playerB]);
      }
    }
    console.log('shapePlayers', players);
    return players;
  }



  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    console.log('Eventp', event.previousContainer, event.previousIndex)
    console.log('Eventc', event.container, event.currentIndex);
    for (let i=0; i<Math.round(this.done.length); i++){
      console.log(document.getElementById(i.toString()))
      }
      console.log('NewDone', this.done)
      // this.onDrag();
  }
<<<<<<< HEAD
  onDragLock(){
    const rLineUp = this._matchpairService.regenerateLineUp(this.done);
    console.log('DRAGGGG1', this.done, this.match, rLineUp)
    const newLineUp = { ...this.match.lineUps}
    this.match = {...this.match, lineUps:rLineUp };
    console.log('DRAGGGG2', this.done, this.match)
    this._matchesService.setLineUpSubject(this.match.lineUps);
    console.log('DRAGGGG3', this.done, this.match)

    this.match.status = 'locked';
    this._matchesService
      .updateMatch(this.match)
      .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
  this.lockMatchEvent.emit(this.match);
  this.lineUpLocked = true;

=======
  onDrag(){
    const rLineUp = this._matchpairService.regenerateLineUp(this.done);
    console.log('DRAGGGG1', this.done, this.match, rLineUp)
    const newLineUp = { ...this.match.lineUps}
    this.match = {...this.match, lineUps:[rLineUp] };
    console.log('DRAGGGG2', this.done, this.match)
    this._matchesService.setLineUpSubject(this.match);
    console.log('DRAGGGG3', this.done, this.match)
>>>>>>> 6d3ec8f2f06c934e14981f75e445807a5381233b
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
}

