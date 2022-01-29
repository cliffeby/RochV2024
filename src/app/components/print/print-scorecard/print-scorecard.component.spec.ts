import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintScorecardComponent } from './print-scorecard.component';

describe('PrintScorecardComponent', () => {
  let component: PrintScorecardComponent;
  let fixture: ComponentFixture<PrintScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintScorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
