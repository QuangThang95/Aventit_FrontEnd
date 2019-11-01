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
import { InkassofallSandbox } from '@app/kiss4-inkasso/inkassofall/inkassofall.sandbox';
import { Inkassofall } from '@app/kiss4-inkasso/inkassofall/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { InkassoConstant } from '@shared/common/inkasso.common';
import { BaseComponent } from '@shared/components/base.component';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined, isString } from 'util';

import { InkassofallDetailEditComponent } from '../inkassofall-detail-edit/inkassofall-detail-edit.component';

@Component({
    selector: 'kiss-inkassofall-detail',
    templateUrl: './inkassofall-detail.component.html',
    styleUrls: ['./inkassofall-detail.component.scss']
})
@SetClassRight('Inkassofall')
export class InkassofallDetailComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {

    //#region 'Declare decorator'
    @ViewChild('inkassofallDetailEditComponent') inkassofallDetailEditComponent: InkassofallDetailEditComponent;
    //#endregion

    //#region "Declare variables Input And Output"
    @Input() inkassofall = new Inkassofall();
    @Input() onChangeData: boolean;
    @Input() isDisableViewModel: boolean;
    @Output() disableViewModelEventEmitter: EventEmitter<any> = new EventEmitter();
    @Output() addNewEventEmitter: EventEmitter<any> = new EventEmitter();
    @Output() deleteRowNewEventEmitter: EventEmitter<any> = new EventEmitter();
    @Output() message: EventEmitter<any> = new EventEmitter();
    @Output() loadedGrid: EventEmitter<any> = new EventEmitter();
    //#endregion

    //#region "Declare variables Array"
    dsInkassofalls: Inkassofall = new Inkassofall();
    dsInkassofallsBK: Inkassofall = null;
    eroffnetAm: any = null;
    typ: any;
    abgeschlossenAm: any = null;
    eroffnetGrund: any = null;
    abgeschlossenGrund: any = null;
    bemerkung: any = null;
    popUpModel: PopUpModel;
    readonly objectAddNew: any = { BFSFrageID: -1, UpdateOK: false, Editierbar: true, BFSLeistungsfilterCodes: '' };
    readonly objectNull: any = { BFSFrageID: -1, UpdateOK: false, Editierbar: false, BFSLeistungsfilterCodes: '' };
    accessKeyItemFocused;
    isTextarea = false;
    isClickTreeView = false;
    isCheckChangData: any;

