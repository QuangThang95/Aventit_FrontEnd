import { Component, Injector, Input, EventEmitter, ViewChild, ViewChildren, AfterViewInit, OnDestroy, SimpleChanges, OnChanges, QueryList, Output } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { DxDataGridComponent, DxDropDownBoxComponent } from 'devextreme-angular';
import { PostKontakt } from '@app/kiss4-basis/berater/models';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { BeraterAllConstant } from '@app/kiss4-basis/berater/berater.constant';
import { BeraterConstant } from '@shared/common/berater.common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'kiss-berater-detail-edit',
    templateUrl: './berater-detail-edit.component.html',
    styleUrls: ['./berater-detail-edit.component.scss'],
})

export class BeraterFormDetailEditComponent extends BaseComponent implements AfterViewInit, OnChanges, OnDestroy {
    @ViewChildren('detailInsitution') detailInsitutions: QueryList<DxDropDownBoxComponent>;
    @ViewChild('gridInstitutionDetail') gridInstitutionDetail: DxDataGridComponent;
    @ViewChild('detailInsitution') detailInsitution: DxDropDownBoxComponent;
    @Output() formRemainData: EventEmitter<any> = new EventEmitter();
    @Output() formEditStatus: EventEmitter<any> = new EventEmitter();
    @Output() formDataSave: EventEmitter<any> = new EventEmitter();
    @Output() formDataChange: EventEmitter<any> = new EventEmitter();
    @Input() isAddNew: boolean;
    @Input() isEdit: boolean;
    @Input() listInstitution: any;
    @Input() listLanguage: any;
    @Input() formData: any;
    @Input() isSave: boolean;
    isFocusDropDownDetail: boolean;
    isgridInstitution = false;
    subscription = new Subscription();
    selectedKeysDetailGrid = [];
    remainMessage = { visible: false, message: '' };
    editor: any;
    froalaEditorConfig = {
      heightMin: 150,
      height: 300,
      events: {
        'froalaEditor.initialized': (e, editor) => {
          this.editor = editor;
        }
      }
    };

    constructor(injector: Injector,
        public translateService: TranslateService) {
        super(injector);
    }

