import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostleitzahlenAktualisieren } from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { PostleitzahlenAktualisierenSandbox } from '../postleitzahlen-aktualisieren.sandbox';

@Component({
    selector: 'kiss-postleitzahlen-aktualisieren',
    templateUrl: './postleitzahlen-aktualisieren-list.component.html',
    styleUrls: ['./postleitzahlen-aktualisieren-list.component.scss']
})
@SetClassRight('CtlGemeindeDaten')
export class PostleitzahlenAktualisierenListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {

    @ViewChild('gridPostleitzahlen') gridPostleitzahlen: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expand') expand: any;
    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('uploader') uploader: DxFileUploaderComponent;

    dataExportAllGrid: PostleitzahlenAktualisieren[];
    dataPostleitzahlen = new PostleitzahlenAktualisieren();
    filterAvs: any;
    selectedKeys = [];
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
    visibleProgressBar = true;
    rowSelectedIndex: number;
    isReadOnly = true;
    filterColumns: Array<any> = [];
    gridFunctionKey = this.translateService.instant('GemeindeDaten.Message.gridSetting');
    requestHeader = UtilityHelper.getRequestHeaderFromLocalStorage();
    uploadUrl = UtilityHelper.getUploadUrl('api/Basis/UploadBaPlz');
    isUpload = true;
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [
        {
            text: this.translateService.instant('PostleitzahlenAktualisieren.PlzDatenJetztAktualisieren'),
            name: CommonConstant.ButtonPlzDatenJetztAktualisieren,
            icon: 'refresh',
            id : 'c005-postleitzahlen-aktualisieren'
        }
    ];
    columnIndex: number;
    popUpModel: PopUpModel;
    private errorCodes = [AppEnums.StatusCode.BAD_REQUEST, AppEnums.StatusCode.STATUS_CODE_409, AppEnums.StatusCode.LIMIT_FILE_SIZE, AppEnums.StatusCode.XML_FORMAT, AppEnums.StatusCode.STATUS_CODE_421];
    maxFileSize = CommonConstant.MAX_FILE_SIZE;

    private subscriptions: Subscription[] = [];

