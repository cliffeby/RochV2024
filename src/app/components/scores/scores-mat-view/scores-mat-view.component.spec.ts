import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresMatViewComponent } from './scores-mat-view.component';

describe('ScoresMatViewComponent', () => {
  let component: ScoresMatViewComponent;
  let fixture: ComponentFixture<ScoresMatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
