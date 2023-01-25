import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { IndexListComponent } from './index-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndexListComponent', () => {
  let component: IndexListComponent;
  let fixture: ComponentFixture<IndexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: []
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
