import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { InkassofallSandbox } from '@app/kiss4-inkasso/inkassofall/inkassofall.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { InkassoConstant } from '@shared/common/inkasso.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getParseArray } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-inkassofall',
    templateUrl: './inkassofall.component.html',
    styleUrls: ['./inkassofall.component.scss']
})
@SetClassRight('Inkassofall')
export class InkassofallComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    //#region 'Declare decorator'
    @ViewChild('formList') formList: any;
    @ViewChild('formDetail') formDetail: any;
    //#endregion

    //#region "Declare variables Array"
    private subscription = new Subscription();
    rowSelectedOfGrid: any = null;
    rowSelectedForGrid: any = null;
    isOnChangeData = false;
    isDisableViewModel = true;
    pageTitle: any;
    isErrorClosed: any;
    messageErr: any;
    isClickTreeView = false;
    isPopupVisible = false;
    isChangeNode = false;
    currentNode: any = null;
    selectNode: any;
    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
    CommonBtn = [...CommonConstant.AdditionalButtons];
    ToolbarBtns = [...CommonConstant.ToolbarButtons];
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    dataInitSearch$: any;
    objectSearch: any;
    resultUpdate: any;
    popUpModelChangeForm: PopUpModel;
    Inkassofalls: any = null;
    objectDeleteSuccess: any = null;
    constructor(
        injector: Injector,
        public translateService: TranslateService,
        public inkassofallSandbox: InkassofallSandbox,
        private moduleConfigSandbox: ModuleConfigSandbox,
        public layoutSandbox: LayoutSandbox,
        public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox) {
        super(injector);
    }
    //#endregion

    //#region 'Inject services in contructor and innitdata'
    ngOnInit() {
        this.registerEvents();
        this.isErrorClosed = false;
        this.initPopUpModel();
        this.setTitle(InkassoConstant.TITLE_PAGE);
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    /**
     * register events sand box
     */
    registerEvents() {
        // Register subscribe for selected person
        this.subscription.add(
            this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
                this.pageTitle = `${person.titleText} > ${this.translateService.instant('Inkassofall.Title')}`;
            })
        );
        // register events SandBox delete
        /*     this.subscription.add(this.inkassofallSandbox.inkassofallDeleteData$.subscribe((response: any) => {
              if (!isNullOrUndefined(response)) {
                if (response.deleted) {
                  const indexRowSelected = this.Inkassofalls.findIndex(x => x.BFSFrageID === this.formList.gridInkassofall.selectedRowKeys[0]);
                  this.rowSelectedForGrid = this.Inkassofalls[indexRowSelected === this.Inkassofalls.length - 1 ? this.Inkassofalls.length - 2 : indexRowSelected + 1];
                  this.onStateFormUpdate(true);
                  this.loadDataViewList();
                }
                if (response.failed) {
                  if (response.data.status) {
                    const body = JSON.parse(response.data._body);
                    switch (response.data.status) {
                      case AppEnums.StatusCode.STATUS_CODE_404:
                        this.messageErr = this.translateService.instant('Inkassofall.Message.MessageConcurrencyDelete');
                        this.isErrorClosed = true;
                        setTimeout(function () {
                          document.getElementById('j007_validate-message').focus();
                        }, 300);
                        break;
                      default:
                        this.messageErr = body.message;
                        this.isErrorClosed = true;
                        break;
                    }
                  }
                }
              }
            })); */
        // register events SanBox tree node
        /*     this.subscription.add(this.moduleConfigSandbox.selectNode$.subscribe((node: any) => {
              if (node) {
                if (!this.currentNode) {
                  this.currentNode = node.attr;
                } else {
                  this.selectNode = node.attr;
                }
              }
            })); */
        // register events SanBox data init
        /*     this.dataInitSearch$ = this.inkassofallSandbox.inkassofallData$.pipe(
              filter((dataInit: any) => !isNullOrUndefined(dataInit))
            ); */
        // register events SanBox update
        /*     this.subscription.add(this.inkassofallSandbox.inkassofallUpdateData$.subscribe((response: any) => {
              if (!isNullOrUndefined(response)) {
                this.resultUpdate = response;
                this.onCloseError();
              }
            })); */
        /*     this.subscription.add(this.inkassofallSandbox.inkassofalllistData$.subscribe(Inkassofalls => {
              if (!isNullOrUndefined(Inkassofalls)) {
                this.Inkassofalls = Inkassofalls;
              }
            })); */
    }

    /**
     *  unregister subscription on destroy component
     */
    private unregisterEvents() {
        this.subscription.unsubscribe();
    }

    initPopUpModel() {
        this.popUpModelChangeForm = new PopUpModel(
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

    // #endregion

    //#region 'Component CRUD functions'

    /**
     * Get initial data for list area
     */
    loadDataViewList() {
        // this.inkassofallSandbox.loadListInkassofall(this.objectSearch);
    }

    /**
     * @param objectAddNew
     */
    onObjectAddNew(objectAddNew: any) {
        this.updateTree(!objectAddNew);
        this.isDisableViewModel = !objectAddNew;
        this.formList.addNewRowEmpty(objectAddNew);
        this.listBtn = [];
    }

    /**
     * handle function delete
     */
    onDeleteRowNew() {
        this.formList.deleteNewRowEmpty();
    }

    /**
     * @param {boolean} statusForm is Edit mode or View mode
     */
    onStateFormUpdate(statusForm: boolean) {
        this.updateTree(statusForm);
        this.isDisableViewModel = statusForm;
        this.formList.disableList(statusForm);
        this.formDetail.isViewModel = statusForm;
        this.formDetail.changeCustomizeBtn();
    }
    /**
     * Call SandBox update state tree
     * @param isViewMode
     */
    updateTree(isViewMode: boolean) {
        if (isViewMode) {
            this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
            this.moduleConfigSandbox.updateDirtyFormStatus(false);
        }
    }

    // #endregion

    //#region 'Business function'
    /**
     * @param objectSearch
     */
    doSearch(objectSearch: any) {
        this.objectSearch = {};
        for (const p in objectSearch) {
            if (!isNullOrUndefined(objectSearch[p])) {
                this.objectSearch[p] = objectSearch[p];
            }
        }
        this.loadDataViewList();
    }

    /**
     * @param rowSelectGrid
     */
    onRowSelectedFormSearch(rowSelectGrid: any) {
        this.rowSelectedForGrid = rowSelectGrid;
    }

    /**
     * @param {boolean} isEditMode
     */
    onDisableViewModel(isEditMode: boolean) {
        this.updateTree(isEditMode);
        this.isDisableViewModel = isEditMode;
        this.formList.disableList(isEditMode);
        if (isEditMode) {
            this.listBtn = [getParseArray([...this.ToolbarBtns], [2, 2])];
        } else {
            this.listBtn = [];
        }
    }

    /**
     * @param event
     */
    toolBarOnItemClick(event: string) {
        this.formList.toolBarOnItemClick(event);
    }

    /**
     * @param objectMessage
     */
    onMessage(objectMessage: any) {
        this.messageErr = objectMessage.message;
        this.isErrorClosed = objectMessage.hasError;
        if (objectMessage.hasError) {
            setTimeout(function () {
                document.getElementById('j007_validate-message').focus();
            }, 300);
        }
    }
    onCloseError() {
        this.isErrorClosed = false;
    }
    /**
     * Shortcuts Key
     * */
    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
            event.preventDefault();
            if (!this.isDisableViewModel) {
                this.formDetail.cancelInkassofall();
            }
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
            event.preventDefault();
            if (this.isDisableViewModel) {
                this.formDetail.addInkassofall();
            }
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
            event.preventDefault();
            this.formDetail.deleteInkassofall();
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
            event.preventDefault();
            if (!this.isDisableViewModel && !this.formDetail.customizeBtn[2].disabled) {
                const el = document.querySelector(':focus');
                if (el) {
                    (el as HTMLElement).blur();
                }
                this.formDetail.saveInkassofall();
            }
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
            event.preventDefault();
            this.formList.toolBarOnItemClick(CommonConstant.ButtonPrintPdf);
            return;
        }
    }

    changeButtonSave(isDisableButtonSave: boolean) {
        this.formDetail.changeButtonSave(isDisableButtonSave);
    }

    rowSelectChange(rowSelected) {
        this.rowSelectedOfGrid = rowSelected;
    }
    // #endregion

    //#region 'Utility functions'
    /**
     * @returns {any}
     */
    canDeactivate() {
        if (this.formDetail.onChangeData) {
            this.showPopup();
            return this.navigateAwaySelection$;
        }
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }

    showPopup() {
        this.popUpModelChangeForm.message = this.translateService.instant('Inkassofall.Message.MessageCandiavtive');
        this.popUpModelChangeForm.textYes = this.translateService.instant('Inkassofall.Message.Discard');
        this.popUpModelChangeForm.textNo = this.translateService.instant('Inkassofall.Message.Abbrechen');
        this.popUpModelChangeForm.title = this.translateService.instant('Inkassofall.Message.Title');
        this.popUpModelChangeForm.funcNo = () => {
            this.isChangeNode = false;
            this.popUpModelChangeForm.isVisible = false;
            this.layoutSandbox.clearDeletingSticky();
        };
        this.popUpModelChangeForm.funcYes = () => {
            this.isChangeNode = true;
            this.popUpModelChangeForm.isVisible = false;
            this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        };
        this.popUpModelChangeForm.funcHidden = () => {
            if (this.isChangeNode) {
                this.moduleConfigSandbox.selectNode({ attr: this.selectNode });
            } else {
                this.moduleConfigSandbox.selectNode({ attr: this.currentNode });
                this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
            }
            this.navigateAwaySelection$.next(this.isChangeNode);
        };
        this.popUpModelChangeForm.isVisible = true;
    }
    //#endregion
}
