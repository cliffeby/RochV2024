import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersCenterComponent } from './members-center.component';

describe('MembersCenterComponent', () => {
  let component: MembersCenterComponent;
  let fixture: ComponentFixture<MembersCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
