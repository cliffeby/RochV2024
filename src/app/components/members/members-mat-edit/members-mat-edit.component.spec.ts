import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMatEditComponent } from './members-mat-edit.component';

describe('MembersMatEditComponent', () => {
  let component: MembersMatEditComponent;
  let fixture: ComponentFixture<MembersMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
