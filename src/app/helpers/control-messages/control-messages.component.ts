import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'control-messages',
  templateUrl:  './control-messages.component.html'
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      // console.log('PropertyName', propertyName, this.control.errors[propertyName], ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]))
      if (this.control.errors.hasOwnProperty(propertyName)) {
        // if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
