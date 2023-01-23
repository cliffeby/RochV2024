import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchesPrintScorecardsComponent } from './matches-print-scorecards.component';

describe('MatchesPrintScorecardsComponent', () => {
  let component: MatchesPrintScorecardsComponent;
  let fixture: ComponentFixture<MatchesPrintScorecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesPrintScorecardsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesPrintScorecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
