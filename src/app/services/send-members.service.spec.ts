import { TestBed } from '@angular/core/testing';

import { SendMembersService } from './send-members.service';

describe('SendMembersService', () => {
  let service: SendMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
