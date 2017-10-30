import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "./auth.service";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styles: [`
.error {
background-color: #da3141;
}
  `]
})
export class LoginComponent {

  public loginForm;

  constructor( fb: FormBuilder , private authService: AuthService) {
    this.loginForm = fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  public commandLogin( form ) {
    this.authService.login(form.value);
  }

  public isValid( control ) {
    return this.loginForm.controls[control].invalid
      && this.loginForm.controls[control].touched;
  }
}
