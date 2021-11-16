import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMatListComponent } from './members-mat-list.component';

describe('MembersMatListComponent', () => {
  let component: MembersMatListComponent;
  let fixture: ComponentFixture<MembersMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
