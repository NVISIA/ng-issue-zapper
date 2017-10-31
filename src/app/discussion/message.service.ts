import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class MessageService {

  public baseUrl = "/api";
  public  sbConfig;
  private messageSubject = new Subject();
  private messageStore = [];
  public messages = this.messageSubject.asObservable();


  constructor(private http: Http, private sb : MatSnackBar , private authService: AuthService) {
    this.sbConfig = new MatSnackBarConfig();
    this.sbConfig.duration = 2000;

    this.getMessages();
  }

  public getMessages(user?:string) {
    let userUrl = "";
    if( user ) {
      userUrl = "/" + user;
    }

      this.http.get(this.baseUrl + "/messages" + userUrl).subscribe(
        response => {
          this.messageStore = response.json();
          this.messageSubject.next(this.messageStore);
        },
        error => {
          this.sb.open("Unable to save message", 'close', this.sbConfig);
        }
      );
  }

  public async postMessage(message) {
    try {
      var response = await this.http.post(this.baseUrl + "/messages", message,  this.authService.tokenHeader).toPromise();
      this.messageStore.push(response.json());
      this.messageSubject.next(this.messageStore);
    } catch (error) {

      this.sb.open("Unable to save message", 'close', this.sbConfig);
    }
  }
}
