import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CustomAggregationExpressionOperatorReturningAny } from 'mongoose';
import { Subscription } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})
export class MatchViewComponent implements OnInit, OnDestroy{
  todaysLineUp: Subscription[];
  match;
  index: number;
  @Output() public ReturnToListMatchEvent = new EventEmitter();

  constructor(private _matchesService: MatchesService){}

  ngOnInit(): void {
    this.index = 0;
    this._matchesService.currentData.subscribe((data) => {this.match = data;
    console.log('Current data called from MATCH VIEW', this.match)})
  }

  ngOnDestroy(): void {
    
  }

  onSelect(){
    this.ReturnToListMatchEvent.emit();
  }

}
