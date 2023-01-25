import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MembersMatListComponent } from './members-mat-list.component';
import { AuthService } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MembersMatListComponent', () => {
  let component: MembersMatListComponent;
  let fixture: ComponentFixture<MembersMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
