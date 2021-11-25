import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardsMatCenterComponent } from './scorecards-mat-center.component';

describe('ScorecardsMatCenterComponent', () => {
  let component: ScorecardsMatCenterComponent;
  let fixture: ComponentFixture<ScorecardsMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
