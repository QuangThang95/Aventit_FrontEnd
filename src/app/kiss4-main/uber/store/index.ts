import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromUber from './reducers/uber.reducer';

export interface UberState {
    uber: fromUber.State;
}

export const reducers: ActionReducerMap<UberState> = {
    uber: fromUber.reducer
};

// GetCultureInfo
export const getCultureInfoState = createFeatureSelector<UberState>(
    AppEnums.FeatureModule.uber
);

export const getCultureInfosState = createSelector(
    getCultureInfoState,
    (state: UberState) => state.uber
);

export const getCultureInfoData = createSelector(
    getCultureInfosState,
    fromUber.getCultureInfoInit.getData
);

// GetDatabaseInfo
export const getDatabaseInfoState = createFeatureSelector<UberState>(
    AppEnums.FeatureModule.uber
);

export const getDatabaseInfosState = createSelector(
    getDatabaseInfoState,
    (state: UberState) => state.uber
);

export const getDatabaseInfoData = createSelector(
    getDatabaseInfosState,
    fromUber.getDatabaseInfoInit.getData
);

// GetDatabaseVersions
export const getDatabaseVersionState = createFeatureSelector<UberState>(
    AppEnums.FeatureModule.uber
);

export const getDatabaseVersionsState = createSelector(
    getDatabaseVersionState,
    (state: UberState) => state.uber
);

export const getDatabaseVersionsData = createSelector(
    getDatabaseVersionsState,
    fromUber.getDatabaseVersionsInit.getData
);

// GetKiss4WebVersion
export const getKiss4WebVersionState = createFeatureSelector<UberState>(
    AppEnums.FeatureModule.uber
);

export const getKiss4WebVersionsState = createSelector(
    getKiss4WebVersionState,
    (state: UberState) => state.uber
);

export const getKiss4WebVersionsData = createSelector(
    getKiss4WebVersionsState,
    fromUber.getKiss4WebVersionInit.getData
);
