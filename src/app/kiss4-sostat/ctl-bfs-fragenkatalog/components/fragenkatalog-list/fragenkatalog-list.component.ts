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
import { CustomizeExcelCell } from '@shared/utilites/utilityHelpers';


@Component({
  selector: 'kiss-fragenkatalog-list',
  templateUrl: './fragenkatalog-list.component.html',
  styleUrls: ['./fragenkatalog-list.component.scss']
})
@SetClassRight('CtlBfsFragenkatalog')
export class FormListComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  //#region 'Declare decorator'
  @ViewChild('gridCtlBfsFragenkatalog') gridCtlBfsFragenkatalog: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expand') expand: any;
  //#endregion

  //#region "Declare variables input and out put"
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Input() rowSelectedGrid: any;
  @Input() isDisableViewModel: boolean;
  @Input() ctlBfsFragenkatalogsInput: any;
  @Input() dataInitDropDraw: any;
  @Input() objectDeleteSuccess: any;
  //#endregion

  //#region "Declare variables global"
  ctlBfsFragenkatalogs: any = null;
  personTyps: any = null;
  suchens: any = null;
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  optionNameExport = 'export.fileName';
  optionCtlBfsFragenkatalogValue = 'CtlBfsFragenkatalog';
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
    if (!isNullOrUndefined(changes.ctlBfsFragenkatalogsInput) && !isNullOrUndefined(changes.ctlBfsFragenkatalogsInput.currentValue)) {
      this.handleDataList(changes.ctlBfsFragenkatalogsInput.currentValue);

    }
    if (!isNullOrUndefined(changes.dataInitDropDraw) && !isNullOrUndefined(changes.dataInitDropDraw.currentValue)) {
      this.handleDataDropDraw(changes.dataInitDropDraw.currentValue);
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
    // this.ctlBfsFragenkatalogSandbox.objectFromDetailCtlBfsFragenkatalog(objectDetail);
    this.rowSelected.emit({ ...objectDetail });
  }
  //#endregion

  //#region 'Component CRUD functions'
  addNewRowEmpty(e) {
    this.ctlBfsFragenkatalogs.push(e);
    setTimeout(() => {
      const scrollable = this.gridCtlBfsFragenkatalog.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollTo(scrollable.scrollHeight());
      }

      this.gridCtlBfsFragenkatalog.instance.selectRows([this.gridCtlBfsFragenkatalog.dataSource[this.ctlBfsFragenkatalogs.length - 1].BFSFrageID], false);
      this.gridCtlBfsFragenkatalog.disabled = true;
    }, 300);
    this.isViewMode = false;
  }

  deleteNewRowEmpty() {
    this.ctlBfsFragenkatalogs.splice(this.ctlBfsFragenkatalogs.length - 1, 1);
    setTimeout(() => {
      const scrollable = this.gridCtlBfsFragenkatalog.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollTo(scrollable.scrollHeight());
      }
      const dataOnView = this.gridCtlBfsFragenkatalog.instance.getDataSource();
      const lastRowOfDataOnView = dataOnView['_items'][dataOnView['_items'].length - 1];
      if (dataOnView['_items'].length) {
        this.gridCtlBfsFragenkatalog.instance.selectRows([lastRowOfDataOnView.BFSFrageID], false);
      }
      this.loadDataDetail(lastRowOfDataOnView || this.objectDataGridEmpty);
    }, 300);
  }
  // #endregion

  //#region 'Business functions'
  toolBarOnItemClick(e) {
    switch (e) {
      case FragenkatalogConstant.LIST_EXPORTEXCEL: {
        this.gridCtlBfsFragenkatalog.instance.option({
          export: {
              fileName: this.optionCtlBfsFragenkatalogValue,
              excelFilterEnabled: true,
              customizeExcelCell: CustomizeExcelCell,
          }
      });
      this.gridCtlBfsFragenkatalog.instance.exportToExcel(false);
      return;
        return;
      }
      case FragenkatalogConstant.LIST_CHOOSERCOLUMN: {
        this.gridCtlBfsFragenkatalog.instance.showColumnChooser();
        return;
      }
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
    if (this.gridFunctionModel.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunctionModel);
    }
  }

  onRowClick(e) {
    this.gridCtlBfsFragenkatalog.selectedRowKeys = [e.key];
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

  onKeyDown(e) {
    if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
      this.keyDownArrowKey(true, e);
    } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
      this.keyDownArrowKey(false, e);
    }
  }

  keyDownArrowKey(isUpArrowKey: boolean, e: any) {
    const data = e.component.getSelectedRowKeys();
    if (data.length) {
      let rowIndex = e.component.getRowIndexByKey(data[0]);
      if (isUpArrowKey) {
        rowIndex--;
        if (rowIndex < 0) {
          rowIndex++;
        }
      } else {
        rowIndex++;
        if (e.component.getKeyByRowIndex(rowIndex) == null) {
          rowIndex--;
        }
      }
      e.component.selectRows([e.component.getKeyByRowIndex(rowIndex)], false);
      e.component.getScrollable().scrollToElement(e.component.getRowElement(rowIndex));
      this.loadDataDetail(e.component.getSelectedRowsData()[0]);
      e.event.preventDefault();
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

  handleDataList(ctlBfsFragenkatalogs) {
    this.ctlBfsFragenkatalogs = ctlBfsFragenkatalogs;
    if (ctlBfsFragenkatalogs.length > 0) {
      let isFindIndex = -1;
      if (!isNullOrUndefined(this.rowSelectedGrid)) {
        isFindIndex = ctlBfsFragenkatalogs.findIndex(x => x.BFSFrageID === this.rowSelectedGrid.bfsfrageId);
      }
      const rowIndex = isNullOrUndefined(this.rowSelectedGrid) || (isFindIndex === -1) ? 0 : isFindIndex;
      const selectRowKey = ctlBfsFragenkatalogs[rowIndex];
      if (!isNullOrUndefined(selectRowKey)) {
        this.gridCtlBfsFragenkatalog.selectedRowKeys = [selectRowKey.BFSFrageID];
        this.loadDataDetail(selectRowKey);
      }
    } else {
      this.gridCtlBfsFragenkatalog.instance.deselectAll();
      this.loadDataDetail(this.objectDataGridEmpty);
    }
  }
  handleDataDropDraw(dataInitDropDraw) {
    if (!isNullOrUndefined(dataInitDropDraw.katHeader)) {
      this.suchens = dataInitDropDraw.katHeader;
    }
    if (!isNullOrUndefined(dataInitDropDraw.personnenTypHeader)) {
      this.personTyps = dataInitDropDraw.personnenTypHeader;
    }
  }
  // #endregion

  //#region 'U'tility functions'
  getFilterColumns() {
    const columnCount = this.gridCtlBfsFragenkatalog.instance.columnCount();
    for (let i = 0; i < columnCount; i++) {
      if (this.gridCtlBfsFragenkatalog.instance.columnOption(i).dataField) {
        this.filterColumns.push(this.gridCtlBfsFragenkatalog.instance.columnOption(i));
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
    this.gridCtlBfsFragenkatalog.disabled = !e;
    this.isViewMode = false;
  }
  customSortingKategorie(rowData) {
    const column = this as any;
    const valueMap = column.lookup.valueMap;
    for (const key in valueMap) {
      if (valueMap.hasOwnProperty(key)) {
        if (key === rowData.BFSKategorieCode) {
          return valueMap[key];
        }
      }
    }
  }

  customSortingPerson(rowData) {
    const column = this as any;
    const valueMap = column.lookup.valueMap;
    for (const key in valueMap) {
      if (valueMap.hasOwnProperty(key)) {
        if (key === rowData.BFSPersonCode) {
          return valueMap[key];
        }
      }
    }
  }
  // #endregion
}
