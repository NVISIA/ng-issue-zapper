import { Component } from '@angular/core';
import {WebService} from "../web.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {

  constructor( private webService: WebService, private route: ActivatedRoute ) {}

  public ngOnInit() {
    var name = (this.route.snapshot.params['name']);

    this.webService.getMessages(name);
    // this.webService.messages.subscribe( messages => {
    //   this.messages = messages;
    // });
  }
}
