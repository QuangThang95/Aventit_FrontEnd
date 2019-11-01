import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';

@Component({
    selector: 'kiss-gemeinde-code-remaining-message',
    templateUrl: './gemeinde-code-remaining-message.component.html',
    styleUrls: ['./gemeinde-code-remaining-message.component.scss']
})
export class GemeindeCodeRemainingMessageComponent extends BaseComponent implements OnInit {
    isMessageClosed = false;
    message = '';

    constructor(injector: Injector) {
        super(injector);
    }

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
