import { Component } from '@angular/core';
import {MessageService} from "./message.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {

  constructor(private messageService: MessageService, private route: ActivatedRoute ) {}

  public ngOnInit() {
    var name = (this.route.snapshot.params['name']);

    this.messageService.getMessages(name);
  }
}
