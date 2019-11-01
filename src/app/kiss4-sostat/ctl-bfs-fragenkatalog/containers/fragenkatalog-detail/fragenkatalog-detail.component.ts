import 'devextreme-intl';

import {
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CtlBfsFragenkatalogSandbox } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.sandbox';
import { CtlBfsFragenkatalog } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { FragenkatalogConstant } from '@shared/common/sostat.common';
import { BaseComponent } from '@shared/components/base.component';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined, isString } from 'util';

@Component({
  selector: 'kiss-fragenkatalog-detail',
  templateUrl: './fragenkatalog-detail.component.html',
  styleUrls: ['./fragenkatalog-detail.component.scss']
})
@SetClassRight('CtlBfsFragenkatalog')
export class FormDetailComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {

  //#region 'Declare decorator'
  @ViewChild('leistungsfilterTagBox') leistungsfilterTagBox: any;
  @ViewChild('validationGroupfragenkatalog') validationGroupfragenkatalog: DxValidationGroupComponent;
  //#endregion

  //#region "Declare variables Input And Output"
  @Input() ctlBfsFragenkatalog = new CtlBfsFragenkatalog();
  @Input() onChangeData: boolean;
  @Input() isDisableViewModel: boolean;
  @Output() disableViewModelEventEmitter: EventEmitter<any> = new EventEmitter(true);
  @Output() addNewEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteRowNewEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() message: EventEmitter<any> = new EventEmitter();
  @Output() loadedGrid: EventEmitter<any> = new EventEmitter();
  //#endregion

  //#region "Declare variables Array"
  ctlBfsFragenkatalogObject: CtlBfsFragenkatalog = new CtlBfsFragenkatalog();
  ctlBfsFragenkatalogObjectBK: CtlBfsFragenkatalog = null;
  leistung: any = null;
  kategorieDetail: any = null;
  personDetail: any = null;
  fieldTypDetail: any = null;
  validierungDetail: any = null;
  hafTypDetail: any = null;
  popUpModel: PopUpModel;
  readonly objectAddNew: any = { BFSFrageID: -1, UpdateOK: false, Editierbar: true, BFSLeistungsfilterCodes: '' };
  readonly objectNull: any = { BFSFrageID: -1, UpdateOK: false, Editierbar: false, BFSLeistungsfilterCodes: '' };
  accessKeyItemFocused;
  isTextarea = false;
  isClickTreeView = false;
  isCheckChangData: any;
  maxIntValue = AppEnums.Validation.MAX_INTEGER_VALUE;
  minIntValue = CommonConstant.INT_MIN_VALUE;

  //#region "Declare variables readonly"
  readonly minStringLength = FragenkatalogConstant.MIN_LENGHT_STRING;
  readonly maxVariableLength = 10;
  readonly maxFrageLength = 200;
  readonly maxFormatLength = 20;
  readonly maxFilterregelLength = 500;
  readonly maxWertelisteLength = 100;
  readonly maxNodelLength = FragenkatalogConstant.MAX_LENGHT_STRING_TEXTBOX;
  readonly maxAttributeLength = FragenkatalogConstant.MAX_LENGHT_STRING_TEXTBOX;
  readonly maxPredicateLength = FragenkatalogConstant.MAX_LENGHT_STRING_TEXTBOX;

  //#endregion

