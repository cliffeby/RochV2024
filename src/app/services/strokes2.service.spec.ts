import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Strokes2Service } from './strokes2.service';
import { UntypedFormBuilder } from '@angular/forms';

describe('Strokes2Service', () => {
  let service: Strokes2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
    providers: [UntypedFormBuilder]});
    service = TestBed.inject(Strokes2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
