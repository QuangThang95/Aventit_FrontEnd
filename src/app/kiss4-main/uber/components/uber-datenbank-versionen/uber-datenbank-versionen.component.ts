import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxButtonComponent, DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'kiss-uber-datenbank-versionen',
  templateUrl: './uber-datenbank-versionen.component.html',
  styleUrls: ['./uber-datenbank-versionen.component.scss']
})
export class UberDatenbankVersionenComponent implements OnInit {
  isExpandTabDatenBankVersion = true;
  isDatenbankversionenVisible = true;
  selectedKeys = [];
  formatDate = 'dd.MM.yyyy HH:mm';
  emitMouseEvent = new Subject<boolean>();
  @Input() databaseVersions: any;
  @Output() buttonClickDataVersion: EventEmitter<any> = new EventEmitter();
  @Output() buttonClickRefreshDataversion: EventEmitter<any> = new EventEmitter();
  @Output() rowClickGrid: EventEmitter<any> = new EventEmitter();

  @Output() mouseEnterUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeaveUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseDown: EventEmitter<any> = new EventEmitter();
  @ViewChild('gridDatabaseVersion') gridDatabaseVersion: DxDataGridComponent;
  @ViewChild('btnDatabankVersion') btnDatabankVersion: DxButtonComponent;
  customizeBtn = [
    {
      text: this.translateService.instant('Uber.Buttons.Copy'),
      visible: true,
      name: 'uber-data-version-copy',
      type: 'default'
    },
    {
      text: this.translateService.instant('Uber.Buttons.Change'),
      visible: true,
      name: 'uber-refresh-data-version-copy',
      type: 'default'
    }
  ];

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  actionDatenbankVersionenKopiFrm3OnClick() {
    this.buttonClickDataVersion.emit(this.gridDatabaseVersion);
  }

  showDatenbankVersionenPopup() {
    this.buttonClickRefreshDataversion.emit();
  }

  selectRowDatenbankVersionen(event) {
    this.rowClickGrid.emit(event);
  }

  onClickGrid() {
    this.mouseDown.emit('gridDatenBankVersionen');
  }
  toolBarOnItemClick(e) {
    switch (e) {
      case 'uber-data-version-copy':
        this.buttonClickDataVersion.emit(this.gridDatabaseVersion);
        break;
      case 'uber-refresh-data-version-copy':
        this.gridDatabaseVersion.instance.clearFilter();
        this.buttonClickRefreshDataversion.emit();
        break;
      default:
        break;
    }
  }
  public reMoveSelectedRowKey() {
    this.selectedKeys = [-1];
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Uber.Title_Group.Database-Version')) {
      this.isExpandTabDatenBankVersion = !this.isExpandTabDatenBankVersion;
    }
  }
}
