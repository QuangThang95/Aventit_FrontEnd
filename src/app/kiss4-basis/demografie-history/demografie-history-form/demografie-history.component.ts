import { CommonConstant } from './../../../../shared/common/constant.common';
import { Component, Injector, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { DemografieSandbox } from '../demografie-history.sandbox';
import { xUserHistory, Personalien, Wohnsitz, Aufenthaltsort } from '../models';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CustomizeExcelCell } from '@shared/utilites';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { TranslateService } from '@ngx-translate/core';
import { getXuserSessionStorage } from '@shared/utilites';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { getConditionListBtn } from '@shared/utilites';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
@Component({
    selector: 'kiss-demografie-history-detail',
    templateUrl: './demografie-history.component.html',
    styleUrls: ['./demografie-history.component.scss'],
})

export class DemografieHistoryComponent extends BaseComponent implements OnInit {
    @ViewChild('gridDemografie') gridDemografie: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('textmarken') textmarkenForm: DxFormComponent;
    @ViewChild('gridOption') gridOption: any;
    @ViewChild('printer') printer: PrinterComponent;
    @Input() isPopupVisible = false;
    @Output() emitCloseHistory = new EventEmitter<any>();
    AdditionalButtons = [...CommonConstant.AdditionalButtons];
    listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    currentLanguage: string;
    currentUserId: number;
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    gridFunctionKey = 'gridSettingc012';
    autoWidth = true;
    popupHtml: any;
    showPrintPopup = false;
    filter: any;
    toolbarDetailToggle = {
        isVisiblePrint: false,
        isVisibleExcel: false,
        isVisibleChooserColumn: false
    };
    baPersonID: number;
    verID: any;
    xUserHistory: xUserHistory[];
    personalien: Personalien;
    wohnsitz: Wohnsitz;
    aufenthaltsort: Aufenthaltsort;
    data: any;
    optionNameExport = 'export.fileName';
    pageTitle: string;
    forcusGrid: boolean;
    selectedKeys = [];
    inCHSeitGeburts = false;
    fiktivs = false;
    testPersons = false;
    zuzugGdeSeitGeburt = false;
    zuzugKtSeitGeburt = false;
    private subscriptions: Subscription[] = [];
    languageCode: any;
    languageCodeXuser: any;
    customizeBtn = [];
    popUpModel: PopUpModel;
    poToolKey = {
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
    popupType: string;
    constructor(
        injector: Injector,
        public demografieSandbox: DemografieSandbox,
        private route: ActivatedRoute,
        private router: Router,
        public translateService: TranslateService,
        public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    ) { super(injector); }

    ngOnInit() {
        this.initPopUpModel();
        this.pageTitle = this.translateService.instant('DemografieHistory.Header.Title');
        this.setTitle(this.titlePage);
        this.loadGridSetting();
        this.registerEvents();
    }
    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    private registerEvents(): void {
        // Register subscribe for selected node from sidebar
        this.subscriptions.push(
            this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
                if (!isNullOrUndefined(selectedNode)) {
                    this.baPersonID = selectedNode.baPersonID;
                    this.loadXUserHistory(this.baPersonID);
                }
            })
        );
        this.subscriptions.push(
            this.demografieSandbox.xUserHistoryData$.subscribe(data => {
                this.xUserHistory = data;
                if (!isNullOrUndefined(this.xUserHistory) && this.xUserHistory.length) {
                    this.selectedKeys = [this.xUserHistory[0]];
                    this.data = {
                        baPersonID: this.selectedKeys[0].baPersonID,
                        verID: this.selectedKeys[0].verID
                    };
                    this.CheckDataCheckBox(this.data);
                }
            }));

        this.subscriptions.push(this.demografieSandbox.personalienData$.subscribe(dataPersonalien => {
            if (!isNullOrUndefined(dataPersonalien)) {
                this.personalien = dataPersonalien[0];
            }
        }));
        this.subscriptions.push(this.demografieSandbox.wohnsitzData$.subscribe(dataWohnsitz => {
            if (!isNullOrUndefined(dataWohnsitz)) {
                this.wohnsitz = dataWohnsitz[0];
            }
        }));
        this.subscriptions.push(this.demografieSandbox.aufenthaltsort$.subscribe(dataAufenthaltsort => {
            if (!isNullOrUndefined(dataAufenthaltsort)) {
                this.aufenthaltsort = dataAufenthaltsort[0];
            }
        }));

