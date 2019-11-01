import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as variablenReducer from './reducers/bfs-variablen.reducer';

export interface VariablenState {
    VariablenCode: variablenReducer.State;
}

export const reducers: ActionReducerMap<VariablenState> = { VariablenCode: variablenReducer.reducer };
export const getVariablenFeatureModule = createFeatureSelector<VariablenState>(AppEnums.FeatureModule.gemeindeVariablen);
export const getVariablenState = createSelector(getVariablenFeatureModule, (state: VariablenState) => state.VariablenCode);
// Variablen
export const getVariablenLoaded = createSelector(getVariablenState, variablenReducer.getVariablenInit.getLoaded);
export const getVariablenLoading = createSelector(getVariablenState, variablenReducer.getVariablenInit.getLoading);
export const getVariablenFailed = createSelector(getVariablenState, variablenReducer.getVariablenInit.getFailed);
export const getVariablenData = createSelector(getVariablenState, variablenReducer.getVariablenInit.getDatas);
// Person
export const getPersonLoaded = createSelector(getVariablenState, variablenReducer.getPersonInit.getLoaded);
export const getPersonLoading = createSelector(getVariablenState, variablenReducer.getPersonInit.getLoading);
export const getPersonFailed = createSelector(getVariablenState, variablenReducer.getPersonInit.getFailed);
export const getPersonData = createSelector(getVariablenState, variablenReducer.getPersonInit.getDatas);
// Mitarbeiter
export const getMitarbeiterLoaded = createSelector(getVariablenState, variablenReducer.getMitarbeiterInit.getLoaded);
export const getMitarbeiterLoading = createSelector(getVariablenState, variablenReducer.getMitarbeiterInit.getLoading);
export const getMitarbeiterFailed = createSelector(getVariablenState, variablenReducer.getMitarbeiterInit.getFailed);
export const getMitarbeiterData = createSelector(getVariablenState, variablenReducer.getMitarbeiterInit.getDatas);
// Search Init Data
export const getSearchInitLoaded = createSelector(getVariablenState, variablenReducer.getSearchInit.getLoaded);
export const getSearchInitLoading = createSelector(getVariablenState, variablenReducer.getSearchInit.getLoading);
export const getSearchInitFailed = createSelector(getVariablenState, variablenReducer.getSearchInit.getFailed);
export const getSearchInitData = createSelector(getVariablenState, variablenReducer.getSearchInit.getDatas);
