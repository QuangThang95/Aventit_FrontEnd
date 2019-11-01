import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kiss-bfs-variablen-remaining-message',
  templateUrl: './bfs-variablen-remaining-message.component.html',
  styleUrls: ['./bfs-variablen-remaining-message.component.scss']
})
export class VariablenRemainingMessageComponent implements OnInit {
  isMessageClosed = false;
  message = '';

  constructor() { }

  ngOnInit() {
  }

  hideMessage() {
    this.isMessageClosed = false;
    this.message = '';
  }

  showMessage(message) {
    this.isMessageClosed = true;
    this.message = message;
  }
}
