import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScorecardsMatCenterComponent } from './scorecards-mat-center.component';
import { AuthService } from '@auth0/auth0-angular';

describe('ScorecardsMatCenterComponent', () => {
  let component: ScorecardsMatCenterComponent;
  let fixture: ComponentFixture<ScorecardsMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatCenterComponent ],
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
