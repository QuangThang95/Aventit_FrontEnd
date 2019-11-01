import 'devextreme-intl';

import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GemeindeCode } from '@app/kiss4-sostat/gemeinde-code/models';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxPopupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { GemeindeCodeSandbox } from '../gemeinde-code.sandbox';

@Component({
    selector: 'kiss-gemeinde-code',
    templateUrl: './gemeinde-code.component.html',
    styleUrls: ['./gemeinde-code.component.scss']
})
@SetClassRight('CtlQueryBFSGemeinde')
export class GemeindeCodeComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    @ViewChild('gemeindeCodeList') gemeindeCodeList: any;
    @ViewChild('gridpopup') gridpopup: DxPopupComponent;
    @ViewChild('expand') expand: any;
    @ViewChild('remainingMessage') remainingMessage: any;
    optionNameExport = 'export.fileName';
    optionLandesxindexValue = this.translateService.instant('GemeindeCode.Title');
    dataGemeindeCodes: GemeindeCode[];
    dataGemeindeCode = new GemeindeCode();
    searchData = new GemeindeCode();
    totalRecords: any;
    popupHtml: any;
    showPrintPopup = false;
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    languageCode: string;
    inProgress = false;
    seconds = 10;
    maxValue = 10;
    intervalId: any;
    rowSelectedIndex: number;
    isReadOnly = true;
    isFirstLoad = true;
    filterColumns: Array<any> = [];
    titleBenutzerdefiniert = this.translateService.instant('GemeindeCode.Message.titleBenutzerdefiniert');
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [];
    private subscription = new Subscription();

    constructor(injector: Injector,
        public gemeindeCodeSandbox: GemeindeCodeSandbox,
        public utilService: UtilService,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    // #region component life cycle functions
    ngOnInit() {
        this.setTitle('Sostat');
        this.initFunction();
        this.getLocalStorage();
        this.registerEvents();
    }

    initFunction() {
        this.gemeindeCodeSandbox.getGemeindeCodes({});
    }

    getLocalStorage() {
        this.userID = UtilityHelper.getUserIdFromLocalStorage();
        this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
        this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
        this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
        this.logonName = UtilityHelper.getUserFromLocalStorage();
    }

    private registerEvents(): void {
        this.subscription.add(this.gemeindeCodeSandbox.GemeindeCodeData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport)) {
                this.dataGemeindeCodes = dataExport;
                if (dataExport.length > 0) {
                    this.dataGemeindeCode = dataExport[0];
                    this.gemeindeCodeList.setSelectedKeys([dataExport[0].BaGemeindeID]);
                }
            }
        }));
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    unregisterEvents() {
        this.subscription.unsubscribe();
    }
    // #endregion

    // #region component CRUD functions
    onSearch(searchData) {
        this.gemeindeCodeSandbox.getGemeindeCodes(searchData);
    }
    // #endregion

    // #region common functions
    toolBarOnItemClickTopGrd(e) {
        this.gemeindeCodeList.toolBarOnItemClickTopGrd(e, this.remainingMessage);
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }
    // #endregion

    // #region utility functions
    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
    // #endregion
}
