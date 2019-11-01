import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromGemeindeDatens from './reducers/gemeinde-daten.reducer';

export interface GemeindeDatenState {
    GemeindeDatens: fromGemeindeDatens.State;
}

export const reducers: ActionReducerMap<GemeindeDatenState> = {
    GemeindeDatens: fromGemeindeDatens.reducer
};

export const getGemeindeDatenState = createFeatureSelector<GemeindeDatenState>(
    AppEnums.FeatureModule.gemeindedaten
);

export const getGemeindeDatensState = createSelector(
    getGemeindeDatenState,
    (state: GemeindeDatenState) => state.GemeindeDatens
);

export const getGemeindeDatensLoaded = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenInit.getLoaded
);

export const getGemeindeDatensLoading = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenInit.getLoading
);

export const getGemeindeDatensFailed = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenInit.getFailed
);

export const getGemeindeDatensData = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenInit.getDatas
);

export const getGemeindeDatensSyncData = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenSyncData.getDatas
);

export const getGemeindeDatensSyncing = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenSyncData.getSyncing
);

export const getGemeindeDatensSynced = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenSyncData.getSynced
);

export const getGemeindeDatensSyncFailed = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenSyncData.getFailed
);

export const getGemeindeDatensImportData = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenImportData.getDatas
);

export const getGemeindeDatensImporting = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenImportData.getImporting
);

export const getGemeindeDatensImported = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenImportData.getImported
);

export const getGemeindeDatensImportFailed = createSelector(
    getGemeindeDatensState,
    fromGemeindeDatens.getGemeindeDatenImportData.getFailed
);
