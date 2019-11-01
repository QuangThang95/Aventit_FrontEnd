import { Component, Input } from '@angular/core';
import { VorlagenKontextConstant } from '../../constant';

@Component({
    selector: 'kiss-vorlagen-kontext-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
    @Input() isErrorClosed;
    @Input() messageErr;

    currentlist: any;
    initList: any;

    clearErr() {
        this.isErrorClosed = false;
        this.messageErr = VorlagenKontextConstant.defaultTextErr;
    }
}
