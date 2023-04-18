import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private _matchesService: MatchesService){}

  ngOnInit(): void {
    this.index = 0;
    this._matchesService.currentData.subscribe((data) => {this.match = data;
<<<<<<< HEAD
    console.log('Current data called from MATCH VIEW', this.match)})
=======
    console.log('MATCH VIEW', this.match)})
>>>>>>> 6d3ec8f2f06c934e14981f75e445807a5381233b
  }

  ngOnDestroy(): void {
  }

  onSelect(){
  }

}