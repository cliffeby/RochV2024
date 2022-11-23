import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesMatCenterComponent } from './matches-mat-center.component';

describe('MatchesMatCenterComponent', () => {
  let component: MatchesMatCenterComponent;
  let fixture: ComponentFixture<MatchesMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesMatCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
