import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMatPrintComponent } from './results-mat-print.component';

describe('ResultsMatPrintComponent', () => {
  let component: ResultsMatPrintComponent;
  let fixture: ComponentFixture<ResultsMatPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsMatPrintComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
