import { Component, EventEmitter, Injector, Input, Output, ViewChild, HostListener, SimpleChanges, OnChanges } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { Kontakt } from '@app/kiss4-basis/berater/models/kontakt.models';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { BeraterAllConstant } from '@app/kiss4-basis/berater/berater.constant';

@Component({
    selector: 'kiss-berater-list',
    templateUrl: './berater-list.component.html',
    styleUrls: ['./berater-list.component.scss'],
})

export class BeraterFormListComponent extends BaseComponent implements OnChanges {
    @ViewChild('gridBerater') gridBerater: DxDataGridComponent;
    @ViewChild('gridOption') gridOption: any;
    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('expand') expand: any;
    @Output() rowSelected: EventEmitter<any> = new EventEmitter();
    @Input() beraterData: any;
    @Input() listLanguage: any;
    @Input() isReadOnly: boolean;
    @Input() selectedKeys: any;
    @Input() isAddNew: boolean;
    titlePage = this.translateService.instant('ExterneBerater.TitlePage');
    filter: any;
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    gridFunctionKey = 'gridBeraterSetting';
    formData: Kontakt = new Kontakt();
    textSprache: string;
    flag = true;

    constructor(injector: Injector, public translateService: TranslateService) {
        super(injector);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.isAddNew) && !isNullOrUndefined(changes.isAddNew.currentValue) && changes.isAddNew.currentValue) {
            this.onChangeStatus();
        }
    }

    onChangeStatus() {
        const newData = { id: '', anrede: '', baInstitutionID: '', bemerkung: '', eMail: '', fax: '', name: '', sprachCode: null, telefon: '', vorname: '' };
        const results = this.beraterData;
        results.unshift(newData);
        this.beraterData = results;
        this.gridBerater.instance.refresh();
        this.gridBerater.instance.getScrollable().scrollTo(0);
        this.rowSelected.emit({ ...newData });
    }

    toolBarOnItemClick(e) {
        switch (e) {
            case 'exportExcel': {
                this.gridBerater.instance.exportToExcel(false);
                break;
            }
            case 'gridprint':
            case 'printPdf': {
                break;
            }
            case 'chooserColumn': {
                this.gridBerater.instance.showColumnChooser();
                return;
            }
        }
        this.gridFunctionModel[e] = !this.gridFunctionModel[e];
        if (this.gridFunctionModel.autoSaveSetting) {
            localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
        }
    }

    printPdf() {
        this.printer.setData(this.beraterData, false, [
            {
                caption: 'Institution',
                dataField: 'institution'
            },
            {
                caption: 'Name',
                dataField: 'name'
            },
            {
                caption: 'Vorname',
                dataField: 'vorname'
            },
            {
                caption: 'Telefon',
                dataField: 'telefon'
            },
            {
                caption: 'Email',
                dataField: 'eMail'
            },
        ]);
    }

    onContentReady($event) {
        const results: any = this.gridBerater.instance.getDataSource();
        const newData = { id: '', anrede: '', baInstitutionID: '', bemerkung: '', eMail: '', fax: '', name: '', sprachCode: null, telefon: '', vorname: '' };
        if (!isNullOrUndefined(results) && results._totalCount === 0) {
            this.rowSelected.emit(newData);
        }
    }

    onFocusedRowChanged($event) {
        this.formData = new Kontakt();
        if (!isNullOrUndefined($event.row)) {
            this.formData = $event.row.data;
            const resultFilter = this.listLanguage.filter(data => data.code === this.formData.sprachCode);
            if (resultFilter.length) {
                this.formData['textSprache'] = resultFilter[0].text;
            }
            this.rowSelected.emit({ ...this.formData });
        }
    }

    onContextMenuPreparing(args: any) {
        let colCount = this.gridBerater.instance.getVisibleColumns().length;
        for (let i = 0; i < this.gridBerater.instance.columnCount(); i++) {
            if (this.gridBerater.instance.columnOption(i, 'groupIndex') > -1) {
                colCount--;
            }
        }

        if (args.target === 'header') {
            if (args.items && args.items.length > 1) {
                args.items.push(
                    {
                        disabled: false,
                        icon: '',
                        onItemClick: colCount === 1 ? undefined : this.onClickHideCol.bind(this, args),
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
            args.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('DemografieHistory.Grid.ExpandAllGroups') });
            args.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('DemografieHistory.Grid.ReduceAllGroups') });
        }
    }

    private expandCloumnGrouping() {
        this.gridOption.autoExpandAll = true;
    }

    private unExpandCloumnGrouping() {
        this.gridOption.autoExpandAll = false;
    }

    onClickHideCol(args) {
        this.onRemoverColumn(args.column.dataField);
    }

    onRemoverColumn(e) {
        this.gridBerater.instance.columnOption(e, 'visible', false);
        setTimeout(() => {
            this.gridBerater.instance.refresh();
            this.gridBerater.instance.repaint();
        }, BeraterAllConstant.timeOut500);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // Ctrl + B
        if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
            event.preventDefault();
            return;
        }
    }
}
