import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresMatListComponent } from './scores-mat-list.component';

describe('ScoresMatListComponent', () => {
  let component: ScoresMatListComponent;
  let fixture: ComponentFixture<ScoresMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
