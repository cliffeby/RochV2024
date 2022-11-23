import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Score } from 'src/app/models/score';


@Component({
  selector: 'app-scores-mat-view',
  templateUrl: './scores-mat-view.component.html',
  styleUrls: ['./scores-mat-view.component.css'],
})
export class ScoresMatViewComponent implements OnInit {

  @Input() public score: Score;
  @Output() public CloseScoreEvent = new EventEmitter();
  scored: any;

  ngOnInit(): void {
    this.scored = JSON.stringify(this.score, null, 4);
  }

  returnToList() {
    this.CloseScoreEvent.emit();
  }
}
