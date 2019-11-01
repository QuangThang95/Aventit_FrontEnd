import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FallNavNavigatorTreeModel, FallUserConfig } from '@app/kiss4-main/fall-navigator/models';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'kiss-fall-navigator-filter',
    templateUrl: './fall-navigator-filter.component.html',
    styleUrls: ['./fall-navigator-filter.component.scss']
})
export class FallNavigatorFilterComponent extends BaseComponent implements OnInit {
    @Output() filters: EventEmitter<any> = new EventEmitter();
    @Input() chkkategorieVisible: boolean;
    @Input() ahvNummerVisible: boolean;
    @Input() versichertennummerVisible: boolean;
    @Input() navigatorZusatzVisible: boolean;
    @Input() nNummerVisible: boolean;
    @Input() gemeindeVisible: boolean;
    @Input() kategorieVisible: boolean;
    @Input() fallPendenzenVisible: boolean;
    @Input() ckbActiveVisible: boolean;
    @Input() ckbClosedVisible: boolean;
    @Input() ckbArchivedVisible: boolean;
    @Input() ckbIncludeGroupVisible: boolean;
    @Input() ckbIncludeGuestVisible: boolean;

    filtersObject: any;
    storedUsersConfig: FallUserConfig[];
    newUsersConfig: FallUserConfig[];
    userConfig: FallUserConfig;
    currentUser: any;
    personCount = 0;
    taskCount = 0;
    treeList: FallNavNavigatorTreeModel[];

    filterCheckbox = {
        aktiv: 'aktiv',
        abgeschlossen: 'abgeschlossen',
        archiviert: 'archiviert',
        Gruppe: 'Gruppe',
        Gastrecht: 'Gastrecht'
    };

    constructor(
        injector: Injector,
        public translateService: TranslateService) {
        super(injector);
    }

    ngOnInit(): void {
        this.storedUsersConfig = new Array<FallUserConfig>();
        this.currentUser = localStorage.getItem('user:userId');
    }

    initEmitObject(value, key) {
        this.filtersObject = new Object({
            value: value,
            key: key
        });
    }

    /**
     * Handle event add or remove column
     * @param event
     */
    async onCheckbox(event, key) {
        this.initEmitObject(event, key);
        this.filters.emit(this.filtersObject);
        await this.setCookie();
    }

    /**
     * Set user setting to cookie
     */
    async setUsersConfig() {
        if (this.storedUsersConfig === []) {
            this.storedUsersConfig.forEach(element => {
                if (element.UserId === this.currentUser) {
                    this.newUsersConfig.push(this.userConfig);
                } else {
                    this.newUsersConfig.push(element);
                }
            });
        } else {
            this.newUsersConfig.push(this.userConfig);
        }
        await Cookie.set('FallUserConfig', JSON.stringify(this.newUsersConfig), 365);
    }

    /**
     * Storage user setting
     */
    async setCookie() {
        this.newUsersConfig = [];
        this.userConfig = new FallUserConfig();
        this.userConfig.UserId = this.currentUser;
        this.userConfig.ahvNummerChecked = this.ahvNummerVisible;
        this.userConfig.versichertennummerChecked = this.versichertennummerVisible;
        this.userConfig.navigatorZusatzChecked = this.navigatorZusatzVisible;
        this.userConfig.nNummerChecked = this.nNummerVisible;
        this.userConfig.gemeindeChecked = this.gemeindeVisible;
        this.userConfig.kategorieChecked = this.kategorieVisible;
        this.userConfig.fallPendenzenChecked = true;

        this.userConfig.ActiveChecked = this.ckbActiveVisible;
        this.userConfig.ArchivedChecked = this.ckbArchivedVisible;
        this.userConfig.ClosedChecked = this.ckbClosedVisible;

        this.userConfig.IncludeGroupChecked = this.ckbIncludeGroupVisible;
        this.userConfig.IncludeGuestChecked = this.ckbIncludeGuestVisible;

        await this.setUsersConfig();
    }
}

