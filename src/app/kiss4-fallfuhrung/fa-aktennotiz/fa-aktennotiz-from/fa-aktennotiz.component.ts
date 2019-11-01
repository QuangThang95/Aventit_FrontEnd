
import { BaseComponent } from '@shared/components/base.component';
import { Component, Injector, OnDestroy, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { localeDateString, Dialog, getConditionListBtn } from '@shared/utilites/utilityHelpers';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { FaAktennotizSandbox } from '../fa-aktennotiz.sandbox';
import {
  FaAktennotiz,
  FaAktennotizQuery,
  FaAktennotizQueryModel,
  RadioModel,
  FaAktennotizDetailModel,
  FaAktennotizUpdateModel,
  FaAktennotizInsertModel,
  ModelQueryGetConfig
} from '../models';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { AppEnums } from '@shared/AppEnum';
import { copyElement } from '../../../../shared/utilites/utilityHelpers';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { UtilService } from '@shared/utilites';
import { Router } from '@angular/router';
import { DxButtonComponent, DxCheckBoxComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';
import { FA_AKTENNOTIZ } from '@shared/common/fa-aktennotiz.common';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
@Component({
  host: { '(window:keydown)': 'hotkeys($event)' },
  selector: 'app-fa-aktennotiz',
  templateUrl: './fa-aktennotiz.component.html',
  styleUrls: ['./fa-aktennotiz.component.scss']
})
@SetClassRight('CtlFaAktennotiz')
export class FaAktennotizComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('faAktennotizCreateEditForm') faAktennotizCreateEditForm: DxFormComponent;
  @ViewChild('gridFaAktennotiz') gridComponent: DxDataGridComponent;
  @ViewChild('faAktennotizSearchForm') faAktennotizSearchForm: DxFormComponent;
  @ViewChild('expandFaAktennotiz') expandFaAktennotiz: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('buttonYes') buttonYes: DxButtonComponent;
  @ViewChild('radio') radioItem: DxiItemComponent;
  @ViewChild('themen') checkBoxTheMen: DxCheckBoxComponent;
  @ViewChild('kontaktart') kontaktart: DxSelectBoxComponent;
  listBtn = [[CommonConstant.ToolbarButtons[1]]];
  pageTitle = 'Besprechung';
  //#region "Declare variables for toolbarControl"
  isNavbar: boolean;
  toolbarControl = {
    isFilter: true,
    isSearch: true,
    isSearchPanel: false,
    isFilterBuilder: false,
    isVisible: false
  };
  //#endregion

  //#region "Declare variables for Search"
  baPersonID: number;
  faAktennotizData: FaAktennotiz[];
  checkBoxTheMenValue = false;
  tagBoxTheMenValue: string[];
  gridMitarbeiterDataSource: any = [];
  gridMitarbeiterSelectedRowKeys: number[] = [];
  gridBoxMitarbeiterValue: number;
  selectBoxKontaktartValue: any;
  //#region Need fix after merge to develop
  userFa = '';
  //#endregion
  querySearch: FaAktennotizQueryModel = {
    FaLeistungID: null,
    IsDeleted1: false,
    IsDeleted2: false,
    Themen: null,
    AlleThemen: true,
    LanguageCode: 1,
    Inhalt: null,
    DatumBis: null,
    DatumVon: null,
    Kontaktart: null,
    Stichwort: null,
    SucheSAR: null
  };
  querySearchInitData: FaAktennotizQueryModel = {
    FaLeistungID: null,
    IsDeleted1: false,
    IsDeleted2: false,
    Themen: null,
    AlleThemen: true,
    LanguageCode: 1,
    Inhalt: null,
    DatumBis: null,
    DatumVon: null,
    Kontaktart: null,
    Stichwort: null,
    SucheSAR: null
  };
  radioValue: any;
  //#endregion

  //#region "Declare variables for grdiview"
  isInitDataGridView = true;
  filter: any;
  filterColumnsTop: Array<any> = [];
  refreshDropdownGrid = {};
  faAktennotizModel = {};
  gridFunctionKey = 'gridFaAktennotizSetting';
  optionNameExport = 'export.fileName';
  optionFaAktennotizValue = 'FaAktennotiz';
  faAktennotizSelectedKeys = [];
  //#endregion

  //#region "Declare variables for detail view"
  isViewDetail = true;
  totalRowInGrid = {};
  treeSelectStatus = false;
  animationContextMenu = {
    show: null,
    hide: { type: 'fade', from: 1, to: 0, duration: 500 }
  };
  faAktennotizDetail: FaAktennotizDetailModel = new FaAktennotizDetailModel();
  tagBoxDetailTheMenValue: number[];
  dauerData: any[];
  //#endregion

  //#region "Declare variables for add, update, delete"
  isAddMode = false;
  isEditMode = false;
  saveTotalrow = 0;
  faAktennotizUpdateModel: FaAktennotizUpdateModel = new FaAktennotizUpdateModel();
  faAktennotizInsertModel: FaAktennotizInsertModel = new FaAktennotizInsertModel();
  faAktennotizDetailTmp: FaAktennotizDetailModel = new FaAktennotizDetailModel();
  faAktennotizDetailOnEdit: FaAktennotizDetailModel = new FaAktennotizDetailModel();
  //#endregion

  //#region "Declare variables for another bussiness"
  leistungsverantwDisplayValue = '';
  treeSelectValue: string;
  navItemSelected: string;
  dateBoxInputValue: any;
  private subscriptions: Array<Subscription> = [];
  messageErr = null;
  creatorSearchId: number;
  receiverSearchId: number;
  leistungSearchId: number;
  falltraegerDetailId: number;
  receiverDetailId: number;
  isErrorClosed = true;
  erfassungVisible = false;
  mutationVisible = false;
  menuItems: any[];
  modelQueryConfig: ModelQueryGetConfig = new ModelQueryGetConfig();
  isVisibleDauer = false;
  accessKeyItemFocused = 0;
  keyFocus: string;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;
  isShiftKeyDown = false;
  priorities: RadioModel[] = [
    {
      Name: 'Active',
      DisplayName: 'nur aktive'
    },
    {
      Name: 'InActive',
      DisplayName: 'nur gelöschte'
    },
    {
      Name: 'All',
      DisplayName: 'alle'
    }
  ];
  now: Date = new Date(2018, 6, 2);
  gridBoxAutorValue: number;
  popupData = {
    visible: false,
    message: '',
    title: '',
    key: '',
    yes: '',
    no: '',
    visibleButton: true
  };
  personCopyTitle: string;
  editor: any;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        this.textEditorHandler();
      },
      focus: (e) => { }
    }
  };
  popupConcurrency = {
    title: this.translateService.instant('Asvexport.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('Asvexport.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('Asvexport.PopupConfirm.Daten'),
  };
  isClickDaten = false;
  isDisabledSpeichern = false;
  dateBoxDatumVonValue: Date;
  dateBoxDatumBisValue: Date;
  kontaktartData: any[];
  minDate = new Date(1753, 0, 1);
  maxDate = new Date(9999, 12, 31);
  //#endregion
  constructor(
    injector: Injector,
    public faAktennotizSandbox: FaAktennotizSandbox,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.faAktennotizSandbox.registerEvents();
  }

  initData() {
    this.setTitle(FA_AKTENNOTIZ.PAGETITLE);
    this.radioItem.cssClass = 'radio-fa-aktennotiz';
    this.titlePage = '';
    this.modelQueryConfig.keyPath = 'System\\Fallfuehrung\\KorrespondenzDauer';
    this.modelQueryConfig.defaultValue = false;
    this.isAddMode = false;
    this.isEditMode = false;
    this.textEditorHandler();
    this.defaultUIState();
    this.faAktennotizSandbox.loadKontaktartData();
    this.faAktennotizSandbox.loadTheMenData();
    this.faAktennotizSandbox.loadMitarbeiterData();
  }
  ngAfterViewInit(): void {
    this.registerEvents();
  }
  //#region "registerEvents function"
  private registerEvents() {
    // Register subscribe for selected person
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (!isNullOrUndefined(person)) {
          this.pageTitle = person.titleText + ' > Besprechung';
          this.personCopyTitle = person.titleText;
        }
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.baPersonID = selectedNode.baPersonID;
          this.querySearchInitData.FaLeistungID = selectedNode.faLeistungID;
          this.querySearch = this.querySearchInitData;
          this.searchHandler();
          this.initData();
        }
      })
    );
    this.subscriptions.push(this.faAktennotizSandbox.faAktennotizsData$.subscribe(data => {
      this.faAktennotizData = data;
      if (this.faAktennotizData && this.faAktennotizData.length > 0) {
        if (this.isEditMode) {
          this.isEditMode = false;
          this.faAktennotizSelectedKeys = [this.faAktennotizDetail.FaAktennotizID];
          this.faAktennotizDetail = this.FaAktennotizDetailMapField(this.faAktennotizData.filter(x => x.faAktennotizID === this.faAktennotizDetail.FaAktennotizID)[0]);
        } else {
          this.faAktennotizSelectedKeys = [this.faAktennotizData[this.faAktennotizData.length - 1].faAktennotizID];
          this.faAktennotizDetail = this.FaAktennotizDetailMapField(this.faAktennotizData[this.faAktennotizData.length - 1]);
        }
        this.faAktennotizSandbox.loadConfigData(this.modelQueryConfig);
        this.focusCellGrid();
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.kontaktartData$.subscribe(data => {
      if (data && data.length > 0) {
        this.kontaktartData = data;
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.mitarbeiterData$.subscribe(data => {
      this.gridMitarbeiterDataSource = data;
    }));
    this.subscriptions.push(this.faAktennotizSandbox.theMenData$.subscribe(data => {
    }));
    this.subscriptions.push(this.faAktennotizSandbox.addFaAktennotizenData$.subscribe(data => {
      if (data) {
        if (data.isSuccess) {
          this.checkPencilTree(false);
          this.resetDataAfterCUD();
          this.textEditorHandler();
          this.isAddMode = false;
        }
        if (data.status && data.status === AppEnums.StatusCode.STATUS_CODE_409) {
          const body = JSON.parse(data._body);
          if (body.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
            const message = body.message.toString();
            message.replace('\r\n', '<br>');
            this.showDiaglogConcurrency(message);
          }
        }
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.deleteFaAktennotizenData$.subscribe(data => {
      if (data && data.isSuccess) {
        this.resetDataAfterCUD();
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.updateFaAktennotizenData$.subscribe(data => {
      if (data) {
        if (data.isSuccess) {
          this.checkPencilTree(false);
          this.resetDataAfterCUD();
          this.textEditorHandler();
        }
        if (data.status && data.status === AppEnums.StatusCode.STATUS_CODE_409) {
          const body = JSON.parse(data._body);
          if (body.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
            const message = body.message.toString();
            message.replace('\r\n', '<br>');
            this.showDiaglogConcurrency(message);
          }
        }
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.dauerData$.subscribe(data => {
      this.dauerData = data;
      if (data) {
        this.faAktennotizDetail.FaDauerText = (data && data.length > 0 && data.filter(x => x.code === this.faAktennotizDetail.FaDauerCode).length > 0)
          ? data.filter(x => x.code === this.faAktennotizDetail.FaDauerCode)[0].text : '';
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.configData$.subscribe(data => {
      if (!isNullOrUndefined(data) && !isNullOrUndefined(data.value)) {
        if (data.value) {
          this.isVisibleDauer = true;
        } else {
          this.isVisibleDauer = false;
        }
        this.faAktennotizSandbox.loadDauerData();
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.dokumentAktennotizenData$.subscribe(data => {
      if (data && data.length === 0) {
        this.messageErr = this.translateService.instant('FaAktennotizDetails.MessageDokumentNoTemplate');
        this.isErrorClosed = false;
      }
    }));
    this.subscriptions.push(this.faAktennotizSandbox.defaultKontartPartnerData$.subscribe(data => {
      if (data) {
        this.userFa = data.name;
        this.faAktennotizDetail.Kontaktpartner = this.userFa;
        this.faAktennotizDetailTmp = { ...this.faAktennotizDetail };
      }
    }));
  }
  //#endregion

  //#region "Search region"
  gridMitarbeiterOnClick(event) {
    this.gridBoxMitarbeiterValue = event.data.userID;
    this.querySearch.SucheSAR = event.data.userID;
  }
  onChangeCheckBox() {
    this.querySearch.AlleThemen = !this.checkBoxTheMenValue;
    this.searchHandler();
  }
  onValueRadioChanged(event) {
    switch (event.value) {
      case 'Active':
        this.querySearch.IsDeleted1 = false;
        this.querySearch.IsDeleted2 = false;
        break;
      case 'InActive':
        this.querySearch.IsDeleted1 = true;
        this.querySearch.IsDeleted2 = true;
        break;
      case 'All':
        this.querySearch.IsDeleted1 = true;
        this.querySearch.IsDeleted2 = false;
        break;
      default:
        break;
    }
    this.faAktennotizSandbox.loadFaAktennotizInitData(this.querySearch);
    this.searchHandler();
  }
  onRowPrepared(e) {
    if (e.data && e.data.isDeleted) {
      e.rowElement.style.backgroundColor = '#FFA07A';
    }
  }
  onChangeTagBox() {
    this.querySearch.Themen = (this.tagBoxTheMenValue && this.tagBoxTheMenValue.length > 0) ? this.tagBoxTheMenValue.join(',') : null;
    this.searchHandler();
  }
  onValueDropDownChanged(event) {
    this.querySearch.SucheSAR = event.value;
    this.searchHandler();
  }
  onChangeTextBoxStichwort() {
    this.searchHandler();
  }
  onChangeDateBoxTo() {
    this.querySearch.DatumVon = this.dateBoxDatumVonValue ? this.dateBoxDatumVonValue.toDateString() : null;
    this.querySearch.DatumBis = this.dateBoxDatumBisValue ? this.dateBoxDatumBisValue.toDateString() : null;
    this.searchHandler();
  }
  onChangeDateBoxFrom() {
    this.querySearch.DatumVon = this.dateBoxDatumVonValue ? this.dateBoxDatumVonValue.toDateString() : null;
    this.querySearch.DatumBis = this.dateBoxDatumBisValue ? this.dateBoxDatumBisValue.toDateString() : null;
    this.searchHandler();
  }
  onChangeSelectBox() {
    this.searchHandler();
  }
  searchHandler() {
    this.faAktennotizSandbox.loadFaAktennotizInitData(this.querySearch);
  }
  //#endregion

  gridOnClick(event, gridName: string) {
    this[gridName] = event.key;
    if (!this.refreshDropdownGrid[gridName]) {
      this.refreshDropdownGrid[gridName] = event.component;
    }
    if (gridName === 'receiverDetailId') {
      this.faAktennotizModel['receiverId'] = this.receiverDetailId;
      this.faAktennotizModel['taskReceiverCode'] = +event.data[
        'typeCode'
      ];
    }
    event.component.repaint();
  }

  refeshGridInDropdown() {
    for (const key of Object.keys(this.refreshDropdownGrid)) {
      if (this.refreshDropdownGrid[key].isFilter) {
        this.refreshDropdownGrid[key].clearFilter();
      }
      this.refreshDropdownGrid[key].clearSelection();
    }
  }

  gridOnContentReady(e) {
    const rowCount = e.component.totalCount();
    if (rowCount !== this.saveTotalrow && rowCount > 0) {
      try {
        e.component.pageIndex(e.component.pageCount() - 1);
        if (e.component.getSelectedRowsData().length === 1) {
          e.component.clearSelection();
        }
        const data = e.component.option('dataSource');
        const key = data[rowCount - 1].FaAktennotizID;
        const list = e.component.getSelectedRowKeys();
        list.push(key);
        e.component.option('selectedRowKeys', list);
      } catch (error) { }
      this.saveTotalrow = rowCount;
    }
  }

  gridOnCellClick(e) {
    if (e.columnIndex !== 14) {
      return;
    }
    e.component.clearSelection();
  }
  toolBarOnItemClickTopGrd(event) {
    if (event === 'exportExcel') {
      this.gridComponent.instance.option(this.optionNameExport, this.optionFaAktennotizValue);
      this.gridComponent.instance.exportToExcel(false);
      return;
    }
  }
  faAktennotizRowClick(event) {
    this.faAktennotizDetail = this.FaAktennotizDetailMapField(event.data);
    this.faAktennotizSandbox.loadConfigData(this.modelQueryConfig);
  }
  FaAktennotizDetailMapField(data: FaAktennotiz): FaAktennotizDetailModel {
    const dataMapping: FaAktennotizDetailModel = new FaAktennotizDetailModel();
    dataMapping.FaLeistungID = data.faLeistungID;
    dataMapping.Created = data.created;
    dataMapping.Creator = data.creator;
    dataMapping.Datum = data.datum;
    dataMapping.FaKontaktartCode = data.faKontaktartCode;
    const listKontaktartFillter = this.kontaktartData ? this.kontaktartData.filter(x => x.code === data.faKontaktartCode) : null;
    dataMapping.FaKontaktartText = (listKontaktartFillter && listKontaktartFillter.length > 0) ? listKontaktartFillter[0].text : '';
    dataMapping.FaThemaCodes = data.faThemaCodes;
    this.tagBoxDetailTheMenValue = data.faThemaCodes ? data.faThemaCodes.split(',').map(item => +item) : [];
    dataMapping.FaThemaCodesText = data.faThemaCodesText;
    dataMapping.InhaltRTF = data.inhaltRTF;
    dataMapping.IsDeleted = data.isDeleted;
    dataMapping.Kontaktpartner = data.kontaktpartner;
    dataMapping.Modified = data.modified;
    dataMapping.Modifier = data.modifier;
    dataMapping.Stichwort = data.stichwort;
    dataMapping.UserID = data.userID;
    const listAutorFillter = this.gridMitarbeiterDataSource ? this.gridMitarbeiterDataSource.filter(x => x.userID === data.userID) : null;
    dataMapping.AutorText = (listAutorFillter && listAutorFillter.length > 0) ? listAutorFillter[0].name : '';
    dataMapping.FaAktennotizID = data.faAktennotizID;
    dataMapping.FaAktennotizTS = data.faAktennotizTS;
    dataMapping.FaDauerCode = data.faDauerCode;
    return dataMapping;
  }
  onValueTagBoxThemenChanged(event) {
    this.faAktennotizDetail.FaThemaCodes = event.value.join(',');
  }
  //#endregion

  //#region "CRUD funtion"
  actionNew_OnClick(): any {
    this.isAddMode = true;
    this.isEditMode = false;
    this.textEditorHandler();
    this.checkPencilTree(true);
    this.innitCreateData();
  }
  innitCreateData() {
    this.faAktennotizDetail.FaLeistungID = this.querySearch.FaLeistungID;
    this.faAktennotizDetail.Datum = new Date();
    this.faAktennotizDetail.Kontaktpartner = this.userFa;
    this.faAktennotizDetail.UserID = +localStorage.getItem('user:userId');
    this.faAktennotizDetail.Created = new Date();
    this.faAktennotizDetail.Creator = localStorage.getItem('user:lastName') + ', ' + localStorage.getItem('user:firstName') + ' (' + localStorage.getItem('user:userId') + ')';
    this.faAktennotizDetail.Modified = this.faAktennotizDetail.Created;
    this.faAktennotizDetail.Modifier = null;
    this.faAktennotizDetail.FaKontaktartCode = null;
    this.faAktennotizDetail.InhaltRTF = null;
    this.faAktennotizDetail.FaDauerCode = null;
    this.faAktennotizDetail.FaThemaCodes = null;
    this.faAktennotizDetail.Stichwort = null;
    this.faAktennotizDetail.IsDeleted = false;
    this.tagBoxDetailTheMenValue = [];
    this.faAktennotizSandbox.loadDefaultKontartPartner(this.baPersonID);
  }
  mappingDataToInsert() {
    this.faAktennotizInsertModel.FaLeistungID = this.faAktennotizDetail.FaLeistungID;
    this.faAktennotizInsertModel.Datum = this.faAktennotizDetail.Datum;
    this.faAktennotizInsertModel.FaDauerCode = this.faAktennotizDetail.FaDauerCode;
    this.faAktennotizInsertModel.FaThemaCodes = this.faAktennotizDetail.FaThemaCodes;
    this.faAktennotizInsertModel.Kontaktpartner = this.faAktennotizDetail.Kontaktpartner;
    this.faAktennotizInsertModel.Stichwort = this.faAktennotizDetail.Stichwort;
    this.faAktennotizInsertModel.InhaltRTF = this.faAktennotizDetail.InhaltRTF;
    this.faAktennotizInsertModel.FaKontaktartCode = this.faAktennotizDetail.FaKontaktartCode;
    this.faAktennotizInsertModel.IsDeleted = this.faAktennotizDetail.IsDeleted;
    this.faAktennotizInsertModel.Creator = this.faAktennotizDetail.Creator;
    this.faAktennotizInsertModel.Created = this.faAktennotizDetail.Created;
    this.faAktennotizInsertModel.Modifier = this.faAktennotizDetail.Creator;
    this.faAktennotizInsertModel.Modified = new Date();
    this.faAktennotizInsertModel.UserID = this.faAktennotizDetail.UserID;
  }
  mappingDataToUpdate() {
    this.faAktennotizUpdateModel.FaLeistungID = this.faAktennotizDetail.FaLeistungID;
    this.faAktennotizUpdateModel.FaAktennotizID = this.faAktennotizDetail.FaAktennotizID;
    this.faAktennotizUpdateModel.FaAktennotizTS = this.faAktennotizDetail.FaAktennotizTS;
    this.faAktennotizUpdateModel.Datum = this.faAktennotizDetail.Datum;
    this.faAktennotizUpdateModel.FaThemaCodes = this.faAktennotizDetail.FaThemaCodes;
    this.faAktennotizUpdateModel.Kontaktpartner = this.faAktennotizDetail.Kontaktpartner;
    this.faAktennotizUpdateModel.FaDauerCode = this.faAktennotizDetail.FaDauerCode;
    this.faAktennotizUpdateModel.Stichwort = this.faAktennotizDetail.Stichwort;
    this.faAktennotizUpdateModel.InhaltRTF = this.faAktennotizDetail.InhaltRTF;
    this.faAktennotizUpdateModel.FaKontaktartCode = this.faAktennotizDetail.FaKontaktartCode;
    this.faAktennotizUpdateModel.IsDeleted = this.faAktennotizDetail.IsDeleted;
    this.faAktennotizUpdateModel.UserID = this.faAktennotizDetail.UserID;
    this.faAktennotizUpdateModel.Modifier = this.faAktennotizDetail.Creator;
    this.faAktennotizUpdateModel.Modified = new Date();
  }
  actionEdit_OnClick() {
    this.faAktennotizDetailTmp = { ...this.faAktennotizDetail };
    this.faAktennotizDetailOnEdit = { ...this.faAktennotizDetail };
    this.isEditMode = true;
    this.isAddMode = false;
    this.textEditorHandler();
    this.checkPencilTree(true);
  }

  actionSave_OnClick() {
    setTimeout(() => {
      if (this.faAktennotizDetail.Kontaktpartner && this.faAktennotizDetail.Kontaktpartner.length > 200) {

        this.displayPopUp(this.translateService.instant('FaAktennotiz.Message.TitleConfirm'),
          this.translateService.instant('FaAktennotiz.Message.MessageValidateMaxLength'), null, false);
        return;
      }
      if (this.faAktennotizDetail.Stichwort && this.faAktennotizDetail.Stichwort.length > 200) {
        this.displayPopUp(this.translateService.instant('FaAktennotiz.Message.TitleConfirm'),
          this.translateService.instant('FaAktennotiz.Message.MessageValidateMaxLength'), null, false);
        return;
      }
      if (this.isAddMode) {
        this.mappingDataToInsert();
        this.faAktennotizSandbox.addFaAktennotizen(this.faAktennotizInsertModel);
      } else if (this.isEditMode) {
        this.mappingDataToUpdate();
        this.faAktennotizSandbox.updateFaAktennotizen(this.faAktennotizUpdateModel);
      }
    }, 200);
  }
  actionGeloschterDatensatz_OnClick() {
    this.mappingDataToUpdate();
    this.faAktennotizUpdateModel.IsDeleted = false;
    this.faAktennotizSandbox.updateFaAktennotizen(this.faAktennotizUpdateModel);
  }
  resetDataAfterCUD() {
    this.faAktennotizCreateEditForm.instance.resetValues();
    this.faAktennotizSandbox.loadFaAktennotizInitData(this.querySearch);
    if (!this.isEditMode) {
      this.faAktennotizDetail = new FaAktennotizDetailModel();
      this.faAktennotizDetail.Datum = null;
    }
    setTimeout(() => {
      const findIndex = this.faAktennotizData.findIndex(x => x.faAktennotizID === this.faAktennotizSelectedKeys[0]);
      const scrollable = this.gridComponent.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollToElement(this.gridComponent.instance.getRowElement(findIndex));
      }
    }, 300);
  }
  defaultUIState() {
    this.isAddMode = false;
    this.isEditMode = false;
    this.querySearch = this.querySearchInitData;
    this.checkBoxTheMenValue = false;
    this.radioValue = this.priorities[0].Name;
    this.textEditorHandler();
  }

  actionCancel_OnClick() {
    setTimeout(() => {
      if (this.isClickDaten || this.isDisabledSpeichern) {
        this.isClickDaten = false;
        this.isDisabledSpeichern = false;
        this.isAddMode = false;
        this.querySearch = this.querySearchInitData;
        this.checkBoxTheMenValue = false;
        this.radioValue = this.priorities[0].Name;
        this.textEditorHandler();
        this.faAktennotizSandbox.loadFaAktennotizInitData(this.querySearch);
        return;
      }
      if (this.isAddMode && !this.compareObject(this.faAktennotizDetailTmp, this.faAktennotizDetail)) {
        this.displayPopUp(this.translateService.instant('FaAktennotiz.Message.TitleConfirmCancelCreate'),
          this.translateService.instant('FaAktennotiz.Message.MessageConfirmCancelCreate'), 'create');
        return;
      }
      if (this.isEditMode && !this.compareObject(this.faAktennotizDetailTmp, this.faAktennotizDetail)) {
        this.displayPopUp(this.translateService.instant('FaAktennotiz.Message.TitleConfirmCancelEdit'),
          this.translateService.instant('FaAktennotiz.Message.MessageConfirmCancelEdit'), 'update');
        return;
      }
      this.isAddMode = false;
      this.isEditMode = false;
      this.textEditorHandler();
      this.checkPencilTree(false);
    }, 200);
  }
  compareObject(object: any, objectCompare: any): boolean {
    return JSON.stringify(object) === JSON.stringify(objectCompare);
  }
  actionDokument_OnClick() {
    this.faAktennotizSandbox.loadDokumentAktennotizen();
  }
  onValueDropDownAutorChanged(event) {
    this.faAktennotizDetail.UserID = event.value;
  }
  gridAutorOnClick(event) {
    this.faAktennotizDetail.UserID = event.data.userID;
  }
  onItemClickPopupToolBar(event) {
    switch (event.itemData.name) {
      case 'geloschter':
        this.onDelete();
        break;
      default:
        break;
    }
  }
  onDelete() {
    this.displayPopUp(this.translateService.instant('FaAktennotiz.Message.TitleConfirmDelete'),
      this.translateService.instant('FaAktennotiz.Message.MessageConfirmDelete'), 'delete');
  }
  //#endregion

  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.unregisterEvents();
    this.faAktennotizSandbox.unregisterEvents();
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    if (this.isAddMode || this.isEditMode) {
      $event.returnValue = 'Are you sure?';
    }
  }
  onFocusIn(element, field: string) {
    this.keyFocus = field;
    this.accessKeyItemFocused = element.accessKey;
  }
  onFocusOut() {
    this.accessKeyItemFocused = 0;
  }
  onFocusInCheckBox(element) {
    this.accessKeyItemFocused = element.accessKey;
  }
  onFocusOutCheckBox() {
    this.accessKeyItemFocused = 0;
  }
  // Arrow-key
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea', 'span', 'dx-check-box', 'dx-radio-group'];
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

  // Shortcuts key
  hotkeys(event) {
    if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
      if (this.accessKeyItemFocused === 8 && this.querySearch.AlleThemen) {
        this.accessKeyItemFocused--;
      }
      this.moveFocus(false);
      event.preventDefault();
      return;
    }
    if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
      if (this.accessKeyItemFocused === 8 && this.querySearch.AlleThemen) {
        this.accessKeyItemFocused++;
      }
      this.moveFocus(true);
      event.preventDefault();
      return;
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
      return;
    }
  }
  // Onkey Down
  onKeyDown(e) {
    if (this.keyFocus === 'Kontaktart' || this.keyFocus === 'Mitarbeiter') {
      if ((e.event.keyCode === AppEnums.KeyCode.KeyF4) && !(e.component.option('opened'))) {
        e.event.preventDefault();
        e.component.open();
      }
    } else {
      if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey && this.keyFocus !== 'Stichworte') {
        const em = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'ArrowUp',
        });
        document.dispatchEvent(em);
      } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey && this.keyFocus !== 'Stichworte') {
        const em = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'ArrowDown',
        });
        document.dispatchEvent(em);
      }
    }
  }

  onContextMenuPreparing(e: any) {
    if (!isNullOrUndefined(e.items)) {
      switch (e.target) {
        case 'header':
          if (e.items.length > 3) {
            e.items.splice(3, e.items.length - 3);
          }
          e.items.push({ disabled: false, onItemClick: () => this.groupingHeaderRightClick(e.column.caption), text: 'Nach dieser Spalte gruppieren', beginGroup: true });
          e.items.push({ disabled: false, onItemClick: () => this.hideColumn(e.column.caption), text: 'Spalte ausblenden' });
          e.items.push({ disabled: false, onItemClick: () => this.unAllGroupingHeaderRightClick(), text: 'Alle Gruppierung entfernen' });
          break;
        case 'content':
          e.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: 'Alles erweitern' });
          e.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: 'Alles reduzieren' });
          break;
        default:
          break;
      }
    }
  }
  groupingHeaderRightClick(e) {
    this.gridComponent.instance.columnOption(e, 'groupIndex', 0);
  }

  unAllGroupingHeaderRightClick() {
    this.gridComponent.instance.clearGrouping();
  }


  hideColumn(e) {
    this.gridComponent.instance.columnOption(e, 'visible', false);
  }

  expandCloumnGrouping() {
    this.expandFaAktennotiz.autoExpandAll = true;
  }

  unExpandCloumnGrouping() {
    this.expandFaAktennotiz.autoExpandAll = false;
  }

  /**
    * Create function for Right Click on Grid's Column Header
    */
  rightClickColumnHeader(index: number, elementId: any) {
    const grid = document.getElementById(elementId);
    const elements = grid.getElementsByClassName('dx-header-filter');
    const element = elements.item(index);
    if (document.createEvent) {
      const events = new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: this.getOffset(element).left,
        clientY: this.getOffset(element).top
      });
      setTimeout(() => {
        element.dispatchEvent(events);
      }, 100);
      this.rightClickColumnHeaderIndex++;
      if (this.rightClickColumnHeaderIndex === elements.length - 1) {
        this.rightClickColumnHeaderIndex = 0;
      }
      return;
    }
  }

  /**
  * Create function for Click on Grid's Column Filter
  */
  clickColumnFilter(index: number, elementId: any) {
    const grid = document.getElementById(elementId);
    const elements = grid.getElementsByClassName('dx-header-filter');
    const element = elements.item(index);
    if (document.createEvent) {
      const events = new MouseEvent('click', {
        bubbles: true,
        clientX: this.getOffset(element).left,
        clientY: this.getOffset(element).top
      });
      setTimeout(() => {
        element.dispatchEvent(events);
      }, 100);
      this.clickColumnFilterIndex++;
      if (this.clickColumnFilterIndex === elements.length - 1) {
        this.clickColumnFilterIndex = 0;
      }
      return;
    }
  }
  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + el.offsetWidth / 2 + window.scrollX,
      top: rect.top + el.offsetHeight / 2 + window.scrollY
    };
  }
  displayPopUp(title: string, message: string, key?: string, visibleButton = true, yes = 'Ja', no = 'Nein') {
    this.popupData.visible = true;
    this.popupData.title = title;
    this.popupData.message = message;
    this.popupData.yes = yes;
    this.popupData.no = no;
    this.popupData.key = key;
    this.popupData.visibleButton = visibleButton;
  }
  buttonYesClicked() {
    switch (this.popupData.key) {
      case 'delete':
        this.faAktennotizDetail = (this.faAktennotizData.filter(x => x.faAktennotizID === this.faAktennotizDetail.FaAktennotizID).length > 0)
          ? this.FaAktennotizDetailMapField(this.faAktennotizData.filter(x => x.faAktennotizID === this.faAktennotizDetail.FaAktennotizID)[0]) : null;
        this.mappingDataToUpdate();
        this.faAktennotizUpdateModel.IsDeleted = true;
        this.faAktennotizSandbox.updateFaAktennotizen(this.faAktennotizUpdateModel);
        break;
      case 'create':
        this.checkPencilTree(false);
        this.defaultUIState();
        if (this.faAktennotizData && this.faAktennotizData.length > 0) {
          this.faAktennotizDetail = { ...this.faAktennotizDetailOnEdit };
          this.faAktennotizDetailTmp = { ...this.faAktennotizDetailOnEdit };
        } else {
          this.faAktennotizDetail = new FaAktennotizDetailModel();
          this.faAktennotizDetail.Datum = null;
        }
        break;
      case 'update':
        this.checkPencilTree(false);
        this.defaultUIState();
        this.faAktennotizDetail = { ...this.faAktennotizDetailOnEdit };
        this.faAktennotizDetailTmp = { ...this.faAktennotizDetailOnEdit };
        break;
      default:
        break;
    }
    this.popupData.visible = false;
  }
  buttonNoClicked() {
    this.popupData.visible = false;
  }
  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonID.toString();
      this.isErrorClosed = false;
      this.messageErr = this.translateService.instant('Fallfuhrung.Message.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')';
    } else {
      text = this.personCopyTitle;
      this.isErrorClosed = false;
      this.messageErr = this.translateService.instant('Fallfuhrung.Message.DoubleClickMessage');
    }
    copyElement(text);
  }
  // Shortcuts key
  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === 16 || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  @HostListener('document:keydown', ['$event'])
  public hotKey(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      this.actionSave_OnClick();
      event.preventDefault();
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      this.actionCancel_OnClick();
      event.preventDefault();
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
      this.actionNew_OnClick();
      event.preventDefault();
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      this.onDelete();
      event.preventDefault();
    } else if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
  }
  focusCellGrid() {
    setTimeout(() => {
      const findIndex = this.faAktennotizData.findIndex(x => x.faAktennotizID === this.faAktennotizSelectedKeys[0]);
      const scrollable = this.gridComponent.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollToElement(this.gridComponent.instance.getRowElement(findIndex));
      }
      this.gridComponent.instance.focus(this.gridComponent.instance.getCellElement(findIndex, 0));
      if (!isNullOrUndefined(document.querySelectorAll('.dx-datagrid-focus-overlay')) && document.querySelectorAll('.dx-datagrid-focus-overlay').length > 0) {
        document.querySelectorAll('.dx-datagrid-focus-overlay')[0].setAttribute('style', 'border-color: transparent;');
      }
    }, 300);
  }
  checkPencilTree(isEditMode: boolean) {
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isEditMode,
      }
    );
  }

  enableTextarea() {
    if (this.editor) {
      this.editor.edit.on();
    }
  }
  disableTextarea() {
    if (this.editor) {
      this.editor.edit.off();
    }
  }
  showDiaglogConcurrency(message: string) {
    this.popupConcurrency.visible = true;
    this.popupConcurrency.abbrechen = this.translateService.instant('Asvexport.PopupConfirm.Abbrechen');
    this.popupConcurrency.datenAktualisieren = this.translateService.instant('Asvexport.PopupConfirm.Daten');
    this.popupConcurrency.title = this.translateService.instant('Asvexport.PopupConfirm.Title');
    this.popupConcurrency.message = message;
  }
  popupConcurrencyAbbrechenDaten() {
    this.isClickDaten = true;
    this.popupConcurrency.visible = false;
  }
  popupConcurrencyAbbrechen() {
    this.popupConcurrency.visible = false;
  }
  onHiding() {
    if (this.isClickDaten) {
      this.isAddMode = false;
      this.querySearch = this.querySearchInitData;
      this.checkBoxTheMenValue = false;
      this.radioValue = this.priorities[0].Name;
      this.disableTextarea();
      this.faAktennotizSandbox.loadFaAktennotizInitData(this.querySearch);
    } else {
      this.isDisabledSpeichern = true;
    }
  }
  onShown() {
    this.isClickDaten = false;
  }
  onShownConfirm() {
    this.buttonYes.instance.focus();
  }
  isViewMode() {
    return !(this.isAddMode || this.isEditMode);
  }
  textEditorHandler() {
    if (this.isViewMode() || (this.faAktennotizDetail && this.faAktennotizDetail.IsDeleted)) {
      this.disableTextarea();
      return;
    }
    this.enableTextarea();
  }
  //#endregion
}
