import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesMatEditComponent } from './matches-mat-edit.component';

describe('MatchesMatEditComponent', () => {
  let component: MatchesMatEditComponent;
  let fixture: ComponentFixture<MatchesMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesMatEditComponent ]
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
