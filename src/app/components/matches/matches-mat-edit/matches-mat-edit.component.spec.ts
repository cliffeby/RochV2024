import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchesMatEditComponent } from './matches-mat-edit.component';
import { AuthService } from '@auth0/auth0-angular';

describe('MatchesMatEditComponent', () => {
  let component: MatchesMatEditComponent;
  let fixture: ComponentFixture<MatchesMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesMatEditComponent ],
      providers: [UntypedFormBuilder, AuthService ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesMatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
