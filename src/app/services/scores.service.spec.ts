import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScoresService } from './scores.service';

describe('ScoresService', () => {
  let service: ScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
