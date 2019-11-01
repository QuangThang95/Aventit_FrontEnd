import 'devextreme-intl';

import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { getConditionListBtn, getXuserSessionStorage, UtilService } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import * as CurrencyHelper from '@shared/utilites/currencyHelper';
import { DxDataGridComponent, DxDateBoxComponent, DxDropDownBoxComponent, DxTextBoxComponent, DxCheckBoxComponent, DxButtonComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { KlientensystemSandbox } from '../klientensystem.sandbox';
import { Falltraeger, Mietvertrag, Relation } from '../models';

import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { Subject } from 'rxjs';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';

registerLocaleData(localeDe, 'de-CH');

@Component({
  selector: 'app-klientensystem',
  templateUrl: './klientensystem.component.html',
  styleUrls: ['./klientensystem.component.scss']
})
@SetClassRight('CtlKlientensystem')
export class KlientensystemComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  messageCanDeactive: any;
  @Output() toolbarSelection: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('vermieterGrid') vermieterGrid: DxDataGridComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('garantieBis') garantieBis: DxDateBoxComponent;
  @ViewChild('datumVon') datumVon: DxDateBoxComponent;
  @ViewChild('datumBis') datumBis: DxDateBoxComponent;
  @ViewChild('vermieter') vermieter: DxDropDownBoxComponent;
  @ViewChild('mietkostenNetto') mietkostenNetto: DxTextBoxComponent;
  @ViewChild('nebenkosten') nebenkosten: DxTextBoxComponent;
  @ViewChild('kostenanteilUE') kostenanteilUE: DxTextBoxComponent;
  @ViewChild('mietdepot') mietdepot: DxTextBoxComponent;
  @ViewChild('mietzinsgarantie') mietzinsgarantie: DxTextBoxComponent;
  @ViewChild('mieteAbgetreten1') mieteAbgetreten1: DxCheckBoxComponent;
  @ViewChild('gridOption') gridOption: any;
  @ViewChild('abbrechenButton') abbrechenButton: DxButtonComponent;

  caret: any;
  listNumberCheck = [
    {
      name: 'mietkosten',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'kostenanteilUE',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'mietdepot',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'nebenkosten',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'mietzinsgarantie',
      format: CommonConstant.FormatNumberDefault
    }
  ];
  //#region "Declare variables for Froala editor"
  editor: any;
  maxLengthNumber = CommonConstant.MAX_LENGTH_NUMBER + CommonConstant.DECIMA_SIZE + (CommonConstant.MAX_LENGTH_NUMBER / CommonConstant.DECIMA_SIZE - 1);
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
      },
      'froalaEditor.input': (e, editor) => {
        this.validateBemerkungValue(editor.$el[0].innerText);
      },
      'froalaEditor.paste.after': (e, editor) => {
        this.validateBemerkungValue(editor.$el[0].innerText);
      },
      focus: (e) => {
      }
    }
  };
  //#endregion

  //#region "Declare variables for toolbarControl"
  isNavbar: boolean;

  popUpModel: PopUpModel;
  popUpConcurrencyModel: PopUpModel;
  popupType = '';

  initPopupData = {
    visible: false,
    message: '',
    title: '',
    key: '',
    yes: '',
    no: '',
    ok: ''
  };
  popupData: any;
  listBtn: any;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  formatNumber = CommonConstant.FormatNumber;
  customizeBtn: any;
  falltraegerData = new Falltraeger();
  bezugspersonenData = [];
  beziehungRelationData = [];
  maleRelationData = [];
  femaleRelationData = [];
  genericRelationData = [];
  mietvertragData = new Mietvertrag();
  mietvertragDefaultData = new Mietvertrag();
  comboboxVermieter: any;
  maxLength = 4000;
  currentRealtionPersonId: any;
  glHaushaltValue: boolean;
  klientValue: boolean;
  personValue: string;
  firstClickTime = 0;
  selectedRow = new Relation();
  editArr: Relation[];

  private subscriptions: Array<Subscription> = [];

  pageTitle: any;
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  gridFunctionKey = 'gridSettingc007';
  autoWidth = true;
  popupHtml: any;
  showPrintPopup = false;
  languageCode: any;
  languageCodeXuser: any;
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  dateFormat = CommonConstant.FORMAT_DATE;
  baPerson_Relation: any;

  vermieterGridIndex = 0;

  rowSelectedIndexTop: number;
  idParams: any;
  isDropDownBoxOpened = false;
  isReadOnly: any;
  isGlHaushalt: boolean;
  valid = false;
  isShiftKeyDown = false;
  isInfoMessage = false;
  isunterstuetzt = false;
  isConcurrency = false;
  isGlHaushaltOut = false;

  httpErrorCodes = [AppEnums.StatusCode.LIMIT_FILE_SIZE,
  AppEnums.StatusCode.XML_FORMAT,
  AppEnums.StatusCode.STATUS_CODE_421,
  AppEnums.StatusCode.UNPROCESSABLE_ENTITY,
  AppEnums.StatusCode.STATUS_CODE_428,
  AppEnums.StatusCode.BAD_REQUEST,
  AppEnums.StatusCode.STATUS_CODE_500,
  AppEnums.StatusCode.STATUS_CODE_404];

  // Arrow key from
  accessKeyItemFocused = 0;
  keyFocus: string;
  keyInput: string;

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
    informationGl: 'informationGl',
    onNavigate: 'onNavigate'
  };
  currency = {
    mietkosten: '0.00',
    kostenanteilUE: '0.00',
    mietdepot: '0.00',
    nebenkosten: '0.00',
    mietzinsgarantie: '0.00',
  };
  glHaushaltUserId: any;
  glHaushaltUserPerson: any;
  isCheckedChanged = false;
  clickColumnFilterIndex = 0;
  filterColumnsTop: Array<any> = [];
  minDate: Date = new Date(1753, 0, 1);
  maxDate: Date = new Date(9999, 11, 31);
  minNumber = AppEnums.Money.MIN_VALUE;
  maxNumber = AppEnums.Money.MAX_VALUE;

  widthNumberAndDateBox = CommonConstant.WidthNumberAndDateBox;
  selectedKeys = [];
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  tempRelation: Relation;
  remainMessage: any;

  popupConcurrency = {
    title: this.translateService.instant('Fallfuhrung.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('Fallfuhrung.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('Fallfuhrung.PopupConfirm.Daten'),

  };
  //#endregion


  constructor(
    injector: Injector,
    public klientensystemSandbox: KlientensystemSandbox,
    public translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public layoutSandbox: LayoutSandbox,
    public utilService: UtilService
  ) {
    super(injector);
    this.isReadOnly = false;
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngAfterViewInit(): void {
    this.disableTextarea();
    this.getFilterColumns();
  }

  disableTextarea() {
    if (!isNullOrUndefined(this.editor)) {
      this.editor.edit.off();
    }
  }

  enableTextarea() {
    if (!isNullOrUndefined(this.editor)) {
      this.editor.edit.on();
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

  // #region "Businness, load data for combox..."
  ngOnInit() {
    this.titlePage = this.translateService.instant('Klientensystem.Title');
    this.setTitle(this.titlePage);
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.idParams = this.route.snapshot.params.baPersonID;
    this.initToolbarItem(false);
    this.popupData = this.initPopupData;
    this.registerEvents();
    this.klientensystemSandbox.registerEvents();
    this.beziehungRelationGenericInit();
    this.beziehungRelationFemaleInit();
    this.beziehungRelationMaleInit();
    this.fillKlientensystemData(this.idParams);
    this.fillBezugspersonenData(this.idParams);
    this.fillMietvertragData(this.idParams);
    this.getComboboxVermieterData();
    this.baPerson_Relation = [];
    for (let index = 0; index < this.listNumberCheck.length; index++) {
      const element = this.listNumberCheck[index];
      this.currency[element.name] = '0.00';
    }

    this.initPopUpModel();
    this.initPopUpConcurModel();
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.klientensystemSandbox.resetState();
    this.klientensystemSandbox.unregisterEvents();
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Section init data from server
  private registerEvents(): void {
    // Register subscribe for selected person
    this.subscriptions.push(
      this.klientensystemSandbox.falltraegerData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            this.falltraegerData = data;
            this.pageTitle = this.falltraegerData.person + ' (' + this.falltraegerData.geburtstag + ') - [Id: ' + this.idParams + '] > ';
          }
        }
      }),
      this.klientensystemSandbox.relationData$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            this.bezugspersonenData = data;
            this.bezugspersonenData.forEach(element => {
              if (element.geschlechtCode === 1) {
                element.dropdownboxData = this.maleRelationData;
              } else if (element.geschlechtCode === 2) {
                element.dropdownboxData = this.femaleRelationData;
              } else {
                element.dropdownboxData = this.genericRelationData;
              }
              for (let i = 0; i < element.dropdownboxData.length; i++) {
                if (element.relationID === element.dropdownboxData[i].code) {
                  element.beziehung = element.dropdownboxData[i].text;
                  return;
                }
              }
            });
            setTimeout(() => {
              this.dataGrid.instance.selectRowsByIndexes([0]);
            }, CommonConstant.SetTimeOut500);
          }
        }
      }),
      this.klientensystemSandbox.beziehungRelationGenericData$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            this.genericRelationData = data;
          }
        }
      }),
      this.klientensystemSandbox.beziehungRelationMaleData$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            this.maleRelationData = data;
          }
        }
      }),
      this.klientensystemSandbox.beziehungRelationFemaleData$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            this.femaleRelationData = data;
          }
        }
      }),
      this.klientensystemSandbox.vwInstitutionData$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            this.comboboxVermieter = data;
          }
        }
      }),
      this.klientensystemSandbox.mietvertragData$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          this.mietvertragData = Object.assign({}, data[0]);
          this.mietvertragDefaultData = Object.assign({}, data[0]);
        } else {
          this.mietvertragData = new Mietvertrag();
        }
      }),
      this.klientensystemSandbox.inFPData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            if (data !== false) {
              if (data.type === this.poToolKey.information) {
                this.isInfoMessage = true;
                this.isGlHaushaltOut = false;
                this.initPopUpModel();
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;
                this.popupType = this.poToolKey.information;
                this.showPopupConfirm(data.message);
                for (let i = 0; i < this.bezugspersonenData.length; i++) {
                  if (this.bezugspersonenData[i].personID === this.glHaushaltUserId) {
                    this.bezugspersonenData[i] = new Relation(this.tempRelation);
                    return;
                  }
                }
              }
            } else {
              if (data.type === this.poToolKey.information) {
                this.initPopUpModel();
                this.popupType = this.poToolKey.information;
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;

                this.showPopupConfirm(data.message);
              }
            }
          }
        }
      }),
      this.klientensystemSandbox.gleicheAdresseData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            if (data !== false) {
              for (let i = 0; i < this.bezugspersonenData.length; i++) {
                if (this.bezugspersonenData[i].personID === this.glHaushaltUserId) {
                  this.isCheckedChanged = true;
                  this.bezugspersonenData[i].glHaushalt = data.isValid;
                }
              }
              if (data.isValid === false) {
                if (data.type !== null) {
                  if (data.type === this.poToolKey.information) {
                    this.isInfoMessage = true;
                    this.popUpModel.isVisibleYes = false;
                    this.popUpModel.isVisibleNo = false;
                    this.initPopUpModel();
                    this.popupType = data.type;
                    this.showPopupConfirm(data.message);
                  } else if (data.type === this.poToolKey.confirm) {
                    this.isInfoMessage = false;
                    this.initPopUpModel();
                    this.popupType = data.type;
                    this.showPopupConfirm(data.message);
                  }
                }
              }
            } else {
              if (data.type === this.poToolKey.information) {
                this.initPopUpModel();
                this.popupType = this.poToolKey.information;
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;

                this.showPopupConfirm(data.message);
              }
            }
          }
        }
      }),
      this.klientensystemSandbox.updateBaMietvertragData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popupType = this.poToolKey.information;
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message);
          } else {
            if (data.value === true) {
              this.disableTextarea();
              this.fillBezugspersonenData(this.idParams);
              this.fillMietvertragData(this.idParams);
            } else if (data.status === AppEnums.StatusCode.STATUS_CODE_409) {
              const message = JSON.parse(data._body);
              if (message.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
                this.initPopUpModel();
                this.popupType = this.poToolKey.concurrency;
                this.showPopupConcurrency(message.message);
              }
            }
          }
        }
      }),
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.idParams = selectedNode.baPersonID;
          this.fillKlientensystemData(selectedNode.baPersonID);
          this.fillBezugspersonenData(selectedNode.baPersonID);
          this.fillMietvertragData(selectedNode.baPersonID);
          this.cancelAll();
        }
      })
    );
  }

  fillKlientensystemData(idParams: any) {
    this.klientensystemSandbox.loadFalltraegerInitData({
      BaPersonID: idParams,
      LanguageCode: 1
    });
  }

  fillBezugspersonenData(idParams: any) {
    this.klientensystemSandbox.loadRelationInitData({
      BaPersonID: idParams
    });
  }

  fillMietvertragData(idParams: any) {
    this.klientensystemSandbox.loadMietvertragInitData({
      BaPersonID: idParams
    });
  }

  getComboboxVermieterData() {
    this.klientensystemSandbox.loadVwInstitutionInitData({
      UserID: null,
      LanguageCode: null,
      SearchValue: ''
    });
  }

  beziehungRelationGenericInit() {
    this.klientensystemSandbox.loadBeziehungRelationGenericInitData();
  }

  beziehungRelationMaleInit() {
    this.klientensystemSandbox.loadBeziehungRelationMaleInitData();
  }

  beziehungRelationFemaleInit() {
    this.klientensystemSandbox.loadBeziehungRelationFemaleInitData();
  }


  // #endregion

  // #region Create Update Delete
  /**
   *  EditValueChanging Checkbox value change
   */

  getInFPData(
    PersonID: number,
    FieldNameChange: string,
    WohnsitzAdresseID: number,
    Person: string,
    Klient: boolean,
    GlHaushalt: boolean,
    Wohnsitz: string
  ) {
    this.klientensystemSandbox.loadInFPInitData({
      personID: PersonID,
      fieldNameChange: FieldNameChange,
      wohnsitzAdresseID: WohnsitzAdresseID,
      person: Person,
      klient: Klient,
      glHaushalt: GlHaushalt,
      wohnsitz: Wohnsitz,
      baPersonID: this.idParams
    });
  }

  checkValiditionGleicherHaushalt(
    IsGleicherHaushalt: boolean,
    BaPersonIDTargetPerson: number,
    NameTargetPerson: string,
    BaAdresseIDSourcePerson: number,
    AddressSourcePerson: string,
    IsValidAddressFirst: boolean
  ) {
    this.isGlHaushaltOut = false;
    this.klientensystemSandbox.loadGleicheAdresseInitData({
      columnModified: true,
      isGleicherHaushalt: IsGleicherHaushalt,
      baPersonIDTargetPerson: BaPersonIDTargetPerson,
      nameTargetPerson: NameTargetPerson,
      baAdresseIDSourcePerson: BaAdresseIDSourcePerson,
      addressSourcePerson: AddressSourcePerson,
      isValidAddressFirst: IsValidAddressFirst
    });
  }

  // #region update BaMietvertrag
  updateBaMietvertrag(
    BaPersonID: number,
    BaAdresseIDSourcePerson: number, // wohnsitzAdresseID
    BaPerson_Relation: any,
    BaMietvertrag: any,
  ) {
    this.klientensystemSandbox.updateBaMietvertragData({
      baPersonID: BaPersonID,
      baAdresseIDSourcePerson: BaAdresseIDSourcePerson,
      baPerson_Relation: BaPerson_Relation,
      baMietvertrag: BaMietvertrag
    }
    );
  }

  getMiete(event) {
    this.mietvertragData.datumVon = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getBis(event) {
    this.mietvertragData.datumBis = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getMietkosten(event) {
    this.mietvertragData.mietkosten = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getNebenkosten(event) {
    this.mietvertragData.nebenkosten = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getKostenanteilUE(event) {
    this.mietvertragData.kostenanteilUE = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getMietdepot(event) {
    this.mietvertragData.mietdepot = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getMietzinsgarantie(event) {
    this.mietvertragData.mietzinsgarantie = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getGarantieBis(event) {
    this.mietvertragData.garantieBis = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getMieteAbgetreten(event) {
    this.mietvertragData.mieteAbgetreten = event;
    this.initToolbarItem(this.isReadOnly);
  }

  getBemerkung(event) {
    this.mietvertragData.bemerkung = event;
    this.initToolbarItem(this.isReadOnly);
  }

  changeDropDownBoxValue(event) {
    this.mietvertragData.baInstitutionID = event.selectedRowKeys[0].baInstitutionID;
    this.isDropDownBoxOpened = false;
    this.initToolbarItem(this.isReadOnly);
  }

  // #endregion

  // Validate Bemerkung value
  validateBemerkungValue(innerText) {
    if (innerText) {
      // count innerText characters
      const numberOfLines = innerText.split('\n').length;
      const numberOfCharacters = innerText.length - numberOfLines + 1; // 1 is end letter character
      if (numberOfCharacters > this.maxLength) {
        this.initPopUpModel();
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        this.popupType = this.poToolKey.information;
        this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.BemerkungMaxlength'));
        return false;
      } else if (numberOfCharacters < this.maxLength) {
        return true;
      }
    } else {
      return true;
    }
  }

  validateBemerkungSubmit() {
    if (this.editor.charCounter.count() > this.maxLength) {
      this.initPopUpModel();
      this.popUpModel.isVisibleYes = false;
      this.popUpModel.isVisibleNo = false;
      this.popupType = this.poToolKey.information;
      this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.BemerkungMaxlength'));
      return false;
    } else {
      return true;
    }
  }
  // #endregion

  // #region Common function
  onHideWidgetsMenu(event) {
    event.preventDefault();
    const leftContentClass = 'hide-widgets-menu';
    const tmp = document.getElementsByTagName('body');
    const checkIsShowMenu = tmp[0].classList.contains(leftContentClass);
    if (checkIsShowMenu) {
      tmp[0].classList.remove(leftContentClass);
    } else {
      tmp[0].classList.add(leftContentClass);
    }
  }

  initToolbarItem(isEdit: boolean) {
    this.customizeBtn = [
      {
        text: 'Klientensystem.Toolbar.Speichern',
        name: this.poToolKey.speichern,
        visible: isEdit
      },
      {
        text: 'Klientensystem.Toolbar.Abbrechen',
        name: this.poToolKey.abbrechen,
        visible: isEdit
      },
      {
        text: 'Klientensystem.Toolbar.Bearbeiten',
        name: this.poToolKey.bearbeiten,
        visible: !isEdit
      }
    ];
    this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.CommonBtn], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  }

  toolBarOnItemClick(e) {
    switch (e) {
      case this.poToolKey.exportExcel: {
        this.dataGrid.instance.exportToExcel(false);
        break;
      }
      case this.poToolKey.printPdf: {
        break;
      }
      case this.poToolKey.chooserColumn: {
        this.dataGrid.instance.showColumnChooser();
        return;
      }
      case this.poToolKey.gridSetting: {
        this.gridFunction.showPopup(this.gridFunctionModel);
        return;
      }
      case this.poToolKey.bearbeiten: {
        this.isReadOnly = true;
        this.fallfuhrungTreeSandbox.updateNodesStatus(
          {
            id: this.router.url,
            isEditMode: true,
          }
        );
        this.enableTextarea();
        this.initToolbarItem(this.isReadOnly);
        setTimeout(() => {
          this.vermieter.instance.focus();
        }, CommonConstant.SetTimeOut);
        return;
      }
      case this.poToolKey.speichern: {
        if (this.isGlHaushaltOut === true) {
          this.checkGlFocusOut();
        } else {
          if (this.checkAllNumber()) { this.updateAll(); }
        }
        return;
      }
      case this.poToolKey.abbrechen: {
        if (this.isModifyData() || this.isGridModify()) {
          this.initPopUpModel();
          this.popupType = this.poToolKey.bearbeiten;
          this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.Edit'));
        } else {
          this.cancelAll();
        }
        return;
      }
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
    if (this.gridFunctionModel.autoSaveSetting) {
      localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
    }
  }

  cancelAll() {
    this.isReadOnly = false;
    this.isInfoMessage = false;
    this.isunterstuetzt = false;
    this.isConcurrency = false;
    this.isGlHaushaltOut = false;
    this.isCheckedChanged = false;
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.initToolbarItem(this.isReadOnly);
    this.fillBezugspersonenData(this.idParams);
    this.fillMietvertragData(this.idParams);
    this.disableTextarea();
  }
  checkValidForm() {
    if (this.mietvertragData.mietkosten > this.maxNumber || this.mietvertragData.mietdepot < this.minNumber) {
      this.getMessage(this.mietvertragData);
      this.mietkostenNetto.instance.focus();
      return false;
    }
    if (this.mietvertragData.nebenkosten > this.maxNumber || this.mietvertragData.nebenkosten < this.minNumber) {
      this.getMessage(this.mietvertragData);
      this.nebenkosten.instance.focus();
      return false;
    }
    if (this.mietvertragData.kostenanteilUE > this.maxNumber || this.mietvertragData.kostenanteilUE < this.minNumber) {
      this.getMessage(this.mietvertragData);
      this.kostenanteilUE.instance.focus();
      return false;
    }
    if (this.mietvertragData.mietzinsgarantie > this.maxNumber || this.mietvertragData.mietzinsgarantie < this.minNumber) {
      this.getMessage(this.mietvertragData);
      this.mietzinsgarantie.instance.focus();
      return false;
    }
    if (this.mietvertragData.mietdepot > this.maxNumber || this.mietvertragData.mietdepot < this.minNumber) {
      this.getMessage(this.mietvertragData);
      this.mietdepot.instance.focus();
      return false;
    } else {
      return true;
    }
  }
  validateForm(data) {
    if (data.mietkosten > this.maxNumber || data.mietdepot < this.minNumber
      || data.nebenkosten > this.maxNumber || data.nebenkosten < this.minNumber
      || data.kostenanteilUE > this.maxNumber || data.kostenanteilUE < this.minNumber
      || data.mietzinsgarantie > this.maxNumber || data.mietzinsgarantie < this.minNumber
      || data.mietdepot > this.maxNumber || data.mietdepot < this.minNumber
    ) {
      return this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput');
    }
  }

  // get message toast
  getMessage(data) {
    const message = this.validateForm(data);
    if (message) {
      this.remainMessage = {
        visible: true,
        message: message,
      };
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
  updateAll() {
    this.datumVon.text = this.datumVon.text ? this.datumVon.text : null;
    this.datumBis.text = this.datumBis.text ? this.datumBis.text : null;
    this.garantieBis.text = this.garantieBis.text ? this.garantieBis.text : null;
    this.baPerson_Relation = [];

    this.bezugspersonenData.forEach(element => {
      this.baPerson_Relation.push({
        baPerson_RelationID: element.baPerson_RelationID,
        baPerson_RelationTS: element.baPerson_RelationTS,
        baPersonID_1: element.baPersonID_1,
        baPersonID_2: element.baPersonID_2,
        baRelationID: element.baRelationID,
        unterstuetzt: element.unterstuetzt,
        personID: element.personID,
        glHaushalt: element.glHaushalt,
        relationID: element.relationID
      });
    });

    if (isNullOrUndefined(this.mietvertragData.baMietvertragID)) {
      this.mietvertragData.baMietvertragID = isNullOrUndefined(this.mietvertragData.baMietvertragID) ? null : this.mietvertragData.baMietvertragID;
      this.mietvertragData.datumVon = isNullOrUndefined(this.mietvertragData.datumVon) ? null : this.mietvertragData.datumVon;
      this.mietvertragData.datumBis = isNullOrUndefined(this.mietvertragData.datumBis) ? null : this.mietvertragData.datumBis;
      this.mietvertragData.mietkosten = isNullOrUndefined(this.mietvertragData.mietkosten) ? null : this.mietvertragData.mietkosten;
      this.mietvertragData.nebenkosten = isNullOrUndefined(this.mietvertragData.nebenkosten) ? null : this.mietvertragData.nebenkosten;
      this.mietvertragData.kostenanteilUE = isNullOrUndefined(this.mietvertragData.kostenanteilUE) ? null : this.mietvertragData.kostenanteilUE;
      this.mietvertragData.mietdepot = isNullOrUndefined(this.mietvertragData.mietdepot) ? null : this.mietvertragData.mietdepot;
      this.mietvertragData.baInstitutionID = isNullOrUndefined(this.mietvertragData.baInstitutionID) ? null : this.mietvertragData.baInstitutionID;
      this.mietvertragData.bemerkung = isNullOrUndefined(this.mietvertragData.bemerkung) ? '' : this.mietvertragData.bemerkung;
      this.mietvertragData.baMietvertragTS = isNullOrUndefined(this.mietvertragData.baMietvertragTS) ? null : this.mietvertragData.baMietvertragTS;
      this.mietvertragData.baPersonID = isNullOrUndefined(this.mietvertragData.baPersonID) ? null : this.mietvertragData.baPersonID;
      this.mietvertragData.garantieBis = isNullOrUndefined(this.mietvertragData.garantieBis) ? null : this.mietvertragData.garantieBis;
      this.mietvertragData.mieteAbgetreten = isNullOrUndefined(this.mietvertragData.mieteAbgetreten) ? null : this.mietvertragData.mieteAbgetreten;
      this.mietvertragData.mietzinsgarantie = isNullOrUndefined(this.mietvertragData.mietzinsgarantie) ? null : this.mietvertragData.mietzinsgarantie;
      this.mietvertragData.vermieter = isNullOrUndefined(this.mietvertragData.vermieter) ? '' : this.mietvertragData.vermieter;
    }

    if (this.isDateOrNull((this.garantieBis.text)) && this.isDateOrNull(this.datumVon.text) && this.isDateOrNull(this.garantieBis.text) && this.validateBemerkungSubmit()) {
      if (this.baPerson_Relation.length >= 0 || this.isModifyData()) {
        this.updateBaMietvertrag(
          this.idParams,
          this.falltraegerData.wohnsitzAdresseID,
          this.baPerson_Relation,
          this.mietvertragData);
        this.isReadOnly = false;
        this.fallfuhrungTreeSandbox.updateNodesStatus(
          {
            id: this.router.url,
            isEditMode: false,
          }
        );
        this.initToolbarItem(this.isReadOnly);
      }
    }
  }

  printPdf() {
    this.printer.setData(this.bezugspersonenData, false, [
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Name'),
        dataField: 'person'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Beziehung'),
        dataField: 'beziehung'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Alter'),
        dataField: 'age'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Unterstutzt'),
        dataField: 'unterstuetzt'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Haushalt'),
        dataField: 'glHaushalt'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Klientln'),
        dataField: 'klient'
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
      // load setting from localstorage with customize key
      this.gridFunctionModel = new GridSettingModel();
      gridSetting = JSON.parse(gridSetting);
      this.gridFunctionModel = Object.assign(this.gridFunctionModel, gridSetting);
    } else {
      // setup initial setting and storage on localstorage with customize key
      this.gridFunctionModel = new GridSettingModel();
      localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
    }
  }

  selectedItem(event) {
    this.selectedRow = event.currentSelectedRowKeys[0];
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

  // #endregion

  gridOnContentReady(event) {
  }


  /**
   * Show popup
   * @param message message display
   * @param key name of button
   */
  showPopupConfirm(message) {
    this.popUpModel.message = message;
    if (this.popupType === this.poToolKey.concurrency) {
      this.popUpModel.textYes = this.translateService.instant('Klientensystem.PopupButton.DatenAktualisieren');
      this.popUpModel.textNo = this.translateService.instant('Klientensystem.PopupButton.Abbrechen');
    } else if (this.popupType === this.poToolKey.onNavigate) {
      this.popUpModel.textYes = this.translateService.instant('Klientensystem.Discard');
      this.popUpModel.textNo = this.translateService.instant('Klientensystem.PopupButton.Abbrechen');
    } else {
      this.popUpModel.textYes = this.translateService.instant('Klientensystem.PopupButton.Yes');
      this.popUpModel.textNo = this.translateService.instant('Klientensystem.PopupButton.No');
    }

    if (this.popupType === this.poToolKey.information) {
    this.popUpModel.title = this.translateService.instant('Klientensystem.Message.Information');
    } else {
      this.popUpModel.title = this.translateService.instant('Klientensystem.Message.Title');
    }
    this.popUpModel.isVisible = true;
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
      switch (this.popupType) {
        case this.poToolKey.confirm:
          break;
        case this.poToolKey.bearbeiten:
          break;
        case this.poToolKey.information:
          break;
        case this.poToolKey.concurrency:
          this.isConcurrency = false;
          this.isReadOnly = true;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: true,
            }
          );
          this.fillBezugspersonenData(this.idParams);
          this.fillMietvertragData(this.idParams);
          setTimeout(() => {
            this.concurrencyButton();
          }, CommonConstant.SetTimeOut500);
          break;
        case this.poToolKey.onNavigate:
          this.popUpModel.isVisible = false;
          this.layoutSandbox.clearDeletingSticky();
          this.navigateAwaySelection$.next(false);
          return false;
          break;
        default:
          break;
      }
      this.popupType = '';
    };

    this.popUpModel.funcYes = () => {
      this.popUpModel.isVisible = false;
      switch (this.popupType) {
        case this.poToolKey.confirm:
          setTimeout(() => {
            this.checkValiditionGleicherHaushalt(
              true,
              this.selectedRow.personID,
              this.selectedRow.person,
              this.falltraegerData.wohnsitzAdresseID,
              this.falltraegerData.wohnsitz,
              true);
          }, CommonConstant.SetTimeOut500);
          break;
        case this.poToolKey.bearbeiten:
          this.isReadOnly = false;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.disableTextarea();
          this.fillBezugspersonenData(this.idParams);
          this.fillMietvertragData(this.idParams);
          this.initToolbarItem(this.isReadOnly);
          break;
        case this.poToolKey.concurrency:
          this.isConcurrency = false;
          this.isReadOnly = false;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.fillBezugspersonenData(this.idParams);
          this.fillMietvertragData(this.idParams);
          this.initToolbarItem(this.isReadOnly);
          break;
        case this.poToolKey.onNavigate:
          this.isReadOnly = false;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
          this.navigateAwaySelection$.next(true);
          this.popUpModel.isVisible = false;
          break;
        default:
          break;
      }
      this.popupType = '';
    };
  }

  concurrencyButton() {
    this.listBtn = [];
    this.customizeBtn = [
      {
        text: 'Klientensystem.Toolbar.Speichern',
        name: this.poToolKey.speichern,
        disabled: true
      },
      {
        text: 'Klientensystem.Toolbar.Abbrechen',
        name: this.poToolKey.abbrechen
      }
    ];
  }

  onCopyTitle() {
    let copyElement = '';
    if (this.isShiftKeyDown) {
      copyElement = this.idParams + '';
      this.initPopUpModel();
      this.popupType = this.poToolKey.information;
      this.popUpModel.isVisibleYes = false;
      this.popUpModel.isVisibleNo = false;
      this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.ShiftClickMessage') + ' (' + 'ID=' + this.idParams + ').');
    } else {
      copyElement = this.falltraegerData.person + ' (' + this.falltraegerData.geburtstag + ') - [Id: ' + this.idParams + ']';
      this.initPopUpModel();
      this.popupType = this.poToolKey.information;
      this.popUpModel.isVisibleYes = false;
      this.popUpModel.isVisibleNo = false;
      this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.DoubleClickMessage'));
    }
    this.copyElement(copyElement);
  }

  copyElement(copyElement: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyElement.trim();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /**
   * Handle hot key Alt + charactor
   * @param event
   */
  @HostListener('document:keyup', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = true;
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      event.preventDefault();
      if (this.isReadOnly === true) {
        if (this.isModifyData() || this.isGridModify()) {
          this.initPopUpModel();
          this.popupType = this.poToolKey.bearbeiten;
          this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.Edit'));
        } else {
          this.cancelAll();
        }
      }
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      event.preventDefault();
      if (this.isReadOnly === true) {
        if (this.isGlHaushaltOut === true) {
          this.checkGlFocusOut();
        } else {
          if (this.checkAllNumber()) { this.updateAll(); }
        }
      }
    }
    // Arrow key
    if (this.isReadOnly) {
      if (!this.garantieBis.opened && !this.datumVon.opened && !this.datumBis.opened && !this.isDropDownBoxOpened) {
        if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
          this.moveFocus(false);
        } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
          this.moveFocus(true);
        }
      }
    }
  }

  // Handle close/refresh the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isReadOnly) {
      return false;
    }
  }

  // #region Validation, checking
  isDateOrNull(value: any): boolean {
    const fromValue = isNullOrUndefined(value) ? null : value.split('.');
    if (fromValue === null) {
      return true;
    } else {
      if (fromValue.length === 3 && this.validationYear(fromValue[0], fromValue[1], fromValue[2])) {
        const inputDate = isNullOrUndefined(fromValue) ? null : new Date(fromValue[2], fromValue[1] - 1, fromValue[0]);
        if (inputDate > this.maxDate || inputDate < this.minDate) {
          this.showRemainMessage(this.translateService.instant('Klientensystem.MessageValidation'));
          return false;
        } else {
          return true;
        }
      } else {
        this.showRemainMessage(this.translateService.instant('Klientensystem.MessageValidation'));
        return false;
      }
    }
  }

  validationYear(day, month, year): boolean {
    month = Number(month);
    day = Number(day);
    year = Number(year);

    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
      if (month === 2 && (day < 0 || day > 29)) {
        return false;
      }
    }
    return this.validationMonth(day, month);

  }
  validationMonth(day, month): boolean {
    const thirtyOneDay = [1, 3, 5, 7, 8, 10, 12];
    const thirtyDay = [4, 6, 9, 11];
    if (day < 1) {
      return false;
    } else if (day <= 31 && thirtyOneDay.includes(month)) {
      return true;
    } else if (day <= 30 && thirtyDay.includes(month)) {
      return true;
    } else if (day <= 28 && month === 2) {
      return true;
    } else {
      return false;
    }
  }

  isModifyData(): boolean {
    for (let index = 0; index < this.listNumberCheck.length; index++) {
      const element = this.listNumberCheck[index];
      if (!isNullOrUndefined(this.mietvertragData[element.name])) {
        this.mietvertragData[element.name] = CurrencyHelper.parseFloat(this.mietvertragData[element.name].toString());
      }
    }
    if (JSON.stringify(this.mietvertragDefaultData) !== JSON.stringify(this.mietvertragData)) {
      return true;
    }
    return false;
  }

  isGridModify(): boolean {
    for (const item of this.bezugspersonenData) {
      if (item.isEdit === true) {
        return true;
      }
    }
    return false;
  }

  checkAllNumber(): boolean {
    if (!this.checkValidForm()) {
      return false;
    } else {
      return true;
    }
  }

  unterstuetztChange(data, person, klient, glHaushalt) {
    this.tempRelation = new Relation(data);
    this.tempRelation.unterstuetzt = !this.tempRelation.unterstuetzt;
    this.glHaushaltUserId = data.personID;
    this.editValueChanging(data.personID, person, klient, glHaushalt, 'unterstuetzt');
    for (let i = 0; i < this.bezugspersonenData.length; i++) {
      if (this.bezugspersonenData[i].personID === data.personID) {
        setTimeout(() => {
          this.dataGrid.instance.selectRowsByIndexes([i]);
        });
        this.bezugspersonenData[i].isEdit = true;
        return;
      }
    }
  }

  glHaushaltChange(data, person, klient, glHaushalt) {
    this.tempRelation = new Relation(data);
    this.tempRelation.glHaushalt = !this.tempRelation.glHaushalt;
    this.glHaushaltUserId = data.personID;
    this.glHaushaltUserPerson = person;
    this.isGlHaushaltOut = true;
    this.glHaushaltValue = glHaushalt;
    if (this.isCheckedChanged === false) {
      this.editValueChanging(data.personID, person, klient, !glHaushalt, 'GlHaushalt');
    }
    for (let i = 0; i < this.bezugspersonenData.length; i++) {
      if (this.bezugspersonenData[i].personID === data.personID) {
        setTimeout(() => {
          this.dataGrid.instance.selectRowsByIndexes([i]);
        });
        this.bezugspersonenData[i].isEdit = true;
        return;
      }
    }
  }

  changeDropDownBoxGrid(event, id?: number) {
    if (event.currentSelectedRowKeys.length > 0) {
      for (let i = 0; i < this.bezugspersonenData.length; i++) {
        if (this.bezugspersonenData[i].personID === id) {
          this.bezugspersonenData[i].relationID = event.currentSelectedRowKeys[0].code;
          this.bezugspersonenData[i].code = event.currentSelectedRowKeys[0].code;
          this.bezugspersonenData[i].isEdit = true;
          return;
        }
      }
    }
  }

  editValueChanging(id, person, klient, glHaushalt, fieldNameChange) {
    this.getInFPData(
      id,
      fieldNameChange,
      this.falltraegerData.wohnsitzAdresseID,
      person,
      klient,
      glHaushalt,
      this.falltraegerData.wohnsitz);
  }

  checkGlFocusOut(event?) {
    if (isNullOrUndefined(event)) {
      this.checkValiditionGleicherHaushalt(
        this.glHaushaltValue
        , this.glHaushaltUserId
        , this.glHaushaltUserPerson
        , this.falltraegerData.wohnsitzAdresseID
        , this.falltraegerData.wohnsitz
        , false);
    } else if (this.isReadOnly === true) {
      if (this.isGlHaushaltOut === true && (event.rowType !== 'data' || event.column.dataField !== 'glHaushalt' || event.data.personID !== this.glHaushaltUserId)) {
        this.checkValiditionGleicherHaushalt(
          this.glHaushaltValue
          , this.glHaushaltUserId
          , this.glHaushaltUserPerson
          , this.falltraegerData.wohnsitzAdresseID
          , this.falltraegerData.wohnsitz
          , false);
      }
    }

  }

  // #endregion

  onRemoverColumn(e) {
    this.dataGrid.instance.columnOption(e, 'visible', false);
    setTimeout(() => {
      this.dataGrid.instance.refresh();
      this.dataGrid.instance.repaint();
    }, CommonConstant.SetTimeOut);
  }
  onContextMenuPreparing(args: any) {
    let colCount = this.dataGrid.instance.columnCount();
    for (let i = 0; i < this.dataGrid.instance.columnCount(); i++) {
      if (this.dataGrid.instance.columnOption(i, 'groupIndex') > -1) {
        colCount--;
      }
    }
    if (args.target === 'header') {
      if (args.items && args.items.length > 1) {
        args.items.push(
          {
            disabled: false,
            icon: '',
            onItemClick: () => {
              this.onRemoverColumn(args.column.dataField);
            },
            text: this.translateService.instant('Klientensystem.SpalteAusblenden'),
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
      args.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('Klientensystem.AllesErweitern') });
      args.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('Klientensystem.AllesReduzieren') });
    }
  }

  private expandCloumnGrouping() {
    this.gridOption.autoExpandAll = true;
  }

  private unExpandCloumnGrouping() {
    this.gridOption.autoExpandAll = false;
  }
  /*** Arrow Key*/
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-check-box'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (this.keyInput === 'checkbox') {
            this.editor.events.focus();
            return;
          }
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

  onFocusIn(element, field: string, key) {
    if (this.isReadOnly) {
      this.keyFocus = field;
      this.keyInput = key;
      this.accessKeyItemFocused = element.accessKey;
    }
  }

  onFocusOut() {
    this.accessKeyItemFocused = 0;
  }

  onKeyDown(e) {
    if ((this.keyFocus === 'Vermieter' || this.keyFocus === 'Miete' || this.keyFocus === 'GarantieBis' || this.keyFocus === 'DatumBis') && (e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
      e.event.preventDefault();
      if (this.keyFocus === 'GarantieBis') {
        this.garantieBis.opened = !this.garantieBis.opened;
      }
      if (this.keyFocus === 'Miete') {
        this.datumVon.opened = !this.datumVon.opened;
      }
      if (this.keyFocus === 'DatumBis') {
        this.datumBis.opened = !this.datumBis.opened;
      }
      if (this.keyFocus === 'Vermieter') {
        this.vermieter.opened = !this.vermieter.opened;
      }
    } else {
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
        document.dispatchEvent(em);
      }
    }
  }

  getFilterColumns() {
    const columnCountTop = this.dataGrid.instance.columnCount();
    for (let i = 0; i < columnCountTop; i++) {
      if (this.dataGrid.instance.columnOption(i).dataField) {
        this.filterColumnsTop.push(this.dataGrid.instance.columnOption(i));
      }
    }

  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }

  onVermieterOpened(event) {
    this.vermieterGrid.instance.focus();
    if (isNullOrUndefined(this.mietvertragData.baInstitutionID)) {
      setTimeout(() => {
        this.selectedKeys = [this.comboboxVermieter[0].baInstitutionID];
        this.vermieterGrid.instance.focus(this.vermieterGrid.instance.getCellElement(0, 0));
      }, CommonConstant.SetTimeOut500);
      return;
    } else {
      for (let i = 0; i < this.comboboxVermieter.length; i++) {
        if (this.comboboxVermieter[i].baInstitutionID === this.mietvertragData.baInstitutionID) {
          setTimeout(() => {
            this.vermieterGridIndex = i;
            this.selectedKeys = [this.mietvertragData.baInstitutionID];
            this.vermieterGrid.instance.focus(this.vermieterGrid.instance.getCellElement(this.comboboxVermieter.length - (this.comboboxVermieter.length - i), 0));
          }, CommonConstant.SetTimeOut500);
          return;
        }
      }
    }

  }

  onVermieterGridRowSelected(event) {
    this.mietvertragData.baInstitutionID = event.data.baInstitutionID;
    this.vermieter.opened = false;
  }

  onVermieterGridRowEnter(event) {
    if (event.event.keyCode === AppEnums.KeyCode.DownArrowKey && this.vermieterGridIndex < (this.comboboxVermieter.length - 1)) {
      this.vermieterGridIndex++;
      this.vermieterGrid.instance.selectRowsByIndexes([this.vermieterGridIndex]);
    } else if (event.event.keyCode === AppEnums.KeyCode.UpArrowKey && this.vermieterGridIndex > 0) {
      this.vermieterGridIndex--;
      this.vermieterGrid.instance.selectRowsByIndexes([this.vermieterGridIndex]);
    } else if (event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.mietvertragData.baInstitutionID = this.comboboxVermieter[this.vermieterGridIndex].baInstitutionID;
      this.vermieter.opened = false;
      this.vermieter.instance.focus();
    } else if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      this.vermieter.opened = false;
      this.vermieter.instance.focus();
    }
  }

  onVermieterInitialized(event) {
    for (let i = 0; i < this.comboboxVermieter.length; i++) {
      if (this.comboboxVermieter[i].baInstitutionID === this.mietvertragData.baInstitutionID) {
        setTimeout(() => {
          const row = event.component.getRowElement(i);
          event.component.getScrollable().scrollToElement(row);
          this.vermieterGrid.instance.focus();
        }, CommonConstant.SetTimeOut500);
        return;
      }
    }
  }

  canDeactivate() {
    if (this.isModifyData() || this.isGridModify()) {
      this.popupType = this.poToolKey.onNavigate;
      this.initPopUpModel();
      this.showPopupConfirm(this.translateService.instant('Klientensystem.MessageBestatigung'));
      return this.navigateAwaySelection$;
    }
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  onCloseError() {
    this.remainMessage = {
      visible: false,
      message: '',
    };
  }
  showRemainMessage(message) {
    this.remainMessage = {
      visible: true,
      message: message
    };
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

  onSelectBoxKeyDown(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      if (!(event.component.option('opened'))) {
        event.component.open();
      } else {
        event.component.close();
      }
    }
  }

  showPopupConcurrency(message) {
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.textYes = this.translateService.instant('Klientensystem.PopupButton.Abbrechen');
    this.popUpConcurrencyModel.textNo = this.translateService.instant('Klientensystem.PopupButton.DatenAktualisieren');
    this.popUpConcurrencyModel.title = this.translateService.instant('Klientensystem.Message.Title');

    this.popUpConcurrencyModel.isVisible = true;
    this.popUpConcurrencyModel.funcYes = () => {
      this.popUpConcurrencyModel.isVisible = false;
      switch (this.popupType) {
        case this.poToolKey.concurrency:
          this.isConcurrency = false;
          this.isReadOnly = true;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: true,
            }
          );
          this.fillBezugspersonenData(this.idParams);
          this.fillMietvertragData(this.idParams);
          setTimeout(() => {
            this.concurrencyButton();
          }, CommonConstant.SetTimeOut500);
          break;
        default:
          break;
      }
      this.popupType = '';
    };
    this.popUpConcurrencyModel.funcNo = () => {
      this.popUpConcurrencyModel.isVisible = false;
      switch (this.popupType) {
        case this.poToolKey.concurrency:
          this.isConcurrency = false;
          this.isReadOnly = false;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.fillBezugspersonenData(this.idParams);
          this.fillMietvertragData(this.idParams);
          this.initToolbarItem(this.isReadOnly);
          break;
        default:
          break;
      }
      this.popupType = '';
    };
    this.popUpConcurrencyModel.funcHiding = () => {
      this.isConcurrency = false;
      this.isReadOnly = false;
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      this.fillBezugspersonenData(this.idParams);
      this.fillMietvertragData(this.idParams);
      this.initToolbarItem(this.isReadOnly);
    };
  }
}
