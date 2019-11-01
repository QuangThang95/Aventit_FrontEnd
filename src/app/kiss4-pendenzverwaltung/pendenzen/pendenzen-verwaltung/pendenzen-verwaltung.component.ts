import { BaseComponent } from '@shared/components/base.component';
import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { localeDateString, Dialog } from '@shared/utilites/utilityHelpers';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { PendenzensSandbox } from '../pendenzen.sandbox';
import {
  PendenzenVerwaltung,
  XLOVCode,
  XOrgUnit,
  StatusEdit,
  ErfassungMutation,
  PendenzenVerwaltungQuery,
  ErfassungMutationQuery
} from '../models';
import {  } from '../models';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pendenzen-verwaltung',
  templateUrl: './pendenzen-verwaltung.component.html',
  styleUrls: ['./pendenzen-verwaltung.component.scss']
})
@SetClassRight('CtlPendenzenVerwaltung')
export class PendenzenVerwaltungComponent extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pendenzenVerwaltungForm')
  pendenzenVerwaltungForm: DxFormComponent;
  @ViewChild('gridPendenzenVerwatung') gridComponent: DxDataGridComponent;
  isNavbar: boolean;
  toolbarControl = {
    isFilter: true,
    isSearch: true,
    isSearchPanel: false,
    isFilterBuilder: false,
    isVisible: false
  };

  getMaster: any;
  getData: any;
  isViewDetail = true;
  isAddMode = false;
  saveTotalrow = 0;
  isErrorClosed = true;
  isInitDataGridView = true;
  erfassungVisible = false;
  mutationVisible = false;
  isValueSubjectChanged = false;
  lastModelSave: any;
  refreshDropdownGrid = {};
  filter: any;

  pendenzTypData: XLOVCode[];
  statusEdit: StatusEdit;
  erfassungMutationData: ErfassungMutation;
  erfassungMutationQuery: ErfassungMutationQuery;
  queryData = new PendenzenVerwaltungQuery();

  messageErr = null;
  creatorSearchId: number;
  receiverSearchId: number;
  leistungSearchId: number;
  falltraegerDetailId: number;
  receiverDetailId: number;

  totalRowInGrid = {};
  treeSelectStatus = false;
  animationContextMenu = {
    show: null,
    hide: { type: 'fade', from: 1, to: 0, duration: 500 }
  };
  pendenzenVerwaltungModel = {};
  leistungsverantwDisplayValue = '';
  treeSelectValue: string;
  navItemSelected: string;
  dateBoxInputValue: any;

  private subscriptions: Array<Subscription> = [];

  organisationData: XOrgUnit[];

  constructor(
    injector: Injector,
    public pendenzenVerwaltungSandbox: PendenzensSandbox
  ) {
    super(injector);
    this.getData = [];
  }

  ngOnInit() {
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.erfassungMutationData = new ErfassungMutation();
    this.erfassungMutationQuery = new ErfassungMutationQuery();
    this.statusEdit = new StatusEdit();
    this.pendenzenVerwaltungSandbox.registerEvents();
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungGetMasterData$.subscribe(data => {
        this.getData = data;
    });
  }

  ngAfterViewInit(): void {
    this.titlePage = 'Pendenzenverwaltung';
    setTimeout( this.registerEvents, 1000);
  }

  private registerEvents(): void {
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungGetMasterData$.subscribe(data => {
    });
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungInitData(null);
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungTypeData$.subscribe(
      pendenzType => (this.pendenzTypData = pendenzType)
    );
  }

  toolBarOnItemClick(e) {
    switch (e.itemData.name) {
      case 'exportExcel': {
        this.gridComponent.instance.exportToExcel(false);
        return;
      }
      case 'printPdf': {
        alert('print');
        return;
      }
      case 'chooserColumn': {
        this.gridComponent.instance.showColumnChooser();
        return;
      }
      case 'gridprint': {
        this.gridComponent.instance.filter();
        return;
      }
    }
    this.toolbarControl[e.itemData.name] = !this.toolbarControl[
      e.itemData.name
    ];
  }
  navigationOnContentReady(e) {
    if (e.component.option('items') && e.component.option('items').length === 0) {
      return;
    }
    if (this.treeSelectStatus) {
      const dataItem = e.component.option('items');
      for (let index = 0; index < dataItem.length; index++) {
        dataItem[index].selected =
          this.navItemSelected === dataItem[index].name;
      }
      this.treeSelectStatus = false;
      e.component.option('items', dataItem);
    }

    if (!this.navItemSelected) {
      if (e.component.option('items')) {
        const initValue = e.component.option('items').find(m => m.id === 12);
        if (initValue) {
          setTimeout(() => {
            this.treeSelectValue = initValue.caption;
          }, 500);
          this.navItemSelected = initValue.name;
          this.queryData.NavBarItemName = initValue.name;
        }
      }
    }
  }
  navigationItemSelect(e) {
    this.treeSelectStatus = true;
    this.treeSelectValue = e.itemData.parentId
      ? ''
      : (this.treeSelectValue = e.itemData.caption);

    this.navItemSelected = e.itemData.name;
    this.queryData.NavBarItemName = e.itemData.name;
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungs(this.queryData);
  }

  selectContentReady(e) {
    const dataSource = e.component.option('dataSource');
    if (!dataSource) { return; }
    if (dataSource.length <= 0) { return; }
    if (Object.keys(dataSource[0]).length === 0) { return; }
    dataSource.splice(0, 0, {});
    e.component.option('dataSource', dataSource);
  }

  selectDropdownValue(value, field: string) {
    if (field === 'faLeistungId') {
      this.leistungsverantwDisplayValue = '';
      this.pendenzenVerwaltungModel[field] = value;
      this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungLeistungsverantw(
        value as string
      );
      this.leistungsverantwValue();
      return;
    }
    this.queryData[field] = value;
  }

  leistungsverantwValue() {
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungLeistungsverantwData$.subscribe(
      leistungsverantw => {
        if (leistungsverantw && leistungsverantw.length > 0) {
          this.leistungsverantwDisplayValue = leistungsverantw[0].displayText;
        }
      }
    );
  }

  dateBoxValueChange(e, field: string) {
    if (e.event === undefined) {
      return;
    }
    try {
      const monthSave = +this.dateBoxInputValue.split('.')[1];
      const dateValue = new Date(e.value.getFullYear(), monthSave, 0);

      if (monthSave < e.value.getMonth() + 1) {
        e.component.option('value', dateValue);
      }
    } catch (error) { }
    this.queryData[field] = localeDateString(e.component.option('value'));
    if (this.isAddMode) {
      this.pendenzenVerwaltungModel['expirationDate'] = this.queryData[field];
    }
  }

  dateBoxOnInputValue(e) {
    this.dateBoxInputValue = e.component.option('text');
  }
  dateBoxOnChange(e) {
    const date = new Date();
    if (e.component.option('isValid') === false) {
      e.component.option('value', date);
    }
  }

  gridContentReady(e, name: string) {
    if (!this.refreshDropdownGrid[name]) {
      this.refreshDropdownGrid[name] = e.component;
    }
    this.totalRowInGrid[name] =
      e.component.totalCount() > 0 ? e.component.totalCount() : 0;
  }

  gridOnClick(event, gridName: string) {
    this[gridName] = event.key;
    if (!this.refreshDropdownGrid[gridName]) {
      this.refreshDropdownGrid[gridName] = event.component;
    }
    if (gridName === 'receiverDetailId') {
      this.pendenzenVerwaltungModel['receiverId'] = this.receiverDetailId;
      this.pendenzenVerwaltungModel['taskReceiverCode'] = +event.data[
        'typeCode'
      ];
    }

    event.component.repaint();
  }

  refeshGridInDropdown() {
    for (const key of Object.keys(this.refreshDropdownGrid)) {
      if (this.refreshDropdownGrid[key].isFilter) {
        this.refreshDropdownGrid[key].clearFilter();
      }

      this.refreshDropdownGrid[key].clearSelection();
    }
  }

  onClickBtnSearch() {
    this.queryData.SucheSenderId = this.creatorSearchId;
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungErstellerEmpfaengerData$.subscribe(
      result => {
        if (result && result.length > 0) {
          if (this.creatorSearchId) {
            this.queryData.SucheTaskSenderCode = result.find(
              m => m.id === this.creatorSearchId
            ).typeCode;
          }
          if (this.receiverSearchId) {
            this.queryData.SucheTaskReceiverCode = result.find(
              m => m.id === this.receiverSearchId
            ).typeCode;
          }
        }
      }
    );

    this.queryData.SucheReceiverId = this.receiverSearchId;
    this.queryData.SucheSar =
      this.leistungSearchId === undefined || this.leistungSearchId == null
        ? null
        : this.leistungSearchId;

    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungs(this.queryData);
  }

  actionNew_OnClick(): any {
    this.lastModelSave = this.pendenzenVerwaltungModel;
    this.falltraegerLoadData(null);
    this.pendenzenVerwaltungForm.instance.resetValues();
    this.pendenzenVerwaltungModel['sender'] =
      'diag_admin - Diartis, Support (Abklärungsteam 1)';
    this.isValueSubjectChanged = false;
    this.pendenzenVerwaltungModel = {};
    this.pendenzenVerwaltungModel['taskDescription'] = '';
    this.isViewDetail = !this.isViewDetail;
    this.isAddMode = true; // replace this with current mode.
    this.toolbarControl.isVisible = !this.toolbarControl.isVisible;
    this.statusEdit.setErledigtDisable = true;
    this.statusEdit.setErledigtVisible = true;
    this.statusEdit.responseTextReadOnly = true;
    this.falltraegerDetailId = null;
    this.receiverDetailId = null;

    this.pendenzenVerwaltungModel['taskStatusCode'] = 1; // Status "Pendent"
    this.pendenzenVerwaltungModel['taskTypeCode'] = 6; // Pendenz Typ "Anfrage"
    this.pendenzenVerwaltungModel['taskSenderCode'] = 1; // Erstellertyp "Person"
    this.pendenzenVerwaltungModel['createDate'] = localeDateString(
      new Date().toDateString()
    );
    this.pendenzenVerwaltungModel['senderId'] = localStorage.getItem(
      'user.userId'
    );
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungInitData$.subscribe(
      item => {
        if (item) {
          if (!this.falltraegerDetailId && this.falltraegerDetailId > 0) {
            this.pendenzenVerwaltungModel['faFall'] = item.nameVorname;
            this.pendenzenVerwaltungModel['baPersonId'] = null;
          }
          this.pendenzenVerwaltungModel['sender'] = item.sender;
        }
      }
    );
    this.pendenzenVerwaltungModel['taskReceiverCode'] = 1; // Empfängertyp "Person"
    this.pendenzenVerwaltungModel['auswahl'] = false; // Auswahl = false
  }

  actionEdit_OnClick() {
    if (!this.pendenzenVerwaltungModel['xTaskId']) {
      return;
    }
    if (this.pendenzenVerwaltungModel['baPersonId']) {
      this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungBetriffPerson(
        this.pendenzenVerwaltungModel['baPersonId']
      );
    }
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungStatusEdit(
      this.pendenzenVerwaltungModel['xTaskId']
    );

    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungStatusEditData$.subscribe(
      stEdit => {
        this.statusEdit = stEdit;
      }
    );

    this.isViewDetail = !this.isViewDetail;
    this.isAddMode = false;
    this.toolbarControl.isVisible = !this.toolbarControl.isVisible;
    this.statusEdit = new StatusEdit();
  }

  actionDone_OnClick(e) {
    this.pendenzenVerwaltungModel['taskStatusCode'] = 3;
    this.pendenzenVerwaltungModel['userIdInBearbeitung'] = this
      .pendenzenVerwaltungModel['userIdInBearbeitung']
      ? this.pendenzenVerwaltungModel['userIdInBearbeitung']
      : null;
    this.pendenzenVerwaltungModel['startDate'] = this.pendenzenVerwaltungModel[
      'startDate'
    ]
      ? this.pendenzenVerwaltungModel['startDate']
      : null;
    this.actionSave_OnClick(e);
  }

  actionSave_OnClick(e) {
    const validateForm = this.pendenzenVerwaltungForm.instance.validate();

    if (!validateForm.isValid) {
      this.isErrorClosed = true;
      this.messageErr = validateForm.brokenRules.map(o => o.message)[0];
      return this.messageErr;
    }

    this.messageErr = '';
    this.isErrorClosed = false;
    if (!this.pendenzenVerwaltungModel['xTaskId']) {
      if (this.falltraegerDetailId) {
        this.pendenzenVerwaltungModel['baPersonId'] = this.falltraegerDetailId;
      }
      this.pendenzenVerwaltungModel['faFallId'] =
        this.pendenzenVerwaltungModel['faLeistungId'] &&
          this.pendenzenVerwaltungModel['fallnummer']
          ? this.pendenzenVerwaltungModel['fallnummer']
          : null;
      this.pendenzenVerwaltungSandbox.createPendenzenVerwaltung(this
        .pendenzenVerwaltungModel as PendenzenVerwaltung);
    } else {
      this.pendenzenVerwaltungSandbox.updatePendenzenVerwaltung(this
        .pendenzenVerwaltungModel as PendenzenVerwaltung);
    }
    this.refresh();
    this.pendenzenVerwaltungModel = this.lastModelSave;
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltung$.subscribe(result => {
      if (result['rowVersion']) {
        this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungs(
          this.queryData
        );
        this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungTreeNavigator();
      }
    });
  }

  actionCancel_OnClick() {
    const messageCancels = {
      'de-CH':
        'Datenansicht trotz der nicht gespeicherten Daten aktualisieren ?',
      'fr-CH': 'Rafraîchir malgré les données non sauvegardées ?',
      'en-EN': 'Are you sure you want to leave the page without saving ?'
    };
    const titleCancels = {
      'de-CH': 'Bestätigung!',
      'fr-CH': 'Confirmation!',
      'en-EN': 'Confirmation!'
    };
    let languageCode = localStorage.getItem('currentLang.Culture');
    if (!languageCode) {
      languageCode = 'de-CH';
    }

    Dialog.confirm(
      titleCancels[languageCode],
      messageCancels[languageCode]
    ).done(result => {
      if (result === true) {
        this.isErrorClosed = false;
        if (this.lastModelSave) {
          this.pendenzenVerwaltungModel = this.lastModelSave;
        }
        this.gridComponent.instance.repaint();
        return this.refresh();
      } else {
        return null;
      }
    });
  }

  refresh() {
    this.treeSelectStatus = true;
    this.isViewDetail = true;
    this.isAddMode = false;
    this.toolbarControl.isVisible = false;
    this.messageErr = null;
    this.queryData = new PendenzenVerwaltungQuery();
    this.queryData.NavBarItemName = this.navItemSelected;
    this.statusEdit = new StatusEdit();
    this.statusEdit.setErledigtVisible = false;
    this.leistungsverantwDisplayValue = this.pendenzenVerwaltungModel['sar'];
  }

  pendenzenVerwaltungTypeAction(taskTypeCode): void {
    if (!taskTypeCode || this.isValueSubjectChanged) {
      return;
    }
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungBetreffBeschreibung(
      taskTypeCode
    );
    this.getBetreffbeschreibung();
  }

  getBetreffbeschreibung() {
    if (!this.isAddMode) {
      return;
    }
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungBetreffBeschreibungData$.subscribe(
      betreffbeschreibung => {
        if (betreffbeschreibung['_body']) {
          const result = JSON.parse(betreffbeschreibung['_body']);
          if (result.subject && result.subject.trim().length > 0) {
            this.pendenzenVerwaltungModel['subject'] = result.subject;
          }
          if (
            result.taskDescription &&
            result.taskDescription.trim().length > 0
          ) {
            this.pendenzenVerwaltungModel['taskDescription'] =
              result.taskDescription;
          }
        }
      }
    );
  }

  changedLanguage(e) {
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungTreeNavigator();
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungType('TaskType');
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungStatus({
      lovName: 'TaskStatus',
      isSuchenTaskCode: true
    });
  }

  getLeistungData(faLeistungId) {
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungLeistungData$.subscribe(
      item => {
        if (item && item.length > 0) {
          const leistungValue = item.find(m => m['code'] === faLeistungId);
          this.pendenzenVerwaltungModel['leistungDisplay'] = leistungValue
            ? leistungValue['text']
            : '';
        }
      }
    );
  }

  gridOnContentReady(e) {
    const rowCount = e.component.totalCount();
    if (rowCount !== this.saveTotalrow && rowCount > 0) {
      try {
        e.component.pageIndex(e.component.pageCount() - 1);
        if (e.component.getSelectedRowsData().length === 1) {
          e.component.clearSelection();
        }
        const data = e.component.option('dataSource');
        const key = data[rowCount - 1].xTaskId;
        const list = e.component.getSelectedRowKeys();
        list.push(key);
        e.component.option('selectedRowKeys', list);
      } catch (error) { }
      this.saveTotalrow = rowCount;
    }
  }

  falltraegerLoadData(value) {
    if (!value) {
      this.leistungsverantwDisplayValue = '';
    }
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungLeistung(value);
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungBetriffPerson(value);
  }

  gridOnChangedValue(e) {
    if (this.isAddMode || !this.isViewDetail) {
      return;
    }
    if (e.selectedRowsData.length === 0) {
      this.pendenzenVerwaltungModel = {};
      return;
    }
    const rowData = e.selectedRowsData[e.selectedRowsData.length - 1];

    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungLeistung(
      rowData['fallnummer'] ? +rowData['fallnummer'] : null
    );

    this.pendenzenVerwaltungModel = rowData;
    this.erfassungMutationQuery.MutationUserId = rowData['userIdErledigt']
      ? rowData['userIdErledigt']
      : null;
    this.erfassungMutationQuery.MutationDate = rowData['doneDate']
      ? rowData['doneDate']
      : null;
    this.erfassungMutationQuery.ErfassungUserId = rowData['userIdInBearbeitung']
      ? rowData['userIdInBearbeitung']
      : null;
    this.erfassungMutationQuery.ErfassungDate = rowData['startDate']
      ? rowData['startDate']
      : null;
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungErfassungMutation(
      this.erfassungMutationQuery
    );
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungErfassungMutationData$.subscribe(
      erfassungMutation => {
        this.erfassungMutationData = erfassungMutation;
      }
    );

    this.receiverDetailId = rowData['receiverId'];
    this.falltraegerDetailId = rowData['fallnummer']
      ? +rowData['fallnummer']
      : null;

    this.getLeistungData(rowData['faLeistungId']);
    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungStatusData$.subscribe(
      pendenzStatus => {
        if (pendenzStatus && pendenzStatus.length > 0) {
          this.pendenzenVerwaltungModel[
            'taskStatusDisplay'
          ] = pendenzStatus.find(
            m => m.code === rowData['taskStatusCode']
          ).text;
        }
      }
    );

    this.pendenzenVerwaltungSandbox.pendenzenVerwaltungTypeData$.subscribe(
      pendenzType => {
        if (pendenzType && pendenzType.length > 0) {
          this.pendenzenVerwaltungModel['taskTypeDisplay'] = pendenzType.find(
            m => m.code === rowData['taskTypeCode']
          ).text;
        }
      }
    );

    this.leistungsverantwDisplayValue = rowData['sar'];
    this.lastModelSave = this.pendenzenVerwaltungModel;
  }

  gridOnCellClick(e) {
    if (e.columnIndex !== 14) {
      return;
    }
    e.component.clearSelection();
    this.pendenzenVerwaltungSandbox.loadPendenzenVerwaltungModulenStatus(
      e.data.baPersonId
    );
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.pendenzenVerwaltungSandbox.unregisterEvents();
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    if (this.isAddMode || !this.isViewDetail) {
      $event.returnValue = 'Are you sure?';
    }
  }
}
