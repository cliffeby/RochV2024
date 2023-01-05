import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCenterComponent } from './index-center.component';

describe('IndexCenterComponent', () => {
  let component: IndexCenterComponent;
  let fixture: ComponentFixture<IndexCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
