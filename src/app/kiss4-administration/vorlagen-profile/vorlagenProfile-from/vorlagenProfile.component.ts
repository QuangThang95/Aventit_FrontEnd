import {
  AfterViewInit,
  Component,
  DoCheck,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { getLanguageCodeFromLocalStorage, getConditionListBtn, getXuserSessionStorage } from '@shared/utilites';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import {
  DxDataGridComponent,
  DxFormComponent,
  DxTagBoxComponent,
  DxTextAreaComponent,
  DxTextBoxComponent,
} from 'devextreme-angular';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { VorlagenProfile } from '../models';
import { VorlagenProfileConstant } from '../vorlagenProfile.constant';
import { VorlagenProfileSandbox } from '../vorlagenProfile.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vorlagen-profile',
  templateUrl: './vorlagenProfile.component.html',
  styleUrls: ['./vorlagenProfile.component.scss']
})
@SetClassRight('CtlVorlagenProfile')
export class VorlagenProfileComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, DoCheck {

  // refactor
  @ViewChild('detailProfileForm') detailFrom: DxFormComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('detailTagBox') detailTagBox: DxTagBoxComponent;
  @ViewChild('detailTextBox') detailTextBox: DxTextBoxComponent;
  @ViewChild('searchBox') searchBox: DxTextBoxComponent;
  @ViewChild('formTextArea') formTextArea: DxTextAreaComponent;
  profilename: string;
  isVisible = false;
  gridData = [];
  languageCode: any;
  languageCodeXuser: any;
  selectedRowData: VorlagenProfile;
  currentLanguage: string;
  currentUserId: number;
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  gridFunctionKey = 'gridSettingR009';
  autoWidth = true;
  popupHtml: any;
  showPrintPopup = false;
  profilname: string;
  beschreibung: string;
  merkmale: any;
  vorlagenProfile: VorlagenProfile;
  isReadOnly = true;
  isOldReadOnly = true;
  isAddNew = false;
  isUpdate = false;
  oldDataValue: any;
  oldArrMerkmale: any;
  newDataValue: any;
  newArrMerkmale: any;
  tagBoxOptions: {
    items: any,
    displayExpr: string,
    valueExpr: string,
    showSelectionControls: string,
    width: string,
    value?: number[]
  };
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
  merkmaleTags: any;
  initTags: any[];
  // end refactor
  textDetail = {
    profilename: VorlagenProfileConstant.profilename,
    merkmale: VorlagenProfileConstant.merkmale,
    description: VorlagenProfileConstant.description
  };
  isChange = false;

  @Output() toolbarSelection: any;
  searchString = '';
  remainMessage: any;
  selectedProfile = VorlagenProfile;
  reloadSelected = 0;
  reloadGrid = 0;
  detailToListe: any;

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

  listBtn: any;

  poToolKey = {
    information: 'information',
    confirm: 'confirm',
    concurrency: 'concurrency',
    concurrencyDel: 'concurrencyDel',
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
    neuer: 'neuer',
    loschen: 'loschen',
    ok: 'ok'
  };

  isConcurrency = false;
  isConcurrencyDel = false;
  isInfoMessage = false;
  isDisableSpeichern = false;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;

  private subscriptions: Array<Subscription> = [];
  pageTitle: any;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  customizeBtnDetail = [];

  popUpModel: PopUpModel;
  isEnterSearch = false;

  httpErrorCodes = [
    AppEnums.StatusCode.LIMIT_FILE_SIZE,
    AppEnums.StatusCode.XML_FORMAT,
    AppEnums.StatusCode.STATUS_CODE_421,
    AppEnums.StatusCode.UNPROCESSABLE_ENTITY,
    AppEnums.StatusCode.BAD_REQUEST,
    AppEnums.StatusCode.STATUS_CODE_500,
    AppEnums.StatusCode.STATUS_CODE_404];

  icon = {
    add: CommonConstant.IconAdd,
    edit: CommonConstant.IconEdit,
    save: CommonConstant.IconSave,
    cancel: CommonConstant.IconCancel
  };

