import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardsMatPrintComponent } from './scorecards-mat-print.component';

describe('ScorecardsMatPrintComponent', () => {
  let component: ScorecardsMatPrintComponent;
  let fixture: ComponentFixture<ScorecardsMatPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsMatPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
