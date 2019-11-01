import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { CustomizeExcelCell } from '@shared/utilites';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { DataGridActionService } from '@app/kiss4-sozialhilfe/personen-im-haushalt/data-grid-action.service';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kiss-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, OnDestroy {

  constructor(
    private dataGridActionService: DataGridActionService,
    private translateService: TranslateService,
  ) { }

  @Input() title = '';
  @Input() type: 'KlientenSystem' | 'Haushalt' = 'KlientenSystem';
  @Input() clientList: any[];
  @Input() enable = false;

  @Output() rowSelection = new EventEmitter<any[]>();
  @Output() rowDataChange = new EventEmitter();
  @Output() doubleClickRow = new EventEmitter();

  @ViewChild('dataGrid') dataGrid;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('printer') printer: PrinterComponent;
  filter: any;
  gridFunctionKey = 'PersonenImHaushalt' + this.type;
  filterColumnsTop: Array<any> = [];
  private rightClickColumnHeaderIndex = 0;
  private subscription: Subscription;

  ngOnInit() {
    this.setGridKeytoLocalstorge();
    if (this.type === 'KlientenSystem') {
      this.subscription = this.dataGridActionService.leftGrid_Action$.subscribe(action => {
        this.handleAction(action);
      });
    }
    if (this.type === 'Haushalt') {
      this.subscription = this.dataGridActionService.rightGrid_Action$.subscribe(action => {
        this.handleAction(action);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  onSelectRow(ev) {
    this.rowSelection.next(ev.selectedRowKeys);
  }

  onDoubleClickRow($event) {
    const component = $event.component,
      prevClickTime = component.lastClickTime;
    component.lastClickTime = new Date();
    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      this.doubleClickRow.next($event.key);
    }
  }


  onContextMenuPreparing(event) {
    if (!isNullOrUndefined(event.items)) {
      switch (event.target) {
        case 'header':
          if (event.items.length > 3) {
            event.items.splice(3, event.items.length - 3);
          }
          event.items.push({ disabled: false, onItemClick: () => this.groupingHeaderRightClick(event.column.caption), text: 'Nach dieser Spalte gruppieren', beginGroup: true });
          event.items.push({ disabled: false, onItemClick: () => this.unAllGroupingHeaderRightClick(), text: 'Alle Gruppierung entfernen' });
          event.items.push({ disabled: false, onItemClick: () => this.hideColumn(event.column.caption), text: 'Spalte ausblenden' });
          break;
        case 'content':
          event.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: 'Alles Gruppen erweitern' });
          event.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: 'Alles Gruppen reduzieren' });
          break;
        default:
          break;
      }
    }
  }

  focusTopRowInGrid(event) {
    if (this.type === 'KlientenSystem') {
      this.dataGrid.instance.selectRowsByIndexes([0]);
    }
  }

  customizeExportData(columns, rows) {
    const systemCols = [];
    columns.forEach((item, index) => {
      if (index === 0 && item.dataType === 'boolean') {
        systemCols.push(index);
      }
    });
    rows.forEach(row => {
      const rowValues = row.values;
      systemCols.forEach(systemCol => {
        rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
      });
    });
  }

  rowUpdate(event) {
    this.rowDataChange.next(Object.assign(event.oldData, event.newData));
  }

  private groupingHeaderRightClick(event) {
    this.dataGrid.instance.columnOption(event, 'groupIndex', 0);
  }

  private hideColumn(event) {
    this.dataGrid.instance.columnOption(event, 'visible', false);
  }

  private unAllGroupingHeaderRightClick() {
    this.dataGrid.instance.clearGrouping();
  }

  private expandCloumnGrouping() {
    this.expandGrid.autoExpandAll = true;
  }

  private unExpandCloumnGrouping() {
    this.expandGrid.autoExpandAll = false;
  }

  private setGridKeytoLocalstorge() {
    this.gridFunction.model = new GridSettingModel();
    localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunction.model));
  }

  private handleAction(action: string) {
    if (action) {
      switch (action) {
        case 'exportExcel': {
          this.dataGrid.instance.option({
            export: {
              fileName: 'personenImHaushalt',
              excelFilterEnabled: true,
              customizeExcelCell: CustomizeExcelCell,
            }
          });
          this.dataGrid.instance.exportToExcel(false);
          return;
        }
        case 'printPdf': {
          this.printPdf();
          return;
        }
        case 'chooserColumn': {
          this.dataGrid.instance.showColumnChooser();
          document.getElementById('spaltenauswahlId').blur();
          return;
        }
        case 'UpArrowKey': {
          this.setRowSelection(-1);
          return;
        }
        case 'DownArrowKey': {
          this.setRowSelection(1);
          return;
        }
        case 'OpenContextMenu': {
          this.openContextMenu(this.rightClickColumnHeaderIndex, 'contextmenu');
          return;
        }
        case 'OpenColumnFiter': {
          this.openContextMenu(this.rightClickColumnHeaderIndex, 'click');
          return;
        }
      }

      if (this.gridFunction.model.hasOwnProperty(action)) {
        this.gridFunction.model[action] = !this.gridFunction.model[action];
        if (this.gridFunction.model.autoSaveSetting) {
          this.gridFunction.updateSetting(this.gridFunction.model);
        }
      }
    }
  }

  private printPdf() {
    if (this.clientList) {
      let fieldsToExport: any[] = [
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.Name'),
          dataField: 'nameVorname'
        },
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.DateOfBirth'),
          dataField: 'geburtsdatum'
        },
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.Alter'),
          dataField: 'alter'
        },
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.Beziehung'),
          dataField: 'beziehung'
        }
      ];
      if (this.type === 'Haushalt') {
        fieldsToExport = [
          ...[{
            caption: this.translateService.instant('PersonenImHaushalt.ClientList.Check'),
            dataField: 'istUnterstuetzt',
            type: 'checkbox'
          }],
          ...fieldsToExport
        ];
      }
      const gridDataSource = this.dataGrid.instance.getDataSource();
      this.printer.setData(gridDataSource._items, null, fieldsToExport);
    }
  }

  private setRowSelection(direction: number) {
    const selectedRowKey = this.dataGrid.instance.getSelectedRowKeys()[0];
    let selectedRowIndex = this.dataGrid.instance.getRowIndexByKey(selectedRowKey);
    if (selectedRowIndex > -1) {
      selectedRowIndex += direction;
    }
    if (selectedRowIndex < 0) {
      selectedRowIndex = 0;
    }
    this.dataGrid.instance.selectRows([this.dataGrid.instance.getKeyByRowIndex(selectedRowIndex)], false);
  }

  /**
  * Create function for Right Click on Grid's Column Header
  */
  private openContextMenu(index: number, type: 'contextmenu' | 'click') {
    const elements: HTMLCollection = this.dataGrid.element.nativeElement.getElementsByClassName('dx-header-filter');
    const element = elements[index];
    if (index < elements.length - 1) {
      this.rightClickColumnHeaderIndex++;
    } else {
      this.rightClickColumnHeaderIndex = 0;
    }
    if (document.createEvent) {
      const events = new MouseEvent(type, {
        bubbles: true,
        clientX: this.getOffset(element).left,
        clientY: this.getOffset(element).top
      });
      element.dispatchEvent(events);
      return;
    }
  }

  private getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + el.offsetWidth / 2 + window.scrollX,
      top: rect.top + el.offsetHeight / 2 + window.scrollY
    };
  }
}
