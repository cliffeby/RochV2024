import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDropDragComponent } from './match-drop-drag.component';

describe('MatchDropDragComponent', () => {
  let component: MatchDropDragComponent;
  let fixture: ComponentFixture<MatchDropDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchDropDragComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchDropDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
