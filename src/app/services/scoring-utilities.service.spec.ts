import { TestBed } from '@angular/core/testing';

import { ScoringUtilitiesService } from './scoring-utilities.service';

describe('ScoringUtilitiesService', () => {
  let service: ScoringUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoringUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
