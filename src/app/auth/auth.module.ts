import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,  MatCardModule,  MatInputModule,  MatSnackBarModule,
  MatToolbarModule, MatSelectModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {LoginComponent} from './login.component';
import {UserComponent} from './user.component';
import {AuthGuard} from './auth.guard';
import {RoleGuard} from './role-guard';
import {ShowAuthedDirective} from "./show-authed.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
    MatSnackBarModule, MatToolbarModule,
    ReactiveFormsModule],
  declarations: [LoginComponent, UserComponent, ShowAuthedDirective],
  exports: [LoginComponent, UserComponent, ShowAuthedDirective],
  providers: [AuthGuard, AuthService, UserService, RoleGuard]
})
export class AuthModule {
}
