import { TestBed } from '@angular/core/testing';

import { MatchLockService } from './match-lock.service';

describe('MatchLockService', () => {
  let service: MatchLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
