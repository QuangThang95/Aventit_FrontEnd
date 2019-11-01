import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserForm } from '@app/auth/models';
import { BrowserVersions, DatabaseInfo, DatabaseVersions, Kiss4WebVersion, KissVersion } from '@app/kiss4-main/uber/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { UberConstant } from '@shared/common/uber.common';
import { BaseComponent } from '@shared/components/base.component';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { NotificationsService } from 'angular2-notifications';
import { DxButtonComponent, DxDateBoxComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { UberAssembliesComponent } from '../components/uber-assemblies/uber-assemblies.component';
import { UberDatenbankVersionenComponent } from '../components/uber-datenbank-versionen/uber-datenbank-versionen.component';
import { UberSpeicherComponent } from '../components/uber-speicher/uber-speicher.component';
import { UbersSandbox } from '../uber.sandbox';

@Component({
    selector: 'kiss-uber',
    templateUrl: './uber.component.html',
    styleUrls: ['./uber.component.scss']
})
@SetClassRight('Ctluber')
export class UberComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(DxDateBoxComponent) dateBox: DxDateBoxComponent;
    @ViewChild('btnDatabank') btnDatabank: DxButtonComponent;
    @ViewChild('btnDatabankVersion') btnDatabankVersion: DxButtonComponent;
    @ViewChild('btnAssemblies') btnAssemblies: DxButtonComponent;
    @ViewChild('btnSpeicher') btnSpeicher: DxButtonComponent;
    @ViewChild('btnRefreshData') btnRefreshData: DxButtonComponent;
    @ViewChild('btnRefreshAssemblies') btnRefreshAssemblies: DxButtonComponent;
    @ViewChild('btnRefreshSpeicher') btnRefreshSpeicher: DxButtonComponent;
    @ViewChild('datenbankversionen') dataBankVersion: UberDatenbankVersionenComponent;
    @ViewChild('assemblies') assemblies: UberAssembliesComponent;
    @ViewChild('speicher') speicher: UberSpeicherComponent;



    customizeBtn = [{
        text: 'www.diartis.ch',
        visible: true,
        name: 'diartis',
        nameRightClick: 'rightclick-diartis',
        id: 'btn-link',
        class: 'kiss-btn-link cursor-pointer'
    }];
    pageTitle: string;
    toolbarControl = {
        isUberVisible: false,
        isDatenBankVisible: false,
        isDatenbankversionenVisible: false,
        isAssembliesVisible: false,
        isSpeicherVisible: false,
    };
    gridClickName: string = undefined;
    isNavbar: boolean;
    isClick = false;
    checkBoxesMode: string;
    popupVisible: any;
    dataMemoEditieren: any;
    cultureInfo: any;
    databaseInfo = new DatabaseInfo();
    browserVersions: BrowserVersions[] = [];
    versionChorme = new BrowserVersions();
    databaseVersion: DatabaseVersions;
    databaseVersions: DatabaseVersions[];
    kissVersion: KissVersion;
    kiss4WebVersion: Kiss4WebVersion;
    kiss4WebVersions: Kiss4WebVersion[];
    kissVer = new Kiss4WebVersion();
    xUser?: UserForm;
    userInfo: string;
    private subscription: Subscription[] = [];
    lineBreak = '&#13;&#10';
    isRowIndicator = true;
    popUpModel: PopUpModel;
    nameDirect: string;
    selectedGridKiss4WebVersionsKeys = [];
    selectedGridSpeicherKeys = [];
    selectedKeys = [];
    nameContainer: string;
    nameButton: string;

    constructor(
        injector: Injector,
        private ref: ChangeDetectorRef,
        public uberSandbox: UbersSandbox,
        public translateService: TranslateService,
        private notificationsService: NotificationsService,
        private moduleConfigSandbox: ModuleConfigSandbox) {
        super(injector);
        this.checkBoxesMode = 'none'; // "onclick" for enable checkbox

    }

    ngOnInit() {
        this.pageTitle = UberConstant.UBER;
        this.setTitle(UberConstant.UBER);
        this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
        this.loadUserInfo();
        this.loadDataUber();
        this.registerEvents();
        this.getversion();
        this.popupVisible = false;
        this.initPopUpModel();
    }

    ngAfterViewInit() {
        // TODO fix de tester test --> update theo module cua component
        this.moduleConfigSandbox.updateInitialParameters({
            moduleClassName: 'FrmModulConfig',
            menuItemClassName: 'CtlKostenart',
            parentMenuItemID: 855,
        });
    }

    ngOnDestroy() {
        this.unregister();
    }

    private loadDataUber(): void {
        if (!isNullOrUndefined(this.xUser) && !isNullOrUndefined(this.xUser.languageCode)) {
            this.uberSandbox.loadCultureInfo(this.xUser.languageCode);
        }
        this.uberSandbox.loadDatabaseInfo();
        this.uberSandbox.loadDatabaseVersions();
        this.uberSandbox.loadKiss4WebVersion();
    }

    private registerEvents() {
        this.subscription.push(this.uberSandbox.cultureInfoData$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                    const body = JSON.parse(data._body);
                    const message = body.message.toString();
                    this.showPopup(message);
                    return;
                }
                this.cultureInfo = data.value2;
            }
        }));

        this.subscription.push(this.uberSandbox.databaseInfoData$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                    const body = JSON.parse(data._body);
                    const message = body.message.toString();
                    this.showPopup(message);
                    return;
                }
                this.databaseInfo = data;
            }
        }));

        this.subscription.push(this.uberSandbox.databaseVersions$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                    const body = JSON.parse(data._body);
                    const message = body.message.toString();
                    this.showPopup(message);
                    return;
                }
                this.databaseVersions = data;
            }
        }));
        this.subscription.push(this.uberSandbox.kiss4WebVersion$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                    const body = JSON.parse(data._body);
                    const message = body.message.toString();
                    this.showPopup(message);
                    return;
                }
                this.kissVersion = data;
                this.kiss4WebVersions = [];
                this.kiss4WebVersions.push(this.convertKiss4WebVersion('KiSS4Web', this.kissVersion.version));
                this.kiss4WebVersions.push(this.convertKiss4WebVersion('KiSS4WebClient', this.getVersionWebClient()));
            }
        }));
    }

    loadUserInfo() {
        const userSession = sessionStorage.getItem('user:Xuser') ? sessionStorage.getItem('user:Xuser') : '';
        this.userInfo = '';
        if (userSession) {
            const user = JSON.parse(userSession);
            if (!isNullOrUndefined(user)) {
                this.xUser = new UserForm(user[0]);
                if (this.xUser.lastName) {
                    this.userInfo += this.xUser.lastName;
                }
                if (this.xUser.firstName) {
                    this.userInfo += ', ' + this.xUser.firstName;
                }
                if (!isNullOrUndefined(this.xUser.logonName) || !isNullOrUndefined(this.xUser.userID)) {
                    this.userInfo += ' (';
                    if (this.xUser.logonName) {
                        this.userInfo += this.xUser.logonName;
                    }
                    if (this.xUser.userID) {
                        this.userInfo += ', ' + this.xUser.userID;
                    }
                    this.userInfo += ')';
                }
            }
        }
    }

    convertKiss4WebVersion(name: string, version: string): Kiss4WebVersion {
        const kiss4Web = new Kiss4WebVersion();
        kiss4Web.name = name;
        kiss4Web.version = version;
        return kiss4Web;
    }

    getversion() {
        const nAgt = navigator.userAgent;
        let browserName = navigator.appName;
        let fullVersion = '' + parseFloat(navigator.appVersion);
        let majorVersion = parseInt(navigator.appVersion, 10);
        let verOffset, ix;
        this.browserVersions = [];
        // In Chrome, the true version is after "Chrome"
        if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
            browserName = 'Google Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(';')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(' ')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        this.versionChorme.name = browserName;
        this.versionChorme.version = fullVersion;
        this.browserVersions.push(this.versionChorme);
    }

    fomatInnerHTML(info, fomatbottom) {
        const datePipe = new DatePipe('en-US');
        const date = datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss');
        return info + date.toString() + fomatbottom;
    }

    actionAssembliesKopiFrm1OnClick() {
        const title = 'Über';
        const content = this.translateService.instant('Uber.Message.MessageDatenbank');
        const aboutInformation = 'About Information - ';
        const fomatBottom = this.lineBreak + '-----------------------------------------------------------' + this.lineBreak + 'KiSS4' + this.lineBreak + this.lineBreak;
        const selBox = document.createElement('textarea');
        const userinfo = this.userInfo ? this.userInfo : '';
        const admin = this.xUser.isUserBIAGAdmin + ' (BIAG Admin)';
        const generalAdmin = this.xUser.isUserAdmin + ' (Admin)';
        const userName = this.xUser.isUserBIAGAdmin ? admin : (this.xUser.isUserAdmin && !this.xUser.isUserBIAGAdmin) ? generalAdmin : null;
        const language = this.xUser.languageCode ? this.xUser.languageCode : null;
        const cultureInfo = this.cultureInfo ? this.cultureInfo : '';
        const copyText = 'User:' + userinfo + this.lineBreak + 'Administrator: ' + userName + this.lineBreak + 'LanguageCode: ' + language + this.lineBreak + this.lineBreak + this.lineBreak + 'CultureInfo: ' + cultureInfo;
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.color = 'red';
        selBox.innerHTML = this.fomatInnerHTML(aboutInformation, fomatBottom) + copyText;
        document.body.appendChild(selBox);
        window.setTimeout(() => this.copyToClipboard(selBox, title, content));
    }

    actionDatenbankKopiFrm2OnClick(text: string) {
        const title = 'Datenbank';
        const content = this.translateService.instant('Uber.Message.MessageDatenbank');
        const aboutdatabase = 'About Database - ';
        const fomatbottom = this.lineBreak + '-----------------------------------------------------------' + this.lineBreak;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        const regex = new RegExp(String.fromCharCode(160), 'g');
        const patten = '(:\n|:\r\n|:\r)';
        const serverInfoTitle = this.translateService.instant('Uber.Title_Grid.ServerInformation');
        const dataBaseInfoTitle = this.translateService.instant('Uber.Title_Grid.Databaseinformation');
        const sessionInfoTitle = this.translateService.instant('Uber.Title_Grid.Sessioninformation');
        selBox.innerHTML = this.fomatInnerHTML(aboutdatabase, fomatbottom) + text.replace(new RegExp(patten, 'g'), ': ')
            .replace(serverInfoTitle, serverInfoTitle + this.lineBreak)
            .replace(dataBaseInfoTitle, this.lineBreak + dataBaseInfoTitle + this.lineBreak)
            .replace(sessionInfoTitle, this.lineBreak + sessionInfoTitle + this.lineBreak);
        document.body.appendChild(selBox);
        window.setTimeout(() => this.copyToClipboard(selBox, title, content));
    }

    actionDatenbankVersionenKopiFrm3OnClick(gridDatabaseVersion) {
        let databaseVersions = [];
        databaseVersions = gridDatabaseVersion.instance.getDataSource().items();
        const aboutVersions = 'Database Versions - ';
        const fomatbottom = this.lineBreak + '-----------------------------------------------------------' + this.lineBreak;
        const datePipe = new DatePipe('en-US');
        const title = 'Datenbank-Versionen';
        const content = this.translateService.instant('Uber.Message.MessageDatenbank-Versionen');
        const strdata = databaseVersions.reduce((acc, item) => acc + 'Id=\''
            + item.id + '\';Active=\'' + (item.active ? item.active : 0) + '\';Version=\'' + item.version + '\';VersionDate=\'' + datePipe.transform(item.versionDate, 'dd.MM.yyyy HH:mm:ss')
            + '\';BackwardCompatibleToClient=\'' + item.backwardCompatibleToClient + '\';Description=\'' + item.description + '\';DateCreated=\'' + item.dateCreated + '\';DateModified=\''
            + datePipe.transform(item.dateModified, 'dd.MM.yyyy HH:mm:ss') + '\';ChangesSinceLastVersion=\'' + (item.changesSinceLastVersion ? item.changesSinceLastVersion.replace(/(?:\r\n|\r|\n)/g, ';') : '') + '\'&#13;&#10;', '');

        const selBox = document.createElement('textarea');
        selBox.setAttribute('readonly', '');
        selBox.style.position = 'absolute';
        selBox.style.left = '-9999px';
        selBox.innerHTML = this.fomatInnerHTML(aboutVersions, fomatbottom) + strdata;
        document.body.appendChild(selBox);
        window.setTimeout(() => this.copyToClipboard(selBox, title, content));
    }

    actionAssembliesKopiFrm4OnClick(gridKiss4WebVersions) {
        let kiss4WebVersions = [];
        kiss4WebVersions = gridKiss4WebVersions.instance.getDataSource().items();
        const aboutVersions = 'Available Assemblies - ';
        const fomatbottom = this.lineBreak + '-----------------------------------------------------------' + this.lineBreak;
        const title = 'Assemblies';
        const content = this.translateService.instant('Uber.Message.MessageAssemblies');
        const datePipe = new DatePipe('en-US');
        const date = datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss');
        const str = kiss4WebVersions.reduce((acc, item) =>
            acc + 'Name=\'' + item.name + '\';Version=\'' + item.version + '\';&#13;&#10;', '');
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.color = 'red';
        selBox.innerHTML = this.fomatInnerHTML(aboutVersions, fomatbottom) + str;
        document.body.appendChild(selBox);
        window.setTimeout(() => this.copyToClipboard(selBox, title, content));
    }

    actionSpeicherKopiFrm5OnClick() {
        const aboutVersions = 'Process Information - ';
        const fomatbottom = this.lineBreak + '-----------------------------------------------------------' + this.lineBreak;
        const title = 'Speicher';
        const content = this.translateService.instant('Uber.Message.MessageSuccsess');
        const datePipe = new DatePipe('en-US');
        const date = datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss');
        const str = this.browserVersions.reduce((acc, item) =>
            acc + 'Name=\'' + item.name + '\';Version=\'' + item.version + '\';&#13;&#10;', '');
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.color = 'red';
        selBox.innerHTML = this.fomatInnerHTML(aboutVersions, fomatbottom) + str;
        document.body.appendChild(selBox);
        window.setTimeout(() => this.copyToClipboard(selBox, title, content));
    }

    copyToClipboard(selBox, title, content) {
        selBox.select();
        const success = document.execCommand('copy');
        document.body.removeChild(selBox);
        if (success) {
            this.showPopup(content);
            this.ref.detectChanges();
        }
    }

    actionAssembliesAnsichtFrm4OnClick(gridKiss4WebVersions) {
        gridKiss4WebVersions.instance.clearFilter();
        gridKiss4WebVersions.instance.clearSelection();
        gridKiss4WebVersions.instance.clearSorting();
    }

    actionSpeicherAnsichtFrm5OnClick(gridSpeicher) {
        gridSpeicher.instance.clearFilter();
        gridSpeicher.instance.clearSelection();
        gridSpeicher.instance.clearSorting();
    }

    selectRowDatenbankVersionen(e) {
        this.isClick = true;
        if (!isNullOrUndefined(e.data.changesSinceLastVersion)) {
            this.dataMemoEditieren = e.data.changesSinceLastVersion.replace(/<br\s*[\/]?>/gi, '\r\n');
        } else {
            this.dataMemoEditieren = null;
        }
    }

    showDatenbankVersionenPopup() {
        if (!this.isClick) {
            this.popupVisible = false;
            return;
        }
        if (isNullOrUndefined(this.dataMemoEditieren)) {
            this.showPopup(this.translateService.instant('Uber.Message.MessageErr'));
        } else {
            this.popupVisible = true;

        }
    }

    closePopup() {
        this.popupVisible = false;
    }

    private unregister() {
        this.subscription.forEach(i => i.unsubscribe());
    }

    onClickGrid(e) {
        if (this.gridClickName !== e) {
            this.gridClickName = e;
        }
        switch (e) {
            case 'gridDatenBankVersionen': {
                this.assemblies.removeselectedGridKiss4WebVersionsKeys();
                this.speicher.removeSelectedGridSpeicherKeys();
                break;
            }
            case 'gridAssemblies': {
                this.dataBankVersion.reMoveSelectedRowKey();
                this.speicher.removeSelectedGridSpeicherKeys();
                break;
            }
            case 'gridSpeicher': {
                this.dataBankVersion.reMoveSelectedRowKey();
                this.assemblies.removeselectedGridKiss4WebVersionsKeys();
                break;
            }
            default: break;
        }
    }

    // get version in file package.json
    getVersionWebClient() {
        return require('../../../../../package.json').version;
    }

    initPopUpModel() {
        this.popUpModel = new PopUpModel(
            {
                title: '',
                isVisibleTitle: true,
                isVisible: false,
                message: '',
                textYes: '',
                isVisibleYes: true,
                textNo: '',
                isVisibleNo: true,
                funcYes: null,
                funcNo: null,
            }
        );
    }

    showPopup(message) {
        this.popUpModel.isVisible = true;
        this.popUpModel.message = message;
        this.popUpModel.title = this.translateService.instant('Uber.Message.Title');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
    }

    toolBarOnItemClickTopGrd(e) {
        if (e === 'diartis' || e === 'rightclick-diartis') {
            this.nameDirect = e;
            window.open('http://www.diartis.ch');
        }
    }
}
