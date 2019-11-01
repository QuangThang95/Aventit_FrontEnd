import {Subscription} from 'rxjs';
import {Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy} from '@angular/core';
import {PrinterComponent} from '@shared/components/printer/printer.component';
import {TranslateService} from '@ngx-translate/core';
import {CustomizeExcelCell} from '@shared/utilites';
import {isNullOrUndefined, log} from 'util';
import {SozialhilfeConstant} from '@shared/common/sozialhilfe.common';
import {GridFunctionComponent} from '@shared/components/grid-function/grid-function.component';
import {GridSettingModel} from '@shared/models/shared/grid-setting.model';

@Component({
  selector: 'kiss-zulagen-efb-list',
  templateUrl: './zulagen-efb-list.component.html',
  styleUrls: ['./zulagen-efb-list.component.scss']
})
export class ZulagenEfbListComponent implements OnInit, OnDestroy {

  constructor(private translateService: TranslateService) {
  }
  gridFunctionKey = 'gridZulagen';

  //#region 'Declare decorator'
  @ViewChild('dataGrid') dataGrid;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('printer') printer: PrinterComponent;
  //#endregion

  //#region "Declare variables input and out put"
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Input() zulageList: any[] = [];
  //#endregion

  //#region "Declare variables global"
  filter: any;
  gridFunctionModel: GridSettingModel = new GridSettingModel();

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onSelectRow() {
  }

  //#region on grid
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
  // end region

//#region 'Toolbar functions'
  toolBarOnItemClick(event: string) {
    switch (event) {
      case SozialhilfeConstant.LIST_EXPORTEXCEL: {
        this.dataGrid.instance.option({
          export: {
            fileName: 'zulagen-ebf',
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
      case 'printPdf': {
        this.printPdf();
        document.getElementById('gridDruckenId').blur();
        return;
      }
      default:
        this.gridFunction.model[event] = !this.gridFunction.model[event];
        if (this.gridFunction.model.autoSaveSetting) {
          this.gridFunction.updateSetting(this.gridFunction.model);
        }
        break;
    }
  }


  private printPdf() {
    const fieldsToExport: any[] = [
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.GultigAb'),
        dataField: 'gultigab'
      },
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.Name'),
        dataField: 'name'
      },
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.Geburtsdatum'),
        dataField: 'geburtsdatum'
      },
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.Zulage'),
        dataField: 'zulage'
      },
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.Percent'),
        dataField: 'percent'
      },
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.Betrag'),
        dataField: 'betrag'
      },
      {
        caption: this.translateService.instant('ZulagenEfb.ClientList.Bemerkung'),
        dataField: 'bemerkung'
      }
    ];
    const gridDataSource = this.dataGrid.instance.getDataSource();
    this.printer.setData(gridDataSource._items, null, fieldsToExport);
  }
}
