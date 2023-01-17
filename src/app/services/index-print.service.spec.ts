import { TestBed } from '@angular/core/testing';

import { IndexPrintService } from './index-print.service';

describe('IndexPrintService', () => {
  let service: IndexPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
