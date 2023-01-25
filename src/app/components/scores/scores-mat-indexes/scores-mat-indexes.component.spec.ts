import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerScores, Score } from 'src/app/models/score';

import { ScoresMatIndexesComponent } from './scores-mat-indexes.component';

describe('ScoresMatIndexesComponent', () => {
  let component: ScoresMatIndexesComponent;
  let fixture: ComponentFixture<ScoresMatIndexesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatIndexesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatIndexesComponent);
    component = fixture.componentInstance;
    var playerArray = new PlayerScores();
    var score = new Score();
    component.allPlayerScores = playerArray;
    component.score = score;
    component.scores1 = playerArray.scrArray;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
