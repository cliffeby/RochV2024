import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberBlockComponent } from './member-block.component';
import { SearchFilterPipe } from 'src/app/search.pipe';
import { MembersService } from 'src/app/services/members.service';
import { of } from 'rxjs';

describe('MemberBlockComponent', () => {
  let component: MemberBlockComponent;
  let fixture: ComponentFixture<MemberBlockComponent>;
  let serviceStub: any;

  beforeEach(async () => {
    serviceStub = {
      getMembers: ()=> of([{__id : "6394a2ca452f70e0def25d8f",
      "firstName" : "Cliff",
      "lastName" : "Eby",
      "usgaIndex" : 8.7,}]) 
    }
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBlockComponent, SearchFilterPipe ],
      imports: [HttpClientTestingModule],
      providers: [SearchFilterPipe, {MembersService, useValue: serviceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
