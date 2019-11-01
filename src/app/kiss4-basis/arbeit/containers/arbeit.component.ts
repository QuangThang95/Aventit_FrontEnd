import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { BarPerSon, BerufSuchen, InstitutionSuchen, LOVName } from './../models/arbeit.model';
import { ArbeitConstant } from './../../../../shared/common/arbeit.common';
import { Component, ViewChild, OnInit, HostListener, Injector, OnDestroy, AfterViewInit } from '@angular/core';
import { getUserIdFromLocalStorage, getLanguageCodeNumberFromLocalStorage } from '@shared/utilites';
import { Router } from '@angular/router';
import { DxDataGridComponent, DxDateBoxComponent, DxDropDownBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import {
  isArrowKey,
  isPressedBackSpace,
  isPressedTabKey,
  setFactionSize,
} from '@shared/utilites/currencyHelper';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxSelectBoxComponent } from 'devextreme-angular/ui/select-box';
import { BaseComponent } from '@shared/components/base.component';
import { Subscription } from 'rxjs/Subscription';
import { isString, isNullOrUndefined } from 'util';
import { UtilService } from '@shared/utilites/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { ArbeitSandbox } from '@app/kiss4-basis/arbeit/arbeit.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { AppEnums } from '@shared/AppEnum';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-arbeit',
  templateUrl: './arbeit.component.html',
  styleUrls: ['./arbeit.component.scss']
})
export class ArbeitComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild('gridErlernterBeruf') gridErlernterBeruf: DxDataGridComponent;
  @ViewChild('gridBeruf') gridBeruf: DxDataGridComponent;
  @ViewChild('gridArbeitgeber') gridArbeitgeber: DxDataGridComponent;
  @ViewChild('erwerbssituationStatus1Code') erwerbssituationStatus1Code: DxSelectBoxComponent;
  @ViewChild('stempelDatum') stempelDatum: DxDateBoxComponent;
  @ViewChild('ausgesteuertDatum') ausgesteuertDatum: DxDateBoxComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('erlernterBeruf') erlernterBeruf: DxDropDownBoxComponent;
  @ViewChild('beruf') beruf: DxDropDownBoxComponent;
  @ViewChild('arbeitgeber') arbeitgeber: DxDropDownBoxComponent;
  @ViewChild('arbeitEdit') arbeitEdit: any;

  caret: any;
  arbeitModel: BarPerSon = new BarPerSon();
  arbeitLastModel: BarPerSon = new BarPerSon();
  berufSuchens: BerufSuchen[];
  institutionSuchens: InstitutionSuchen[];
  pageTitle: string;
  titleForm: string;
  isErrorClosed = false;
  popUpModel: PopUpModel;
  popUpConcurrencyModel: PopUpModel;
  disableBtnAfterConcurrency = true;
  messageErr = false;
  isViewMode = true;
  isEditMode = false;
  isVisible = false;
  isUpdateConflicted = false;
  arbeitErwerbssituation1: LOVName[];
  arbeitErwerbssituation2: LOVName[];
  arbeitErwerbssituation3: LOVName[];
  arbeitErwerbssituation4: LOVName[];
  arbeitBeschaeftigungsgrad: LOVName[];
  arbeitGrundteilzeit1: LOVName[];
  arbeitGrundteilzeit2: LOVName[];
  arbeitBranche: LOVName[];
  arbeitAusbildungstyp: LOVName[];
  arbeitIntegrationsstand: LOVName[];
  arbeitNichtbekannt: LOVName[];
  messageCanDeactive: any;
  selectedID: any;
  listBtn = [];
  isShowServerSaveError = false;

  customizeBtn = [
    {
      text: 'Arbeit.Button.Edit',
      visible: true,
      disabled: false,
      name: ArbeitConstant.Edit
    },
    {
      text: 'Arbeit.Button.Save',
      visible: false,
      disabled: false,
      name: ArbeitConstant.Save
    },
    {
      text: 'Arbeit.Button.Cancel',
      visible: false,
      disabled: false,
      name: ArbeitConstant.Cancel
    }
  ];
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  barPerSonID: any;
  private subscriptions: Array<Subscription> = [];
  constructor(injector: Injector, public arbeitsSandbox: ArbeitSandbox,
    public utilService: UtilService,
    private router: Router,
    public translateService: TranslateService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.setTitle(ArbeitConstant.PAGETITLE);
    this.initPopUpModel();
    this.initPopUpConcurModel();
  }

  ngAfterViewInit(): void {
    this.registerEvents();
    if (this.barPerSonID) {
      this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: this.barPerSonID });
    }
    this.getLookupCombobox();
    this.messageCanDeactive = this.translateService.instant('Arbeit.Message.ConfirmDeactive');
  }

  OnChanges() {
    this.arbeitModel = new BarPerSon(this.arbeitModel);
  }

  private registerEvents() {
    // Register subscribe for selected person
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        this.titleForm = person.titleText;
        this.pageTitle = `${person.titleText} > ${this.translateService.instant('Arbeit.TitlePage')}`;
      })
    );
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.selectedID = selectedNode.baPersonID;
          this.barPerSonID = selectedNode.baPersonID;
          // Get data
          this.isEditModeVisible(this.isEditMode);
          this.getPersonInfoTitle();
          this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: selectedNode.baPersonID });
        }
      })
    );
    this.subscriptions.push(this.arbeitsSandbox.arbeitsData$.subscribe(arbeit => {
      if (arbeit) {
        this.initModel(arbeit);
        this.arbeitsSandbox.getInstitutionSuchenArbeit();
        this.arbeitsSandbox.getBerufSuchenArbeit({ geschlechtCode: this.arbeitModel.geschlechtCode });
        if (this.isUpdateConflicted) {
          this.isUpdateConflicted = false;
        }
      }
    }));
    this.subscriptions.push(this.arbeitsSandbox.berufArbeitsData$.subscribe(berufArbeitsData => {
      if (Array.isArray(berufArbeitsData)) {
        this.berufSuchens = berufArbeitsData;
      }
    }));
    this.subscriptions.push(this.arbeitsSandbox.institutionArbeitsData$.subscribe(institutionSuchens => {
      if (Array.isArray(institutionSuchens)) {
        this.institutionSuchens = institutionSuchens;
      }
    }));
    this.subscriptions.push(this.arbeitsSandbox.lovNameArbeitsData$.subscribe(lovnames => {
      if (Array.isArray(lovnames) && lovnames.length) {
        const lovnamesFilter = [];
        lovnames.forEach(item => {
          if (item.isActive || item.code === null) {
            lovnamesFilter.push(item);
          }
        });
        this.hanleFillDataCombox(lovnamesFilter);
      }
    }));
    this.subscriptions.push(this.arbeitsSandbox.saveArbeitsData$.subscribe(result => {
      this.hanleSaveArbeit(result);
    }
    ));
  }

  getPersonInfoTitle() {
    this.fallfuhrungTreeSandbox.getPersonInfoTitle(this.barPerSonID, +getUserIdFromLocalStorage(), +getLanguageCodeNumberFromLocalStorage());
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

  initModel(model) {
    this.arbeitModel = Object.assign({}, model);
    this.arbeitLastModel = Object.assign({}, model);
  }

  showComfirmCancel(mess = null) {
    if (this.isEditMode && this.isArbeitModelChanged()) {
      this.initPopUpModel();
      const message = mess ? mess : this.translateService.instant('Arbeit.Message.CancelEditModel');
      if (mess) {
        this.popUpModel.textYes = this.translateService.instant('Klientensystem.Discard');
        this.popUpModel.textNo = this.translateService.instant('Klientensystem.PopupButton.Abbrechen');
      }
      this.popUpModel.funcYes = () => {
        this.messageErr = false;
        this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: this.barPerSonID });
        if (mess) {
          this.doUpdateNodesStatus(false);
          this.navigateAwaySelection$.next(true);
        }
        this.popUpModel.isVisible = false;
        this.isEditModeVisible(false);
        this.doUpdateNodesStatus(false);
        this.arbeitModel = Object.assign({}, this.arbeitLastModel);
      };
      this.popUpModel.funcNo = () => {
        if (mess) {
          this.doUpdateNodesStatus(true);
          this.navigateAwaySelection$.next(false);
        }
        this.popUpModel.isVisible = false;
        this.doUpdateNodesStatus(true);
      };
      this.showPopup(message);
    } else {
      this.isEditModeVisible(false);
      this.messageErr = false;
      this.doUpdateNodesStatus(false);
    }
  }

  showPopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('Arbeit.Message.ComfirmYes');
    this.popUpModel.textNo = this.translateService.instant('Arbeit.Message.ComfirmNo');
    this.popUpModel.title = this.translateService.instant('Arbeit.Message.TitleComfirm');
    this.popUpModel.isVisible = true;
  }

  getLookupCombobox() {
    this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLErwerbssituation);
  }

  hanleFillDataCombox(value) {
    switch (value[0].lovname) {
      case ArbeitConstant.URLErwerbssituation:
        this.arbeitErwerbssituation1 = value;
        this.arbeitErwerbssituation2 = value;
        this.arbeitErwerbssituation3 = value;
        this.arbeitErwerbssituation4 = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLBeschaeftigungsgrad);
        break;
      case ArbeitConstant.URLBeschaeftigungsgrad:
        this.arbeitBeschaeftigungsgrad = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLGrundteilzeit);
        break;
      case ArbeitConstant.URLGrundteilzeit:
        this.arbeitGrundteilzeit1 = value;
        this.arbeitGrundteilzeit2 = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLBranche);
        break;
      case ArbeitConstant.URLBranche:
        this.arbeitBranche = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLAusbildungstyp);
        break;
      case ArbeitConstant.URLAusbildungstyp:
        this.arbeitAusbildungstyp = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLIntegrationsstand);
        break;
      case ArbeitConstant.URLIntegrationsstand:
        this.arbeitIntegrationsstand = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLNichtbekannt);
        break;
      case ArbeitConstant.URLNichtbekannt:
        this.arbeitNichtbekannt = value;
        break;
      default:
        break;
    }
  }

  validateFormValue() {
    this.isShowServerSaveError = true;
  }

  saveArbeit() {
    this.isShowServerSaveError = true;
    if (this.arbeitEdit.validateDataValid()) {
      this.messageErr = false;
    } else {
      this.messageErr = this.translateService.instant('Arbeit.MessageForm.Arbeitszeit');
      return;
    }
    const promise = new Promise(resovel => {
      this.parseIntArbeitModel();
      resovel();
    });
    promise.then(() => {
      this.arbeitsSandbox.saveArbeit(this.arbeitModel);
    });
  }

  checkFormartFloat(value) {
    const valueInteger = (value || '').toString().split('.');
    setFactionSize(valueInteger.lenght ? valueInteger[1].lenght : 0);
  }

  checkInputextIsValid(keyCode) {
    return isArrowKey(keyCode) || isPressedBackSpace(keyCode) || isPressedTabKey(keyCode);
  }

  setValueBeforKeyDown(event) {
    const eventTarget = event.target;
    if (isString(eventTarget.value) && !this.checkInputextIsValid(event.keyCode)) {
      return eventTarget.value.slice(0, eventTarget.selectionStart) + event.key + eventTarget.value.slice(eventTarget.selectionStart);
    }
    return eventTarget.value;
  }

  parseIntArbeitModel() {
    if (this.arbeitModel.wieOftArbeitslos && this.arbeitModel.arbeitszeit) {
      this.arbeitModel.wieOftArbeitslos = (this.arbeitModel.wieOftArbeitslos);
      this.arbeitModel.arbeitszeit = (this.arbeitModel.arbeitszeit);
    }
  }

  hanleSaveArbeit(value) {
    if (Array.isArray(value)) {
      this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: this.barPerSonID });
      this.isEditModeVisible(false);
    } else {
      this.handleActionUpdated(value);
    }
  }

  handleActionUpdated(value) {
    if (!value || !this.isShowServerSaveError) {
      return;
    }
    this.initPopUpModel();
    if (value.businessErrorCode && value.businessErrorCode === 409001) {
      this.showMessageUpdated(value.message, true);
    } else {
      this.showMessageUpdated(value.message, false);
      this.isEditModeVisible(true);
      this.isUpdateConflicted = true;
    }
  }

  showMessageUpdated(message, concurrency) {
    if (concurrency) {
      this.initPopUpConcurModel();
      this.popUpConcurrencyModel.message = message;
      this.popUpConcurrencyModel.funcYes = this.popUpConcurrencyModel.funcHiding = () => {
        this.popUpConcurrencyModel.isVisible = false;
        this.isEditModeVisible(true);
        if (this.disableBtnAfterConcurrency) {
          this.customizeBtn[1].disabled = true;
        }
        this.isUpdateConflicted = true;
      };
      this.popUpConcurrencyModel.funcNo = () => {
        this.popUpConcurrencyModel.isVisible = false;
        this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: this.barPerSonID });
        this.isEditModeVisible(true);
        this.isUpdateConflicted = true;
        this.disableBtnAfterConcurrency = false;
      };
      this.popUpConcurrencyModel.textYes = this.translateService.instant('Arbeit.Message.UpdateComfirmYes');
      this.popUpConcurrencyModel.textNo = this.translateService.instant('Arbeit.Message.UpdateComfirmNo');
      this.popUpConcurrencyModel.title = this.translateService.instant('Arbeit.Message.TitleComfirm');
      this.popUpConcurrencyModel.isVisible = true;
      this.popUpConcurrencyModel = Object.assign({}, this.popUpConcurrencyModel);
    } else {
      this.popUpModel.message = message;
      this.popUpModel.isVisibleYes = false;
      this.popUpModel.isVisibleNo = false;
      this.popUpModel.title = this.translateService.instant('Arbeit.Message.Information');
      this.popUpModel.isVisible = true;
      this.popUpModel = Object.assign({}, this.popUpModel);
    }
  }

  isArbeitModelChanged() {
    return (this.arbeitModel.baPersonID !== this.arbeitLastModel.baPersonID
      || this.arbeitModel.erwerbssituationStatus1Code !== this.arbeitLastModel.erwerbssituationStatus1Code
      || this.arbeitModel.erwerbssituationStatus2Code !== this.arbeitLastModel.erwerbssituationStatus2Code
      || this.arbeitModel.erwerbssituationStatus3Code !== this.arbeitLastModel.erwerbssituationStatus3Code
      || this.arbeitModel.erwerbssituationStatus4Code !== this.arbeitLastModel.erwerbssituationStatus4Code
      || this.arbeitModel.beschaeftigungsGradCode !== this.arbeitLastModel.beschaeftigungsGradCode
      || this.arbeitModel.grundTeilzeitarbeit1Code !== this.arbeitLastModel.grundTeilzeitarbeit1Code
      || this.arbeitModel.grundTeilzeitarbeit2Code !== this.arbeitLastModel.grundTeilzeitarbeit2Code
      || this.arbeitModel.brancheCode !== this.arbeitLastModel.brancheCode
      || this.arbeitModel.erlernterBerufCode !== this.arbeitLastModel.erlernterBerufCode
      || this.arbeitModel.berufCode !== this.arbeitLastModel.berufCode
      || this.arbeitModel.baInstitutionID !== this.arbeitLastModel.baInstitutionID
      || this.arbeitModel.hoechsteAusbildungCode !== this.arbeitLastModel.hoechsteAusbildungCode
      || this.arbeitModel.abgebrochenAusbildungCode !== this.arbeitLastModel.abgebrochenAusbildungCode
      || this.arbeitModel.anstellungCode !== this.arbeitLastModel.anstellungCode
      || this.arbeitModel.isVariableArbeitszeit !== this.arbeitLastModel.isVariableArbeitszeit
      || this.arbeitModel.stempelDatum !== this.arbeitLastModel.stempelDatum
      || this.arbeitModel.ausgesteuertUnbekanntCode !== this.arbeitLastModel.ausgesteuertUnbekanntCode
      || this.arbeitModel.ausgesteuertDatum !== this.arbeitLastModel.ausgesteuertDatum
      || this.arbeitModel.bemerkung !== this.arbeitLastModel.bemerkung
      || this.arbeitModel.integrationsstandCode !== this.arbeitLastModel.integrationsstandCode
      || this.arbeitModel.finanziellUnabhaengig !== this.arbeitLastModel.finanziellUnabhaengig
      || this.arbeitModel.beruf !== this.arbeitLastModel.beruf
      || this.arbeitModel.erlernterBeruf !== this.arbeitLastModel.erlernterBeruf
      || this.arbeitModel.arbeitgeber !== this.arbeitLastModel.arbeitgeber
      || this.arbeitModel.geschlechtCode !== this.arbeitLastModel.geschlechtCode)
      || this.arbeitModel.arbeitszeit !== this.arbeitLastModel.arbeitszeit
      || this.arbeitModel.wieOftArbeitslos !== this.arbeitLastModel.wieOftArbeitslos ? true : false;
  }

  doubleClickHeader($event) {
    if ($event.shiftKey) {
      this.showMessageCoppyHeader(true);
    } else {
      this.showMessageCoppyHeader(false);
    }
  }

  showMessageCoppyHeader(status) {
    this.initPopUpModel();
    status ? this.copyElement(this.barPerSonID.toString()) : this.copyElement(this.titleForm);
    this.popUpModel.textYes = this.translateService.instant('Arbeit.Message.ComfirmYes');
    this.popUpModel.textNo = this.translateService.instant('Arbeit.Message.ComfirmNo');
    this.popUpModel.title = this.translateService.instant('Arbeit.Message.Information');
    this.popUpModel.message = status ? this.translateService.instant('Arbeit.MessageForm.ShiftDoubleHeader') + ' ' + `(ID=${this.barPerSonID})`
      : this.translateService.instant('Arbeit.MessageForm.DoubleHeader');
    this.popUpModel.isVisible = true;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel = Object.assign({}, this.popUpModel);
  }

  copyElement(copyElement: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyElement;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  toolBarOnItemClickTopHeader($event) {
    this.initPopUpModel();
    switch ($event) {
      case ArbeitConstant.Save:
        {
          this.saveArbeit();
          this.doUpdateNodesStatus(false);
          break;
        }
      case ArbeitConstant.Cancel:
        {
          if (this.isUpdateConflicted) {
            this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: this.barPerSonID });
          }
          this.showComfirmCancel();
          break;
        }
      case ArbeitConstant.Edit:
        {
          this.doUpdateNodesStatus(true);
          this.isEditModeVisible(true);
          this.isEditMode = true;
          this.customizeBtn[1].disabled = false;
          break;
        }
      default:
        break;
    }
  }

  isEditModeVisible(isEditMode) {
    if (isEditMode) {
      this.customizeBtn[0].visible = false;
      this.customizeBtn[1].visible = true;
      this.customizeBtn[2].visible = true;
      setTimeout(() => {
        if (this.erwerbssituationStatus1Code) {
          this.erwerbssituationStatus1Code.instance.focus();
        }
      }, 300);
    } else {
      this.customizeBtn[0].visible = true;
      this.customizeBtn[1].visible = false;
      this.customizeBtn[2].visible = false;
    }
    this.customizeBtn = [...this.customizeBtn];
  }

  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
      this.blurAll();
      event.preventDefault();
      if (this.isEditMode) {
        this.showComfirmCancel();
      }
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
      this.blurAll();
      event.preventDefault();
      if (this.isEditMode) {
        this.saveArbeit();
        this.doUpdateNodesStatus(false);
      }
    }
  }

  blurAll() {
    const el = document.querySelector( ':focus' );
      if (el) {
        (el as HTMLElement).blur();
      }
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.doUpdateNodesStatus(false);
  }

  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  statusForm() {
    return this.isEditMode && this.isArbeitModelChanged();
  }

  canDeactivate() {
    if (this.statusForm()) {
      this.showPopupRedirect(this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Message'));
      return this.navigateAwaySelection$;
    }
    this.doUpdateNodesStatus(false);
    return true;
  }

  showPopupRedirect(message) {
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('Arbeit.Message.Discard');
    this.popUpModel.textNo = this.translateService.instant('Arbeit.Message.Abbrechen');
    this.popUpModel.title = this.translateService.instant('Arbeit.Message.TitleComfirm');
    this.popUpModel = Object.assign({}, this.popUpModel);
    this.popUpModel.funcYes = () => {
      this.doUpdateNodesStatus(false);
      this.navigateAwaySelection$.next(true);
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
      this.navigateAwaySelection$.next(false);
      return false;
    };
    this.popUpModel.isVisible = true;
  }

  doUpdateNodesStatus(isEditMode) {
    this.isEditMode = isEditMode;
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
      }
    );
  }

}
