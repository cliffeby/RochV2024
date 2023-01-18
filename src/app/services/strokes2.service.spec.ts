import { TestBed } from '@angular/core/testing';

import { Strokes2Service } from './strokes2.service';

describe('Strokes2Service', () => {
  let service: Strokes2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Strokes2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
