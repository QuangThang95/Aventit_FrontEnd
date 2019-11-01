import { Component, Injector, Output, Input, OnInit, EventEmitter, HostListener, SimpleChanges, OnChanges } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { BeraterAllConstant } from '@app/kiss4-basis/berater/berater.constant';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
    selector: 'kiss-berater-detail',
    templateUrl: './berater-detail.component.html',
    styleUrls: ['./berater-detail.component.scss'],
})

export class BeraterFormDetailComponent extends BaseComponent implements OnInit, OnChanges {
    @Output() changeStatus: EventEmitter<any> = new EventEmitter();
    @Output() formDataSave: EventEmitter<any> = new EventEmitter();
    @Output() formDataChange: EventEmitter<any> = new EventEmitter();
    @Output() formRemainData: EventEmitter<any> = new EventEmitter();
    @Output() isAbbrechen: EventEmitter<any> = new EventEmitter();
    @Output() isLoschen: EventEmitter<any> = new EventEmitter();
    @Input() isReadOnly: boolean;
    @Input() isAddNew: boolean;
    @Input() isEdit: boolean;
    @Input() formData: any;
    @Input() listInstitution: any;
    @Input() listLanguage: any;
    @Input() isEditFailAbbrechen: boolean;
    AdditionalButtons = [...CommonConstant.AdditionalButtons];
    listBtnDetail = [null, [...this.AdditionalButtons].splice(7, 1)];
    customizeBtnDetail = [];
    isSave: boolean;

    constructor(injector: Injector,
        public translateService: TranslateService) {
        super(injector);
    }

    ngOnInit() {
        this.customizeBtnDetail = [
            {
                text: 'ExterneBerater.ExterneBeraterSucheBox.Speichern',
                visible: false,
                useSubmitBehavior: true,
                icon: 'save',
                name: 'speichern',
                disabled: false
            },
            {
                text: 'ExterneBerater.ExterneBeraterSucheBox.Abbrechen',
                visible: false,
                icon: 'close',
                name: 'abbrechen'
            },
            {
                text: 'ExterneBerater.ExterneBeraterSucheBox.NeuerExternerBerater',
                visible: true,
                icon: 'add',
                name: 'neuer'
            },
            {
                text: 'ExterneBerater.ExterneBeraterSucheBox.Bearbeiten',
                visible: true,
                icon: 'edit',
                name: 'bearbeiten'
            },
        ];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.isReadOnly) && !isNullOrUndefined(changes.isReadOnly.currentValue)) {
            this.onChangeStatus(changes.isReadOnly.currentValue);
        }

        if (!isNullOrUndefined(changes.isEditFailAbbrechen) && !isNullOrUndefined(changes.isEditFailAbbrechen.currentValue)) {
            this.changeMode(BeraterAllConstant.speichernFail);
        }
    }

    onChangeStatus(data) {
        if (data) {
            this.changeMode(BeraterAllConstant.viewmode);
        } else {
            this.changeMode(BeraterAllConstant.editmode);
        }
    }

    changeMode(type) {
        switch (type) {
            case BeraterAllConstant.viewmode:
                this.customizeBtnDetail = this.changeVisibleBtn(this.customizeBtnDetail, ['neuer', 'bearbeiten']);
                break;
            case BeraterAllConstant.editmode:
                this.customizeBtnDetail = this.changeVisibleBtn(this.customizeBtnDetail, ['speichern', 'abbrechen']);
                break;
            case BeraterAllConstant.speichernFail:
                this.customizeBtnDetail = this.changeDisabled(this.customizeBtnDetail, ['speichern']);
                break;
            default:
                break;
        }
    }

    changeVisibleBtn(list, conditionShow) {
        list.map(obj => {
            if (conditionShow.indexOf(obj.name) !== -1) {
                obj.visible = true;
            } else {
                obj.visible = false;
            }
            return obj;
        });
        return [...list];
    }

    changeDisabled(list, disabled) {
        list.map(obj => {
            if (disabled.indexOf(obj.name) !== -1) {
                obj.disabled = this.isEditFailAbbrechen;
            }
            return obj;
        });
        return [...list];
    }

    toolBarOnItemDetailClick(e) {
        switch (e) {
            case BeraterAllConstant.neuer: {
                this.onNeuer();
                break;
            }
            case BeraterAllConstant.bearbeiten: {
                if (this.formData.hasOwnProperty('id') && this.formData.id !== '') {
                    this.onBearbeiten();
                }
                break;
            }
            case BeraterAllConstant.speichern: {
                this.onSpeichern();
                break;
            }
            case BeraterAllConstant.abbrechen: {
                this.onAbbrechen();
                break;
            }
            case CommonConstant.ButtonGridDelete: {
                if (this.formData.hasOwnProperty('id') && this.formData.id !== '') {
                    this.onLoschen();
                }
                break;
            }
        }
    }

    onNeuer() {
        this.changeStatus.emit({
            isReadOnly: false,
            isAddNew: true,
            isEdit: false
        });
    }

    onBearbeiten() {
        this.changeStatus.emit({
            isReadOnly: false,
            isAddNew: false,
            isEdit: true
        });
    }

    onSpeichern() {
        this.isSave = true;
    }

    onAbbrechen() {
        this.isAbbrechen.emit(true);
    }

    onLoschen() {
        this.isLoschen.emit(true);
    }

    editStatus(data) {
        this.isSave = data;
    }

    saveData(data) {
        this.formDataSave.emit(data);
    }

    onChangeData(data) {
        this.formDataChange.emit(this.formData);
    }

    showRemainMessage(data) {
        this.formRemainData.emit(data);
    }

    blurAll() {
        const el = document.querySelector(':focus');
        if (el) {
            (el as HTMLElement).blur();
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // Ctrl + B
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
            event.preventDefault();
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
            event.preventDefault();
            this.blurAll();
            this.onSpeichern();
            return;
        }
        // Ctrl + z
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
            event.preventDefault();
            this.blurAll();
            this.onAbbrechen();
            return;
        }
        // Ctrl + I
        if ((event.ctrlKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
            if (!this.isEdit) {
                event.preventDefault();
                this.onNeuer();
                return;
            }
        }
        // Ctrl + M
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
            event.preventDefault();
            if (this.formData.hasOwnProperty('id') && this.formData.id !== '') {
                this.onLoschen();
                return;
            }
        }
    }
}
