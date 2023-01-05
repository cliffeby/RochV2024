import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Score } from 'src/app/models/score';
import { ScoresService } from 'src/app/services/scores.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsResolver implements Resolve<Score[]> {
  constructor(private _scoresService: ScoresService, private router : Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Score[]> {
    return this._scoresService.getScores().pipe(
      catchError(()=>{
        this.router.navigate(['index']);
        return EMPTY;
      }))
  }
}


