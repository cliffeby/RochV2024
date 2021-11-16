import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMatTestComponent } from './members-mat-test.component';

describe('MembersMatTestComponent', () => {
  let component: MembersMatTestComponent;
  let fixture: ComponentFixture<MembersMatTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
