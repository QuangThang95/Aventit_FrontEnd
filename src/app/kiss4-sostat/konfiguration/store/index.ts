import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromKonfigurations from './reducers/konfiguration.reducer';

export interface KonfigurationState {
    konfigurations: fromKonfigurations.State;
}

export const reducers: ActionReducerMap<KonfigurationState> = {
    konfigurations: fromKonfigurations.reducer
};

export const getKonfigurationState = createFeatureSelector<KonfigurationState>(
    AppEnums.FeatureModule.konfiguration
);

export const getKonfigurationsState = createSelector(
    getKonfigurationState,
    (state: KonfigurationState) => state.konfigurations

);

// Load data for detail
export const getKonfigurationsLoaded = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationInit.getLoaded
);

export const getKonfigurationsLoading = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationInit.getLoading
);

export const getKonfigurationsFailed = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationInit.getFailed
);

export const getKonfigurationsData = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationInit.getDatas
);

// Load data for grid
export const getKonfigurationsLoadedForGrid = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationGrid.getLoaded
);

export const getKonfigurationsLoadingForGrid = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationGrid.getLoading
);

export const getKonfigurationsFailedForGrid = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationGrid.getFailed
);

export const getKonfigurationsDataForGrid = createSelector(
    getKonfigurationsState,
    fromKonfigurations.getKonfigurationGrid.getDatas
);

