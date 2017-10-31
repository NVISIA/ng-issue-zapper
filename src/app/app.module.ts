import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {MessagesComponent} from "./discussion/messages.component";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule, MatSelectModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import {MessageService} from "./discussion/message.service";
import {HttpModule} from "@angular/http";
import {NewMessagesComponent} from "./discussion/new-message.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavComponent} from "./navigation/nav.component";
import {RouterModule} from "@angular/router";
import { MessageHomeComponent} from "./discussion/message-home.component";
import {RegisterComponent} from "./register/register.component";
import {AuthService} from "./auth/auth.service";
import {LoginComponent} from "./auth/login.component";
import {UserComponent} from "./auth/user.component";
import {IssueListComponent} from "./issue/issue-list.component";
import {IssueEditorComponent} from "./issue/issue-editor.component";
import {IssueComponent} from "./issue/issue.component";
import {IssueService} from "./issue/issue.service";
import {AuthGuard} from "./auth/auth-guard";
import {UserService} from "./auth/user.service";

let routes = [
  { path: '', component: IssueListComponent },
  { path: 'discussion', component: MessageHomeComponent , canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'messages/:name', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent , canActivate: [AuthGuard]},
  {path: 'issues', component: IssueListComponent},
  {path: 'issue/:id', component: IssueEditorComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    IssueEditorComponent,
    IssueListComponent,
    LoginComponent,
    MessagesComponent,
    MessageHomeComponent,
    NewMessagesComponent,
    NavComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthGuard, AuthService, IssueService, UserService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
