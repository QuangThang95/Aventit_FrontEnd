import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '@shared/utilites/utility.service';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as fallNavStore from '@app/kiss4-main/fall-navigator/store';
import * as fallNavActions from '@app/kiss4-main/fall-navigator/store/actions/fall-navigator.actions';
import * as settingsActions from '@shared/store/actions/settings.actions';
import { FallNavNavigatorTreeModel, FallNavFilterModel } from './models';
import { SelectedActionsModel } from '@shared/models/shared/selectedActions.model';
import { Subscription } from 'rxjs/Subscription';
import { AppEnums } from '@shared/AppEnum';

@Injectable()
export class FallNavsSandbox extends Sandbox {
    public fallNavDatas$ = this.fallNavState$.pipe(select(fallNavStore.getFallNavTreesData));
    public filterFallNav$ = this.fallNavState$.pipe(select(fallNavStore.getFiltersFallNav));
    public fallNavLoading$ = this.fallNavState$.pipe(select(fallNavStore.getFallNavTreesLoading));
    public configBool$ = this.fallNavState$.pipe(select(fallNavStore.getConfigsFallNav));
    public headers$ = this.fallNavState$.pipe(select(fallNavStore.getHeadersFallNav));
    private subscriptions: Subscription[] = [];

    constructor(
        protected appState$: Store<store.State>,
        private fallNavState$: Store<fallNavStore.FallNavNavState>,
        private utilService: UtilService,
        private router: Router,
        private route: ActivatedRoute) {
        super(appState$);
    }

    /**
    * Dispatches an action to select action on tree details
    */
    public selectAction(treeModel: FallNavNavigatorTreeModel, url: string): void {
        const actions: SelectedActionsModel = {
            id: treeModel.id,
            name: treeModel.name,
            time: new Date(),
            data: treeModel,
            url: url,
            age: treeModel.age,
            gender: treeModel.geschlechtName ? treeModel.geschlechtName.split('')[0] : 'n',
            type: AppEnums.PageType.fallnavigator
        };
        this.appState$.dispatch(new settingsActions.UpdateSelectedAction(actions));
    }


    /**
     * Loads FallNav tree from the server
     */
    public loadFallNavTrees(filters: any): void {
        this.fallNavState$.dispatch(new fallNavActions.LoadFallNavsAction(filters));
    }

    /**
     * Loads Kategorie config from the server
     */
    public loadHeader(): void {
        this.fallNavState$.dispatch(new fallNavActions.LoadHeaderAction());
    }

    /**
     * Loads headers from the server
     */
    public loadKategorieConfig(params: any): void {
        this.fallNavState$.dispatch(new fallNavActions.LoadConfigBoolAction(params));
    }

    public deleteSelectedItems(selected: SelectedActionsModel): void {
        this.appState$.dispatch(new settingsActions.DeleteItemSelectedAction(selected));

    }

    public getConfigPage(key: string) {
        return this.utilService.getConfig('page')[key];
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
     * Subscribes to registerEvents events loadPerson and logout
     */
    public registerEvents(): void {
        this.subscriptions.push(this.loggedUser$.subscribe((user: any) => {
            if (user.isLoggedIn) {
                this.LoadFallNavFilterStartup();
            } else {
                this.clearStore();
                this.unregisterEvents();
            }
        }));
    }

    /**
     *  FallNav filters
     */
    FallNavFilterWithActive(isFilter: boolean) {
        this.filterFallNav$.subscribe(filters => {
            filters.Active = isFilter;
            this.fallNavState$.dispatch(new fallNavActions.FiltersAction.SetActiveAction(filters));
            this.loadFallNavTrees(filters);
        });
    }
    FallNavFilterWithClosed(isFilter: boolean) {
        this.filterFallNav$.subscribe(filters => {
            filters.Closed = isFilter;
            this.fallNavState$.dispatch(new fallNavActions.FiltersAction.SetClosedAction(filters));
            this.loadFallNavTrees(filters);
        });
    }
    FallNavFilterWithArchive(isFilter: boolean) {
        this.filterFallNav$.subscribe(filters => {
            filters.Archived = isFilter;
            this.fallNavState$.dispatch(new fallNavActions.FiltersAction.SetClosedAction(filters));
            this.loadFallNavTrees(filters);
        });
    }
    FallNavFilterWithIncludeGroup(isFilter: boolean) {
        this.filterFallNav$.subscribe(filters => {
            filters.IncludeGroup = isFilter;
            this.fallNavState$.dispatch(new fallNavActions.FiltersAction.SetIncludeGroupAction(filters));
            this.loadFallNavTrees(filters);
        });
    }
    FallNavFilterWithIncludeGuest(isFilter: boolean) {
        this.filterFallNav$.subscribe(filters => {
            filters.IncludeGuest = isFilter;
            this.fallNavState$.dispatch(new fallNavActions.FiltersAction.SetIncludeGuestAction(filters));
            this.loadFallNavTrees(filters);
        });
    }
    FallNavFilterWithIncludeTasks(isFilter: boolean) {
        this.filterFallNav$.subscribe(filters => {
            filters.IncludeTasks = isFilter;
            this.fallNavState$.dispatch(new fallNavActions.FiltersAction.SetIncludeGroupAction(filters));
            this.loadFallNavTrees(filters);
        });
    }

    /**
     * LoadFallNavFilterStartup
     */
    private LoadFallNavFilterStartup() {
        this.route.queryParams.subscribe(parrams => {
            const filters: FallNavFilterModel = {
                UserId: +parrams['UserId'] || localStorage.getItem('user:userId'),
                Active: parrams.hasOwnProperty('Active') ? parrams['Active'] === 'true' : true,
                Closed: parrams.hasOwnProperty('Closed') ? parrams['Closed'] === 'true' : false,
                Archived: parrams.hasOwnProperty('Archived') ? parrams['Archived'] === 'true' : false,
                IncludeGroup: parrams.hasOwnProperty('IncludeGroup') ? parrams['IncludeGroup'] === 'true' : false,
                IncludeGuest: parrams.hasOwnProperty('IncludeGuest') ? parrams['IncludeGuest'] === 'true' : false,
                IncludeTasks: parrams.hasOwnProperty('IncludeTasks') ? parrams['IncludeTasks'] === 'true' : false
            };
            this.loadFallNavTrees(filters);
        });
    }

    /**
     * Clear store after logout for FallNav Sandbox
     * - clear state feature FallNav State
     * - clear localstorage select:FallNav
     */
    private clearStore(): void {
        localStorage.clear();
        fallNavStore.getFallNavTreesData.release();
        fallNavStore.getFiltersFallNav.release();
    }
}
