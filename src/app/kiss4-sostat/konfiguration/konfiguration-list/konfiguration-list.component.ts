import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { KonfigurationSandbox } from '@app/kiss4-sostat/konfiguration/konfiguration.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { HttpResponseHandler } from '@shared/asyncServices/http';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { getConditionListBtn } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { Konfiguration, KonfigurationList } from '../models';

@Component({
  selector: 'kiss-konfiguration-list',
  templateUrl: './konfiguration-list.component.html',
  styleUrls: ['./konfiguration-list.component.scss']
})

@SetClassRight('CtlBfsKonfiguration')
export class KonfigurationListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild('konfigurationGrid') gridKonfiguration: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expand') expand: any;
  @ViewChild('printer') printer: PrinterComponent;

  // Declare variables for toolbar
  userID: string;
  firstName: string;
  lastName: string;
  isNavbar: boolean;
  logonName: string;
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  pageTitle: string;
  filter: any;
  filterColumns: Array<any> = [];

  // Declare variables for progress bar
  inProgress = false;
  intervalId: any;
  seconds = 10;
  visibleProgressBar = true;

  // Declare buttons toolbar
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];

  // Declare variables for detail and grid
  sostatJahr: any;
  sostatDsn: string;
  sostatInstitutionNr: any;
  sostatExportPfad: string;
  sostatExportPfadXml: string;

  // Declare variables for message
  messageCtrlIError: string;
  titleToastError: string;

  // Declare variables for data from api
  dataKonfiguration: any = new Konfiguration();
  konfigurationForGrid: any = new KonfigurationList();

  // Declare variables for grid view
  public rowSelectedIndex: number;

  // Declare variables for right click menu
  gridClickName: string = undefined;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;

  // Declare variables for popup
  popupHtml: any;
  popupDataVisible = false;
  popupData: any;
  // Declare name file excel
  optionNameExport = 'export.fileName';
  // Msg error
  messageErr = '';
  isErrorClosed = false;
  private subscriptions = new Subscription();

  constructor(
    injector: Injector,
    public konfigurationSandbox: KonfigurationSandbox,
    public httpResponseHandler: HttpResponseHandler,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox) {
    super(injector);
  }

  ngOnInit() {
    this.getLocalStorage();
    this.initFunction();
    this.registerEvents();
  }

  initFunction() {
    // Get data for detail
    this.konfigurationSandbox.getKonfiguration();
    // Get data for grid
    this.konfigurationSandbox.getKonfigurationGrid();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  getLocalStorage() {
    this.userID = UtilityHelper.getUserIdFromLocalStorage();
    this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
    this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
    this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
    this.logonName = UtilityHelper.getUserFromLocalStorage();
  }

  // unregister subscriptions on destroy component
  private unregisterEvents() {
    this.subscriptions.unsubscribe();
  }

  // Progress bar
  onProgress() {
    if (this.inProgress) {
      clearInterval(this.intervalId);
    } else {
      if (this.seconds === 0) {
        this.seconds = 10;
      }
      this.intervalId = setInterval(() => this.timer(), 100);
    }
    this.inProgress = !this.inProgress;
  }

  timer() {
    if (this.seconds === 0) {
      this.inProgress = !this.inProgress;
      clearInterval(this.intervalId);
      this.visibleProgressBar = false;
      return;
    }
    this.seconds--;
  }

  registerEvents() {
    this.subscriptions.add(this.konfigurationSandbox.konfigurationsData$.subscribe(response => {
      if (!isNullOrUndefined(response)) {
        if (response.status === 500) {
          this.popupData = JSON.parse(response._body).message;
          this.popupDataVisible = true;
        } else {
          this.visibleProgressBar = true;
          this.onProgress();
          this.dataKonfiguration = response;
        }
      }
    }));

    this.subscriptions.add(this.konfigurationSandbox.konfigurationsDataGrid$.subscribe((response) => {
      if (!isNullOrUndefined(response)) {
        if (response[0].status === 500) {
          this.popupData = JSON.parse(response[0]._body).message;
          this.popupDataVisible = true;
        } else {
          this.visibleProgressBar = true;
          this.onProgress();
          this.konfigurationForGrid = response;
          this.gridKonfiguration.selectedRowKeys = [response[0]];
          this.rowSelectedIndex = 0;
          const scrollable = this.gridKonfiguration.instance.getScrollable();
          if (scrollable != null) {
            scrollable.scrollTop();
          }
        }
      }
    }));
  }

  // Click event on data grid's row
  public onRowClickKonfigurationGrid(e) {
    this.rowSelectedIndex = e.component.getRowIndexByKey(e.component.getSelectedRowKeys()[0]);
  }

  // Show notification Error
  showNotificationError(titleToastError, messageToastError) {
    this.httpResponseHandler.showNotificationError(titleToastError, messageToastError);
  }

  // Toolbar
  toolBarOnItemClick(e) {
    switch (e) {
      case CommonConstant.ButtonExportExcel: {
        this.gridKonfiguration.instance.option(this.optionNameExport, this.translateService.instant('Konfiguration.Title'));
        this.gridKonfiguration.instance.exportToExcel(false);
        return;
      }
      case CommonConstant.ButtonPrintPdf: {
        // TODO: Print function
        break;
      }
      case CommonConstant.ButtonColumnChooser: {
        this.gridKonfiguration.instance.showColumnChooser();
        return;
      }
      case CommonConstant.ButtonGridSetting: {
        this.gridFunction.showPopup(this.gridFunctionModel);
        return;
      }
      case CommonConstant.ButtonGridDelete: {
        this.isErrorClosed = true;
        this.messageErr = this.translateService.instant('Konfiguration.Message.deleteGrid');
        return;
      }
      default:
        break;
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
    if (this.gridFunctionModel.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunctionModel);
    }
  }

  // Functions handle event for shortcut keys
  // Arrow Key
  onKeyDown(e) {
    const data = e.component.getSelectedRowKeys();
    if (data.length) {
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
      // row indicator
      this.rowSelectedIndex = e.component.getRowIndexByKey(e.component.getSelectedRowKeys()[0]);
      // scroll
      e.component.getScrollable().scrollToElement(e.component.getRowElement(index));
    }
    e.event.stopPropagation();
  }

  // When closing popup
  closePopup() {
    this.popupDataVisible = false;
  }

  // Filter on toolbar
  getFilterColumns() {
    setTimeout(() => {
      const columnCount = this.gridKonfiguration.instance.columnCount();
      for (let i = 0; i < columnCount; i++) {
        if (this.gridKonfiguration.instance.columnOption(i).dataField) {
          this.filterColumns.push(this.gridKonfiguration.instance.columnOption(i));
        }
      }
    });
  }

  ngAfterViewInit() {
    this.getFilterColumns();
  }

  onCloseError() {
    this.isErrorClosed = false;
    this.messageErr = '';
  }

  onContextMenuPreparing(e) {
    this.gridFunction.menuGrouping(e, this.expand, this.gridKonfiguration, CommonConstant.MenuGroupingHeaderGrid);
  }

  canDeactivate() {
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

}
