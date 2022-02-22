import { TestBed } from '@angular/core/testing';

import { StrokesService } from './strokes.service';

describe('StrokesService', () => {
  let service: StrokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
