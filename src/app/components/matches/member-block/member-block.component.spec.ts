import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBlockComponent } from './member-block.component';

describe('MemberBlockComponent', () => {
  let component: MemberBlockComponent;
  let fixture: ComponentFixture<MemberBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
