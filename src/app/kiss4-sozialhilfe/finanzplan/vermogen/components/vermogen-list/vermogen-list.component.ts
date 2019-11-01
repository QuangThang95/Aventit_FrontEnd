import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CustomizeExcelCell } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-vermogen-list',
  templateUrl: './vermogen-list.component.html',
  styleUrls: ['./vermogen-list.component.scss']
})
export class VermogenListComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() dataSource: any;
  @Input() disableGrid: any;
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('dataGrid') dataGrid;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

  constructor(injector: Injector, public translateService: TranslateService, ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }





  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onSelectRow(event) {
    this.rowSelected.emit(event.selectedRowsData[0]);
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

  private groupingHeaderRightClick(event) {
    this.dataGrid.instance.columnOption(event, 'groupIndex', 0);
  }

  private unAllGroupingHeaderRightClick() {
    this.dataGrid.instance.clearGrouping();
  }

  private hideColumn(event) {
    this.dataGrid.instance.columnOption(event, 'visible', false);
  }

  private expandCloumnGrouping() {
    this.expandGrid.autoExpandAll = true;
  }

  private unExpandCloumnGrouping() {
    this.expandGrid.autoExpandAll = false;
  }



  toolBarOnItemClick(event: string) {
    if (event) {
      switch (event) {
        case SozialhilfeConstant.LIST_EXPORTEXCEL: {
          this.dataGrid.instance.option({
            export: {
              fileName: 'vermogen',
              excelFilterEnabled: true,
              customizeExcelCell: CustomizeExcelCell,
            }
          });
          this.dataGrid.instance.exportToExcel(false);
          break;
        }
        case SozialhilfeConstant.LIST_CHOOSERCOLUMN: {
          this.dataGrid.instance.showColumnChooser();
          break;
        }
        case 'isGrouping': {
          break;
        }
        case 'printPdf': {
          this.printPdf();
          document.getElementById('gridDruckenId').blur();
          return;
        }
      }

      if (this.gridFunction.model.hasOwnProperty(event)) {
        this.gridFunction.model[event] = !this.gridFunction.model[event];
        if (this.gridFunction.model.autoSaveSetting) {
          this.gridFunction.updateSetting(this.gridFunction.model);
        }
      }
    }
  }

  private printPdf() {
    const fieldsToExport: any[] = [
      {
        caption: this.translateService.instant('Vermogen.Grid.GultigAb'),
        dataField: 'GultigAb'
      },
      {
        caption: this.translateService.instant('Vermogen.Grid.Name'),
        dataField: 'Name'
      },
      {
        caption: this.translateService.instant('Vermogen.Grid.Geburtsdatum'),
        dataField: 'Geburtsdatum'
      },
      {
        caption: this.translateService.instant('Vermogen.Grid.ArtDesVermogens'),
        dataField: 'ArtDesVermogens'
      },
      {
        caption: this.translateService.instant('Vermogen.Grid.Vermogen'),
        dataField: 'Vermogen'
      },
      {
        caption: this.translateService.instant('Vermogen.Grid.Verbrauch'),
        dataField: 'Verbrauch'
      }
    ];
    const gridDataSource = this.dataGrid.instance.getDataSource();
    this.printer.setData(gridDataSource._items, null, fieldsToExport);
  }
}
