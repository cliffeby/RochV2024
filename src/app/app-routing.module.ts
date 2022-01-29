import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { MembersCenterComponent } from './components/members/members-center/members-center.component';
import { ExternalApiComponent } from 'src/app/pages/external-api/external-api.component';
import { MembersMatEditComponent } from './components/members/members-mat-edit/members-mat-edit.component';
import { ScorecardsMatCenterComponent } from './components/scorecards/scorecards-mat-center/scorecards-mat-center.component';
import { MatchesMatCenterComponent } from './components/matches/matches-mat-center/matches-mat-center.component';
import { ScoresMatCenterComponent } from './components/scores/scores-mat-center/scores-mat-center.component';
import { MatchResolver } from './components/matches/match.resolver';
import { ScoresResolver } from './components/scores/scores.resolver';
import { PrintScorecardComponent } from './components/print/print-scorecard/print-scorecard.component';
import { ScorecardsMatPrintComponent } from './components/scorecards/scorecards-mat-print/scorecards-mat-print.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
  },
  {
    path: 'scorecards',
    component: ScorecardsMatCenterComponent,
    data: { expectedScopes: ['read: scorecards'] },
  },
  {
    path: 'scores',
    component: ScoresMatCenterComponent,
    data: { expectedScopes: ['read: scores'] },
    resolve: { scores: ScoresResolver },
  },
  {
    path: 'matches',
    component: MatchesMatCenterComponent,
    data: { expectedScopes: ['read: matches'] },
    resolve: { matches: MatchResolver },
  },
  {
    path: 'members',
    component: MembersCenterComponent,
    // canActivate: [ScopeGuard],
    data: { expectedScopes: ['read:members'] },
  },
  { path: 'edit-members/:_id', component: MembersMatEditComponent },
  {
    path: 'print',
    outlet: 'print',
    component: PrintScorecardComponent,
    children: [{ path: 'scorecards', component: ScorecardsMatPrintComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
