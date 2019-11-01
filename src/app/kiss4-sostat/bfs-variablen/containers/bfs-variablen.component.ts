import 'devextreme-intl';

import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Mitarbeiter, Person } from '@app/kiss4-sostat/bfs-variablen/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BfsVariablenConstant } from '@shared/common/bfsvariablen.common';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { ProgressbarComponent } from '@shared/components/progress-bar/progressbar.component';
import { VariablenSandbox } from '../bfs-variablen.sandbox';

@Component({
    selector: 'kiss-bfs-variablen',
    templateUrl: './bfs-variablen.component.html',
    styleUrls: ['./bfs-variablen.component.scss']
})
@SetClassRight('CtlBfsQueryVariablen')
export class VariablenComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
    @ViewChild('variablenList') variablenList: any;
    @ViewChild('variablenSearch') variablenSearch: any;
    @ViewChild('remainingMessage') remainingMessage: any;
    @ViewChild('progressBar') progressBar: ProgressbarComponent;

    optionNameExportKey = 'export.fileName';
    optionExportFileName = this.translateService.instant('Variablen.Title');
    // grid variablens
    variablenGridColumns: any[] = [];
    dataVariablens = [];
    dataVariablen = {};
    // dropdown grid Klient data
    dataPersons: Person[] = [];
    baPersonID: any;
    openPersonGrid = false;
    selectedPersonKeys = [];
    // dropdown grid Mitarbeiter data
    dataMitarbeiters: Mitarbeiter[] = [];
    userID: any;
    openMitarbeiterGrid = false;
    selectedMitarbeiterKeys = [];
    // search init data
    searchInitJahr = '';
    searchInitLeistungsart = [];
    searchInitSektion = [];
    selectedLeistungsart: any;
    selectedSektion: any;
    exportCsvPath: any;
    // checkboxes
    stichtag = true;
    anfangszustand = true;
    nurDossiertrager = false;
    excelExport = true;
    //
    totalRecords: any;
    totalKlientRecords: any;
    totalMitarbeiterRecords: any;
    popupHtml: any;
    filterAvs: any;
    selectedKeys = [];
    userLogonID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    languageCode: string;
    rightClickColumnHeaderIndex = 0;
    clickColumnFilterIndex = 0;
    rowSelectedIndex: number;
    isReadOnly = true;
    isFirstLoad = true;
    filterColumns: Array<any> = [];
    fixwidth = CommonConstant.FIX_WIDTH;
    titleBenutzerdefiniert = this.translateService.instant('Variablen.Message.titleBenutzerdefiniert');
    gridFunctionKey = this.translateService.instant('Variablen.Message.gridSetting');
    toolbarControlAvstop = {
        isFilter: false,
        isSearch: false,
        isSearchPanel: false,
        isFilterBuilder: false,
    };
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [{
        text: this.translateService.instant('Variablen.Speichere-Kol-Def'),
        visible: true,
        name: BfsVariablenConstant.BUTTON_SPEICHERE_KOL_DEF,
        id: 'o010_bfs-variablen_speichere-kol-def',
        icon: 'save'
    },
    {
        text: this.translateService.instant('Variablen.Reset-Kol-Def'),
        visible: true,
        name: BfsVariablenConstant.BUTTON_RESET_KOL_DEF,
        id: 'o010_bfs-variablen_reset-kol-def',
        icon: 'revert'
    },
    {
        text: this.translateService.instant('Variablen.Export-CSV'),
        visible: true,
        name: BfsVariablenConstant.BUTTON_EXPORT_CSV,
        id: 'o010_bfs-variablen_export-csv',
        icon: 'download'
    }];

    private subscription = new Subscription();

    constructor(injector: Injector,
        public variablenSandbox: VariablenSandbox,
        public utilService: UtilService,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {
        this.setTitle('Sostat');
        this.progressBar.showProgressBar();
        this.initFunction();
        this.getLocalStorage();
        this.registerEvents();
    }
    initFunction() {
    }

    getLocalStorage() {
        this.userLogonID = UtilityHelper.getUserIdFromLocalStorage();
        this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
        this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
        this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
        this.logonName = UtilityHelper.getUserFromLocalStorage();
    }

    private registerEvents(): void {
    }

    onSaveColumnDefine() {
        this.variablenList.onSaveColumnDefine();
    }

    onLoadColumnDefine() {
        this.variablenList.onLoadColumnDefine();
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    unregisterEvents() {
        this.subscription.unsubscribe();
    }

    toolBarOnItemClickTopGrd(event) {
        this.variablenList.toolBarOnItemClickTopGrd(event, this.remainingMessage);
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

    rightClickColumnHeader(index: number) {
        const elements = document.getElementsByClassName('dx-datagrid-action');
        const element = elements.item(index);
        if (document.createEvent) {
            const events = new MouseEvent('contextmenu', {
                bubbles: true,
                clientX: this.getOffset(element).left,
                clientY: this.getOffset(element).top
            });
            element.dispatchEvent(events);
            this.rightClickColumnHeaderIndex++;
            if (this.rightClickColumnHeaderIndex === elements.length) {
                this.rightClickColumnHeaderIndex = 0;
            }
            return;
        }
    }

    clickColumnFilter(index: number) {
        const grid = document.getElementById('o010_bfs-variablen_grid-bfs-variablen');
        const elements = grid.getElementsByClassName('dx-header-filter');
        const element = elements.item(index);
        if (document.createEvent) {
            const events = new MouseEvent('click', {
                bubbles: true,
                clientX: this.getOffset(element).left,
                clientY: this.getOffset(element).top
            });
            element.dispatchEvent(events);
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

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }

    hideHeader(option: any) {
        const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
        header[0].style.display = option ? 'none' : 'block';
    }

    onContentReady(e) {
        this.totalRecords = e.component.totalCount();
    }

    onKlientGridContentReady(e) {
        this.totalKlientRecords = (e.component.totalCount() > 0) ? e.component.totalCount() : 0;
    }

    onMitarbeiterGridContentReady(e) {
        this.totalMitarbeiterRecords = (e.component.totalCount() > 0) ? e.component.totalCount() : 0;
    }

    onRowClick(e) {
        this.dataVariablen = e.data;
        this.rowSelectedIndex = e.component.getSelectedRowKeys()[0];
    }

    onKeyDown(e) {
        const data = e.component.getSelectedRowKeys();
        if (data.length) {
            const currentKey = data[0];
            let index = e.component.getRowIndexByKey(currentKey);
            if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
                index--;
                if (index < 0) {
                    index++;
                }
            } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
                index++;
                if (e.component.getKeyByRowIndex(index) == null) {
                    index--;
                }
            }
            e.component.selectRows([e.component.getKeyByRowIndex(index)], false);
            // row indicator
            this.rowSelectedIndex = e.component.getKeyByRowIndex(index);
            // detail object
            let dataObj = null;
            e.component.byKey(this.rowSelectedIndex).done(function (dataObject) {
                dataObj = dataObject;
            });
            this.dataVariablen = dataObj;
            // scroll
            e.component.getScrollable().scrollToElement(e.component.getRowElement(index));
        }
        e.event.stopPropagation();
    }

    ngAfterViewInit() {
    }

    onKeyPress(event) {
        if (event.event.keyCode < AppEnums.KeyCode.KeyNumber0 || event.event.keyCode > AppEnums.KeyCode.KeyNumber9) {
            event.event.preventDefault();
        }
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }

    onSearch(isSearching) {
        if (isSearching) {
            this.progressBar.showProgressBar();
        }
    }

    onGetDataReady(isContentReady) {
        if (isContentReady) {
            this.progressBar.hideProgressBar();
        }
    }
}

