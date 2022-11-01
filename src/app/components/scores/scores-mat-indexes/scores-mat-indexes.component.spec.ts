import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresMatIndexesComponent } from './scores-mat-indexes.component';

describe('ScoresMatIndexesComponent', () => {
  let component: ScoresMatIndexesComponent;
  let fixture: ComponentFixture<ScoresMatIndexesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatIndexesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatIndexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