    ngAfterViewInit() {
        this.subscription.add(
            this.detailInsitutions.changes.pipe(first()).subscribe(e => {
                this.detailInsitutions.first.instance.focus();
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.isAddNew) && !isNullOrUndefined(changes.isAddNew.currentValue) && changes.isAddNew.currentValue) {
            this.selectedKeysDetailGrid = [this.listInstitution[0].baInstitutionID];
        }

        if (!isNullOrUndefined(changes.isEdit) && !isNullOrUndefined(changes.isEdit.currentValue) && changes.isEdit.currentValue) {
            this.selectedKeysDetailGrid = [this.formData.baInstitutionID];
        }

        if (!isNullOrUndefined(changes.isSave) && !isNullOrUndefined(changes.isSave.currentValue) && changes.isSave.currentValue) {
            this.saveBaInstitutionKontakt();
            this.formEditStatus.emit(false);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    saveBaInstitutionKontakt() {
        const postKontakt: PostKontakt = {
            BaInstitutionKontaktID: this.formData.baInstitutionKontaktID ? this.formData.baInstitutionKontaktID : 0,
            BaInstitutionID: this.formData.baInstitutionID,
            Aktiv: this.formData.aktiv ? this.formData.aktiv : true,
            ManuelleAnrede: this.formData.manuelleAnrede ? this.formData.manuelleAnrede : false,
            Anrede: this.formData.anrede ? this.formData.anrede.toString().trim() : '',
            Name: this.formData.name ? this.formData.name.toString().trim() : null,
            Vorname: this.formData.vorname ? this.formData.vorname.toString().trim() : null,
            GeschlechtCode: this.formData.geschlechtCode ? this.formData.geschlechtCode : null,
            Telefon: this.formData.telefon ? this.formData.telefon.toString().trim() : '',
            Fax: this.formData.fax ? this.formData.fax.toString().trim() : '',
            EMail: this.formData.eMail ? this.formData.eMail.toString().trim() : '',
            SprachCode: this.formData.sprachCode ? this.formData.sprachCode : null,
            Bemerkung: this.formData.bemerkung ? this.formData.bemerkung.toString().trim() : '',
            Creator: this.formData.creator ? this.formData.creator : localStorage.getItem('user'),
            Created: this.formData.created ? new Date(this.formData.created) : new Date(),
            Modifier: `${localStorage.getItem('user')}, ${localStorage.getItem('user:userId')}`,
            Modified: new Date(),
            BaInstitutionKontaktTS: this.formData.baInstitutionKontaktTS ? this.formData.baInstitutionKontaktTS : null,
        };
        const message = this.validateForm(postKontakt);
        if (message) {
            this.showRemainMessage(message);
        } else {
            this.formDataSave.emit(postKontakt);
        }
    }

    validateForm(data): {} {
        if (isNullOrUndefined(data.BaInstitutionID) || data.BaInstitutionID.toString().trim() === '') {
            return this.translateService.instant(BeraterConstant.InstitutionRequireMessage);
        }

        if (isNullOrUndefined(data.Name) || data.Name.toString().trim() === '') {
            return this.translateService.instant(BeraterConstant.NameRequireMessage);
        }

        if (isNullOrUndefined(data.Vorname) || data.Vorname.toString().trim() === '') {
            return this.translateService.instant(BeraterConstant.VornameRequireMessage);
        }

        if (data.Anrede.length > 100 || data.Name.length > 100 || data.Vorname.length > 100 || data.Telefon.length > 100 || data.Fax.length > 100 || data.EMail.length > 100) {
            return this.translateService.instant(BeraterConstant.VornameRequireMessage);
        }
    }

    showRemainMessage(message) {
        this.remainMessage = {
            visible: true,
            message: message
        };
        this.formRemainData.emit(this.remainMessage);
    }

    onChangeData() {
        this.formDataChange.emit(this.formData);
    }

    gridOnClick(event, gridName: string) {
        this.formData[gridName] = event.key;
        if (gridName === BeraterConstant.BaInstitutionID) {
            this.isgridInstitution = false;
        }
    }

    clickDropDownDetailGrid() {
        setTimeout(() => {
            const selKey = this.gridInstitutionDetail.instance.getSelectedRowKeys();
            const currentKey = selKey[0] ? selKey[0] : 0;
            const index = this.gridInstitutionDetail.instance.getRowIndexByKey(currentKey);
        }, BeraterAllConstant.timeOut300);
    }

    onKeyDownGridInstitution($event) {
        this.isFocusDropDownDetail = true;
        if (($event.event.keyCode === AppEnums.KeyCode.KeyF4) && (this.isgridInstitution || this.isFocusDropDownDetail)) {
            event.preventDefault();
            if (this.isgridInstitution) {
                setTimeout(() => {
                    this.detailInsitution.instance.focus();
                }, BeraterAllConstant.timeOut300);
            } else {
                setTimeout(() => {
                    const selKey = this.gridInstitutionDetail.instance.getSelectedRowKeys();
                    const currentKey = selKey[0] ? selKey[0] : 0;
                    const index = this.gridInstitutionDetail.instance.getRowIndexByKey(currentKey);
                }, BeraterAllConstant.timeOut300);
            }
            this.isgridInstitution = !this.isgridInstitution;
        }
    }

    onFocusInDropboxDetail() {
        this.isFocusDropDownDetail = true;
    }

    onFocusOutDropboxDetail() {
        this.isFocusDropDownDetail = false;
    }

    async onKeyDownGridDetail($event) {
        const selKey = this.gridInstitutionDetail.instance.getSelectedRowKeys();
        const currentKey = selKey[0] ? selKey[0] : 0;
        let index = this.gridInstitutionDetail.instance.getRowIndexByKey(currentKey);
        if ($event.event.keyCode === AppEnums.KeyCode.UpArrowKey && index > 0) {
            index = index - 1;
            await this.gridInstitutionDetail.instance.focus(this.gridInstitutionDetail.instance.getCellElement(index, 0));
            this.gridInstitutionDetail.instance.selectRowsByIndexes([index]);
            this.selectedKeysDetailGrid = [this.gridInstitutionDetail.instance.getKeyByRowIndex(index)];
            const row = $event.component.getRowElement(index);
            await $event.component.getScrollable().scrollToElement(row);
            return;
        }

        if ($event.event.keyCode === AppEnums.KeyCode.DownArrowKey && (index + 1) < this.listInstitution.length) {
            index = index + 1;
            this.gridInstitutionDetail.instance.focus(this.gridInstitutionDetail.instance.getCellElement(index, 0));
            this.gridInstitutionDetail.instance.selectRowsByIndexes([index]);
            this.selectedKeysDetailGrid = [this.gridInstitutionDetail.instance.getKeyByRowIndex(index)];
            const row = $event.component.getRowElement(index);
            $event.component.getScrollable().scrollToElement(row);
            return;
        }

        if ($event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
            this.formData['baInstitutionID'] = this.gridInstitutionDetail.instance.getSelectedRowKeys()[0];
            this.isgridInstitution = false;
            return;
        }

        if (($event.event.keyCode === AppEnums.KeyCode.KeyF4) && (this.isgridInstitution || this.isFocusDropDownDetail)) {
            event.preventDefault();
            if (this.isgridInstitution) {
                setTimeout(() => {
                    this.detailInsitution.instance.focus();
                }, BeraterAllConstant.timeOut300);
            }
            this.isgridInstitution = !this.isgridInstitution;
        }
    }

    selectContentReady(e) {
        const dataSource = e.component.option('dataSource');
        if (!dataSource) {
            return;
        }
        if (dataSource.length <= 0) {
            return;
        }
        if (Object.keys(dataSource[0]).length === 0) {
            return;
        }
        dataSource.forEach((element, index) => {
            if (!element || (element && !element.text)) {
                dataSource.splice(index, 1);
            }
        });
        dataSource.splice(0, 0, {});
        e.component.option('dataSource', dataSource);
    }

    spracheKeyDownGrid($event) {
        if ($event.event.keyCode === AppEnums.KeyCode.KeyF4) {
            if (!($event.component.option('opened'))) {
                $event.component.open();
            } else {
                $event.component.close();
            }
        }
    }
}