    constructor(injector: Injector, public postleitzahlenAktualisierenSandbox: PostleitzahlenAktualisierenSandbox, public utilService: UtilService,
        public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    ngOnInit() {
        this.onProgress();
        this.initFunction();
        this.getLocalStorage();
        this.registerEvents(null);
        this.loadGridSetting();
        this.initPopUpModel();
    }

    initFunction() {
        this.postleitzahlenAktualisierenSandbox.getPostleitzahlenAktualisieren();
    }

    getLocalStorage() {
        this.userID = UtilityHelper.getUserIdFromLocalStorage();
        this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
        this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
        this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
        this.logonName = UtilityHelper.getUserFromLocalStorage();
    }

    private registerEvents(str?: any): void {
        this.subscriptions.push(this.postleitzahlenAktualisierenSandbox.PostleitzahlenAktualisierensData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport) && dataExport.length > 0) {
                this.dataExportAllGrid = dataExport;
                this.selectedKeys = [dataExport[0].baPLZID];
                this.dataPostleitzahlen = dataExport[0];
                setTimeout(() => this.visibleProgressBar = false, CommonConstant.SetTimeOut1000);
            }
        }));

        this.subscriptions.push(this.postleitzahlenAktualisierenSandbox.PostleitzahlenAktualisierensSyncData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                if (this.errorCodes.includes(response.status)) {
                    this.visibleProgressBar = false;
                    this.isUpload = true;
                    this.popUpModel.title = this.translateService.instant('PostleitzahlenAktualisieren.Message.Information');
                    this.popUpModel.message = JSON.parse(response._body).message;
                    this.popUpModel.funcHiding = () => {
                        this.onHiding();
                    };
                    this.popUpModel.isVisible = true;
                } else {
                    this.visibleProgressBar = true;
                    this.onProgress();
                    this.postleitzahlenAktualisierenSandbox.getPostleitzahlenAktualisieren();
                }
            }
        }));

        // TODO: Subscribe import data function
    }

    loadGridSetting() {
        const gridSetting = JSON.parse(localStorage.getItem(this.gridFunctionKey));
        if (gridSetting) {
            this.loadSettingFromLocalstorage(gridSetting);
        } else {
            this.setGridKeytoLocalstorge();
        }
    }

    loadSettingFromLocalstorage(gridSetting) {
        this.gridFunction.model = new GridSettingModel();
        this.gridFunction.model = Object.assign(this.gridFunction.model, gridSetting);
    }

    setGridKeytoLocalstorge() {
        this.gridFunction.model = new GridSettingModel();
        localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunction.model));
    }

    initPopUpModel() {
        this.popUpModel = new PopUpModel(
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
                funcHiding: null
            }
        );
    }

    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.unregisterEvents();
        this.postleitzahlenAktualisierenSandbox.reset();
    }

    /**
     * Create function to un-register all subscribes
     */
    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Create funtion for Click on grid's row
     */
    getDetailToBottom(e) {
        this.dataPostleitzahlen = e.data;
    }

    /**
     * Create funtion for Click on menu item
     */
    toolBarOnItemClickTopGrd(e) {
        switch (e) {
            case CommonConstant.ButtonExportExcel: {
                this.gridPostleitzahlen.instance.exportToExcel(false);
                document.getElementById('excelExportId').blur();
                return;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                document.getElementById('gridDruckenId').blur();
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridPostleitzahlen.instance.showColumnChooser();
                document.getElementById('spaltenauswahlId').blur();
                return;
            }
            case CommonConstant.ButtonPlzDatenJetztAktualisieren: {
                this.onClickSync();
                document.getElementById('c005-postleitzahlen-aktualisieren').blur();
                return;
            }
            default:
                break;
        }
        this.gridFunction.model[e] = !this.gridFunction.model[e];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
        }
    }

    /**
    * Create function for Click on Synchronize Button
    */
    onClickSync() {
        this.popUpModel.isVisible = false;
        this.visibleProgressBar = true;
        this.onProgress();
        this.postleitzahlenAktualisierenSandbox.syncData();
    }

    /**
    * Shortcuts key
    */
    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
            // TODO: print PDF
        }
    }

    /**
    * Create function for Right Click on Grid's Column Header
    */
    rightClickColumnHeader(index: number) {
        const elements = document.getElementsByClassName('dx-datagrid-action');
        const element = elements.item(index);
        if (document.createEvent) {
            const events = new MouseEvent('contextmenu', {
                bubbles: true,
                clientX: this.getOffset(element).left,
                clientY: this.getOffset(element).top
            });
            element.dispatchEvent(events);
            return;
        }
    }

    /**
    * Create function for Click on Grid's Column Filter
    */
    clickColumnFilter(index: number) {
        const grid = document.getElementById(CommonConstant.GridPostleitzahlen);
        const elements = grid.getElementsByClassName('dx-header-filter');
        const element: HTMLElement = elements.item(index) as HTMLElement;
        element.click();
    }

    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + el.offsetWidth / 2 + window.scrollX,
            top: rect.top + el.offsetHeight / 2 + window.scrollY
        };
    }

    /**
     * When upload file error
     */
    onUploadError(e) {
        this.uploader.instance.option('value', []);
        this.visibleProgressBar = false;
        this.isUpload = false;
        if (e.request.response !== '') {
            this.popUpModel.message = JSON.parse(e.request.response).message;
        } else {
            this.popUpModel.message = e.request.statusText;
        }
        this.popUpModel.isVisible = true;
    }

    /**
     * When upload file success
     */
    onUploaded(e) {
        this.uploader.instance.option('value', []);
        if (e.request.response !== '') {
            const response = JSON.parse(e.request.response);
            if (!response.isSuccess) {
                this.visibleProgressBar = false;
                this.isUpload = false;
                this.popUpModel.message = response.errorMessage;
                this.popUpModel.isVisible = true;
            } else {
                this.visibleProgressBar = true;
                this.onProgress();
                this.postleitzahlenAktualisierenSandbox.getPostleitzahlenAktualisieren();
            }
        }
    }

    onUploadStarted(e) {
        this.visibleProgressBar = true;
        this.onProgress();
    }

    onValueChanged(e) {
        if (e.value[0] && e.value[0].size > this.maxFileSize) {
            this.isUpload = false;
            this.popUpModel.message = this.translateService.instant('PostleitzahlenAktualisieren.Message.MaxFileSizeMessage');
            this.popUpModel.isVisible = true;
        }
    }

    /**
     * When closing popover message to show file browser
     */
    onHiding() {
        const container = document.getElementById('fileuploader-container');
        if (!isNullOrUndefined(container) && this.isUpload) {
            const element: HTMLElement = container.querySelector('.dx-fileuploader-button') as HTMLElement;
            element.click();
        }
    }

    /**
     * Handle close/refresh the tab
     */
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }

    /**
     * Datagrid ready
     */
    onContentReady(e) {
        this.rowSelectedIndex = e.component.getSelectedRowKeys()[0];
    }

    onRowPrepared(e) {
        if (!isNullOrUndefined(e.data) && e.data.system) {
            e.rowElement.style.backgroundColor = '#ff0000';
        }
    }

    /**
     * Click event on datagrid's row
     */
    onRowClick(e) {
        this.dataPostleitzahlen = e.data;
        this.rowSelectedIndex = e.component.getSelectedRowKeys()[0];
    }

    /**
     * Click event on datagrid's cell
     */
    onCellClick(e) {
        this.columnIndex = e.columnIndex;
    }

    /**
     * Arrow Key
     */
    onKeyDown(e) {
        const data = e.component.getSelectedRowKeys();
        if (data.length) {
            const currentKey = data[0];
            let index = e.component.getRowIndexByKey(currentKey);
            if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
                index--;
                if (index < 0) {
                    index++;
                }
            } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
                index++;
                if (e.component.getKeyByRowIndex(index) == null) {
                    index--;
                }
            }
            e.component.selectRows([e.component.getKeyByRowIndex(index)], false);
            // row indicator
            this.rowSelectedIndex = e.component.getKeyByRowIndex(index);
            // detail object
            let dataObj = null;
            e.component.byKey(this.rowSelectedIndex).done(function (dataObject) {
                dataObj = dataObject;
            });
            this.dataPostleitzahlen = dataObj;
            // scroll
            e.component.getScrollable().scrollToElement(e.component.getRowElement(index));
        }
        e.event.stopPropagation();
    }

    /**
     * Progress bar
     */
    onProgress() {
        if (this.inProgress) {
            clearInterval(this.intervalId);
        } else {
            if (this.seconds === 0) {
                this.seconds = 10;
            }
            this.intervalId = setInterval(() => this.timer(), 100);
        }
        this.inProgress = !this.inProgress;
    }

    timer() {
        if (this.seconds === 0) {
            this.inProgress = !this.inProgress;
            clearInterval(this.intervalId);
            return;
        }
        this.seconds--;
    }

    /**
     * Functions update filter column
     * @return {Array} list of column options
    */
    getFilterColumns() {
        const columnCount = this.gridPostleitzahlen.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridPostleitzahlen.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridPostleitzahlen.instance.columnOption(i));
            }
        }
    }

    customizeExportData(columns, rows) {
        const systemCols = [];
        columns.forEach((item, index) => {
            if (index > 0) {
                if (item.dataType === 'boolean') {
                    systemCols.push(index);
                }
            }
        });
        rows.forEach(row => {
            const rowValues = row.values;
            systemCols.forEach(systemCol => {
                rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
            });
        });
    }

    ngAfterViewInit() {
        this.getFilterColumns();
    }

    onContextMenuPreparing(e) {
        this.gridFunction.menuGrouping(e, this.expand, this.gridPostleitzahlen, CommonConstant.MenuGroupingHeaderGrid);
    }

    screen(width) {
        return (width < CommonConstant.SCREEN_RESOLUTION_LARGE) ? AppEnums.ScreenResolution.SMALL : AppEnums.ScreenResolution.LARGE;
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }

}
