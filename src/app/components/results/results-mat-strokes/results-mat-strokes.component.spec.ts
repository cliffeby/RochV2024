import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMatStrokesComponent } from './results-mat-strokes.component';

describe('ResultsMatStrokesComponent', () => {
  let component: ResultsMatStrokesComponent;
  let fixture: ComponentFixture<ResultsMatStrokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatStrokesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatStrokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
