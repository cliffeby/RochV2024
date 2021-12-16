import { TestBed } from '@angular/core/testing';

import { MatchPairService } from './match-pair.service';

describe('MatchPairService', () => {
  let service: MatchPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
