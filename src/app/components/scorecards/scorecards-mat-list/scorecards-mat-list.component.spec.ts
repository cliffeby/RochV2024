import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardsMatListComponent } from './scorecards-mat-list.component';

describe('ScorecardsMatListComponent', () => {
  let component: ScorecardsMatListComponent;
  let fixture: ComponentFixture<ScorecardsMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
