import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreESATotalComponent } from './match-score-esa-total.component';

describe('MatchScoreESATotalComponent', () => {
  let component: MatchScoreESATotalComponent;
  let fixture: ComponentFixture<MatchScoreESATotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchScoreESATotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchScoreESATotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
