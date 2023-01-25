import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatStrokesComponent } from './results-mat-strokes.component';
import { Match } from 'src/app/models/match';

describe('ResultsMatStrokesComponent', () => {
  let component: ResultsMatStrokesComponent;
  let fixture: ComponentFixture<ResultsMatStrokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatStrokesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatStrokesComponent);
    component = fixture.componentInstance;
    var match = new Match();
    // fixture.whenStable().then(() =>  
    component.match = match
  // );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
