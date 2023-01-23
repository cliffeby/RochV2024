import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchesMatListComponent } from './matches-mat-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MatchesMatListComponent', () => {
  let component: MatchesMatListComponent;
  let fixture: ComponentFixture<MatchesMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesMatListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesMatListComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => 
    component.matches[0]._id =  "63961f72581e925eeb9e6d85"
  );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
