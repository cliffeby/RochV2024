import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMatCenterComponent } from './results-mat-center.component';

describe('ResultsMatCenterComponent', () => {
  let component: ResultsMatCenterComponent;
  let fixture: ComponentFixture<ResultsMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
