import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatAdjustComponent } from './results-mat-adjust.component';
import { FormArray, UntypedFormBuilder } from '@angular/forms';
import { MatchesService } from 'src/app/services/matches.service';
import { ScoresService } from 'src/app/services/scores.service';
import { of } from 'rxjs/internal/observable/of';
import { Match } from 'src/app/models/match';
import { Score } from 'src/app/models/score';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

xdescribe('ResultsMatAdjustComponent', () => {
  let component: ResultsMatAdjustComponent;
  let fixture: ComponentFixture<ResultsMatAdjustComponent>;
  const scores = new Score();
  
  const scoresServiceSpy = jasmine.createSpyObj<ScoresService>(['getScoresByMatch']);
  scoresServiceSpy.getScoresByMatch.and.returnValue(of([scores]))
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatAdjustComponent ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(ResultsMatAdjustComponent);
    component = fixture.componentInstance;
    var match = new Match();
    var arr = new FormArray([]);
    component.arr = arr;
  //   fixture.whenStable().then(() => 
    component.match = match;
    
  // );
  
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
