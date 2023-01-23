import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IndexListComponent } from './index-list.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndexListComponent', () => {
  let component: IndexListComponent;
  let fixture: ComponentFixture<IndexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ActivatedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
