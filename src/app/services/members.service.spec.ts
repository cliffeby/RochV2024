import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;
  const expectedMembers = [{_id: '63961f34581e925eeb9e6d70', firstName: 'Rich', lastName: 'Acker', usgaIndex: 16, scorecardsId: Array(2),},
  {_id: '63adedeef2c0b0e283d7eec2', firstName: 'London', lastName: 'Catcher', usgaIndex: 4.7, scorecardsId: Array(2),},
  {_id: '6394a2ca452f70e0def25d8f', firstName: 'Cliff', lastName: 'Eby', usgaIndex: 8.5, scorecardsId: Array(2),},
  {createdAt: "2022-12-11T18:19:32.633Z", email: "ra@ra.com",  firstName: "Rich", fullName: "Rich Acker", fullNameR: "Acker, Rich", id: "63961f34581e925eeb9e6d70",
    lastDatePlayed: "2023-02-08T05:00:00.000Z", lastName: "Acker", scorecardsId: ['63cd527e55ac3fd65e6dba11', '63961efc581e925eeb9e6d68'],
    updatedAt: "2023-01-24T03:53:30.111Z", user:"clifford.eby@gmail.com", usgaIndex: 16, __v: 0, _id:    "63961f34581e925eeb9e6d70"}];


  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should return array of members', () => {
    expect(service.getMembers).toContain(expectedMembers);
  });
});
