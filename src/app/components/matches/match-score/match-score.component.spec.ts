import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchScoreComponent } from './match-score.component';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { Match } from 'src/app/models/match';

describe('MatchScoreComponent', () => {
  let component: MatchScoreComponent;
  let fixture: ComponentFixture<MatchScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchScoreComponent ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    var match = new Match()
    fixture = TestBed.createComponent(MatchScoreComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => 
    component.match =  match
  );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
