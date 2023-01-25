import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatListComponent } from './results-mat-list.component';
import { AuthService } from '@auth0/auth0-angular';

import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('ResultsMatListComponent', () => {
  let component: ResultsMatListComponent;
  let fixture: ComponentFixture<ResultsMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService,],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
