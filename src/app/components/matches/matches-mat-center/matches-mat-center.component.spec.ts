import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchesMatCenterComponent } from './matches-mat-center.component';
import { AuthService } from '@auth0/auth0-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('MatchesMatCenterComponent', () => {
  let component: MatchesMatCenterComponent;
  let fixture: ComponentFixture<MatchesMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesMatCenterComponent ],
      imports: [HttpClientTestingModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
