import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungConstant } from '@shared/common/fallfuhrung.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import { DxDateBoxComponent, DxValidationGroupComponent, DxValidatorComponent } from 'devextreme-angular';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { copyElement, getRoleLocalStorage } from '../../../../shared/utilites/utilityHelpers';
import { FallfuhrungSandbox } from '../fallfuhrung.sandbox';
import {
  ModelGetDataCombobox,
  ModelGetFaLeistung,
  ModelQueryGetConfig,
  ModelQueryGetLOVName,
  ModelQueryUpdateFaleistung,
  ModelQueryValidationFaLeistung,
} from '../models';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
@Component({
  selector: 'kiss-fallfuhrung',
  templateUrl: './fallfuhrung.component.html',
  styleUrls: ['./fallfuhrung.component.scss']
})
@SetClassRight('CtlFallfuhrung')
export class FallfuhrungComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('datum') dateBox: DxDateBoxComponent;
  @ViewChild('datumAbsch') datumAbsch: DxDateBoxComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [null, this.AdditionalButtons.splice(7, 1)];
  initialCustomizeBtn = [
    {
      text: 'Fallfuhrung.Toolbar.FallWieder',
      visible: false,
      name: 'fallwieder'
    },
    {
      text: 'Fallfuhrung.Toolbar.Bearbeiten',
      visible: true,
      name: 'bearbeiten',
      disabled: undefined
    },
    {
      text: 'Fallfuhrung.Toolbar.Speichern',
      visible: false,
      name: 'speichern',
      disabled: undefined
    },
    {
      text: 'Fallfuhrung.Toolbar.Abbrechen',
      visible: false,
      name: 'abbrechen'
    },
  ];
  customizeBtn = this.cloneArray(this.initialCustomizeBtn);
  //#region "Declare variables for toolbarControl"
  isNavbar: boolean;
  //#endregion

  //#region "Declare variables for another bussiness"
  pageTitle: string;
  visibleEditBtn = true;
  visibleSaveBtn = false;
  visibleCancelBtn = false;
  modelQueryConfig: ModelQueryGetConfig = new ModelQueryGetConfig();
  faleistung: ModelGetFaLeistung = new ModelGetFaLeistung();
  _faLeistungID: number;
  _canUpdate = true;
  dataComboboxKontaktveranl: ModelGetDataCombobox[] = [];
  dataComboboxGrund: ModelGetDataCombobox[] = [];
  dataComboboxGemeinde: ModelGetDataCombobox[] = [];
  dataComboboxAnmeldeart: ModelGetDataCombobox[] = [];
  lovNameKontaktveranl: string;
  lovNameGrund: string;
  lovNameGemeinde: string;
  modelQueryUpdate: ModelQueryUpdateFaleistung = new ModelQueryUpdateFaleistung();
  modelQueryComboboxKontaktveranl: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  modelQueryComboboxGrund: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  modelQueryComboboxGemeinde: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  modelQueryComboboxAnmeldeart: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  panelAnmeldeart = false;
  userRole: any;
  isReadOnly = true;
  isReadOnlyControl = false;
  isEditMode = false;
  datumVonTmp: Date;
  isDatumVonModified = false;
  accessKeyItemFocused = 0;
  keyFocus: string;
  bemekungTmp: string;
  isVisibleFallWieder = false;
  isChangeDataConcurrent = false;
  isClosed = true;
  keyInput: string;
  popupDataMess = {
    visible: false,
    message: '',
    title: this.translateService.instant('Fallfuhrung.PopupMessage.Title'),
    key: '',
    yes: this.translateService.instant('Fallfuhrung.PopupMessage.Yes'),
    no: '',
  };
  isShiftKeyDown = false;
  isLoadData = false;
  messageErr = null;
  isErrorClosed = false;
  modelQueryValidationFaLeistung: ModelQueryValidationFaLeistung = new ModelQueryValidationFaLeistung();
  private subscriptions: Subscription[] = [];
  xUser: any;
  minDate = new Date(1753, 0, 1);
  editor: any;
  faleistungTmp: ModelGetFaLeistung = new ModelGetFaLeistung();
  readonly setTimeOut: number = CommonConstant.SetTimeOut;
  personInfo: string;
  valueChange: string;
  froalaEditorConfig = {
    heightMin: 150,
    height: 280,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        this.handleTextarea();
      },
    }
  };
  popupConcurrency = {
    title: this.translateService.instant('Fallfuhrung.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('Fallfuhrung.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('Fallfuhrung.PopupConfirm.Daten'),

  };
  isClickCloseButton = false;
  concurrency: string;
  popUpModel: PopUpModel;
  messageCanDeactive: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  information = 'information';
  maxDate = new Date(9999, 11, 31);

  widthDateBox = CommonConstant.WidthNumberAndDateBox;
  isConfirmFallWieder = false;
  //#endregion

  constructor(
    injector: Injector,
    public FallfuhrungsSandbox: FallfuhrungSandbox,
    public utilService: UtilService,
    public translateService: TranslateService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public layoutSandbox: LayoutSandbox,
    public router: Router) {
    super(injector);
  }
  ngOnInit() {
    this.setTitle(FallfuhrungConstant.PAGETITLE);
    this.initPopUpModel();
    this.checkRole('CtlFaPeriodeReopen');
    this.xUser = JSON.parse(sessionStorage.getItem('user:Xuser'));
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.initData();
    this.initFunction();
    this.registerEvents();
  }

  ngOnDestroy() {
    this.FallfuhrungsSandbox.resetFallfuhrungState();
    this.unregisterEvents();
  }

  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  //#region "registerEvents function"
  private registerEvents(): void {
    // Register subscribe for selected person
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (!isNullOrUndefined(person)) {
          this.pageTitle = person.titleText + ' > ';
          this.personInfo = person.titleText;
        }
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          if (this._faLeistungID !== selectedNode.faLeistungID) {
            this._faLeistungID = selectedNode.faLeistungID;
            // Get data Fallfuhrung
            this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
            this.modeView();
          }
        }
      })
    );
    // Register subscribe for load config
    this.subscriptions.push(this.FallfuhrungsSandbox.ConfigData$.subscribe(data => {
      if (data && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(data);
        return;
      }
      if (isNullOrUndefined(data) || isNullOrUndefined(data.value)) {
        return;
      }

      if (data.value) {
        this.panelAnmeldeart = true;
        return;
      }
      this.panelAnmeldeart = false;
    }));

    // Register subscribe for load data Faleistung
    this.subscriptions.push(this.FallfuhrungsSandbox.FallfuhrungData$.subscribe(dataFaleistung => {
      if (dataFaleistung && dataFaleistung.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataFaleistung);
        return;
      }
      if (isNullOrUndefined(dataFaleistung)) {
        return;
      }
      if (dataFaleistung.length === 0) {
        this.setDeleteMode();
        return;
      }
      if (dataFaleistung.length === 1) {
        this.faleistungTmp = { ...dataFaleistung[0] };
        this.focusDateBox();
        this.isLoadData = true;
        this.datumVonTmp = dataFaleistung[0].datumVon;
        this.faleistung = dataFaleistung[0];
        this.FallfuhrungsSandbox.loadFallRightsData(dataFaleistung[0].faLeistungID);
      }
    }));

    // Register subscribe for load data fall rights
    this.subscriptions.push(this.FallfuhrungsSandbox.FallRightsData$.subscribe(dataFallRight => {
      if (!isNullOrUndefined(dataFallRight) && !isNullOrUndefined(dataFallRight.mayClose)) {
        if (dataFallRight.mayClose) {
          let open = false;
          if (isNullOrUndefined(this.faleistung.datumBis)) {
            open = true;
          }
          let archived = true;
          if (isNullOrUndefined(this.faleistung.faLeistungArchivID)) {
            archived = false;
          }
          this._canUpdate = open;
          if (open === false && archived === false && dataFallRight.mayClose === true && this.checkRole('CtlFaPeriodeReopen') === true) {
            this.customizeBtn[0].visible = true;
            this.customizeBtn[1].disabled = true;
            this.customizeBtn = [...this.customizeBtn];
            this.isVisibleFallWieder = true;
          } else {
            this.setVisibleBtn();
          }
          if (open) {
            this.isReadOnly = false;
          } else {
            this.isReadOnly = true;
          }
        } else {
          this._canUpdate = false;
          this.customizeBtn[0].visible = false;
          this.customizeBtn = [...this.customizeBtn];
          this.isReadOnly = true;
          this.isVisibleFallWieder = false;
        }
        this.isReadOnlyControl = !this._canUpdate;
        this.isReadOnly = !this._canUpdate;
      }

    }));

    // Register subscribe for load data combobox Kontaktveranl
    this.subscriptions.push(this.FallfuhrungsSandbox.KontaktveranlData$.subscribe(dataKontaktveranl => {
      if (dataKontaktveranl && dataKontaktveranl.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataKontaktveranl);
        return;
      }

      if (isNullOrUndefined(dataKontaktveranl)) {
        return;
      }

      dataKontaktveranl.forEach(item => {
        if (item.isActive) {
          this.dataComboboxKontaktveranl.push(item);
        }
      });

    }));

    // Register subscribe for load data combobox Grund
    this.subscriptions.push(this.FallfuhrungsSandbox.GrundData$.subscribe(dataGrund => {
      if (dataGrund && dataGrund.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataGrund);
        return;
      }

      if (isNullOrUndefined(dataGrund)) {
        return;
      }

      dataGrund.forEach(item => {
        if (item.isActive) {
          this.dataComboboxGrund.push(item);
        }
      });

    }));

    // Register subscribe for load data combobox Gemeinde
    this.subscriptions.push(this.FallfuhrungsSandbox.GemeindeData$.subscribe(dataGemeinde => {
      if (dataGemeinde && dataGemeinde.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataGemeinde);
        return;
      }

      if (isNullOrUndefined(dataGemeinde)) {
        return;
      }

      dataGemeinde.forEach(item => {
        if (item.isActive) {
          this.dataComboboxGemeinde.push(item);
        }
      });

    }));

    // Register subscribe Update FaLeistung
    this.subscriptions.push(this.FallfuhrungsSandbox.UpdateFaLeistungData$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (!isNullOrUndefined(data.value) && data.value) {
        this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
        this.fallfuhrungTreeSandbox.changeTreeNodeUpdateState(true);
        this.fallfuhrungTreeSandbox.getIconMoudle(this.faleistung.baPersonID.toString(), '');
        this.configMode();
        return;
      }
      this.updateHandleError(data);
    }));

    // Register subscribe for load data combobox Anmeldeart
    this.subscriptions.push(this.FallfuhrungsSandbox.AnmeldeartData$.subscribe(dataAnmeldeart => {
      if (dataAnmeldeart && dataAnmeldeart.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataAnmeldeart);
        return;
      }

      if (isNullOrUndefined(dataAnmeldeart)) {
        return;
      }

      dataAnmeldeart.forEach(item => {
        if (item.isActive) {
          this.dataComboboxAnmeldeart.push(item);
        }
      });

    }));

    this.subscriptions.push(this.fallfuhrungTreeSandbox.loadMessage$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      this.handleActionPopup(this.information, data.message);
    }));

    // Register subscribe for load data AnzahlOffenePendenzen
    this.subscriptions.push(this.FallfuhrungsSandbox.AnzahlOffenePendenzenData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data > 0 && !isNullOrUndefined(this.faleistung.datumBis)) {
          this.showDiaglogMessage(this.translateService.instant('Fallfuhrung.MessageError.SaveMessageFirstError') + data + this.translateService.instant('Fallfuhrung.MessageError.SaveMessageLastError'));
        } else {
          this.UpdateFaleistung();
        }
      }
    }));

    // Register subscribe for load data ValidationFaLeistung
    this.subscriptions.push(this.FallfuhrungsSandbox.ValidationFaLeistungData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (!isNullOrUndefined(data.value) && data.value) {
          this.getAnzahOffenePendenzen();
        }
        if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
          this.updateHandleError(data);
        }
      }
    }));
  }

  // Update handle error
  updateHandleError(data: any) {
    switch (data.status) {
      case AppEnums.StatusCode.BAD_REQUEST:
        this.faleistung.datumBis = null;
        this.handleActionPopup(this.information, JSON.parse(data._body).message);
        break;

      case AppEnums.StatusCode.STATUS_CODE_409:
        const message = JSON.parse(data._body).message.toString();
        message.replace('\r\n', '<br>');
        this.showDiaglogConcurrency(message);
        break;

      default:
        break;
    }
  }

  initFunction() {
    // Get data config
    this.FallfuhrungsSandbox.loadConfigData(this.modelQueryConfig);
    // Get data cbb Kontaktveranl, Grund, Gemeinde
    this.FallfuhrungsSandbox.loadKontaktveranlData(this.modelQueryComboboxKontaktveranl.lOVName);
    this.FallfuhrungsSandbox.loadGrundData(this.modelQueryComboboxGrund.lOVName);
    this.FallfuhrungsSandbox.loadGemeindeData(this.modelQueryComboboxGemeinde.lOVName);
    this.FallfuhrungsSandbox.loadAnmeldeartData(this.modelQueryComboboxAnmeldeart.lOVName);
    // Get data Fallfuhrung
    this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
  }

  initData() {
    // Get config data
    this.modelQueryConfig.keyPath = 'System\\Fallfuehrung\\ErweitereFallverlaufMaske';
    this.modelQueryConfig.defaultValue = false;
    // Model query data cbb Kontaktveranl, Grund, Gemeinde, Anmeldeart
    this.modelQueryComboboxKontaktveranl.lOVName = 'FaKontaktveranlasser';
    this.modelQueryComboboxGrund.lOVName = 'Abschlussgrund';
    this.modelQueryComboboxGemeinde.lOVName = 'GemeindeSozialdienst';
    this.modelQueryComboboxAnmeldeart.lOVName = 'FaAnmeldeart';
    const modelGetDataCombobox = new ModelGetDataCombobox();
    modelGetDataCombobox.text = '';
    this.dataComboboxKontaktveranl.push(modelGetDataCombobox);
    this.dataComboboxGrund.push(modelGetDataCombobox);
    this.dataComboboxGemeinde.push(modelGetDataCombobox);
    this.dataComboboxAnmeldeart.push(modelGetDataCombobox);
  }
  //#endregion

  onClickEditBtnGrdTop() {
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = true;
    this.customizeBtn[3].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.isEditMode = true;
    this.isLoadData = false;
    this.handleTextarea();
    this.focusDateBox();
    this.isReadOnly = false;
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: true,
      }
    );
    this.isErrorClosed = false;
  }
  onClickCancelBtnGrdTop() {
    if (this.concurrency === CommonConstant.Concurrency) {
      this.concurrency = '';
      this.getFaleistungData();
      this.modeView();
      this.setFocusOutDateBox();
    } else {
      if (this.isModifyData() || (this.validationGroup.instance.validate() && !this.validationGroup.instance.validate().isValid)) {
        this.handleActionPopup('onClickCancelBtnGrdTop', this.translateService.instant('Fallfuhrung.PopupConfirm.Message'));
      } else {
        this.modeView();
      }
    }
  }

  modeView() {
    if (this.isVisibleFallWieder === true) {
      this.customizeBtn[0].visible = true;
      this.customizeBtn[1].disabled = true;
    } else {
      this.customizeBtn[0].visible = false;
    }
    this.customizeBtn[1].visible = true;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = false;
    this.customizeBtn[2].disabled = false;
    this.customizeBtn = [...this.customizeBtn];
    this.isEditMode = false;
    this.isReadOnly = true;
    this.handleTextarea();
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.isErrorClosed = false;
    if (this.dateBox) {
      this.dateBox.isValid = true;
    }
    if (this.datumAbsch) {
      this.datumAbsch.isValid = true;
    }
  }

  UpdateFaleistung() {
    if (!this.isVisibleFallWieder) {
      const postFaLeistung: ModelQueryUpdateFaleistung = {
        isDatumVonModified: this.isDatumVonModified,
        baPersonID: this.faleistung.baPersonID,
        datumVon: this.faleistung.datumVon ? this.faleistung.datumVon : null,
        faLeistungID: this._faLeistungID,
        datumBis: this.faleistung.datumBis ? this.faleistung.datumBis.toDateString() : null,
        gemeindeCode: this.faleistung.gemeindeCode,
        abschlussGrundCode: this.faleistung.abschlussGrundCode,
        bemerkung: this.faleistung.bemerkung ? this.faleistung.bemerkung.toString().trim() : '',
        faAufnahmeartCode: this.faleistung.faAufnahmeartCode,
        faKontaktveranlasserCode: this.faleistung.faKontaktveranlasserCode,
        modulID: this.faleistung.modulID,
        faLeistungTS: this.faleistung.faLeistungTS
      };
      this.FallfuhrungsSandbox.updateFaLeistungData(postFaLeistung);
    }
  }

  toolBarOnItemClick($event) {
    switch ($event) {
      case 'bearbeiten': {
        this.onClickEditBtnGrdTop();
        return;
      }
      case 'speichern': {
        this.getValidationFaLeistung();
        return;
      }
      case 'abbrechen': {
        this.onClickCancelBtnGrdTop();
        return;
      }
      case 'deleteMenuItemTopGrd': {
        this.isErrorClosed = true;
        this.messageErr = this.translateService.instant('Fallfuhrung.MessageError.DeleteMessageError');
        return;
      }
      case 'fallwieder': {
        this.handleActionPopup('fallwieder', this.translateService.instant('Fallfuhrung.PopupConfirm.MessageFallWieder'));
        return;
      }
      default:
        break;
    }
  }

  checkRole(name: any) {
    this.userRole = getRoleLocalStorage(name);
    if (!isNullOrUndefined(this.userRole) && !isNullOrUndefined(this.userRole.IsRead)) {
      return this.userRole.IsRead;
    }
  }

  // Shortcuts key
  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && !this.isReadOnly) {
      event.preventDefault();
      this.setKeyUpDateBox();
      setTimeout(() => {
        this.getValidationFaLeistung();
      }, this.setTimeOut);
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ && !this.isReadOnly) {
      event.preventDefault();
      this.setKeyUpDateBox();
      setTimeout(() => {
        this.onClickCancelBtnGrdTop();
      }, this.setTimeOut);
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
    if (this.isEditMode && this.keyFocus !== 'bemerkung' && !this.isVisibleFallWieder) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      this.isErrorClosed = true;
      this.messageErr = this.translateService.instant('Fallfuhrung.MessageError.DeleteMessageError');
    }
  }

  // Shortcuts key
  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === 16 || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }

  // Check Showed popup
  onShownPopUp() {
    if (!document.getElementById('d001_popup-confirm_ja')) {
      return;
    }
    const value = document.getElementById('d001_popup-confirm_ja');
    value.focus();
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.faleistung.baPersonID.toString();
      this.handleActionPopup(this.information, this.translateService.instant('Fallfuhrung.Message.ShiftClickMessage') + ' (' + 'ID=' + this.faleistung.baPersonID + ')');
    } else {
      text = this.personInfo;
      this.handleActionPopup(this.information, this.translateService.instant('Fallfuhrung.Message.DoubleClickMessage'));
    }
    copyElement(text);
  }

  onChangeData(event, key: string) {
    if (key === 'DatumVon') {
      if (this.datumVonTmp !== event.value) {
        this.isDatumVonModified = true;
      } else {
        this.isDatumVonModified = false;
      }
    }
    if (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid) {
      this.isErrorClosed = false;
    }
  }

  // Handle close/refresh the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isModifyData()) {
      return false;
    }
  }

  onFocusIn(element, field: string, key) {
    if (this.isEditMode) {
      this.keyFocus = field;
      this.keyInput = key;
      if (!this.panelAnmeldeart && field === 'DatumVon') {
        this.accessKeyItemFocused = 8;
      } else {
        this.accessKeyItemFocused = element.accessKey;
      }
    }
  }

  onFocusOut() {
    this.accessKeyItemFocused = 0;
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
          if (!this.panelAnmeldeart && this.keyFocus === 'DatumAbsch') {
            if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 3) {
              (el as HTMLElement).focus();
              return;
            }
          } else if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            (el as HTMLElement).focus();
            return;
          }
        }
      }
    }
  }

  focusDateBox() {
    if (!isNullOrUndefined(this.dateBox) && !isNullOrUndefined(this.dateBox.instance)) {
      setTimeout(() => {
        this.dateBox.instance.focus();
      }, 300);
    }
  }

  // Onkey Down
  onKeyDown(e) {
    if (!this.isEditMode && this.isVisibleFallWieder) {
      return;
    }

    if (!(this.keyInput === 'selectbox' || this.keyInput === 'datebox')) {
      return;
    }

    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      if (!(e.component.option('opened'))) {
        e.event.preventDefault();
        e.component.open();
        return;
      }
      e.component.close();
      return;
    }
    if (this.isClosed && this.keyInput !== 'selectbox') {
      this.dispatchArrowKey(e.event.keyCode);
    }

  }

  dispatchArrowKey(keyCode) {
    if (keyCode === AppEnums.KeyCode.UpArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowUp',
      });
      document.dispatchEvent(em);
    } else if (keyCode === AppEnums.KeyCode.DownArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowDown',
      });
      document.dispatchEvent(em);
    }
  }
  showDiaglogMessage(message: string) {
    this.popupDataMess.visible = true;
    this.popupDataMess.message = message;
  }

  getValueTextArea(e) {
    this.onChangeData(e, 'textarea');
  }

  getFaleistungData() {
    this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
  }

  onClosed() {
    this.isClosed = true;
  }

  onOpened() {
    this.isClosed = false;
  }

  onCloseError() {
    this.isErrorClosed = false;
  }
  getValidationFaLeistung() {
    if (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid) {
      this.getModelQueryValidation();
      this.FallfuhrungsSandbox.validationFaLeistungData(this.modelQueryValidationFaLeistung);
    } else {
      this.isErrorClosed = true;
      this.messageErr = this.translateService.instant('Fallfuhrung.MessageValidation.Validate');
    }
    this.setFocusOutDateBox();
  }
  getModelQueryValidation() {
    this.modelQueryValidationFaLeistung.isDatumVonModified = this.isDatumVonModified;
    this.modelQueryValidationFaLeistung.datumVon = this.faleistung.datumVon ? this.faleistung.datumVon : null;
    this.modelQueryValidationFaLeistung.datumBis = this.faleistung.datumBis ? this.faleistung.datumBis.toDateString() : null;
    this.modelQueryValidationFaLeistung.faLeistungID = this._faLeistungID;
    this.modelQueryValidationFaLeistung.baPersonID = this.faleistung.baPersonID;
  }

  getAnzahOffenePendenzen() {
    this.FallfuhrungsSandbox.loadAnzahlOffenePendenzenData(this._faLeistungID);
  }

  isModifyData(): boolean {
    if (JSON.stringify(this.faleistung) !== JSON.stringify(this.faleistungTmp)) {
      return true;
    }
    return false;
  }

  popupConcurrencyAbbrechen(result) {
    this.isChangeDataConcurrent = true;
    this.isClickCloseButton = true;
    if (result === 'abbrechen') {
      this.concurrency = CommonConstant.Concurrency;
      this.customizeBtn[2].disabled = true;
      this.customizeBtn = [...this.customizeBtn];
    }
    if (result === 'daten') {
      this.getFaleistungData();
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
    this.popupConcurrency.message = message;
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

  showPopup(message, popupType?) {
    this.popUpModel.message = message;
    this.popUpModel.isVisible = true;
    switch (popupType) {
      case this.information:
        this.popUpModel.isVisibleNo = false;
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.title = this.translateService.instant('Fallfuhrung.PopupMessage.Title');
        break;
      case 'NavigatorPopup':
        this.popUpModel.textYes = this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Yes');
        this.popUpModel.textNo = this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.No');
        this.popUpModel.title = this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Title');
        break;
      default:
        this.popUpModel.textYes = this.translateService.instant('Fallfuhrung.PopupConfirm.Yes');
        this.popUpModel.textNo = this.translateService.instant('Fallfuhrung.PopupConfirm.No');
        this.popUpModel.title = this.translateService.instant('Fallfuhrung.PopupConfirm.Title');
        break;
    }
  }

  handleActionPopup(key, message: string) {
    this.initPopUpModel();
    switch (key) {
      case 'onClickCancelBtnGrdTop':
        this.popUpModel.funcYes = () => {
          this.getFaleistungData();
          this.modeView();
          this.popUpModel.isVisible = false;
          this.setFocusOutDateBox();
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message);
        break;
      case 'fallwieder':
        this.popUpModel.funcYes = () => {
          this._canUpdate = true;
          this.faleistung.datumBis = null;
          this.isVisibleFallWieder = false;
          this.UpdateFaleistung();
          this.popUpModel.isVisible = false;
          this.isConfirmFallWieder = true;
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message);
        break;
      case 'onNavigate':
        this.popUpModel.funcYes = () => {
          this.isEditMode = false;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
          this.navigateAwaySelection$.next(true);
          this.popUpModel.isVisible = false;
        };
        this.popUpModel.funcNo = () => {
          this.layoutSandbox.clearDeletingSticky();
          this.navigateAwaySelection$.next(false);
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message, 'NavigatorPopup');
        break;
      case this.information:
        this.showPopup(message, this.information);
        break;
      default:
        break;
    }

  }

  canDeactivate() {
    if (this.isModifyData()) {
      this.handleActionPopup('onNavigate', this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Message'));
      return this.navigateAwaySelection$;
    } else {
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
      return true;
    }
  }

  onPopupHiding() {
    this.UpdateFaleistung();
    this.popupDataMess.visible = false;
  }

  handleTextarea() {
    if (isNullOrUndefined(this.editor)) {
      return;
    }
    if (!this.isEditMode) {
      this.editor.edit.off();
      return;
    }
    this.editor.edit.on();
  }


  setVisibleBtn() {
    if (this.customizeBtn[0].visible) {
      if (!this.faleistung.datumBis) {
        this.customizeBtn = this.cloneArray(this.initialCustomizeBtn);
        this.isVisibleFallWieder = false;
        return;
      }
      this.customizeBtn[1].disabled = true;
      this.customizeBtn = [...this.customizeBtn];
      return;
    }
    this.customizeBtn[1].disabled = false;
    this.customizeBtn = [...this.customizeBtn];
    this.isVisibleFallWieder = false;
  }

  setDeleteMode() {
    if (this.isChangeDataConcurrent) {
      this.isChangeDataConcurrent = false;
      this.faleistung = new ModelGetFaLeistung();
      this.isEditMode = false;
      this.listBtn = [];
      this.customizeBtn = [];
      this.isReadOnly = true;
    }
  }

  setKeyUpDateBox() {
    this.dateBox.valueChangeEvent = 'keyup';
    this.datumAbsch.valueChangeEvent = 'keyup';
  }

  setFocusOutDateBox() {
    this.dateBox.valueChangeEvent = 'focusout';
    this.datumAbsch.valueChangeEvent = 'focusout';
  }

  configMode() {
    if (this.isConfirmFallWieder) {
      this.isConfirmFallWieder = false;
      this.onClickEditBtnGrdTop();
      return;
    }
    this.modeView();
  }

  onContentReady(e, key) {
    switch (key) {
      case 'kontaktveranl':
        if (this.faleistung.faKontaktveranlasserCode === null) {
          e.component.option('value', this.dataComboboxKontaktveranl[0].code);
        }
        break;
      case 'anmeldeart':
        if (this.faleistung.faAufnahmeartCode === null) {
          e.component.option('value', this.dataComboboxAnmeldeart[0].code);
        }
        break;
      case 'grund':
        if (this.faleistung.abschlussGrundCode === null) {
          e.component.option('value', this.dataComboboxGrund[0].code);
        }
        break;
      case 'gemeinde':
        if (this.faleistung.gemeindeCode === null || this.faleistung.gemeindeCode === 351) {
          e.component.option('value', this.dataComboboxGemeinde[0].code);
        }
        break;

      default:
        break;
    }
  }

  cloneArray(arrSource) {
    const array = [];
    for (let index = 0; index < arrSource.length; index++) {
      const element = arrSource[index];
      array.push(Object.assign({}, element));
    }
    return array;
  }
}
