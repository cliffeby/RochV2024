import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatListComponent } from './results-mat-list.component';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';

describe('ResultsMatListComponent', () => {
  let component: ResultsMatListComponent;
  let fixture: ComponentFixture<ResultsMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatListComponent ],
      imports: [HttpClientTestingModule],
      providers: [AuthService, ActivatedRoute]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