  accessKeyItemFocused = 0;
  keyFocus: string;
  keyInput: string;
  selectedKeys = [];
  gridIndex = 0;
  vorlagenProfiletext = '';
  textValue = '';
  tagsValue = [];
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor(injector: Injector,
    public vorlagenProfileSandbox: VorlagenProfileSandbox,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox,
    private moduleConfigSandbox: ModuleConfigSandbox) {
    super(injector);
  }

  ngAfterViewInit(): void {

  }

  // #region "Businness, load data for combox..."
  ngOnInit() {
    this.customizeBtnDetail = [
      {
        text: 'VorlagenProfile.Detail.Save',
        visible: false,
        useSubmitBehavior: true,
        icon: this.icon.save,
        name: 'speichern'
      },
      {
        text: 'VorlagenProfile.Detail.Cancel',
        visible: false,
        useSubmitBehavior: true,
        icon: this.icon.cancel,
        name: 'abbrechen'
      },
      {
        text: 'VorlagenProfile.Detail.Add',
        visible: true,
        useSubmitBehavior: true,
        icon: this.icon.add,
        name: 'neuer'
      },
      {
        text: 'VorlagenProfile.Detail.Edit',
        visible: true,
        useSubmitBehavior: true,
        icon: this.icon.edit,
        name: 'bearbeiten'
      },
      {
        text: 'VorlagenProfile.Detail.Delete',
        visible: true,
        useSubmitBehavior: true,
        locateInMenu: 'always',
        disabled: false,
        name: 'loschen'
      }
    ];

    this.titlePage = this.translateService.instant('VorlagenProfile.Title');
    this.setTitle(this.titlePage);
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.vorlagenProfileSandbox.registerEvents();
    this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    this.registerEvents();
    this.getGridData();
    this.isDisableSpeichern = false;
    this.currentLanguage = localStorage.getItem('currentLang.Culture');
    this.currentUserId = parseFloat(localStorage.getItem('user:userId'));
    this.tagBoxOptions = {
      items: [],
      displayExpr: 'text',
      valueExpr: 'code',
      showSelectionControls: 'true',
      width: '96%',
      value: []
    };
    this.initTags = [];
    this.popupData = this.initPopupData;

    this.loadXProfileTag();
    this.setTagBoxOption();
    this.initPopUpModel();
  }

