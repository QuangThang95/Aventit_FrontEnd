import { AfterViewInit, Component, Injector, OnDestroy, OnInit, HostListener, ViewChild } from '@angular/core';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

import { BeratungsphaseSandbox } from '../beratungsphase.sandbox';
import {
  BeratungsphaseFormData,
  CheckDatumVonQuery,
  CheckMinimalAllTargetsModel,
  DeletePhaseItem,
  DPLSelectboxModel,
  GetConfigBoolItemModel,
  GetConfigBoolQueryModel,
  GetConfigIntItemModel,
  GetCountFaPhaseModel,
  GetCountFaPhaseQueryModel,
  GetFaLeistungByBaPersonIDModel,
  GetFaLeistungByBaPersonIDQueryModel,
  GetNewDateByFaLeistungIDModel,
  GrundSelectboxModel,
  GrundSelectboxQueryModel,
  InsertFaPhaseModel,
  InsertFaPhaseQueryModel,
  ListGetConfigIntQuery,
  LoadFormDataQueryModel,
  ParamModel,
  SARSelectboxModel,
  UpdateFaLeistungQueryModel,
  UpdateFaLeistungResultModel,
  UpdateFormDataQueryModel,
  GetIntakeAndBeratungCountItemModel,
  GetLicensedModulQueryModel,
  GetLicensedModulModel,
  GetFallRightsModel,
  ReopenPhaseQueryModel,
} from '../models';
import { copyElement, getRoleLocalStorage } from '@shared/utilites/utilityHelpers';
import { AppEnums } from '@shared/AppEnum';
import { DxDateBoxComponent, DxSelectBoxComponent, DxValidationGroupComponent, DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';

@Component({
  selector: 'kiss-beratungsphase',
  templateUrl: './beratungsphase-list.component.html',
  styleUrls: ['./beratungsphase-list.component.scss']
})
@SetClassRight('CtlBeratungsphase')
export class BeratungsphaseListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  /************************ Region to declare view child for form ***********************************/
  @ViewChild('datumVon') dateBox: DxDateBoxComponent;
  @ViewChild('datumBis') datumBis: DxDateBoxComponent;
  @ViewChild('grund') grund: DxSelectBoxComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('SarGrid') SarGrid: DxDataGridComponent;
  /************************ The end region to declare view child for form ***************************/
  /************************ Declare all variables for form ***************************/
  readonly RE_OPEN_BTN = 'phaseWiederoffnen';
  readonly NEUES_INTAKE_BTN = 'neuesIntake';
  readonly NEUE_BERATUNGSPHASE_BTN = 'neuesBeratungsphase';
  readonly BEARBEITEN_BTN = 'bearbeiten';
  readonly SPEICHERN_BTN = 'speichern';
  readonly ABBRECHERN_BTN = 'abbrechen';
  readonly DELETE_MENU_ITEM = 'deleteMenuItemTopGrd';
  readonly INTAKE_ICON_ID = 192;
  readonly BERATUNGSPHASE_ICON_ID = 190;
  readonly INTAKE_TEXT = 'Intake';
  readonly BERATUNGSPHASE_TEXT = 'Beratungsphase';
  readonly VALUE_DATE_OUT_OF_RANGE_MESSAGE = 'Der Wert ist nicht im gültigen Bereich';
  readonly VALUE_DATE_INCORRECT_FORMAT = 'Value must be date or time';
  pageTitle: string;
  messageErr = null;
  isNavbar: boolean;
  paramDefault = new ParamModel({
    languageCode: 1,
    className: 'FrmBeratungsphase',
  });
  languageCode: any;
  isErrorClosed = false;
  customizeBtn = [
    {
      text: 'D005Beratungsphase.Button.phaseWiederoffnen',
      visible: false,
      name: this.RE_OPEN_BTN,
    },
    {
      text: 'D005Beratungsphase.Button.neuesIntake',
      visible: true,
      name: this.NEUES_INTAKE_BTN,
    },
    {
      text: 'D005Beratungsphase.Button.neueBeratungsphase',
      visible: true,
      name: this.NEUE_BERATUNGSPHASE_BTN,
    },
    {
      text: 'D005Beratungsphase.Button.Bearbeiten',
      visible: true,
      name: this.BEARBEITEN_BTN,
      disabled: undefined
    },
    {
      text: 'D005Beratungsphase.Button.Speichern',
      visible: false,
      name: this.SPEICHERN_BTN,
      disabled: undefined
    },
    {
      text: 'D005Beratungsphase.Button.Abbrechen',
      visible: false,
      name: this.ABBRECHERN_BTN,
    }
  ];
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [[], this.AdditionalButtons.splice(7, 1)];
  dataSARSelectboxes: SARSelectboxModel[] = [];
  dataDPLSelectboxes: DPLSelectboxModel[] = [];
  dataGrundSelectboxes: GrundSelectboxModel[] = [];
  modelQueryGrundSelectbox: GrundSelectboxQueryModel = new GrundSelectboxQueryModel();
  code: any;
  beratungsphaseFormData = new BeratungsphaseFormData();
  beratungsphaseFormDataTmp: BeratungsphaseFormData = new BeratungsphaseFormData();
  beratungsphaseUpdateFormData = new UpdateFormDataQueryModel();

  loadFormDataQueryModel: LoadFormDataQueryModel = new LoadFormDataQueryModel();
  faPhaseCode = 1;
  datumVonCheck: any; // using check datumVon valid
  isInValidFormData = false;
  checkDatumVonQueryModel: CheckDatumVonQuery = {
    faLeistungID: 0,
    datumVon: null,
    faPhaseID: 0
  };
  duplicateCountDatumVon = 0;
  // public mandatoryField: GetMandatoryField[] = [];
  readOnlySettingComponents = {
    datumVon: true,
    sar: true,
    DPLzugewiesen: true,
    DPLbedarf: true,
    datumBis: true,
    grund: true,
    bemerkung: true,
  };
  checkMinimalAllTargetsList: CheckMinimalAllTargetsModel[] = [];
  getFaLeistungByBaPersonIDQueryModel: GetFaLeistungByBaPersonIDQueryModel = {
    baPersonID: 65180
  };
  getCountFaPhaseQueryModel: GetCountFaPhaseQueryModel = {
    faLeistungID: 99066
  };
  getFaLeistungByBaPersonIDModel: GetFaLeistungByBaPersonIDModel = {
    datumBis: null,
    faLeistungID: null
  };
  getCountFaPhaseModel: GetCountFaPhaseModel = {
    countBeratung: null,
    countIntake: null,
    countOpenBeratung: null,
    countOpenIntake: null
  };
  getConfigIntQueryList: ListGetConfigIntQuery = {
    listGetConfigIntQuery: [
      {
        keyPath: 'System\\Fallfuehrung\\OffeneIntakePhasen',
        defaultValue: 1
      },
      {
        keyPath: 'System\\Fallfuehrung\\TotalIntakePhasen',
        defaultValue: -1
      },
      {
        keyPath: 'System\\Fallfuehrung\\TotalBeratungsphasen',
        defaultValue: -1
      },
      {
        keyPath: 'System\\Fallfuehrung\\TransferPhaseUserToFall',
        defaultValue: 1
      },
      {
        keyPath: 'System\\Fallfuehrung\\PhaseAbschluss',
        defaultValue: 1
      },
    ]
  };
  getConfigBoolQuery: GetConfigBoolQueryModel = {
    keyPath: 'System\\Fallfuehrung\\IntakeErstePhase',
    defaultValue: false
  };
  getConfigIntItemList: GetConfigIntItemModel[] = [
    {
      value: 0
    },
    {
      value: 0
    },
    {
      value: 0
    },
    {
      value: 1
    },
    {
      value: 1
    }
  ];
  getConfigBoolItem: GetConfigBoolItemModel;
  getNewDateByFaLeistungID: GetNewDateByFaLeistungIDModel = {
    newDate: null
  };
  insertFaPhaseQueryModel: InsertFaPhaseQueryModel = {
    CreatorModifier: 'Born, Support (2091)',
    DatumVon: '2018-10-28T13:57:51.013',
    FaLeistungID: 99066,
    FaPhaseCode: 2,
    UserID: 0

  };
  updateFaLeistungQueryModel: UpdateFaLeistungQueryModel = {
    faLeistungID: 0,
    modifier: '',
    userID: 0
  };
  insertFaPhaseModel: InsertFaPhaseModel = {
    id: 0
  };
  updateFaLeistungResultModel: UpdateFaLeistungResultModel;
  isEditMode = false;
  deleteResult: DeletePhaseItem = {
    value: null
  };
  keyError: string;
  isAddNewNode = false;
  isShiftKeyDown = false;
  popupConcurrency = {
    title: this.translateService.instant('D005Beratungsphase.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('D005Beratungsphase.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('D005Beratungsphase.PopupConfirm.Daten'),

  };
  result: string;
  concurrency: string;
  isDisabledSpeichern = false;
  isDatenClickConcurrency = false;
  isReadOnly = true;
  suffixPageTitle = '';
  pageTitleTemp: string;
  keyInput: string;
  isClosed = true;
  keyFocus: string;
  accessKeyItemFocused = 0;
  isChangedData = false;
  minDate: Date = new Date(1753, 0, 1);
  maxDate: Date = new Date(9999, 11, 31);
  isLoadData = false;
  isCompleteMode = false;
  editor: any;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        this.handleTextarea();
      },
      focus: (e) => { }
    }
  };
  currentRouter: any;
  getIntakeAndBeratungCountItemModel = new GetIntakeAndBeratungCountItemModel();
  popUpModel: PopUpModel;
  sarTextValue: string;
  dplZugewiesenTextValue: string;
  dplBedarfTextValue: string;
  grundTextValue: string;
  datumVonTextValue: string;
  datumBisTextValue: string;
  invalidMessageDatumBis: string;
  invalidMessageDatumVon: string;
  datumBisOld: Date;
  messageCanDeactive: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  isConcurrency = false;
  fSModuleIDModel = new GetLicensedModulQueryModel();
  licensedModuleModel: any;
  visibledplSelectBox = true;
  isIsEmptyFormData = false;
  canInsert = false;
  canUpdate = false;
  canDelete = false;
  getFallRightsModel = new GetFallRightsModel();
  phaseOwner: boolean;
  open: boolean;
  archived: boolean;
  isUndoChange = false;
  iConId: number;
  reopenQueryModel: ReopenPhaseQueryModel = new ReopenPhaseQueryModel();
  popUpConcurrencyModel: PopUpModel;
  focusedRowID: number;
  isLoadGrundData = false;
  isOpen = false;
  personInfo: string;
  datumBisFafuhrung: Date;
  /************************ The end declare all variables for form ***************************/
  // declare a variable as list type to store all subscribes
  private subscriptionList: Subscription[] = [];
  // constructor function
  constructor(injector: Injector,
    public BeratungsphasesSandbox: BeratungsphaseSandbox,
    public utilService: UtilService,
    public translateService: TranslateService,
    private datePipe: DatePipe,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public router: Router) {
    super(injector);
    this.validationCallback = this.validationCallback.bind(this);
  }
  /**
   * 2018/10/15: TuanHA
   * Create function to initialize data and register all subscribes when load form
   */
  ngOnInit() {
    this.dataSARSelectboxes.push({ displayText: '', logonName: '', name: '', userID: 0 });
    this.dataDPLSelectboxes.push({ code: 0, text: '' });
    this.dataGrundSelectboxes.push({ text: '', code: 0, sortKey: null, isActive: null, shortText: '', value1: null, value2: null, value3: null });
    this.initPopUpModel();
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.registerEvents();
    this.initPopUpConcurModel();
  }
  /**
   * 2018/10/15: TuanHA
   * Create function to clear data when close form
   */
  ngOnDestroy() {
    this.BeratungsphasesSandbox.resetBeratungphaseState();
    this.showPencilIcon(false);
    this.unregisterEvents();
  }
  /** 2018/10/15: TuanHA
   * Create function to un-register all subscribes
   */
  unregisterEvents() {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
  /**
   * 2018/10/15: TuanHA
   * Create function to register all subscribes when Viewes was loaded
   */
  ngAfterViewInit() {
    // add code at here ...
  }
  private setInitialParams(selectedNode) {
    this.getFaLeistungByBaPersonIDQueryModel.baPersonID = selectedNode.baPersonID;
    this.checkDatumVonQueryModel.faLeistungID = selectedNode.faLeistungID;
    this.getCountFaPhaseQueryModel.faLeistungID = selectedNode.faLeistungID;
    this.getFaLeistungByBaPersonIDModel.faLeistungID = selectedNode.faLeistungID;
    this.updateFaLeistungQueryModel.faLeistungID = selectedNode.faLeistungID;
    if (selectedNode.iconID === this.INTAKE_ICON_ID) {
      this.suffixPageTitle = this.translateService.instant('D005Beratungsphase.IntakeText');
    }
    if (selectedNode.iconID === this.BERATUNGSPHASE_ICON_ID) {
      this.suffixPageTitle = this.translateService.instant('D005Beratungsphase.BeratungsphaseText');
    }
    this.pageTitle = this.pageTitleTemp + ' > ';
    this.personInfo = this.pageTitleTemp;
    this.BeratungsphasesSandbox.loadFallfuhrungData(selectedNode.faLeistungID);
  }
  /**
 * 2018/10/15: TuanHA
 * Create function to register all subscribes for form
 */
  private registerEvents(): void {
    // Register subscribe for selected person
    this.subscriptionList.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (person) {
          this.pageTitle = person.titleText;
          this.pageTitleTemp = person.titleText;
        }
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptionList.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!selectedNode || selectedNode.faPhaseId || selectedNode.faPhaseId === 0) {
          return;
        }
        this.iConId = selectedNode.iconID;
        this.setInitialParams(selectedNode);
        this.initData();
        if (this.loadFormDataQueryModel.faPhaseId !== selectedNode.faPhaseID) {
          this.loadFormDataQueryModel.faPhaseId = selectedNode.faPhaseID;
          this.BeratungsphasesSandbox.loadBeratungsphasesFormData(this.loadFormDataQueryModel);
        }
      })
    );
    // Register subscribe for add new node from sidebar
    this.subscriptionList.push(
      this.fallfuhrungTreeSandbox.addNewNode$.subscribe(newFaPhaseAddition => {
        if (!newFaPhaseAddition) {
          return;
        }
        if (!newFaPhaseAddition.faPhaseID) {
          return;
        }
        if (newFaPhaseAddition.faPhaseID === 0) {
          return;
        }
        this.isAddNewNode = true;
      })
    );
    // Register subscribe for load Form data
    this.subscriptionList.push(this.BeratungsphasesSandbox.LoadBeratungsphaseFormData$.subscribe(beratungsphaseFormDatas => {
      if (isNullOrUndefined(beratungsphaseFormDatas)) {
        this.isIsEmptyFormData = true;
        return;
      }
      if (beratungsphaseFormDatas.status && beratungsphaseFormDatas.status === AppEnums.StatusCode.STATUS_CODE_404) {
        this.isReadOnly = true;
        this.sarTextValue = '';
        this.showHeaderButtonDeleteConcurrency();
        this.beratungsphaseFormData = new BeratungsphaseFormData();
        return;
      }

      if (beratungsphaseFormDatas) {
        this.isIsEmptyFormData = false;
        this.beratungsphaseFormData = beratungsphaseFormDatas;
        this.datumBisOld = this.beratungsphaseFormData.datumBis;
        this.beratungsphaseFormDataTmp = { ...beratungsphaseFormDatas };
        this.checkDatumVonQueryModel.datumVon = this.beratungsphaseFormData.datumVon;
        this.checkDatumVonQueryModel.faLeistungID = this.beratungsphaseFormData.faLeistungId;
        this.checkDatumVonQueryModel.faPhaseID = this.beratungsphaseFormData.faPhaseId;
        this.handleTextarea();
        this.isDatenClickConcurrency = false;
        this.BeratungsphasesSandbox.loadFallRightsData(this.beratungsphaseFormData.faLeistungId);
      }
    }));
    // Register subscribe for load data for SAR select box
    this.subscriptionList.push(this.BeratungsphasesSandbox.SARSelectboxData$.subscribe(dataSARSelectbox => {
      if (dataSARSelectbox && dataSARSelectbox.length > 0) {
        this.dataSARSelectboxes = [];
        this.dataSARSelectboxes = dataSARSelectbox;
        this.setValueSelectboxInReadMode('SAR');
      }
    }));
    // Register subscribe for load data for DPL select box { inlucde: DPL zugewiesen & DPL Bedarf}
    this.subscriptionList.push(this.BeratungsphasesSandbox.DPLSelectboxData$.subscribe(dataDPLSelectbox => {
      if (dataDPLSelectbox && dataDPLSelectbox.length > 0) {
        this.dataDPLSelectboxes = [];
        dataDPLSelectbox.forEach(item => {
          this.dataDPLSelectboxes.push(item);
        });
        this.setValueSelectboxInReadMode('DPL');
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GrundSelectboxData$.subscribe(dataGrundSelectbox => {
      if (dataGrundSelectbox && dataGrundSelectbox.length === 0 && this.isLoadGrundData) {
        this.isLoadGrundData = false;
        this.modelQueryGrundSelectbox.FaPhaseCode = 'FaAbschlussgrundPhase';
        this.BeratungsphasesSandbox.loadGrundSelectboxData(this.modelQueryGrundSelectbox);
      }
      if (dataGrundSelectbox && dataGrundSelectbox.length > 0) {
        this.dataGrundSelectboxes = [];
        this.dataGrundSelectboxes.push({ text: '', code: 0, sortKey: null, isActive: null, shortText: '', value1: null, value2: null, value3: null });
        dataGrundSelectbox.forEach(item => {
          if (item.isActive) {
            this.dataGrundSelectboxes.push(item);
          }
        });
        this.setValueSelectboxInReadMode('GRUND');
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.UpdateBeratungsphaseFormData$.subscribe(result => {
      if (result) {
        if (result.status && result.status === AppEnums.StatusCode.STATUS_CODE_409) {
          const message = this.translateService.instant('D005Beratungsphase.Msg.ConcurrencyMsg409');
          message.replace('\r\n', '<br>');
          this.showPopupConcurrency(message);
          return;
        }

        if (result.status && result.status === AppEnums.StatusCode.BAD_REQUEST) {
          const body = JSON.parse(result._body);
          this.handleActionPopup('messagePopup', body.message);
          return;
        }

        if (result.status && result.status === AppEnums.StatusCode.STATUS_CODE_404) {
          this.showPopupConcurrency(this.translateService.instant('D005Beratungsphase.Msg.ConcurrencyMsg404'));
          return;
        }
        this.doSaveSuccess();
        this.fallfuhrungTreeSandbox.changeTreeNodeUpdateState(true);
        this.BeratungsphasesSandbox.loadBeratungsphasesFormData(this.loadFormDataQueryModel);
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetDatumVonAndFaLeistungIDData$.subscribe(result => {
      if (result && result.length > 0) {
        this.datumVonCheck = result[0].datumVon;
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetDuplicateDatumVon$.subscribe(result => {
      if (result && result.length > 0) {
        this.duplicateCountDatumVon = result[0].duplicatedCount;
      }
    }));
    /* TO DO: this function can use in the future:
     this.subscriptionList.push(this.BeratungsphasesSandbox.GetMandatoryFieldData$.subscribe(result => {
       if (!isNullOrUndefined(result)) {
         this.mandatoryField = result;
       }
     })); */
    this.subscriptionList.push(this.BeratungsphasesSandbox.CheckMinimalAllTargetsData$.subscribe(result => {
      if (result) {
        this.checkMinimalAllTargetsList = result;
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetFaLeistungByBaPersonIDData$.subscribe(result => {
      if (result) {
        this.getFaLeistungByBaPersonIDModel = result;
        this.getCountFaPhaseQueryModel.faLeistungID = result.faLeistungID;
        this.BeratungsphasesSandbox.getCountFaPhaseData(this.getCountFaPhaseQueryModel);
        this.BeratungsphasesSandbox.getConfigIntData(this.getConfigIntQueryList);
        this.BeratungsphasesSandbox.getConfigBoolData(this.getConfigBoolQuery);
        this.BeratungsphasesSandbox.getIntakeAndBeratungsphaseCountByFaLeistungIDData(this.getCountFaPhaseQueryModel);
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetCountFaPhaseData$.subscribe(result => {
      if (result && result.length > 0) {
        this.getCountFaPhaseModel = result[0];
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetConfigIntData$.subscribe(result => {
      if (result) {
        this.getConfigIntItemList = result;
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetConfigBoolData$.subscribe(result => {
      if (result) {
        this.getConfigBoolItem = result;
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetUpdateFaleistungData$.subscribe(result => {
      if (result) {
        this.updateFaLeistungResultModel = result;
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetIntakeAndBeratungsphaseCountByFaLeistungIDData$.subscribe(result => {
      if (result && result.length > 0) {
        this.getIntakeAndBeratungCountItemModel = result[0];
      }
    }));
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetLicensedModuleData$.subscribe(result => {
      if (result && result.length > 0) {
        this.licensedModuleModel = result;
        this.processBeforeOpenForm(this.beratungsphaseFormData.faPhaseId);
      }
    }));
    // Register subscribe for load data fall rights
    this.subscriptionList.push(this.BeratungsphasesSandbox.FallRightsData$.subscribe(dataFallRight => {
      if (dataFallRight) {
        this.getFallRightsModel = dataFallRight;
        this.BeratungsphasesSandbox.getLicensedModule(this.fSModuleIDModel);
      }
    }));
    // Register subscribe for load Reopen Phase
    this.subscriptionList.push(this.BeratungsphasesSandbox.GetReopenPhaseData$.subscribe(result => {
      if (isNullOrUndefined(result)) {
        return;
      }

      if (result.status && (result.status === AppEnums.StatusCode.BAD_REQUEST)) {
        const body = JSON.parse(result._body);
        this.handleActionPopup('messagePopup', body.message.toString(), body.reOpen);
        return;
      }

      if (result) {
        this.handleActionPopup('phaseWiederoffnen', this.translateService.instant('D005Beratungsphase.Msg.reopenContentDialog'));
      }
    }));

    // Register subscribe for load data Faleistung
    this.subscriptionList.push(this.BeratungsphasesSandbox.FallfuhrungData$.subscribe(dataFaleistung => {
      if (isNullOrUndefined(dataFaleistung)) {
        return;
      }
      if (dataFaleistung.length === 1) {
        this.datumBisFafuhrung = dataFaleistung[0].datumBis;
      }
    }));
  }
  hideDlpControls() {
    this.visibledplSelectBox = false;
  }
  unHideDlpControls() {
    this.visibledplSelectBox = true;
  }
  setEditMode() {
    if (!this.checkHideSelectBoxDPL()) {
      this.hideDlpControls();
    }
    // check data
    if (this.isIsEmptyFormData === true) {
      this.customizeBtn[0].visible = false;
      this.canInsert = false;
      this.canUpdate = false;
      this.canDelete = false;
      this.disableComponent(true);
      return;
    }
    const xUser = JSON.parse(localStorage.getItem('user:Xuser'));
    const userId = localStorage.getItem('user:userId');
    this.phaseOwner = (xUser[0].isUserAdmin ? true : false) || (userId === this.beratungsphaseFormData.userId);
    this.open = (!this.beratungsphaseFormData.datumBis ? true : false) && (!this.beratungsphaseFormData.fallDatumBis ? true : false);
    this.archived = this.beratungsphaseFormData.faLeistungArchivID ? true : false;
    if (this.getFallRightsModel.mayClose || this.phaseOwner) {
      // set update-mode
      this.canUpdate = this.open;

      // neue Logik für Reopen: Fallverlaufbesitzer darf nicht wiederöffnen, nur Phasenbesitzer
      this.getFallRightsModel.mayReOpen = !this.open && !this.archived && this.phaseOwner && this.userHasRight('CtlFaPhaseReopen');
    } else {
      // not owner, cannot reopen case
      this.getFallRightsModel.mayReOpen = false;

      // user cannot modify item
      this.canUpdate = false;
    }
    // handle controls
    this.customizeBtn[0].visible = this.getFallRightsModel.mayReOpen;
    this.readOnlySettingComponents.datumVon = !this.open;
    this.readOnlySettingComponents.sar = !this.open;
    if (!this.isReadOnly) {
      this.disableComponent(!(this.open && this.canUpdate));
    }
  }
  userHasRight(name: any) {
    const userRole = getRoleLocalStorage(name);
    if (userRole && userRole.IsRead) {
      return userRole.IsRead;
    }
    return false;
  }
  init(faPhaseID) {
    if (faPhaseID < 1) {
      this.setEditMode();
      return;
    }
    if (this.checkHideSelectBoxDPL()) {
      this.BeratungsphasesSandbox.loadDPLSelectboxData();
    }
    this.setEditMode();
    this.loadDataGrund();
  }
  processBeforeOpenForm(faPhaseID) {
    this.BeratungsphasesSandbox.loadSARSelectboxData();
    this.isChangedData = false;
    this.isLoadData = true;
    if (!isNullOrUndefined(this.datumBisFafuhrung)) {
      this.isReadOnly = true;
      this.showHeaderButtonInReadMode();
      this.BeratungsphasesSandbox.loadDPLSelectboxData();
      this.loadDataGrund();
      return;
    }
    if (this.isOpen) {
      this.isOpen = false;
      this.showHeaderButtonInEditModeWhenClickEditBtn();
      this.isReadOnly = false;
      return;
    }
    if (!this.isAddNewNode && !this.isConcurrency) {
      this.showHeaderButtonInReadMode();
      this.isReadOnly = true;
      this.disableComponent(true);
      if (this.isUndoChange) {
        this.isUndoChange = false;
        return;
      }
      this.init(faPhaseID);
      return;
    }
    if (this.isAddNewNode) {
      this.showHeaderButtonInEditModeWhenClickEditBtn();
      this.isAddNewNode = false;
      this.isReadOnly = false;
      this.init(faPhaseID);
      return;
    }
    if (this.isConcurrency) {
      if (this.beratungsphaseFormData.datumBis) {
        this.reOpenEditFrom();
        return;
      }
      this.showHeaderButtonInEditModeWhenClickEditBtn();
      this.isConcurrency = false;
      this.init(faPhaseID);
      return;
    }
  }
  initialStatusComponentsInEditMode(datumBis: any) {
    this.showHeaderButtonInEditModeWhenClickEditBtn();
    if (datumBis) {
      this.disableComponent(true);
      return;
    }
    this.disableComponent(false);
  }
  showHeaderButtonInEditModeWhenClickEditBtn() {
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = false;
    this.customizeBtn[4].visible = true;
    this.customizeBtn[5].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.showPencilIcon(!this.customizeBtn[3].visible);
  }
  /**
    * 2018/10/15: TuanHA
    * Create function to initialize data when load form
   */
  initData() {
    this.currentRouter = this.router.url;
    this.fSModuleIDModel.fSModuleID = FallfuhrungTreeConstant.ModulIdFs;
  }
  /**
   * 2018/10/16: TuanHA
  * Create function to process all events when user click on head button and menu item
  * @param $event
  */
  toolBarOnItemClickTopHeader($event) {
    switch ($event) {
      case this.RE_OPEN_BTN:
        {
          this.onClickReOpenBtn();
          return;
        }
      case this.NEUES_INTAKE_BTN:
      case this.NEUE_BERATUNGSPHASE_BTN:
        {
          this.displayErrorMsgWhenAddNew();
          return;
        }
      case this.BEARBEITEN_BTN:
        {
          this.onClickBearbeitenBtn();
          return;
        }
      case this.SPEICHERN_BTN:
        {
          setTimeout(() => {
            this.saveFormData();
          });
          return;
        }
      case this.ABBRECHERN_BTN:
        {
          this.onClickAbbrechernBtn();
          return;
        }
      case this.DELETE_MENU_ITEM:
        {
          this.displayErrorMsgWhenDelete();
          return;
        }
      default:
        break;
    }
  }
  displayErrorMsgWhenAddNew() {
    this.isErrorClosed = true;
    this.messageErr = this.translateService.instant('D005Beratungsphase.Msg.notAllowAddNew');
  }
  displayErrorMsgWhenDelete() {
    this.isErrorClosed = true;
    this.messageErr = this.translateService.instant('D005Beratungsphase.Msg.notAllowDelete');
  }
  displayErrorMsgWhenInvalidDataForm() {
    this.isErrorClosed = true;
    this.messageErr = this.translateService.instant('D005Beratungsphase.Msg.invalidDataForm');
  }
  onClickAbbrechernBtn() {
    if (this.isReadOnly) {
      this.showHeaderButtonInReadMode();
      return;
    }
    if (this.isDisabledSpeichern || this.isDatenClickConcurrency) {
      this.setFocusOutDateBox();
      this.updateFormDataLatestCancelConcurrency();
      this.isDatenClickConcurrency = false;
      return;
    }

    if (this.isModifyData() || (this.validationGroup.instance.validate() && !this.validationGroup.instance.validate().isValid)) {
      this.handleActionPopup('onClickCancelBtnGrdTop', this.translateService.instant('D005Beratungsphase.Msg.undoChangeContentDialog'));
      return;
    }
    this.undoChangeFromData();
  }
  updateFormDataLatestCancelConcurrency() {
    this.BeratungsphasesSandbox.loadBeratungsphasesFormData(this.loadFormDataQueryModel);
    this.isConcurrency = false;
  }
  showHeaderButtonInReadMode() {
    if (this.beratungsphaseFormData.datumBis || !isNullOrUndefined(this.datumBisFafuhrung)) {
      this.customizeBtn[0].visible = true;
      this.customizeBtn[3].disabled = true;
    } else {
      this.customizeBtn[0].visible = false;
      this.customizeBtn[3].disabled = false;
    }
    this.customizeBtn[1].visible = true;
    this.customizeBtn[2].visible = true;
    this.customizeBtn[3].visible = true;
    this.customizeBtn[4].visible = false;
    this.customizeBtn[5].visible = false;
    this.customizeBtn = [...this.customizeBtn];
    this.showPencilIcon(!this.customizeBtn[3].visible);
  }
  headerBtnWhenCancelConcurrencyPopup(option: any) {
    this.customizeBtn[0].visible = !option;
    this.customizeBtn[1].visible = !option;
    this.customizeBtn[2].visible = !option;
    this.customizeBtn[3].visible = !option;
    this.customizeBtn[4].disabled = option;
    this.customizeBtn[5].visible = option;
    this.customizeBtn = [...this.customizeBtn];
    this.showPencilIcon(!this.customizeBtn[3].visible);
  }
  showPencilIcon(option: any) {
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: option,
      }
    );
  }
  onClickReOpenBtn() {
    this.reopenQueryModel.phaseCode = this.beratungsphaseFormData.faPhaseCode;
    this.reopenQueryModel.faLeistungId = this.beratungsphaseFormData.faLeistungId;
    this.BeratungsphasesSandbox.getReopenPhaseData(this.reopenQueryModel);
  }
  onClickBearbeitenBtn() {
    this.handleTextarea();
    this.initialStatusComponentsInEditMode(this.beratungsphaseFormData.datumBis);
  }
  saveFormData() {
    if (!this.isOpen) {
      this.setFocusOutDateBox();
      if (this.validationGroup.instance.validate() && !this.validationGroup.instance.validate().isValid) {
        this.displayErrorMsgWhenInvalidDataForm();
        return;
      }

      if (!isNullOrUndefined(this.beratungsphaseFormData.datumBis) && new Date(this.beratungsphaseFormData.datumVon).toISOString() > this.beratungsphaseFormData.datumBis.toISOString()) {
        this.handleActionPopup('messagePopup', this.translateService.instant('D005Beratungsphase.Msg.datumBisCantLessThanDatumVonContentDialog'));
        return;
      }
    }
    this.mapFormData();
    this.BeratungsphasesSandbox.updateFormData(this.beratungsphaseUpdateFormData);
  }

  doSaveSuccess() {
    this.isChangedData = false;
  }
  mapFormData() {
    this.beratungsphaseUpdateFormData.faPhaseID_old = this.beratungsphaseFormData.faPhaseId;
    this.beratungsphaseUpdateFormData.faLeistungId = this.beratungsphaseFormData.faLeistungId;
    this.beratungsphaseUpdateFormData.faPhaseCode = this.beratungsphaseFormData.faPhaseCode;
    this.beratungsphaseUpdateFormData.userId = this.beratungsphaseFormData.userId;
    this.beratungsphaseUpdateFormData.datumVon = moment(this.beratungsphaseFormData.datumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY);
    if (!isNullOrUndefined(this.beratungsphaseFormData.datumBis) && this.isEditMode) {
      this.beratungsphaseUpdateFormData.datumBis = moment(this.beratungsphaseFormData.datumBis).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY);
    } else {
      this.beratungsphaseUpdateFormData.datumBis = this.beratungsphaseFormData.datumBis;
    }
    this.beratungsphaseUpdateFormData.abschlussGrundCode = this.beratungsphaseFormData.abschlussGrundCode;
    this.beratungsphaseUpdateFormData.bemerkung = this.beratungsphaseFormData.bemerkung;
    this.beratungsphaseUpdateFormData.faPhaseTs = this.beratungsphaseFormData.faPhaseTs;
    this.beratungsphaseUpdateFormData.fsDienstleistungspaketIdBedarf = this.beratungsphaseFormData.fsDienstleistungspaketIdBedarf;
    this.beratungsphaseUpdateFormData.fsDienstleistungspaketIdZugewiesen = this.beratungsphaseFormData.fsDienstleistungspaketIdZugewiesen;

  }
  undoChangeFromData() {
    this.setFocusOutDateBox();
    this.BeratungsphasesSandbox.loadBeratungsphasesFormData(this.loadFormDataQueryModel);
    this.isUndoChange = true;
  }
  reOpenEditFrom() {
    this.disableComponent(false);
    this.showHeaderButtonWhenReOpen();
    this.beratungsphaseFormData.datumBis = null;
    this.customizeBtn[0].visible = false;
    this.canUpdate = true;
    this.isOpen = true;
    this.saveFormData();
  }
  showHeaderButtonWhenReOpen() {
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = false;
    this.customizeBtn[4].visible = true;
    this.customizeBtn[5].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.showPencilIcon(!this.customizeBtn[3].visible);
  }
  disableComponent(option: any) {
    this.readOnlySettingComponents.datumVon = option;
    this.readOnlySettingComponents.sar = option;
    this.readOnlySettingComponents.DPLzugewiesen = option;
    this.readOnlySettingComponents.DPLbedarf = option;
    this.readOnlySettingComponents.datumBis = option;
    this.readOnlySettingComponents.grund = option;
    this.readOnlySettingComponents.bemerkung = option;
    this.isReadOnly = option;
    this.isLoadData = option;
    this.isEditMode = !option;
    this.isErrorClosed = false;
    if (option === false) {
      this.focusDateBox();
      if (this.editor) {
        this.enableTextarea();
      }
      return;
    }
    if (this.editor) {
      this.disableTextarea();
    }
    this.customizeBtn[4].disabled = !option;
  }
  setValueSelectboxInReadMode(field: any) {
    if (field === 'SAR') {
      this.sarTextValue = this.beratungsphaseFormData.userId ? this.dataSARSelectboxes.filter(x => x.userID === this.beratungsphaseFormData.userId)[0].name : '';
      return;
    }
    if (field === 'DPL') {
      this.dplZugewiesenTextValue = this.beratungsphaseFormData.fsDienstleistungspaketIdZugewiesen ? this.dataDPLSelectboxes.filter(x => x.code === this.beratungsphaseFormData.fsDienstleistungspaketIdZugewiesen)[0].text : '';
      this.dplBedarfTextValue = this.beratungsphaseFormData.fsDienstleistungspaketIdBedarf ? this.dataDPLSelectboxes.filter(x => x.code === this.beratungsphaseFormData.fsDienstleistungspaketIdBedarf)[0].text : '';
      return;
    }
    if (field === 'GRUND') {
      this.grundTextValue = this.beratungsphaseFormData.abschlussGrundCode ? this.dataGrundSelectboxes.filter(x => x.code === this.beratungsphaseFormData.abschlussGrundCode)[0].text : '';
      return;
    }
  }

  onClickRowGridSAR($event) {
    this.beratungsphaseFormData.userId = $event.key;
  }

  valueChangeEventDataVon($event) {
    if (!isNullOrUndefined(this.beratungsphaseFormData.datumVon)) {
      this.checkDatumVonQueryModel.datumVon = this.beratungsphaseFormData.datumVon;
      this.BeratungsphasesSandbox.getCountDuplicateDatumVonData(this.checkDatumVonQueryModel);
    }
  }
  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.getFaLeistungByBaPersonIDQueryModel.baPersonID.toString();
      this.handleActionPopup('messagePopup', this.translateService.instant('D005Beratungsphase.Msg.ShiftClickMessage') + ' (' + 'ID=' + this.getFaLeistungByBaPersonIDQueryModel.baPersonID + ')');
    } else {
      text = this.personInfo;
      this.handleActionPopup('messagePopup', this.translateService.instant('D005Beratungsphase.Msg.DoubleClickMessage'));
    }
    copyElement(text);

  }
  // Shortcuts key
  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      if (!this.isReadOnly) {
        this.setKeyUpDateBox();
        event.preventDefault();
        setTimeout(() => {
          this.saveFormData();
        }, CommonConstant.SetTimeOut);
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      if (!this.isReadOnly) {
        this.setKeyUpDateBox();
        setTimeout(() => {
          this.onClickAbbrechernBtn();
        }, CommonConstant.SetTimeOut);
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
      event.preventDefault();
      if (this.isReadOnly) {
        this.displayErrorMsgWhenAddNew();
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
      this.displayErrorMsgWhenDelete();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
      event.preventDefault();
      if (!this.isReadOnly) {
        // TO DO:
      }
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
    if (!this.isReadOnly && this.keyFocus !== 'bemerkung') {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
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
  onCloseError() {
    this.isErrorClosed = false;
  }

  updateFormDataLatest() {
    this.BeratungsphasesSandbox.loadBeratungsphasesFormData(this.loadFormDataQueryModel);
    this.isConcurrency = true;
  }

  // Onkey Down
  onKeyDown(e) {
    if (this.isReadOnly) {
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
  onFocusIn(element, field: string, key) {
    if (this.isEditMode) {
      this.keyFocus = field;
      this.keyInput = key;
      if (field === 'DatumVon') {
        this.accessKeyItemFocused = 8;
      } else {
        this.accessKeyItemFocused = element.accessKey;
      }
    }
  }
  onFocusOut($event, field: string) {
    this.accessKeyItemFocused = 0;
    if (field === 'DatumBis') {
      if (document.getElementById('d005_phase-abschluss_datum-bis').textContent === this.VALUE_DATE_OUT_OF_RANGE_MESSAGE
        || document.getElementById('d005_phase-abschluss_datum-bis').textContent === this.VALUE_DATE_INCORRECT_FORMAT) {
        this.invalidMessageDatumBis = document.getElementById('d005_phase-abschluss_datum-bis').textContent;
      } else {
        this.invalidMessageDatumBis = null;
      }
    }
    if (field === 'DatumVon') {
      if (document.getElementById('d005_phase-eroffnung_datum-von').textContent === this.VALUE_DATE_OUT_OF_RANGE_MESSAGE
        || document.getElementById('d005_phase-eroffnung_datum-von').textContent === this.VALUE_DATE_INCORRECT_FORMAT) {
        this.invalidMessageDatumVon = document.getElementById('d005_phase-eroffnung_datum-von').textContent;
      } else {
        this.invalidMessageDatumVon = null;
      }
    }
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
          if (this.keyFocus === 'DatumBis') {
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
    setTimeout(() => {
      this.dateBox.focusStateEnabled = true;
      this.dateBox.instance.focus();
    }, (300));
  }
  // Handle close/refresh the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isModifyData()) {
      return false;
    }
  }

  getValueTextBox() {
    this.isChangedData = true;
  }
  onClosed() {
    this.isClosed = true;
  }

  onOpened() {
    this.isClosed = false;
  }
  onChangeData(event, key: string) {
    if (!this.isLoadData) {
      this.isChangedData = true;
    }
    if (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid) {
      this.isErrorClosed = false;
    }
  }
  disableTextarea() {
    setTimeout(() => {
      this.editor.edit.off();
    }, (300));
  }

  enableTextarea() {
    setTimeout(() => {
      this.editor.edit.on();
    }, (300));
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
  showPopup(message, popupType?) {
    this.popUpModel.message = message;
    if (popupType) {
      this.popUpModel.textYes = this.translateService.instant('D005Beratungsphase.NavigatorPopupConfirm.Yes');
      this.popUpModel.textNo = this.translateService.instant('D005Beratungsphase.NavigatorPopupConfirm.No');
      this.popUpModel.title = this.translateService.instant('D005Beratungsphase.NavigatorPopupConfirm.Title');
      this.popUpModel.isVisible = true;
    } else {
      this.popUpModel.textYes = this.translateService.instant('D005Beratungsphase.PopupConfirm.Yes');
      this.popUpModel.textNo = this.translateService.instant('D005Beratungsphase.PopupConfirm.No');
      this.popUpModel.title = this.translateService.instant('D005Beratungsphase.PopupConfirm.Title');
      this.popUpModel.isVisible = true;
    }
  }
  showMesagePopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleTitle = true;
    this.popUpModel.title = this.translateService.instant('D005Beratungsphase.Msg.Information');
    this.popUpModel.isVisible = true;
  }
  handleActionPopup(key, message: string, reOpen?: boolean) {
    this.initPopUpModel();
    if (key === 'onClickCancelBtnGrdTop') {
      this.popUpModel.funcYes = () => {
        this.undoChangeFromData();
        this.popUpModel.isVisible = false;
      };
      this.popUpModel.funcNo = () => {
        this.popUpModel.isVisible = false;
      };
      this.showPopup(message);
    }
    if (key === 'phaseWiederoffnen') {
      this.popUpModel.funcYes = () => {
        this.popUpModel.isVisible = false;
        this.reOpenEditFrom();
      };
      this.popUpModel.funcNo = () => {
        this.popUpModel.isVisible = false;
      };
      this.showPopup(message);
    }
    if (key === 'messagePopup') {
      this.showMesagePopup(message);
      if (reOpen) {
        this.popUpModel.funcHiding = () => {
          this.handleActionPopup('phaseWiederoffnen', this.translateService.instant('D005Beratungsphase.Msg.reopenContentDialog'));
        };
      }
    }
    if (key === 'onNavigate') {
      this.popUpModel.funcYes = () => {
        this.isEditMode = false;
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
  isModifyData(): boolean {
    if (JSON.stringify(this.beratungsphaseFormData) !== JSON.stringify(this.beratungsphaseFormDataTmp)) {
      return true;
    }
    return false;
  }
  canDeactivate() {
    if (this.isModifyData()) {
      this.handleActionPopup('onNavigate', this.translateService.instant('D005Beratungsphase.NavigatorPopupConfirm.Message'));
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

  loadDataGrund() {
    this.modelQueryGrundSelectbox.FaPhaseCode = this.beratungsphaseFormData.faPhaseCode;
    if (this.beratungsphaseFormData.faPhaseCode === 1) {
      this.modelQueryGrundSelectbox.FaPhaseCode = 'FaAbschlussgrundIntPhase';
    } else {
      this.modelQueryGrundSelectbox.FaPhaseCode = 'FaAbschlussgrundBerPhase';
    }

    if (this.beratungsphaseFormData.faPhaseCode == null) {
      this.modelQueryGrundSelectbox.FaPhaseCode = 'FaAbschlussgrundPhase';
    }
    this.isLoadGrundData = true;
    this.BeratungsphasesSandbox.loadGrundSelectboxData(this.modelQueryGrundSelectbox);
  }

  checkHideSelectBoxDPL(): boolean {
    const a = this.licensedModuleModel.indexOf(26);
    if (a !== -1) {
      return true;
    } else {
      return false;
    }
  }

  setKeyUpDateBox() {
    this.dateBox.valueChangeEvent = 'keyup';
    this.datumBis.valueChangeEvent = 'keyup';
  }

  setFocusOutDateBox() {
    this.dateBox.valueChangeEvent = 'focusout';
    this.datumBis.valueChangeEvent = 'focusout';
  }

  handleTextarea() {
    if (isNullOrUndefined(this.editor)) {
      return;
    }
    if (this.isReadOnly) {
      this.editor.edit.off();
      return;
    }
    this.editor.edit.on();
  }

  showPopupConcurrency(message) {
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.textYes = this.translateService.instant('D005Beratungsphase.PopupConfirm.Abbrechen');
    this.popUpConcurrencyModel.textNo = this.translateService.instant('D005Beratungsphase.PopupConfirm.Daten');
    this.popUpConcurrencyModel.title = this.translateService.instant('D005Beratungsphase.PopupConfirm.Title');

    this.popUpConcurrencyModel.isVisible = true;
    this.popUpConcurrencyModel.funcYes = () => {
      this.doAbbrechenConcurrency();
    };
    this.popUpConcurrencyModel.funcNo = () => {
      this.popUpConcurrencyModel.isVisible = false;
      this.updateFormDataLatest();
      this.isDatenClickConcurrency = true;
    };
    this.popUpConcurrencyModel.funcHiding = () => {
      this.doAbbrechenConcurrency();
    };
  }

  doAbbrechenConcurrency() {
    this.popUpConcurrencyModel.isVisible = false;
    this.concurrency = CommonConstant.Concurrency;
    this.isDisabledSpeichern = true;
    this.headerBtnWhenCancelConcurrencyPopup(true);
  }

  showHeaderButtonDeleteConcurrency() {
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = false;
    this.customizeBtn[4].visible = false;
    this.customizeBtn[5].visible = false;
    this.customizeBtn = [...this.customizeBtn];
    this.listBtn = [];
    this.showPencilIcon(false);
  }

  onFocusedRowChanged(e) {
    this.beratungsphaseFormData.userId = e.row.data.userID;
  }

  onSAROpened() {
    const findIndex = this.dataSARSelectboxes.findIndex(x => x.userID === this.beratungsphaseFormData.userId);
    setTimeout(() => {
      this.focusedRowID = this.beratungsphaseFormData.userId;
      this.SarGrid.instance.focus(this.SarGrid.instance.getCellElement(findIndex, 0));
    }, CommonConstant.SetTimeOut300);
  }

  validationCallback($event) {
    if (!this.beratungsphaseFormData || $event.value === null) {
      return true;
    }
    this.setFocusOutDateBox();
    const startDate = new Date(moment(this.beratungsphaseFormData.datumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY)).getTime();
    const endDate = new Date(moment($event.value).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY)).getTime();
    const difDate = Math.floor(Math.floor(((endDate - startDate) / (86400000))));
    if (difDate < 0) {
      return false;
    }
    return true;
  }
}
