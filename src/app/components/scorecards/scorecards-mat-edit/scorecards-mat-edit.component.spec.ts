import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScorecardsMatEditComponent } from './scorecards-mat-edit.component';
import { UntypedFormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

describe('ScorecardsMatEditComponent', () => {
  let component: ScorecardsMatEditComponent;
  let fixture: ComponentFixture<ScorecardsMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatEditComponent ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder, AuthService]
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
