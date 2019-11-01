import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { PopOverComponent } from '@shared/components/popover/popover.component';
import { CommonConstant } from '@shared/common/constant.common';
import { TranslateService } from '@ngx-translate/core';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { AppEnums } from '@shared/AppEnum';
import { locale } from 'devextreme/localization';
import { ModelKennzahlen } from '../../models';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subscription, Subject } from 'rxjs';
import { KennzahlenSandbox } from '../../kennzahlen.sandbox';
import { KennzahlenConstant } from '@shared/common/kennzahlen.common';
import { CustomizeExcelCell } from '@shared/utilites/utilityHelpers';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-kennzahlen-list',
    templateUrl: './kennzahlen-list.component.html',
    styleUrls: ['./kennzahlen-list.component.scss']
})
export class KennzahlenListComponent implements OnInit, OnDestroy {


    constructor(
        private translateService: TranslateService,
        private pennzahlenSandbox: KennzahlenSandbox,
    ) { }

    @ViewChild('gridkennzahlen') gridkennzahlen: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expand') expand: any;
    @ViewChild('popover') popover: PopOverComponent;
    @Output() messageChange = new EventEmitter<string>(null);
    @Output() isHideFilter = new EventEmitter<Boolean>(false);
    @Input() action: Subject<string>;

    filterAvs: any;
    caption: any;
    captionGridBot: any;
    selectedKeys = [];
    selectedKeyKennzahlen = [];
    initdata = [];
    totalRecords: number;
    titleBenutzerdefiniert = 'Benutzerdefiniert';
    model;
    rowSelectedIndex: number;
    gridFunctionKey = 'gridSetting';
    dataFomat: any;
    filterColumns: any;

    private subscriptions: Subscription[] = [];
    private modelKennzahlen = new ModelKennzahlen();
    private optionNameExport = 'export.fileName';
    private optionKennzahlenValue = 'Kennzahlen';
    private getLanguageCodeFromLocalStorage: string;
    private isErrorClosed = false;
    confixCaption = [{
        alignment: 'right',
        allowFiltering: true,
        allowHeaderFiltering: true,
        allowSearch: true,
        allowSorting: true,
        caption: 'Bezeichnung',
        dataField: 'Bezeichnung',
        dataType: 'string',
        width: 'auto'
    }, {
        allowFiltering: true,
        allowHeaderFiltering: true,
        allowSearch: true,
        allowSorting: true,
        caption: 'WertBetrag',
        dataField: 'WertBetrag',
        dataType: 'string',
        width: 'auto',
    }];

