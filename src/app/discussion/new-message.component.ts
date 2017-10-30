import {Component } from '@angular/core';
import {WebService} from "../web.service";


@Component({
  selector: 'new-message',
  templateUrl: './new-message.component.html',
})
export class NewMessagesComponent {

  public message = {
    owner: "",
    text: ""
  };

  constructor(private webService: WebService) {
  }

  public async post() {
    await this.webService.postMessage(this.message);
  }
}
