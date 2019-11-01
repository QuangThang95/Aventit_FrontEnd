import {Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CommonConstant} from '@shared/common/constant.common';
import {VermogenConstant} from '@shared/common/sozialhilfe.common';
import {BaseComponent} from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import {locale} from 'devextreme/localization';

@Component({
    selector: 'kiss-vermogen-detail',
    templateUrl: './vermogen-detail.component.html',
    styleUrls: ['./vermogen-detail.component.scss']
})
export class VermogenDetailComponent extends BaseComponent implements OnInit, OnDestroy {

    @Input() dataSelectBoxPerson: any;
    @Input() dataSelectBoxArtDesVermogen: any;
    @Input() dataVermogenDetail: any;
    @Output() disableGridEventEmitter = new EventEmitter<boolean>();
    @Output() action = new EventEmitter<string>();

    constructor(injector: Injector, public translateService: TranslateService, ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    CommonBtn = [...CommonConstant.AdditionalButtons];
    listBtn = [[], this.CommonBtn.splice(7, 1)];
    isViewMode = true;
    isAddMode = false;

    customizeBtn = [
        {
            text: 'Vermogen.Neue-Vermogen',
            visible: this.isViewMode,
            name: 'neue-vermogen',
            icon: 'add',
            type: 'default'
        },
        {
            text: 'Vermogen.Bearbeiten',
            visible: this.isViewMode,
            name: 'bearbeiten',
            icon: 'edit',
            type: 'default'
        },
        {
            text: 'Vermogen.Speichern',
            visible: !this.isViewMode,
            name: 'speichern',
            disabled: false,
            icon: 'save',
            type: 'default'
        },
        {
            text: 'Vermogen.Abbrechen',
            visible: !this.isViewMode,
            name: 'abbrechen',
            icon: 'close',
            type: 'default'
        }
    ];

    toolBarOnItemClick(event: string) {
        switch (event) {
            case VermogenConstant.NEUE_VERMOGEN_BUTTON:
                // this.action.emit(event);
                this.doAddNew();

                break;
            case VermogenConstant.BEARBEITEN_BUTTON:
                // this.action.emit(event);
                this.doUpdate();
                break;
            case VermogenConstant.SPEICHERN_BUTTON:
                // this.action.emit(event);
                this.doSave();
                break;
            case VermogenConstant.ABBRECHEN_BUTTON:
                this.action.emit(event);
                this.doCancel();
                break;
            default:
                break;
        }
    }

    //#region "CRUD"
    doAddNew() {
        this.setViewMode(false);
        this.isAddMode = true;
        this.disableGridEventEmitter.emit(true);
    }

    doUpdate() {
        this.setViewMode(false);
        this.isAddMode = false;
        this.disableGridEventEmitter.emit(true);
    }

    doCancel() {
        this.setViewMode(true);
        this.disableGridEventEmitter.emit(false);
    }

    doSave() {
        this.setViewMode(true);
        this.disableGridEventEmitter.emit(false);
    }
    //#endregion

    private setViewMode(isViewMode) {
        this.isViewMode = isViewMode;
        this.customizeBtn[0].visible = isViewMode;
        this.customizeBtn[1].visible = isViewMode;
        this.customizeBtn[2].visible = !isViewMode;
        this.customizeBtn[3].visible = !isViewMode;
        this.customizeBtn = [...this.customizeBtn];
    }

    ngOnInit() {
        // this.setViewMode(true);
    }

    ngOnDestroy() {

    }
}
