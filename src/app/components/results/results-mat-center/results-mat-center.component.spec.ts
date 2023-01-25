import { ComponentFixture, TestBed,} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchesService } from 'src/app/services/matches.service';
import { PrinterService } from 'src/app/services/printer.service';
import { ResultsMatCenterComponent } from './results-mat-center.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ResultsMatCenterComponent', () => {
  let component: ResultsMatCenterComponent;
  let fixture: ComponentFixture<ResultsMatCenterComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMatCenterComponent ],
      imports: [HttpClientTestingModule],
      providers: [ MatchesService, PrinterService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should be created', () => {
  //   const service: myService = TestBed.get(myService);
  //   expect(service).toBeTruthy();
  //  });

  //  it('should have getData function', () => {
  //   const service: myService = TestBed.get(myService);
  //   expect(service.getData).toBeTruthy();
  //  });
});
