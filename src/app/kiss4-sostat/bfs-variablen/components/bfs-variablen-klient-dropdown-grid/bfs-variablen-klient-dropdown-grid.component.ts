import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Person } from '@app/kiss4-sostat/bfs-variablen/models';
import { AppEnums } from '@shared/AppEnum';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'kiss-bfs-variablen-klient-dropdown-grid',
  templateUrl: './bfs-variablen-klient-dropdown-grid.component.html',
  styleUrls: ['./bfs-variablen-klient-dropdown-grid.component.scss']
})
export class VariablenKlientDropdownGridComponent implements OnInit {
  @ViewChild('gridPerson') gridPerson: DxDataGridComponent;
  @Output() selectPersonEventEmitter = new EventEmitter();
  @Input() dataPersons: Person[];
  baPersonID: number;
  openPersonGrid = false;
  totalKlientRecords: number;
  constructor() { }

  ngOnInit() {
  }

  closePersonInput(event) {
    if (event.value === null) {
      this.baPersonID = null;
    }
    event.component.focus();
    this.selectPersonEventEmitter.emit(this.baPersonID);
  }

  onClickRowPersonGrid(event) {
    this.baPersonID = event.key;
    this.openPersonGrid = false;
    event.component.focus();
    this.selectPersonEventEmitter.emit(this.baPersonID);
  }

  onKlientGridContentReady(e) {
    this.totalKlientRecords = (e.component.totalCount() > 0) ? e.component.totalCount() : 0;
  }
  // #region utility functions
  onKeyDownSelectOption(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      e.event.preventDefault();
      if (!e.component.option('opened')) {
        e.component.open();
      } else {
        e.component.close();
      }
    }
  }
  // #endregion
}
