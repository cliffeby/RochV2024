import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScorecardsMatCenterComponent } from './scorecards-mat-center.component';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

describe('ScorecardsMatCenterComponent', () => {
  let component: ScorecardsMatCenterComponent;
  let fixture: ComponentFixture<ScorecardsMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsMatCenterComponent ],
      providers: [UntypedFormBuilder, AuthService ],
      imports: [HttpClientTestingModule,  AuthModule.forRoot({
        domain: 'Y', clientId: 'Z',
      })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
