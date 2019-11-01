import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { XDocContext } from '@app/kiss4-administration/kiss4-vorlagen-kontext/models';
import { DxTextBoxComponent, DxFormComponent } from 'devextreme-angular';
import { VorlagenKontextConstant } from '../../constant';

@Component({
    selector: 'kiss-vorlagen-kontext-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})

export class DetailEditComponent {
    @Input() vorlagenkontextModel: XDocContext;

    @Output() textboxChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('docContextNameTemplate') kontextName: DxTextBoxComponent;
    @ViewChild('vorlagenkontextForm') vorlagenkontextForm: DxFormComponent;

    valueChanged() {
        this.textboxChange.emit({
            type: VorlagenKontextConstant.typeBoxChange
        });
    }

    onDataInput(event, field) {
        this.textboxChange.emit({
            type: VorlagenKontextConstant.typeBoxInput,
            event: event,
            field: field
        });
    }

}
