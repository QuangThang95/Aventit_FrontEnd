import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { XDocContext } from '../../models';
import { DetailEditComponent } from '../edit-mode/edit-mode.component';

@Component({
    selector: 'kiss-vorlagen-kontext-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
    @Input() vorlagenkontextModel: XDocContext;
    @Input() isAddMode = false;
    @Input() options = false;
    @Input() isEdit = false;
    @Input() isSave = false;

    @Output() updatePopup: EventEmitter<any> = new EventEmitter();
    @Output() showPopUpMulti: EventEmitter<any> = new EventEmitter();
    @Output() sourceChange: EventEmitter<any> = new EventEmitter();
    @Output() formChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('multiSelectComponent') multipleSelect: MultiSelectComponent;
    @ViewChild('multiSelectView') multiSelectView: MultiSelectComponent;
    @ViewChild('editForm') editForm: DetailEditComponent;

    onReceiveSourceChange() {
        this.sourceChange.emit();
    }

    onformChange(value) {
        this.formChange.emit(value);
    }
}
