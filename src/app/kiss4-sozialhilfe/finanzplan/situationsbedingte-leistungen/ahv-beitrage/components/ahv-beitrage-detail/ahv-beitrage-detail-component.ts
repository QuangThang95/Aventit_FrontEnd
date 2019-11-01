import { element } from 'protractor';
import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { Component, OnInit, OnDestroy, AfterViewInit, Injector, Input, Output, EventEmitter, HostListener, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { BgSilAHVBeitrag, PersonenUnterstuetzt, SqlQueryShPositionTyp, AHVBeitragPosition, InstitutionSuchenWh, LookUps, IDropDownAnpassung } from '../../models';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxValidationGroupComponent, DxValidatorComponent, DxButtonComponent } from 'devextreme-angular';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { FormDetailEditComponent } from '../ahv-beitrage-detail-edit/ahv-beitrage-detail-edit-component';
import { Subject } from 'rxjs';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
@Component({
  selector: 'kiss-ahv-beitrage-detail',
  templateUrl: './ahv-beitrage-detail-component.html',
  styleUrls: ['./ahv-beitrage-detail-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailComponent  extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, CanComponentDeactivate {
  @Input() ahvBeitrageDetail: any;
  @Input() bgBudgetIDEmit: any;
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() statusContainerEmit: any;
  @Input() permissionContainerEmit: any;
  @Input() bgSilAHVBeitragEmit: any;
  @Input() msgValidateDateErr: any;
  @Input() listSqlQueryShPositionTypEmit: any;
  @Input() numberFormatEmit: any;
  @Output() clearFilterEmit: EventEmitter<any> = new EventEmitter();
  @Output() findItemByPostionId: EventEmitter<any> = new EventEmitter();
  @Output() confirmYesBetrageAnpassen: EventEmitter<any> = new EventEmitter();
  @Output() actionUpdateStatus: EventEmitter<any> = new EventEmitter();
  @Output() doCancelEmit: EventEmitter<any> = new EventEmitter();
  @Output() requestListDataGrid: EventEmitter<any> = new EventEmitter();
  @Output() createNewEmit: EventEmitter<any> = new EventEmitter();
  @Output() remainingMessageEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteItemEmit: EventEmitter<any> = new EventEmitter();
  @Output() filterDataByDate: EventEmitter<any> = new EventEmitter();
  @Output() cancelBetrageAnpassenEmit: EventEmitter<any> = new EventEmitter();
  @Output() canDeactivateEmit: EventEmitter<any> = new EventEmitter();

  private subscriptions: Subscription[] = [];
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('btnAbbrechenPopup') btnAbbrechenPopup: DxButtonComponent;
  @ViewChild(FormDetailEditComponent) formDetailEditComponent: FormDetailEditComponent;

  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  ahvBeitragPositionDetail = new AHVBeitragPosition();
  ahvBeitragPositionEmpty = new AHVBeitragPosition();
  ahvBeitragPositionDetailTemplate: any = null;
  listSqlQueryShPositionTyp: any = [];
  listDropDownAnpassungs: IDropDownAnpassung[] = [];
  typeCreateNew: number;
  detailAhvBeitragePositionID: any;
  popUpConcurrencyModel: PopUpModel;
  isClickBetrageAnpassen = false;
  isShiftKeyDown = false;
  statusContainer = {
    isAddNew: false,
    isEdited: false,
    isReadOnly: false,
    isBetrageAnpassen: false,
    isBetrageAnpassenAddNew: false,
    isBtnBAnpassen: false,
    iscConcurrency: false,
    isDelete: false,
    dataSize: 0,
    isDeleteError: false,
    iscBtnConcurrency: false,
    isVisibleDateVon: false,
  };
  isCancel = false;
  permissionContainer = {
    isPermissionNew : true,
    isPermissionEdit : true,
    isPermissionRemove : true
  };
  isBtnBewilligung: boolean;
  anpassenVon: string;
  bAnpassen = false;
  BgSilAHVBeitrag: BgSilAHVBeitrag;
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
  popUpModel: PopUpModel;
  messageErr = null;
  accessKeyItemFocused = 0;
  isError = false;
  valueMaxValidateBetrag = '922337203685477.5808';
  valueMinValidateBetrag = '-922337203685477.5807';

  visiblePopUpDate = false;
  isClickPopUpDate = false;
  datePopupSelect: string;
  isGetDateError = false;

  BgBewilligungStatus = {
    InVorbereitung: 1,
    Abgelehnt: 2,
    Angefragt: 3,
    Erteilt: 5,
    Gesperrt: 9
  };

  confirmDialogData: IPopUpModel = {
    isVisible: false,
    title: this.translateService.instant('PersonenImHaushalt.TitleCancelMessage'),
    message: this.translateService.instant('PersonenImHaushalt.CancelMessage'),
    textYes: this.translateService.instant('PersonenImHaushalt.Yes'),
    textNo: this.translateService.instant('PersonenImHaushalt.No'),
    funcYes: () => this.buttonClicked('yes'),
    funcNo: () => this.buttonClicked('no'),
    funcHiding: () => this.buttonClicked('no'),
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
  };

  numberFormat = '#,###.00';
  bgBudgetID: number;
  nameFocus: string;

  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox, private datePipe: DatePipe, public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.registerEvents();
    this.initPopUpConcurModel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.ahvBeitrageDetail) && !isNullOrUndefined(changes.ahvBeitrageDetail.currentValue)) {
      this.ahvBeitragPositionDetail = { ... changes.ahvBeitrageDetail.currentValue };
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
      this.detailAhvBeitragePositionID = this.ahvBeitragPositionDetail.bgPositionID;
      this.checkEnableButtonBewilligung(this.ahvBeitragPositionDetail);
    }
    if (!isNullOrUndefined(changes.statusContainerEmit) && !isNullOrUndefined(changes.statusContainerEmit.currentValue)) {
      this.statusContainer = changes.statusContainerEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.permissionContainerEmit) && !isNullOrUndefined(changes.permissionContainerEmit.currentValue)) {
      this.permissionContainer = changes.permissionContainerEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.bgSilAHVBeitragEmit) && !isNullOrUndefined(changes.bgSilAHVBeitragEmit.currentValue)) {
      this.BgSilAHVBeitrag = changes.bgSilAHVBeitragEmit.currentValue;
      this.minDate = this.BgSilAHVBeitrag.finanzplanVon;
      this.maxDate = this.BgSilAHVBeitrag.finanzplanBis;
      this.checkEnableButtonBewilligung(this.ahvBeitragPositionDetail);
    }
    if (!isNullOrUndefined(changes.listSqlQueryShPositionTypEmit) && !isNullOrUndefined(changes.listSqlQueryShPositionTypEmit.currentValue)) {
      this.listSqlQueryShPositionTyp = changes.listSqlQueryShPositionTypEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.bgBudgetIDEmit) && !isNullOrUndefined(changes.bgBudgetIDEmit.currentValue)) {
      this.bgBudgetID = changes.bgBudgetIDEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.numberFormatEmit) && !isNullOrUndefined(changes.numberFormatEmit.currentValue)) {
      this.numberFormatEmit = changes.numberFormatEmit.currentValue;
    }
  }

  private registerEvents(): void {
    this.isClickPopUpDate = false;
    this.subscriptions.push(this.ahvBeitragesSandbox.getDropDownAnpassung$.subscribe(data => {
      if (!this.isClickPopUpDate) {
        return;
      }
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data._body) {
        this.listDropDownAnpassungs = [];
        this.isGetDateError = true;
        this.showPopup(JSON.parse(data._body).message);
      } else {
        this.listDropDownAnpassungs = data;
        if (this.listDropDownAnpassungs.length > 0) {
          this.datePopupSelect = this.listDropDownAnpassungs[this.listDropDownAnpassungs.length - 1].firstDate;
          this.focusButtonPopup();
        }
        this.visiblePopUpDate = true;
        this.isClickPopUpDate = false;
      }
    }));
  }

  focusButtonPopup() {
    setTimeout(() => {
      this.btnAbbrechenPopup.focusStateEnabled = true;
      this.btnAbbrechenPopup.instance.focus();
    }, (300));
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  onChangeData(e) {
    this.ahvBeitragPositionDetail[e.field] = e.$e.value;
  }

  dataGridInstitutionClick(event) {
    this.ahvBeitragPositionDetail.institutionName = event.key.institution;
    this.ahvBeitragPositionDetail.baInstitutionID = event.key.id;
    const error = {
      isError : false,
      message : ''
    };
    this.remainingMessageEmit.emit(error);
  }

  checkEnableButtonBewilligung(ahv: AHVBeitragPosition) {
    if (!this.ahvBeitragPositionDetail.bgPositionID || this.ahvBeitragPositionDetail.bgPositionID === -1) {
      this.isBtnBewilligung = false;
    }
    if (this.BgSilAHVBeitrag && this.BgSilAHVBeitrag.bgBewilligungStatusCode === 5) {
      if (ahv.bgBewilligungStatusCode < 5) {
        this.isBtnBewilligung = true;
      } else {
        this.isBtnBewilligung = false;
      }
      return;
    }
    this.isBtnBewilligung = false;
  }

  checkIfValidSelectBox(event) {
    this.formDetailEditComponent.validationAhvBeitrage.instance.validate();
  }

  focusItemWhenCreateOrUpdate() {
    this.accessKeyItemFocused = 7;
    const tagNames = ['input', 'textarea'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused) {
          (el as HTMLElement).focus();
          return;
        }
      }
    }
  }
  checkValidationGrid() {
    const isValidaton = this.formDetailEditComponent.validationAhvBeitrage.instance.validate();
    if (!isValidaton.isValid) {
      const error = {
        isError : true,
        message : this.translateService.instant('AhvBeitrage.MessageError.InValidFormData')
      };
      this.remainingMessageEmit.emit(error);
      return false;
    }
    return true;
  }

  toolBarOnItemClick(e) {
    switch (e.itemData.name) {
      case this.ButtonToolbarDetail.Speichern: {
        if (!this.checkValidationGrid()) {
          return;
        }
        const isMatch = this.compareObject(this.ahvBeitragPositionDetail, this.ahvBeitragPositionDetailTemplate);
        if (isMatch) {
          this.doCancel();
          return;
        }
        this.doSaveOrUpdateData();
        return;
      }
      case this.ButtonToolbarDetail.Bewilligung: {
        if (!this.isBtnBewilligung) {
          return;
        }
        this.cancelBetrageAnpassen();
        return;
      }
      case this.ButtonToolbarDetail.BewilligteBetrageAnpassen: {
        if (!this.statusContainer.isBtnBAnpassen) {
          return;
        }

        if (!this.statusContainer.isBetrageAnpassen) {
          this.logicButtonBewilligteBetrageAnpassen();
        } else {
          const isMatch = this.compareObject(this.ahvBeitragPositionDetail, this.ahvBeitragPositionDetailTemplate);
          if (isMatch) {
            this.cancelBetrageAnpassen();
          } else {
            this.isClickBetrageAnpassen = true;
            this.doSaveOrUpdateData();
          }
        }
        return;
      }
      case this.ButtonToolbarDetail.Abbrechen: {
        this.doCancel();
        return;
      }
      case this.ButtonToolbarDetail.Bearbeiten: {
        if (this.permissionContainer.isPermissionEdit) {
          if (this.ahvBeitragPositionDetail.bgPositionID > 0) {
            this.update();
          }
        }
        return;
      }
      case this.ButtonToolbarDetail.Loschen: {
        if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt ) {
          const error = {
            isError : true,
            message : this.translateService.instant('AhvBeitrage.MessageError.AllowRemove')
          };
          this.remainingMessageEmit.emit(error);
          return;
        }
        if (this.permissionContainer.isPermissionRemove) {
          this.remove();
        }
        return;
      }
      case this.ButtonToolbarDetail.Neuer: {
        if (this.permissionContainer.isPermissionNew) {
          if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt ) {
            const error = {
              isError : true,
              message : this.translateService.instant('AhvBeitrage.MessageError.AllowEdit')
            };
            this.remainingMessageEmit.emit(error);
            return;
          }
          if (!this.statusContainer.isBtnBAnpassen || this.statusContainer.isBetrageAnpassen) {
            this.createNew();
          } else {
            this.typeCreateNew = 1;
            this.showPopUpSelectDate();
          }
        }
        return;
      }
      case this.ButtonToolbarDetail.SpeichernBA: {
        const isMatch = this.compareObject(this.ahvBeitragPositionDetail, this.ahvBeitragPositionDetailTemplate);
        if (!isMatch) {
          this.isClickBetrageAnpassen = false;
          this.doSaveOrUpdateData();
        }
        return;
      }
      case this.ButtonToolbarDetail.AbbrechenBA: {
        const isMatch = this.compareObject(this.ahvBeitragPositionDetail, this.ahvBeitragPositionDetailTemplate);
        if (!isMatch) {
          const message = this.translateService.instant('AhvBeitrage.Message.MessageDiscard');
          this.showPopup(message);
        }
        return;
      }
    }
  }

  createNew() {
    if (this.statusContainer.isAddNew || this.statusContainer.isBetrageAnpassenAddNew) {
      return;
    }
    this.ahvBeitragPositionDetail = this.createAHVBeitragPositionEmpty();
    this.ahvBeitragPositionDetail.betrag = 0;
    this.numberFormat = '#,##0.00';
    this.ahvBeitragPositionDetail.bgBudgetID = this.bgBudgetID;
    if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === 5) {
      this.ahvBeitragPositionDetail.datumVon = this.datePopupSelect;
    } else {
      this.ahvBeitragPositionDetail.datumVon = this.BgSilAHVBeitrag.finanzplanVon;
    }
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    this.statusContainer.isAddNew = true;
    this.statusContainer.isReadOnly = false;
    this.actionUpdateStatus.emit(this.statusContainer);
    this.focusItemWhenCreateOrUpdate();
    this.checkEnableButtonBewilligung(this.ahvBeitragPositionDetail);
    this.createNewEmit.emit(this.ahvBeitragPositionDetail);
     this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: true,
        }
      );
  }

  remove() {
    if (this.statusContainer.isAddNew) {
      this.doCancel();
      return;
    }
    if (!this.ahvBeitragPositionDetail.bgPositionID || this.ahvBeitragPositionDetail.bgPositionID < 0) {
      return;
    }
    if (this.ahvBeitragPositionDetail.bgBewilligungStatusCode === this.BgBewilligungStatus.Erteilt) {
      this.statusContainer.isDeleteError = true;
      this.showPopup(this.translateService.instant('AhvBeitrage.MessageError.CannotDelete'), 4);
      return;
    }
    this.statusContainer.isDelete = true;
    this.actionUpdateStatus.emit(this.statusContainer);
    let message;
    message = this.translateService.instant('AhvBeitrage.Message.MessageDelete');
    this.showPopup(message);
  }

  update() {
    if (this.ahvBeitragPositionDetail.bgPositionID && this.ahvBeitragPositionDetail.bgPositionID > 0) {
      this.ahvBeitragPositionDetailTemplate = { ...this.ahvBeitragPositionDetail };
      this.statusContainer.isReadOnly = false;
      this.statusContainer.isEdited = true;
      this.actionUpdateStatus.emit(this.statusContainer);
      this.focusItemWhenCreateOrUpdate();
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: true,
        }
      );
    }
  }

  onFocusIn($element) {
    if (this.statusContainer.isAddNew || this.statusContainer.isEdited) {
      this.nameFocus = $element.field;
      this.accessKeyItemFocused = $element.$e.accessKey;
    }
    if ($element.field === 'betrag') {
      this.numberFormat = AppEnums.Validation.NUMBER_FORMAT;
    }
  }

  onFocusOut($element) {
    if ($element.field === 'betrag') {
      this.numberFormat = '#,###.00';
    }
    this.accessKeyItemFocused = 0;
  }

  cancelBetrageAnpassen() {
    this.cancelBetrageAnpassenEmit.emit();
  }

  logicButtonBewilligteBetrageAnpassen() {
    if (!this.statusContainer.isBetrageAnpassen) {
      this.typeCreateNew = 2;
      this.showPopUpSelectDate();
    }
  }

  keyDownAdd($e) {
  }

  doCancel() {
    let message;
    if (this.statusContainer.isAddNew) {
      this.doCancelAddNew(!this.isFormEdited());
    }
    if (this.statusContainer.isEdited) {
      if (!this.isFormEdited()) {
        this.statusContainer.isEdited = false;
        this.statusContainer.isReadOnly = true;
        this.actionUpdateStatus.emit(this.statusContainer);
        this.doCancelEmit.emit();
      } else {
        this.isCancel = true;
        message = this.translateService.instant('AhvBeitrage.Message.MessageDiscard');
        this.showPopup(message);
      }
    }
    this.isError = false;
  }

  private isFormEdited() {
    return !this.compareObject(this.ahvBeitragPositionDetail, this.ahvBeitragPositionDetailTemplate);
  }

  doCancelAddNew(isMatch = true) {
    if (isMatch) {
      this.doCancelEmit.emit(true);
    } else {
      this.isCancel = true;
      const message = this.translateService.instant('AhvBeitrage.Message.MessageDeleteNew');
      this.showPopup(message);
    }
  }

  initPopUpConcurModel() {
    this.popUpConcurrencyModel = new PopUpModel(
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

  showPopup(message, type = 0) {
    this.confirmDialogData.isVisibleNo = true;
    this.confirmDialogData.isVisibleYes = true;
    if (type === 1) {
      this.confirmDialogData.isVisibleNo = false;
      this.confirmDialogData.isVisibleYes = true;
    } else if (type === 2) {
      this.confirmDialogData.isVisibleNo = false;
      this.confirmDialogData.isVisibleYes = false;
    } else if (this.isGetDateError || this.statusContainer.isDeleteError) {
      this.confirmDialogData.isVisibleNo = false;
      this.confirmDialogData.isVisibleYes = false;
      this.confirmDialogData.funcHiding = () => this.buttonClicked('no');
    } else {
      this.confirmDialogData.isVisibleNo = true;
      this.confirmDialogData.isVisibleYes = true;
    }
    if (type === 3) {
      this.confirmDialogData.textYes = this.translateService.instant('AhvBeitrage.PopupConfirm.Discard');
      this.confirmDialogData.textNo = this.translateService.instant('AhvBeitrage.PopupConfirm.Abbrechen');
    } else {
      this.confirmDialogData.textYes = this.translateService.instant('AhvBeitrage.PopupConfirm.Yes');
      this.confirmDialogData.textNo = this.translateService.instant('AhvBeitrage.PopupConfirm.No');
    }
    if (type === 2 || type === 4) {
      this.confirmDialogData.title = this.translateService.instant('AhvBeitrage.Message.Information');
    } else {
      this.confirmDialogData.title = this.translateService.instant('AhvBeitrage.PopupConfirm.Title');
    }
    this.confirmDialogData.message = message;
    this.confirmDialogData.funcYes = () => this.buttonClicked('yes');
    this.confirmDialogData.funcNo = () => this.buttonClicked('no');
    this.confirmDialogData.isVisible = true;
  }

  showPopupConcurrency(message) {
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.textYes = this.translateService.instant('AhvBeitrage.Button.Abbrechen');
    this.popUpConcurrencyModel.textNo = this.translateService.instant('AhvBeitrage.Button.Daten');
    this.popUpConcurrencyModel.title = this.translateService.instant('AhvBeitrage.PopupConfirm.Title');

    this.popUpConcurrencyModel.isVisible = true;

    this.popUpConcurrencyModel.funcNo = () => {
      this.requestListDataGrid.emit();
      this.popUpConcurrencyModel.isVisible = false;
    };
    this.popUpConcurrencyModel.funcYes = () => {
      this.popUpConcurrencyModel.isVisible = false;
    };
    this.popUpConcurrencyModel.funcHiding = () => {
      this.popUpConcurrencyModel.isVisible = false;
    };
  }

  showPopupMessage(message) {
    this.confirmDialogData.message = message;
    this.confirmDialogData.isVisibleNo = false;
    this.confirmDialogData.isVisibleYes = false;
    this.confirmDialogData.title = this.translateService.instant('AhvBeitrage.Message.Information');
    this.confirmDialogData.funcYes = () => this.buttonClicked('yes');
    this.confirmDialogData.isVisible = true;
  }

  compareObject(object: any, objectCompare: any): boolean {
    return JSON.stringify(object) === JSON.stringify(objectCompare);
  }


  showPopUpSelectDate() {
    this.isClickPopUpDate = true;
    this.getDropDownAnpassung();
  }

  doSaveOrUpdateData() {
    if (this.validateDataForCreateOrUpdate(this.ahvBeitragPositionDetail)) {
      this.isError = false;
      this.ahvBeitragesSandbox.createAhvBeitragePosition(this.createAhvBeitragePositionSave());
    }
  }

  buttonClicked(result) {
    if (result === 'yes') {
      if (this.statusContainer.isDelete) {
        this.deleteItemEmit.emit();
      } else if (this.statusContainer.iscConcurrency) {
        if (this.isCancel) {
          this.isCancel = false;
          this.statusContainer.isEdited = false;
          this.statusContainer.iscConcurrency = false;
          this.statusContainer.isReadOnly = true;
        }
        this.requestListDataGrid.emit();
      } else if (this.statusContainer.isAddNew) {
        this.doCancelEmit.emit(true);
      } else if (this.statusContainer.isBetrageAnpassen) {
        if (this.statusContainer.isBetrageAnpassenAddNew) {
          this.confirmYesBetrageAnpassen.emit();
        } else {
          this.ahvBeitragPositionDetail = { ... this.ahvBeitragPositionDetailTemplate };
        }
      } else {
        this.findItemByPostionId.emit();
        this.statusContainer.isReadOnly = true;
        this.statusContainer.isAddNew = false;
        this.statusContainer.isEdited = false;
      }
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      this.navigateAwaySelection$.next(true);
      this.canDeactivateEmit.emit(true);
    } else {
      if (this.isGetDateError) {
        this.confirmDialogData.isVisible = false;
        this.isGetDateError = false;
        this.isClickPopUpDate = false;
        this.visiblePopUpDate = true;
      } else if (this.statusContainer.isDeleteError) {
        this.confirmDialogData.isVisible = false;
        this.statusContainer.isDeleteError = false;
      }
      this.navigateAwaySelection$.next(false);
      this.canDeactivateEmit.emit(false);
    }
    this.confirmDialogData.isVisible = false;
    this.actionUpdateStatus.emit(this.statusContainer);
    this.checkEnableButtonBewilligung(this.ahvBeitragPositionDetail);
  }

  validateDataForCreateOrUpdate(data: AHVBeitragPosition) {
    const error = {
      isError : true,
      message : this.translateService.instant('AhvBeitrage.MessageError.InValidFormData')
    };
    if (!this.checkValidationGrid()) {
      return false;
    }
    if (!data.bgPositionsartID || data.bgPositionsartID < 0) {
      this.remainingMessageEmit.emit(error);
      return false;
    }
    if (isNullOrUndefined(data.betrag)) {
      this.remainingMessageEmit.emit(error);
      return false;
    }

    if ((data.betrag > this.valueMaxValidateBetrag || data.betrag < this.valueMinValidateBetrag
      || (data.datumBis && this.compareBettwenDate(new Date(data.datumVon), new Date(data.datumBis)))
      || !this.compareBettwenDate(data.datumVon, '1753-01-01')
      || !this.compareBettwenDate(data.datumVon, this.BgSilAHVBeitrag.finanzplanVon)
      || this.compareBettwenDate(data.datumVon, this.BgSilAHVBeitrag.finanzplanBis)) && data.datumVon) {
        this.remainingMessageEmit.emit(error);
      return false;
    }

    if (isNullOrUndefined(this.ahvBeitragPositionDetail.bemerkung)
      || this.ahvBeitragPositionDetail.bemerkung === '') {
      for (const item of this.listSqlQueryShPositionTyp) {
        if (item.bgPositionsartID === this.ahvBeitragPositionDetail.bgPositionsartID) {
          this.ahvBeitragPositionDetail.buchungstext = item.name;
        }
      }
    }
    return true;
  }

  canDeactivate() {
    if (!this.statusContainer.isReadOnly && this.isFormEdited()) {
      this.confirmDialogData.isVisible = true;
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

  compareBettwenDate(start, end) {
    return start >= end;
  }

  getDropDownAnpassung() {
    if (!this.BgSilAHVBeitrag) {
      return;
    }
    const dropDownAnpassungRequestData = {
      DatumVon: this.BgSilAHVBeitrag.finanzplanVon ? this.BgSilAHVBeitrag.anpassenVon : '',
      DatumBis: this.BgSilAHVBeitrag.finanzplanBis ? this.BgSilAHVBeitrag.anpassenBis : '',
    };
    this.ahvBeitragesSandbox.getDropDownAnpassung(dropDownAnpassungRequestData);
  }

  onItemDropdownDatePopUpClick($e) {
    this.datePopupSelect = $e.itemData.firstDate;
    this.anpassenVon = $e.itemData.firstDate;
  }

  onItemDropdownClick(event) {
    if (event.$e.itemData[event.field]) {
      this.ahvBeitragPositionDetail[event.field] = event.$e.itemData[event.field];
      if (event.field === 'baPersonID') {
        this.ahvBeitragPositionDetail.nameVorname = event.$e.itemData.nameVorname;
      } else if (event.field === 'bgPositionsartID') {
        this.ahvBeitragPositionDetail.bgPositionsartTitle = event.$e.itemData.text;
      }
    }
  }

  buttonPopUpClicked($e) {
    if ($e === 'ok') {
      if (this.typeCreateNew === 1) {
        this.createNew();
      }
      this.statusContainer.isBetrageAnpassen = true;
      this.filterDataByDate.emit();
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: true,
        }
      );
    } else {
      this.bAnpassen = true;
      this.statusContainer.isBetrageAnpassen = false;
      this.isClickPopUpDate = false;
      this.visiblePopUpDate = false;
      this.statusContainer.isReadOnly = true;
      this.statusContainer.isAddNew = false;
      this.actionUpdateStatus.emit(this.statusContainer);
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
    }
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }

  createAhvBeitragePositionSave() {
    const ahvBeitragePositionSave = {
      buchungstext: this.ahvBeitragPositionDetail.buchungstext,
      anpassenVon: this.anpassenVon,
      bgBudgetID: this.ahvBeitragPositionDetail.bgBudgetID,
      baPersonID: this.ahvBeitragPositionDetail.baPersonID,
      bgPositionsartID: this.ahvBeitragPositionDetail.bgPositionsartID,
      betrag: this.ahvBeitragPositionDetail.betrag,
      datumVon: (this.statusContainer.isBetrageAnpassen && !this.ahvBeitragPositionDetail.datumVon) ? this.datePopupSelect : this.ahvBeitragPositionDetail.datumVon,
      datumBis: this.datePipe.transform(this.ahvBeitragPositionDetail.datumBis, 'yyyy-MM-dd'),
      bemerkung: (this.ahvBeitragPositionDetail.bemerkung) ? this.ahvBeitragPositionDetail.bemerkung : '',
      baInstitutionID: this.ahvBeitragPositionDetail.baInstitutionID,
      bgPositionTS: this.ahvBeitragPositionDetail.bgPositionTS,
      bAnpassen: this.bAnpassen,
      bgPositionsartTitle: (this.ahvBeitragPositionDetail.bgPositionsartTitle) ? this.ahvBeitragPositionDetail.bgPositionsartTitle : '',
      finanzplanVon: this.BgSilAHVBeitrag.finanzplanVon,
      bgKategorieCode: (this.statusContainer.isAddNew || this.statusContainer.isBetrageAnpassen) ? 2 : this.ahvBeitragPositionDetail.bgKategorieCode,
      bgPositionID: (this.statusContainer.isAddNew || this.statusContainer.isBetrageAnpassen) ? null : this.ahvBeitragPositionDetail.bgPositionID,
      bgBewilligungStatusCode: this.ahvBeitragPositionDetail.bgBewilligungStatusCode,
      bgPositionID_CopyOf: (this.statusContainer.isBetrageAnpassen && !this.statusContainer.isAddNew && !this.statusContainer.isBetrageAnpassenAddNew
          && this.ahvBeitragPositionDetail.bgPositionID) ? this.ahvBeitragPositionDetail.bgPositionID : null
    };
    return ahvBeitragePositionSave;
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
      datumVon: null,
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
}


