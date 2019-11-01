import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { VorlagenKontextConstant } from '../../constant';
import { isNullOrUndefined } from 'util';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kiss-vorlagen-kontext-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})

export class DataListComponent {
    @Input() data: any;
    @Input() selectedRowKeys: any;
    @Input() isViewDetail: any;
    @Input() keyExpr: any;
    @Input() listCol: any;

    @Output() rowClick: EventEmitter<any> = new EventEmitter();
    @Output() cellClick: EventEmitter<any> = new EventEmitter();
    @Output() contentReady: EventEmitter<any> = new EventEmitter();
    @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
    @Output() focusedRowChanged: EventEmitter<any> = new EventEmitter();

    @ViewChild('gridvorlagenkontext') gridKontextComponent: DxDataGridComponent;
    @ViewChild('expand') expand: any;

    filter: any;
    currentlist: any;
    initList: any;
    gridFunctionModelKontext: GridSettingModel = new GridSettingModel();

    constructor(
        public translateService: TranslateService,
    ) { }

    handleEventNav(eventNav) {
        switch (eventNav) {
            case VorlagenKontextConstant.eventNavPrint: {
                // feature function
                return;
            }
            case VorlagenKontextConstant.eventNavColChooser: {
                this.gridKontextComponent.instance.showColumnChooser();
                return;
            }
            case VorlagenKontextConstant.eventNavExportExcel: {
                this.gridKontextComponent.instance.exportToExcel(false);
                return;
            }
        }
        this.gridFunctionModelKontext[eventNav] = !this.gridFunctionModelKontext[eventNav];
    }

    onContentReady(e) {
        e.component.option('loadPanel.enabled', false);
        this.contentReady.emit(e);
    }

    onContextMenuPreparing(args: any) {
        let colCount = this.gridKontextComponent.instance.getVisibleColumns().length;
        for (let i = 0; i < this.gridKontextComponent.instance.columnCount(); i++) {
            if (this.gridKontextComponent.instance.columnOption(i, 'groupIndex') > -1) {
                colCount--;
            }
        }
        if (args.target === 'header') {
            if (args.items && args.items.length > 1) {
                args.items.push(
                    {
                        disabled: false,
                        icon: '',
                        onItemClick: colCount === 1 ? undefined : this.onRemoverColumn.bind(this, args.column.dataField),
                        text: this.translateService.instant('DemografieHistory.Grid.HideColumn'),
                        value: 'none'
                    });
                if (colCount === 1) {
                    for (let index = 0; index < args.items.length; index++) {
                        const element = args.items[index];
                        if (element.value === 'group') {
                            element.onItemClick = () => {
                                return true;
                            };
                            break;
                        }
                    }
                }
            }
        }
        if (args.target === 'content') {
            args.items.push({ disabled: false, onItemClick: this.expandCloumnGrouping.bind(this), text: this.translateService.instant('DemografieHistory.Grid.ExpandAllGroups') });
            args.items.push({ disabled: false, onItemClick: this.unExpandCloumnGrouping.bind(this), text: this.translateService.instant('DemografieHistory.Grid.ReduceAllGroups') });
        }
    }

    onRemoverColumn(e) {
        if (this.gridKontextComponent.instance.getVisibleColumns().length === 1) {
            return false;
        }
        this.gridKontextComponent.instance.columnOption(e, 'visible', false);
        setTimeout(() => {
            this.gridKontextComponent.instance.refresh();
            this.gridKontextComponent.instance.repaint();
        });
    }

    private expandCloumnGrouping = () => {
        this.expand.autoExpandAll = true;
    }

    private unExpandCloumnGrouping = () => {
        this.expand.autoExpandAll = false;
    }

    onSelectionChangedGrid(event) {
        this.selectionChanged.emit(event.selectedRowsData[0]);
    }

    onFocusedRowChanged(event) {
        if (!isNullOrUndefined(event.row)) {
            this.gridKontextComponent.instance.selectRowsByIndexes([event.rowIndex]);
            this.focusedRowChanged.emit(event);
        }
    }

}
