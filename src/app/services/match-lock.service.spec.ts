import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchLockService } from './match-lock.service';

describe('MatchLockService', () => {
  let service: MatchLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MatchLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
