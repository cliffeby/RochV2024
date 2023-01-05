import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPrintComponent } from './index-print.component';

describe('IndexPrintComponent', () => {
  let component: IndexPrintComponent;
  let fixture: ComponentFixture<IndexPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
