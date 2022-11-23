import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesMatListComponent } from './matches-mat-list.component';

describe('MatchesMatListComponent', () => {
  let component: MatchesMatListComponent;
  let fixture: ComponentFixture<MatchesMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesMatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
