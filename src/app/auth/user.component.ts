import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "./auth.service";
import {WebService} from "../web.service";

@Component({
  moduleId: module.id,
  selector: 'user',
  templateUrl: 'user.component.html',
  styles: [`
.error {
background-color: #da3141;
}
  `]
})
export class UserComponent {

  public userForm;

  constructor( fb: FormBuilder,
               private webService: WebService,
               private authService: AuthService) {
    this.userForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public ngOnInit() {
    this.webService.getUser().subscribe(
      user => {
        this.userForm.patchValue( user );
      }
    );
  }


  public commandSave( form ) {
    this.webService.updateUser(form.value).subscribe(
      user => {
        this.userForm.patchValue( user );
      }
    );
  }

  public isValid( control ) {
    return this.userForm.controls[control].invalid
      && this.userForm.controls[control].touched;
  }
}
