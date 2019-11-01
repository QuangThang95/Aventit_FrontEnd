import { Component, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@node_modules/@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { HttpResponseHandler } from '@shared/asyncServices/http/httpResponseHandler.service';
import { BasisTextMarkenConstant } from '@shared/common/basis-textmarken.common';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getConditionListBtn } from '@shared/utilites';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { TextmarkenSandbox } from '../basis-textmarken.sandbox';
import { Basistextmarken } from '../models/basis-textmarken.models';

import { cloneDeep } from 'lodash-es';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'basis-textmarken-form',
    templateUrl: './basis-textmarken.component.html',
    styleUrls: ['./basis-textmarken.component.scss'],
})

export class TextmarkenComponent extends BaseComponent implements OnInit, OnDestroy {
    textmarkenData: any;
    formData = new Basistextmarken();
    tableNameData: any;
    typData: any;
    modulNameData: any;
    isErrorClosed: any;
    languageCode: number;
    queryDataSearch: any;
    rowSelectedOfGrid: any = null;
    rowSelectedForGrid: any = null;
    alwaysVisible: boolean;
    system: boolean;
    objectSearch: any;
    selectedKeys: any;
    dataDetailObject: any;
    isViewModel: boolean;
    popUpModelTextMarken: PopUpModel;
    popupType: string;
    poToolKey = {
        canDeactivate: 'canDeactivate',
        information: 'information',
        confirm: 'confirm',
        concurrency: 'concurrency',
        speichern: 'speichern',
        abbrechen: 'abbrechen',
        bearbeiten: 'bearbeiten',
        exportExcel: 'exportExcel',
        chooserColumn: 'chooserColumn',
        printPdf: 'printPdf',
        gridSetting: 'gridSetting',
        yes: 'yes',
        no: 'no',
        hide: 'hide',
        informationGl: 'informationGl'
    };
    namePopupFuntion: string;
    namePopup = {
        add: 'add',
        edit: 'edit',
        delete: 'delete',
        cancel: 'cancel',
        copy: 'copy',
        concurrencyPopup: 'concurrencyPopup',
        save: 'save',
    };
    remainMessage = {
        visible: false,
        message: '',
    };
    customizeBtnDetail = [];
    messageToastError: string;
    oldData: any;
    listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];

    private subscriptions: Subscription[] = [];
    private isCopyingData: any;

    constructor(injector: Injector,
        public router: Router,
        public textmarkenSandbox: TextmarkenSandbox,
        public httpResponseHandler: HttpResponseHandler,
        public translateService: TranslateService,
        private moduleConfigSandbox: ModuleConfigSandbox,
        ) {
        super(injector);
    }
    ngOnInit() {
        this.titlePage = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.Title');
        this.setTitle(this.titlePage);
        this.registerEvents();
        this.initPopUpModelTextMarken();
        this.loadTextMarkenData({ languageCode: this.languageCode });
        this.loadTableData();
        this.loadTypData();
        this.loadModulData();
        this.queryDataSearch = { languageCode: this.languageCode };
    }
    registerEvents(): void {
        // Call sandbox true
        this.subscriptions.push(

            this.textmarkenSandbox.textmarkenData$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.textmarkenData = data ? data : [];
                this.textmarkenData = data ? this.textmarkenData.map((e, index) => Object.assign(e, { id: index + 2 })) : [];
                if (!isNullOrUndefined(this.textmarkenData)) {
                    this.selectedKeys = this.textmarkenData[0];
                    this.dataDetailObject = this.textmarkenData[0];
                }
                if (this.isCopyingData) {
                    this.addNewTemporaryItem(this.isCopyingData);
                }
            }), this.textmarkenSandbox.getTableData$.subscribe(data => {
                this.tableNameData = data;
            }), this.textmarkenSandbox.getTypData$.subscribe(data => {
                this.typData = data;
            }), this.textmarkenSandbox.getModulData$.subscribe(data => {
                this.modulNameData = data;
            })),

            this.textmarkenSandbox.basisTextmarkenDelKontaktData$.subscribe(data => {
                // DELETE item successed !
                this.loadTextMarkenData({ languageCode: this.languageCode });
            }),
            this.textmarkenSandbox.basisTextmarkenSaveKontaktData$.subscribe(data => {
                // Save item successed !
                this.loadTextMarkenData({ languageCode: this.languageCode });
            }),

            this.textmarkenSandbox.textmarkenDataFail$.subscribe(data => {
                // Call sandbox fail
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.checkResponseData(data);
            }),

            this.textmarkenSandbox.getTableDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.checkResponseData(data);
            }),

            this.textmarkenSandbox.getTypDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.checkResponseData(data);
            }),

            this.textmarkenSandbox.getModulDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.checkResponseData(data);
            }),

            this.textmarkenSandbox.basisTextmarkenDelDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.checkResponseData(data);
            }),

            this.textmarkenSandbox.basisTextmarkenSaveDataFail$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    if (data.hasOwnProperty('_body')) {
                        const results = JSON.parse(data._body);
                        if (results.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
                            this.popupType = this.poToolKey.concurrency;
                            this.namePopupFuntion = this.namePopup.concurrencyPopup;
                        } else {
                            this.popupType = this.poToolKey.information;
                            this.isViewModel = true;
                            this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
                        }
                        this.hanleActionUpdatedTextMarken(results.message, '');
                    }
                }
            });
    }
    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.unregisterEvents();
    }
    // load data in grid
    loadTextMarkenData(query) {
        this.textmarkenSandbox.textMarkenData(query);
    }

    // load data select box in tabelle
    loadTableData() {
        this.textmarkenSandbox.getTableName();
    }

    // load data select box in typ
    loadTypData() {
        this.textmarkenSandbox.getTypName(null);
    }

    // load data select box in modulmessengerError
    loadModulData() {
        this.textmarkenSandbox.getModulName(null);
    }
    initPopUpModelTextMarken() {
        this.popUpModelTextMarken = new PopUpModel(
            {
                title: '',
                isVisibleTitle: true,
                isVisible: false,
                message: '',
                textYes: '',
                isVisibleYes: false,
                textNo: '',
                isVisibleNo: false,
                funcYes: null,
                funcNo: null,
            }
        );
    }
    hanleActionUpdatedTextMarken(messages, data) {
        this.initPopUpModelTextMarken();
        if (this.popupType === this.poToolKey.confirm) {
            // title Confirm Edit
            this.popUpModelTextMarken.title = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.TitlePopupEdit');
            this.popUpModelTextMarken.message = messages;
            this.popUpModelTextMarken.isVisibleNo = true;
            this.popUpModelTextMarken.isVisibleYes = true;
            this.popUpModelTextMarken.textYes = this.translateService.instant('BasisTextmarken.Button.OK');
            this.popUpModelTextMarken.textNo = this.translateService.instant('BasisTextmarken.Button.Cloes');
        }
        if (this.popupType === this.poToolKey.information) {
            // Title Information
            this.popUpModelTextMarken.title = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.Information');
            this.popUpModelTextMarken.message = messages;
        }
        if (this.popupType === this.poToolKey.concurrency) {
            this.popUpModelTextMarken.message = messages;
            this.popUpModelTextMarken.title = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.TitlePopupCopy');
            this.popUpModelTextMarken.textYes = this.translateService.instant('BasisTextmarken.Button.Confirm');
            this.popUpModelTextMarken.textNo = this.translateService.instant('BasisTextmarken.Button.Abbrechen');
            this.popUpModelTextMarken.isVisibleNo = true;
            this.popUpModelTextMarken.isVisibleYes = true;
        }
        if (this.popupType === this.poToolKey.canDeactivate) {
            this.popUpModelTextMarken.message = messages;
            this.popUpModelTextMarken.title = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.Message');
            this.popUpModelTextMarken.textYes = this.translateService.instant('BasisTextmarken.Button.Discard');
            this.popUpModelTextMarken.textNo = this.translateService.instant('BasisTextmarken.Button.Abbrechen');
            this.popUpModelTextMarken.isVisibleNo = true;
            this.popUpModelTextMarken.isVisibleYes = true;
        }
        this.popUpModelTextMarken.isVisible = true;
        this.popUpModelTextMarken.funcNo = () => {
            if (this.namePopupFuntion === this.namePopup.cancel) {
                this.popUpModelTextMarken.isVisible = false;
                this.isViewModel = true;
                return;
            }
        };
        this.popUpModelTextMarken.funcYes = () => {
            this.popUpModelTextMarken.isVisible = false;
            if (this.namePopupFuntion === this.namePopup.delete) {
                this.clickLoschenYes(data);
                return;
            }
            if (this.namePopupFuntion === this.namePopup.cancel) {
                this.clickAbbrechenYes(data);
                return;
            }
        };
    }
    checkResponseData(data) {
        const results = JSON.parse(data._body);
        this.popupType = this.poToolKey.information;
        this.hanleActionUpdatedTextMarken(results.message, data);
    }

    changeVisibleBtn(list, conditionShow) {
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            element.visible = false;
            for (let index2 = 0; index2 < conditionShow.length; index2++) {
                const condition = conditionShow[index2];
                if (element.name === condition) {
                    element.visible = true;
                }
            }
        }
        return [...list];
    }
    toolBarOnItemClickGrid(event) {

    }
    rowSelectChange(event) {
        this.rowSelectedOfGrid = event;
    }
    onRowSelectedFormSearch(rowSelectGrid) {
        this.rowSelectedForGrid = rowSelectGrid;
    }
    doSearch(objectSearch: any) {
        const listConditionReq = BasisTextMarkenConstant.listConditionReq;
        this.objectSearch = cloneDeep(objectSearch);
        for (const p of listConditionReq) {
            if (!this.objectSearch[p]) {
                delete this.objectSearch[p];
            }
        }
        this.loadTextMarkenData(this.objectSearch);
    }

    dataDetail(event) {
        this.dataDetailObject = event;
    }
    objectView(event) {
        // this.loadTextMarkenData({languageCode : this.languageCode});
        this.isViewModel = event;
    }
    objectDataNew(event) {
        this.dataDetailObject = event;
        const currentGrid = this.textmarkenData;
        currentGrid.unshift(this.dataDetailObject);
        this.textmarkenData = currentGrid;
        this.selectedKeys = event;
    }
    messengerError(message) {
        if (message) {
            this.remainMessage = {
                visible: true,
                message: message,
            };
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
    // close message
    onCloseError() {
        this.remainMessage = {
            visible: false,
            message: '',
        };
    }
    // Funtion Save
    objectDataSave(data) {
        this.textmarkenSandbox.SaveBasistextmarken(data);
        if (data.isUpdate) {
            this.isViewModel = false;
        } else {
            this.isViewModel = true;
        }
    }
    // Funtion Delete
    objectDataDelete(data) {
        // Message Delete
        this.messageToastError = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.messageToastErrorDelete');
        this.namePopupFuntion = this.namePopup.delete;
        this.popupType = this.poToolKey.confirm;
        this.hanleActionUpdatedTextMarken(this.messageToastError, data);
    }
    // Funtion Cancel
    objectDataCancel(data) {
        this.popupType = this.poToolKey.confirm;
        this.namePopupFuntion = this.namePopup.cancel;
        if (data.isUpdate) {
            // Message Cancel Edit
            this.messageToastError = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.PopupCopyMessage');
        } else {
            // Message Cancel Add
            this.messageToastError = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.PopupAddMessage');
        }
        this.hanleActionUpdatedTextMarken(this.messageToastError, data);
    }
    // Funtion Copy
    objectDataKopie(data) {
        if (data.isUpdate) {
            this.textmarkenSandbox.SaveBasistextmarken(data);
            this.isCopyingData = data;
        } else {
            this.textmarkenSandbox.SaveBasistextmarken(data);
        }
    }

    addNewTemporaryItem(data) {
        const checkbookmarkName = this.textmarkenData.filter(item => item.bookmarkName === data.bookmarkName + '_');
        if (checkbookmarkName.length) {
            this.popupType = this.poToolKey.information;
            this.messageToastError = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.messageToastNeuerCopyError');
            this.hanleActionUpdatedTextMarken(this.messageToastError, data);
        } else {
            this.oldData = Object.assign({}, data);
            this.oldData.id = 1;
            this.oldData.category = '';
            this.oldData.displayName = '';
            this.oldData.bookmarkName = this.oldData.bookmarkName + '_';
            const currentGrid = this.textmarkenData;
            currentGrid.unshift(this.oldData);
            this.textmarkenData = currentGrid;
            this.selectedKeys = this.oldData;
            this.isCopyingData = undefined;
        }
    }

    // Click Cancel
    clickAbbrechenYes(data) {
        if (data.isUpdate) {
            this.textmarkenSandbox.SaveBasistextmarken(data);
            this.isViewModel = false;
        } else {
            this.loadTextMarkenData({ languageCode: this.languageCode });
            this.isViewModel = false;
        }
    }
    // Click Delete
    clickLoschenYes(data) {
        this.textmarkenSandbox.DelBasistextmarken({
            bookmarkName: data.bookmarkName,
            xBookmarkTS: data.xBookmarkTS
        });
        this.isViewModel = false;
    }
    // Load Grid View
    loadGrid() {
        this.loadTextMarkenData({ languageCode: this.languageCode });
        this.isViewModel = false;
    }
}
