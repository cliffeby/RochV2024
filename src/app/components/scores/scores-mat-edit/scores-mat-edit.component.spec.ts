import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { ScoresMatEditComponent } from './scores-mat-edit.component';
import { UntypedFormBuilder } from '@angular/forms'
import { PlayerScores, Score } from 'src/app/models/score';

describe('ScoresMatEditComponent', () => {
  let component: ScoresMatEditComponent;
  let fixture: ComponentFixture<ScoresMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatEditComponent ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    var score = new Score()
    fixture = TestBed.createComponent(ScoresMatEditComponent);
    component = fixture.componentInstance;
    var playerArray = new PlayerScores();
    component.allPlayerScores = playerArray
    component.score = score;
    fixture.whenStable().then(() => 
    component.allPlayerScores.scr = score
  );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
