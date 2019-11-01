import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { GridSettingModel } from 'shared/models/shared/grid-setting.model';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-basis-textmarken-grid',
    templateUrl: './basis-textmarken-grid.component.html',
    styleUrls: ['./basis-textmarken-grid.component.scss']
})
export class BasisTextmarkenGridComponent implements OnChanges {
    @ViewChild('gridBasisTextmarken') gridTextMarken: DxDataGridComponent;
    @Input() textmarkenData: any;
    @Input() selectedKeys: any;
    @Input() dataDetailObject: any;
    @Input() isDisable: boolean;
    @Output() dataDetail: EventEmitter<any> = new EventEmitter();
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    bookmarkName: any;
    rowIndex: 0;
    filter: any;

    ngOnChanges(event) {
        if (!isNullOrUndefined(event.selectedKeys) && !isNullOrUndefined(event.selectedKeys.currentValue)) {
            this.rowIndex = event.selectedKeys.currentValue.id;
        }
    }

    onClickRowGrid(event) {
        if (!isNullOrUndefined(event)) {
            this.dataDetail.emit(event.data);
        }
    }

    onFocusedRowChanged(event) {
        if (!isNullOrUndefined(this.selectedKeys)) {
            if (!isNullOrUndefined(event.row)) {
                this.dataDetail.emit(event.row.data);
                this.selectedKeys = [event.row.data.id];
            }
        }
    }
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
}
