import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Score } from '../../../models/score';
import { Subscription } from 'rxjs';
// import { MatchesService } from 'src/app/services/matches.service';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css']
})
export class IndexListComponent implements OnInit {
  @Input() public scores:Score[];

  constructor(

    private _scoresService: ScoresService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
this.activatedRoute.data.subscribe((data) => {
      this.scores = data.scores;
      console.log('indexScores', data, this.scores);
    });
  }

}
