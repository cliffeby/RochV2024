import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-pair',
  templateUrl: './match-pair.component.html',
  styleUrls: ['./match-pair.component.css']
})
export class MatchPairComponent implements OnInit {

 matchPairings: any;
 USGAMedian: number;

  constructor(public _matchesService: MatchesService) { }

  ngOnInit(): void {
    this._matchesService.getEmployeeDetail().subscribe(data => { this.matchPairings = data });
  }
  onPairing() {
    this.USGAMedian = this._matchesService.medianUSGAIndex(this.matchPairings);
    console.log('USGAMedian', this.USGAMedian);
  }

}
