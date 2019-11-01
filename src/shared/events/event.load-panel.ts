import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BroadcasterEvent } from './event.broadcaster';

@Injectable()
export class LoadPanelEvent {
    constructor(private broadcaster: BroadcasterEvent) { }

    fire(data: boolean): void {
        this.broadcaster.broadcast(LoadPanelEvent, data);
    }

    on(): Observable<boolean> {
        return this.broadcaster.on<boolean>(LoadPanelEvent);
    }
}
