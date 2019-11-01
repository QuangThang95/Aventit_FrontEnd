import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { Component, OnInit, HostListener, OnDestroy, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { CustomizeExcelCell } from '@shared/utilites';

import { Subscription } from 'rxjs/Subscription';
import { DxDataGridComponent } from '@node_modules/devextreme-angular';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';
import { AppEnums } from '@shared/AppEnum';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { CommonConstant } from '@shared/common/constant.common';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { BgSilAHVBeitrag, PersonenUnterstuetzt, SqlQueryShPositionTyp, AHVBeitragPosition, InstitutionSuchenWh, LookUps, IDropDownAnpassung } from '../../models';
import { copyElement } from '@shared/utilites/utilityHelpers';
import { processKeyDown } from '@shared/utilites/currencyHelper';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxValidationGroupComponent, DxValidatorComponent } from 'devextreme-angular';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';

import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { Subject, combineLatest } from 'rxjs';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
@Component({
  selector: 'kiss-ctl-ahv-beitrage',
  templateUrl: './ahv-beitrag.component.html',
  styleUrls: ['./ahv-beitrag.component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class AhvBeitrageComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild('formList') formList: any;
  @ViewChild('formDetail') formDetail: any;
  @ViewChild('printer') printer: PrinterComponent;

  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('gridAhvBeitrage') gridAhvBeitrage: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('validatorLA') validatorLA: DxValidatorComponent;
  @ViewChild('validatorBis') validatorBis: DxValidatorComponent;
  @ViewChild('validatorBetrag') validatorBetrag: DxValidatorComponent;
  private subscriptions: Subscription[] = [];
  bgBudgetID: number;
  baPersonID: number;
  bAnpassen = false;
  anpassenVon: string;
  BgSilAHVBeitrag: BgSilAHVBeitrag;
  dategSilAHVBeitrag: string;
  msgValidateDateErr: string;
  msgValidateDateBisErr: string;
  listPersonenUnterstuetzt: PersonenUnterstuetzt[] = [];
  baPersonIDLookup: PersonenUnterstuetzt[] = [];
  listSqlQueryShPositionTyp: SqlQueryShPositionTyp[] = [];
  listAHVBeitragPosition: AHVBeitragPosition[] = [];
  listAhvInstitutionSuchenWh: InstitutionSuchenWh[] = [];
  listLookUps: LookUps[] = [];
  listDropDownAnpassungs: IDropDownAnpassung[] = [];
  StatusContainer = {
    isAddNew: false,
    isReadOnly: true,
    isEdited: false,
    isBetrageAnpassen: false,
    isBetrageAnpassenAddNew: false,
    isBtnBAnpassen: false,
    iscConcurrency: false,
    isDelete: false,
    isDeleteError: false,
    dataSize: 0,
    iscBtnConcurrency: false,
    isVisibleDateVon : false,
  };
  disabledGrid = false;
  isError = false;
  messageErr: string;
  PermissionContainer = {
    isPermissionNew : true,
    isPermissionEdit : true,
    isPermissionRemove : true
  };
  titleHeader: string;
  titleHeaderTree: string;
  infoPerson: string;
  bgGruppeCode: number;
  datumVon: string;
  datumBis: string;
  isEditPopup: false;
  autoWidth = true;
  concatKontoNrName: boolean;
  isDeleteError = false;
  minDate: any;
  maxDate: any;
  isShiftKeyDown = false;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;
  accessKeyItemFocused = 0;
  isgridInstitution: false;
  nameTree: string;
  ahvBeitragPositionDetail = new AHVBeitragPosition();
  numberFormat = '#,###.00';
  ahvBeitragPositionDetailTemplate = new AHVBeitragPosition();
  ahvBeitragPositionEmpty = new AHVBeitragPosition();
  ahvBeitragPositionRequestData: any;
  selectedRowKey: any;
  newbgPositionID: number;
  indexItemDelete: number;
  detailAhvBeitragePositionID: number;
  gridFunctionKey = 'gridSetting';
  isChangeNode = true;
  listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons];
  BgBewilligungStatus = {
    InVorbereitung: 1,
    Abgelehnt: 2,
    Angefragt: 3,
    Erteilt: 5,
    Gesperrt: 9
  };
  ButtonToolbarDetail = {
    Speichern: 'speichern',
    Abbrechen: 'abbrechen',
    SpeichernBA: 'speichernBA',
    AbbrechenBA: 'abbrechenBA',
    Bearbeiten: 'bearbeiten',
    Loschen: 'loschen',
    Neuer: 'neuer',
    Concurrency: 'concurrency',
    BewilligteBetrageAnpassen: 'bewilligteBetrageAnpassen',
    Bewilligung: 'bewilligung'
  };
  modulTreeID = {
    BgSilAHVBeitrag: 30007,
    BgSilWiedereingliederung: 30008,
    BgSilTherapieEntzug: 30009,
    BgSilKrankheitBehinderungLeistung: 30010,
    BgSilSituationsbedingteLeistungen: 30011,
  };
  GruppeCodeModule = {
    BgSilAHVBeitrag: 3905,
    BgSilWiedereingliederung: 3904,
    BgSilTherapieEntzug: 3903,
    BgSilKrankheitBehinderungLeistung: 3902,
    BgSilSituationsbedingteLeistungen: 3901,
  };
  visiblePopUpDate = false;
  isClickPopUpDate = false;
  nameFocus: string;
  popUpModel: PopUpModel;
  isFillter = false;
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox, private datePipe: DatePipe, public router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.registerEvents();
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    this.visibleListBtnNavigator(this.StatusContainer.isReadOnly);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
  }


  initFunction(bgGruppeCode) {
    this.ahvBeitragesSandbox.getBgSilAHVBeitrag(this.bgBudgetID);
    this.ahvBeitragesSandbox.getPersonenUnterstuetzt(this.bgBudgetID);
    this.ahvBeitragesSandbox.getInstitutionSuchenWh();
    this.ahvBeitragesSandbox.getLookUps();
    this.bgGruppeCode = bgGruppeCode;
    this.concatKontoNrName = true;
    this.requestListDataGrid();
    this.resetStatusContainer();
  }

  registerEvents() {
    this.isClickPopUpDate = false;
    combineLatest(this.ahvBeitragesSandbox.ahvBeitragPosition$, this.ahvBeitragesSandbox.sqlQueryShPositionTyp$).subscribe(([a, b]) => {
      if (!isNullOrUndefined(a) && !isNullOrUndefined(b)) {
        this.handlingListAhvBeitrage(a);
        this.listSqlQueryShPositionTyp = b;
      }
    });
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (!isNullOrUndefined(person)) {
          this.titleHeaderTree = '';
          this.titleHeaderTree = person.titleText;
        }
      })
    );
    // Register subscribe for faLeistungID
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          const bgGruppeCode = this.checkTreeNodeSelected(selectedNode.modulTreeID);
          this.isChangeNode = true;
          this.bgBudgetID = selectedNode.bgBudgetID;
          this.baPersonID = selectedNode.baPersonID;
          this.nameTree = selectedNode.name;
          this.initFunction(bgGruppeCode);
        }
      })
    );
    this.subscriptions.push(this.ahvBeitragesSandbox.bgSilAHVBeitragData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.StatusContainer.isBetrageAnpassen = false;
        this.BgSilAHVBeitrag = data;
        setTimeout(() => {
          this.clearFilter();
        }, 300);
        const dateFinanzplanVonFormatDot = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanVon, 'dd.MM.yyyy');
        const dateFinanzplanBisFormatDot = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanBis, 'dd.MM.yyyy');
        this.dategSilAHVBeitrag = ' ' + dateFinanzplanVonFormatDot + ' - ' + dateFinanzplanBisFormatDot;
        this.msgValidateDateErr = this.translateService.instant('AhvBeitrage.MessageError.ValidateDateFinanzplan') + this.dategSilAHVBeitrag;
        this.datumVon = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanVon, 'yyyy-MM-dd');
        this.datumBis = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanBis, 'yyyy-MM-dd');
        this.minDate = this.BgSilAHVBeitrag.finanzplanVon;
        this.maxDate = this.BgSilAHVBeitrag.finanzplanBis;
        this.ahvBeitragesSandbox.getSqlQueryShPositionTyp({
          bgGruppeCode: this.bgGruppeCode ? this.bgGruppeCode : '',
          datumVon: this.datumVon ? this.datumVon : '',
          datumBis: this.datumBis ? this.datumBis : '',
          concatKontoNrName: this.concatKontoNrName ? this.concatKontoNrName : '',
        });
        if (data.bgBewilligungStatusCode === this.BgBewilligungStatus.Erteilt) {
          this.StatusContainer.isBtnBAnpassen = true;
          this.PermissionContainer.isPermissionEdit = false;
          this.PermissionContainer.isPermissionNew = true;
          this.PermissionContainer.isPermissionRemove = true;
          this.StatusContainer.isVisibleDateVon = false;
        }
        if (data.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt) {
          this.PermissionContainer.isPermissionEdit = false;
          this.PermissionContainer.isPermissionNew = true;
          this.PermissionContainer.isPermissionRemove = true;
          this.StatusContainer.isBtnBAnpassen = false;
          this.StatusContainer.isVisibleDateVon = true;
        }
        if (data.bgBewilligungStatusCode === this.BgBewilligungStatus.InVorbereitung ||
          data.bgBewilligungStatusCode === this.BgBewilligungStatus.Abgelehnt ||
          data.bgBewilligungStatusCode === this.BgBewilligungStatus.Angefragt) {
          this.PermissionContainer.isPermissionEdit = true;
          this.PermissionContainer.isPermissionNew = true;
          this.PermissionContainer.isPermissionRemove = true;
          this.StatusContainer.isBtnBAnpassen = false;
          this.StatusContainer.isVisibleDateVon = true;
        }
        this.titleHeader = '';
        this.titleHeader = this.titleHeaderTree + ' > ' +
        this.nameTree + ' vom ' + dateFinanzplanVonFormatDot + ' bis ' + dateFinanzplanBisFormatDot;
      }
    }));
    this.subscriptions.push(this.ahvBeitragesSandbox.getLookUps$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.listLookUps = data;
      }
    }));
    this.subscriptions.push(this.ahvBeitragesSandbox.personenUnterstuetzt$.subscribe(dataExport => {
      if (!isNullOrUndefined(dataExport)) {
        this.listPersonenUnterstuetzt = dataExport;
        this.baPersonIDLookup = dataExport.filter(d => d.baPersonID);
      }
    }));
    this.subscriptions.push(this.ahvBeitragesSandbox.ahvInstitutionSuchenWh$.subscribe(dataExport => {
      if (!isNullOrUndefined(dataExport)) {
        this.listAhvInstitutionSuchenWh = dataExport;
      }
    }));
    this.subscriptions.push(this.ahvBeitragesSandbox.deleteAhvBeitragePosition$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }

      if (!isNullOrUndefined(data.bgPositionID)) {
        this.ahvBeitragesSandbox.getAHVBeitragPosition(this.ahvBeitragPositionRequestData);
      } else {
        this.deleteHandleError(data);
      }
    }));
    this.subscriptions.push(this.ahvBeitragesSandbox.createAhvBeitragePosition$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.bgPositionID) {
          this.isError = false;
          this.messageErr = '';
          this.newbgPositionID = data.bgPositionID;
          this.ahvBeitragesSandbox.getAHVBeitragPosition(this.ahvBeitragPositionRequestData);
        } else {
          this.updateHandleError(data);
        }
      }
    }));
  }

  filterDataByDate() {
    this.formList.gridAhvBeitrage.instance.filter([
      ['datumVon', '<=', new Date(this.formDetail.datePopupSelect)],
    ]);
    setTimeout(() => {
      const listAfterFilter = this.formList.gridAhvBeitrage.instance.getVisibleRows();
      if (listAfterFilter.length === 0 || this.listAHVBeitragPosition.length === 0) {
        this.createNewWhenGridEmpty();
      } else if (!this.StatusContainer.isAddNew) {
        this.focusItemFristWithDateSelect(listAfterFilter);
      }
      this.formDetail.isClickPopUpDate = true;
      this.formDetail.visiblePopUpDate = false;
    }, 300);
    this.isFillter = true;
  }

  handlingListAhvBeitrage(data) {
    this.listAHVBeitragPosition = data;
      this.StatusContainer.dataSize = this.listAHVBeitragPosition.length;
      if (this.listAHVBeitragPosition.length > 0) {
        if ((this.StatusContainer.isAddNew || this.StatusContainer.isEdited || this.StatusContainer.isBetrageAnpassen) && !this.StatusContainer.isDelete) {
          const newAhvBeitragePosition = this.filterItemById(this.newbgPositionID);
          if (!isNullOrUndefined(newAhvBeitragePosition)) {
            this.ahvBeitragPositionDetail = newAhvBeitragePosition;
            this.detailAhvBeitragePositionID = newAhvBeitragePosition.bgPositionID;
            this.selectedRowKey = [newAhvBeitragePosition.bgPositionID];
            this.formList.scrollToIndex(this.selectedRowKey);
          } else {
           this.createAhvDetailPosition(0);
          }
        } else if (this.StatusContainer.isDelete) {
          this.selectRowWhenDelete();
        } else {
          this.createAhvDetailPosition(0);
        }
      } else {
        const listAfterFilter = this.formList.gridAhvBeitrage.instance.getVisibleRows();
        if (listAfterFilter.length === 0 || this.listAHVBeitragPosition.length === 0) {
          this.ahvBeitragPositionDetail = this.createAHVBeitragPositionEmpty();
        }
      }
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
      if (this.formDetail.isClickBetrageAnpassen) {
        this.StatusContainer.isBetrageAnpassen = false;
        this.formDetail.isClickBetrageAnpassen = false;
        this.StatusContainer.isAddNew = false;
        this.StatusContainer.isReadOnly = true;
        this.visibleListBtnNavigator(true);
      }
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      if (this.StatusContainer.isAddNew || this.StatusContainer.isEdited && !this.StatusContainer.iscConcurrency ) {
        this.StatusContainer.isAddNew = false;
        this.StatusContainer.isEdited = false;
        this.StatusContainer.isReadOnly = true;
        this.visibleListBtnNavigator(true);
      }
      if (this.StatusContainer.iscConcurrency) {
        this.StatusContainer.iscConcurrency = false;
      }
      this.updateStatus(this.StatusContainer);
  }

  checkTreeNodeSelected(id) {
    switch (id) {
      case this.modulTreeID.BgSilAHVBeitrag:
        return this.GruppeCodeModule.BgSilAHVBeitrag;
      case this.modulTreeID.BgSilWiedereingliederung:
        return this.GruppeCodeModule.BgSilWiedereingliederung;
      case this.modulTreeID.BgSilTherapieEntzug:
        return this.GruppeCodeModule.BgSilTherapieEntzug;
      case this.modulTreeID.BgSilKrankheitBehinderungLeistung:
        return this.GruppeCodeModule.BgSilKrankheitBehinderungLeistung;
      case this.modulTreeID.BgSilSituationsbedingteLeistungen:
        return this.GruppeCodeModule.BgSilSituationsbedingteLeistungen;
    }
  }

  focusItemFristWithDateSelect(listAfterFilter) {
    this.ahvBeitragPositionDetail = { ... new AHVBeitragPosition(listAfterFilter[0].data) };
    this.detailAhvBeitragePositionID = this.ahvBeitragPositionDetail.bgPositionID;
    this.ahvBeitragPositionDetail.datumVon = this.formDetail.datePopupSelect;
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
  }

  createNewWhenGridEmpty() {
    this.ahvBeitragPositionDetail = this.createAHVBeitragPositionEmpty();
    this.ahvBeitragPositionDetail.betrag = 0;
    this.numberFormat = '#,##0.00';
    this.ahvBeitragPositionDetail.bgBudgetID = this.bgBudgetID;
    this.ahvBeitragPositionDetail.datumVon = this.formDetail.datePopupSelect;
    this.ahvBeitragPositionDetailTemplate = { ...this.ahvBeitragPositionDetail };
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.StatusContainer.isBetrageAnpassenAddNew = true;
    this.StatusContainer.isReadOnly = false;
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: true,
      }
    );
    this.listAHVBeitragPosition.push(this.ahvBeitragPositionDetail);
    this.updateStatus(this.StatusContainer);
  }

  selectRowWhenDelete() {
    let index = 0;
    if (this.indexItemDelete >= this.listAHVBeitragPosition.length) {
      index = this.indexItemDelete - 1;
    } else {
      index = this.indexItemDelete;
    }
    this.createAhvDetailPosition(index);
  }

  createAhvDetailPosition(index) {
    this.ahvBeitragPositionDetail = { ... new AHVBeitragPosition(this.listAHVBeitragPosition[index]) };
    this.detailAhvBeitragePositionID = this.listAHVBeitragPosition[index].bgPositionID;
    this.selectedRowKey = [this.listAHVBeitragPosition[index].bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
  }

  deleteHandleError(data) {
    const message = data._body ? JSON.parse(data._body).message : this.translateService.instant('AhvBeitrage.MessageError.DeleteError');
    this.StatusContainer.isDeleteError = true;
    this.StatusContainer.isDelete = false;
    this.formDetail.showPopupMessage(message);
  }

  findItemByPostionId($e) {
    if (this.detailAhvBeitragePositionID) {
      this.ahvBeitragPositionDetail = { ...this.filterItemById(this.detailAhvBeitragePositionID) };
      this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    }
  }

  requestListDataGrid() {
    this.ahvBeitragPositionRequestData = {
      bgGruppeCode: this.bgGruppeCode ? this.bgGruppeCode : '',
      bgBudgetID: this.bgBudgetID ? this.bgBudgetID : '',
    };

    this.ahvBeitragesSandbox.getAHVBeitragPosition(this.ahvBeitragPositionRequestData);
  }

  updateHandleError(data) {
    switch (data.status) {
      case 400:
        this.formDetail.showPopup(JSON.parse(data._body).message, 'orther');
        break;

      case 409:
        this.StatusContainer.iscConcurrency = true;
        this.StatusContainer.iscBtnConcurrency = true;
        this.newbgPositionID = this.ahvBeitragPositionDetail.bgPositionID;
        this.formDetail.showPopupConcurrency(JSON.parse(data._body).message);
        this.updateStatus(this.StatusContainer);
        break;

      default:
        break;
    }
  }

  updateStatus(event) {
    this.StatusContainer = event;
    this.disabledGrid = !this.StatusContainer.isReadOnly && !this.StatusContainer.isBetrageAnpassen || this.StatusContainer.isAddNew && this.StatusContainer.isBetrageAnpassen;
    this.visibleListBtnNavigator(this.StatusContainer.isReadOnly);
  }

  createNew(event) {
    this.listAHVBeitragPosition.push(event);
    this.ahvBeitragPositionDetail = event;
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.formList.gridAhvBeitrage.instance.selectRows(this.selectedRowKey, true);
    setTimeout(() => {
      this.formList.gridAhvBeitrage.instance.focus(this.formList.gridAhvBeitrage.instance.getCellElement(this.listAHVBeitragPosition.length - 1, 0));
    }, 300);
  }

  clearFilter() {
    this.formList.gridAhvBeitrage.instance.clearFilter();
    this.isFillter = false;
    this.StatusContainer.isBetrageAnpassen = false;
    this.StatusContainer.isBetrageAnpassenAddNew = false;
    this.updateStatus(this.StatusContainer);
  }

  onClickRowGrid(e) {
    if (!isNullOrUndefined(e) && !isNullOrUndefined(e.bgPositionID)) {
      this.ahvBeitragPositionDetail = { ... e };
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
      this.detailAhvBeitragePositionID = this.ahvBeitragPositionDetail.bgPositionID;
    }
  }

  toolBarOnItemClick(event) {
    this.formList.toolBarTopOnItemClick(event);
  }
  compareObject(object: any, objectCompare: any): boolean {
    return JSON.stringify(object) === JSON.stringify(objectCompare);
  }

  remainingMessageEmit(event) {
    this.isError = event.isError;
    this.messageErr = event.message;
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonID + ' ';
      this.formDetail.showPopup(this.translateService.instant('AhvBeitrage.Message.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')', 2);
    } else {
      text = this.titleHeaderTree;
      this.formDetail.showPopup(this.translateService.instant('AhvBeitrage.Message.DoubleClickMessage'), 2);
    }
    copyElement(text);
  }

  onCloseError() {
    this.isError = false;
    this.messageErr = '';
  }
  doCancel(isAddNew) {
    if (isAddNew) {
      this.StatusContainer.isAddNew = false;
      this.StatusContainer.isReadOnly = true;
      this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
      if (this.StatusContainer.isBetrageAnpassen) {
        const listAfterFilter = this.formList.gridAhvBeitrage.instance.getVisibleRows();
        this.focusItemFristWithDateSelect(listAfterFilter);
      } else {
        if (this.listAHVBeitragPosition.length > 0) {
          this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[this.listAHVBeitragPosition.length - 1];
          this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
        } else {
          this.ahvBeitragPositionDetail = this.createAHVBeitragPositionEmpty();
        }
      }
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    } else if (this.detailAhvBeitragePositionID) {
      this.ahvBeitragPositionDetail = this.filterItemById(this.detailAhvBeitragePositionID);
      this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
      this.visibleListBtnNavigator(true);
    }
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.isError = false;
    this.messageErr = '';
    this.updateStatus(this.StatusContainer);
  }

  deleteItemEmit($e) {
    this.indexItemDelete = this.formList.gridAhvBeitrage.instance.getRowIndexByKey(this.ahvBeitragPositionDetail.bgPositionID);
    this.ahvBeitragesSandbox.deleteAhvBeitragePosition({
      bgPositionID: this.ahvBeitragPositionDetail.bgPositionID,
      bgPositionTS: this.ahvBeitragPositionDetail.bgPositionTS,
      bgBewilligungStatusCode: this.ahvBeitragPositionDetail.bgBewilligungStatusCode,
      bgBudgetID: this.bgBudgetID,
      bgPositionID_CopyOf: this.ahvBeitragPositionDetail.bgPositionID_CopyOf,
    });
  }

  confirmYesBetrageAnpassen($e) {
    this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
    this.ahvBeitragPositionDetail = this.createAHVBeitragPositionEmpty();
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.StatusContainer.isBetrageAnpassenAddNew = false;
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
  }

  cancelBetrageAnpassen($e) {
    if (this.StatusContainer.isBetrageAnpassenAddNew) {
      this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
      if (this.listAHVBeitragPosition.length > 0) {
        this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[0];
      } else {
        this.ahvBeitragPositionDetail = this.createAHVBeitragPositionEmpty();
      }
    } else if (this.StatusContainer.isAddNew) {
      this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
      this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[this.listAHVBeitragPosition.length - 1];
    } else {
      this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[0];
      this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    }
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    this.StatusContainer.isBetrageAnpassenAddNew = false;
    this.StatusContainer.isAddNew = false;
    this.StatusContainer.isReadOnly = true;
    this.StatusContainer.isBetrageAnpassen = false;
    this.formList.gridAhvBeitrage.instance.clearFilter();
    this.visibleListBtnNavigator(true);
    this.updateStatus(this.StatusContainer);
    this.isFillter = false;
  }

  canDeactivate() {
    if (!this.StatusContainer.isReadOnly && this.isFormEdited()) {
      const message = this.translateService.instant('AhvBeitrage.Message.MessageExit');
      this.formDetail.showPopup(message, 3);
      return this.navigateAwaySelection$;
    }
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.StatusContainer.isReadOnly && this.isFormEdited()) {
      return false;
    }
    return true;
  }

  canDeactivateEmit(value) {
    this.navigateAwaySelection$.next(value);
  }

  private isFormEdited() {
    return !this.compareObject(this.formDetail.ahvBeitragPositionDetail, this.formDetail.ahvBeitragPositionDetailTemplate);
  }

  filterItemById(id) {
    return this.listAHVBeitragPosition.find(x => x.bgPositionID === id);
  }

  // Shortcuts key
  @HostListener('window:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === 16 || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
    // Ctrl + S
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
      event.preventDefault();
      if (this.StatusContainer.isAddNew || this.StatusContainer.isEdited || this.StatusContainer.isBetrageAnpassen) {
        const isMatch = this.compareObject(this.formDetail.ahvBeitragPositionDetail, this.formDetail.ahvBeitragPositionDetailTemplate);
        if (isMatch) {
          this.formDetail.doCancel();
          return;
        }
        this.formDetail.doSaveOrUpdateData();
        return;
      }
      return;
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
      return;
    }
    // Ctrl + z
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      if (this.StatusContainer.isAddNew || this.StatusContainer.isEdited) {
        this.formDetail.doCancel();
      } else if (this.StatusContainer.isBetrageAnpassen) {
        const isMatch = this.compareObject(this.formDetail.ahvBeitragPositionDetail, this.formDetail.ahvBeitragPositionDetailTemplate);
        if (!isMatch) {
          const message = this.translateService.instant('AhvBeitrage.Message.MessageDiscard');
          this.formDetail.showPopup(message, this.ButtonToolbarDetail.AbbrechenBA);
        }
      }
      return;
    }
    // Ctrl + I
    if ((event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) ||  event.key === 'I') {
      event.preventDefault();
      if (this.PermissionContainer.isPermissionNew) {
        if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt ) {
          const error = {
            isError : true,
            message : this.translateService.instant('AhvBeitrage.MessageError.AllowEdit')
          };
          this.remainingMessageEmit(error);
          return;
        }
        if (!this.StatusContainer.isBtnBAnpassen || this.StatusContainer.isBetrageAnpassen) {
          this.formDetail.createNew();
        } else {
          this.formDetail.typeCreateNew = 1;
          this.formDetail.showPopUpSelectDate();
        }
      }
      return;
    }

    // Ctrl + M
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 77) {
      event.preventDefault();
      if (this.PermissionContainer.isPermissionRemove) {
        if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt ) {
          const error = {
            isError : true,
            message : this.translateService.instant('AhvBeitrage.MessageError.AllowRemove')
          };
          this.remainingMessageEmit(error);
          return;
        }
        this.formDetail.remove();
      }
      return;
    }
    if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
      this.moveFocus(false);
      return;
    }
    if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
      this.moveFocus(true);
      return;
    }
  }

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

  visibleListBtnNavigator(status: boolean) {
    if (status) {
      this.listBtn[0][0]['visible'] = true;
      this.listBtn[0][1]['visible'] = true;
      this.listBtn[0][2]['visible'] = true;
      this.listBtn[1][0]['visible'] = true;
      this.listBtn[1][1]['visible'] = true;
      this.listBtn[1][2]['visible'] = true;
      this.listBtn[1][3]['visible'] = true;
      this.listBtn[1][4]['visible'] = true;
      this.listBtn[1][5]['visible'] = true;
      this.listBtn[1][6]['visible'] = true;
      this.listBtn[1][7]['visible'] = false;
      this.listBtn[1][8]['visible'] = false;
    } else {
      this.listBtn[0][0]['visible'] = false;
      this.listBtn[0][1]['visible'] = false;
      this.listBtn[0][2]['visible'] = false;
      this.listBtn[1][0]['visible'] = false;
      this.listBtn[1][1]['visible'] = false;
      this.listBtn[1][2]['visible'] = false;
      this.listBtn[1][3]['visible'] = false;
      this.listBtn[1][4]['visible'] = false;
      this.listBtn[1][5]['visible'] = false;
      this.listBtn[1][6]['visible'] = false;
      this.listBtn[1][8]['visible'] = false;
    }
    this.listBtn = [...this.listBtn];
  }

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  createAHVBeitragPositionEmpty() {
    return this.ahvBeitragPositionEmpty = new AHVBeitragPosition({
      bgPositionID: -1,
      anpassenVon: null,
      bgPositionID_Parent: null,
      bgPositionID_CopyOf: null,
      bgBudgetID: null,
      baPersonID: null,
      baPersonIDNew: null,
      bgPositionsartID: null,
      bgPositionsartTitle: null,
      bgSpezkontoID: null,
      baInstitutionID: null,
      erstelltUserID: null,
      mutiertUserID: null,
      bgPositionID_AutoForderung: null,
      bgKategorieCode: 2,
      shBelegID: null,
      betrag: null,
      betragFormat: null,
      reduktion: 0,
      abzug: 0,
      betragEff: null,
      maxBeitragSD: 999999999,
      buchungstext: null,
      verwaltungSD: false,
      bemerkung: null,
      datumVon: '',
      datumBis: null,
      oldID: null,
      verwPeriodeVon: null,
      verwPeriodeBis: null,
      faelligAm: null,
      rechnungDatum: null,
      bgBewilligungStatusCode: 1,
      value1: null,
      value2: null,
      value3: null,
      betragAnfrage: null,
      bgAuszahlungID: null,
      datumEff: null,
      bemerkungSaldierung: null,
      saldiert: false,
      erstelltDatum: null,
      mutiertDatum: null,
      bgPositionTS: null,
      betragGBLAufAusgabekonto: null,
      geburtsdatum: null,
      nameVorname: null,
      institutionName: null,
      anpassung: null,
    });
  }

  resetStatusContainer() {
    this.StatusContainer = {
      isAddNew: false,
      isReadOnly: true,
      isEdited: false,
      isBetrageAnpassen: false,
      isBetrageAnpassenAddNew: false,
      isBtnBAnpassen: false,
      iscConcurrency: false,
      isDelete: false,
      isDeleteError: false,
      dataSize: 0,
      iscBtnConcurrency: false,
      isVisibleDateVon : false,
    };
    this.updateStatus(this.StatusContainer);
  }

}


