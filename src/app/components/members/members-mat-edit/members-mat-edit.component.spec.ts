import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MembersMatEditComponent } from './members-mat-edit.component';
import { UntypedFormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

describe('MembersMatEditComponent', () => {
  let component: MembersMatEditComponent;
  let fixture: ComponentFixture<MembersMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatEditComponent ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
