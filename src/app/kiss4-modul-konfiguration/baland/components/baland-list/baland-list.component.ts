import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Baland } from '@app/kiss4-modul-konfiguration/baland/models';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-baland-list',
    templateUrl: './baland-list.component.html',
    styleUrls: ['./baland-list.component.scss']
})
@SetClassRight('CtlBaland')
export class BalandListComponent {

    @Input() dataSource: Baland[];
    @Input() rowSelectedIndex: number;
    @Input() expand: any;

    @ViewChild('gridBaland') gridBaland: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

    @Output() selectData = new EventEmitter<Baland>();

    dataBalandDetail = new Baland();
    filterColumns: Array<any> = [];
    filterAvs: any;
    selectedKey: number;
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    gridFunctionKey = this.translateService.instant('Baland.gridSetting');
    formatDate = CommonConstant.FORMAT_DATE;

    constructor(private translateService: TranslateService) { }

    // #region component CRUD functions
    onRowPrepared(event) {
        if (!isNullOrUndefined(event.data) && event.data.bfsDelivered) {
            event.rowElement.style.backgroundColor = '#ff0000';
        }
    }

    onContextMenuPreparing(event) {
        this.gridFunction.menuGrouping(event, this.expand, this.gridBaland, CommonConstant.MenuGroupingHeaderGrid);
    }

    onChangeGridSetting() {
        this.gridFunctionModel = this.gridFunction.model;
    }

    onFocusedRowChanged(event) {
        this.selectData.emit(event.row.data);
        this.rowSelectedIndex = event.row.data.baLandID;
    }

    setSelectedKeys(selectedKey: number) {
        this.selectedKey = selectedKey;
        this.rowSelectedIndex = selectedKey;
    }

    exportExcel() {
        this.gridBaland.instance.exportToExcel(false);
    }

    showColumnChooser() {
        this.gridBaland.instance.showColumnChooser();
    }
    // #endregion

    // #region utility functions
    customizeExportData(columns, rows) {
        const systemCols = [];
        columns.forEach((item, index) => {
            if (index > 0) {
                if (item.dataType === 'boolean') {
                    systemCols.push(index);
                }
            }
        });
        rows.forEach(row => {
            const rowValues = row.values;
            systemCols.forEach(systemCol => {
                rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
            });
        });
    }

    getFilterColumns() {
        const columnCount = this.gridBaland.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridBaland.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridBaland.instance.columnOption(i));
            }
        }
    }

    updateGridSetting(item) {
        this.gridFunctionModel[item] = !this.gridFunctionModel[item];
        if (this.gridFunctionModel.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunctionModel);
        }
    }
    // #endregion

}
