import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MembersMatListComponent } from './members-mat-list.component';
import { AuthService } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

fdescribe('Members MatListComponent', () => {
  let component: MembersMatListComponent;
  let fixture: ComponentFixture<MembersMatListComponent>;
  let httpSpy: Spy<HttpClient>;
  let service: MembersService;
  let fakeMembers: Member[] = [
    {
      email: 'ra@ra.com',
      firstName: 'Rich',
      fullName: 'Rich Acker',
      fullNameR: 'Acker, Rich',
      lastDatePlayed: '2023-02-08T05:00:00.000Z',
      lastName: 'Acker',
      scorecardsId: ['63cd527e55ac3fd65e6dba11', '63961efc581e925eeb9e6d68'],
      user: 'clifford.eby@gmail.com',
      usgaIndex: 16,
      usgaIndexForTodaysScore: 12,
      created: '2023-02-08T05:00:00.000Z',
      scorecardId: '1',
      isPlaying: false,
      _id: '63961f34581e925eeb9e6d70',
    },
    {
      email: 'ra@ra.com',
      firstName: 'Bill',
      fullName: 'Bill Smith',
      fullNameR: 'Smith, Bill',
      lastDatePlayed: '2023-02-08T05:00:00.000Z',
      lastName: 'Smith',
      scorecardsId: ['63cd527e55ac3fd65e6dba11', '63961efc581e925eeb9e6d68'],
      user: 'clifford.eby@gmail.com',
      usgaIndex: 16,
      usgaIndexForTodaysScore: 12,
      created: '2023-02-08T05:00:00.000Z',
      scorecardId: '1',
      isPlaying: false,
      _id: '63961f34581e925eeb9e6d70',
    },
  ];
  let router: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersMatListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthService,
        MembersService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = jasmine.createSpyObj('router', ['navigate']);
    service = TestBed.inject(MembersService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should create activatedRoute', () => {
    expect(router).toBeTruthy();
  });

  it('should return an expected list of customers', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeMembers);

    service.getMembers().subscribe((members) => {
      expect(members).toHaveSize(fakeMembers.length);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('onAdd() should emit on click', () => {
    spyOn(component.SelectMemberEvent, 'emit');
    component.onAdd(null);
    expect(component.SelectMemberEvent.emit).toHaveBeenCalled();
    expect(component.SelectMemberEvent.emit).toHaveBeenCalledWith(null);
  });
  it('onSelect() should emit on click', () => {
    spyOn(component.SelectMemberEvent, 'emit');
    var dummy: Member;
    component.onSelect(dummy);
    expect(component.SelectMemberEvent.emit).toHaveBeenCalled();
    expect(component.SelectMemberEvent.emit).toHaveBeenCalledWith(dummy);
  });
  it('onDelete(index,member should delete a member from fake Members'),
    (done: DoneFn) => {
      httpSpy.get.and.nextWith(fakeMembers);
      service.getMembers().subscribe((members) => {
        service.deleteMember('63961f34581e925eeb9e6d70').subscribe(() => {
          expect(members).toHaveSize(fakeMembers.length - 1);
          done();
        }, done.fail);
        expect(httpSpy.get.calls.count()).toBe(1);
      });
    };
  describe('onDelete(index, member) should pop a confirmation window', function () {
    beforeEach(() => {
      spyOn(window, 'prompt').and.callThrough();
      spyOn(window, 'confirm');
      var member: Member;
      component.onDelete(1, member);
      window.confirm('Cancel');
    });

    xit('should generate a window prompt', () => {
      expect(window.prompt).toHaveBeenCalledWith('OK');
    });

    it('should generate a confirm dialog', () => {
      expect(window.confirm).toHaveBeenCalledWith('Are you sure');
    });
  });
});
