import 'devextreme-intl';

import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    Component,
    EventEmitter,
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
import { BfsVariablenConstant } from '@shared/common/bfsvariablen.common';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PopOverComponent } from '@shared/components/popover/popover.component';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { VariablenSandbox } from '../../bfs-variablen.sandbox';

@Component({
    selector: 'kiss-bfs-variablen-list',
    templateUrl: './bfs-variablen-list.component.html',
    styleUrls: ['./bfs-variablen-list.component.scss']
})
@SetClassRight('CtlBfsQueryVariablen')
export class VariablenListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('gridVariablen') gridVariablenInstance: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expand') expand: any;
    @ViewChild('popover') popover: PopOverComponent;
    @Output() emitOnContentReady: EventEmitter<any> = new EventEmitter();
    // grid variablens
    variablenGridColumns: any[] = [];
    dataVariablens = [];
    dataVariablen = {};

    totalRecords: any;
    filterAvs: any;
    selectedKeys: number[] = [];
    rightClickColumnHeaderIndex = 0;
    clickColumnFilterIndex = 0;
    rowSelectedIndex: number;
    isReadOnly = true;
    filterColumns: Array<any> = [];
    fixwidth = CommonConstant.FIX_WIDTH;
    titleBenutzerdefiniert = this.translateService.instant('Variablen.Message.titleBenutzerdefiniert');
    gridFunctionKey = this.translateService.instant('Variablen.Message.gridSetting');
    popupData = {
        visible: false,
        message: '',
        title: '',
        ok: ''
    };
    private optionExportFileName = this.translateService.instant('Variablen.Title');
    private subscription = new Subscription();

    constructor(injector: Injector,
        public variablenSandbox: VariablenSandbox,
        public utilService: UtilService,
        public translateService: TranslateService
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {
        this.initFunction();
        this.registerEvents();
    }
    initFunction() {
    }

    private registerEvents(): void {
        this.subscription.add(this.variablenSandbox.VariablenData$.subscribe(response => {
            if (!isNullOrUndefined(response) && !isNullOrUndefined(response.data)) {
                this.dataVariablens = response.data;
                if (response.caption && response.caption.length > 0) {
                    this.variablenGridColumns = response.caption;
                } else { // if has nodata display 8 default columns
                    this.variablenGridColumns = [...BfsVariablenConstant.DEFAULT_COLUMNS];
                }
                this.variablenGridColumns.push({
                    minWidth: '60px',
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'left',
                    allowHeaderFiltering: false,
                    allowSearch: false,
                    cellTemplate: 'cellTemplate'
                });
                if (this.dataVariablens.length > 0) {
                    this.selectedKeys = [this.dataVariablens[0].rowID];
                    this.dataVariablen = this.dataVariablens[0];
                }
                this.onLoadColumnDefine();
                // time out 1 second for rendering dom
                setTimeout(() => { this.emitOnContentReady.emit(true); }, 1000);
            }
        }));
    }

    onSaveColumnDefine() {
        const columns = [];
        for (let i = 0; i < this.gridVariablenInstance.instance.columnCount() - 1; i++) {
            columns.push({
                visibleIndex: this.gridVariablenInstance.instance.columnOption(i).visibleIndex,
                dataField: this.gridVariablenInstance.instance.columnOption(i).dataField,
                dataType: this.gridVariablenInstance.instance.columnOption(i).dataType,
                width: this.gridVariablenInstance.instance.columnOption(i).width,
                caption: this.gridVariablenInstance.instance.columnOption(i).caption,
                visible: this.gridVariablenInstance.instance.columnOption(i).visible,
                sortOrder: this.gridVariablenInstance.instance.columnOption(i).sortOrder,
                filterValue: this.gridVariablenInstance.instance.columnOption(i).filterValue,
                filterValues: this.gridVariablenInstance.instance.columnOption(i).filterValues,
                filterType: this.gridVariablenInstance.instance.columnOption(i).filterType
            });
        }
        columns.push({
            width: 'auto',
            allowFiltering: false,
            allowSorting: false,
            alignment: 'left',
            allowHeaderFiltering: false,
            allowSearch: false,
            cellTemplate: 'cellTemplate'
        });
        localStorage.setItem(BfsVariablenConstant.LOCALSTORAGE_KOL_DEF_KEY, JSON.stringify(columns));
    }

    onLoadColumnDefine() {
        let columnsDefineConfig = null;
        try {
            columnsDefineConfig = JSON.parse(localStorage.getItem(BfsVariablenConstant.LOCALSTORAGE_KOL_DEF_KEY));
        } catch (e) { }

        if (columnsDefineConfig) {
            this.variablenGridColumns = Object.assign(this.variablenGridColumns, columnsDefineConfig);
        }
        setTimeout(() => {
            this.gridVariablenInstance.instance.refresh();
            this.gridVariablenInstance.instance.repaint();
        }, 300);
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }


    /**
     * Create function to un-register all subscribes
     */
    unregisterEvents() {
        this.subscription.unsubscribe();
    }

    /**
     * Create function for Click on grid's row
     */
    getDetailToBottom(e) {
        this.dataVariablen = e.data;
    }

    /**
     * Create function for Click on menu item
     */
    toolBarOnItemClickTopGrd(event, remainingMessage) {
        switch (event) {
            case CommonConstant.ButtonExportExcel: {
                this.gridVariablenInstance.instance.option({
                    export: {
                        fileName: this.optionExportFileName,
                        excelFilterEnabled: true,
                        customizeExcelCell: UtilityHelper.CustomizeExcelCell,
                    }
                });
                this.gridVariablenInstance.instance.exportToExcel(false);
                break;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridVariablenInstance.instance.showColumnChooser();
                break;
            }
            case CommonConstant.ButtonGridSetting: {
                this.gridFunction.showPopup(this.gridFunction.model);
                break;
            }
            case CommonConstant.ButtonGridDelete: {
                remainingMessage.showMessage(this.translateService.instant('Variablen.Message.MSG_002'));
                return;
            }
            case BfsVariablenConstant.BUTTON_SPEICHERE_KOL_DEF:
                this.onSaveColumnDefine();
                break;
            case BfsVariablenConstant.BUTTON_RESET_KOL_DEF:
                this.onLoadColumnDefine();
                break;
            case BfsVariablenConstant.BUTTON_EXPORT_CSV:
                const datePipe = new DatePipe(BfsVariablenConstant.EN_US);
                const date = datePipe.transform(new Date(), BfsVariablenConstant.DATE_FORMAT);
                this.exportCsv(this.dataVariablens, BfsVariablenConstant.CSV_FILE_NAME + date.toString() + BfsVariablenConstant.SUFFIX_CSV, this.variablenGridColumns.map(column => column.caption));
                break;
            default:
                break;
        }
        this.gridFunction.model[event] = !this.gridFunction.model[event];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
        }
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
    /**
    * Create function for Right Click on Grid's Column Header
    */
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

    /**
    * Create function for Click on Grid's Column Filter
    */
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

    /**
     * Handle close/refresh the tab
     */
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }

    hideHeader(option: any) {
        const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
        header[0].style.display = option ? 'none' : 'block';
    }

    /**
     * Datagrid variablen ready
     */
    onContentReady(e) {
        this.totalRecords = e.component.totalCount();
    }

    /**
     * Click event on datagrid's row
     */
    onRowClick(e) {
        this.dataVariablen = e.data;
        this.rowSelectedIndex = e.component.getSelectedRowKeys()[0];
    }

    /**
     * Arrow Key
     */
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
    /**
     * Functions update filter column
     * @return {Array} list of column options
    */
    getFilterColumns() {
        const columnCount = this.gridVariablenInstance.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridVariablenInstance.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridVariablenInstance.instance.columnOption(i));
            }
        }
    }

    /**
     * Click event on popover button
     */
    onClick(e) {
        this.popover.popupPosition = { of: e.element };
        this.popover.showPopup([]);
    }

    ngAfterViewInit() {
        this.getFilterColumns();
    }

    exportCsv(data: any, fileName: string, customHeaders: any = []) {
        const replacer = (key, value) => value === null ? '' : value;
        const headers = Object.keys(data[0]);
        const csv = data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(';', ',').split('"').join('')).join(';'));
        const rowCount = csv.length;
        // using custom header
        if (customHeaders.length > 0) {
            csv.unshift(customHeaders.map(header => (`${header}`).replace(';', ',')).join(';'));
        } else {
            csv.unshift(headers.map(header => (`${header}`).replace(';', ',')).join(';'));
        }
        const csvArray = csv.join('\r\n');

        const a = document.createElement('a');
        const blob = new Blob(['\ufeff' + csvArray], { type: 'text/csv' }), url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        this.showDialogConfirm(this.translateService.instant(`${this.translateService.instant('Variablen.Message.Export_CSV_Msg_Part1')} ${rowCount} ${this.translateService.instant('Variablen.Message.Export_CSV_Msg_Part2')}`));
    }

    onKeyPress(event) {
        if (event.event.keyCode < AppEnums.KeyCode.KeyNumber0 || event.event.keyCode > AppEnums.KeyCode.KeyNumber9) {
            event.event.preventDefault();
        }
    }

    showDialogConfirm(message) {
        this.popupData.visible = true;
        this.popupData.title = this.translateService.instant('Variablen.Infomation');
        this.popupData.message = message;
    }

    onContextMenuPreparing(e) {
        this.gridFunction.menuGrouping(e, this.expand, this.gridVariablenInstance, CommonConstant.MenuGroupingHeaderGrid);
    }
}

