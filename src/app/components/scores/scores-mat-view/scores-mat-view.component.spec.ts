import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScoresMatViewComponent } from './scores-mat-view.component';

describe('ScoresMatViewComponent', () => {
  let component: ScoresMatViewComponent;
  let fixture: ComponentFixture<ScoresMatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatViewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatViewComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => 
    component.score._id =  "63961f72581e925eeb9e6d85"
  );
  fixture.detectChanges();
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
})
