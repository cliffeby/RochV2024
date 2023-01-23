import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchPairService } from './match-pair.service';

describe('MatchPairService', () => {
  let service: MatchPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MatchPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
