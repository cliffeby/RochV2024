import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StrokesService } from './strokes.service';

describe('StrokesService', () => {
  let service: StrokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StrokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
