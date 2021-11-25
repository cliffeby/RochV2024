import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from '../../services/validation.service';

// Mock Validation Service
export class MockValidationService {
  getValidatorErrorMessage() {
  };
}

const control = new FormControl();

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ControlMessagesComponent],
      providers: [
        { provide: ValidationService, useclass: MockValidationService }
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ControlMessagesComponent);
    component = fixture.componentInstance;
    component.control = control;
    fixture.detectChanges();
    const _validationservice = new MockValidationService();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});
