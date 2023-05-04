import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-match-score-esa-total',
  templateUrl: './match-score-esa-total.component.html',
  styleUrls: ['./match-score-esa-total.component.css']
})
export class MatchScoreESATotalComponent implements OnInit {
  @Input() public match: Match;
  
  constructor(
    
  ) {}
  ngOnInit(): void {
  }
}