    //#region "Declare variables readonly"
    readonly minStringLength = InkassoConstant.MIN_LENGHT_STRING;
    readonly maxIntValue = AppEnums.Validation.MAX_INTEGER_VALUE;
    readonly minIntValue = CommonConstant.INT_MIN_VALUE;
    readonly minDate = InkassoConstant.MIN_DATE;
    readonly maxDate = InkassoConstant.MAX_DATE;
    readonly fixwidth = CommonConstant.FIX_WIDTH;

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
            text: this.translateService.instant('Inkassofall.Button.New'),
            visible: this.isViewModel,
            name: 'neue-inkassofall',
            icon: 'add',
            type: 'default'
        },
        {
            text: this.translateService.instant('Inkassofall.Button.Edit'),
            visible: this.isViewModel,
            name: 'bearbeiten',
            icon: 'edit',
            type: 'default'
        },
        {
            text: this.translateService.instant('Inkassofall.Button.Save'),
            visible: !this.isViewModel,
            name: 'speichern',
            disabled: false,
            icon: 'save',
            type: 'default'
        },
        {
            text: this.translateService.instant('Inkassofall.Button.Abort'),
            visible: !this.isViewModel,
            name: 'abbrechen',
            icon: 'close',
            type: 'default'
        }
    ];
    readonly detailArrayField: any = [
        { id: 'j007_detail_eroffnetAm', tagName: 'input' },
        { id: 'j007_detail_eroffnetGrund', tagName: 'input' },
        { id: 'j007_detail_typ', tagName: 'textarea' },
        { id: 'j007_detail_abgeschlossenAm', tagName: 'input', index: 1 },
        { id: 'j007_detail_abgeschlossenGrund', tagName: 'input', index: 1 },
        { id: 'j007_detail_bemerkung', tagName: 'input', index: 1 },
    ];
    readonly detailArrayValidation: any = [
    ];
    //#endregion

    //#region "Declare variables subscription"
    private subscription = new Subscription();
    isCollapseFormDetail = false;
    //#endregion

    //#region 'Inject services in contructor and innitdata'
    constructor(injector: Injector, public inkassofallSandbox: InkassofallSandbox, public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, ) {
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
        this.inkassofallSandbox.saveStateFormInkassofall({ object: this.dsInkassofalls, isDisableViewModel: this.disableViewModelEventEmitter });
        this.unregisterEvents();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.inkassofall)) {
            this.handleObjectDetail(changes.inkassofall.currentValue);
        }
    }
    //#endregion

    //#region "RegisterEvents"
    registerEvents() {
/*     this.subscription.add(this.inkassofallSandbox.inkassofallData$.subscribe((data: any) => {
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
    this.subscription.add(this.inkassofallSandbox.inkassofallGetObjectDetail$.subscribe(data => this.handleObjectDetail(data)));
 */  }

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
/*     if (!isNullOrUndefined(objectDetail)) {
      this.dsInkassofalls = new Inkassofall(objectDetail);
      if (!isNullOrUndefined(this.dsInkassofalls) && !isNullOrUndefined(this.dsInkassofalls.BFSLeistungsfilterCodes)) {
        if (this.dsInkassofalls.BFSLeistungsfilterCodes === '') {
          this.leistungArray = [];
        } else {
          this.leistungArray = this.dsInkassofalls.BFSLeistungsfilterCodes.split(',');
        }
      }
      this.detailSelectBox();
      this.dsInkassofallsBK = new Inkassofall(objectDetail);
      this.isCheckChangData = false;
    }
 */  }
    // #endregion

    //#region "toolbar event"
    toolBarOnItemClick(e) {
        switch (e) {
            case InkassoConstant.DETAIL_NEUE_INKASSOFALL:
                this.addInkassofall();
                break;
            case InkassoConstant.DETAIL_BEARBEITEN:
                this.updateInkassofall();
                break;
            case InkassoConstant.DETAIL_SPEICHERN:
                this.saveInkassofall();
                break;
            case InkassoConstant.DETAIL_ABBRECHEN:
                this.cancelInkassofall();
                break;
            case InkassoConstant.DETAIL_LOSCHEN:
                this.deleteInkassofall();
                break;
            default:
                break;
        }
    }

    // #endregion

    //#region "CRUD"
    addInkassofall() {
        this.isAddNew = true;
        this.isViewModel = false;
        this.changeCustomizeBtn();
        this.dsInkassofalls = new Inkassofall(this.objectAddNew);
        this.leistungArray = [];
        this.dsInkassofallsBK = new Inkassofall(this.objectAddNew);
        this.addNewEventEmitter.emit(this.objectAddNew);
        this.accessKeyItemFocused = 0;
        this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
    }

    updateInkassofall() {
        if (!this.compareObject(this.dsInkassofallsBK, this.objectNull)) {
            this.isAddNew = false;
            this.isViewModel = false;
            this.changeCustomizeBtn();
            this.disableViewModelEventEmitter.emit(false);
            this.accessKeyItemFocused = 0;
            this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
        }
    }

    saveInkassofall() {
        if (this.inkassofallDetailEditComponent.validationGroupInkassofall.instance.validate().isValid) {
            for (const p in this.dsInkassofalls) {
                if (this.dsInkassofalls.hasOwnProperty(p)) {
                    if (typeof (this.dsInkassofalls[p]) === 'string') {
                        this.dsInkassofalls[p] = this.dsInkassofalls[p].trim();
                    }
                }
            }
            if (this.compareObject(this.dsInkassofallsBK, this.objectAddNew)) {
                this.message.emit({ message: this.translateService.instant('Inkassofall.Message.MessageErrorValidate'), hasError: true });
            } else {
                // this.inkassofallSandbox.updateInkassofall(this.dsInkassofalls);
            }
        } else {
            this.message.emit({ message: this.translateService.instant('Inkassofall.Message.MessageErrorValidate'), hasError: true });
        }
    }

    cancelInkassofall() {
        if (this.customizeBtn[2].disabled || this.compareObject(this.dsInkassofallsBK, this.objectAddNew)) {
            this.deleteOrCancel();
        } else {
            if (this.onChangeData) {
                this.showPopup(this.translateService.instant('Inkassofall.Message.Message'), () => {
                    this.isViewModel = true;
                    this.changeCustomizeBtn();
                    this.popUpModel.isVisible = false;
                    this.dsInkassofalls = new Inkassofall(this.dsInkassofallsBK);
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

    deleteInkassofall() {
/*     if (!this.compareObject(this.dsInkassofallsBK, this.objectNull)) {
      if (this.compareObject(this.dsInkassofallsBK, this.objectAddNew)) {
        this.deleteOrCancel();
      } else {
        this.showPopup(this.translateService.instant('Inkassofall.Message.MessageDelete'), () => {
          this.popUpModel.isVisible = false;
          this.message.emit({ message: '', hasError: false });
          this.inkassofallSandbox.deleteInkassofall(this.dsInkassofalls.BFSFrageID);
        });
      }
    }
 */  }

    private deleteOrCancel() {
        if (!this.compareObject(this.dsInkassofallsBK, this.dsInkassofalls)) {
            this.showPopup(this.translateService.instant('Inkassofall.Message.MessageDeleteNew'), () => {
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
    onValueChanged() {
        this.handleUpdateLeistungArray();
        this.handleUpdateBfsInkassoObject();
    }

    dsInkassofallsChange(obj) {
        this.dsInkassofalls = obj;
        this.handleUpdateBfsInkassoObject();
    }

    private handleUpdateBfsInkassoObject() {
        if (!this.compareObject(this.dsInkassofallsBK, this.dsInkassofalls)) {
            this.onChangeData = true;
            this.moduleConfigSandbox.updateDirtyFormStatus(true);
        } else {
            this.onChangeData = false;
            this.moduleConfigSandbox.updateDirtyFormStatus(false);
        }
    }

    onLeistungArrayChange(arr) {
        this.leistungArray = arr;
        this.handleUpdateLeistungArray();
    }

    private handleUpdateLeistungArray() {
/*     if (!isNullOrUndefined(this.leistungArray)) {
      let leistungString = '';
      this.leistungArray.forEach(x => {
        leistungString += x + ',';
      });
      if (isString(leistungString) && leistungString !== '') {
        this.dsInkassofalls.BFSLeistungsfilterCodes = leistungString.substr(0, leistungString.length - 1);
      } else {
        this.dsInkassofalls.BFSLeistungsfilterCodes = '';
      }
    }
 */  }

    showPopup(message, funcYes: Function) {
        this.popUpModel.message = message;
        this.popUpModel.textYes = this.translateService.instant('Inkassofall.Message.Yes');
        this.popUpModel.textNo = this.translateService.instant('Inkassofall.Message.No');
        this.popUpModel.title = this.translateService.instant('Inkassofall.Message.Title');
        this.popUpModel.funcNo = () => {
            this.popUpModel.isVisible = false;
        };
        this.popUpModel.funcYes = funcYes;
        this.popUpModel.isVisible = true;
    }

    vailidateObjectSave() {
        let flag = true;
        this.detailArrayValidation.forEach(x => {
            if (this.checkData(this.dsInkassofalls[x]) || ('herkunftCode' === x && this.dsInkassofalls[x] === 0)) {
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

    compareObject(source, target) {
        for (const p in target) {
            if (target[p] === undefined) { continue; }
            if (target[p] !== null && (typeof (target[p]) === InkassoConstant.OBJECT || typeof (target[p]) === InkassoConstant.FUNCTION || target[p] !== (source[p]))
                || target[p] !== (source[p])) {
                return false;
            }
        }
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
/*     if (!isNullOrUndefined(this.kategorieDetail) && !isNullOrUndefined(this.personDetail) && !isNullOrUndefined(this.fieldTypDetail) && !isNullOrUndefined(this.validierungDetail) && !isNullOrUndefined(this.hafTypDetail)) {
      this.detailkategorie = this.dsInkassofalls.BFSKategorieCode ? this.kategorieDetail.filter(x => x.code === this.dsInkassofalls.BFSKategorieCode)[0].text : '';
      this.detailperson = this.dsInkassofalls.BFSPersonCode ? this.personDetail.filter(x => x.code === this.dsInkassofalls.BFSPersonCode)[0].text : '';
      this.detailFieldTyp = this.dsInkassofalls.BFSFeldCode ? this.fieldTypDetail.filter(x => x.code === this.dsInkassofalls.BFSFeldCode)[0].text : '';
      this.detailValidierung = this.dsInkassofalls.BFSValidierungCode ? this.validierungDetail.filter(x => x.code === this.dsInkassofalls.BFSValidierungCode)[0].text : '';
      this.detailHafTypDetail = this.dsInkassofalls.HerkunftCode ? this.hafTypDetail.filter(x => x.code === this.dsInkassofalls.HerkunftCode)[0].text : '';
    }
 */  }
    getSizeQualifier(width) {
        return width < InkassoConstant.SCREEN_RESOLUTION_LARGE ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
    }
    changeCollapseFormContent(event) {
        if (event.target.textContent === this.translateService.instant('Inkassofall.Detail')) {
            this.isCollapseFormDetail = !this.isCollapseFormDetail;
        }
    }

    // #endregion
}
