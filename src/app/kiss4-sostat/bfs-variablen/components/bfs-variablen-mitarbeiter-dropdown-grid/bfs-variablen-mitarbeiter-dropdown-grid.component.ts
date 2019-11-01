import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Mitarbeiter } from '@app/kiss4-sostat/bfs-variablen/models';
import { AppEnums } from '@shared/AppEnum';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
    selector: 'kiss-bfs-variablen-mitarbeiter-dropdown-grid',
    templateUrl: './bfs-variablen-mitarbeiter-dropdown-grid.component.html',
    styleUrls: ['./bfs-variablen-mitarbeiter-dropdown-grid.component.scss']
})
export class VariablenMitarbeiterDropdownGridComponent implements OnInit {
    @ViewChild('gridMitarbeiter') gridMitarbeiter: DxDataGridComponent;
    @Output() selectMitarbeiterEventEmitter = new EventEmitter();
    @Input() dataMitarbeiters: Mitarbeiter[];
    // dropdown grid Mitarbeiter data
    userID: number;
    openMitarbeiterGrid = false;
    totalMitarbeiterRecords: number;

    constructor() { }
    // #region component life cycle functions
    ngOnInit() {
    }
    // #endregion

    // #region common functions
    closeMitarbeiterInput(event) {
        if (event.value === null) {
            this.userID = null;
        }
        event.component.focus();
        this.selectMitarbeiterEventEmitter.emit(this.userID);
    }

    onClickRowMitarbeiterGrid(event) {
        this.userID = event.key;
        this.openMitarbeiterGrid = false;
        event.component.focus();
        this.selectMitarbeiterEventEmitter.emit(this.userID);
    }

    onMitarbeiterGridContentReady(e) {
        this.totalMitarbeiterRecords = (e.component.totalCount() > 0) ? e.component.totalCount() : 0;
    }
    // #endregion

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
