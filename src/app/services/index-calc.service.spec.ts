import { TestBed } from '@angular/core/testing';

import { IndexCalcService } from './index-calc.service';

describe('IndexCalcService', () => {
  let service: IndexCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
