import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    GemeindeDatenDetailComponent,
} from '@app/kiss4-modul-konfiguration/gemeinde-daten/components/gemeinde-daten-detail/gemeinde-daten-detail.component';
import {
    GemeindeDatenGridComponent,
} from '@app/kiss4-modul-konfiguration/gemeinde-daten/components/gemeinde-daten-grid/gemeinde-daten-grid.component';
import {
    GemeindeDatenUploadComponent,
} from '@app/kiss4-modul-konfiguration/gemeinde-daten/components/gemeinde-daten-upload/gemeinde-daten-upload.component';
import { GemeindeDatenSandbox } from '@app/kiss4-modul-konfiguration/gemeinde-daten/gemeinde-daten.sandbox';
import { GemeindeDaten } from '@app/kiss4-modul-konfiguration/gemeinde-daten/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { GemeindeDatenConstant } from '@shared/common/gemeinde-daten.common';
import { BaseComponent } from '@shared/components/base.component';
import { PopupConfirmComponent } from '@shared/components/popup-confirm/popup-confirm.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { ProgressbarComponent } from '@shared/components/progress-bar/progressbar.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-gemeindedaten',
    templateUrl: './gemeinde-daten.component.html',
    styleUrls: ['./gemeinde-daten.component.scss']
})
@SetClassRight('CtlGemeindeDaten')
export class GemeindeDatenComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {

    @ViewChild('expand') expand: any;
    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('uploader') uploader: DxFileUploaderComponent;
    @ViewChild('popupModel') popupModel: PopupConfirmComponent;
    @ViewChild('gemeindeDatenProgressBar') gemeindeDatenProgressBar: ProgressbarComponent;
    @ViewChild('gemeindeDatenGrid') gemeindeDatenGrid: GemeindeDatenGridComponent;
    @ViewChild('gemeindeDatenUpload') gemeindeDatenUpload: GemeindeDatenUploadComponent;
    @ViewChild('gemeindeDatenDetail') gemeindeDatenDetail: GemeindeDatenDetailComponent;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;

    dsGemeindeDatens: GemeindeDaten[];
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    isReadOnly = true;
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [
        {
            text: this.translateService.instant('GemeindeDaten.GemeindeDatenJetztAktualisieren'),
            name: GemeindeDatenConstant.ButtonGemeindeDatenJetztAktualisieren,
            icon: 'fa fa-refresh'
        }
    ];
    private errorCodes = [AppEnums.StatusCode.BAD_REQUEST, AppEnums.StatusCode.LIMIT_FILE_SIZE, AppEnums.StatusCode.XML_FORMAT, AppEnums.StatusCode.STATUS_CODE_421, AppEnums.StatusCode.STATUS_CODE_500];

    private subscriptions: Subscription[] = [];

    constructor(injector: Injector, public gemeindeDatensSandbox: GemeindeDatenSandbox, public utilService: UtilService,
        public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    // #region component life cycle functions
    ngOnInit() {
        this.registerEvents();
        this.gemeindeDatenProgressBar.showProgressBar();
        this.popupModel.initPopUpModel();
        this.initFunction();
        this.getLocalStorage();
    }

    ngAfterViewInit() {
        this.gemeindeDatenGrid.getFilterColumns();
    }

    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.gemeindeDatensSandbox.reset();
        this.unregisterEvents();
    }
    // #endregion

    // #region component CRUD functions
    toolBarOnItemClickTopGrd(event) {
        switch (event) {
            case CommonConstant.ButtonExportExcel: {
                this.gemeindeDatenGrid.exportExcel();
                break;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gemeindeDatenGrid.showColumnChooser();
                break;
            }
            case GemeindeDatenConstant.ButtonGemeindeDatenJetztAktualisieren: {
                this.popupModel.hidePopupModel();
                this.gemeindeDatenProgressBar.showProgressBar();
                this.gemeindeDatensSandbox.syncData();
                break;
            }
            default:
                break;
        }
        this.gemeindeDatenGrid.updateGridSetting(event);
        this.gemeindeDatenGrid.focus();
        return;
    }

    onSelectData(data: GemeindeDaten) {
        if (data) {
            this.gemeindeDatenDetail.setDataGemeindeDaten(data);
        }
    }

    onHiding() {
        const container = document.getElementById('fileuploader-container');
        if (!isNullOrUndefined(container)) {
            const element: HTMLElement = container.querySelector('.dx-fileuploader-button') as HTMLElement;
            element.click();
        }
    }

    onUploadSuccess(isUploadSuccess: boolean) {
        if (isUploadSuccess) {
            this.gemeindeDatensSandbox.getGemeindeDaten();
        }
    }

    onShowProgressBar(isShowProgressBar: boolean) {
        if (isShowProgressBar) {
            this.gemeindeDatenProgressBar.showProgressBar();
        } else {
            this.gemeindeDatenProgressBar.hideProgressBar();
        }
    }
    // #endregion

    // #region common functions
    private getLocalStorage() {
        this.userID = UtilityHelper.getUserIdFromLocalStorage();
        this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
        this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
        this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
        this.logonName = UtilityHelper.getUserFromLocalStorage();
    }

    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
            // TODO: print PDF
        }
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
        this.subscriptions.push(this.gemeindeDatensSandbox.GemeindeDatensData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport) && dataExport.length > 0) {
                this.dsGemeindeDatens = dataExport;
                this.gemeindeDatenGrid.setSelectedKeys(dataExport[0].baGemeindeID);
                this.gemeindeDatenDetail.setDataGemeindeDaten(dataExport[0]);
                setTimeout(() => this.gemeindeDatenProgressBar.hideProgressBar(), CommonConstant.SetTimeOut1000);
            }
        }));

        this.subscriptions.push(this.gemeindeDatensSandbox.GemeindeDatensSyncData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                if (this.errorCodes.includes(response.status)) {
                    this.gemeindeDatenProgressBar.hideProgressBar();
                    this.popupModel.showPopupModel(this.translateService.instant('GemeindeDaten.Message.Information'), JSON.parse(response._body).message, () => { this.onHiding(); });
                } else if (!response.isSuccess) {
                    this.gemeindeDatenProgressBar.hideProgressBar();
                    this.popupModel.showPopupModel(this.translateService.instant('GemeindeDaten.Message.Information'), response.errorMessage, () => { this.onHiding(); });
                } else {
                    this.gemeindeDatenProgressBar.showProgressBar();
                    this.gemeindeDatensSandbox.getGemeindeDaten();
                }
            }
        }));
    }

    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private initFunction() {
        this.gemeindeDatensSandbox.getGemeindeDaten();
    }
    // #endregion

}