    // #region component life cycle functions
    ngOnInit() {
        this.loadGridSetting();
        this.registerEvents();
        this.filterColumns = [];
        this.getLanguageCodeFromLocalStorage = UtilityHelper.getLanguageCodeFromLocalStorage();
        locale(this.getLanguageCodeFromLocalStorage);
        this.action.subscribe(act => {
            this.toolBarOnItemClickTopGrd(act);
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    // #endregion

    // #region component CRUD functions

    private registerEvents(): void {
        this.subscriptions.push(
            this.pennzahlenSandbox.KennzahlensData$.subscribe(response => {
                if (!isNullOrUndefined(response) && !isNullOrUndefined(response.data)) {
                    this.model = !this.modelKennzahlen.proDossier;
                    if (response.status === KennzahlenConstant.ErrorCode) {
                        this.isErrorClosed = true;
                        this.messageChange.next(JSON.parse(response._body).message);
                        this.initdata = [];
                        return;
                    }
                    if (response.models === 1) {
                        this.model = true;
                        this.caption = this.confixCaption;
                        this.initdata = response.data;
                        this.convertDataObject(this.initdata);
                        this.isHideFilter.emit(false);
                        if (response.data.length) {
                            this.selectedKeys = [this.initdata[0].id];
                        }
                        return;
                    }
                    if (response.models === 2) {
                        this.model = false;
                        this.initdata = response.data;
                        this.isHideFilter.emit(true);
                        this.gridFunction.model.isFilterBuilder = false;
                        if (response.caption && response.caption.length > 1) {
                            this.captionGridBot = response.caption;
                        }
                        if (response.data.length) {
                            this.selectedKeyKennzahlen = [this.initdata[0].id];
                        }
                        return;
                    }
                }
            }),
        );
    }
    // #endregion

    // #region common functions
    formatNumberByCulture(data) {
        locale(this.getLanguageCodeFromLocalStorage);
        return new Intl.NumberFormat(this.getLanguageCodeFromLocalStorage, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data);
    }

    private convertDataObject(objectData: object[]) {
        this.dataFomat = objectData.map((rowData) => {
            Object.keys(rowData).map(key => {
                if (rowData.hasOwnProperty(key) && (key !== KennzahlenConstant.Id && typeof rowData[key] === KennzahlenConstant.Number)) {
                    rowData[key] = this.formatNumberByCulture(rowData[key]);
                }
            });
        });
    }

    onContentReady(event) {
        this.rowSelectedIndex = event.component.getSelectedRowKeys()[0];
        this.getFilterColumns();
        this.totalRecords = event.component.totalCount();
        this.filterColumns = [];
    }

    onContextMenuPreparing(event) {
        this.gridFunction.menuGrouping(event, this.expand, this.gridkennzahlen, CommonConstant.MenuGroupingHeaderGrid);

    }

    onClick(e) {
        this.popover.popupPosition = { of: e.element };
        this.popover.showPopup([]);
    }

    onKeyDown(event) {
        const data = event.component.getSelectedRowKeys();
        if (data.length) {
            const currentKey = data[0];
            let nextSelectedRow = event.component.getRowIndexByKey(currentKey);
            if (event.event.keyCode === AppEnums.KeyCode.UpArrowKey && nextSelectedRow > 0) {
                nextSelectedRow--;
            } else if (event.event.keyCode === AppEnums.KeyCode.DownArrowKey && nextSelectedRow < this.initdata.length - 1) {
                nextSelectedRow++;
            }
            event.component.selectRows([event.component.getKeyByRowIndex(nextSelectedRow)], false);
            this.rowSelectedIndex = event.component.getKeyByRowIndex(nextSelectedRow);
            // scroll
            event.component.getScrollable().scrollToElement(event.component.getRowElement(nextSelectedRow));
        }
        event.event.stopPropagation();
    }

    onInitialized(event) {
        if (this.captionGridBot) {
            this.captionGridBot.forEach((element) => {
                if (!KennzahlenConstant.ArrayDataFieldsFix.includes(element.dataField) && element.dataType === 'number') {
                    event.component.columnOption(element.dataField, {
                        dataType: 'number',
                        format: {
                            type: 'fixedPoint',
                            precision: 2
                        },
                    });
                }
            });
        }
    }

    private toolBarOnItemClickTopGrd(action: string) {
        switch (action) {
            case CommonConstant.ButtonExportExcel: {
                this.gridkennzahlen.instance.option(
                    {
                        export: {
                            fileName: this.optionKennzahlenValue,
                            excelFilterEnabled: true,
                            customizeExcelCell: CustomizeExcelCell,
                        }
                    });
                this.gridkennzahlen.instance.exportToExcel(false);
                document.getElementById('excelExportId').blur();
                return;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                document.getElementById('gridDruckenId').blur();
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridkennzahlen.instance.showColumnChooser();
                document.getElementById('spaltenauswahlId').blur();
                return;
            }
            default:
                break;
        }
        this.gridFunction.model[action] = !this.gridFunction.model[action];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
        }
    }

    private loadSettingFromLocalstorage(gridSetting) {
        this.gridFunction.model = new GridSettingModel();
        this.gridFunction.model = Object.assign(this.gridFunction.model, gridSetting);
    }

    private setGridKeytoLocalstorge() {
        this.gridFunction.model = new GridSettingModel();
        localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunction.model));
    }

    private loadGridSetting() {
        const gridSetting = JSON.parse(localStorage.getItem(this.gridFunctionKey));
        if (gridSetting) {
            this.loadSettingFromLocalstorage(gridSetting);
        } else {
            this.setGridKeytoLocalstorge();
        }
    }
    getFilterColumns() {
        const columnCount = this.gridkennzahlen.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridkennzahlen.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridkennzahlen.instance.columnOption(i));
            }
        }
    }


    // #endregion

    // #region utility functions
    // #endregion
}
