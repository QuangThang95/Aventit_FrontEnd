import {
    Directive, Output, EventEmitter, HostListener, ElementRef, OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';

@Directive({
    selector: '[kissScroll]'
})
export class ScrollEventDirective implements OnDestroy {
    @Output() scrollPosition: EventEmitter<any> = new EventEmitter<any>();
    documentTarget: 4;
    private scrollEvent$;

    constructor(private el: ElementRef) {
        this.scrollEvent$ = Observable.fromEvent(this.el.nativeElement,
            'scroll').subscribe((e: any) => {
                const rangeFilter = document.getElementsByClassName('dx-datagrid-filter-range-overlay').item(0) as HTMLElement;
                if (rangeFilter) {
                    rangeFilter.remove();
                    this.scrollPosition.emit(rangeFilter);
                }
            });
    }

    ngOnDestroy() {
        this.scrollEvent$.unsubscribe();
    }
}
