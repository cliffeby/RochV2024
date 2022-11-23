import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMatAdjustComponent } from './results-mat-adjust.component';

describe('ResultsMatAdjustComponent', () => {
  let component: ResultsMatAdjustComponent;
  let fixture: ComponentFixture<ResultsMatAdjustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatAdjustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatAdjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
