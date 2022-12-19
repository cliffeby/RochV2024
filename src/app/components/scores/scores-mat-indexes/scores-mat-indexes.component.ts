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
  @Input() public allPlayerScores: {scr:Score, scrArray:Score[]};
 
  score:Score;
  scores:Score[];
  dataSource: MatTableDataSource<Score[]>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
   
    'datePlayed',
    'scoreToPost',
    'scRating',
    'scSlope'
  ];
 
  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.scoreForm1 = fb.group({

      score: null,
      usgaIndex: null,
      postedScore: null,
    });
  }
  ngOnInit(): void {
    console.log('AllPlayerScores', this.allPlayerScores.scrArray['scores'])
    this.scores = this.allPlayerScores.scrArray;
    
    this.dataSource = new MatTableDataSource<any>(this.scores);
  };


ngAfterViewInit(): void {
  // this.dataSource.sort = this.sort;
  // this.dataSource.paginator = this.paginator;
}

}
