import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresMatEditComponent } from './scores-mat-edit.component';

describe('ScoresMatEditComponent', () => {
  let component: ScoresMatEditComponent;
  let fixture: ComponentFixture<ScoresMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
