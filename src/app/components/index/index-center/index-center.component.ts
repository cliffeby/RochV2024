import { Component, OnInit, Output } from '@angular/core';
import { Score } from 'src/app/models/score';

@Component({
  selector: 'app-index-center',
  templateUrl: './index-center.component.html',
  styleUrls: ['./index-center.component.css']
})
export class IndexCenterComponent implements OnInit {
  @Output() public scores: Array<Score>;
  constructor() { }

  ngOnInit(): void {
  }

}
