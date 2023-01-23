import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatStrokesComponent } from './results-mat-strokes.component';

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
    fixture.whenStable().then(() => 
    component.match._id =  "63961f72581e925eeb9e6d85"
  );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
