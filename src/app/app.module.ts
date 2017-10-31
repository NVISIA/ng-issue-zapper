import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {MessagesComponent} from './discussion/messages.component';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule, MatTableModule, MatSortModule,
  MatToolbarModule, MatSelectModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import {MessageService} from './discussion/message.service';
import {HttpModule} from '@angular/http';
import {NewMessagesComponent} from './discussion/new-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavComponent} from './navigation/nav.component';
import {RouterModule} from '@angular/router';
import { MessageHomeComponent} from './discussion/message-home.component';
import {RegisterComponent} from './register/register.component';
import {IssueListComponent} from './issue/issue-list.component';
import {IssueEditorComponent} from './issue/issue-editor.component';
import {IssueComponent} from './issue/issue.component';
import {IssueService} from './issue/issue.service';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './auth/auth-guard';
import {RoleGuard} from './auth/role-guard';
import {LoginComponent} from './auth/login.component';
import {UserComponent} from './auth/user.component';
import {IssueFilterPipe} from "./issue/issue-filter.pipe";


const routes = [
  { path: '', component: IssueListComponent },
  { path: 'discussion', component: MessageHomeComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'BASIC' }},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'messages/:name', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  {path: 'issues', component: IssueListComponent},
  {path: 'issue/:id', component: IssueEditorComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'MANAGE_TICKET' }},
];

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    IssueEditorComponent,
    IssueFilterPipe,
    IssueListComponent,
    MessagesComponent,
    MessageHomeComponent,
    NewMessagesComponent,
    NavComponent,
    RegisterComponent
  ],
  imports: [
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
    MatSnackBarModule, MatTabsModule, MatToolbarModule, MatTableModule, MatSortModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ IssueService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
