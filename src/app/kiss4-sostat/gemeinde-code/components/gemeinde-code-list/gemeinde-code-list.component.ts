import 'devextreme-intl';

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostListener,
    Injector,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { GemeindeCode } from '@app/kiss4-sostat/gemeinde-code/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PopOverComponent } from '@shared/components/popover/popover.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxPopupComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { locale } from 'devextreme/localization';

@Component({
    selector: 'kiss-gemeinde-code-list',
    templateUrl: './gemeinde-code-list.component.html',
    styleUrls: ['./gemeinde-code-list.component.scss']
})
@SetClassRight('CtlQueryBFSGemeinde')
export class GemeindeCodeListComponent extends BaseComponent implements OnInit, AfterViewInit {

    @ViewChild('gridGemeindeCodeInstance') gridGemeindeCodeInstance: DxDataGridComponent;
    @ViewChild('gridpopup') gridpopup: DxPopupComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expand') expand: any;
    @ViewChild('popover') popover: PopOverComponent;
    @Input() dataGemeindeCodes: GemeindeCode[];
    //#region "Declare variables for grid component"
    optionExportValue = this.translateService.instant('GemeindeCode.Title');
    dataGemeindeCode = new GemeindeCode();
    totalRecords: any;
    filterAvs: any;
    selectedKeys = [];
    rightClickColumnHeaderIndex = 0;
    clickColumnFilterIndex = 0;
    rowSelectedIndex: number;
    isReadOnly = true;
    filterColumns: Array<any> = [];
    titleBenutzerdefiniert = this.translateService.instant('GemeindeCode.Message.titleBenutzerdefiniert');
    gridFunctionKey = this.translateService.instant('GemeindeCode.Message.gridSetting');
    //#endregion
    constructor(injector: Injector, public translateService: TranslateService) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }
    //#region component life cycle functions
    ngOnInit() { }

    ngAfterViewInit() {
        this.getFilterColumns();
    }

    //#endregion

    //#region common functions
    toolBarOnItemClickTopGrd(event, remainingMessage) {
        switch (event) {
            case CommonConstant.ButtonExportExcel: {
                this.gridGemeindeCodeInstance.instance.option({
                    export: {
                        fileName: this.optionExportValue,
                        excelFilterEnabled: true,
                        customizeExcelCell: UtilityHelper.CustomizeExcelCell,
                    }
                });
                this.gridGemeindeCodeInstance.instance.exportToExcel(false);
                return;
            }
            case CommonConstant.ButtonPrintPdf: {
                // to do we did not support this functions in package 2
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridGemeindeCodeInstance.instance.showColumnChooser();
                return;
            }
            case CommonConstant.ButtonGridSetting: {
                this.gridFunction.showPopup(this.gridFunction.model);
                return;
            }
            case CommonConstant.ButtonGridDelete: {
                remainingMessage.showMessage(this.translateService.instant('GemeindeCode.Message.MSG_002'));
                return;
            }
            default:
                break;
        }
        this.gridFunction.model[event] = !this.gridFunction.model[event];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
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
        const grid = document.getElementById('o009_bfs-gemeinde-code_grid-bfs-gemeinde-code');
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

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }

    hideHeader(option: any) {
        const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
        header[0].style.display = option ? 'none' : 'block';
    }

    onContentReady(event) {
        this.totalRecords = event.component.totalCount();
    }

    onRowClick(event) {
        this.dataGemeindeCode = event.data;
        this.rowSelectedIndex = event.component.getSelectedRowKeys()[0];
    }

    onKeyDown(event) {
        const data = event.component.getSelectedRowKeys();
        if (data.length) {
            const currentKey = data[0];
            let index = event.component.getRowIndexByKey(currentKey);
            if (event.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
                index--;
                if (index < 0) {
                    index++;
                }
            } else if (event.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
                index++;
                if (event.component.getKeyByRowIndex(index) == null) {
                    index--;
                }
            }
            event.component.selectRows([event.component.getKeyByRowIndex(index)], false);
            // row indicator
            this.rowSelectedIndex = event.component.getKeyByRowIndex(index);
            // detail object
            let dataObj = null;
            event.component.byKey(this.rowSelectedIndex).done(function (dataObject) {
                dataObj = dataObject;
            });
            this.dataGemeindeCode = dataObj;
            // scroll
            event.component.getScrollable().scrollToElement(event.component.getRowElement(index));
        }
        event.event.stopPropagation();
    }

    onClick(e) {
        this.popover.popupPosition = { of: e.element };
        this.popover.showPopup([]);
    }

    onContextMenuPreparing(event) {
        this.gridFunction.menuGrouping(event, this.expand, this.gridGemeindeCodeInstance, CommonConstant.MenuGroupingHeaderGrid);
    }
    //#endregion

    //#region utility functions
    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + el.offsetWidth / 2 + window.scrollX,
            top: rect.top + el.offsetHeight / 2 + window.scrollY
        };
    }
    getFilterColumns() {
        const columnCount = this.gridGemeindeCodeInstance.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridGemeindeCodeInstance.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridGemeindeCodeInstance.instance.columnOption(i));
            }
        }
    }

    setSelectedKeys(selectedKeys: number[]) {
        this.selectedKeys = selectedKeys;
    }
    //#endregion
}
