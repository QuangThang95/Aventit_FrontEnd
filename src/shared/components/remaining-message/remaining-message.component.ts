import { Component } from '@angular/core';

@Component({
    selector: 'app-remaining-message',
    templateUrl: './remaining-message.component.html',
    styleUrls: ['./remaining-message.component.scss']
})
export class RemainingMessageComponent {

    isMessageClosed = false;
    message = '';

    constructor() { }

    hideMessage() {
        this.isMessageClosed = false;
        this.message = '';
    }

    showMessage(message) {
        this.isMessageClosed = true;
        this.message = message;
    }

}