        this.subscriptions.push(this.demografieSandbox.xUserHistoryDataFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
        this.subscriptions.push(this.demografieSandbox.personalienDataFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
        this.subscriptions.push(this.demografieSandbox.wohnsitzDataFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
        this.subscriptions.push(this.demografieSandbox.aufenthaltsortFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));

    }
    checkResponseData(data) {
        const results = JSON.parse(data._body);
        this.popupType = this.poToolKey.information;
        this.hanleActionUpdated(results.message);
    }
    // Load Grid History
    loadXUserHistory(baPersonID) {
        this.demografieSandbox.GetXUserHistory(baPersonID);
    }
    // Load Detail Personalien
    loadDetail(query) {
        if (query.baPersonID !== undefined && query.verID !== undefined) {
            this.demografieSandbox.GetPersonalien(query);
            this.demografieSandbox.GetWohnsitz(query);
            this.demografieSandbox.GetAufenthaltsort(query);
        }
    }
    // focus in grid
    onFocusGridBasisTextmarken(e) {
        this.forcusGrid = true;
    }
    // out focus in grid
    outFocusGridBasisTextmarken(e) {
        this.forcusGrid = false;
    }
    onClickRowGrid(event) {
        this.data = {
            baPersonID: event.data.baPersonID,
            verID: event.data.verID
        };
        this.CheckDataCheckBox(this.data);
    }
    CheckDataCheckBox(data) {
        this.loadDetail(data);
        setTimeout(() => {
            if (this.personalien) {
                this.inCHSeitGeburts = this.personalien.inCHSeitGeburt;
                this.fiktivs = this.personalien.fiktiv;
                this.testPersons = this.personalien.testperson;
                this.zuzugGdeSeitGeburt = this.personalien.zuzugGdeSeitGeburt;
                this.zuzugKtSeitGeburt = this.personalien.zuzugKtSeitGeburt;
            }
        }, CommonConstant.SetTimeOut);
    }
    /**
 * Create funtion for Click on menu item
 */
    toolBarOnItemClickTopGrd(e) {
        switch (e) {
            case CommonConstant.ButtonExportExcel: {
                this.gridDemografie.instance.option({
                    export: {
                      fileName: 'History',
                      excelFilterEnabled: true,
                      customizeExcelCell: CustomizeExcelCell,
                    }
                  });
                  this.gridDemografie.instance.exportToExcel(false);
                break;
            }
            case CommonConstant.ButtonPrintPdf: {
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridDemografie.instance.showColumnChooser();
                break;
            }
            case CommonConstant.ButtonGridSetting: {
                this.gridFunction.showPopup(this.gridFunction.model);
                break;
            }
            case CommonConstant.ButtonClosePopup: {
                this.closeHistory();
            }
        }
        this.gridFunctionModel[e] = !this.gridFunctionModel[e];
        if (this.gridFunctionModel.autoSaveSetting) {
            localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
        }
    }
    closeHistory() {
        this.gridDemografie.instance.hideColumnChooser();
        this.isPopupVisible = false;
        this.emitCloseHistory.emit(false);
    }
    toggleDetailTootBar(key) {
        switch (key) {
            case 'toolbar-print':
                this.toolbarDetailToggle.isVisiblePrint = !this.toolbarDetailToggle.isVisiblePrint;
                return;
            case 'toolbar-excel':
                this.toolbarDetailToggle.isVisibleExcel = !this.toolbarDetailToggle.isVisibleExcel;
                return;
            case 'toolbar-chooser-colum':
                this.toolbarDetailToggle.isVisibleChooserColumn = !this.toolbarDetailToggle.isVisibleChooserColumn;
                return;
            default:
                return;
        }
    }
    printPdf() {
        this.printer.setData(this.xUserHistory, false, [
            {
                caption: this.pageTitle = this.translateService.instant('DemografieHistory.Grid.Datum'),
                dataField: 'datum',
                type: 'date'
            },
            {
                caption: this.pageTitle = this.translateService.instant('DemografieHistory.Grid.Zeit'),
                dataField: 'zeit',
            },
            {
                caption: this.pageTitle = this.translateService.instant('DemografieHistory.Grid.Benutzer'),
                dataField: 'benutzer'
            }
        ]);
    }
    hideHeader(option: any) {
        const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;

        if (option) {
            header[0].style.display = 'none';
        } else {
            header[0].style.display = 'block';
        }
    }
    onChangeGridSetting() {
        this.gridFunctionModel = this.gridFunction.model;
    }
    loadGridSetting() {
        let gridSetting: any = localStorage.getItem(this.gridFunctionKey);
        if (gridSetting) {
            this.gridFunctionModel = new GridSettingModel();
            gridSetting = JSON.parse(gridSetting);
            this.gridFunctionModel = Object.assign(this.gridFunctionModel, gridSetting);
        } else {
            this.gridFunctionModel = new GridSettingModel();
            localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
        }
    }
    getXUser() {
        const Xuser = getXuserSessionStorage();
        if (Xuser) {
            this.languageCode = Xuser[0].languageCode;
            this.languageCodeXuser = this.languageCode;
        } else {
            this.languageCode = 1;
        }
        return Xuser;
    }

    onRemoverColumn(e) {
        if (this.gridDemografie.instance.getVisibleColumns().length === 1) {
            return false;
        }
        this.gridDemografie.instance.columnOption(e, 'visible', false);
        setTimeout(() => {
            this.gridDemografie.instance.refresh();
            this.gridDemografie.instance.repaint();
        }, CommonConstant.SetTimeOut);
    }
    onContextMenuPreparing(args: any) {
        let colCount = this.gridDemografie.instance.getVisibleColumns().length;
        for (let i = 0; i < this.gridDemografie.instance.columnCount(); i++) {
            if (this.gridDemografie.instance.columnOption(i, 'groupIndex') > -1) {
                colCount--;
            }
        }
        if (args.target === 'header') {
            if (args.items && args.items.length > 1) {
                args.items.push(
                    {
                        disabled: false,
                        icon: '',
                        onItemClick: colCount === 1 ? undefined : this.onClickHideCol.bind(this, args),
                        text: this.translateService.instant('DemografieHistory.Grid.HideColumn'),
                        value: 'none'
                    });
                if (colCount === 1) {
                    for (let index = 0; index < args.items.length; index++) {
                        const element = args.items[index];
                        if (element.value === 'group') {
                            element.onItemClick = () => {
                                return true;
                            };
                            break;
                        }
                    }
                }
            }
        }
        if (args.target === 'content') {
            args.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('DemografieHistory.Grid.ExpandAllGroups') });
            args.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('DemografieHistory.Grid.ReduceAllGroups') });
        }
    }
    private expandCloumnGrouping() {
        this.gridOption.autoExpandAll = true;
    }
    private unExpandCloumnGrouping() {
        this.gridOption.autoExpandAll = false;
    }
    getSizeQualifier(width) {
        if (width < 1300) {
            return 'xs';
        }
        return 'lg';
    }


    // Click tool bar of grid
    toolBarOnItemClickGrid(e) {
        switch (e) {
            case 'exportExcel': {
                this.gridDemografie.instance.exportToExcel(false);
                break;
            }
            case 'printPdf':
            case 'gridprint': {
                return;
            }
            case 'chooserColumn': {
                this.gridDemografie.instance.showColumnChooser();
                return;
            }
            case 'gridSetting': {
                this.gridFunction.showPopup(this.gridFunctionModel);
                return;
            }
        }
        this.gridFunctionModel[e] = !this.gridFunctionModel[e];
        if (this.gridFunctionModel.autoSaveSetting) {
            localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
        }
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
            }
        );
    }
    hanleActionUpdated(messages) {
        this.initPopUpModel();
        if (this.popupType === this.poToolKey.information) {
            this.popUpModel.title = this.translateService.instant('DemografieHistory.Information');
            this.popUpModel.message = messages;
        }
    }

    onClickHideCol(args) {
        this.onRemoverColumn(args.column.dataField);
    }
}
