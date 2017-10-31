import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

  public baseUrl = "/api";

  constructor(private http: Http , private authService: AuthService) {
  }

  public getUser() {
    return this.http.get(this.baseUrl + '/users/me', this.authService.tokenHeader).map( res => res.json());
  }

  public updateUser(user) {
    return this.http.post(this.baseUrl + '/users/me', user, this.authService.tokenHeader).map( res => res.json());
  }
}
