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
  todaysLineUp:LineUps[] = [];
  index = 0;
  lineUpLocked = false;
  newPlayers:any[]= [];
  newPlayers1:any[] = [];
  done:any[]=[];
  todo:any[]=[];
  subscription:Subscription;
  @Output() public lockMatchEvent = new EventEmitter();
  @Output() public draggedMatchEvent = new EventEmitter();
  @Input() public match: Match;


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
      this.subscription = this._matchesService.lineUpSubject.subscribe((data) => {this.todaysLineUp = data
      console.log(' lineup', this.todaysLineUp)
      this.done = this.shapePlayers();
      let offset = Math.round(this.done.length/2)
      for (let i=1; i<offset; i++){
      this.done.splice(i,0,this.done[i*2])
      this.done.splice(i*2+1,1)
    }
  })
  }

  shapePlayers() {
    let players: any[] = [];
    var temp:any;
    temp = this.todaysLineUp;
    console.log('TEMP', temp);
    if (temp[0].lineUpSD) {
      delete temp[0].lineUpSD;
    }
    let keys: number[] = [];
    for (let key of Object.keys(temp[0])) {
      if (!isNaN(Number(key))) {
        keys.push(Number(key));
      }
    }
    console.log('Keys - Temp', keys, temp)
    for (let i = 0; i < keys.length; i++) {
      if (!temp[0][i].playerB){
      players.push(temp[0][i].playerA);
      }
      if (temp[0][i].playerB) {
        players.push([temp[0][i].playerA, temp[0][i].playerB]);
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
  }
  onDrag(){
    console.log('DRAGGGG1', this.done, this.match)
    this.match = {...this.match, lineUps: this.done};
    console.log('DRAGGGG2', this.done, this.match.lineUps)
    this._matchesService.lineUpSubject.next(this.match.lineUps);
    console.log('DRAGGGG3', this.done, this.match.lineUps)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

