import { Component, EventEmitter, HostListener, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { GrundBedarfSandbox } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/grund-bedarf.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { GrundBedarfConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { BeratungsphaseFormData, DPLSelectboxModel, GrundBedarfFormDataModel, LoadFormDataQueryModel, UpdateFormDataQueryModel } from '../../models';
import { GrundBedarfDetailEditComponent } from '../grundbedarf-detail-edit/grundbedarf-detail-edit.component';

@Component({
  selector: 'kiss-grundbedarf-detail',
  templateUrl: './grundbedarf-detail.component.html',
  styleUrls: ['./grundbedarf-detail.component.scss']
})
@SetClassRight('CtlGrundBedarf')
export class FormDetailComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {

  //#region 'Declare decorator'
  @ViewChild(GrundBedarfDetailEditComponent) grundbedarfDetailEditComponent: GrundBedarfDetailEditComponent;
  //#endregion

  //#region "Declare variables Input And Output"
  @Input() onChangeData: boolean;
  @Input() isViewMode: boolean;
  @Output() loadedGrid: EventEmitter<any> = new EventEmitter();
  @Output() remainingMessageError: EventEmitter<any> = new EventEmitter();
  @Output() changeToViewModeEvent: EventEmitter<any> = new EventEmitter();
  @Output() isConcurrencyEvent: EventEmitter<any> = new EventEmitter();
  //#endregion

  //#region "Declare variables Array"

  //#region "Declare variables readonly"

  //#endregion

  //#region "Declare variables Global"
  // typeFormatNumber = CommonConstant.FormatNumberAllowDelete;
  typeFormatNumber: any; // dang dung tam
  //#endregion

  //#region "Declare variables subscription"
  private subscriptions: Subscription[] = [];
  detailkategorie: any;
  detailperson: any;
  detailFieldTyp: any;
  detailValidierung: any;
  detailHafTypDetail: any;
  isCollapseFormDetail = false;
  grundBedarfFormData: GrundBedarfFormDataModel = {
    berechnungsgrundlage: null,
    // Group 2: SKOS bzw. interne Richtlinien
    grundbedarfI_furHG: 0,
    anpassungI_furHG: '',
    abzugVVG_furHG: '',
    zuschlag_furHG: 0,
    grundbedarfII_furHG: 0,
    anpassungII_furHG: '',
    total_furHG: '',

    grundbedarfI_furUE: 0,
    anpassungI_furUE: null,
    abzugVVG_furUE: 0,
    zuschlag_furUE: 0,
    grundbedarfII_furUE: 0,
    anpassungII_furUE: null,
    keineCheckbox: false,
    total_furUE: 0,
    // Group 1: SKOS 2005
    grundbedarf_furHG_SKOS2005: 0,
    anpassung_furHG_SKOS2005: '',
    abzugVVG_furHG_SKOS2005: '',
    total_furHG_SKOS2005: '',

    grundbedarf_furUE_SKOS2005: 0,
    anpassung_furUE_SKOS2005: null,
    abzugVVG_furUE_SKOS2005: 0,
    total_furUE_SKOS2005: 0,
    // Group 3: Berechnungsgrundlage
    monatlicher_furHG_Berechnungsgrundlage: '',
    anpassung_furHG_Berechnungsgrundlage: null,
    abzugVVG_furHG_Berechnungsgrundlage: '',
    total_furHG_Berechnungsgrundlage: '',

    monatlicher_furUE_Berechnungsgrundlage: null,
    anpassung_furUE_Berechnungsgrundlage: null,
    abzugVVG_furUE_Berechnungsgrundlage: 0,
    total_furUE_Berechnungsgrundlage: 0,

    kennzahlen_haushaltsgrosse_grundbedarf: 'value of Haushaltsgrösse',
    kennzahlen_haushaltsgrosse_wohnkosten: 'value of Haushaltsgrösse',
    kennzahlen_unterstutzungseinheit_grundbedarf: 'value of Unterstützungseinheit',
    kennzahlen_unterstutzungseinheit_wohnkosten: 'value of Unterstützungseinheit',
    kennzahlen_unterstutzungseinheit_zuschlagI: 'value of Unterstützungseinheit',
    kennzahlen_begrundungen: 'value of Begründungen',
  };
  grundBedarfFormDataTmp: GrundBedarfFormDataModel = new GrundBedarfFormDataModel();
  dataSourceSelectboxes: DPLSelectboxModel[] = [];
  readOnlySettingComponents = {
    berechnungsgrundlage: false,
  };
  visibleGroup = {
    visibleSKOSbzwGroup: true,
    visibleSKOS2005Group: true,
    visibleBerechnungsgrundlageGroup: true,
  };
  popUpModel: PopUpModel;
  isIsEmptyFormData: boolean;
  loadFormDataQueryModel: LoadFormDataQueryModel = {
    faPhaseId: 38001
  };
  popupConcurrency = {
    title: this.translateService.instant('I007GrundBedarf.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('I007GrundBedarf.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('I007GrundBedarf.PopupConfirm.Daten'),
  };
  result: string;
  grundbedarfUpdateFormData = new UpdateFormDataQueryModel();
  grundbedarfFormData = new BeratungsphaseFormData();
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  currentRouter: any;
  isDirtyDataForm = false;
  isDisabledSpeichern = false;
  //#endregion

  //#region 'Inject services in contructor and innitdata'
  constructor(injector: Injector,
    public ctlBgGrundbedarfSandbox: GrundBedarfSandbox,
    public translateService: TranslateService,
    private moduleConfigSandbox: ModuleConfigSandbox,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public router: Router) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.registerEvents();
    this.initPopUpModel();
    this.currentRouter = this.router.url;
    const temp = this.grundBedarfFormData;
    this.grundBedarfFormDataTmp = temp;
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
    if (popupType) {
      this.popUpModel.textYes = this.translateService.instant('I007GrundBedarf.PopupConfirm.Yes');
      this.popUpModel.textNo = this.translateService.instant('I007GrundBedarf.PopupConfirm.No');
      this.popUpModel.title = this.translateService.instant('I007GrundBedarf.PopupConfirm.Title');
      this.popUpModel.isVisible = true;
    } else {
      this.popUpModel.textYes = this.translateService.instant('I007GrundBedarf.PopupConfirm.Yes');
      this.popUpModel.textNo = this.translateService.instant('I007GrundBedarf.PopupConfirm.No');
      this.popUpModel.title = this.translateService.instant('I007GrundBedarf.PopupConfirm.Title');
      this.popUpModel.isVisible = true;
    }
  }
  ngOnDestroy() {
    this.showPencilIcon(false);
    this.unregisterEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  //#endregion

  //#region "RegisterEvents"
  registerEvents() {
    // Register subscribe for load data for dataSource select box
    this.dataSourceSelectboxes.push({ code: 0, text: '' });
    this.dataSourceSelectboxes.push({ code: 1, text: 'Group1' });
    this.dataSourceSelectboxes.push({ code: 2, text: 'Group2' });
    this.dataSourceSelectboxes.push({ code: 3, text: 'Group3' });
    this.ctlBgGrundbedarfSandbox.loadSelectboxData();
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.GetDataSourceSelectboxData$.subscribe(dataSourceSelectbox => {
      if (dataSourceSelectbox && dataSourceSelectbox.length > 0) {
        this.dataSourceSelectboxes = [];
        this.dataSourceSelectboxes.push({ code: 0, text: '' });
        dataSourceSelectbox.forEach(item => {
          this.dataSourceSelectboxes.push(item);
        });
      }
    }));
    // Register subscribe for load Form data
    this.ctlBgGrundbedarfSandbox.loadGrundBedarfFormData(this.loadFormDataQueryModel);
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.LoadGrundBedarfFormData$.subscribe(grundBedarfFormDatas => {
      if (grundBedarfFormDatas && grundBedarfFormDatas.length === 0) {
        this.isIsEmptyFormData = true;
        return;
      }
      if (grundBedarfFormDatas && grundBedarfFormDatas.length > 0) {
        this.isIsEmptyFormData = false;
        this.grundbedarfFormData = grundBedarfFormDatas[0];
        // this.grundBedarfFormDataTmp = this.grundBedarfFormData;
        this.calculateTotal();
      }
    }));
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.UpdateGrundBedarfFormData$.subscribe(result => {
      if (result) {
        if (result.status && result.status === AppEnums.StatusCode.STATUS_CODE_409) {
          const body = JSON.parse(result._body);
          if (body.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
            const message = body.message.toString();
            message.replace('\r\n', '<br>');
            this.showDiaglogConcurrency(message);
            return;
          }
        }
        if (result.status && (result.status === AppEnums.StatusCode.BAD_REQUEST
          || result.status === AppEnums.StatusCode.STATUS_CODE_404)) {
          const body = JSON.parse(result._body);
          this.handleActionPopup('messagePopup', body.message.toString());
          return;
        }
        this.showMesagePopup('result: ' + result.value);
        // this.ctlBgGrundbedarfSandbox.loadGrundBedarfFormData(this.loadFormDataQueryModel);
      }
    }));
  }
  // #endregion
  showDiaglogConcurrency(message: string) {
    this.popupConcurrency.visible = true;
    this.popupConcurrency.abbrechen = this.translateService.instant('I007GrundBedarf.PopupConfirm.Abbrechen');
    this.popupConcurrency.datenAktualisieren = this.translateService.instant('I007GrundBedarf.PopupConfirm.Daten');
    this.popupConcurrency.title = this.translateService.instant('I007GrundBedarf.PopupConfirm.Title');
    this.popupConcurrency.message = message;
  }
  popupConcurrencyAbbrechen(result) {
    this.result = result;
    this.isConcurrencyEvent.emit({ result: result });
    this.popupConcurrency = {
      visible: false,
      message: '',
      title: '',
      abbrechen: '',
      datenAktualisieren: '',
    };
  }
  onHiding(e) {
    if (this.result === 'abbrechen') {
      this.popupConcurrencyAbbrechen('abbrechen');
    }
  }
  handleActionPopup(key, message: string) {
    this.initPopUpModel();
    if (key === 'messagePopup') {
      this.showMesagePopup(message);
    }
    if (key === 'onNavigate') {
      this.popUpModel.funcYes = () => {
        this.isViewMode = true;
        this.fallfuhrungTreeSandbox.updateNodesStatus(
          {
            id: this.router.url,
            isEditMode: false,
          }
        );
        this.navigateAwaySelection$.next(true);
        this.popUpModel.isVisible = false;
      };
      this.popUpModel.funcNo = () => {
        this.popUpModel.isVisible = false;
        this.navigateAwaySelection$.next(false);
        return false;
      };
      this.showPopup(message, 'NavigatorPopup');
    }
    return message;
  }
  showMesagePopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleTitle = true;
    this.popUpModel.title = this.translateService.instant('I007GrundBedarf.Msg.Information');
    this.popUpModel.isVisible = true;
  }
  //#region "toolbar event"
  toolBarOnItemClick(e) {
    switch (e) {
      case GrundBedarfConstant.BEARBEITEN_BUTTON:
        // this.onClickEditBtn();
        break;
      case GrundBedarfConstant.SPEICHERN_BUTTON:
        this.onClickSaveBtn();
        break;
      case GrundBedarfConstant.ABBRECHEN_BUTTON:
        // this.onClickCancelBtn();
        break;
      default:
        break;
    }
  }
  onClickEditBtn() {
    this.isViewMode = false;
  }
  onClickSaveBtn() {
    if (!this.isInValid()) {
      this.changeToViewModeEvent.emit({ result: true });
      this.isDirtyDataForm = false;
      this.mapFormData();
      this.ctlBgGrundbedarfSandbox.updateFormData(this.grundbedarfUpdateFormData);
    }

  }
  isInValid() {
    // Check Required field for All groups
    if ((this.visibleGroup.visibleSKOSbzwGroup && (!this.grundBedarfFormData.anpassungI_furUE || !this.grundBedarfFormData.anpassungII_furUE))
      || (this.visibleGroup.visibleSKOS2005Group && (!this.grundBedarfFormData.anpassung_furUE_SKOS2005))
      || (this.visibleGroup.visibleBerechnungsgrundlageGroup && (!this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage || !this.grundBedarfFormData.anpassung_furUE_Berechnungsgrundlage))) {
      this.remainingMessageError.emit({ isErrorClosed: true, messageErr: this.translateService.instant('I007GrundBedarf.Msg.MSG_009') });
      return true;
    }
    return false;
  }
  onClickCancelBtn() {
    this.changeToViewModeEvent.emit({ result: true });
    this.isDirtyDataForm = false;
  }
  // #endregion

  //#region "CRUD"
  //#endregion

  //#region "Business function"

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
    if (this.onChangeData) {
      $event.returnValue = true;
    }
  }
  onFocusIn(e, isTextArea?) {
    // this.typeFormatNumber = CommonConstant.FormatNumberAllowDelete;
  }

  onFocusOut(e, isNotTextArea) {
    this.typeFormatNumber = '#';
  }

  /**
   *  unregister subscription on destroy component
   */
  private unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  /**
   * init detail combobox
   */

  // #endregion
  changeCollapseFormContent(event) {
  }
  displayChangeValue($event) {
  }
  mapFormData() {
    this.grundbedarfUpdateFormData.faPhaseID_old = this.grundbedarfFormData.faPhaseID;
    this.grundbedarfUpdateFormData.faLeistungID = this.grundbedarfFormData.faLeistungID;
    this.grundbedarfUpdateFormData.faPhaseCode = this.grundbedarfFormData.faPhaseCode;
    this.grundbedarfUpdateFormData.userID = this.grundbedarfFormData.userID;
    this.grundbedarfUpdateFormData.datumVon = this.grundbedarfFormData.datumVon;
    this.grundbedarfUpdateFormData.datumBis = this.grundbedarfFormData.datumBis;
    this.grundbedarfUpdateFormData.abschlussGrundCode = this.grundbedarfFormData.abschlussGrundCode;
    this.grundbedarfUpdateFormData.bemerkung = this.grundbedarfFormData.bemerkung;
    this.grundbedarfUpdateFormData.FaPhaseTS_old = this.grundbedarfFormData.faPhaseTS;
    this.grundbedarfUpdateFormData.fsDienstleistungspaketID_Bedarf = this.grundbedarfFormData.fsDienstleistungspaketID_Bedarf;
    this.grundbedarfUpdateFormData.fsDienstleistungspaketID_Zugewiesen = this.grundbedarfFormData.fsDienstleistungspaketID_Zugewiesen;
  }
  calculateTotal() {
    // Caculate total for Group 1: SKOS2005
    this.grundBedarfFormData.total_furUE_SKOS2005 = this.grundBedarfFormData.grundbedarf_furUE_SKOS2005 ? this.grundBedarfFormData.grundbedarf_furUE_SKOS2005 : 0
      + this.grundBedarfFormData.anpassung_furUE_SKOS2005 ? this.grundBedarfFormData.anpassung_furUE_SKOS2005 : 0
        + this.grundBedarfFormData.abzugVVG_furUE_SKOS2005 ? this.grundBedarfFormData.abzugVVG_furUE_SKOS2005 : 0;
    // Caculate total for Group 2: SKOS bzw. // Note: need check sum at BE
    this.grundBedarfFormData.total_furUE = this.grundBedarfFormData.grundbedarfI_furHG ? this.grundBedarfFormData.grundbedarfI_furHG : 0
      + this.grundBedarfFormData.zuschlag_furHG ? this.grundBedarfFormData.zuschlag_furHG : 0
        + this.grundBedarfFormData.grundbedarfII_furHG ? this.grundBedarfFormData.grundbedarfII_furHG : 0
          + this.grundBedarfFormData.grundbedarfI_furUE ? this.grundBedarfFormData.grundbedarfI_furUE : 0
            + this.grundBedarfFormData.anpassungI_furUE ? this.grundBedarfFormData.anpassungI_furUE : 0
              + this.grundBedarfFormData.abzugVVG_furUE ? this.grundBedarfFormData.abzugVVG_furUE : 0
                + this.grundBedarfFormData.zuschlag_furUE ? this.grundBedarfFormData.zuschlag_furUE : 0
                  + this.grundBedarfFormData.grundbedarfII_furUE ? this.grundBedarfFormData.grundbedarfII_furUE : 0
                    + this.grundBedarfFormData.anpassungII_furUE ? this.grundBedarfFormData.anpassungII_furUE : 0;
    // Caculate total for Group 3: Berechnungsgrundlage
    this.grundBedarfFormData.total_furUE_Berechnungsgrundlage = this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage ? this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage : 0
      + this.grundBedarfFormData.anpassung_furUE_Berechnungsgrundlage ? this.grundBedarfFormData.anpassung_furUE_Berechnungsgrundlage : 0
        + this.grundBedarfFormData.abzugVVG_furUE_Berechnungsgrundlage ? this.grundBedarfFormData.abzugVVG_furUE_Berechnungsgrundlage : 0;
  }
  canDeactivate() {
    if (this.isModifyData()) {
      this.handleActionPopup('onNavigate', this.translateService.instant('I007GrundBedarf.NavigatorPopupConfirm.Message'));
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
  isModifyData(): boolean {
    if (JSON.stringify(this.grundBedarfFormData) !== JSON.stringify(this.grundBedarfFormDataTmp) || this.isDirtyDataForm) {
      return true;
    }
    return false;
  }
  showPencilIcon(option: any) {
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: option,
      }
    );
  }
  isDirtyDataFormEvent($event) {
    this.isDirtyDataForm = $event.result;
  }
}


