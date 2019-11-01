import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plausifehler } from 'app/kiss4-sostat/plausifehler/models';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Subscription } from 'rxjs/Subscription';
import { AppEnums } from 'shared/AppEnum';
import { SetClassRight } from 'shared/authorize/authorize.decorators';
import { BaseComponent } from 'shared/components/base.component';
import { GridFunctionComponent } from 'shared/components/grid-function/grid-function.component';
import { PopOverComponent } from 'shared/components/popover/popover.component';
import { PrinterComponent } from 'shared/components/printer/printer.component';
import { UtilService } from 'shared/utilites/utility.service';
import { isNullOrUndefined } from 'util';

import { CommonConstant } from '../../../../../shared/common/constant.common';
import { PlausifehlerSandbox } from '../../plausifehler.sandbox';
import { CustomizeExcelCell } from '@shared/utilites/utilityHelpers';

@Component({
    selector: 'kiss-plausifehler-list',
    templateUrl: './plausifehler-list.component.html',
    styleUrls: ['./plausifehler-list.component.scss']
})
@SetClassRight('CtlBfsQueryPlausiFehler')  // multi language
export class PlausifehlerListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild('gridplausifehler') gridplausifehler: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expand') expand: any;
    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('popover') popover: PopOverComponent;
    //#region "Declare variables for grid component"
    dataExportAllGridTop: Plausifehler[];
    dataPlausifehler = new Plausifehler();
    optionNameExport = 'export.fileName';
    popupHtml: any;
    showPrintPopup = false;
    filterAvs: any;
    creatorSearchId: any;
    selectedKeys = [];
    total: 0;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    languageCode: string;
    rightClickColumnHeaderIndex = 0;
    clickColumnFilterIndex = 0;
    visibleProgressBar = true;
    rowSelectedIndex: number;
    isReadOnly = true;
    filterColumns: Array<any> = [];
    titleBenutzerdefiniert = 'Benutzerdefiniert';
    gridFunctionKey = 'gridSetting';
    isErrorClosed = false;
    messageErr: any;
    private subscriptions: Subscription = new Subscription();
    //#endregion

    //#region "component life cycle functions"
    constructor(injector: Injector, public plausifehlerSandbox: PlausifehlerSandbox, public utilService: UtilService,
        public translateService: TranslateService) {
        super(injector);
    }

    ngOnInit() {
        this.registerEvents();
    }
    ngAfterViewInit() {
        this.getFilterColumns();
    }
    ngOnDestroy() {
        this.unregisterEvents();
    }
    unregisterEvents() {
        this.subscriptions.unsubscribe();
    }
    //#endregion

    //#region "Innit data"
    private registerEvents(): void {
        this.subscriptions.add(this.plausifehlerSandbox.PlausifehlersData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport)) {
                this.dataExportAllGridTop = dataExport;
                if (dataExport.length > 0) {
                    this.selectedKeys = [dataExport[0].baPersonID];
                }
            }
        }));
    }
    //#endregion
    //#region "common functions"
    toolBarOnItemClickTopGrd(e) {
        switch (e) {
            case CommonConstant.ButtonExportExcel: {
                this.gridplausifehler.instance.option(
                    {
                        export: {
                          fileName: this.translateService.instant('plausifehler.TitleHeader'),
                          excelFilterEnabled: true,
                          customizeExcelCell: CustomizeExcelCell,
                        }
                      });
                this.gridplausifehler.instance.exportToExcel(false);
                document.getElementById('excelExportId').blur();
                return;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                document.getElementById('gridDruckenId').blur();
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridplausifehler.instance.showColumnChooser();
                document.getElementById('spaltenauswahlId').blur();
                return;
            }
            default:
                break;
        }
        this.gridFunction.model[e] = !this.gridFunction.model[e];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
        }
    }
    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
            // TODO: print PDF
        }
    }
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification() {
        return this.isReadOnly;
    }
    onContentReady(e) {
        this.rowSelectedIndex = e.component.getSelectedRowKeys()[0];
        this.total = e.component.totalCount();
    }
    onRowClick(e) {
        this.dataPlausifehler = e.data;
        this.rowSelectedIndex = e.component.getSelectedRowKeys()[0];
    }
    onClick(e, rowValue) {
        this.popover.popupPosition = { of: e.element };
        this.popover.showPopup([], rowValue.data.baPersonID);
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
            // scroll
            e.component.getScrollable().scrollToElement(e.component.getRowElement(index));
        }
        e.event.stopPropagation();
    }
    getFilterColumns() {
        const columnCount = this.gridplausifehler.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridplausifehler.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridplausifehler.instance.columnOption(i));
            }
        }
    }
    onContextMenuPreparing(e) {
        this.gridFunction.menuGrouping(e, this.expand, this.gridplausifehler, CommonConstant.MenuGroupingHeaderGrid);
    }
    //#endregion
    //#region "utility functions"
    hideHeader(option: any) {
        const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
        header[0].style.display = option ? 'none' : 'block';
    }
    //#endregion
}
