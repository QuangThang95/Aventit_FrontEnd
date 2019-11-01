import {
    Component,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FallNavsSandbox } from '@app/kiss4-main/fall-navigator/fall-navigator.sandbox';
import { FallNavNavigatorTreeModel, FallUserConfig } from '@app/kiss4-main/fall-navigator/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxTreeListComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-fall-navigator-tree',
    templateUrl: './fall-navigator-tree.component.html',
    styleUrls: ['./fall-navigator-tree.component.scss'],
})
export class FallTreeComponent extends BaseComponent implements OnChanges {
    @ViewChild('treeListNavigator') treeComponent: DxTreeListComponent;

    @Output() navAction: EventEmitter<any> = new EventEmitter();
    @Output() selected: EventEmitter<any> = new EventEmitter();

    @Input() treeList: FallNavNavigatorTreeModel[];
    @Input() personCount: number;
    @Input() taskCount: number;
    @Input() bCaption: string;
    @Input() fCaption: string;
    @Input() sCaption: string;
    @Input() iCaption: string;
    @Input() mCaption: string;
    @Input() aCaption: string;
    @Input() kCaption: string;
    @Input() emitTreeObject: any;
    @Input() chkkategorieVisible: boolean;
    @Input() ahvNummerVisible: boolean;
    @Input() versichertennummerVisible: boolean;
    @Input() navigatorZusatzVisible: boolean;
    @Input() nNummerVisible: boolean;
    @Input() gemeindeVisible: boolean;
    @Input() kategorieVisible: boolean;
    @Input() fallPendenzenVisible: boolean;

    icon_Name_Url: any = 'assets/icon/characters-and-numbers/png/';
    icon_Characters_Url: any = 'assets/icon/characters-and-numbers/png/';

    navEmitObj: any;
    storedUsersConfig: FallUserConfig[];
    newUsersConfig: FallUserConfig[];
    userConfig: FallUserConfig;
    currentUser: any;
    selectedPerson: any;
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

    expandKey = [];
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

    constructor(
        injector: Injector,
        public fallNavSandbox: FallNavsSandbox,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    ngOnChanges(event) {
        if (!isNullOrUndefined(event.emitTreeObject)) {
            if (!isNullOrUndefined(event.emitTreeObject.currentValue)) {
                this.expandRow(event.emitTreeObject.currentValue.expandList);
                for (let i = 0; i < this.treeList.length; i++) {
                    if (this.treeList[i].id === this.idDiartisSupport) {
                        this.selected.emit(this.treeList[i]);
                        return;
                    }
                }
            }
        }
    }

    onContextMenuPreparing(event) {
        event.items = [];
    }

    /**
     * Handle color of column Kategorie
     * @param e
     */
    onCellPrepared(e) {
        if (e.rowType === 'data' && e.column.dataField === 'kategorie' && e.data.type === 'P') {
            e.cellElement.classList.add('finger');
            if (e.displayValue !== undefined) {
                e.cellElement.style.backgroundColor = e.data.farbe;
            }
        }
    }

    /**
     * Handle event user double click on tree list
     * @param event
     */
    isBbClick(event: any): void {
        const component = event.component;
        const prevClickTime = component.lastClickTime;
        component.lastClickTime = new Date();
        if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
            if (event.data.type === 'P') {
                if (this.selectedPerson.baPersonId !== undefined) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.bUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            } else {
                if (this.treeComponent.instance.isRowExpanded(event.key)) {
                    this.treeComponent.instance.collapseRow(event.key);
                } else {
                    this.treeComponent.instance.expandRow(event.key);
                }
            }
        }
    }

    /**
     * Handle user click on columns B, F, S, I, M, A, K, Kategorie, fäll. Pendenzen
     * @param event
     */
    public getSelectedCell(event: any): void {

        this.selectedPerson = event.data;
        this.selected.emit(this.selectedPerson);
        if (this.selectedPerson !== undefined && this.selectedPerson.baPersonId !== undefined && this.selectedPerson.type === 'P') {
            switch (event.column.caption) {
                case 'B':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.bUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case 'F':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.fUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case 'S':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.sUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case 'I':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.iUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case 'M':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.mUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case 'A':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.aUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case 'K':
                    if (event.value % 10 !== 0) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.kUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case this.actionStrings.kategorie:
                    if (this.selectedPerson.type === 'P') {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.fUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
                case this.actionStrings.fallPendenzen:
                    if (this.selectedPerson.fallTaskCount !== '' && this.selectedPerson.fallTaskCount !== null) {
                        this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.fUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                        this.navAction.emit(this.navEmitObj);
                    }
                    break;
            }
        }
    }

    /**
     * Handle hot key Alt + charactor
     * @param event
     */
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.selectedPerson !== undefined && this.selectedPerson.baPersonId !== undefined && this.selectedPerson.type === 'P') {
            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
                event.preventDefault();
                if (this.selectedPerson.b % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.bUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }

            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyR) {
                event.preventDefault();
                if (this.selectedPerson.f % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.fUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }

            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
                event.preventDefault();
                if (this.selectedPerson.s % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.sUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }

            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
                event.preventDefault();
                if (this.selectedPerson.i % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.iUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }

            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
                event.preventDefault();
                if (this.selectedPerson.m % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.mUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }

            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyQ) {
                event.preventDefault();
                if (this.selectedPerson.a % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.aUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }

            if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyK) {
                event.preventDefault();
                if (this.selectedPerson.k % 10 !== 0) {
                    this.initNavEmitObj(`${this.fallNavSandbox.getConfigPage('fallbearbeitung')}` + this.kUrl + `${this.selectedPerson.baPersonId}`, this.selectedPerson);
                    this.navAction.emit(this.navEmitObj);
                }
            }
        }
    }
    /**
     * Handle expand tree node
     */
    expandRow(list) {
        if (!isNullOrUndefined(this.treeComponent.instance)) {
            this.collapseAll();

            for (let i = 0; i < list.length; i++) {
                this.treeComponent.instance.expandRow(list[i]);
            }
            setTimeout(() => {
                this.treeComponent.instance.selectRows([this.idDiartisSupport], true);
            }, CommonConstant.SetTimeOut500);
        }
    }

    private collapseAll() {
        this.treeComponent.instance.forEachNode(node => {
            if (this.treeComponent.instance.isRowExpanded(node.parent.key)) {
                this.treeComponent.instance.collapseRow(node.parent.key);
            }
        });
    }

    initNavEmitObj(url, person) {
        this.navEmitObj = new Object({
            url: url,
            person: person
        });
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
}

