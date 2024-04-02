import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { MembersCenterComponent } from './components/members/members-center/members-center.component';
import { MembersMatListComponent } from './components/members/members-mat-list/members-mat-list.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { AngularMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersMatEditComponent } from './components/members/members-mat-edit/members-mat-edit.component';
import { ScorecardsMatListComponent } from './components/scorecards/scorecards-mat-list/scorecards-mat-list.component';
import { ScorecardsMatEditComponent } from './components/scorecards/scorecards-mat-edit/scorecards-mat-edit.component';
import { ScorecardsMatCenterComponent } from './components/scorecards/scorecards-mat-center/scorecards-mat-center.component';
import { ControlMessagesComponent } from './helpers/control-messages/control-messages.component';
import { MatchesMatCenterComponent } from './components/matches/matches-mat-center/matches-mat-center.component';
import { MatchesMatListComponent } from './components/matches/matches-mat-list/matches-mat-list.component';
import { MatchesMatEditComponent } from './components/matches/matches-mat-edit/matches-mat-edit.component';
import { MemberBlockComponent } from './components/matches/member-block/member-block.component';
import { SafePipe } from './safe.pipe';
import { SearchFilterPipe } from './search.pipe';
import { ScoresMatListComponent } from './components/scores/scores-mat-list/scores-mat-list.component';
import { ScoresMatEditComponent } from './components/scores/scores-mat-edit/scores-mat-edit.component';
import { ScoresMatCenterComponent } from './components/scores/scores-mat-center/scores-mat-center.component';
import { MatchPairComponent } from './components/matches/match-pair/match-pair.component';
import { PrintScorecardComponent } from './components/print/print-scorecard/print-scorecard.component';
import { ScorecardsMatPrintComponent } from './components/scorecards/scorecards-mat-print/scorecards-mat-print.component';
import { ScoresMatViewComponent } from './components/scores/scores-mat-view/scores-mat-view.component';
import { MatchScoreComponent } from './components/matches/match-score/match-score.component';
import { ResultsMatCenterComponent } from './components/results/results-mat-center/results-mat-center.component';
import { ResultsMatListComponent } from './components/results/results-mat-list/results-mat-list.component';
import { ResultsMatAdjustComponent } from './components/results/results-mat-adjust/results-mat-adjust.component';
import { ResultsMatStrokesComponent } from './components/results/results-mat-strokes/results-mat-strokes.component';
import { ScoringUtilitiesService } from './services/scoring-utilities.service';
import { ResultsMatPrintComponent } from './components/results/results-mat-print/results-mat-print.component';
import { MatchesPrintScorecardsComponent } from './components/matches/matches-print-scorecards/matches-print-scorecards.component';
import { NgxPrintModule } from 'ngx-print';
import { ScoresMatIndexesComponent } from './components/scores/scores-mat-indexes/scores-mat-indexes.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SafePipe,
    SearchFilterPipe,
    HeroComponent,
    HomeContentComponent,
    LoadingComponent,
    MainNavComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    ExternalApiComponent,
    LoginButtonComponent,
    MembersCenterComponent,
    MembersMatListComponent,
    MembersMatEditComponent,
    ScorecardsMatListComponent,
    ScorecardsMatEditComponent,
    ScorecardsMatCenterComponent,
    ControlMessagesComponent,
    MatchesMatCenterComponent,
    MatchesMatListComponent,
    MatchesMatEditComponent,
    MemberBlockComponent,
    ScoresMatListComponent,
    ScoresMatEditComponent,
    ScoresMatCenterComponent,
    MatchPairComponent,
    PrintScorecardComponent,
    ScorecardsMatPrintComponent,
    ScoresMatViewComponent,
    MatchScoreComponent,
    ResultsMatCenterComponent,
    ResultsMatListComponent,
    ResultsMatAdjustComponent,
    ResultsMatStrokesComponent,
    ResultsMatPrintComponent,
    MatchesPrintScorecardsComponent,
    ScoresMatIndexesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          'http://localhost:7000/api/messages/protected-message',
          'http://localhost:7000/api/members*',
          'http://localhost:7000/api/scorecards*',
          'http://localhost:7000/api/scores*',
          'http://localhost:7000/api/matches*',
        ],
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    ScoringUtilitiesService
  ],
})
export class AppModule {}
