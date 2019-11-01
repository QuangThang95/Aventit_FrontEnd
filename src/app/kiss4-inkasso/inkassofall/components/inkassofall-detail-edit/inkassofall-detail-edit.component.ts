import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';

import { Inkassofall } from '../../models';

@Component({
    selector: 'kiss-inkassofall-detail-edit',
    templateUrl: './inkassofall-detail-edit.component.html',
    styleUrls: ['./inkassofall-detail-edit.component.scss']
})
export class InkassofallDetailEditComponent implements AfterViewInit, OnDestroy {
    // Input
    @Input() sizeQualifier: number;
    @Input() minStringLength: number;
    @Input() minIntValue: number;
    @Input() maxIntValue: number;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() maxFormatLength: number;
    @Input() fixWidth: number;
    @Input() isCollapseFormDetail = false;
    // DataSource
    @Input() dsInkassofalls: Inkassofall;


    // Value changed
    @Output()
    dsInkassofallsChange = new EventEmitter();

    // Output
    @Output() focusIn = new EventEmitter();
    @Output() focusOut = new EventEmitter();
    @Output() keyDownSelectOption = new EventEmitter();

    @ViewChild('validationGroupInkassofall') validationGroupInkassofall: DxValidationGroupComponent;

    subscription = new Subscription();

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
