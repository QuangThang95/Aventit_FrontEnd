import {
    AfterViewInit,
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Subscription } from 'rxjs/Subscription';
import { AppEnums } from 'shared/AppEnum';
import { SetClassRight } from 'shared/authorize/authorize.decorators';
import { FragenkatalogConstant } from 'shared/common/sostat.common';
import { BaseComponent } from 'shared/components/base.component';
import { GridFunctionComponent } from 'shared/components/grid-function/grid-function.component';
import { GridSettingModel } from 'shared/models/shared/grid-setting.model';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-inkassofall-list',
    templateUrl: './inkassofall-list.component.html',
    styleUrls: ['./inkassofall-list.component.scss']
})
@SetClassRight('Inkassofall')
export class InkassofallListComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    //#region 'Declare decorator'
    @ViewChild('gridInkassofall') gridInkassofall: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expand') expand: any;
    //#endregion

    //#region "Declare variables input and out put"
    @Output() rowSelected: EventEmitter<any> = new EventEmitter();
    @Input() rowSelectedGrid: any;
    @Input() isDisableViewModel: boolean;
    @Input() inkassofallsInput: any;
    @Input() dataInitDropDraw: any;
    @Input() objectDeleteSuccess: any;
    //#endregion

    //#region "Declare variables global"
    inkassofalls: any = null;
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    optionNameExport = 'export.fileName';
    optionInkassofallValue = 'Inkassofall';
    filterColumns: Array<any> = [];
    filter: any;
    gridFunctionKey = 'gridSetting';
    rightClickColumnHeaderIndex = 0;
    clickColumnFilterIndex = 0;
    isViewMode = true;
    readonly objectDataGridEmpty = { BFSFrageID: -1, UpdateOK: false, Editierbar: false, BFSLeistungsfilterCodes: '' };
    //#endregion

    //#region "Declare variables subscription"
    private subscription = new Subscription();
    //#endregion

    //#region 'Component life cycle functions'
    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getFilterColumns();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.inkassofallsInput) && !isNullOrUndefined(changes.inkassofallsInput.currentValue)) {
            this.handleDataList(changes.inkassofallsInput.currentValue);
        }
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }
    /**
   *  unregister subscription on destroy component
   */
    private unregisterEvents() {
        this.subscription.unsubscribe();
    }
    //#endregion

    //#region 'Communication throw SanBox'
    loadDataDetail(objectDetail) {
        this.rowSelected.emit({ ...objectDetail });
    }
    //#endregion

    //#region 'Component CRUD functions'
    addNewRowEmpty(e) {
        this.inkassofalls.push(e);
        setTimeout(() => {
            const scrollable = this.gridInkassofall.instance.getScrollable();
            if (scrollable != null) {
                scrollable.scrollTo(scrollable.scrollHeight());
            }

            this.gridInkassofall.instance.selectRows([this.gridInkassofall.dataSource[this.inkassofalls.length - 1].BFSFrageID], false);
            this.gridInkassofall.disabled = true;
        }, 300);
        this.isViewMode = false;
    }

    deleteNewRowEmpty() {
        this.inkassofalls.splice(this.inkassofalls.length - 1, 1);
        setTimeout(() => {
            const scrollable = this.gridInkassofall.instance.getScrollable();
            if (scrollable != null) {
                scrollable.scrollTo(scrollable.scrollHeight());
            }
            const dataOnView = this.gridInkassofall.instance.getDataSource();
            if (dataOnView['_items'].length) {
                this.gridInkassofall.instance.selectRows([dataOnView['_items'][dataOnView['_items'].length - 1].BFSFrageID], false);
            }
            this.loadDataDetail(dataOnView['_items'][dataOnView['_items'].length - 1]);
        }, 300);
    }
    // #endregion

    //#region 'Business functions'
    toolBarOnItemClick(e, printer) {
        switch (e) {
            case FragenkatalogConstant.LIST_EXPORTEXCEL: {
                this.gridInkassofall.instance.option(this.optionNameExport, this.optionInkassofallValue);
                this.gridInkassofall.instance.exportToExcel(false);
                return;
            }
            case FragenkatalogConstant.LIST_CHOOSERCOLUMN: {
                this.gridInkassofall.instance.showColumnChooser();
                return;
            }
        }
        this.gridFunctionModel[e] = !this.gridFunctionModel[e];
        if (this.gridFunctionModel.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunctionModel);
        }
    }

    onRowClick(e) {
        this.gridInkassofall.selectedRowKeys = [e.key];
        this.loadDataDetail(e.data);
    }

    /**
     * Functions handle event for right click header
     * @param {number} index header index
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
     * Functions handle event for right column filter
     * @param {number} index column filter index
     */
    clickColumnFilter(index: number) {
        const elements = document.getElementsByClassName('dx-header-filter');
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

    onContentReady(e) {
        if (this.isViewMode) {
            const dataSource = e.component.getDataSource();
            if (dataSource) {
                if (dataSource.items().length === 0) {
                    this.loadDataDetail(this.objectDataGridEmpty);
                } else {
                    if (e.component.getSelectedRowsData()[0]) {
                        this.loadDataDetail({ ...e.component.getSelectedRowsData()[0] });
                    }
                }
            }
        }
        this.isViewMode = true;
    }

    handleDataList(inkassofalls) {
        this.inkassofalls = inkassofalls;
        if (inkassofalls.length > 0) {
            let isFindIndex = -1;
            if (!isNullOrUndefined(this.rowSelectedGrid)) {
                isFindIndex = inkassofalls.findIndex(x => x.BFSFrageID === this.rowSelectedGrid.bfsfrageId);
            }
            const rowIndex = isNullOrUndefined(this.rowSelectedGrid) || (isFindIndex === -1) ? 0 : isFindIndex;
            const selectRowKey = inkassofalls[rowIndex];
            if (!isNullOrUndefined(selectRowKey)) {
                this.gridInkassofall.selectedRowKeys = [selectRowKey.BFSFrageID];
                this.loadDataDetail(selectRowKey);
            }
        } else {
            this.gridInkassofall.instance.deselectAll();
            this.loadDataDetail(this.objectDataGridEmpty);
        }
    }
    // #endregion

    //#region 'Utility functions'
    getFilterColumns() {
        const columnCount = this.gridInkassofall.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridInkassofall.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridInkassofall.instance.columnOption(i));
            }
        }
    }
    /**
     * Functions get offset of the element
     * @param {Element} el element to calculate offset
     * @return {Object} return left and top offset
     */
    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + el.offsetWidth / 2 + window.scrollX,
            top: rect.top + el.offsetHeight / 2 + window.scrollY
        };
    }

    disableList(e) {
        this.gridInkassofall.disabled = !e;
        this.isViewMode = false;
    }
    // #endregion
}
