import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../auth/auth.service";

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styles: [`
.error {
background-color: #da3141;
}
  `]
})
export class RegisterComponent {

  public registerForm;

  constructor( fb: FormBuilder , private authService: AuthService) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingFields('password', 'confirmPassword')});
  }


  public commandRegister( form ) {
    this.authService.register(form.value);
  }

  public isValid( control ) {
    return this.registerForm.controls[control].invalid
      && this.registerForm.controls[control].touched;
  }
}

function matchingFields( field1, field2 ) {
  return form => {
    if( form.controls[field1].value !== form.controls[field2].value ) {
      return { mismatchedFields: true };
    }
  }
}
