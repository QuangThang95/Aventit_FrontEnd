import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromBaland from './reducers/baland.reducer';

export interface BalandState {
    Balands: fromBaland.State;
}

export const reducers: ActionReducerMap<BalandState> = {
    Balands: fromBaland.reducer
};

export const getBalandState = createFeatureSelector<BalandState>(
    AppEnums.FeatureModule.baland
);

export const getBalandsState = createSelector(
    getBalandState,
    (state: BalandState) => state.Balands

);
/***** Load data for top grid *****/
export const getBalandsLoaded = createSelector(
    getBalandsState,
    fromBaland.getBalandInit.getLoaded
);

export const getBalandsLoading = createSelector(
    getBalandsState,
    fromBaland.getBalandInit.getLoading
);
export const getBalandsFailed = createSelector(
    getBalandsState,
    fromBaland.getBalandInit.getFailed
);
export const getBalandData = createSelector(
    getBalandsState,
    fromBaland.getBalandInit.getDatas
);
/***** The End Load data for top grid *****/

export const getBalandSyncData = createSelector(
    getBalandsState,
    fromBaland.getBalandSyncData.getDatas
);

export const getBalandSyncing = createSelector(
    getBalandsState,
    fromBaland.getBalandSyncData.getSyncing
);

export const getGBalandSynced = createSelector(
    getBalandsState,
    fromBaland.getBalandSyncData.getSynced
);

export const getBalandSyncFailed = createSelector(
    getBalandsState,
    fromBaland.getBalandSyncData.getFailed
);
