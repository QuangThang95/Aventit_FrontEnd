import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { NotificationsService } from 'angular2-notifications';
import { DxDateBoxComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { PrinterComponent } from '@shared/components/printer/printer.component';

import {
  CountRecord,
  DataGridBottom,
  DeleteRecord,
  ResultValue,
  TopFaLeistungValue,
  UpdateVorsaldo,
  UpdateWhLeistung,
} from '../models';
import { WhLeistungSandbox } from '../whleistung.sandbox';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { getConditionListBtn, UtilService, copyElement } from '@shared/utilites';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';


@Component({
  host: { '(window:keydown)': 'hotkeys($event)' },
  selector: 'app-whleistung',
  templateUrl: './whleistung.component.html',
  styleUrls: ['./whleistung.component.scss']
})
@SetClassRight('CtlWhLeistung')
export class WhLeistungComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  messageCanDeactive: any;

  @ViewChild('whLeistungForm') whLeistungForm: DxFormComponent;
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGridTop') expandGridTop: any;
  @ViewChild('dateboxEr') dateboxEr: DxDateBoxComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('selectboxGem') selectboxGem: DxSelectBoxComponent;
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.GridSettingBtn])];
  customizeBtn = [
    {
      text: this.translateService.instant('I001WhLeistung.Button.NeueSozialhilfe'),
      visible: true,
      name: 'neue-sozialhilfe'
    },
    {
      text: this.translateService.instant('I001WhLeistung.Button.Bearbeiten'),
      visible: true,
      name: 'bearbeiten'
    },
    {
      text: this.translateService.instant('I001WhLeistung.Button.Speichern'),
      visible: false,
      name: 'speichern'
    },
    {
      text: this.translateService.instant('I001WhLeistung.Button.Abbrechen'),
      visible: false,
      name: 'abbrechen'
    },
  ];
  //#region "Declare variables for toolbarControl"
  isNavbar: boolean;
  //#endregion


  //#region "Declare variables for add, update, delete"
  isAddMode = false;
  optionNameExport = 'export.fileName';
  optionLandesxindexValue = 'WhLeistung';
  gridFunctionKey = 'gridSetting';
  gridClickName: string = undefined;
  pageTitle: string;
  valueTextbox: any;
  filterColumnsTop: Array<any> = [];
  isReadOnly = true;
  isUpdate: boolean;
  selectedKeys = [];
  selectionRow: any;
  isChanged: boolean;
  isEdit = false;
  accessKeyItemFocused = 0;
  keyFocus: string;
  isValidate = false;
  isChangeVorsaldo: boolean;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;
  isShiftKeyDown = false;
  keyInput: string;
  isClosed = true;
  countPendenzen: any;
  minDate = new Date(1753, 0, 1);
  isDisabledGird = false;
  grundSelectboxTop: any;
  bfsSelectbox: any;
  grundSelectboxBottom: any;
  gemeSelectbox: any;
  isReadMode = true;

  //#endregion

  //#region "Declare variables for another bussiness"
  private subscriptionList: Subscription[] = [];
  nameCombobox: any;
  nameComboboxBFS: any;
  nameComboboxGeme: any;
  nameComboboxBottom: any;
  formData: TopFaLeistungValue = new TopFaLeistungValue();
  dataGridBottom: DataGridBottom[] = [];
  faLeistungId: number;
  valueRecord: CountRecord = new CountRecord();
  valueDelete = new DeleteRecord();
  popupDataMess = {
    visible: false,
    message: '',
    title: '',
    key: '',
    yes: '',
    no: ''
  };
  leiOrigDatumBis: Date;
  kbKostenstelleTS: any;
  updateWhLeistungModel: UpdateWhLeistung;
  popUpModel: PopUpModel;
  //#endregion

  constructor(injector: Injector, public whLeistungSandbox: WhLeistungSandbox,
    public notificationsService: NotificationsService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public translateService: TranslateService,
    private ref: ChangeDetectorRef,
    public utilService: UtilService) {
    super(injector);
    // locale('de-CH'); TODO

  }
  canDeactivate() {
    if (this.isChanged) {
      return true; // TODO check form dirty
    }
    return true;
  }

  ngOnInit() {
    this.setTitle(SozialhilfeConstant.PAGETITLE);
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.registerEvents();
    this.loadGridSetting();
    this.initPopUpModel();
  }

  ngAfterViewInit() {
    this.messageCanDeactive = this.translateService.instant('I001WhLeistung.Message.ConfirmDeactive');
  }
  ngOnDestroy() {
    this.unregisterEvents();
  }
  unregisterEvents() {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
  //#region "registerEvents function"
  private registerEvents() {

    // Register subscribe for selected person
    this.subscriptionList.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (!isNullOrUndefined(person)) {
          this.pageTitle = person.titleText + SozialhilfeConstant.TITLENAVIGATOR;
        }
      })
    );
    // Register subscribe for faLeistungID
    this.subscriptionList.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.faLeistungId = selectedNode.faLeistungID;
          this.getDataCombobox();
          this.getDataTop();
          this.loadGridBottomData();
        }
      })
    );

    //  Register subscribe for cbx Grund
    this.subscriptionList.push(this.whLeistungSandbox.comBoBoxData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameCombobox = data;
      }
    }));

    // Register subscribe for Cbx BFS
    this.subscriptionList.push(this.whLeistungSandbox.comBoBoxDataBFS$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameComboboxBFS = data;
      }
    }));

    // Register subscribe for Cbx Geme
    this.subscriptionList.push(this.whLeistungSandbox.comBoBoxDataGeme$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameComboboxGeme = data;
      }
    }));

    // Register subscribe for Cbx Bottom
    this.subscriptionList.push(this.whLeistungSandbox.comBoBoxDataBottom$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameComboboxBottom = data;
      }
    }));

    // Register subscribe for  Top data
    this.subscriptionList.push(this.whLeistungSandbox.loadTopdata$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.formData = data;
        if (this.isReadMode) {
          this.loadSelectboxReadMode();
          return;
        }
        this.leiOrigDatumBis = this.formData.datumBis;
        this.dateboxEr.instance.focus();
        this.whLeistungSandbox.getVorsaldoKbKostenstelleID(data.kbKostenstelleID);
      }
    }));

    // Register subscribe for Load Bottom Grid
    this.subscriptionList.push(this.whLeistungSandbox.loadGridBottomdata$.subscribe(data => {
      if (!isNullOrUndefined(data) && data.length > 0) {
        this.dataGridBottom = data;
        this.selectedKeys = [data[0].bgFinanzplanID];
      }
    }));

    // Register subscribe for Count Data
    this.subscriptionList.push(this.whLeistungSandbox.countWhLeistungdata$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.countPendenzen = data;
      }
    }));

    // Register subscribe for Delete
    this.subscriptionList.push(this.whLeistungSandbox.deleteWhLeistungdata$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.isSuccess === true) {
          this.getDataTop();
          this.customizeBtn[0].visible = true;
          this.customizeBtn[1].visible = true;
          this.customizeBtn[2].visible = false;
          this.customizeBtn[3].visible = false;
          this.isReadOnly = true;
          this.isEdit = false;
        }
      }
    }));

    // Register subscribe for Update
    this.subscriptionList.push(this.whLeistungSandbox.updateWhLeistungdata$.subscribe(data => {
      if (!data) {
        return;
      }
      if (data.status) {
        this.errorHandler(data);
        return;
      }
      this.leiOrigDatumBis = data.LeiOrigDatumBis;
      this.fallfuhrungTreeSandbox.changeTreeNodeUpdateState(true);
      if (data.InfoAfterReactivation) {
        this.whLeistungSandbox.getMLMessage(this.getMLMessageQuery('CtlWhLeistung', 'WhASVAnmeldungAnpassen', 'Die ASV-Anmeldung muss angepasst werden.'));
      }
      if (data.isShowMsgInfo) {
        this.updateWhLeistungModel.IsConfirmInfo = true;
        this.updateWhLeistungModel.IsConfirmYes = false;
        this.popUpModel.funcHidden = () => this.onHiddenPopupCommon(null, true);
        this.showPopupInfo(data.MessageInfo);
      }
      this.getDataTop();
      this.customizeBtn[0].visible = true;
      this.customizeBtn[1].visible = true;
      this.customizeBtn[2].visible = false;
      this.customizeBtn[3].visible = false;
      this.isReadOnly = true;
      this.isEdit = false;

    }));

    // Register subscribe for Update Vorsaldo
    this.subscriptionList.push(this.whLeistungSandbox.updateVorsaldoWhLeistungdata$.subscribe(data => {
      if (data) {
        // TODO
        this.updateWhLeistungModel = {
          GemeindeCode: this.formData.gemeindeCode,
          LeistungsartCode: this.formData.leistungsartCode,
          EroeffnungsGrundCode: this.formData.eroeffnungsGrundCode,
          AbschlussGrundCode: this.formData.abschlussGrundCode,
          DatumVon: this.formData.datumVon,
          DatumBis: this.formData.datumBis,
          Bemerkung: this.formData.bemerkung ? this.formData.bemerkung.trim() : null,
          FaLeistungID: this.formData.faLeistungID,
          FaLeistungTS: this.formData.faLeistungTS,
          BgFinanzplanID: this.selectedKeys.length > 0 ? this.selectedKeys[0] : null,
          LeiOrigDatumBis: this.leiOrigDatumBis,
          KbKostenstelleID: data.kbKostenstelleID,
          KbKostenstelleTS: data.kbKostenstelleTS,
          Vorsaldo: this.formData.vorsaldo,
          DatumVonText: this.translateService.instant('I001WhLeistung.Title.Eröffnet'),
          ZustGemeindeText: this.translateService.instant('I001WhLeistung.Title.Gemeindet'),
          FaFallID: this.formData.faFallID,
          ModulID: this.formData.modulID,
          FaProzessCode: this.formData.faProzessCode,
          IsConfirmInfo: false,
          IsConfirmYes: false
        };
        this.whLeistungSandbox.updateDataWhLeistung(this.updateWhLeistungModel);
      }
    }));

    // Register subscribe for getAnzahlOffenePendenzen
    this.subscriptionList.push(this.whLeistungSandbox.getAnzahlOffenePendenzen$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        // TODO
      }
    }));
    // Register subscribe for VorsaldoKbKostenstelleID
    this.subscriptionList.push(this.whLeistungSandbox.getVorsaldoKbKostenstelleIdData$.subscribe(data => {
      if (data && data.length > 0) {
        // TODO
        this.kbKostenstelleTS = data[0].kbKostenstelleTS;
      }
    }));
    this.subscriptionList.push(
      this.whLeistungSandbox.getMLMessage$.subscribe(data => {
        if (data && data.message) {
          this.showPopupInfo(data.message);
        }
      }));
  }
  //#endregion
  getMLMessageQuery(maskName: string, messageName: string, defaultText: string, params?: string) {
    return {
      maskName: maskName,
      messageName: messageName,
      defaultText: defaultText,
      parameters: params
    };
  }
  errorHandler(response) {
    const body = JSON.parse(response._body);
    switch (response.status) {
      case AppEnums.StatusCode.BAD_REQUEST:
        if (body.errorDetails && body.errorDetails.length > 0) {
          this.showPopupInfo(JSON.parse(response._body).message);
          this.popUpModel.funcHidden = () => this.onHiddenPopupCommon(body.errorDetails[0].fieldName);
          return;
        }
        break;
      case AppEnums.StatusCode.STATUS_CODE_409:
        this.concurrencyHandler(body, this.popUpModel);
        break;
      default:
        break;
    }
  }
  focusHandler(key) {
    switch (key) {
      case this.translateService.instant('I001WhLeistung.Title.Eröffnet'):
        this.dateboxEr.instance.focus();
        break;
      case this.translateService.instant('I001WhLeistung.Title.Gemeindet'):
        this.selectboxGem.instance.focus();
        break;
      default:
        break;
    }
  }
  concurrencyHandler(body, popupModel: PopUpModel) {
    if (body.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
      // TODO
      return;
    }
  }
  showPopupConfirm(mess, textBtnYes = 'Ja', textBtnNo = 'Nein', functionYes?: any, functionNo?: any, funtionHidden?: any) {
    this.popUpModel.title = 'Bestätigung';
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.message = mess;
    this.popUpModel.isVisible = true;
    this.popUpModel.textYes = textBtnYes;
    this.popUpModel.textNo = textBtnNo;
    if (functionYes && typeof functionYes === 'function') {
      this.popUpModel.funcYes = functionYes;
    }
    if (functionNo && typeof functionNo === 'function') {
      this.popUpModel.funcNo = functionNo;
    }
    if (funtionHidden && typeof funtionHidden === 'function') {
      this.popUpModel.funcHidden = funtionHidden;
    }
    this.ref.detectChanges();
  }
  showPopupInfo(mess) {
    this.popUpModel.title = 'Information';
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.message = mess;
    this.popUpModel.isVisible = true;
    this.popUpModel.textYes = '';
    this.popUpModel.textNo = '';
    this.ref.detectChanges();
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
        funcHidden: null
      }
    );
  }
  onClickYes(key?: string) {
    if (key === 'UpdateWhLeistung') {
      this.updateWhLeistungModel.IsConfirmInfo = true;
      this.updateWhLeistungModel.IsConfirmYes = true;
      this.whLeistungSandbox.updateDataWhLeistung(this.updateWhLeistungModel);
    }
  }
  onClickNo() {
    this.popUpModel.isVisible = false;
  }
  onHiddenPopupCommon(keyFocus?: string, isCallUpdate?: boolean) {
    if (isCallUpdate) {
      this.whLeistungSandbox.updateDataWhLeistung(this.updateWhLeistungModel);
      return;
    }
    if (keyFocus) {
      this.focusHandler(keyFocus);
    }
  }
  toolBarOnItemClickTopGrd($event) {
    switch ($event) {
      case 'exportExcel':
        {
          this.dataGrid.instance.option(this.optionNameExport, this.optionLandesxindexValue);
          this.dataGrid.instance.exportToExcel(false);
          return;
        }
      case 'printPdf': {
        // TODO
        return;
      }
      case 'chooserColumn': {
        this.dataGrid.instance.showColumnChooser();
        return;
      }
      case 'deleteMenuItemTopGrd': {
        this.onClickDelete();
        return;
      }
      case 'neue-sozialhilfe': {
        this.actionAddNew_OnClick();
        return;
      }
      case 'bearbeiten': {
        this.onClickEditBtnGrdTop();
        return;
      }
      case 'speichern': {
        this.onClickSaveBtnGrdTop();
        return;
      }
      case 'abbrechen': {
        this.onClickCancelBtnGrdTop();
        return;
      }
      default:
        break;
    }
    if (this.gridFunction.model.hasOwnProperty($event)) {
      this.gridFunction.model[$event] = !this.gridFunction.model[
        $event
      ];
      if (this.gridFunction.model.autoSaveSetting) {
        this.gridFunction.updateSetting(this.gridFunction.model);
      }
    }
  }

  actionAddNew_OnClick() {
    this.notificationsService.error(this.translateService.instant('I001WhLeistung.Message.Message1'));
  }
  onClickEditBtnGrdTop() {
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = true;
    this.customizeBtn[3].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.isReadOnly = false;
    this.isReadMode = false;
    this.isEdit = true;
    this.isDisabledGird = true;
    setTimeout(() => {
      this.dateboxEr.instance.focus();
    }, 300);
  }
  onClickSaveBtnGrdTop() {
    const updateVorsaldoWhLeistung: UpdateVorsaldo = {
      kbKostenstelleID: this.formData.kbKostenstelleID,
      kbKostenstelleTS: this.kbKostenstelleTS,
      vorsaldo: this.formData.vorsaldo
    };
    this.whLeistungSandbox.updateVorsaldoDataWhLeistung(updateVorsaldoWhLeistung);
  }

  onClickCancelBtnGrdTop() {
    this.showDiaglogConfirm('onClickCancelBtnGrdTop', this.translateService.instant('I001WhLeistung.Message.MessageCanCel'));
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

  onClickGrid(e: any, gridName) {
    if (this.gridClickName !== gridName) {
      this.gridClickName = gridName;
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
    if (this.gridClickName = 'dataGrid') {
      this.dataGrid.instance.columnOption(e, 'groupIndex', 0);
    }
  }

  unAllGroupingHeaderRightClick() {
    if (this.gridClickName = 'dataGrid') {
      this.dataGrid.instance.clearGrouping();
    }
  }

  hideColumn(e) {
    if (this.gridClickName = 'dataGrid') {
      this.dataGrid.instance.columnOption(e, 'visible', false);
    }
  }

  expandCloumnGrouping() {
    if (this.gridClickName = 'dataGrid') {
      this.expandGridTop.autoExpandAll = true;
    }
  }

  unExpandCloumnGrouping() {
    if (this.gridClickName = 'dataGrid') {
      this.expandGridTop.autoExpandAll = false;
    }
  }

  hotkeys(event) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      this.onClickSaveBtnGrdTop();
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      this.onClickCancelBtnGrdTop();
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
      event.preventDefault();
      if (this.isChanged) {
        this.showDiaglogConfirm('addnew', this.translateService.instant('I001WhLeistung.Message.MessageRefresh'));
      }
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
      this.onClickDelete();
    } else if (event.keyCode === AppEnums.KeyCode.KeyF5) {
      if (this.isChanged) {
        event.preventDefault();
        event.returnValue = false;
        this.showDiaglogConfirm('Refresh', this.translateService.instant('I001WhLeistung.Message.MessageRefresh'));
      }
    }

  }

  formatFocusIn(input) {
    const value = input.toString().replace(/[^0-9 ]/g, '');
    const result = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\'');
    if (result.length > 0) {
      return result;
    }
  }

  formatFocusOut(input) {
    return input.toString().replace(/[^0-9 ]/g, '');
  }

  getDataCombobox() {
    const nameCombobox = 'Eroeffnungsgrund';
    const nameComboboxBfs = 'Leistungsart';
    const nameComboboxGeme = 'GemeindeSozialdienst';
    const nameComboboxBottom = 'AbschlussHauptGrund';
    this.whLeistungSandbox.getDataComboboxBottom(nameComboboxBottom);
    this.whLeistungSandbox.getDataComboboxGeme(nameComboboxGeme);
    this.whLeistungSandbox.getDataComboboxBFS(nameComboboxBfs);
    this.whLeistungSandbox.getDataCombobox(nameCombobox);
  }

  // Load Data Top
  getDataTop() {
    this.whLeistungSandbox.getDataTop(this.faLeistungId);
  }

  // Load Grid Bottom data
  loadGridBottomData() {
    this.whLeistungSandbox.getDataBottomGrid(this.faLeistungId);
    this.whLeistungSandbox.countDataWhLeistung(this.faLeistungId);
  }

  onInput($event, dataField: string) {
    this.formData[dataField] = $event.event.target.value;
    if (dataField === 'vorsaldo') {
      this.isChangeVorsaldo = true;
    }
  }

  buttonClicked(result) {
    if (result === 'yes') {
      switch (this.popupDataMess.key) {
        case 'onClickCancelBtnGrdTop':
          this.whLeistungSandbox.getDataTop(this.faLeistungId);
          this.customizeBtn[0].visible = true;
          this.customizeBtn[1].visible = true;
          this.customizeBtn[2].visible = false;
          this.customizeBtn[3].visible = false;
          this.customizeBtn = [...this.customizeBtn];
          this.isReadOnly = true;
          this.isReadMode = true;
          this.isEdit = false;
          this.isDisabledGird = false;
          break;
        case 'addnew':
          this.isChanged = false;
          this.isChangeVorsaldo = false;
          this.whLeistungSandbox.getDataTop(this.faLeistungId);
          this.isEdit = false;
          break;
        case 'Refresh':
          this.isChanged = false;
          this.isChangeVorsaldo = false;
          this.whLeistungSandbox.getDataTop(this.faLeistungId);
          this.isEdit = false;
          break;
        case 'onClickDelete':
          if (this.dataGridBottom.length > 0) {
            this.notificationsService.error(this.translateService.instant('I001WhLeistung.Message.Message11'));
          } else {
            this.valueDelete.faLeistungID = this.faLeistungId;
            this.valueDelete.faLeistungTS = 'AAAAAAAbauw=';
            this.whLeistungSandbox.deleteDataWhLeistung(this.valueDelete);
            this.isReadOnly = true;
          }
          break;
        default:
          break;
      }
    } else if (result === 'no') {
      if (this.popupDataMess.key === 'addnew') {
        this.isChanged = true;
      }
      if (this.popupDataMess.key === 'Refresh') {
        this.isChanged = true;
      }
    }
    this.popupDataMess = {
      visible: false,
      message: '',
      title: '',
      key: '',
      yes: '',
      no: '',
    };
  }

  showDiaglogConfirm(key, message) {
    this.popupDataMess.visible = true;
    this.popupDataMess.yes = 'yes';
    this.popupDataMess.no = 'no';
    this.popupDataMess.title = this.translateService.instant('I001WhLeistung.Message.Title');
    this.popupDataMess.message = message;

    this.popupDataMess.key = key;
  }

  onValueChanged(event, e: string) {
    if (this.isEdit) {
      this.isChanged = true;
    }
  }

  onClickDelete() {
    this.showDiaglogConfirm('onClickDelete', this.translateService.instant('I001WhLeistung.Message.Message17'));
  }

  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea', 'td'];
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

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isChanged) {
      return false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (this.isEdit && this.keyFocus !== 'TextAreaBemeGem' && this.keyFocus !== 'TextAreaImfoGemTemplate') {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
  }

  onFocusIn(element, field: string, key) {
    this.keyFocus = field;
    this.keyInput = key;
    if (field === 'DateboxEr') {
      this.accessKeyItemFocused = 1;
    }
    this.accessKeyItemFocused = element.accessKey;
  }

  onFocusOut() {
    this.accessKeyItemFocused = 0;
  }

  onKeyDown(e) {
    if (this.isEdit) {
      if (this.keyInput === 'selectbox' || this.keyInput === 'datebox') {
        if ((e.event.keyCode === AppEnums.KeyCode.KeyF4) && !(e.component.option('opened'))) {
          e.event.preventDefault();
          e.component.open();
        } else if (this.isClosed && this.keyInput !== 'selectbox') {
          if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
            const em = new KeyboardEvent('keydown', {
              bubbles: true,
              cancelable: true,
              key: 'ArrowUp',
            });
            document.dispatchEvent(em);
          } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
            const em = new KeyboardEvent('keydown', {
              bubbles: true,
              cancelable: true,
              key: 'ArrowDown',
            });
            if (this.accessKeyItemFocused === 8) {
              this.dataGrid.instance.focus(this.dataGrid.instance.getCellElement(1, 1));
            }
            document.dispatchEvent(em);
          }
        }
      }
    }
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.formData.baPersonID.toString();
      this.utilService.displayNotification(this.translateService.instant('ShiftClick') + ' (' + 'ID=' + this.formData.baPersonID + ')', 'success');
    } else {
      text = this.pageTitle;
      this.utilService.displayNotification(this.translateService.instant('double click'), 'success');
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

  onClosed() {
    this.isClosed = true;
  }

  onOpened() {
    this.isClosed = false;
  }

  loadSelectboxReadMode() {
    this.grundSelectboxTop = this.formData.abschlussGrundText ? this.formData.abschlussGrundText : '';
    this.bfsSelectbox = this.formData.leistungsartText ? this.formData.leistungsartText : '';
    this.gemeSelectbox = this.formData.gemeindeText ? this.formData.gemeindeText : '';
    this.grundSelectboxBottom = this.formData.eroeffnungsGrundText ? this.formData.eroeffnungsGrundText : '';
  }
}
