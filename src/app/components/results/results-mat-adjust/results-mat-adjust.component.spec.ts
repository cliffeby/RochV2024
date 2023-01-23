import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatAdjustComponent } from './results-mat-adjust.component';
import { UntypedFormBuilder } from '@angular/forms';

describe('ResultsMatAdjustComponent', () => {
  let component: ResultsMatAdjustComponent;
  let fixture: ComponentFixture<ResultsMatAdjustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatAdjustComponent ],
      imports: [HttpClientTestingModule],
      providers: [UntypedFormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatAdjustComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => 
    component.match._id =  "63961f72581e925eeb9e6d85"
  );
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
