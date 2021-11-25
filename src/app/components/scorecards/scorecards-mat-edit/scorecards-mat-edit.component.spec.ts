import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardsMatEditComponent } from './scorecards-mat-edit.component';

describe('ScorecardsMatEditComponent', () => {
  let component: ScorecardsMatEditComponent;
  let fixture: ComponentFixture<ScorecardsMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsMatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
