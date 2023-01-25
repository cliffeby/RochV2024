import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MembersCenterComponent } from './members-center.component';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MembersCenterComponent', () => {
  let component: MembersCenterComponent;
  let fixture: ComponentFixture<MembersCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersCenterComponent ],
      imports: [HttpClientTestingModule,  AuthModule.forRoot({
        domain: 'Y', clientId: 'Z',
      })],
      providers: [ AuthService, ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
