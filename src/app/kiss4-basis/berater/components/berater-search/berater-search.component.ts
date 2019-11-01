import { Component, Injector, EventEmitter, Output, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { BeraterSandbox } from '@app/kiss4-basis/berater/berater.sandbox';
import { DxDataGridComponent, DxDropDownBoxComponent } from 'devextreme-angular';
import { BeraterQuery } from '@app/kiss4-basis/berater/models';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { BeraterAllConstant } from '@app/kiss4-basis/berater/berater.constant';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';

@Component({
    selector: 'kiss-berater-search',
    templateUrl: './berater-search.component.html',
    styleUrls: ['./berater-search.component.scss'],
})

export class BeraterFormSearchComponent extends BaseComponent implements OnChanges {
    @ViewChild('dropDownClickSearch') dropDownClickSearch: DxDropDownBoxComponent;
    @ViewChild('gridInstitution') gridInstitution: DxDataGridComponent;
    @Output() formSearchData: EventEmitter<any> = new EventEmitter();
    @Input() institutionListData: any;
    @Input() isReadOnly: boolean;

    queryData = new BeraterQuery();
    queryDataSearch = {};
    institutionData: any;
    selectedKeysSearchGrid = [];
    baInstitutionID: any;
    isFocusDropDownBox: boolean;
    openGrid = false;
    isExpand = true;

    constructor(injector: Injector,
        public beraterSandbox: BeraterSandbox,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.institutionListData) && !isNullOrUndefined(changes.institutionListData.currentValue)) {
            this.listInstitution(changes.institutionListData.currentValue);
        }
    }

    listInstitution(institution) {
        this.institutionData = institution;
        this.selectedKeysSearchGrid = [institution[0].baInstitutionID];
    }

    clickDropDownSearchGrid() {
        if (isNullOrUndefined(this.baInstitutionID)) {
            this.selectedKeysSearchGrid = [this.institutionData[0].baInstitutionID];
        } else {
            const selKey = this.gridInstitution.instance.getSelectedRowKeys();
            const currentKey = selKey[0] ? selKey[0] : 0;
            const index = this.gridInstitution.instance.getRowIndexByKey(currentKey);
        }
    }

    closeInput(event) {
        if (event.value === null) {
            this.openGrid = false;
            this.selectedKeysSearchGrid = [this.institutionData[0].baInstitutionID];
            this.baInstitutionID = '';
            this.somethingChanged();
        }
    }

    onClickRowGridInstitution($event) {
        this.baInstitutionID = $event.key;
        this.openGrid = false;
        this.somethingChanged();
    }

    somethingChanged() {
        const query = {};
        if (this.baInstitutionID) {
            query['baInstitutionID'] = this.baInstitutionID;
        }

        if (this.queryData['name']) {
            query['name'] = this.queryData['name'];
        }

        if (this.queryData['vorname']) {
            query['vorname'] = this.queryData['vorname'];
        }

        if (this.queryData['email']) {
            query['email'] = this.queryData['email'];
        }

        if (this.queryData['telefon']) {
            query['telefon'] = this.queryData['telefon'];
        }
        this.queryDataSearch = query;
        this.formSearchData.emit({ ...this.queryDataSearch });
    }

    onKeyDown($event) {
        this.isFocusDropDownBox = true;
        if (($event.event.keyCode === AppEnums.KeyCode.KeyF4) && (this.openGrid || this.isFocusDropDownBox)) {
            event.preventDefault();
            if (this.openGrid) {
                setTimeout(() => {
                    this.dropDownClickSearch.instance.focus();
                }, BeraterAllConstant.timeOut100);
            } else {
                if (isNullOrUndefined(this.baInstitutionID)) {
                    this.selectedKeysSearchGrid = [this.institutionData[0].baInstitutionID];
                } else {
                    const selKey = this.gridInstitution.instance.getSelectedRowKeys();
                    const currentKey = selKey[0] ? selKey[0] : 0;
                    const index = this.gridInstitution.instance.getRowIndexByKey(currentKey);
                }
            }
            this.openGrid = !this.openGrid;
        }
    }

    onFocusInDropboxSearch() {
        this.isFocusDropDownBox = true;
    }

    onFocusOutDropboxSearch() {
        this.isFocusDropDownBox = false;
    }

    onKeyDownGridSearch($event) {
        const selKey = this.gridInstitution.instance.getSelectedRowKeys();
        const currentKey = selKey[0] ? selKey[0] : 0;
        let index = this.gridInstitution.instance.getRowIndexByKey(currentKey);
        if ($event.event.keyCode === AppEnums.KeyCode.UpArrowKey && index > 0) {
            index = index - 1;
            this.gridInstitution.instance.focus(this.gridInstitution.instance.getCellElement(index, 0));
            this.gridInstitution.instance.selectRowsByIndexes([index]);
            this.selectedKeysSearchGrid = [this.gridInstitution.instance.getKeyByRowIndex(index)];
            const row = $event.component.getRowElement(index);
            $event.component.getScrollable().scrollToElement(row);
            return;
        }

        if ($event.event.keyCode === AppEnums.KeyCode.DownArrowKey && (index + 1) < this.institutionData.length) {
            index = index + 1;
            this.gridInstitution.instance.focus(this.gridInstitution.instance.getCellElement(index, 0));
            this.gridInstitution.instance.selectRowsByIndexes([index]);
            this.selectedKeysSearchGrid = [this.gridInstitution.instance.getKeyByRowIndex(index)];
            const row = $event.component.getRowElement(index);
            $event.component.getScrollable().scrollToElement(row);
            return;
        }

        if ($event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
            this.baInstitutionID = this.gridInstitution.instance.getSelectedRowKeys()[0];
            this.openGrid = false;
            this.somethingChanged();
            return;
        }

        if (($event.event.keyCode === AppEnums.KeyCode.KeyF4) && (this.openGrid || this.isFocusDropDownBox)) {
            event.preventDefault();
            if (this.openGrid) {
                setTimeout(() => {
                    this.dropDownClickSearch.instance.focus();
                }, BeraterAllConstant.timeOut100);
            } else {
                if (isNullOrUndefined(this.baInstitutionID)) {
                    this.selectedKeysSearchGrid = [this.institutionData[0].baInstitutionID];
                    setTimeout(() => {
                        this.gridInstitution.instance.focus(this.gridInstitution.instance.getCellElement(0, 0));
                    }, BeraterAllConstant.timeOut100);
                } else {
                    setTimeout(() => {
                        this.gridInstitution.instance.focus(this.gridInstitution.instance.getCellElement(index, 0));
                    }, BeraterAllConstant.timeOut100);
                }
            }
            this.openGrid = !this.openGrid;
        }
    }

  onCollapseSearchContainer(event) {
    this.isExpand = !this.isExpand;
  }
}
