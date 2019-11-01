import { Component, Injector, ViewChild, OnInit, OnDestroy, HostListener, ElementRef, EventEmitter } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { TranslateService } from '@ngx-translate/core';
import { isEqual, cloneDeep } from 'lodash-es';
import { Subject, Subscription } from 'rxjs';
import { getConditionListBtn } from '@shared/utilites';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { isNullOrUndefined } from 'util';

import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { VorlagenKontextSandbox } from '../vorlagen-kontext.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';

import { PopupConfirmComponent } from '@shared/components/popup-confirm/popup-confirm.component.ts';

import { CommonConstant } from '@shared/common/constant.common';
import { VorlagenKontextConstant } from './../constant';
import { XDocContext } from '../models';
import { DataListComponent } from '../components/data-grid/data-grid.component';
import { AppEnums } from '@shared/AppEnum';
import { MultiSelectComponent } from '../components/multi-select/multi-select.component';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
    selector: 'app-vorlagen-kontext',
    templateUrl: './vorlagen-kontext.component.html',
    styleUrls: ['./vorlagen-kontext.component.scss']
})
export class VorlagenKontextComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    @ViewChild('popupConfirm') popupConfirm: PopupConfirmComponent;
    @ViewChild('multiSelectComponent') multipleSelect: MultiSelectComponent;
    @ViewChild('vorlagenkontextDetail') vorlagenkontextDetail: DetailComponent;
    @ViewChild('listData') listData: DataListComponent;
    @ViewChild('errorArea') remainingMsg: ElementRef;

    isFocusFirstRow: Boolean = true;
    isEditMode: Boolean = false;
    isAddMode: Boolean = false;
    isDeleted: Boolean = false;
    isViewDetail: Boolean = true;
    isSave: Boolean = false;
    isConflicted: Boolean = false;
    isErrorClosed: Boolean = false;
    messageErr: String = VorlagenKontextConstant.defaultTextErr;
    selectedKeys: Array<any> = [];

    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
    popUpModel: PopUpModel = new PopUpModel({ isVisible: false });
    vorlagenkontextModel: XDocContext = new XDocContext();
    vorlagenkontextDeleteModel: XDocContext = new XDocContext();
    vorlagencontextLastModel: XDocContext = new XDocContext();
    gridFunctionModelVerfugbare: GridSettingModel = new GridSettingModel();
    vorlagenkontextData: XDocContext[];

    listCol = VorlagenKontextConstant.listColumnData;
    CloneCommonConstant = cloneDeep(CommonConstant);
    CloneAdditionalButtons = cloneDeep(CommonConstant.AdditionalButtons);
    loschenBtn = this.CloneAdditionalButtons.splice(7, 1);
    listBtn = [this.CloneCommonConstant.ToolbarButtons, getConditionListBtn(this.CloneCommonConstant.AdditionalButtons, [this.CloneCommonConstant.DeleteBtn, this.CloneCommonConstant.GridSettingBtn])];
    listBtnDetail = [CommonConstant.ToolbarButtons, getConditionListBtn(this.CloneCommonConstant.AdditionalButtons, [this.CloneCommonConstant.GridSettingBtn])];
    customizeBtnDetail = [
        {
            text: VorlagenKontextConstant.neuerKontextTitle,
            visible: this.isViewDetail,
            name: VorlagenKontextConstant.neuerKontext,
            icon: VorlagenKontextConstant.neuerKontextIcon
        },
        {
            text: VorlagenKontextConstant.bearbeitenTitle,
            visible: this.isViewDetail,
            name: VorlagenKontextConstant.bearbeiten,
            icon: VorlagenKontextConstant.bearbeitenIcon
        },
        {
            text: VorlagenKontextConstant.speichernTitle,
            visible: !this.isViewDetail,
            name: VorlagenKontextConstant.speichern,
            disabled: false,
            icon: VorlagenKontextConstant.speichernIcon
        },
        {
            text: VorlagenKontextConstant.abbrechenTitle,
            visible: !this.isViewDetail,
            name: VorlagenKontextConstant.abbrechen,
            icon: VorlagenKontextConstant.abbrechenIcon
        }
    ];

    private subscriptions: Array<Subscription> = [];

    constructor(
        injector: Injector,
        public layoutSandbox: LayoutSandbox,
        public vorlagenKontextSandbox: VorlagenKontextSandbox,
        public translateService: TranslateService,
        private moduleConfigSandbox: ModuleConfigSandbox,
    ) {
        super(injector);
    }

    // START: hotkey
    @HostListener('document:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        // ctrl+z cancel
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
            event.preventDefault();
            if (this.isAddMode || this.isEditMode) {
                this.actionCancel_OnClick();
            }
            return;
        }
        // ctrl+i new
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
            event.preventDefault();
            if (this.isViewDetail) {
                this.actionNew_OnClick();
            }
            return;
        }

        // ctrl+m delete
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
            event.preventDefault();
            this.actionDelete();
            return;
        }

        // ctrl+s save
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
            event.preventDefault();
            if (this.isAddMode || this.isEditMode) {
                this.actionSave_OnClick();
            }
        }
        // ctrl + p
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
        }
    }
    // END: hotkey

    // START: lifecycle hooks
    ngOnInit() {
        this.registerEvents();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    // END: lifecycle hooks

    // START: handle go out component
    canDeactivate() {
        if (this.validateIsChange()) {
            // show popup when form was dirty
            this.showPopupRedirect(this.translateService.instant(VorlagenKontextConstant.popupMessage));
            return this.navigateAwaySelection$;
        }
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        return true;
    }
    // END: handle go out component

    // START: show message
    showPopupRedirect(message) {
        this.popUpModel.message = message;
        this.popUpModel.textYes = this.translateService.instant(VorlagenKontextConstant.btnYes);
        this.popUpModel.textNo = this.translateService.instant(VorlagenKontextConstant.btnNo);
        this.popUpModel.title = this.translateService.instant(VorlagenKontextConstant.popupTitle);
        this.popUpModel = Object.assign({}, this.popUpModel);
        this.popUpModel.funcYes = () => {
            this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
            this.isEditMode = false;
            this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
            this.navigateAwaySelection$.next(true);
            this.popUpModel.isVisible = false;
        };
        this.popUpModel.funcNo = () => {
            this.layoutSandbox.clearDeletingSticky();
            this.popUpModel.isVisible = false;
            this.navigateAwaySelection$.next(false);
            return false;
        };
        this.popUpModel.isVisible = true;
        setTimeout(() => {
            this.popupConfirm.popupGridFunction.instance.focus();
        });
    }
    // END: show message

    // START: Check dirty form
    private compareModelEdit() {
        const docContextName = this.vorlagenkontextModel.docContextName ? this.vorlagenkontextModel.docContextName : '';
        const description = this.vorlagenkontextModel.description ? this.vorlagenkontextModel.description : '';
        if (this.isAddMode) {
            return docContextName.trim() !== '' || description.trim() !== '' ||
                (Array.isArray(this.vorlagenkontextDetail.multipleSelect.listZugeteilt) && this.vorlagenkontextDetail.multipleSelect.listZugeteilt.length > 0);
        }
        const docContextNameLastModel = this.vorlagencontextLastModel.docContextName ? this.vorlagencontextLastModel.docContextName : '';
        const descriptionLastModel = this.vorlagencontextLastModel.description ? this.vorlagencontextLastModel.description : '';
        return docContextName.trim() !== docContextNameLastModel.trim() ||
            description.trim() !== descriptionLastModel.trim();
    }

    private validateIsChange() {
        return this.vorlagenkontextDetail.multipleSelect ? (!this.compareArray(this.vorlagenkontextDetail.multipleSelect.listVerfuegbar, this.vorlagenkontextDetail.multipleSelect.listOldVerfuegbar)
            || !this.compareArray(this.vorlagenkontextDetail.multipleSelect.listZugeteilt, this.vorlagenkontextDetail.multipleSelect.listOldZugeteilt)
            || this.compareModelEdit()) : false;
    }
    // END: Check dirty form

    // START: helper function
    private compareArray(firstArray, secondArray) {
        return Array.isArray(firstArray) && Array.isArray(secondArray) && firstArray.length === secondArray.length && isEqual(firstArray.sort(), secondArray.sort());
    }
    // START: helper function

    // START: Handle event navigator
    toolBarOnItemClick($event) {
        this.listData.handleEventNav($event);
    }
    // END: Handle event navigator

    // START: Handle event detail
    toolBarOnItemClickEdit($event) {
        this.vorlagenkontextDetail.multiSelectView ?
            this.vorlagenkontextDetail.multiSelectView.verfuegbareGrid.handleEventNav($event) :
            this.vorlagenkontextDetail.multipleSelect.verfuegbareGrid.handleEventNav($event);
        switch ($event) {
            case VorlagenKontextConstant.neuerKontext: {
                this.actionNew_OnClick();
                return;
            }
            case VorlagenKontextConstant.bearbeiten: {
                this.actionEdit_OnClick();
                return;
            }
            case VorlagenKontextConstant.speichern: {
                this.actionSave_OnClick();
                return;
            }
            case VorlagenKontextConstant.abbrechen: {
                this.actionCancel_OnClick();
                return;
            }
            case CommonConstant.ButtonGridDelete: {
                this.actionDelete();
                return;
            }
        }
    }
    // END: Handle event navigator

    // START: Listen data
    private registerEvents() {
        this.vorlagenKontextSandbox.loadXDocContextInitData(null);
        this.subscriptions.push(
            // list data
            this.vorlagenKontextSandbox.vorlagenKontextLoadAllData$.subscribe(vorlagen => {
                this.vorlagenkontextData = vorlagen ? vorlagen : [];
                this.vorlagenkontextData = vorlagen ? this.vorlagenkontextData.map((e, index) => Object.assign(e, { id: index + 1 })) : [];
                this.isDeleted && vorlagen ? this.focusDelete(vorlagen) : this.initViewDetail();
            }),
            // reload after update data
            this.vorlagenKontextSandbox.vorlagenKontextAddData$.subscribe(vorlagen => {
                if (this.getResultResponse(vorlagen)) {
                    this.vorlagenKontextSandbox.loadXDocContextInitData(null);
                    this.setActionSaveOrCancel();
                }
            }),

            this.vorlagenKontextSandbox.vorlagenKontextUpdateData$.subscribe(vorlagen => {
                if (vorlagen && !this.hanleResponse(vorlagen)) {
                    if (this.getResultResponse(vorlagen)) {
                        this.vorlagenKontextSandbox.loadXDocContextInitData(null);
                        this.setActionSaveOrCancel();
                    }
                }
            }),

            this.vorlagenKontextSandbox.vorlagenKontextDeleteData$.subscribe(vorlagen => {
                if (this.getResultResponse(vorlagen)) {
                    this.isDeleted = true;
                    this.vorlagenKontextSandbox.loadXDocContextInitData(null);
                    this.setActionSaveOrCancel();
                }
            }),

            this.vorlagenKontextSandbox.countXDocContext_TemplateByDocContextIDData$.subscribe((templates: any) => {
                if (templates && this.vorlagenkontextModel['docContextID']) {
                    this.deleteXdocKontext(templates.count);
                }
            }),

            this.moduleConfigSandbox.isEditModeStatus$.subscribe(data => {
                if (!isNullOrUndefined(data) && data === false) {
                    this.isViewDetail = true;
                    this.changeCustomizeBtn(true);
                    this.initGridBar(true);
                }
            })
        );
    }
    // END: Listen data

    focusDelete(vorlagenkontextData) {
        this.isDeleted = false;
        const promiseFocus = new Promise((resolveFocus) => {
            if (this.vorlagenkontextDeleteModel) {
                this.initVorlagentModel(this.vorlagenkontextDeleteModel);
                this.selectedKeys = [this.vorlagenkontextDeleteModel['id']];
                resolveFocus(this.vorlagenkontextDeleteModel['id']);
            } else if (!this.vorlagenkontextDeleteModel && vorlagenkontextData && vorlagenkontextData.length > 0) {
                const volagenCurrent = vorlagenkontextData[vorlagenkontextData.length - 1];
                this.initVorlagentModel(volagenCurrent);
                this.selectedKeys = [volagenCurrent.id];
                resolveFocus(volagenCurrent.id);
            }
        });
        promiseFocus.then((id) => {
            this.scrollToActiveEl(id);
        });
    }

    initVorlagentModel(vorlagenkontextModel) {
        if (vorlagenkontextModel && !this.isAddMode) {
            this.selectedKeys = [vorlagenkontextModel.id];
            this.vorlagenkontextModel = cloneDeep(vorlagenkontextModel);
            this.vorlagencontextLastModel = cloneDeep(vorlagenkontextModel);
        }
    }

    private initViewDetail() {
        if (Array.isArray(this.vorlagenkontextData) && this.vorlagenkontextData.length > 0) {
            this.initVorlagentModel(this.vorlagenkontextData[0]);
            this.isFocusFirstRow = true;
        }
    }

    private scrollToActiveEl(id) {
        setTimeout(() => {
            const index = this.listData.gridKontextComponent.instance.getRowIndexByKey(id);
            const scrollable = this.listData.gridKontextComponent.instance.getScrollable();
            const row = this.listData.gridKontextComponent.instance.getRowElement(index);
            scrollable.scrollToElement(row);
        });
    }

    getResultResponse(result) {
        return result && Array.isArray(result) ? result[0].value : result && typeof result === 'object' ? result.value : false;
    }

    hanleResponse(response) {
        if (!response.status) {
            return false;
        }

        const body = JSON.parse(response._body);
        if (response.status === AppEnums.StatusCode.STATUS_CODE_409 && body.businessErrorCode === AppEnums.BusinessErrorCode.BUSINESS_ERROR_CODE_409001) {
            this.showPopupResponse(false, body.message);
        } else {
            this.showPopupResponse(true, body.message);
        }
        return true;
    }

    showPopUpMulti(remainMessage) {
        if (remainMessage.message) {
            this.popUpModel = new PopUpModel({ isVisible: false });
            this.showPopupResponse(true, this.translateService.instant(remainMessage.message));
        }
    }

    showPopupMessage(message, isComfirm) {
        this.popUpModel.message = message;
        this.popUpModel.textYes = this.translateService.instant(VorlagenKontextConstant.translateKeyBtnYes);
        this.popUpModel.textNo = this.translateService.instant(VorlagenKontextConstant.translateKeyBtnNo);
        this.popUpModel.title = isComfirm ? this.translateService.instant(VorlagenKontextConstant.translateKeyPopupTitle) : this.translateService.instant(VorlagenKontextConstant.translateKeyInformation);
        this.popUpModel.isVisible = true;
    }

    showPopupResponse(status, message) {
        this.popUpModel = new PopUpModel({ isVisible: false });
        if (status) {
            this.popUpModel.isVisibleNo = false;
            this.popUpModel.isVisibleYes = false;
        } else {
            this.popUpModel.funcNo = () => {
                this.setActionSaveOrCancel();
                this.popUpModel.isVisible = false;
                this.isConflicted = false;
                this.buttonSaveIsDisable(false);
                this.vorlagenKontextSandbox.loadXDocContextInitData(null);
            };
            this.popUpModel.funcYes = () => {
                this.isConflicted = true;
                this.buttonSaveIsDisable(true);
                this.popUpModel.isVisible = false;
            };
            this.popUpModel.textYes = this.translateService.instant(VorlagenKontextConstant.translateKeyBtnConfirmYes);
            this.popUpModel.textNo = this.translateService.instant(VorlagenKontextConstant.translateKeyBtnConfirmNo);
        }
        this.popUpModel.title = status ? this.translateService.instant(VorlagenKontextConstant.translateKeyInformation) : this.translateService.instant(VorlagenKontextConstant.translateKeyPopupTitle);
        this.popUpModel.message = message;
        this.popUpModel.isVisible = message ? true : false;
    }

    setActionSaveOrCancel() {
        this.isViewDetail = true;
        this.initGridBar(true);
        this.changeCustomizeBtn(true);
        this.isAddMode = false;
        this.isEditMode = false;
        this.isSave = false;
        this.isErrorClosed = false;
        this.messageErr = VorlagenKontextConstant.defaultTextErr;
        this.listData.gridKontextComponent.instance.repaint();
        this.isConflicted = false;
        this.buttonSaveIsDisable(false);
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
    }

    deleteXdocKontext(templates): void {
        let message;
        if (templates > 0) {
            this.popUpModel = new PopUpModel({ isVisible: false });
            message = VorlagenKontextConstant.message;
            this.popUpModel.isVisibleNo = false;
            this.popUpModel.funcYes = () => {
                this.popUpModel.isVisible = false;
            };
            this.popUpModel.isVisibleYes = false;
            const language = this.getLanguageCode();
            this.showPopupMessage(this.getMessage(message[language], this.vorlagenkontextModel.docContextName), false);
        } else {
            this.popUpModel = new PopUpModel({ isVisible: false });
            message = this.translateService.instant(VorlagenKontextConstant.translateKeyBtnConfirmDelete);
            this.popUpModel.funcYes = () => {
                if (this.vorlagenkontextModel && this.vorlagenkontextModel.docContextID && this.vorlagenkontextModel.xDocContextTS) {
                    // set model next  in volagen kontext data
                    const promiseNextdata = new Promise((resolveNextdata) => {
                        this.vorlagenkontextDeleteModel = this.getNextData(this.vorlagenkontextModel.docContextID);
                        resolveNextdata();
                    });
                    promiseNextdata.then(() => {
                        this.vorlagenKontextSandbox.deleteXDocContextData(
                            { docContextID: this.vorlagenkontextModel.docContextID, xDocContextTS: this.vorlagenkontextModel.xDocContextTS });
                    });

                }
                this.popUpModel.isVisible = false;
                this.setActionSaveOrCancel();
            };
            this.popUpModel.funcNo = () => {
                this.popUpModel.isVisible = false;
            };
            this.showPopupMessage(message, true);
        }
    }

    changeCustomizeBtn(isViewMode) {
        this.isViewDetail = isViewMode;
        this.customizeBtnDetail[0].visible = this.isViewDetail;
        this.customizeBtnDetail[1].visible = this.isViewDetail;
        this.customizeBtnDetail[2].visible = !this.isViewDetail;
        this.customizeBtnDetail[3].visible = !this.isViewDetail;
        this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
    }

    initGridBar(status) {
        this.listBtn = status ? [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])] : [];
        this.listBtnDetail = status ?
            [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])] :
            [null, getConditionListBtn(CommonConstant.AdditionalButtons, CommonConstant.ListFullToolbarButtons.concat([CommonConstant.GridSettingBtn]))];
    }

    getLanguageCode(): string {
        return localStorage.getItem('currentLang.Culture') ? localStorage.getItem('currentLang.Culture') : 'de-CH';
    }

    buttonSaveIsDisable(isDisable: boolean) {
        this.customizeBtnDetail[2].disabled = isDisable;
        this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
    }

    getNextData(docKontextID) {
        let object = null;
        let flag = false;
        if (this.vorlagenkontextData) {
            this.vorlagenkontextData.forEach(vorlagen => {
                if (docKontextID === vorlagen.docContextID) {
                    flag = true;
                } else
                    if (flag) {
                        flag = false;
                        object = Object.assign({}, vorlagen);
                        return object;
                    }
            });
        }
        return object;
    }

    getMessage(string, code) {
        return string.replace('%s', code);
    }

    // action delete count xdocKontext template by id
    actionDelete() {
        if (this.vorlagenkontextModel && this.vorlagenkontextModel.docContextID) {
            this.vorlagenKontextSandbox.countXDocContext_TemplateByDocContextID(
                { docContextID: this.vorlagenkontextModel.docContextID });
        }
    }

    actionCancel_OnClick() {
        if (this.isConflicted) {
            this.vorlagenKontextSandbox.loadXDocContextInitData(null);
            this.setActionSaveOrCancel();
        } else if (this.validateIsChange()) {
            let message;
            if (this.isAddMode) {
                this.popUpModel = new PopUpModel({ isVisible: false });
                message = this.translateService.instant(VorlagenKontextConstant.DeleteAppNew);
                this.popUpModel.funcYes = this.oncancelAdd;
            } else {
                this.popUpModel = new PopUpModel({ isVisible: false });
                message = this.translateService.instant(VorlagenKontextConstant.CancelEditModel);
                this.popUpModel.funcYes = this.oncancelEdit;
            }

            this.popUpModel.funcNo = () => {
                this.popUpModel.isVisible = false;
            };
            this.showPopupMessage(message, true);
        } else {
            this.isAddMode ? this.oncancelAdd() : this.oncancelEdit();
        }
    }

    oncancelAdd = () => {
        this.popUpModel.isVisible = false;
        this.setActionSaveOrCancel();
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        const object = this.vorlagenkontextData.find(result => result['id'] === this.selectedKeys[0]);
        this.initVorlagentModel(object);
    }

    oncancelEdit = () => {
        this.popUpModel.isVisible = false;
        this.setActionSaveOrCancel();
        this.vorlagenkontextModel = cloneDeep(this.vorlagencontextLastModel);
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    }

    actionNew_OnClick() {
        this.vorlagenkontextModel = new XDocContext();
        this.isViewDetail = !this.isViewDetail;
        this.changeCustomizeBtn(false);
        this.initGridBar(false);
        this.isAddMode = true;
        this.isEditMode = false;
        this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
        setTimeout(() => {
            this.vorlagenkontextDetail.editForm.kontextName.instance.focus();
        });
    }

    actionEdit_OnClick() {
        this.isViewDetail = !this.isViewDetail;
        this.initGridBar(false);
        this.changeCustomizeBtn(false);
        this.isAddMode = false; // replace this with current mode.
        this.isEditMode = true;
        this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
        setTimeout(() => {
            this.vorlagenkontextDetail.editForm.kontextName.instance.focus();
        });
    }

    actionSave_OnClick() {
        const validateForm = this.vorlagenkontextDetail.editForm.vorlagenkontextForm.instance.validate();
        if (!validateForm.isValid) {
            this.showMessageValid(true);
            this.remainingMsg.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        } else {
            this.actionSave();
            this.isSave = true;
        }
    }

    showMessageValid(isValid) {
        if (isValid) {
            this.isErrorClosed = false;
            this.messageErr = this.translateService.instant(VorlagenKontextConstant.formValidate);
        } else {
            this.isErrorClosed = true;
            this.messageErr = VorlagenKontextConstant.defaultTextErr;
        }
    }

    actionSave() {
        this.hanleModelSave();
        if (this.isAddMode && this.vorlagenkontextModel && this.compareModelEdit()) {
            this.vorlagenKontextSandbox.insertXDocContextData(this.vorlagenkontextModel);
        }
        if (this.isEditMode && this.vorlagenkontextModel) {
            this.vorlagenKontextSandbox.updateXDocContextData(this.vorlagenkontextModel);
        }
    }

    hanleModelSave() {
        if (this.vorlagenkontextModel.docContextName) {
            this.vorlagenkontextModel.docContextName = this.vorlagenkontextModel.docContextName.trim();
        }
        if (this.vorlagenkontextModel.description) {
            this.vorlagenkontextModel.description = this.vorlagenkontextModel.description.trim();
        }
    }

    onUpdatePopup(value) {
        this.popUpModel = value;
    }

    updateDirtyForm() {
        if (this.validateIsChange()) {
            this.moduleConfigSandbox.updateDirtyFormStatus(true);
        } else {
            this.moduleConfigSandbox.updateDirtyFormStatus(false);
        }
    }

    onFormChange(payload) {
        switch (payload.type) {
            case VorlagenKontextConstant.typeBoxInput:
                this.vorlagenkontextModel[payload.field] = payload.event.event.target.value;
                this.updateDirtyForm();
                break;

            default:
                const validateForm = this.vorlagenkontextDetail.editForm.vorlagenkontextForm.instance.validate();
                if (validateForm.isValid) {
                    this.isErrorClosed = true;
                    this.messageErr = VorlagenKontextConstant.defaultTextErr;
                }
                break;
        }
    }

    setSelectedGridElement(grid, index) {
        if (this.isFocusFirstRow) {
            grid.selectRowsByIndexes([index]);
            this.isFocusFirstRow = false;
        }
    }
}
