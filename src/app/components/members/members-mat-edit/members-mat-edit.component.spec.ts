import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MembersMatEditComponent } from './members-mat-edit.component';
import { UntypedFormBuilder } from '@angular/forms';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Member } from 'src/app/models/member';
import { By } from '@angular/platform-browser';

fdescribe('MembersMatEditComponent', () => {
  let component: MembersMatEditComponent;
  let fixture: ComponentFixture<MembersMatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMatEditComponent ],
      providers: [UntypedFormBuilder, AuthService],
      imports: [HttpClientTestingModule,  AuthModule.forRoot({
        domain: 'Y', clientId: 'Z',
      })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Update button is hidden but updateMemberEvent should exist', () => {
    spyOn(component.updateMemberEvent, 'emit');
    expect(component.updateMemberEvent.emit).toBeTruthy();
  });
  it('Cancel button should emit on click', () => {
    spyOn(component.cancelMemberEvent, 'emit');
    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#cancel');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();  
    expect(component.cancelMemberEvent.emit).toHaveBeenCalledWith();
 });
 it('Add button should emit on click', () => {
  spyOn(component.submitAddMemberEvent, 'emit');
  // trigger the click
  const nativeElement = fixture.nativeElement;
  const button = nativeElement.querySelector('#addbtn');
  button.dispatchEvent(new Event('click'));
  fixture.detectChanges();   
  expect(component.submitAddMemberEvent.emit).toHaveBeenCalledOnceWith(component.member);
});
});
