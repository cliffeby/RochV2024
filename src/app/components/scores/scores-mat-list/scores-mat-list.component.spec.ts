import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScoresMatListComponent } from './scores-mat-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScoresMatListComponent', () => {
  let component: ScoresMatListComponent;
  let fixture: ComponentFixture<ScoresMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
