import 'devextreme-intl';
import { Component, OnChanges, SimpleChanges, OnInit, OnDestroy, AfterViewInit, Injector, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';
import { CustomizeExcelCell } from '@shared/utilites';
import { AppEnums } from '@shared/AppEnum';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { GridFunctionComponent } from 'shared/components/grid-function/grid-function.component';
import { BgSilAHVBeitrag, PersonenUnterstuetzt, SqlQueryShPositionTyp, AHVBeitragPosition, InstitutionSuchenWh, LookUps, IDropDownAnpassung } from '../../models';
import { GridSettingModel } from 'shared/models/shared/grid-setting.model';
import { PrinterComponent } from '@shared/components/printer/printer.component';

@Component({
  selector: 'kiss-ahv-beitrage-list',
  templateUrl: './ahv-beitrage-list-component.html',
  styleUrls: ['./ahv-beitrage-list-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormListComponent  extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges  {
  @ViewChild('gridAhvBeitrage') gridAhvBeitrage: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expand') expand: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('expandGrid') expandGrid: any;

  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() keyDown: EventEmitter<any> = new EventEmitter();
  @Input() selectedRowKeyEmit: any;
  @Input() isDisableViewModel: boolean;
  @Input() disabledGridInput: boolean;
  @Input() dataGrid: any;
  @Input() dataInitDropDraw: any;
  @Input() listPersonenUnterstuetztEmit: any;
  @Input() listSqlQueryShPositionTypEmit: any;
  @Input() objectDeleteSuccess: any;
  @Input() disabledGrid: boolean;
  @Input() isFillter: boolean;

  listAHVBeitragPosition: any;
  listPersonenUnterstuetzt: any;
  baPersonIDLookup: PersonenUnterstuetzt[] = [];
  listSqlQueryShPositionTyp: SqlQueryShPositionTyp[] = [];
  selectedRowKey: any;
  filter: any;
  gridFunctionKey = 'gridSetting';

  statusContainer = {
    isAddNew: false,
    isEdited: false,
    isReadOnly: false,
    isBetrageAnpassen: false,
    isBetrageAnpassenAddNew: false,
    isBtnBAnpassen: false,
    iscConcurrency: false,
    isDelete: false,
    dataSize: 0,
  };

  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox, private datePipe: DatePipe, public router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.dataGrid) && !isNullOrUndefined(changes.dataGrid.currentValue)) {
      this.handleDataList(changes.dataGrid.currentValue);
    }
    if (!isNullOrUndefined(changes.listPersonenUnterstuetztEmit) && !isNullOrUndefined(changes.listPersonenUnterstuetztEmit.currentValue)) {
      this.listPersonenUnterstuetzt = changes.listPersonenUnterstuetztEmit.currentValue;
      this.baPersonIDLookup = this.listPersonenUnterstuetzt.filter(d => d.baPersonID);
    }
    if (!isNullOrUndefined(changes.listSqlQueryShPositionTypEmit) && !isNullOrUndefined(changes.listSqlQueryShPositionTypEmit.currentValue)) {
      this.listSqlQueryShPositionTyp = changes.listSqlQueryShPositionTypEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.selectedRowKeyEmit) && !isNullOrUndefined(changes.selectedRowKeyEmit.currentValue)) {
      this.selectedRowKey = changes.selectedRowKeyEmit.currentValue;
      this.scrollToIndex(this.selectedRowKey);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
  }

  toolBarTopOnItemClick(event) {
    switch (event) {
      case CommonConstant.ButtonExportExcel: {
        this.gridAhvBeitrage.instance.option({
          export: {
            fileName: 'ahv-beitrage',
            excelFilterEnabled: true,
            customizeExcelCell: CustomizeExcelCell,
          }
        });
        this.gridAhvBeitrage.instance.exportToExcel(false);
        document.getElementById('excelExportId').blur();
        return;
      }
      case CommonConstant.ButtonPrintPdf: {
        this.printPdf('i011_ahv-beitrage_grid-ahv-beitrage');
        document.getElementById('gridDruckenId').blur();
        return;
      }
      case CommonConstant.ButtonColumnChooser: {
        this.gridAhvBeitrage.instance.showColumnChooser();
        document.getElementById('spaltenauswahlId').blur();
        return;
      }
    }
    this.gridFunction.model[event] = !this.gridFunction.model[
      event
    ];
    if (this.gridFunction.model.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunction.model);
    }
  }

  scrollToIndex(selectedRowKey) {
    setTimeout(() => {
      const index = this.gridAhvBeitrage.instance.getRowIndexByKey(selectedRowKey[0]);
      const row = this.gridAhvBeitrage.instance.getRowElement(index);
      this.gridAhvBeitrage.instance.getScrollable().scrollToElement(row);
    }, 300);
  }

  onContextMenuPreparing(e: any) {
    if (!isNullOrUndefined(e.items)) {
      switch (e.target) {
        case 'header':
          if (e.items.length > 3) {
            e.items.splice(3, e.items.length - 3);
          }
          e.items.push({ disabled: false, onItemClick: () => this.groupingHeaderRightClick(e.column.caption), text: 'Nach dieser Spalte gruppieren', beginGroup: true });
          e.items.push({ disabled: false, onItemClick: () => this.unAllGroupingHeaderRightClick(), text: 'Alle Gruppierung entfernen' });
          e.items.push({ disabled: false, onItemClick: () => this.hideColumn(e.column.caption), text: 'Spalte ausblenden' });
          break;
        case 'content':
          e.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: 'Alles Gruppen erweitern' });
          e.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: 'Alles Gruppen reduzieren' });
          break;
        default:
          break;
      }
    }
  }

  groupingHeaderRightClick(e) {
    this.gridAhvBeitrage.instance.columnOption(e, 'groupIndex', 0);
  }

  unAllGroupingHeaderRightClick() {
    this.gridAhvBeitrage.instance.clearGrouping();
  }

  hideColumn(e) {
    this.gridAhvBeitrage.instance.columnOption(e, 'visible', false);
  }

  expandCloumnGrouping() {
    this.expandGrid.autoExpandAll = true;
  }

  unExpandCloumnGrouping() {
    this.expandGrid.autoExpandAll = false;
  }

  scrollToElement() {
    setTimeout(() => {
      const scrollable = this.gridAhvBeitrage.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollTo(scrollable.scrollHeight());
      }
    }, 300);
  }

  printPdf(elementId: string) {
    const gridDataSource = this.gridAhvBeitrage.instance.getDataSource();
    this.printer.setData(gridDataSource['_items'], false, [
      {
        caption: 'Gültig ab',
        dataField: 'datumVon'
      },
      {
        caption: 'Name',
        dataField: 'baPersonID'
      },
      {
        caption: 'Pers.-Nr',
        dataField: 'baPersonID'
      },
      {
        caption: 'Geburtsdatum',
        dataField: 'geburtsdatum'
      },
      {
        caption: 'Leistungsart',
        dataField: 'bgPositionsartID'
      },
      {
        caption: 'Betrag',
        dataField: 'betrag'
      },
      {
        caption: 'Institution',
        dataField: 'institutionName'
      },
      {
        caption: 'Bew. Status',
        dataField: 'bgBewilligungStatusCode'
      }
    ]);
  }

  handleDataList(listAHVBeitragPosition) {
    this.listAHVBeitragPosition = listAHVBeitragPosition;
  }

  onClickRowGrid(e) {
    this.gridAhvBeitrage.selectedRowKeys = [e.key];
    this.loadDataDetail(e.data);
  }

  loadDataDetail(objectDetail) {
    this.rowSelected.emit({ ...objectDetail });
  }

  onKeyDown(e) {
    if (!isNullOrUndefined(e.component.getSelectedRowKeys)) {
      const data = e.component.getSelectedRowKeys();
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
      const indexKey = e.component.getKeyByRowIndex(index);
      let dataObj = null;
      e.component.byKey(indexKey).done(function (dataObject) {
        dataObj = dataObject;
      });
      this.selectedRowKey = [dataObj.bgPositionID];
      this.loadDataDetail(dataObj);
      e.component.getScrollable().scrollToElement(e.component.getRowElement(index));
      e.event.stopPropagation();
    }
    this.keyDown.emit(e.event);
  }
  ngOnDestroy() {
  }
}


