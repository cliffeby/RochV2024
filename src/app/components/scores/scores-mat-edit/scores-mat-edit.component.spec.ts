import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScoresMatEditComponent } from './scores-mat-edit.component';
import { UntypedFormBuilder } from '@angular/forms';
import { Score } from 'src/app/models/score';

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
    fixture.whenStable().then(() => 
    component.allPlayerScores.scr = score
  );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
