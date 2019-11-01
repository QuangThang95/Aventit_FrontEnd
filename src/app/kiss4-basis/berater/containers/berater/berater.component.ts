import { Component, Injector, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { Kontakt } from '../../models/kontakt.models';
import { TranslateService } from '@ngx-translate/core';
import { BeraterSandbox } from '../../berater.sandbox';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { BeraterAllConstant } from '../../berater.constant';
import { BeraterConstant } from '@shared/common/berater.common';
import { CommonConstant } from '@shared/common/constant.common';
import { Subscription } from 'rxjs';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { Subject } from 'rxjs';

@Component({
    selector: 'kiss-berater',
    templateUrl: './berater.component.html',
    styleUrls: ['./berater.component.scss'],
})

export class BeraterComponent extends BaseComponent implements OnInit, OnDestroy {
    @ViewChild('formList') formList: any;
    titlePage: any;
    listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons.slice(0, 7)];
    customizeBtn = [];
    queryDataSearch = {};
    institutionData: any;
    beraterData: any = null;
    isReadOnly = true;
    isOldReadOnly = true;
    remainMessage = { visible: false, message: '' };
    selectedKeys = [];
    formData: Kontakt = new Kontakt();
    oldFormData: any;
    listLanguage = [];
    listInstitution = [];
    isAddNew = false;
    isEdit = false;
    isDelete = false;
    isChange = false;
    isEditFailDaken = false;
    isEditFailAbbrechen = false;
    keyPopup: any;
    idSave: any;
    popUpModelConfirm: PopUpModel;
    popUpModelCanDeactive: PopUpModel;
    popUpConcurrencyModel: PopUpModel;
    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
    private subscriptions = new Subscription();
    constructor(injector: Injector,
        public beraterSandbox: BeraterSandbox,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    ngOnInit() {
        this.titlePage = this.translateService.instant('ExterneBerater.TitlePage');
        this.setTitle(this.titlePage);
        this.getBeraterData({});
        this.registerEvent();
        this.getInstitution({ baInstitutionTypId: -1, onlyActive: true });
        this.beraterSandbox.getLanguage();
        this.initPopUpModelConfirm();
        this.initPopUpModelCanDeactive();
        this.initPopUpModelConcurrency();
    }

    ngOnDestroy(): void {
        this.unregisterEvent();
    }

    registerEvent() {
        this.subscriptions.add(
            this.beraterSandbox.beraterData$.subscribe(data => {
                this.beraterData = data ? data : [];
                this.beraterData = data ? this.beraterData.map((e, index) => Object.assign(e, { id: index + 1 })) : [];
                if (!isNullOrUndefined(data) && data.length) {
                    this.isEditFailDaken ? this.isReadOnly = false : this.isReadOnly = true;
                    if (this.isAddNew || this.isEdit || this.isDelete || this.isEditFailDaken) {
                        if (this.isDelete) {
                            this.selectedKeys = [this.beraterData[0].id];
                        } else {
                            setTimeout(() => {
                                const location = this.beraterData.filter(obj => obj.baInstitutionKontaktID === this.idSave);
                                this.selectedKeys = [location[0].id];
                            }, BeraterAllConstant.timeOut100);
                        }
                        this.isAddNew = this.isEdit = this.isDelete = this.isEditFailDaken = this.isChange = false;
                    } else {
                        this.selectedKeys = [this.beraterData[0].id];
                    }
                }
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.institutionData$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    this.institutionData = data;
                }
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.beraterLanguageData$.subscribe(list => {
                this.listLanguage = list;
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.beraterInstitutionData$.subscribe(list => {
                this.listInstitution = list;
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.beraterSaveKontaktData$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    this.onCloseError();
                    this.getBeraterData(this.queryDataSearch);
                    this.idSave = data.baInstitutionKontaktId;
                    this.isReadOnly = true;
                }
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.beraterSaveKontakDataFail$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    if (data.hasOwnProperty('status') && data.status === 409) {
                        this.handleActionConcurrency(this.translateService.instant('ExterneBerater.Messgage.MessageConcurency'));
                    } else {
                        this.keyPopup = BeraterAllConstant.loschenFail;
                        this.handleActionConfirm(this.translateService.instant('ExterneBerater.Messgage.MessageErrorEdit'));
                    }
                }
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.beraterDelKontaktData$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    this.isDelete = true;
                    this.getBeraterData(this.queryDataSearch);
                }
            })
        );

        this.subscriptions.add(
            this.beraterSandbox.beraterDelKontaktFailData$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    this.getBeraterData(this.queryDataSearch);
                    this.keyPopup = BeraterAllConstant.loschenFail;
                    this.handleActionConfirm(this.translateService.instant('ExterneBerater.Messgage.MessageDelError'));
                }
            })
        );
    }

    changeStatus(event) {
        this.isReadOnly = event.isReadOnly;
        this.isAddNew = event.isAddNew;
        this.isEdit = event.isEdit;
    }

    getInstitution(query) {
        this.beraterSandbox.loadInstitution(query);
    }

    getBeraterData(query) {
        this.beraterSandbox.loadBeraterData(query);
    }

    onSearchData(query) {
        this.queryDataSearch = query;
        this.getBeraterData(query);
    }

    toolBarOnItemClick(event: string) {
        this.formList.toolBarOnItemClick(event);
    }

    rowSelectChange(event) {
        this.selectedKeys = [event.id];
        this.formData = event;
        this.oldFormData = JSON.stringify(this.formData);
    }

    unregisterEvent() {
        this.subscriptions.unsubscribe();
    }

    saveData(save) {
        this.beraterSandbox.saveKontakt(save);
    }

    onChangeData(data) {
        this.isChange = this.isDifferentObj(JSON.parse(this.oldFormData), data);
    }

    isDifferentObj(objA, objB) {
        let flag = false;
        for (const property in objA) {
            if (objA.hasOwnProperty(property)) {
                if ((<any>objB)[property] !== (<any>objA)[property]) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    showRemainMessage(remainMessage) {
        this.remainMessage = remainMessage;
    }

    onCloseError() {
        this.remainMessage = {
            visible: false,
            message: '',
        };
    }

    onAbbrechen(event) {
        if (this.isChange) {
            let message;
            if (this.isAddNew) {
                message = BeraterConstant.AbbrechenAddnew;
            } else {
                message = BeraterConstant.AbbrechenDetail;
            }
            this.keyPopup = BeraterAllConstant.abbrechen;
            this.handleActionConfirm(message);
        } else {
            this.onNotChange();
        }
    }

    onLoschen(event) {
        if (this.isAddNew) {
            this.keyPopup = BeraterAllConstant.abbrechen;
            this.handleActionConfirm(BeraterConstant.AbbrechenAddnew);
            return;
        }
        this.keyPopup = BeraterAllConstant.loschen;
        this.handleActionConfirm(BeraterConstant.LoschenMessage);
    }

    onNotChange() {
        if (this.isAddNew) {
            this.getBeraterData(this.queryDataSearch);
        }
        this.isReadOnly = true;
        this.isAddNew = this.isEditFailDaken = this.isEdit = this.isChange = this.isEditFailAbbrechen = false;
        this.onCloseError();
    }

    initPopUpModelConfirm() {
        this.popUpModelConfirm = new PopUpModel(
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
                funcNo: null
            }
        );
    }

    handleActionConfirm(message) {
        this.initPopUpModelConfirm();
        this.popUpModelConfirm.isVisible = true;
        this.popUpModelConfirm.message = this.translateService.instant(message);
        switch (this.keyPopup) {
            case BeraterAllConstant.loschenFail: {
                this.popUpModelConfirm.isVisibleYes = false;
                this.popUpModelConfirm.isVisibleNo = false;
                this.popUpModelConfirm.title = BeraterAllConstant.information;
                break;
            }
            case BeraterAllConstant.speichernFail: {
                this.popUpModelConfirm.title = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.TitlePopupCopy');
                this.popUpModelConfirm.textYes = this.translateService.instant('BasisTextmarken.Button.Confirm');
                this.popUpModelConfirm.textNo = this.translateService.instant('BasisTextmarken.Button.Cancel');
                break;
            }
            default: {
                this.popUpModelConfirm.title = this.translateService.instant(BeraterConstant.ConfirmPopupTitle);
                this.popUpModelConfirm.textYes = this.translateService.instant(BeraterConstant.PopupYes);
                this.popUpModelConfirm.textNo = this.translateService.instant(BeraterConstant.PopupNo);
                break;
            }
        }
        this.popUpModelConfirm.funcYes = () => {
            this.onCloseError();
            this.popUpModelConfirm.isVisible = false;
            switch (this.keyPopup) {
                case BeraterAllConstant.loschen: {
                    this.beraterSandbox.delKontakt(this.formData.baInstitutionKontaktID, this.formData.baInstitutionKontaktTS);
                    break;
                }
                case BeraterAllConstant.abbrechen: {
                    this.formData = JSON.parse(this.oldFormData);
                    this.onNotChange();
                    break;
                }
                case BeraterAllConstant.speichernFail: {
                    this.isEditFailDaken = true;
                    this.selectedKeys = [this.formData.id];
                    this.getBeraterData(this.queryDataSearch);
                    break;
                }
                default: {
                    break;
                }
            }
        };
        this.popUpModelConfirm.funcNo = () => {
            this.popUpModelConfirm.isVisible = false;
            switch (this.keyPopup) {
                case BeraterAllConstant.speichernFail: {
                    this.isEditFailAbbrechen = true;
                    break;
                }
                default: {
                    break;
                }
            }
        };
    }

    initPopUpModelCanDeactive() {
        this.popUpModelCanDeactive = new PopUpModel(
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
                funcNo: null
            }
        );
    }

    handleActionCanDeactive(message) {
        this.initPopUpModelCanDeactive();
        this.popUpModelCanDeactive.message = message;
        this.popUpModelCanDeactive.textYes = this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.Yes');
        this.popUpModelCanDeactive.textNo = this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.No');
        this.popUpModelCanDeactive.title = this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.Title');
        this.popUpModelCanDeactive.isVisible = true;
        this.popUpModelCanDeactive = Object.assign({}, this.popUpModelCanDeactive);
        this.popUpModelCanDeactive.funcYes = () => {
            this.isReadOnly = true;
            this.isAddNew = this.isEditFailDaken = this.isEdit = this.isChange = this.isEditFailAbbrechen = this.isEditFailDaken = false;
            this.navigateAwaySelection$.next(true);
            this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
            this.popUpModelCanDeactive.isVisible = false;
        };
        this.popUpModelCanDeactive.funcNo = () => {
            this.popUpModelCanDeactive.isVisible = false;
            this.layoutSandbox.clearDeletingSticky();
            this.navigateAwaySelection$.next(false);
            return false;
        };
    }

    initPopUpModelConcurrency() {
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
                funcNo: null
            }
        );
    }

    handleActionConcurrency(message) {
        this.initPopUpModelConcurrency();
        this.popUpConcurrencyModel.isVisible = true;
        this.popUpConcurrencyModel.message = this.translateService.instant(message);
        this.popUpConcurrencyModel.title = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.TitlePopupCopy');
        this.popUpConcurrencyModel.textYes = this.translateService.instant('BasisTextmarken.Button.Cancel');
        this.popUpConcurrencyModel.textNo = this.translateService.instant('BasisTextmarken.Button.Confirm');
        this.popUpConcurrencyModel.funcYes = () => {
            this.popUpConcurrencyModel.isVisible = false;
            this.isEditFailAbbrechen = true;
        };
        this.popUpConcurrencyModel.funcNo = () => {
            this.onCloseError();
            this.popUpConcurrencyModel.isVisible = false;
            this.isEditFailDaken = true;
            this.selectedKeys = [this.formData.id];
            this.getBeraterData(this.queryDataSearch);
        };
    }

    blurAll() {
        const el = document.querySelector(':focus');
        if (el) {
            (el as HTMLElement).blur();
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        this.blurAll();
        if (this.isChange) {
            return false;
        }
    }

    canDeactivate() {
        if (!this.isReadOnly && this.isChange) {
            this.handleActionCanDeactive(this.translateService.instant('VorlagenKontext.NavigatorPopupConfirm.Message'));
            return this.navigateAwaySelection$;
        }
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
}