  //#region "Declare variables Global"
  isViewModel = true;
  isAddNew = false;
  leistungArray: any = [];
  equals: any;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  listBtn = [[], this.CommonBtn.splice(7, 1)];
  typeFormatNumber = CommonConstant.FormatNumberAllowDelete;
  customizeBtn = [
    {
      text: this.translateService.instant('CtlBfsFragenkatalog.Neue-Fragenkatalog'),
      visible: this.isViewModel,
      name: 'neue-fragenkatalog',
      icon: 'add',
      type: 'default'
    },
    {
      text: this.translateService.instant('CtlBfsFragenkatalog.Bearbeiten'),
      visible: this.isViewModel,
      name: 'bearbeiten',
      icon: 'edit',
      type: 'default'
    },
    {
      text: this.translateService.instant('CtlBfsFragenkatalog.Speichern'),
      visible: !this.isViewModel,
      name: 'speichern',
      disabled: false,
      icon: 'save',
      type: 'default'
    },
    {
      text: this.translateService.instant('CtlBfsFragenkatalog.Abbrechen'),
      visible: !this.isViewModel,
      name: 'abbrechen',
      icon: 'close',
      type: 'default'
    }
  ];
  readonly detailArrayField: any = [
    { id: 'o006_detail_leistungsfilter', tagName: 'input' },
    { id: 'o006_detail_variable', tagName: 'input' },
    { id: 'o006_detail_frage', tagName: 'textarea' },
    { id: 'o006_detail_kategorie', tagName: 'input', index: 1 },
    { id: 'o006_detail_person', tagName: 'input', index: 1 },
    { id: 'o006_detail_feldtyp', tagName: 'input', index: 1 },
    { id: 'o006_detail_werteliste', tagName: 'input' },
    { id: 'o006_detail_vorgabewert', tagName: 'input' },
    { id: 'o006_detail_validierung', tagName: 'input', index: 1 },
    { id: 'o006_detail_index', tagName: 'input', index: 1 },
    { id: 'o006_detail_format', tagName: 'input' },
    { id: 'o006_detail_sort', tagName: 'input', index: 1 },
    { id: 'o006_detail_editierbar', tagName: 'span' },
    { id: 'o006_detail_updateok', tagName: 'span' },
    { id: 'o006_detail_hilfetext', tagName: 'textarea' },
    { id: 'o006_herleitung_typ', tagName: 'input', index: 1 },
    { id: 'o006_herleitung_tabelle', tagName: 'input' },
    { id: 'o006_herleitung_werteliste', tagName: 'input' },
    { id: 'o006_herleitung_feld', tagName: 'input' },
    { id: 'o006_herleitung_pk-feld', tagName: 'input' },
    { id: 'o006_herleitung_beschr', tagName: 'textarea' },
    { id: 'o006_herleitung_sql', tagName: 'textarea' },
    { id: 'o006_herleitung_filterregel', tagName: 'textarea' },
    { id: 'o006_xml-export_node', tagName: 'input' },
    { id: 'o006_xml-export_attribute', tagName: 'input' },
    { id: 'o006_xml-export_predicate', tagName: 'input' }
  ];
  readonly detailArryValidation: any = [
    'BFSKatalogVersionID',
    'Variable',
    'Frage',
    'BFSPersonCode',
    'BFSFeldCode',
    'PersonIndex',
    'Editierbar',
    'HerkunftCode'
  ];
  //#endregion

  //#region "Declare variables subscription"
  private subscription = new Subscription();
  detailkategorie: any;
  detailperson: any;
  detailFieldTyp: any;
  detailValidierung: any;
  detailHafTypDetail: any;
  isCollapseFormDetail = false;
  //#endregion

  //#region 'Inject services in contructor and innitdata'
  constructor(injector: Injector, public ctlBfsFragenkatalogSandbox: CtlBfsFragenkatalogSandbox, public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.registerEvents();
    this.initPopUpModel();
  }

