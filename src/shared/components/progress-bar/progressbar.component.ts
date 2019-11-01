import { Component } from '@angular/core';

@Component({
    selector: 'app-progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent {

    visibleProgressBar = true;
    inProgress = false;
    seconds = 10;
    maxValue = 10;
    intervalId: any;

    constructor() { }

    showProgressBar() {
        this.visibleProgressBar = true;
        this.onProgress();
    }

    hideProgressBar() {
        this.visibleProgressBar = false;
        clearInterval(this.intervalId);
        this.inProgress = !this.inProgress;
        this.seconds = 10;
    }

    private onProgress() {
        if (this.inProgress) {
            clearInterval(this.intervalId);
        } else {
            if (this.seconds === 0) {
                this.seconds = 10;
            }
            this.intervalId = setInterval(() => this.timer(), 1000);
        }
        this.inProgress = !this.inProgress;
    }

    private timer() {
        this.seconds--;
        if (this.seconds === 0) {
            this.inProgress = !this.inProgress;
            clearInterval(this.intervalId);
            return;
        }
    }

}
