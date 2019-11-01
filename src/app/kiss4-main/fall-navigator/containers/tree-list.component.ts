import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FallNavsSandbox } from '@app/kiss4-main/fall-navigator/fall-navigator.sandbox';
import { FallNavNavigatorTreeModel, FallUserConfig } from '@app/kiss4-main/fall-navigator/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxTreeListComponent } from 'devextreme-angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'kiss-tree-list',
    templateUrl: './tree-list.component.html',
    styleUrls: ['./tree-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeListComponent extends BaseComponent implements OnInit, OnDestroy {
    @ViewChild('treeListNavigator') treeComponent: DxTreeListComponent;

    isNavbar = true;
    currentUrl: string;
    TreesData: Array<any>;
    icon_Name_Url: any = 'assets/icon/characters-and-numbers/png/';
    icon_Characters_Url: any = 'assets/icon/characters-and-numbers/png/';

    ahvNummerVisible: any;
    versichertennummerVisible: any;
    navigatorZusatzVisible: any;
    nNummerVisible: any;
    gemeindeVisible: any;
    kategorieVisible: any;
    fallPendenzenVisible: any;
    chkkategorieVisible: any;
    ckbActiveVisible: any;
    ckbClosedVisible: any;
    ckbArchivedVisible: any;
    ckbIncludeGroupVisible: any;
    ckbIncludeGuestVisible: any;
    storedUsersConfig: FallUserConfig[];
    newUsersConfig: FallUserConfig[];
    userConfig: FallUserConfig;
    currentUser: any;
    personCount = 0;
    taskCount = 0;
    selectedPerson: any;
    treeList: FallNavNavigatorTreeModel[];
    selectedKeys = [];
    idFallNavigator: string;
    bUrl = '/B/Basis/';
    fUrl = '/F/Fallfuhrung/';
    sUrl = '/S/Sozialhilfe/';
    iUrl = '/I/Inkasso/';
    mUrl = '/M/Kindes-undErwachsenenschutz/';
    aUrl = '/A/Asyl/';
    kUrl = '/K/Arbeit/';
    pendenzenUrl = '/offene/';

    actionStrings = {
        pendenzen: 'pendenzen',
        fall: 'fall',
        neuer: 'neuer',
        kategorie: 'Kategorie',
        fallPendenzen: 'fäll. Pendenzen'
    };

    bCaption = '';
    fCaption = '';
    sCaption = '';
    iCaption = '';
    mCaption = '';
    aCaption = '';
    kCaption = '';
    fallTitle = 'Fall-Navigator';
    idDiartisSupport = 'E2091';
    listBtn = [];

    filterCheckbox = {
        aktiv: 'aktiv',
        abgeschlossen: 'abgeschlossen',
        archiviert: 'archiviert',
        Gruppe: 'Gruppe',
        Gastrecht: 'Gastrecht'
    };

    customizeBtn = [
        {
            text: 'H005FallNavigator.Pendenzen',
            name: 'pendenzen'
        },
        {
            text: 'H005FallNavigator.Fall',
            name: 'fall'
        },
        {
            text: 'H005FallNavigator.neuerFall',
            name: 'neuer'
        }
    ];

    selectedActionList = [];
    popUpModel: PopUpModel;
    httpErrorCodes = [
        AppEnums.StatusCode.LIMIT_FILE_SIZE,
        AppEnums.StatusCode.XML_FORMAT,
        AppEnums.StatusCode.STATUS_CODE_421,
        AppEnums.StatusCode.UNPROCESSABLE_ENTITY,
        AppEnums.StatusCode.STATUS_CODE_428,
        AppEnums.StatusCode.BAD_REQUEST,
        AppEnums.StatusCode.STATUS_CODE_500,
        AppEnums.StatusCode.STATUS_CODE_404,
        AppEnums.StatusCode.STATUS_CODE_409];

    private subscriptions: Subscription[] = [];
    expandList = new Array<string>();
    emitTreeObject: any;

    constructor(
        injector: Injector,
        private router: Router,
        public fallNavSandbox: FallNavsSandbox,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
        router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        });
    }

    ngOnInit(): void {
        this.fallNavSandbox.registerEvents();
        this.titlePage = this.fallTitle;
        this.setTitle(this.titlePage);
        this.ahvNummerVisible = false;
        this.versichertennummerVisible = false;
        this.navigatorZusatzVisible = false;
        this.nNummerVisible = false;
        this.gemeindeVisible = false;
        this.kategorieVisible = false;
        this.fallPendenzenVisible = true;
        this.ckbActiveVisible = true;
        this.ckbClosedVisible = false;
        this.ckbArchivedVisible = false;
        this.ckbIncludeGroupVisible = false;
        this.ckbIncludeGuestVisible = false;
        this.storedUsersConfig = new Array<FallUserConfig>();
        this.registerEvents();
        this.fallNavSandbox.FallNavFilterWithIncludeTasks(true);
        this.fallNavSandbox.loadHeader();
        this.fallNavSandbox.loadKategorieConfig({
            keyPath: `${'System\\Fallfuehrung\\Kategorisierung'}`,
            defaultValue: false
        });

        this.currentUser = localStorage.getItem('user:userId');
        this.treeList = [];
        this.initPopUpModel();
    }

    ngOnDestroy() {
        this.unregisterEvents();
        this.fallNavSandbox.unregisterEvents();
    }

    unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onDeleteSelectedAction(itemData: any) {
        this.fallNavSandbox.deleteSelectedItems(itemData);
    }

    private registerEvents(): void {
        this.subscriptions.push(
            this.layoutSandbox.selectedAction$.subscribe(data => {
                this.selectedActionList = [];
                data.forEach(element => {
                    this.selectedActionList.push(element.id);
                });
            }),
            this.fallNavSandbox.headers$.subscribe(fallHeaders => {
                if (!isNullOrUndefined(fallHeaders)) {
                    if (this.httpErrorCodes.includes(fallHeaders.status)) {
                        const message = JSON.parse(fallHeaders._body);
                        this.initPopUpModel();
                        this.showPopup(message.message);
                    } else {
                        if (fallHeaders.length > 0) {
                            this.bCaption = fallHeaders[0].shortName;
                            this.fCaption = fallHeaders[1].shortName;
                            this.sCaption = fallHeaders[2].shortName;
                            this.iCaption = fallHeaders[3].shortName;
                            this.mCaption = fallHeaders[4].shortName;
                            this.aCaption = fallHeaders[5].shortName;
                            this.kCaption = fallHeaders[6].shortName;
                        }
                    }
                }
            }),
            this.fallNavSandbox.configBool$.subscribe(config => {
                if (!isNullOrUndefined(config)) {
                    if (this.httpErrorCodes.includes(config.status)) {
                        const message = JSON.parse(config._body);
                        this.initPopUpModel();
                        this.showPopup(message.message);
                    } else {
                        try {
                            if (config === false) {
                                this.chkkategorieVisible = false;
                                this.kategorieVisible = false;
                            } else {
                                this.chkkategorieVisible = true;
                            }
                        } finally {
                            this.getUserConfig();
                        }
                    }
                }
            }),
            this.fallNavSandbox.fallNavDatas$.subscribe(fallNav => {
                if (!isNullOrUndefined(fallNav)) {
                    if (this.httpErrorCodes.includes(fallNav.status)) {
                        const message = JSON.parse(fallNav._body);
                        this.initPopUpModel();
                        this.showPopup(message.message);
                    } else {
                        this.treeList = fallNav;
                        this.treeList.forEach(element => {
                            if (isNullOrUndefined(element.ahvNummer)) {
                                element.ahvNummer = '';
                            }
                            if (isNullOrUndefined(element.nNummer)) {
                                element.nNummer = '';
                            }
                            if (isNullOrUndefined(element.navigatorZusatz)) {
                                element.navigatorZusatz = '';
                            }
                            if (isNullOrUndefined(element.gemeinde)) {
                                element.gemeinde = '';
                            }
                            if (isNullOrUndefined(element.kategorie)) {
                                element.kategorie = '';
                            }
                            if (isNullOrUndefined(element.versichertennummer)) {
                                element.versichertennummer = '';
                            }
                            if (isNullOrUndefined(element.fallTaskCount)) {
                                element.fallTaskCount = '';
                            }
                            this.taskCount = element.taskCount;
                            if (!isNullOrUndefined(element.farbe) && element.farbe.slice(0, 2) === '0x') {
                                element.farbe = '#' + (element.farbe + '').slice(2);
                            }
                        });
                        this.expandRow();
                    }
                }
            }),
            // this.fallfuhrungTreeSandbox.loadFallNavigator$.subscribe(data => {
            //     if (data) {
            //         this.idFallNavigator = data.dataFallNavigator;
            //     }
            // }),

        );
    }

    /**
     * Handle Anzahl Personen when tree list change
     */
    countPerson() {
        this.personCount = 0;
        this.treeList.forEach(element => {
            if (element.type === 'P') {
                this.personCount++;
            }
        });
    }

    /**
     * Handle event user click on title button
     * @param e
     */
    toolBarOnItemClick(e) {
        if (this.selectedPerson !== undefined && this.selectedPerson.baPersonId !== undefined) {
            switch (e) {
                case this.actionStrings.pendenzen: {
                    this.fallNavSandbox.redirectTo(`${this.fallNavSandbox.getConfigPage('Pendenzenverwaltung')}` + this.pendenzenUrl + `${this.selectedPerson.baPersonId}`);
                    return;
                }
                case this.actionStrings.fall: {
                    if (this.selectedPerson.type === 'P' && this.isMaxSelectedAction()) {
                        this.fallNavSandbox.redirectTo(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.bUrl + `${this.selectedPerson.baPersonId}`);
                        this.fallNavSandbox.selectAction(this.selectedPerson, `${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.bUrl + `${this.selectedPerson.baPersonId}`);
                    }
                    return;
                }
                case this.actionStrings.neuer: {
                    return;
                }
            }
        }
    }

    /**
     * Get user setting from cookie
     */
    getUserConfig() {
        this.storedUsersConfig = JSON.parse(Cookie.get('FallUserConfig'));
        this.currentUser = localStorage.getItem('user:userId');
        if (this.storedUsersConfig !== [] && this.storedUsersConfig !== null) {
            this.userConfig = this.storedUsersConfig.find(element => element.UserId === this.currentUser);
            if (this.userConfig !== undefined) {
                this.ahvNummerVisible = this.userConfig.ahvNummerChecked;
                this.versichertennummerVisible = this.userConfig.versichertennummerChecked;
                this.navigatorZusatzVisible = this.userConfig.navigatorZusatzChecked;
                this.nNummerVisible = this.userConfig.nNummerChecked;
                this.gemeindeVisible = this.userConfig.gemeindeChecked;
                this.ckbArchivedVisible = this.userConfig.ArchivedChecked;
                this.ckbClosedVisible = this.userConfig.ClosedChecked;
                this.ckbIncludeGroupVisible = this.userConfig.IncludeGroupChecked;
                this.ckbIncludeGuestVisible = this.userConfig.IncludeGuestChecked;
                this.ckbActiveVisible = this.userConfig.ActiveChecked;

                if (this.chkkategorieVisible === true) {
                    this.kategorieVisible = this.userConfig.kategorieChecked;
                }

                this.fallNavSandbox.FallNavFilterWithIncludeTasks(true);
                this.fallNavSandbox.FallNavFilterWithArchive(this.userConfig.ArchivedChecked);
                this.fallNavSandbox.FallNavFilterWithClosed(this.userConfig.ClosedChecked);
                this.fallNavSandbox.FallNavFilterWithIncludeGroup(this.userConfig.IncludeGroupChecked);
                this.fallNavSandbox.FallNavFilterWithIncludeGuest(this.userConfig.IncludeGuestChecked);
                this.fallNavSandbox.FallNavFilterWithActive(this.userConfig.ActiveChecked);
            }
        }
    }

    /**
     * Handle expand tree node
     */
    expandRow() {
        this.expandList = new Array();
        this.expandList.push(this.idDiartisSupport);
        if (!isNullOrUndefined(this.idFallNavigator)) {
            this.selectedKeys = [this.idFallNavigator];
            if (this.idFallNavigator !== this.idDiartisSupport) {
                this.expandList.push(this.idFallNavigator);
            }
        }
        this.treeList.forEach(element => {
            if (element.parentId === null || element.parentId === '0') {
                if (!this.expandList.includes(element.id)) {
                    this.expandList.push(element.id);
                }
            }
        });
        this.emitTreeObject = new Object({
            expandList: this.expandList
        });
    }

    isMaxSelectedAction(): boolean {
        if (this.selectedActionList.length >= 20 && !this.selectedActionList.includes(this.selectedPerson.id)) {
            this.initPopUpModel();
            this.showPopup(this.translateService.instant('H005FallNavigator.MaxSelected'));
            return false;
        } else {
            return true;
        }
    }

    initPopUpModel() {
        this.popUpModel = new PopUpModel(
            {
                title: '',
                isVisibleTitle: true,
                isVisible: false,
                message: '',
                textYes: '',
                isVisibleYes: false,
                textNo: '',
                isVisibleNo: false,
                funcYes: null,
                funcNo: null,
            }
        );
    }

    showPopup(message) {
        this.popUpModel.message = message;
        this.popUpModel.title = this.translateService.instant('H005FallNavigator.Information');
        this.popUpModel.isVisible = true;
    }

    handleCheckboxEvent(event) {
        switch (event.key) {
            case 'aktiv':
                this.ckbActiveVisible = event.value;
                this.fallNavSandbox.FallNavFilterWithActive(event.value);
                break;
            case 'abgeschlossen':
                this.ckbClosedVisible = event.value;
                this.fallNavSandbox.FallNavFilterWithClosed(event.value);
                break;
            case 'archiviert':
                this.ckbArchivedVisible = event.value;
                this.fallNavSandbox.FallNavFilterWithArchive(event.value);
                break;
            case 'Gruppe':
                this.ckbIncludeGroupVisible = event.value;
                this.fallNavSandbox.FallNavFilterWithIncludeGroup(event.value);
                break;
            case 'Gastrecht':
                this.ckbIncludeGuestVisible = event.value;
                this.fallNavSandbox.FallNavFilterWithIncludeGuest(event.value);
                break;
            case 'AHV':
                this.ahvNummerVisible = event.value;
                break;
            case 'Zusatz':
                this.navigatorZusatzVisible = event.value;
                break;
            case 'fallPendenzen':
                this.fallPendenzenVisible = event.value;
                break;
            case 'NNr':
                this.nNummerVisible = event.value;
                break;
            case 'Gemeinde':
                this.gemeindeVisible = event.value;
                break;
            case 'VersNr':
                this.versichertennummerVisible = event.value;
                break;
            case 'Kategorie':
                this.kategorieVisible = event.value;
                break;
        }
    }

    handleNavigationAction(event) {
        if (this.isMaxSelectedAction()) {
            this.fallNavSandbox.redirectTo(event.url);
            this.fallNavSandbox.selectAction(event.person, event.url);
        }
    }

    handleSelection(event) {
        this.selectedPerson = event;
    }
}

