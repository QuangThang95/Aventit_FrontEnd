import { environment } from 'environments/environment';
/**
 * More info: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { createSelector, ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromRouter from '@ngrx/router-store';
import * as fromSettings from './reducers/settings.reducer';
import * as fromLayouts from './reducers/layout.reducer';
import * as fromApps from './reducers/app.reducer';
import * as fromAuth from './reducers/auth.reducer';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
    data?: any | undefined;
}
/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    apps: fromApps.State;
    settings: fromSettings.State;
    layouts: fromLayouts.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    apps: fromApps.reducer,
    settings: fromSettings.reducer,
    layouts: fromLayouts.reducer,
    auth: fromAuth.reducer
};

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */

export function store(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        state = state || {};
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [store]
    : [];

/**
 * Router state functions
 */
export const getRouterState = createFeatureSelector<
    fromRouter.RouterReducerState<RouterStateUrl>>
    ('routerReducer');

/**
 * CustomSerializer
 */
export class AppCustomSerializer
    implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route: ActivatedRouteSnapshot = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams, data },
        } = routerState;

        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams, data };
    }
}

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */

/**
 * Apps store functions
 */
export const getAppsState = (state: State) => state.apps;
export const getAvailableRoles = createSelector(
    getAppsState,
    fromApps.getAvailableRoles
);
export const getRolesLoading = createSelector(
    getAppsState,
    fromApps.getRolesLoading
);
export const getRolesLoaded = createSelector(
    getAppsState,
    fromApps.getRolesLoaded
);
export const getRolesFailed = createSelector(
    getAppsState,
    fromApps.getRolesFailed
);

/**
 * Settings store functions
 */
export const getSettingsState = (state: State) => state.settings;
export const getSelectedLanguage = createSelector(
    getSettingsState,
    fromSettings.getSelectedLanguage
);
export const getSelectedCulture = createSelector(
    getSettingsState,
    fromSettings.getSelectedCulture
);
export const getAvailableLanguages = createSelector(
    getSettingsState,
    fromSettings.getAvailableLanguages
);
export const getSelectedActions = createSelector(
    getSettingsState,
    fromSettings.getSelectedActions
);
export const getLanguageChanging = createSelector(
    getSettingsState,
    fromSettings.getLanguageChanging
);

/**
 * *********************************************************************
 * Layouts store functions
 */
/**
 * Menus store functions
 */
export const selectMenusState = (state: State) => state.layouts;
export const getMenusLoaded = createSelector(
    selectMenusState,
    fromLayouts.selectMenuLoaded
);
export const getMenusLoading = createSelector(
    selectMenusState,
    fromLayouts.selectMenuLoading
);
export const getMenusFailed = createSelector(
    selectMenusState,
    fromLayouts.selectMenuLoadFail
);
export const getMenusData = createSelector(
    selectMenusState,
    fromLayouts.selectMenuDatas
);
/**
 * *********************************************************************
 * search box data store functions
 */
export const selectSearchBoxDatasState = (state: State) => state.layouts;
export const getSearchBoxDatasLoaded = createSelector(
    selectSearchBoxDatasState,
    fromLayouts.selectSearchBoxLoaded
);
export const getSearchBoxDatasLoading = createSelector(
    selectSearchBoxDatasState,
    fromLayouts.selectSearchBoxLoading
);
export const getSearchBoxDatasFailed = createSelector(
    selectSearchBoxDatasState,
    fromLayouts.selectSearchBoxLoadFail
);
export const getSearchBoxDatasData = createSelector(
    selectSearchBoxDatasState,
    fromLayouts.selectSearchBoxDatas
);

/**
 * *********************************************************************
 * Auth store functions
 */
export const selectAuthState = (state: State) => state.auth;
export const getAuthLoaded = createSelector(selectAuthState, fromAuth.getLoaded);
export const getAuthLoading = createSelector(selectAuthState, fromAuth.getLoading);
export const getAuthFailed = createSelector(selectAuthState, fromAuth.getFailed);
export const getLoggedUser = createSelector(selectAuthState, fromAuth.selectLoggedUser);
export const getAuthSersion = createSelector(selectAuthState, fromAuth.getLoaded);
export const getXUsers = createSelector(selectAuthState, fromAuth.getXUsers);
export const loggedUser = createSelector(selectAuthState, fromAuth.selectLoggedUser);
export const getUserRight = createSelector(selectAuthState, fromAuth.getUserRight);
export const getMultipleXUsers = createSelector(selectAuthState, fromAuth.getMultipleXUsers);