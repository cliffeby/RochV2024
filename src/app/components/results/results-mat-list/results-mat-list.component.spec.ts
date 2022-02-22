import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMatListComponent } from './results-mat-list.component';

describe('ResultsMatListComponent', () => {
  let component: ResultsMatListComponent;
  let fixture: ComponentFixture<ResultsMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
