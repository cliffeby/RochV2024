import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { MembersCenterComponent } from './components/members/members-center/members-center.component';
import { MembersMatEditComponent } from './components/members/members-mat-edit/members-mat-edit.component';
import { ScorecardsMatCenterComponent } from './components/scorecards/scorecards-mat-center/scorecards-mat-center.component';
import { MatchesMatCenterComponent } from './components/matches/matches-mat-center/matches-mat-center.component';
import { ScoresMatCenterComponent } from './components/scores/scores-mat-center/scores-mat-center.component';
import { MatchResolver } from './components/matches/match.resolver';
import { ScoresResolver } from './components/scores/scores.resolver';
import { IndexResolver } from './components/index/index.resolver';
import { PrintScorecardComponent } from './components/print/print-scorecard/print-scorecard.component';
import { ScorecardsMatPrintComponent } from './components/scorecards/scorecards-mat-print/scorecards-mat-print.component';
import { ResultsMatCenterComponent } from './components/results/results-mat-center/results-mat-center.component';
import { ResultsMatPrintComponent } from './components/results/results-mat-print/results-mat-print.component';
import { IndexCenterComponent } from './components/index/index-center/index-center.component';
import { MembersResolver } from './components/members/members.resolver';

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
    resolve: { members: MembersResolver },
  },
  { path: 'edit-members/:_id', component: MembersMatEditComponent },
  {
    path: 'print',
    outlet: 'print',
    component: PrintScorecardComponent,
    children: [
      {
        path: 'results',
        component: ResultsMatPrintComponent,
      },
      {
        path: 'scorecards',
        component: ScorecardsMatPrintComponent,
      },
    ],
  },
  {
    path: 'results',
    component: ResultsMatCenterComponent,
    data: { expectedScopes: ['read:matches'] },
    resolve: { matches: MatchResolver },
  },
  {
    path: 'Index',
    component: IndexCenterComponent,
    data: { expectedScopes: ['read: members'] },
    resolve: { members: IndexResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
