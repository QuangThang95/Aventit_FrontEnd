import {
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ModelSearch } from '@app/kiss4-sostat/plausifehler/models';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { DxDropDownBoxComponent, DxFormComponent, DxTextBoxComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-plausifehler-search',
    templateUrl: './plausifehler-search.component.html',
    styleUrls: ['./plausifehler-search.component.scss']
})
@SetClassRight('CtlBfsQueryPlausiFehler')  // multi language
export class PlausifehlerSearchComponent extends BaseComponent implements OnInit, OnChanges {
    @ViewChild('plausifehlerSearchFormInstance') plausifehlerSearchFormInstance: DxFormComponent;
    @ViewChild('textboxJahr') textboxJahr: DxTextBoxComponent;
    @ViewChild('dropDownboxPerson') person: DxDropDownBoxComponent;
    @ViewChild('gridPerson') gridPerson: DxDataGridComponent;
    @ViewChild('gridMitarbeiter') gridMitarbeiter: DxDataGridComponent;
    //#region "Declare @Input and @Output"
    @Input() jahr: number;
    @Input() persons: any;
    @Input() mitarbeiters: any;
    @Output() objectSearch: EventEmitter<any> = new EventEmitter();
    @Output() messageErrorChanged: EventEmitter<any> = new EventEmitter();
    //#endregion
    //#region "Declare variables Global"
    isStichtag = true;
    isAnfangszustand = true;
    totalPersonRecords = 0;
    totalMitarbeiterRecords = 0;
    userID: any;
    baPersonID: any;
    isDropDownBoxPersonOpened: false;
    isDropDownBoxMitarbeiterOpened: false;
    dataJahr: number;
    dataPersons: any;
    dataMitarbeiters: any;
    fixWidth: any = CommonConstant.FIX_WIDTH;
    //#endregion
    // expand panel
    isExpand = true;
    options = {
        type: 'default',
        text: this.translateService.instant('plausifehler.Ausführen'),
        icon: 'fa fa-search',
        onClick: () => {
          this.onSearchByButton();
      }
      };
    //#region "component life cycle functions"
    constructor(injector: Injector, public utilService: UtilService, public translateService: TranslateService) {
        super(injector);
    }
    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.jahr) && changes.jahr.currentValue) {
            this.dataJahr = changes.jahr.currentValue;
        }
        if (!isNullOrUndefined(changes.persons) && changes.persons.currentValue) {
            this.dataPersons = changes.persons.currentValue;
        }
        if (!isNullOrUndefined(changes.mitarbeiters) && changes.mitarbeiters.currentValue) {
            this.dataMitarbeiters = changes.mitarbeiters.currentValue;
        }
    }
    //#endregion
    //#region "common functions"
    onGridPersonContentReady(e) {
        this.totalPersonRecords = (e.component.totalCount() > 0) ? e.component.totalCount() : 0;
    }
    /**
     * Datagrid Mitarbeiter ready
     */
    onGridMitarbeiterContentReady(e) {
        this.totalMitarbeiterRecords = (e.component.totalCount() > 0) ? e.component.totalCount() : 0;
    }
    onClickRowMitarbeiterGrid(event) {
        this.userID = event.key;
        this.isDropDownBoxMitarbeiterOpened = false;
        event.component.focus();
    }
    onClickRowPersonGrid(event) {
        this.baPersonID = event.key;
        this.isDropDownBoxPersonOpened = false;
        event.component.focus();
    }
    onValueChangedMitarbeiter(event) {
        if (event.value === null) {
            this.userID = null;
            this.gridMitarbeiter.selectedRowKeys = [];
        }
        event.component.focus();
    }
    onValueChangedPerson(event) {
        if (event.value === null) {
            this.baPersonID = '';
            this.gridPerson.selectedRowKeys = [];
        }
        event.component.focus();
    }
    //#endregion
    //#region "utility functions"
    onSearch() {
        if (isNullOrUndefined(this.jahr) || this.jahr.toString().length === 0) {
            this.handleMessage(true, this.translateService.instant('plausifehler.MSG_001'));
            return;
        } else {
            this.handleMessage(false, '');
            const objectSeach = new ModelSearch({
                Jahr: this.jahr,
                Anfangszustand: this.isAnfangszustand,
                NameVorname: !isNullOrUndefined(this.person.text) ? this.person.text : '',
                Stichtag: this.isStichtag,
                UserIDLookup: !isNullOrUndefined(this.userID) ? this.userID : ''
            });
            this.objectSearch.emit(objectSeach);
        }
    }
    onSearchByEnter() {
        this.jahr = this.textboxJahr.text ? parseInt(this.textboxJahr.text, 10) : null;
        this.onSearch();
    }
    handleMessage(isClose, messageError) {
        this.messageErrorChanged.emit({ isClose: isClose, messageError: messageError });
    }

    onSearchContainerClick(event) {
        if (event.currentTarget.getElementsByClassName('dx-state-focused').length <= 0) {
            this.onSearchByEnter();
        }
    }

    onCollapseSearchContainer(event) {
        event.stopPropagation();
        this.isExpand = !this.isExpand;
    }

    onSearchByButton() {
        this.jahr = this.textboxJahr.text ? parseInt(this.textboxJahr.text, 10) : null;
        this.onSearch();
    }
    //#endregion
}
