import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerScores, Score } from 'src/app/models/score';
import { IndexCalcService } from 'src/app/services/index-calc.service';

@Component({
  selector: 'app-scores-mat-indexes',
  templateUrl: './scores-mat-indexes.component.html',
  styleUrls: ['./scores-mat-indexes.component.css']
})
export class ScoresMatIndexesComponent implements OnInit {

  public scoreForm1: UntypedFormGroup;
  @Input() public allPlayerScores: PlayerScores;

  score: Score;
  scores: Score[];
  scores1: Score[];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [

    'datePlayed',
    'postedScore',
    'usgaIndexForTodaysScore',
    'usgaIndex'
  ];

  constructor(private _indexCalcService:IndexCalcService) {  }

  ngOnInit(): void {
    this.scores = this.allPlayerScores.scrArray;
    this.score = this.allPlayerScores.scr;
    this.scores1 = this.scores.filter(num => Number(new Date(num.datePlayed)) 
    <= Number(new Date(this.score.datePlayed))); // Exclude scores after date of selected score.
    console.log('Filtered Scores', this.scores1)
    const data: Score[] = this._indexCalcService.calcIndex(this.scores1);
    this.dataSource = new MatTableDataSource<any>(data);
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator;
  }
}
