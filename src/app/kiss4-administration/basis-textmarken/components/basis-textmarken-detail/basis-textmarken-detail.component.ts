import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';
import { DxValidationGroupComponent, DxFormComponent, DxTextBoxComponent, DxTextAreaComponent, DxSelectBoxComponent, DxCheckBoxComponent } from 'devextreme-angular';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kiss-basis-textmarken-detail',
    templateUrl: './basis-textmarken-detail.component.html',
    styleUrls: ['./basis-textmarken-detail.component.scss']
})
export class BasisTextmarkenDetailComponent implements OnChanges {
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
    @ViewChild('textmarken') textmarkenForm: DxFormComponent;
    @ViewChild('categoryDetail') categoryDetail: DxTextBoxComponent;
    @ViewChild('displayNameDetail') displayNameDetail: DxTextBoxComponent;
    @ViewChild('displayNameCoppyDetail') displayNameCoppyDetail: DxTextBoxComponent;
    @ViewChild('sqlDetail') sqlDetail: DxTextAreaComponent;
    @ViewChild('descriptionDetail') descriptionDetail: DxTextAreaComponent;
    @ViewChild('typDetail') typDetail: DxSelectBoxComponent;
    @ViewChild('tablepDetail') tablepDetail: DxSelectBoxComponent;
    @ViewChild('moduleDetail') moduleDetail: DxSelectBoxComponent;
    @ViewChild('immerDetail') immerDetail: DxCheckBoxComponent;
    @ViewChild('systemDetail') systemDetail: DxCheckBoxComponent;

    @Input() dataDetailObject: any;
    @Input() selectedKeys: any;
    @Input() typData: any;
    @Input() tableNameData: any;
    @Input() modulNameData: any;
    @Output() objectView: EventEmitter<boolean> = new EventEmitter();
    @Output() messengerError: EventEmitter<any> = new EventEmitter();
    @Output() objectDataSave: EventEmitter<any> = new EventEmitter();
    @Output() objectDataDelete: EventEmitter<any> = new EventEmitter();
    @Output() objectDataCancel: EventEmitter<any> = new EventEmitter();
    @Output() objectDataKopie: EventEmitter<any> = new EventEmitter();
    @Output() loadGrid: EventEmitter<any> = new EventEmitter();

    CommonBtn = [...CommonConstant.AdditionalButtons];
    listBtn = [[], this.CommonBtn.splice(7, 1)];
    typeFormatNumber = CommonConstant.FormatNumberAllowDelete;
    customizeBtn = [
        {
            text: this.translateService.instant('BasisTextmarken.Button.Copy'),
            name: 'kopie',
            disabled: false,
            icon: 'save',
            type: 'default'
        },
        {
            text: this.translateService.instant('BasisTextmarken.Button.Save'),
            name: 'speichern',
            disabled: false,
            icon: 'save',
            type: 'default'
        },
        {
            text: this.translateService.instant('BasisTextmarken.Button.Cancel'),
            name: 'abbrechen',
            icon: 'close',
            type: 'default'
        },
        {
            text: 'BasisTextmarken.Button.Delete',
            useSubmitBehavior: true,
            locateInMenu: 'always',
            name: 'deleteMenuItemTopGrd'
        }
    ];
    formComponent: any;
    formData: any;
    isViewModel: boolean;
    remainMessage = {
        visible: false,
        message: '',
    };
    oldFormData: any;

    constructor(public translateService: TranslateService) { }

    ngOnChanges(event) {
        if (!isNullOrUndefined(event.dataDetailObject)) {
            if (!isNullOrUndefined(event.dataDetailObject.currentValue)) {
                this.formData = this.dataDetailObject;
                this.oldFormData = Object.assign({}, this.formData);
            }
        }
    }
    toolBarOnItemClick(event) {
        switch (event) {
            case 'speichern':
                this.validationGroup.instance.validate();
                if (this.checkValidForm()) {
                    this.objectDataSave.emit(this.formData);
                }
                break;
            case 'abbrechen':
                this.onCancel(this.formData);
                break;
            case 'kopie':
                this.onKopie();
                break;
            case 'deleteMenuItemTopGrd':
                this.onDelete(this.formData);
                break;
            default:
        }
    }
    onInitialized(e) {
        this.formComponent = e.component;
    }
    checkValidForm() {
        if (isNullOrUndefined(this.formData.category) || this.formData.category.toString().trim() === '') {
            this.messengerError.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
            this.categoryDetail.instance.focus();
            return false;
        } else if (isNullOrUndefined(this.formData.displayName) || this.formData.displayName.toString().trim() === '') {
            this.messengerError.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
            this.displayNameDetail.instance.focus();
            return false;
        } else if (isNullOrUndefined(this.formData.bookmarkCode) || this.formData.bookmarkCode.toString().trim() === '') {
            this.messengerError.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
            this.typDetail.instance.focus();
            return false;
        } else if (isNullOrUndefined(this.formData.sql) || this.formData.sql.toString().trim() === '') {
            this.messengerError.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
            this.sqlDetail.instance.focus();
            return false;
        } else if (this.formData.category.length > 50) {
            this.messengerError.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
            this.categoryDetail.instance.focus();
            return false;
        } else if (this.formData.displayName.length > 50) {
            this.messengerError.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
            this.displayNameDetail.instance.focus();
            return false;
        } else { return true; }
    }
    onCancel(data) {
        if (this.formData.isUpdate) {
            if (this.isDifferentObj(this.dataDetailObject, this.oldFormData)) {
                this.objectDataCancel.emit(data);
            } else {
                this.loadGrid.emit();
            }
        } else {
            this.objectDataCancel.emit(data);
        }
    }
    onDelete(data) {
        this.objectDataDelete.emit(data);
    }
    onKopie() {
        if (this.checkValidForm()) {
            this.objectDataKopie.emit(this.formData);
        }
    }
    isDifferentObj(objA, objB) {
        let flag = false;
        for (const property in objA) {
            if (objA.hasOwnProperty(property)) {
                if ((<any>objB)[property] !== (<any>objA)[property]) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
}
