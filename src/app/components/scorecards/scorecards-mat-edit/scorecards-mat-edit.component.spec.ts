import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScorecardsMatEditComponent } from './scorecards-mat-edit.component';
import { UntypedFormBuilder } from '@angular/forms';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ScorecardsMatEditComponent', () => {
  let component: ScorecardsMatEditComponent;
  let fixture: ComponentFixture<ScorecardsMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatEditComponent ],
      providers: [UntypedFormBuilder, AuthService ],
      imports: [HttpClientTestingModule,  AuthModule.forRoot({
        domain: 'Y', clientId: 'Z',
      })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
