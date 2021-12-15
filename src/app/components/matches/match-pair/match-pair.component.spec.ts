import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPairComponent } from './match-pair.component';

describe('MatchPairComponent', () => {
  let component: MatchPairComponent;
  let fixture: ComponentFixture<MatchPairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchPairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
