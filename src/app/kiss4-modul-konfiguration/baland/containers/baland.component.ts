import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Baland } from '@app/kiss4-modul-konfiguration/baland/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PopupConfirmComponent } from '@shared/components/popup-confirm/popup-confirm.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { ProgressbarComponent } from '@shared/components/progress-bar/progressbar.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { BalandSandbox } from '../baland.sandbox';
import { BalandDetailComponent } from '../components/baland-detail/baland-detail.component';
import { BalandListComponent } from '../components/baland-list/baland-list.component';

@Component({
    selector: 'kiss-baland',
    templateUrl: './baland.component.html',
    styleUrls: ['./baland.component.scss']
})
@SetClassRight('CtlBaland')
export class BalandComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {

    @ViewChild('expand') expand: any;
    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('popupModel') popupModel: PopupConfirmComponent;
    @ViewChild('balandProgressBar') balandProgressBar: ProgressbarComponent;
    @ViewChild('balandList') balandList: BalandListComponent;
    @ViewChild('balandDetail') balandDetail: BalandDetailComponent;


    btnAsyn = 'btnAsyn';
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [
        {
            text: this.translateService.instant('Baland.GemeindeDatenJetztAktualisieren'),
            name: this.btnAsyn,
            id: 'c004_lander-aktualisieren_lander-jetzt-aktualisieren',
            icon: 'fa fa-refresh'
        }
    ];
    pageTitle: string;
    labelError: string;
    dsBalands: Baland[];
    dataBalandDetail = new Baland();
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    isReadOnly = true;
    private errorCodes = [AppEnums.StatusCode.BAD_REQUEST, AppEnums.StatusCode.LIMIT_FILE_SIZE, AppEnums.StatusCode.XML_FORMAT, AppEnums.StatusCode.STATUS_CODE_421, AppEnums.StatusCode.STATUS_CODE_500];

    private subscriptions: Subscription[] = [];

    constructor(injector: Injector, public balandsSandbox: BalandSandbox, public utilService: UtilService,
        public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    // #region component life cycle functions
    ngOnInit() {
        this.pageTitle = this.translateService.instant('Baland.Title');
        this.registerEvents();
        this.balandProgressBar.showProgressBar();
        this.popupModel.initPopUpModel();
        this.initFunction();
        this.getLocalStorage();
    }

    ngAfterViewInit() {
        this.balandList.getFilterColumns();
    }

    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.balandsSandbox.reset();
        this.unregisterEvents();
    }
    // #endregion

    // #region component CRUD functions
    toolBarOnItemClickTopGrd(event) {
        switch (event) {
            case CommonConstant.ButtonExportExcel: {
                this.balandList.exportExcel();
                break;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.balandList.showColumnChooser();
                break;
            }
            case this.btnAsyn: {
                this.balandProgressBar.showProgressBar();
                this.balandsSandbox.syncData();
                break;
            }
            default:
                break;
        }
        this.balandList.updateGridSetting(event);
    }

    onSelectData(data: Baland) {
        if (data) {
            this.balandDetail.setDataBaland(data);
        }
    }
    // #endregion

    // #region common functions
    getLocalStorage() {
        this.userID = UtilityHelper.getUserIdFromLocalStorage();
        this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
        this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
        this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
        this.logonName = UtilityHelper.getUserFromLocalStorage();
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
    // #endregion

    // #region utility functions
    private registerEvents(): void {
        this.subscriptions.push(this.balandsSandbox.BalandData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport) && dataExport.length > 0) {
                this.dsBalands = dataExport;
                this.balandList.setSelectedKeys(dataExport[0].baLandID);
                this.balandDetail.setDataBaland(dataExport[0]);
                setTimeout(() => this.balandProgressBar.hideProgressBar(), CommonConstant.SetTimeOut1000);
            }
        }));

        this.subscriptions.push(this.balandsSandbox.BalandSyncData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                if (response.status) {
                    if (this.errorCodes.includes(response.status)) {
                        this.balandProgressBar.hideProgressBar();
                        this.popupModel.showPopupModel(this.translateService.instant('Baland.Information'), JSON.parse(response._body).message);
                    }
                } else {
                    this.balandProgressBar.showProgressBar();
                    this.balandsSandbox.getBaland();
                }
            }
        }));
    }

    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private initFunction() {
        this.balandsSandbox.getBaland();
    }
    // #endregion

}