  ngDoCheck() {
    if (this.isReadOnly !== this.isOldReadOnly) {
      this.moduleConfigSandbox.updateEditModeStatus({ attr: !this.isReadOnly });
      this.isOldReadOnly = this.isReadOnly;
    }
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.vorlagenProfileSandbox.unregisterEvents();
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  // #endregion

  getAdditionalButtons() {
    const tmpArr = CommonConstant.AdditionalButtons;
    tmpArr.splice(7, 1);
    return tmpArr;
  }

  private registerEvents(): void {
    this.subscriptions.push(this.moduleConfigSandbox.isEditModeStatus$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data === false) {
          this.isReadOnly = true;
        }
      }
    }));
    this.subscriptions.push(
      this.vorlagenProfileSandbox.vorlagenProfileData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message, this.poToolKey.information);
          } else {
            this.gridData = data;
            if (this.gridData.length > 0) {
              this.gridIndex = isNullOrUndefined(this.gridIndex) ? 0 : this.gridIndex;
              this.selectedKeys = [this.gridData[this.gridIndex].xProfileID];
              this.vorlagenProfile = this.gridData[this.gridIndex];
              this.loadXProfileID(this.selectedKeys[0]);
              setTimeout(() => {
                this.dataGrid.instance.selectRowsByIndexes([this.gridIndex]);
              }, CommonConstant.SetTimeOut);
            }
          }
        }
      }),
      this.vorlagenProfileSandbox.insertXProfileResult$.subscribe(insertResult => {
        if (!isNullOrUndefined(insertResult) && insertResult !== false) {
          if (this.httpErrorCodes.includes(insertResult.status)) {
            const message = JSON.parse(insertResult._body);
            this.initPopUpModel();
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message, this.poToolKey.information);
          } else {
            if (insertResult[0].profileID > 0) {
              this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
              this.isChange = false;
              this.isAddNew = false;
              this.isReadOnly = true;
              this.profilename = '';
              this.initReadOnlyButton();
              this.gridIndex = this.gridData.length;
              this.getGridData();
            }
          }
        }
      }),
      this.vorlagenProfileSandbox.updateXProfileResult$.subscribe(updateResult => {
        if (!isNullOrUndefined(updateResult) && updateResult !== false) {
          if (this.httpErrorCodes.includes(updateResult.status)) {
            const message = JSON.parse(updateResult._body);
            this.initPopUpModel();
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message, this.poToolKey.information);
          } else {
            if (updateResult.status === AppEnums.StatusCode.STATUS_CODE_409) {
              const message = JSON.parse(updateResult._body);
              if (message.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
                this.isConcurrency = true;
                this.isUpdate = true;
                this.initPopUpModel();
                this.showPopupConfirm(message.message, this.poToolKey.concurrency);
              }
            } else if (updateResult[0].value === true) {
              this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
              this.isChange = false;
              this.isUpdate = false;
              this.isReadOnly = true;
              this.initReadOnlyButton();
              this.getGridData();
            }
          }
        }
      }),
      this.vorlagenProfileSandbox.deleteXProfileResult$.subscribe(deleteResult => {
        if (!isNullOrUndefined(deleteResult) && deleteResult !== false) {
          if (this.httpErrorCodes.includes(deleteResult.status)) {
            const message = JSON.parse(deleteResult._body);
            this.initPopUpModel();
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message, this.poToolKey.information);
          } else {
            if (deleteResult.status === AppEnums.StatusCode.STATUS_CODE_409) {
              const message = JSON.parse(deleteResult._body);
              if (message.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
                this.isConcurrencyDel = true;
                this.isInfoMessage = true;
                this.initPopUpModel();
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;
                this.showPopupConfirm(message.message, this.poToolKey.concurrencyDel);
                this.getGridData();
              }
            } else if (deleteResult.status === AppEnums.StatusCode.STATUS_CODE_428) {
              const message = JSON.parse(deleteResult._body);
              if (message.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_428001) {
                this.isConcurrencyDel = true;
                this.isInfoMessage = true;
                this.initPopUpModel();
                this.remainMessage = {
                  visible: true,
                  message: message.message,
                };
              }
            } else if (deleteResult.value === true) {
              this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
              this.gridIndex = 0;
              this.initReadOnlyButton();
              this.getGridData();
              this.isReadOnly = true;
            }
          }
        }
      }),
      this.vorlagenProfileSandbox.xProfileID$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message, this.poToolKey.information);
          } else {
            this.initTags = [];
            data.forEach(element => {
              this.initTags.push(element.xProfileTagID);
            });
            this.tagsValue = this.initTags;
            this.setTagBoxOption(this.merkmaleTags, this.initTags);
          }
        } else {
          this.setTagBoxOption(this.merkmaleTags, []);
        }
      }),
      this.vorlagenProfileSandbox.xProfileTagID$.subscribe(data => {
        if (!isNullOrUndefined(data) && data.length > 0) {
          if (this.httpErrorCodes.includes(data.status)) {
            const message = JSON.parse(data._body);
            this.initPopUpModel();
            this.popUpModel.isVisibleYes = false;
            this.popUpModel.isVisibleNo = false;
            this.showPopupConfirm(message.message, this.poToolKey.information);
          } else {
            this.merkmaleTags = data;
            this.setTagBoxOption(data, null);
          }
        }
      })
    );
  }

  // #region Suche
  onProfilenameChange() {
    if (!this.isEnterSearch) {
      this.isVisible = true;
      setTimeout(() => {
        this.getGridData(this.profilename);
        this.isVisible = false;
      }, CommonConstant.SetTimeOut500);
    } else {
      this.isEnterSearch = !this.isEnterSearch;
    }

  }
  onKeyDownSearch(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.isEnterSearch = true;
      this.isVisible = true;
      setTimeout(() => {
        this.getGridData(this.profilename);
        this.isVisible = false;
      }, CommonConstant.SetTimeOut500);
    }
  }
  onCloseError() {
    this.remainMessage = {
      visible: false,
      message: '',
    };
  }
  // #endregion


  // #region liste
  getGridData(query?: string) {
    this.vorlagenProfileSandbox.loadVorlagenProfileInitData({
      languageCode: this.languageCode,
      xProfileTypeCode: 1,
      profileNameSuche: query ? query : ''
    });
  }

  gridOnContentReady(event) {
    setTimeout(() => {
      this.dataGrid.instance.selectRowsByIndexes([this.gridIndex]);
      this.vorlagenProfile = this.dataGrid.instance.getSelectedRowsData()[0];
    }, CommonConstant.SetTimeOut500);
  }

  onSelected(event) {
    this.selectedKeys = [event.xProfileID];
    this.vorlagenProfile = event;
    this.loadXProfileID(event.xProfileID);

    for (let i = 0; i < this.gridData.length; i++) {
      if (this.gridData[i].xProfileID === event.xProfileID) {
        this.gridIndex = i;
        return;
      }
    }
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
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[
      e
    ];
    if (this.gridFunctionModel.autoSaveSetting) {
      localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
    }
  }

  printPdf() {
    this.printer.setData(this.gridData, false, [
      {
        caption: 'ID',
        dataField: 'xProfileID'
      },
      {
        caption: 'Profilname',
        dataField: 'text'
      },
      {
        caption: 'Merkmale',
        dataField: 'tags'
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

  // #region detail
  loadXProfileID(id: number): void {
    this.vorlagenProfileSandbox.loadXProfileData({
      xProfileID: id
    });
  }

  loadXProfileTag(): void {
    this.vorlagenProfileSandbox.loadXProfileTagsData({
      languageCode: this.languageCode
    });
  }

  setTagBoxOption(tags?: any, initValue?: any): void {
    setTimeout(() => {
      if (!isNullOrUndefined(this.detailTagBox)) {
        this.detailTagBox.items = tags;
        this.detailTagBox.displayExpr = 'text';
        this.detailTagBox.valueExpr = 'code';
        this.detailTagBox.showSelectionControls = true;
        this.detailTagBox.width = '100%';
        this.detailTagBox.value = initValue !== [] ? initValue : [];
      }
    }, CommonConstant.SetTimeOut500);
  }

  initReadOnlyButton() {
    this.customizeBtnDetail = [
      {
        text: 'VorlagenProfile.Detail.Add',
        visible: true,
        useSubmitBehavior: true,
        icon: this.icon.add,
        name: 'neuer'
      },
      {
        text: 'VorlagenProfile.Detail.Edit',
        visible: true,
        useSubmitBehavior: true,
        icon: this.icon.edit,
        name: 'bearbeiten'
      },
      {
        text: 'VorlagenProfile.Detail.Delete',
        visible: true,
        useSubmitBehavior: true,
        locateInMenu: 'always',
        disabled: false,
        name: 'loschen'
      }
    ];
  }

  initEditButton() {
    this.customizeBtnDetail = [
      {
        text: 'VorlagenProfile.Detail.Save',
        visible: true,
        useSubmitBehavior: true,
        disabled: this.isDisableSpeichern,
        icon: this.icon.save,
        name: 'speichern'
      },
      {
        text: 'VorlagenProfile.Detail.Cancel',
        visible: true,
        useSubmitBehavior: true,
        icon: this.icon.cancel,
        name: 'abbrechen'
      },
      {
        text: 'VorlagenProfile.Detail.Delete',
        visible: true,
        useSubmitBehavior: true,
        locateInMenu: 'always',
        disabled: this.isAddNew,
        name: 'loschen'
      }
    ];
  }

  toolBarOnItemClickDetail(event) {
    switch (event) {
      case this.poToolKey.speichern:
        if (this.isAddNew === true) {
          this.insertProfile();
        }
        if (this.isUpdate === true) {
          this.updateProfile();
        }
        break;
      case this.poToolKey.abbrechen:
        this.cancelAll();
        break;
      case this.poToolKey.neuer:
        this.insertInit();
        break;
      case this.poToolKey.bearbeiten:
        this.listBtn = [];
        this.oldDataValue = {
          profile: this.vorlagenProfile.text,
          description: this.vorlagenProfile.description
        };
        this.newDataValue = {
          profile: this.vorlagenProfile.text,
          description: this.vorlagenProfile.description
        };
        this.newArrMerkmale = this.detailTagBox.value;
        this.oldArrMerkmale = this.detailTagBox.value;
        this.isReadOnly = false;
        this.isUpdate = true;
        setTimeout(() => {
          this.detailTextBox.instance.focus();
          this.initEditButton();
          this.textValue = this.detailTextBox.value;
          this.tagsValue = this.detailTagBox.value;
        }, CommonConstant.SetTimeOut);
        break;
      case this.poToolKey.loschen:
        this.initPopUpModel();
        this.showPopupConfirm(this.translateService.instant('VorlagenProfile.Message.Delete'), this.poToolKey.loschen);
        break;
      default:
        break;
    }
  }

  insertInit() {
    this.listBtn = [];
    this.oldDataValue = {
      profile: '',
      description: ''
    };
    this.newDataValue = {
      profile: '',
      description: ''
    };
    this.oldArrMerkmale = [];
    this.isReadOnly = false;
    this.isAddNew = true;
    setTimeout(() => {
      this.detailTextBox.instance.focus();
      this.detailTextBox.value = '';
      this.detailTagBox.value = [];
      this.detailTextBox.isValid = true;
      this.initEditButton();
    }, CommonConstant.SetTimeOut);
  }

  cancelAll() {
    if (this.isAddNew === true) {
      this.initPopUpModel();
      this.showPopupConfirm(this.translateService.instant('VorlagenProfile.Message.Add'), this.poToolKey.neuer);
    } else if (this.isUpdate === true && this.isConcurrency === false && this.isChangeDetailValue()) {
      this.initPopUpModel();
      this.showPopupConfirm(this.translateService.instant('VorlagenProfile.Message.Edit'), this.poToolKey.bearbeiten);
    } else {
      this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
      this.isUpdate = false;
      this.isReadOnly = true;
      this.initReadOnlyButton();
    }
    if (this.isConcurrency === true) {
      this.isUpdate = false;
      this.isReadOnly = true;
      this.isConcurrency = false;
      this.getGridData();
    }
    if (this.isDisableSpeichern === true) {
      this.isDisableSpeichern = false;
    }


  }

  isChangeDetailValue(): boolean {
    if (isNullOrUndefined(this.detailTagBox.value)) {
      return false;
    } else {
      return (this.textValue !== this.detailTextBox.value || this.tagsValue !== this.detailTagBox.value);
    }

  }

  onTagChange() {
    this.isDisableSpeichern = false;
  }

  onTextChange() {
    this.isDisableSpeichern = false;
  }

  insertProfile() {
    if (!isNullOrUndefined(this.detailTextBox.value) && this.detailTextBox.value.trim() !== '') {
      if (this.detailTextBox.value.length > 300) {
        this.showMaxLenghtMessage();
      } else {
        this.vorlagenProfileSandbox.insertXProfile(
          this.detailTextBox.value.trim()
          , 1
          , this.detailTagBox.value.toString());
      }
    } else {
      this.showRequiredMessage();
    }
  }

  updateProfile() {
    if (!isNullOrUndefined(this.detailTextBox.value) && this.detailTextBox.value.trim() !== '') {
      if (this.detailTextBox.value.length > 300) {
        this.showMaxLenghtMessage();
      } else {
        this.vorlagenProfileSandbox.updateXProfileData({
          XProfileTypeCode: 1,
          NameTID: this.vorlagenProfile.nameTID,
          Name: this.detailTextBox.value.trim(),
          Description: '',
          Modifier: '',
          Modified: null,
          XProfileID: this.vorlagenProfile.xProfileID,
          XProfileTS: this.vorlagenProfile.xProfileTS,
          SelectedValues: this.initTags.toString()
        });
      }
    } else {
      this.showRequiredMessage();
    }
  }

  deleteProfile() {
    this.vorlagenProfileSandbox.DeleteXProfile({
      XProfileID: this.vorlagenProfile.xProfileID,
      XProfileTS: this.vorlagenProfile.xProfileTS
    });
  }

  /**
   * Show popup
   * @param message message display
   * @param key name of button
   */

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

  showPopupConfirm(message, key) {
    this.popUpModel.message = message;
    if (key === this.poToolKey.information || key === this.poToolKey.concurrencyDel) {
      this.popUpModel.title = this.translateService.instant('VorlagenProfile.Message.Information');
    } else {
      this.popUpModel.title = this.translateService.instant('VorlagenProfile.Message.Title');
    }

    if (key === this.poToolKey.concurrency) {
      this.popUpModel.textYes = this.translateService.instant('VorlagenProfile.PopupButton.DatenAktualisieren');
      this.popUpModel.textNo = this.translateService.instant('VorlagenProfile.PopupButton.Abbrechen');
    } else {
      this.popUpModel.textYes = this.translateService.instant('VorlagenProfile.PopupButton.Yes');
      this.popUpModel.textNo = this.translateService.instant('VorlagenProfile.PopupButton.No');
    }

    this.popUpModel.isVisible = true;
    this.popUpModel.funcYes = () => {
      this.popUpModel.isVisible = false;
      switch (key) {
        case this.poToolKey.neuer:
          this.initTags = [];
          this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
          this.isAddNew = false;
          this.isReadOnly = true;
          this.vorlagenProfile = this.dataGrid.instance.getSelectedRowsData()[0];
          setTimeout(() => {
            this.loadXProfileID(this.vorlagenProfile.xProfileID);
          }, CommonConstant.SetTimeOut500);
          this.initReadOnlyButton();
          break;
        case this.poToolKey.loschen:
          this.deleteProfile();
          break;
        case this.poToolKey.concurrency:
          this.isDisableSpeichern = false;
          this.isUpdate = false;
          this.isReadOnly = true;
          this.isConcurrency = false;
          this.initReadOnlyButton();
          this.getGridData();
          break;
        case this.poToolKey.bearbeiten:
          this.initTags = [];
          this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
          this.isUpdate = false;
          this.isReadOnly = true;
          this.detailTextBox.value = this.vorlagenProfile.text;
          this.loadXProfileID(this.vorlagenProfile.xProfileID);
          this.initReadOnlyButton();
          break;
        default:
          break;
      }
    };
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
      switch (key) {
        case this.poToolKey.neuer:
          break;
        case this.poToolKey.bearbeiten:
          break;
        case this.poToolKey.loschen:
          break;
        case this.poToolKey.concurrency:
          this.isDisableSpeichern = true;
          setTimeout(() => {
            this.initEditButton();
            this.isReadOnly = false;
            this.getGridData();
          }, CommonConstant.SetTimeOut500);
          break;
        case this.poToolKey.concurrencyDel:
          this.isUpdate = false;
          this.isReadOnly = true;
          this.getGridData();
          break;
        default:
          break;
      }
    };
  }

  showRequiredMessage() {
    this.remainMessage = {
      visible: true,
      message: this.translateService.instant('VorlagenProfile.Message.NameRequired')
    };
  }

  showMaxLenghtMessage() {
    this.remainMessage = {
      visible: true,
      message: this.translateService.instant('VorlagenProfile.Message.MaxLenght')
    };
  }

  compare(arr1, arr2) {
    if (arr1.length !== arr2.length) { return false; }
    for (let k = 0; k < arr1.length; k++) {
      if (arr2.indexOf(arr1[k]) === -1) { return false; }
    }
    for (let k = 0; k < arr2.length; k++) {
      if (arr1.indexOf(arr2[k]) === -1) { return false; }
    }
    return true;
  }

  onSearchChange(data: any, key: any) {
    if (!this.isReadOnly) {
      switch (key) {
        case this.textDetail.profilename:
          this.newDataValue.profile = data;
          this.newDataValue.profile = isNullOrUndefined(data) ? '' : data;
          break;
        case this.textDetail.merkmale:
          this.newArrMerkmale = data;
          break;
        case this.textDetail.description:
          this.newDataValue.description = data;
          break;
        default:
      }

      if (JSON.stringify(this.oldDataValue) !== JSON.stringify(this.newDataValue)) {
        this.isChange = true;
        this.moduleConfigSandbox.updateDirtyFormStatus(true);
      } else {
        this.newArrMerkmale = isNullOrUndefined(this.newArrMerkmale) ? [] : this.newArrMerkmale;
        this.compare(this.oldArrMerkmale, this.newArrMerkmale) ? this.moduleConfigSandbox.updateDirtyFormStatus(false) : this.moduleConfigSandbox.updateDirtyFormStatus(true);
        this.compare(this.oldArrMerkmale, this.newArrMerkmale) ? this.isChange = false : this.isChange = true;
      }
    }
  }

  /**
   * Handle hot key Alt + charactor
   * @param event
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      this.formTextArea.instance.focus();
      if (this.isAddNew === true) {
        this.insertProfile();
      }
      if (this.isUpdate === true) {
        this.updateProfile();
      }
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {

      if (!this.isAddNew) {
        this.initPopUpModel();
        this.showPopupConfirm(this.translateService.instant('VorlagenProfile.Message.Delete'), this.poToolKey.loschen);
      }
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
      this.insertInit();
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      this.cancelAll();
    } else if (!this.isReadOnly) {
      if (!this.detailTagBox.opened) {
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
    if (this.isChange) {
      return false;
    }
  }
  onRemoverColumn(e) {
    this.dataGrid.instance.columnOption(e, 'visible', false);
    setTimeout(() => {
      this.dataGrid.instance.refresh();
      this.dataGrid.instance.repaint();
    }, CommonConstant.SetTimeOut);
  }
  onContextMenuPreparing(args: any) {
    if (args.target === 'header') {
      if (args.items && args.items.length > 0) {
        args.items.push(
          {
            disabled: false,
            icon: '',
            onItemClick: () => {
              this.onRemoverColumn(args.column.dataField);
            },
            text: 'Spalte ausblenden',
            value: 'none'
          });
      }
    }
  }
  // #endregion

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
      }, CommonConstant.SetTimeOut);
      this.rightClickColumnHeaderIndex++;
      if (this.rightClickColumnHeaderIndex === elements.length) {
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
      }, CommonConstant.SetTimeOut);
      this.clickColumnFilterIndex++;
      if (this.clickColumnFilterIndex === elements.length) {
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

  onKeyDownTagBox(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      this.detailTagBox.opened = !this.detailTagBox.opened;
    }
    if (!this.detailTagBox.opened) {
      if (event.event.keyCode === AppEnums.KeyCode.UpArrowKey || event.event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.event.keyCode === AppEnums.KeyCode.DownArrowKey || event.event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
    }
  }

  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
            setTimeout(() => {
              (el as HTMLElement).focus();
            }, CommonConstant.SetTimeOut);
            return;
          }
        } else {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            setTimeout(() => {
              (el as HTMLElement).focus();
            }, CommonConstant.SetTimeOut);
            return;
          }
        }
      }
    }
  }
  onFocusIn(element, field: string, key) {
    if (!this.isReadOnly) {
      this.keyFocus = field;
      this.keyInput = key;
      this.accessKeyItemFocused = element.accessKey;
    }
  }

  onFocusOut() {
    if (this.detailTextBox.value === '' || isNullOrUndefined(this.detailTextBox)) {
      this.detailTextBox.isValid = false;
    }
    this.accessKeyItemFocused = 0;
  }

  onFocusedCellChanged(event) {
    if (event.row.data.key !== this.gridIndex) {
      this.gridIndex = event.row.rowIndex;
      this.selectedKeys = [this.gridData[this.gridIndex].xProfileID];
      this.vorlagenProfile = this.gridData[this.gridIndex];
      this.dataGrid.instance.selectRowsByIndexes([this.gridIndex]);
      setTimeout(() => {
        this.dataGrid.instance.focus(event.element);
      }, CommonConstant.SetTimeOut);
    }
  }

  canDeactivate() {
    if (this.isChangeDetailValue() || this.isAddNew || (!isNullOrUndefined(this.formTextArea.value) && this.formTextArea.value !== '')) {
      this.showPopupRedirect(this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.Message'));
      return this.navigateAwaySelection$;
    } else {
      this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
      this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
      return true;
    }
  }

  showPopupRedirect(message) {
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.Yes');
    this.popUpModel.textNo = this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.No');
    this.popUpModel.title = this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.Title');
    this.popUpModel = Object.assign({}, this.popUpModel);
    this.popUpModel.funcYes = () => {
      this.isReadOnly = false;
      this.isAddNew = false;
      this.isUpdate = false;
      this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
      this.navigateAwaySelection$.next(true);
      this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
      this.layoutSandbox.clearDeletingSticky();
      this.navigateAwaySelection$.next(false);
      return false;
    };
    this.popUpModel.isVisible = true;
  }

  onFocusedRowChanged(event) {
    if (!isNullOrUndefined(event.row)) {
      this.dataGrid.instance.selectRowsByIndexes([event.rowIndex]);
      this.vorlagenProfile = event.row.data;
      this.textValue = event.row.data.text;
    }
  }
}
