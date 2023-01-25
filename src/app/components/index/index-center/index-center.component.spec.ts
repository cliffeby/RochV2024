import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexListComponent } from '../index-list/index-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexCenterComponent } from './index-center.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('IndexCenterComponent', () => {
  let component: IndexCenterComponent;
  let fixture: ComponentFixture<IndexCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCenterComponent, IndexListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
