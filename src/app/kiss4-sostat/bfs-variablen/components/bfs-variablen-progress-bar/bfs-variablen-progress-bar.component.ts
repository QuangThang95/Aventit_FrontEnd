import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kiss-bfs-variablen-progress-bar',
    templateUrl: './bfs-variablen-progress-bar.component.html',
    styleUrls: ['./bfs-variablen-progress-bar.component.scss']
})
export class VariablenProgressBarComponent implements OnInit {
    showProgressBar = false;
    seconds = 8;
    maxValue = 10;
    inProgress = false;
    intervalId: any;
    constructor() { }

    ngOnInit() {
    }

    showProgress() {
        this.showProgressBar = true;
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

    hideProgress() {
        this.showProgressBar = false;
        this.inProgress = false;
    }

    timer() {
        if (this.seconds === 0) {
            this.inProgress = !this.inProgress;
            clearInterval(this.intervalId);
            this.showProgressBar = false;
            return;
        }
        this.seconds--;
    }
}
