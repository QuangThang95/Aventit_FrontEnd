import { UtilService } from './../utilites/utility.service';
import { User } from './../models/auth/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sandbox } from '../sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '../store';
import * as authActions from '../store/actions/auth.actions';
import * as settingsActions from '../store/actions/settings.actions';
import * as layoutsActions from '../store/actions/layout.actions';
import { Subscription, Subject } from 'rxjs';
import { SelectedActionsModel } from '@shared/models';
import { AppEnums } from '@shared/AppEnum';

@Injectable()
export class LayoutSandbox extends Sandbox {

    public selectedLang$ = this.appState$.select(store.getSelectedLanguage);
    public availableLanguages$ = this.appState$.select(store.getAvailableLanguages);
    public itemMenus$ = this.appState$.select(store.getMenusData);
    public searchBoxsData$ = this.appState$.select(store.getSearchBoxDatasData);
    public dossierDetail$ = this.appState$.select(store.getSelectedActions );
    public scrollChanged = new Subject<any>();

    public deletingSticky;

    private subscriptions: Array<Subscription> = [];

    constructor(
        protected appState$: Store<store.State>,
        private utilService: UtilService,
        private router: Router
    ) {
        super(appState$);
        this.registerEvents();
    }

    public selectLanguage(lang: any): void {
        this.appState$.dispatch(new settingsActions.SetLanguageAction(lang.code));
        this.appState$.dispatch(new settingsActions.SetCultureAction(lang.culture));
        this.utilService.usesLang(lang.code);
        this.culture$.subscribe(cultureLang => {
            if (localStorage.getItem('currentLang.Culture') !== cultureLang) {
                this.loadMenus();
            }
        });
    }

    public logout() {
        this.appState$.dispatch(new authActions.DoLogoutSuccessAction(null));
        this.subscribeToLoginChanges();
    }

    private subscribeToLoginChanges() {
        this.loggedUser$
            .subscribe((user: User) => {
                if (!user.isLoggedIn) {
                    localStorage.clear();
                    this.clearStore();
                    this.unregisterEvents();
                    window.location.assign('/');
                    // this.router.navigate([this.utilService.getConfig('page').login]);
                }
            });
    }

    /**
    * Loads Menus from the server
    */
    public loadMenus(): void {
        this.appState$.dispatch(new layoutsActions.LoadMenuAction());
    }

    /**
     * Select menu header
     * @param e item menu clicked
     */
    public selectMenu(menu: any): void {
        if (!menu || menu.url === '' || menu.url === undefined) { return; }
        const splitUrl = menu.url.toString().split('/');
        const parseUrl = menu.caption === 'ber' ? 'uber' : menu.caption;
        const tmpUrl = '/' + splitUrl[1] + '/' + parseUrl;
        menu['iconId'] = 'folder-open';
        menu['type'] = 'flag_menu';
        menu['parseUrl'] = tmpUrl;
        this.selectAction(menu, tmpUrl);
        // this.router.navigate([menu.url]);
    }

    /**
     * Loads selectAction from the server
     */
    public selectAction(treeModel, url: string) {
        const actions: SelectedActionsModel = {
            id: treeModel.id,
            name: `${treeModel.name}`,
            time: new Date(),
            data: treeModel,
            url: url,
            age: treeModel['age'] ? treeModel['age'] : 0,
            gender: treeModel['geschlechtName'] ? treeModel['geschlechtName'].split('')[0] : 'n',
            type: treeModel.type === 'flag_menu' ? AppEnums.PageType.menu : AppEnums.PageType.dossier
        };
        this.appState$.dispatch(new settingsActions.UpdateSelectedAction(actions));
        this.router.navigate([actions.url]);
    }

    /**
     * Update selectAction from the server
     */
    public updateSelectedAction(actions) {
        this.appState$.dispatch(new settingsActions.UpdateSelectedAction(actions));
    }
    /**
     * Update Or Add Sticky
     */
    public updateOrAddSticky(treeModel, url: string) {
        const actions: SelectedActionsModel = {
            id: treeModel.id,
            name: `${treeModel.name}`,
            time: new Date(),
            data: treeModel,
            url: url,
            age: treeModel['age'] ? treeModel['age'] : 0,
            gender: treeModel['geschlechtName'] ? treeModel['geschlechtName'].split('')[0] : 'n',
            type: treeModel.type === 'flag_menu' ? AppEnums.PageType.menu : AppEnums.PageType.dossier
        };
        this.appState$.dispatch(new settingsActions.UpdateOrAddStickyAction(actions));
    }
    /**
    * Loads getConfigPage from the server
    */
    public getConfigPage(key: string) {
        return this.utilService.getConfig('page')[key];
    }
    /**
     * Loads SearchBoxDatas from the server
     */
    public loadSearchBoxDatas(): void {
        this.appState$.dispatch(new layoutsActions.LoadSearchBoxDataAction());
    }

    /**
     * Delete SelectedAction from the server
     */
    public deleteSelectedActionItems(item): void {
        this.appState$.dispatch(new settingsActions.DeleteItemSelectedAction(item));
        this.clearDeletingSticky();
    }

    /**
     * Router controller
     */
    public redirectTo(url: string): void {
        this.router.navigate([url]);
    }
    /**
     * Unsubscribes from events
     */
    public unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Subscribes to events
     */
    private registerEvents(): void {
        this.loadMenus();
        this.loadSearchBoxDatas();
    }

    /**
     * Clear store after logout for Layout Sandbox
     */
    private clearStore(): void {
        store.getSelectedLanguage.release();
        store.getAvailableLanguages.release();
        store.getMenusData.release();
        store.getSearchBoxDatasData.release();
    }

    public getDeletingSticky() {
        return this.deletingSticky;
    }

    public setDeletingSticky(value) {
        this.deletingSticky = value;
    }

    public clearDeletingSticky() {
        this.deletingSticky = undefined;
    }
}
