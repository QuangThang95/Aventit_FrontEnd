import 'devextreme-intl';

import { AfterViewInit, Component, EventEmitter, Injector, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Mitarbeiter, Person } from '@app/kiss4-sostat/bfs-variablen/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxCheckBoxComponent, DxFormComponent, DxTextBoxComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { VariablenSandbox } from '../../bfs-variablen.sandbox';

@Component({
    selector: 'kiss-bfs-variablen-search',
    templateUrl: './bfs-variablen-search.component.html',
    styleUrls: ['./bfs-variablen-search.component.scss']
})
@SetClassRight('CtlBfsQueryVariablen')
export class VariablenSearchComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('textBoxJahr') textBoxJahr: DxTextBoxComponent;
    @ViewChild('stichtagCbx') stichtagCbx: DxCheckBoxComponent;
    @ViewChild('anfangszustandCbx') anfangszustandCbx: DxCheckBoxComponent;
    @ViewChild('nurDossiertragerCbx') nurDossiertragerCbx: DxCheckBoxComponent;
    @ViewChild('excelExportCbx') excelExportCbx: DxCheckBoxComponent;
    @ViewChild('searchForm') searchForm: DxFormComponent;
    @Output() emitOnSearch: EventEmitter<any> = new EventEmitter();
    // dropdown grid Klient data
    dataPersons: Person[] = [];
    baPersonID: number;
    // dropdown grid Mitarbeiter data
    dataMitarbeiters: Mitarbeiter[] = [];
    userID: number;
    // search init data
    searchInitJahr = '';
    searchInitLeistungsart = [];
    searchInitSektion = [];
    selectedLeistungsart: any;
    selectedSektion: any;
    exportCsvPath: any;
    // checkboxes
    stichtag = true;
    anfangszustand = true;
    nurDossiertrager = false;
    excelExport = true;
    // expand panel
    isExpand = true;
    fixwidth = CommonConstant.FIX_WIDTH;
    options = {
        type: 'default',
        text: this.translateService.instant('Variablen.Ausführen'),
        icon: 'fa fa-search',
        onClick: () => {
          this.onSearchByButton();
      }
    };
    private subscription = new Subscription();

    constructor(injector: Injector,
        public variablenSandbox: VariablenSandbox,
        public utilService: UtilService,
        public translateService: TranslateService
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {
        this.initFunction();
        this.registerEvents();
    }

    initFunction() {
        this.variablenSandbox.getPersons({});
        this.variablenSandbox.getMitarbeiters({});
        this.variablenSandbox.getInitialDataSearch({});
    }

    private registerEvents(): void {
        this.subscription.add(this.variablenSandbox.PersonData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                this.dataPersons = response;
            }
        }));
        this.subscription.add(this.variablenSandbox.MitarbeiterData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                this.dataMitarbeiters = response;
            }
        }));
        this.subscription.add(this.variablenSandbox.SearchInitData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                // bind jahr data
                this.searchInitJahr = new Date().getFullYear().toString();
                if (response.data001 && response.data001[0] && response.data001[0].code) {
                    this.searchInitJahr = response.data001[0].code;
                }
                // bind Leistungsart
                if (response.data002) {
                    this.searchInitLeistungsart = response.data002;
                }
                // bind Sektion /team
                if (response.data003) {
                    this.searchInitSektion = response.data003;
                }
                // get export csv path
                if (response.data004 && response.data004[0] && response.data004[0].text) {
                    this.exportCsvPath = response.data004[0].text;
                }
            }
        }));
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    onSearch() {
        this.emitOnSearch.emit(true);
        this.variablenSandbox.getVariablens({
            Erhebungsjahr: !isNullOrUndefined(this.searchInitJahr) ? this.searchInitJahr : '',
            UserID: !isNullOrUndefined(this.userID) ? this.userID : '',
            KlientID: !isNullOrUndefined(this.baPersonID) ? this.baPersonID : '',
            BFSLeistungsartCode: (this.selectedLeistungsart && this.selectedLeistungsart.code) ? this.selectedLeistungsart.code : '',
            OrgUnit: (this.selectedSektion && this.selectedSektion.code) ? this.selectedSektion.code : '',
            NurStichtag: this.stichtag,
            NurAnfangszustand: this.anfangszustand,
            NurDossiertraeger: this.nurDossiertrager,
            ExcelExport: this.excelExport
        });
    }

    onSearchByEnter(event) {
        this.searchInitJahr = this.textBoxJahr.text;
        this.onSearch();
    }

    unregisterEvents() {
        this.subscription.unsubscribe();
    }

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

    ngAfterViewInit() {
        setTimeout(() => {
            this.stichtagCbx.instance.registerKeyHandler('enter', e => this.onSearchByEnter({ event: e }));
            this.anfangszustandCbx.instance.registerKeyHandler('enter', e => this.onSearchByEnter({ event: e }));
            this.nurDossiertragerCbx.instance.registerKeyHandler('enter', e => this.onSearchByEnter({ event: e }));
            this.excelExportCbx.instance.registerKeyHandler('enter', e => this.onSearchByEnter({ event: e }));
        });
    }

    setSelectedMitarbeiter(selectedMitarbeiterID) {
        this.userID = selectedMitarbeiterID;
    }
    setSelectedPerson(selectedPersonID) {
        this.baPersonID = selectedPersonID;
    }
    onKeyPress(event) {
        if (event.event.keyCode < AppEnums.KeyCode.KeyNumber0 || event.event.keyCode > AppEnums.KeyCode.KeyNumber9) {
            event.event.preventDefault();
        }
    }

    getSizeQualifier(width) {
        return (width < CommonConstant.SCREEN_RESOLUTION_LARGE) ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
    }

    onSearchContainerClick(event) {
        if (event.currentTarget.getElementsByClassName('dx-state-focused').length <= 0) {
            this.onSearch();
        }
    }

    onCollapseSearchContainer(event) {
        event.stopPropagation();
        this.isExpand = !this.isExpand;
    }

    onSearchByButton() {
        this.searchInitJahr = this.textBoxJahr.text;
        this.onSearch();
    }
}

