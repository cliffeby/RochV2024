import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMatAddComponent } from './members-mat-add.component';

describe('MembersMatAddComponent', () => {
  let component: MembersMatAddComponent;
  let fixture: ComponentFixture<MembersMatAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
