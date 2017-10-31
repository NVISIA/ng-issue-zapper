import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Subject} from 'rxjs/Rx';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  public baseUrl = "/auth";
  public sbConfig;

  constructor(private http: Http, private router: Router, private sb: MatSnackBar) {
    this.sbConfig = new MatSnackBarConfig();
    this.sbConfig.duration = 2000;
  }

  public  register(user) {
    delete user.confirmPassword;
    this.http.post(this.baseUrl + "/register", user).subscribe(
      res => {
        this.authenticate(res.json());
      }
    );
  }

  public  login(user) {
    this.http.post(this.baseUrl + "/login", user).subscribe(
      res => {
        this.authenticate(res.json());
      }
    );
  }

  public get userRole() {
    return localStorage.getItem("role");
  }

  public get userTitle() {
    return localStorage.getItem('user_title');
  }

  public get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  public get tokenHeader() {
    let header = new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return new RequestOptions({headers: header});
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("role");
    this.router.navigate(['/']);
  }

  private authenticate(json) {
    if (!json.token) {
      return;
    }
    localStorage.setItem('token', json.token);
    localStorage.setItem('user_title', json.user.firstName + ' ' + json.user.lastName);
    localStorage.setItem('role', json.user.role);
    console.log(json);
    this.sb.open("Welcome " + json.user.firstName, 'close', this.sbConfig);
    this.router.navigate(['/']);
  }

}
