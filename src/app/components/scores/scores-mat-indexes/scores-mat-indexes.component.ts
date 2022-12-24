import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Score } from 'src/app/models/score';

@Component({
  selector: 'app-scores-mat-indexes',
  templateUrl: './scores-mat-indexes.component.html',
  styleUrls: ['./scores-mat-indexes.component.css']
})
export class ScoresMatIndexesComponent implements OnInit {

  public scoreForm1: UntypedFormGroup;
  @Input() public allPlayerScores: { scr: Score, scrArray: any[] };

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

  constructor() { }

  ngOnInit(): void {
    this.scores = this.allPlayerScores.scrArray;
    this.score = this.allPlayerScores.scr;
    this.scores1 = this.scores.filter(num => Number(new Date(num.datePlayed)) <= Number(new Date(this.score.datePlayed))); // Exclude scores after date of selected score.
    console.log('Filterd Scores', this.scores1)
    const data: Score[] = this.calcIndex(this.scores1);
    this.dataSource = new MatTableDataSource<any>(data);
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator;
  }
  calcIndex(history: Score[]) {
    history.sort((a, b) => Number(new Date(b.datePlayed)) - Number(new Date(a.datePlayed))); //Sort player scores by date
    if (history.length > 20) history.slice(0, 20);  // Take most recent 20 scores
    switch (history.length) {  //history[0] is the player's most recent round
      case 1: history[0].usgaIndex = Math.min.apply(null, history.map((a) => { return a.usgaIndexForTodaysScore; })) - 10;  // Not USGA compliant;  nedd three scores
        break;
      case 2: history[0].usgaIndex = Math.min.apply(null, history.map((a) => { return a.usgaIndexForTodaysScore; })) - 5;   // Not USGA compliant;  nedd three scores
        break;
      case 3: history[0].usgaIndex = Math.min.apply(null, history.map((a) => { return a.usgaIndexForTodaysScore; })) - 2;  //  Lowest index less adjustment
        break;
      case 4: history[0].usgaIndex = Math.min.apply(null, history.map((a) => { return a.usgaIndexForTodaysScore; })) - 1;
        break;
      case 5: history[0].usgaIndex = Math.min.apply(null, history.map((a) => { return a.usgaIndexForTodaysScore; }));
        break;
      case 6: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)  //Create an array of score indexes
        .sort((a, b) => a - b)  // Sort ascending - smallest first
        .slice(0, 2)  //Take the first two - lowest indices
        .reduce((a, b) => a + b, 0) / 2 - 1;  //sum then average less adjustment 
        break;
      case 7 || 8: history[0].usgaIndex = Math.trunc(Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((a, b) => a + b, 0) / 2 *10)/10
        break;
      case 9 || 10 || 11: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 3)
        .reduce((a, b) => a + b, 0) / 3;
        break;
      case 12 || 13 || 14: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 4)
        .reduce((a, b) => a + b, 0) / 4;
        break;
      case 15 || 16: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 5)
        .reduce((a, b) => a + b, 0) / 5;
        break;
      case 17 || 18: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 6)
        .reduce((a, b) => a + b, 0) / 6;
        break;
      case 19: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 7)
        .reduce((a, b) => a + b, 0) / 7;
        break;
      case 20: history[0].usgaIndex = Array.from(Object.values(history), x => x.usgaIndexForTodaysScore)
        .sort((a, b) => a - b)
        .slice(0, 8)
        .reduce((a, b) => a + b, 0) / 8;
        break;
      default:
        console.log("Invalid Score Array");
    }
    return history;
  }
}
