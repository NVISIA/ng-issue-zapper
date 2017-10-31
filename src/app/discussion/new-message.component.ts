import {Component } from '@angular/core';
import {MessageService} from "./message.service";


@Component({
  selector: 'new-message',
  templateUrl: './new-message.component.html',
})
export class NewMessagesComponent {

  public message = {
    owner: "",
    text: ""
  };

  constructor(private messageService: MessageService) {
  }

  public async post() {
    await this.messageService.postMessage(this.message);
  }
}