  ngOnDestroy() {
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
    this.ctlBfsFragenkatalogSandbox.saveStateFormCtlBfsFragenkatalog({ object: this.ctlBfsFragenkatalogObject, isDisableViewModel: this.disableViewModelEventEmitter });
    this.unregisterEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.ctlBfsFragenkatalog)) {
      this.handleObjectDetail(changes.ctlBfsFragenkatalog.currentValue);
    }
  }
  //#endregion

  //#region "RegisterEvents"
  registerEvents() {
    this.subscription.add(this.ctlBfsFragenkatalogSandbox.ctlBfsFragenkatalogData$.subscribe((data: any) => {
      if (!isNullOrUndefined(data)) {
        if (!isNullOrUndefined(data.leistung)) {
          this.leistung = data.leistung;
        }
        if (!isNullOrUndefined(data.detail)) {
          this.kategorieDetail = data.detail;
          this.kategorieDetail.map(x => {
            x.code = Number(x.code);
          });
        }
        if (!isNullOrUndefined(data.person)) {
          this.personDetail = data.person;
          this.personDetail.map(x => {
            x.code = Number(x.code);
          });
        }
        if (!isNullOrUndefined(data.fieldTyp)) {
          this.fieldTypDetail = data.fieldTyp;
          this.fieldTypDetail.map(x => {
            x.code = Number(x.code);
          });
        }
        if (!isNullOrUndefined(data.validierung)) {
          this.validierungDetail = data.validierung;
          this.validierungDetail.map(x => {
            x.code = Number(x.code);
          });
        }
        if (!isNullOrUndefined(data.halfTyp)) {
          this.hafTypDetail = data.halfTyp;
          this.hafTypDetail.map(x => {
            if (!isNullOrUndefined(x.code)) {
              x.code = Number(x.code);
            }
          });
        }
      }
    }));
    this.subscription.add(this.ctlBfsFragenkatalogSandbox.ctlBfsFragenkatalogGetObjectDetail$.subscribe(data => this.handleObjectDetail(data)));
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

  handleObjectDetail(objectDetail) {
    if (!isNullOrUndefined(objectDetail)) {
      this.ctlBfsFragenkatalogObject = new CtlBfsFragenkatalog(objectDetail);
      if (!isNullOrUndefined(this.ctlBfsFragenkatalogObject) && !isNullOrUndefined(this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes)) {
        if (this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes === '') {
          this.leistungArray = [];
        } else {
          this.leistungArray = this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes.split(',');
        }
      }
      this.detailSelectBox();
      this.ctlBfsFragenkatalogObjectBK = new CtlBfsFragenkatalog(objectDetail);
      this.isCheckChangData = false;
    }
  }
  // #endregion

  //#region "toolbar event"
  toolBarOnItemClick(e) {
    switch (e) {
      case FragenkatalogConstant.DETAIL_NEUE_FRAGENKATALOG:
        this.addFragrnkatalog();
        break;
      case FragenkatalogConstant.DETAIL_BEARBEITEN:
        this.updateFragrnkatalog();
        break;
      case FragenkatalogConstant.DETAIL_SPEICHERN:
        this.doSave();
        break;
      case FragenkatalogConstant.DETAIL_ABBRECHEN:
        this.doCancel();
        break;
      case FragenkatalogConstant.DETAIL_LOSCHEN:
        this.deleteFragrnkatalog();
        break;
      default:
        break;
    }
  }

  // #endregion

  //#region "CRUD"
  addFragrnkatalog() {

    this.isAddNew = true;
    this.isViewModel = false;
    this.changeCustomizeBtn();
    this.ctlBfsFragenkatalogObject = new CtlBfsFragenkatalog(this.objectAddNew);
    this.leistungArray = [];
    this.ctlBfsFragenkatalogObjectBK = new CtlBfsFragenkatalog(this.objectAddNew);
    this.addNewEventEmitter.emit(this.objectAddNew);
    this.onFocusTagBox();
    this.accessKeyItemFocused = 0;
    this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
  }

  updateFragrnkatalog() {
    if (!this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.objectNull)) {
      this.isAddNew = false;
      this.isViewModel = false;
      this.changeCustomizeBtn();
      this.disableViewModelEventEmitter.emit(false);
      this.onFocusTagBox();
      this.accessKeyItemFocused = 0;
      this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
    }
  }

  doSave() {
    if (this.validationGroupfragenkatalog.instance.validate().isValid) {
      for (const p in this.ctlBfsFragenkatalogObject) {
        if (this.ctlBfsFragenkatalogObject.hasOwnProperty(p)) {
          if (typeof (this.ctlBfsFragenkatalogObject[p]) === 'string') {
            this.ctlBfsFragenkatalogObject[p] = this.ctlBfsFragenkatalogObject[p].trim();
          }
        }
      }
      if (this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.objectAddNew)) {
        this.message.emit({ message: this.translateService.instant('CtlBfsFragenkatalog.Message.MessageErrorValidate'), hasError: true });
      } else {
        this.ctlBfsFragenkatalogSandbox.updateCtlBfsFragenkatalog(this.ctlBfsFragenkatalogObject);
        this.disableViewModelEventEmitter.emit(true);
      }
    } else {
      this.message.emit({ message: this.translateService.instant('CtlBfsFragenkatalog.Message.MessageErrorValidate'), hasError: true });
    }
  }

  doCancel() {
    if (this.customizeBtn[2].disabled || this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.objectAddNew)) {
      this.deleteOrCancel();
    } else {
      if (this.onChangeData) {
        this.showPopup(this.translateService.instant('CtlBfsFragenkatalog.Message.Message'), () => {
          this.isViewModel = true;
          this.changeCustomizeBtn();
          this.popUpModel.isVisible = false;
          this.ctlBfsFragenkatalogObject = new CtlBfsFragenkatalog(this.ctlBfsFragenkatalogObjectBK);
          if (!isNullOrUndefined(this.ctlBfsFragenkatalogObject) && !isNullOrUndefined(this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes)) {
            this.leistungArray = this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes.split(',');
          }
          this.disableViewModelEventEmitter.emit(true);
          this.onChangeData = false;
          this.message.emit({ message: '', hasError: false });
          this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        });
      } else {
        this.isViewModel = true;
        this.changeCustomizeBtn();
        this.disableViewModelEventEmitter.emit(true);
        this.message.emit({ message: '', hasError: false });
      }
    }
  }

  deleteFragrnkatalog() {
    if (!this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.objectNull)) {
      if (this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.objectAddNew)) {
        this.deleteOrCancel();
      } else {
        this.showPopup(this.translateService.instant('CtlBfsFragenkatalog.Message.MessageDelete'), () => {
          this.popUpModel.isVisible = false;
          this.message.emit({ message: '', hasError: false });
          this.ctlBfsFragenkatalogSandbox.deleteCtlBfsFragenkatalog(this.ctlBfsFragenkatalogObject.BFSFrageID);
        });
      }
    }
  }

  private deleteOrCancel() {
    if (!this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.ctlBfsFragenkatalogObject)) {
      this.showPopup(this.translateService.instant('CtlBfsFragenkatalog.Message.MessageDeleteNew'), () => {
        this.popUpModel.isVisible = false;
        this.deleteRowNewSuccess();
        if (this.customizeBtn[2].disabled) {
          this.loadedGrid.emit();
          this.disableViewModelEventEmitter.emit(true);
          this.isViewModel = true;
          this.changeButtonSave(false);
        }
      });
    } else {
      this.deleteRowNewSuccess();
    }
  }

  private deleteRowNewSuccess() {
    this.message.emit({ message: '', hasError: false });
    this.deleteRowNewEventEmitter.emit(true);
    this.isViewModel = true;
    this.changeCustomizeBtn();
    this.disableViewModelEventEmitter.emit(true);
  }
  //#endregion

  //#region "Business function"
  onValueChanged(e) {
    if (!isNullOrUndefined(this.leistungArray)) {
      let leistungString = '';
      this.leistungArray.forEach(x => {
        leistungString += x + ',';
      });
      if (isString(leistungString) && leistungString !== '') {
        this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes = leistungString.substr(0, leistungString.length - 1);
      } else {
        this.ctlBfsFragenkatalogObject.BFSLeistungsfilterCodes = '';
      }
    }
    if (!this.compareObject(this.ctlBfsFragenkatalogObjectBK, this.ctlBfsFragenkatalogObject)) {
      this.onChangeData = true;
      this.moduleConfigSandbox.updateDirtyFormStatus(true);
    } else {
      this.onChangeData = false;
      this.moduleConfigSandbox.updateDirtyFormStatus(false);
    }
  }

  showPopup(message, funcYes: Function) {
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('CtlBfsFragenkatalog.Message.Yes');
    this.popUpModel.textNo = this.translateService.instant('CtlBfsFragenkatalog.Message.No');
    this.popUpModel.title = this.translateService.instant('CtlBfsFragenkatalog.Message.Title');
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.funcYes = funcYes;
    this.popUpModel.isVisible = true;
  }

  vailidateObjectSave() {
    let flag = true;
    this.detailArryValidation.forEach(x => {
      if (this.checkData(this.ctlBfsFragenkatalogObject[x]) || ('herkunftCode' === x && this.ctlBfsFragenkatalogObject[x] === 0)) {
        flag = false;
        return;
      }
    });
    return flag;
  }

  checkData(variable: any) {
    return isNullOrUndefined(variable) || (isString(variable) && variable === '');
  }

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

  // Shortcuts key
  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (this.isDisableViewModel && !this.isTextarea) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === FragenkatalogConstant.EVENT_KEY_ARROW_UP) {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === FragenkatalogConstant.EVENT_KEY_ARROW_DOWN) {
        this.moveFocus(true);
      }
    }
  }

  onFocusTagBox() {
    setTimeout(() => {
      this.leistungsfilterTagBox.instance.focus();
    }, 300);
  }


  // Arrow-key
  moveFocus(isNext: boolean) {
    if (isNext) {
      if (this.accessKeyItemFocused < this.detailArrayField.length - 1) {
        this.accessKeyItemFocused++;
        const elementFocusNext = document.getElementById(this.detailArrayField[this.accessKeyItemFocused].id);
        const el = elementFocusNext.getElementsByTagName(this.detailArrayField[this.accessKeyItemFocused].tagName)[this.detailArrayField[this.accessKeyItemFocused].index || 0];
        (el as HTMLElement).focus();
      }
    } else {
      if (this.accessKeyItemFocused > 0) {
        this.accessKeyItemFocused--;
        const elementFocusNext = document.getElementById(this.detailArrayField[this.accessKeyItemFocused].id);
        const el = elementFocusNext.getElementsByTagName(this.detailArrayField[this.accessKeyItemFocused].tagName)[this.detailArrayField[this.accessKeyItemFocused].index || 0];
        (el as HTMLElement).focus();
      }
    }
  }

  onFocusIn(e, isTextArea?) {
    this.isTextarea = isTextArea;
    this.accessKeyItemFocused = e.element.accessKey;
    this.typeFormatNumber = CommonConstant.FormatNumberAllowDelete;
  }

  onKeyDownSelectOption(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      e.event.preventDefault();
      if (!e.component.option('opened')) {
        e.component.open();
      } else {
        e.component.close();
      }
    }
  }

  onFocusOut(e, isNotTextArea) {
    this.isTextarea = isNotTextArea;
    this.typeFormatNumber = '#';
  }

  compareObject(source, target) {
    for (const p in target) {
      if (target[p] === undefined) { continue; }
      if (target[p] !== null && (typeof (target[p]) === FragenkatalogConstant.OBJECT || typeof (target[p]) === FragenkatalogConstant.FUNCTION || target[p] !== (source[p]))
        || target[p] !== (source[p])) {
        return false;
      }
    }
    // const keys = Object.keys(target);
    // for (let i = 0; i < keys.length; i++) {
    //   if (target[keys[i]] === undefined) { continue; }
    //   if (target[keys[i]] !== null && (typeof (target[keys[i]]) === FragenkatalogConstant.OBJECT || typeof (target[keys[i]]) === FragenkatalogConstant.FUNCTION || target[keys[i]] !== (source[keys[i]]))
    //     || target[keys[i]] !== (source[keys[i]])) {
    //     return false;
    //   }
    // }
    return true;
  }


  changeCustomizeBtn() {
    this.customizeBtn[0].visible = this.isViewModel;
    this.customizeBtn[1].visible = this.isViewModel;
    this.customizeBtn[2].visible = !this.isViewModel;
    this.customizeBtn[3].visible = !this.isViewModel;
    this.customizeBtn = [...this.customizeBtn];

  }

  changeButtonSave(isDisable: boolean) {
    this.customizeBtn[2].disabled = isDisable;
    this.customizeBtn = [...this.customizeBtn];
  }

  /**
   *  unregister subscription on destroy component
   */
  private unregisterEvents() {
    this.subscription.unsubscribe();
  }
  /**
   * init detail combobox
   */
  detailSelectBox() {
    if (!isNullOrUndefined(this.kategorieDetail) && !isNullOrUndefined(this.personDetail) && !isNullOrUndefined(this.fieldTypDetail) && !isNullOrUndefined(this.validierungDetail) && !isNullOrUndefined(this.hafTypDetail)) {
      this.detailkategorie = this.ctlBfsFragenkatalogObject.BFSKategorieCode ? this.kategorieDetail.filter(x => x.code === this.ctlBfsFragenkatalogObject.BFSKategorieCode)[0].text : '';
      this.detailperson = this.ctlBfsFragenkatalogObject.BFSPersonCode ? this.personDetail.filter(x => x.code === this.ctlBfsFragenkatalogObject.BFSPersonCode)[0].text : '';
      this.detailFieldTyp = this.ctlBfsFragenkatalogObject.BFSFeldCode ? this.fieldTypDetail.filter(x => x.code === this.ctlBfsFragenkatalogObject.BFSFeldCode)[0].text : '';
      this.detailValidierung = this.ctlBfsFragenkatalogObject.BFSValidierungCode ? this.validierungDetail.filter(x => x.code === this.ctlBfsFragenkatalogObject.BFSValidierungCode)[0].text : '';
      this.detailHafTypDetail = this.ctlBfsFragenkatalogObject.HerkunftCode ? this.hafTypDetail.filter(x => x.code === this.ctlBfsFragenkatalogObject.HerkunftCode)[0].text : '';
    }
  }
  getSizeQualifier(width) {
    return width < FragenkatalogConstant.SCREEN_RESOLUTION_LARGE ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('CtlBfsFragenkatalog.Detail')) {
      this.isCollapseFormDetail = !this.isCollapseFormDetail;
    }
  }

  // #endregion
}


