import { Component, OnInit } from '@angular/core';
import { MatchPairService } from 'src/app/services/match-pair.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Member, Team, LineUps } from 'src/app/models/member';

@Component({
  selector: 'app-match-pair',
  templateUrl: './match-pair.component.html',
  styleUrls: ['./match-pair.component.css']
})
export class MatchPairComponent implements OnInit {

 matchPairings: any;
 todaysLineUp = []

  constructor(public _matchesService: MatchesService,
    private _matchpairService: MatchPairService) { }

  ngOnInit(): void {
    this._matchesService.getEmployeeDetail().subscribe(data => { this.matchPairings = data;
    this.todaysLineUp = this._matchpairService.createRandomPairings(
      this.matchPairings);
    });
  }
  // onPairing() {
  //   this.USGAMedian = this._matchesService.medianUSGAIndex(this.matchPairings);
  //   console.log('USGAMedian', this.USGAMedian);
  //   this.teams5 = this._matchpairService.createRandomPairings(this.matchPairings);
  // }

}
