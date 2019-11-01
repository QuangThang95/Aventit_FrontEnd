import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
    ASVDetenerfassung,
    ModelFileBinary,
    ModelQueryUpdateASVSExport,
    ModelQueryUpdateTransaction,
    ModelXOrgUnit,
    ZuExportierendeEintrage,
    ZuExportierendeEintrageQuery,
} from '../models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AsvConstant } from '@shared/common/asv-export.common';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getConditionListBtn } from '@shared/utilites';
import { UtilService } from '@shared/utilites/utility.service';
import { DxPopupComponent, DxTextBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import * as FileSaver from 'file-saver';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { AsvexportSandbox } from '../asvexport.sandbox';
import { Subject } from 'rxjs';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { debounce } from 'lodash-es';

@Component({
    selector: 'kiss-asvexport',
    templateUrl: './asvexport-list.component.html',
    styleUrls: ['./asvexport-list.component.scss']
})
@SetClassRight('CtlAsvexport.fr')
export class AsvexportListComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {

    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild('gridAsvexportTop') gridAsvexportTop: DxDataGridComponent;
    @ViewChild('gridZuExportierendeEintrageBottom') gridAsvexportBottom: DxDataGridComponent;
    @ViewChild('gridpopup') gridpopup: DxPopupComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('gridFunctionBottom') gridFunctionBottom: GridFunctionComponent;
    @ViewChild('expandGridTop') expandGridTop: any;
    @ViewChild('expandGridBottom') expandGridBottom: any;
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
    @ViewChild('bemerkung') bemerkungViewChild: DxTextBoxComponent;

    AdditionalButtons = [...CommonConstant.AdditionalButtons];
    listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    dataExportAllGridTop: ASVDetenerfassung[];
    dataExportAllGridBottom: ZuExportierendeEintrage[];
    eintrageModel: ZuExportierendeEintrageQuery = new ZuExportierendeEintrageQuery();
    dataFileBinary: ModelFileBinary;
    filterAvs: any;
    gridClickName: string = undefined;
    selectedKeys = [];
    xOrgUnitData: ModelXOrgUnit[] = [];
    isSelectRowGridTop = false;
    selectionRow: any;
    disableSpeichernUnterBtn = true;
    txtBemerkung: string;
    txtBemerkungTmp: string;
    modelInsertASVSExport: ModelQueryUpdateTransaction = new ModelQueryUpdateTransaction();
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    modelUpdateASVSExport: ModelQueryUpdateASVSExport = new ModelQueryUpdateASVSExport();
    modelQueryUpdateTransaction: ModelQueryUpdateTransaction = new ModelQueryUpdateTransaction();
    orgUnitID: number;
    isUpdateTranSaction = false;
    languageCode: string;
    isVisibleProblem = false;
    modelExportAllGridTop: ASVDetenerfassung = new ASVDetenerfassung();
    isAddNew = false;
    eintrageModelAdd: ZuExportierendeEintrageQuery = new ZuExportierendeEintrageQuery();
    isUpdate = false;
    isCreateExport = false;
    titleBenutzerdefiniert = this.translateService.instant('Asvexport.TitleBenutzerdefiniert');
    isDisabledGridTop = false;
    toolbarControlAvstop = {
        isFilter: false,
        isSearch: false,
        isSearchPanel: false,
        isFilterBuilder: false,
    };
    toolbarControlAvsbottom = {
        isFilter: false,
        isSearch: false,
        isSearchPanel: false,
        isFilterBuilder: false,
    };
    popupConcurrency = {
        title: this.translateService.instant('Asvexport.PopupConfirm.Title'),
        visible: false,
        message: '',
        abbrechen: this.translateService.instant('Asvexport.PopupConfirm.Abbrechen'),
        datenAktualisieren: this.translateService.instant('Asvexport.PopupConfirm.Daten'),

    };
    /**
     * Initial value for all button
     */
    visibleAddNewBtn = true;
    visibleEditBtn = true;
    visibleSaveBtn = false;
    visibleSaveAsBtn = true;
    visibleExportBtn = false;
    visibleCancelBtn = false;
    disablebemerkungtb = true;
    disableExportBtn = false;
    isReadOnly = true;
    visibleGroupPanelTopGrd = false;
    visibleGroupPanelBottomGrd = false;
    gridFunctionKey = 'gridSetting';
    gridFunctionKeyBottom = 'gridSettingBottom';
    isDisabledSpeichern = false;
    concurrency: string;
    sstASVSExportTS: any[];
    isClickCloseButton = false;
    popUpModel: PopUpModel;
    isChangeData = false;
    private subscriptions: Subscription[] = [];
    toolbarButtonBottom = [];
    listBtnBottom = [this.toolbarButtonBottom, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    isFirstCol: boolean;
    keyCancel = 'cancel';
    keyCreateExport = 'createExport';
    keySpeichern = 'speichern';
    keyAddNew = 'addnew';
    isErrorClosed = false;
    messageErr = null;
    accessKeyItemFocused = 0;
    keyInput: string;
    lengthInput = AppEnums.Validation.MAX_LENGTH_INPUT_VALIDATOR;
    keyGefunden = 'gefunden';
    readonly setTimeOut: number = CommonConstant.SetTimeOut;
    messageCanDeactive: any;
    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
    selectionChangedRaised = false;
    isDaten = false;
    readonly setTimeOut300: number = CommonConstant.SetTimeOut300;
    colCount: number;
    resetDataGrid = debounce(() => {
        this.gridAsvexportTop.instance.repaint();
        this.gridAsvexportBottom.instance.repaint();
    }, 100);
    constructor(injector: Injector, public AsvexportsSandbox: AsvexportSandbox, public utilService: UtilService, public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    ngOnInit() {
        this.setTitle(AsvConstant.PAGETITLE);
        this.initFunction();
        this.getLocalStorage();
        this.initData();
        this.registerEvents(null);
        this.loadGridSetting();
        this.loadGridBottomSetting();
        this.initPopUpModel();
        for (let index = 0; index < CommonConstant.ToolbarButtons.length; index++) {
            const element = Object.assign({}, CommonConstant.ToolbarButtons[index]);
            this.toolbarButtonBottom.push(element);
        }
        this.toolbarButtonBottom[0].id = AsvConstant.SET_PRINTID;
        this.toolbarButtonBottom[1].id = AsvConstant.SET_EXPORTID;
        this.toolbarButtonBottom[2].id = AsvConstant.SET_COLUMNCHOOSER;


    }

    ngOnDestroy() {
        this.unregisterEvents();
    }
    /** 2018/09/30
     * Create function to un-register all subscribes
     */
    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private registerEvents(str?: any): void {
        // listen scroll event
        this.subscriptions.push(
            this.layoutSandbox.scrollChanged.subscribe(el => {
                this.scrollChanged(el);
            })
        );
        // Register subscribe load data for top grid
        this.subscriptions.push(this.AsvexportsSandbox.AsvexportesData$.subscribe(dataExport => {
            this.dataExportAllGridTop = dataExport;
            if (dataExport && dataExport.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(dataExport._body);
                const message = body.message.toString();
                this.handleActionPopup(this.keyGefunden, message);
                return;
            }
            if (isNullOrUndefined(dataExport) || dataExport.length <= 0) {
                return;
            }
            if (this.isUpdateTranSaction) {
                this.afterUpdatetranSaction(dataExport);
                return;
            }
            if (this.isUpdate || this.concurrency === CommonConstant.Concurrency) {
                this.afterUpdate();
                return;
            }
            this.loadDataGridTop(dataExport);
        }));

        // Register subscribe load data for bottom grid
        this.subscriptions.push(this.AsvexportsSandbox.AsvEintrageData$.subscribe(dataAsvEintrage => {
            this.dataExportAllGridBottom = dataAsvEintrage;
            if (dataAsvEintrage && dataAsvEintrage.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(dataAsvEintrage._body);
                const message = body.message.toString();
                this.handleActionPopup(this.keyGefunden, message);
                return;
            }
            if (isNullOrUndefined(this.dataExportAllGridTop) || isNullOrUndefined(this.dataExportAllGridBottom)) {
                return;
            }
            if (this.dataExportAllGridTop.length > 0 && this.dataExportAllGridBottom.length > 0) {
                this.disableExportBtn = true;
                if (this.isAddNew) {
                    this.disableExportBtn = false;
                    return;
                }
                if (this.isSelectRowGridTop) {
                    this.isSelectRowGridTop = false;
                    if (typeof (this.dataExportAllGridTop[0].datumExport) !== 'undefined') {
                        this.disableSpeichernUnterBtn = false;
                        return;
                    }
                    this.disableSpeichernUnterBtn = true;
                    return;
                }
                if (typeof (this.selectionRow.datumExport) !== 'undefined') {
                    this.disableSpeichernUnterBtn = false;
                    return;
                }
                this.disableSpeichernUnterBtn = true;
                return;
            }
            this.disableExportBtn = false;
            this.disableSpeichernUnterBtn = true;
        }));

        // Register subscribe load file binary of function Speichern unter...
        this.subscriptions.push(this.AsvexportsSandbox.FileBinaryData$.subscribe(dataFileBinary => {
            this.dataFileBinary = dataFileBinary;
            if (dataFileBinary && dataFileBinary.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(dataFileBinary._body);
                const message = body.message.toString();
                this.handleActionPopup(this.keyGefunden, message);
                return;
            }
            if (!isNullOrUndefined(this.dataFileBinary) && !isNullOrUndefined(this.dataFileBinary.fileBinary)) {
                const decode = atob(this.dataFileBinary.fileBinary.toString());
                const blob = new Blob([decode], {
                    type: 'application/xml'
                });
                FileSaver.saveAs(blob, this.dataFileBinary.dbName + '_doc' + this.selectionRow.documentID + '_uid' + this.userID + '.xml');
            }
        }));

        // Register subscribe load data for select box Sektion
        this.subscriptions.push(this.AsvexportsSandbox.XOrgUnitsData$.subscribe(xOrgUnit => {
            if (xOrgUnit && xOrgUnit.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(xOrgUnit._body);
                const message = body.message.toString();
                this.handleActionPopup(this.keyGefunden, message);
                return;
            }
            if (isNullOrUndefined(xOrgUnit) || xOrgUnit.length < 0) {
                return;
            }
            xOrgUnit.forEach(item => {
                this.xOrgUnitData.push(item);
            });
        }));

        // Register subscribe insert data for grid top

        this.subscriptions.push(this.AsvexportsSandbox.InsertSstASVSExportData$.subscribe(SstASVSExportData => {
            if (SstASVSExportData) {
                this.AsvexportsSandbox.getAsvexport();
            }
        }));

        // Register subscribe update data for grid top
        this.subscriptions.push(this.AsvexportsSandbox.UpdateSstASVSExportData$.subscribe(UpdateSstASVSExportData => {
            if (isNullOrUndefined(UpdateSstASVSExportData)) {
                return;
            }

            if (UpdateSstASVSExportData.status && UpdateSstASVSExportData.status === AppEnums.StatusCode.STATUS_CODE_409) {
                const body = JSON.parse(UpdateSstASVSExportData._body);
                if (body.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
                    const message = body.message.toString();
                    message.replace('\r\n', '<br>');
                    this.showDiaglogConcurrency(message);
                }
                return;
            }

            if (UpdateSstASVSExportData && UpdateSstASVSExportData.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(UpdateSstASVSExportData._body);
                const message = body.message.toString();
                this.handleActionPopup(this.keyGefunden, message);
                return;
            }

            if (!isNullOrUndefined(UpdateSstASVSExportData[0]) && !isNullOrUndefined(UpdateSstASVSExportData[0].isSuccess)) {
                this.txtBemerkungTmp = this.txtBemerkung;
                this.AsvexportsSandbox.getAsvexport();
                this.modeView();
            }

        }));

        // Register subscribe update transaction
        this.subscriptions.push(this.AsvexportsSandbox.UpdateSstASVSExportTransactionData$.subscribe(UpdateSstASVSTransactionData => {
            if (!isNullOrUndefined(UpdateSstASVSTransactionData)) {
                if (!isNullOrUndefined(UpdateSstASVSTransactionData.isSuccess)) {
                    this.txtBemerkungTmp = this.txtBemerkung;
                    this.isUpdateTranSaction = true;
                    this.isCreateExport = false;
                    this.AsvexportsSandbox.getAsvexport();
                    this.modeView();
                } else {
                    const body = JSON.parse(UpdateSstASVSTransactionData._body);
                    const message = body.message.toString();
                    this.handleActionPopup(this.keyGefunden, message);
                }
            }
        }));
    }

    initData() {
        this.eintrageModel.orgUnitID = null;
        this.eintrageModel.isFindeDieZu = false;
        const modelGetDataCombobox = new ModelXOrgUnit();
        modelGetDataCombobox.text = '';
        this.xOrgUnitData.push(modelGetDataCombobox);
    }

    initFunction() {
        // Get data for grid top
        this.AsvexportsSandbox.getAsvexport();
        // Get data for select box Sektion
        this.AsvexportsSandbox.getXOrgUnitsData();
    }

    initPopUpModel() {
        this.popUpModel = new PopUpModel(
            {
                title: '',
                isVisibleTitle: true,
                isVisible: false,
                message: '',
                textYes: '',
                isVisibleYes: true,
                textNo: '',
                isVisibleNo: true,
                funcYes: null,
                funcNo: null,
            }
        );
    }

    getDetailGridBottom($event) {
        this.selectionRow = $event.data;
        this.txtBemerkung = $event.data.bemerkung;
        this.txtBemerkungTmp = $event.data.bemerkung;
        this.eintrageModel.sstASVSExportID = $event.data.sstASVSExportID;
        this.sstASVSExportTS = [];
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
    }

    getLocalStorage() {
        this.userID = localStorage.getItem('user:userId');
        this.firstName = localStorage.getItem('user:firstName');
        this.lastName = localStorage.getItem('user:lastName');
        this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    }
    /**
     * Create funtion for click on menu item
     */
    toolBarOnItemClickTopGrd($event) {
        switch ($event) {
            case 'exportExcel': {
                this.gridAsvexportTop.instance.exportToExcel(false);
                document.getElementById('excelExportId').blur();
                return;
            }
            case 'chooserColumn': {
                this.gridAsvexportTop.instance.showColumnChooser();
                document.getElementById('spaltenauswahlId').blur();
                return;
            }
            case 'gridSetting': {
                this.gridFunction.showPopup(this.gridFunction.model);
                return;
            }
            default:
                break;
        }
        this.gridFunction.model[$event] = !this.gridFunction.model[
            $event
        ];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
        }
    }
    toolBarOnItemClickBottomGrd($event) {
        switch ($event) {
            case 'exportExcel': {
                this.gridAsvexportBottom.instance.exportToExcel(false);
                document.getElementById('excelExportBottomId').blur();
                return;
            }
            case 'chooserColumn': {
                this.gridAsvexportBottom.instance.showColumnChooser();
                document.getElementById('spaltenauswahlBottomId').blur();
                return;
            }
            case 'gridSettingBottom': {
                this.gridFunctionBottom.showPopup(this.gridFunctionBottom.model);
                return;
            }
            default:
                break;
        }
        this.gridFunctionBottom.model[$event] = !this.gridFunctionBottom.model[
            $event
        ];
        if (this.gridFunctionBottom.model.autoSaveSetting) {
            this.gridFunctionBottom.updateSetting(this.gridFunctionBottom.model);
        }
    }
    /** 2018/09/28: TuanHA
     * Create function for Click on Edit button
     */
    onClickEditBtnGrdTop($event) {
        this.focusTextBox();
        this.modeEdit();
    }
    /** 2018/09/28: TuanHA
    * Create function for Click on Cancel button
    */
    onClickCancelBtnGrdTop() {
        if (this.isAddNew && (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport)) {
            this.handleActionPopup(this.keyAddNew, '');
            return;
        }

        if (this.concurrency === CommonConstant.Concurrency) {
            this.concurrency = '';
            this.txtBemerkung = this.txtBemerkungTmp;
            this.modeView();
            this.AsvexportsSandbox.getAsvexport();
            return;
        }

        if (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport) {
            this.handleActionPopup(this.keyCancel, '');
            return;
        }
        this.modeView();
    }

    modeView() {
        this.visibleAddNewBtn = true;
        this.visibleEditBtn = true;
        this.visibleSaveBtn = false;
        this.visibleSaveAsBtn = true;
        this.visibleExportBtn = false;
        this.visibleCancelBtn = false;
        this.disablebemerkungtb = true;
        this.isReadOnly = true;
        this.isVisibleProblem = false;
        this.isDisabledGridTop = false;
        this.isDisabledSpeichern = false;
        this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
        this.listBtnBottom = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
        this.isChangeData = false;
        this.isCreateExport = false;
        this.orgUnitID = null;
        this.isErrorClosed = false;
        if (this.isAddNew) {
            this.isAddNew = false;
            this.AsvexportsSandbox.getAsvexport();
        }
        if (this.concurrency === CommonConstant.Concurrency) {
            this.AsvexportsSandbox.getAsvexport();
        }
    }

    modeEdit() {
        this.visibleAddNewBtn = false;
        this.visibleEditBtn = false;
        this.visibleSaveBtn = true;
        this.visibleSaveAsBtn = false;
        this.visibleExportBtn = true;
        this.visibleCancelBtn = true;
        this.disablebemerkungtb = false;
        this.isReadOnly = false;
        if (!this.isAddNew) {
            this.isDisabledGridTop = true;
        }
        this.listBtn = [];
    }
    showDiaglogConfirm(key) {
        this.popUpModel.isVisible = true;
        switch (key) {
            case this.keyCancel:
                this.popUpModel.textYes = this.translateService.instant('Asvexport.PopupConfirm.Yes');
                this.popUpModel.textNo = this.translateService.instant('Asvexport.PopupConfirm.No');
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.Title');
                this.popUpModel.message = this.translateService.instant('Asvexport.PopupConfirm.Message');
                break;
            case this.keyCreateExport:
                this.popUpModel.isVisibleNo = false;
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.message = this.translateService.instant('Asvexport.MessageError.ValidateExport');
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.TitleInformation');
                break;
            case this.keySpeichern:
                this.popUpModel.isVisibleNo = false;
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.message = this.translateService.instant('Asvexport.MessageError.ValidateSpeichern');
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.TitleInformation');
                break;
            case this.keyGefunden:
                this.popUpModel.isVisibleNo = false;
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.TitleInformation');
                break;
            case 'NavigatorPopup':
                this.popUpModel.textYes = this.translateService.instant('Asvexport.NavigatorPopupConfirm.Yes');
                this.popUpModel.textNo = this.translateService.instant('Asvexport.NavigatorPopupConfirm.No');
                this.popUpModel.title = this.translateService.instant('Asvexport.NavigatorPopupConfirm.Title');
                break;
            case this.keyAddNew:
                this.popUpModel.textYes = this.translateService.instant('Asvexport.PopupConfirm.Yes');
                this.popUpModel.textNo = this.translateService.instant('Asvexport.PopupConfirm.No');
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.Title');
                this.popUpModel.message = this.translateService.instant('Asvexport.PopupConfirm.MessageAddNew');
                break;
            default:
                break;
        }

    }
    handleActionPopup(key, message) {
        this.initPopUpModel();
        switch (key) {
            case this.keyCancel:
                this.popUpModel.funcYes = () => {
                    this.txtBemerkung = this.txtBemerkungTmp;
                    this.modeView();
                    this.popUpModel.isVisible = false;
                };
                this.popUpModel.funcNo = () => {
                    this.popUpModel.isVisible = false;
                };
                this.showDiaglogConfirm(this.keyCancel);
                break;
            case this.keyCreateExport:
                this.showDiaglogConfirm(this.keyCreateExport);
                break;
            case this.keySpeichern:
                this.showDiaglogConfirm(this.keySpeichern);
                break;
            case this.keyGefunden:
                this.popUpModel.message = message;
                this.showDiaglogConfirm(this.keyGefunden);
                break;
            case 'onNavigate':
                this.popUpModel.message = message;
                this.popUpModel.funcYes = () => {
                    this.navigateAwaySelection$.next(true);
                    this.popUpModel.isVisible = false;
                };
                this.popUpModel.funcNo = () => {
                    this.navigateAwaySelection$.next(false);
                    this.popUpModel.isVisible = false;
                };
                this.showDiaglogConfirm('NavigatorPopup');
                break;
            case this.keyAddNew:
                this.popUpModel.funcYes = () => {
                    this.txtBemerkung = this.txtBemerkungTmp;
                    this.modeView();
                    this.popUpModel.isVisible = false;
                };
                this.popUpModel.funcNo = () => {
                    this.popUpModel.isVisible = false;
                };
                this.showDiaglogConfirm(this.keyAddNew);
                break;
            default:
                break;
        }
    }
    // Check Showed popup
    onShownPopUp() {
        const value = document.getElementById('i025_bestatigung_ja');
        value.focus();
    }
    /**
    * Create function for Click on Add New button
    */
    onClickAddNewBtnGrdTop() {
        this.txtBemerkung = '';
        this.txtBemerkungTmp = '';
        this.modelExportAllGridTop.creator = this.lastName + ',' + this.firstName + ' (' + this.userID + ')';
        this.modelExportAllGridTop.sstASVSExportID = 0;
        if (this.dataExportAllGridTop.filter(x => x.sstASVSExportID === this.modelExportAllGridTop.sstASVSExportID).length <= 0) {
            this.dataExportAllGridTop.push(this.modelExportAllGridTop);
        }
        this.isAddNew = true;
        this.modeEdit();
        this.disableSpeichernUnterBtn = true;

        this.eintrageModelAdd.sstASVSExportID = 0;
        this.eintrageModelAdd.isFindeDieZu = true;
        this.eintrageModelAdd.orgUnitID = this.orgUnitID;
        this.AsvexportsSandbox.getEintrage(this.eintrageModelAdd);
    }

    ExportFileXml() {
        this.AsvexportsSandbox.getFileBinaryData(this.selectionRow.documentID);
    }

    // Shortcuts key
    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && !this.isDisabledSpeichern) {
            if (!this.isReadOnly) {
                event.preventDefault();
                this.txtBemerkung = this.bemerkungViewChild.text;
                setTimeout(() => {
                    this.saveDataGridTop();
                }, this.setTimeOut);
            }
        }
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
            event.preventDefault();
            if (!this.isReadOnly) {
                this.txtBemerkung = this.bemerkungViewChild.text;
                this.onClickCancelBtnGrdTop();
            }
        }

        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
            if (this.isReadOnly) {
                event.preventDefault();
                this.onClickAddNewBtnGrdTop();
            }
        }

        if (this.isAddNew) {
            if (event.keyCode === AppEnums.KeyCode.UpArrowKey) {
                this.moveFocus(false);
            } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey) {
                this.moveFocus(true);
            }
        }
    }

    // Set name grid
    onClickGrid(e: any, gridName) {
        if (this.gridClickName !== gridName) {
            this.gridClickName = gridName;
        }
    }

    saveDataGridTop() {
        if (this.validationGroup.instance.validate() && !this.validationGroup.instance.validate().isValid) {
            this.isErrorClosed = true;
            this.messageErr = this.translateService.instant('Asvexport.MessageError.Validate');
        } else {
            if (this.isAddNew) {
                if (this.isCreateExport) {
                    if (!isNullOrUndefined(this.dataExportAllGridBottom) && this.dataExportAllGridBottom.length > 0) {
                        this.getModelQueryInsert();
                        this.AsvexportsSandbox.updateSstASVSExportTransaction(this.modelInsertASVSExport);
                    } else {
                        this.isCreateExport = false;
                        this.handleActionPopup(this.keySpeichern, '');
                    }
                } else {
                    this.handleActionPopup(this.keySpeichern, '');
                }
            } else {
                if (this.selectionRow) {
                    this.getModelQueryUpdate();
                    this.isUpdate = true;
                    this.AsvexportsSandbox.updateSstASVSExport(this.modelUpdateASVSExport);
                }
            }
        }
    }

    CreateExport() {
        if (!isNullOrUndefined(this.dataExportAllGridBottom) && this.dataExportAllGridBottom.length < 1) {
            this.handleActionPopup(this.keyCreateExport, '');
        } else {
            this.isCreateExport = true;
        }
    }

    // check value combobox when change value
    selectDropdownValue(event) {
        this.isChangeData = true;
        this.orgUnitID = event.itemData.code;
    }

    getModelQueryInsert() {
        this.modelInsertASVSExport.bemerkung = this.txtBemerkung;
        this.modelInsertASVSExport.orgUnitID = this.orgUnitID;
    }

    getModelQueryUpdate() {
        this.modelUpdateASVSExport.datumExport = this.selectionRow.datumExport;
        this.modelUpdateASVSExport.bemerkung = this.txtBemerkung;
        this.modelUpdateASVSExport.documentID = this.selectionRow.documentID;
        this.modelUpdateASVSExport.sstASVSExportID = this.selectionRow.sstASVSExportID;
        if (!isNullOrUndefined(this.sstASVSExportTS) && this.sstASVSExportTS.length > 0) {
            this.modelUpdateASVSExport.sstASVSExportTS = this.sstASVSExportTS;
        } else {
            this.modelUpdateASVSExport.sstASVSExportTS = this.selectionRow.sstASVSExportTS;
        }
    }

    onContextMenuPreparing(e: any, type) {
        if (!isNullOrUndefined(e.items)) {
            let colCount = this[type].instance.getVisibleColumns().length;
            for (let i = 0; i < this[type].instance.columnCount(); i++) {
                if (this[type].instance.columnOption(i, 'groupIndex') > -1) {
                    colCount--;
                }
            }
            switch (e.target) {
                case 'header':
                    if (e.items && e.items.length > 1) {
                        if (colCount === 1) {
                            for (let index = 0; index < e.items.length; index++) {
                                const element = e.items[index];
                                if (element.value === 'group') {
                                    element.onItemClick = () => {
                                        return true;
                                    };
                                    break;
                                }
                            }
                        }
                    }
                    e.items.push({
                        disabled: false, onItemClick: colCount === 1 ? undefined : () => this.hideColumn(e.column.caption), text: this.translateService.instant('Asvexport.HideColumn'), value: 'hideCol'
                    });
                    break;
                case 'content':
                    e.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('Asvexport.ExpandCloumnGrouping') });
                    e.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('Asvexport.UnExpandCloumnGrouping') });
                    break;
                default:
                    break;
            }
        }

    }

    groupingHeaderRightClick(e) {
        switch (this.gridClickName) {
            case 'gridAsvexportTop':
                this.gridAsvexportTop.instance.columnOption(e, 'groupIndex', 0);
                break;
            case 'gridZuExportierendeEintrageBottom':
                this.gridAsvexportBottom.instance.columnOption(e, 'groupIndex', 0);
                break;
            default:
                break;
        }

    }

    unAllGroupingHeaderRightClick() {
        switch (this.gridClickName) {
            case 'gridAsvexportTop':
                this.gridAsvexportTop.instance.clearGrouping();
                break;
            case 'gridZuExportierendeEintrageBottom':
                this.gridAsvexportBottom.instance.clearGrouping();
                break;
            default:
                break;
        }
    }

    hideColumn(e) {
        switch (this.gridClickName) {
            case 'gridAsvexportTop':
                if (this.gridAsvexportTop.instance.getVisibleColumns().length === 1) {
                    return false;
                }
                this.gridAsvexportTop.instance.columnOption(e, 'visible', false);
                break;
            case 'gridZuExportierendeEintrageBottom':
                if (this.gridAsvexportBottom.instance.getVisibleColumns().length === 1) {
                    return false;
                }
                this.gridAsvexportBottom.instance.columnOption(e, 'visible', false);
                break;
            default:
                break;
        }

    }

    expandCloumnGrouping() {
        switch (this.gridClickName) {
            case 'gridAsvexportTop':
                this.expandGridTop.autoExpandAll = true;
                break;
            case 'gridZuExportierendeEintrageBottom':
                this.expandGridBottom.autoExpandAll = true;
                break;
            default:
                break;
        }
    }

    unExpandCloumnGrouping() {
        switch (this.gridClickName) {
            case 'gridAsvexportTop':
                this.expandGridTop.autoExpandAll = false;
                break;
            case 'gridZuExportierendeEintrageBottom':
                this.expandGridBottom.autoExpandAll = false;
                break;
            default:
                break;
        }
    }

    // Handle close/refresh the tab
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        this.txtBemerkung = this.bemerkungViewChild.text;
        if (!this.isReadOnly && (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport)) {
            return false;
        }
    }

    onChangeSelectBox(event) {
        this.orgUnitID = event.value;
        if (this.isAddNew) {
            this.eintrageModelAdd.orgUnitID = this.orgUnitID;
            this.AsvexportsSandbox.getEintrage(this.eintrageModelAdd);
        }
    }

    hideHeader(option: any) {
        if (option) {
            const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
            header[0].style.display = 'none';
        } else {
            const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
            header[0].style.display = 'block';
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

    loadGridSetting() {
        const gridSetting = JSON.parse(localStorage.getItem(this.gridFunctionKey));
        if (gridSetting) {
            this.loadSettingFromLocalstorage(gridSetting);
        } else {
            this.setGridKeytoLocalstorge();
        }
    }

    loadSettingBottomFromLocalstorage(gridFunctionKeyBottom) {
        this.gridFunctionBottom.model = new GridSettingModel();
        this.gridFunctionBottom.model = Object.assign(this.gridFunctionBottom.model, gridFunctionKeyBottom);
    }
    setGridKeyBottomtoLocalstorge() {
        this.gridFunctionBottom.model = new GridSettingModel();
        localStorage.setItem(this.gridFunctionKeyBottom, JSON.stringify(this.gridFunctionBottom.model));
    }

    loadGridBottomSetting() {
        const gridSettingBottom = JSON.parse(localStorage.getItem(this.gridFunctionKeyBottom));
        if (gridSettingBottom) {
            this.loadSettingBottomFromLocalstorage(gridSettingBottom);
        } else {
            this.setGridKeyBottomtoLocalstorge();
        }
    }

    scrollToElement() {
        setTimeout(() => {
            this.gridAsvexportTop.instance.focus(this.gridAsvexportTop.instance.getCellElement(this.dataExportAllGridTop.length - 1, 0));
        }, this.setTimeOut300);
    }

    popupConcurrencyAbbrechen(result) {
        this.isClickCloseButton = true;
        this.concurrency = CommonConstant.Concurrency;
        if (result === 'abbrechen') {
            this.isDisabledSpeichern = true;
        }
        if (result === 'daten') {
            this.isDaten = true;
            this.AsvexportsSandbox.getAsvexport();
            this.concurrency = '';
        }
        this.popupConcurrency.visible = false;
    }

    onHiding(e) {
        if (!this.isClickCloseButton) {
            this.concurrency = CommonConstant.Concurrency;
            this.popupConcurrencyAbbrechen('abbrechen');
        } else {
            this.isClickCloseButton = false;
        }
    }

    showDiaglogConcurrency(message: string) {
        this.popupConcurrency.visible = true;
        this.popupConcurrency.abbrechen = this.translateService.instant('Asvexport.PopupConfirm.Abbrechen');
        this.popupConcurrency.datenAktualisieren = this.translateService.instant('Asvexport.PopupConfirm.Daten');
        this.popupConcurrency.title = this.translateService.instant('Asvexport.PopupConfirm.Title');
        this.popupConcurrency.message = message;
    }
    onCloseError() {
        this.isErrorClosed = false;
    }
    // Arrow-key
    moveFocus(isNext: boolean) {
        const tagNames = ['input', 'textarea'];
        for (const tagName of tagNames) {
            const elems = document.getElementsByTagName(tagName);
            for (const el of Array.from(elems)) {
                if (isNext) {
                    if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
                        (el as HTMLElement).focus();
                        return;
                    }
                } else {
                    if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
                        (el as HTMLElement).focus();
                        return;
                    }
                }
            }
        }
    }

    onFocusIn(element, key) {
        if (this.isAddNew) {
            this.keyInput = key;
            this.accessKeyItemFocused = element.accessKey;
        }
    }

    onFocusOut() {
        this.accessKeyItemFocused = 0;
    }

    onKeyDownSelectbox(e) {
        if (this.isAddNew) {
            if (this.keyInput === 'selectbox') {
                if ((e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
                    if (!(e.component.option('opened'))) {
                        e.event.preventDefault();
                        e.component.open();
                    } else {
                        e.component.close();
                    }
                }
            }
        }
    }

    onValueChanged(e) {
        if (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid) {
            setTimeout(() => {
                this.isErrorClosed = false;
            });
        }
    }

    setValuesstASV(dataExport, lengthDataExport) {
        const data = this.dataExportAllGridTop.filter(x => x.sstASVSExportID === dataExport[lengthDataExport].sstASVSExportID)[0];
        this.sstASVSExportTS = data.sstASVSExportTS;
    }

    canDeactivate() {
        if (!this.isReadOnly && (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport)) {
            this.handleActionPopup('onNavigate', this.translateService.instant('Asvexport.NavigatorPopupConfirm.Message'));
            return this.navigateAwaySelection$;
        }
        return true;
    }

    onRowClick(e) {
        if (!this.selectionChangedRaised) {
            const dataGrid = e.component;
            const keys = dataGrid.getSelectedRowKeys();
            dataGrid.deselectRows(keys);
        }
        this.selectionChangedRaised = false;
    }

    onSelectionChanged() {
        this.selectionChangedRaised = true;
    }

    disabledGridTop() {
        if (this.isDaten) {
            this.isDaten = false;
            this.isDisabledGridTop = true;
            return;
        }
        this.isDisabledGridTop = false;
    }

    afterUpdatetranSaction(dataExport) {
        const lengthDataExport = dataExport.length - 1;
        this.setValuesstASV(dataExport, lengthDataExport);
        this.isUpdateTranSaction = false;
        this.isAddNew = false;
        this.selectedKeys = [dataExport[lengthDataExport].sstASVSExportID];
        this.eintrageModel.sstASVSExportID = dataExport[lengthDataExport].sstASVSExportID;
        this.selectionRow = dataExport[lengthDataExport];
        this.scrollToElement();
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        this.disabledGridTop();
    }

    afterUpdate() {
        this.concurrency = '';
        const data = this.dataExportAllGridTop.filter(x => x.sstASVSExportID === this.selectionRow.sstASVSExportID)[0];
        this.sstASVSExportTS = data.sstASVSExportTS;
        this.txtBemerkung = data.bemerkung;
        this.txtBemerkungTmp = data.bemerkung;
        this.isUpdate = false;
        this.selectedKeys = [this.selectionRow.sstASVSExportID];
        this.eintrageModel.sstASVSExportID = this.selectionRow.sstASVSExportID;
        const findIndex = this.dataExportAllGridTop.findIndex(x => x.sstASVSExportID === this.selectionRow.sstASVSExportID);
        setTimeout(() => {
            const scrollable = this.gridAsvexportTop.instance.getScrollable();
            if (scrollable != null) {
                scrollable.scrollToElement(this.gridAsvexportTop.instance.getRowElement(findIndex));
            }
        }, this.setTimeOut300);
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        this.disabledGridTop();
    }

    loadDataGridTop(dataExport) {
        this.selectedKeys = [dataExport[0].sstASVSExportID];
        this.eintrageModel.sstASVSExportID = dataExport[0].sstASVSExportID;
        this.isSelectRowGridTop = true;
        this.selectionRow = dataExport[0];
        this.txtBemerkung = dataExport[0].bemerkung;
        this.txtBemerkungTmp = dataExport[0].bemerkung;
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        this.disabledGridTop();
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

    onContentReady(e) {
        if (this.isAddNew) {
            this.selectedKeys = [this.modelExportAllGridTop.sstASVSExportID];
            this.gridAsvexportTop.instance.focus(this.gridAsvexportTop.instance.getCellElement(this.dataExportAllGridTop.length - 1, 0));
            setTimeout(() => {
                this.isDisabledGridTop = true;
                this.bemerkungViewChild.instance.focus();
            }, CommonConstant.SetTimeOut400);
        }
    }
    scrollChanged(e) {
        this.resetDataGrid();
    }

    focusTextBox() {
        setTimeout(() => {
            this.bemerkungViewChild.instance.focus();
        }, CommonConstant.SetTimeOut);
    }
}
  /********************* The End Add Code for process Edit mode for Top grid *************/
