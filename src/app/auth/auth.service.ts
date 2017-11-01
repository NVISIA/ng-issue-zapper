import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  public baseUrl = '/auth';
  public sbConfig;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticatedObservable = this.isAuthenticatedSubject.asObservable();

  constructor(private http: Http, private router: Router, private sb: MatSnackBar) {
    this.sbConfig = new MatSnackBarConfig();
    this.sbConfig.duration = 2000;
    if ( !!localStorage.getItem('token') ) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  public register(user) {
    delete user.confirmPassword;
    this.http.post(this.baseUrl + '/register', user).subscribe(
      res => {
        this.authenticate(res.json());
      }
    );
  }

  public login(user) {
    this.http.post(this.baseUrl + '/login', user).subscribe(
      res => {
        this.authenticate(res.json());
      }
    );
  }

  public get userRole() {
    return localStorage.getItem('role');
  }

  public get userTitle() {
    return localStorage.getItem('user_title');
  }

  public get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public getAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedObservable;
  }

  public get tokenHeader() {
    const header = new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return new RequestOptions({headers: header});
  }

  public logout() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  private authenticate(json) {
    if (!json.token) {
      return;
    }
    localStorage.setItem('token', json.token);
    localStorage.setItem('user_title', json.user.firstName + ' ' + json.user.lastName);
    localStorage.setItem('role', json.user.role);
    this.isAuthenticatedSubject.next(true);
    console.log(json);
    this.sb.open('Welcome ' + json.user.firstName, 'close', this.sbConfig);
    this.router.navigate(['/']);
  }

  public isAuthorizedForRole(neededRole: string) {
    if (neededRole === undefined || this.userRole === 'ADMIN') {
      return true;
    }

    if (neededRole === 'MANAGE_TICKET' && this.userRole !== 'MANAGE_TICKET') {
      return false;
    }

    return true;
  }
}
