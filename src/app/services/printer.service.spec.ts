import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrinterService } from './printer.service';

describe('PrinterService', () => {
  let service: PrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PrinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
