import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromVermogen from './reduces/vermogen.reducer';


export interface VermogenState {
    vermogen: fromVermogen.State;
}

export const reducers: ActionReducerMap<VermogenState> = {
    vermogen: fromVermogen.reducer
};

export const getVermogenState = createFeatureSelector<VermogenState>(
    AppEnums.FeatureModule.vermogen
);

export const getVermogenStates = createSelector(
    getVermogenState,
    (state: VermogenState) => state.vermogen
);

export const getPersonSelectBoxDataLoading = createSelector(
    getVermogenStates,
    fromVermogen.getPersonSelectboxData.getLoading
);
export const getPersonSelectBoxDataFailed = createSelector(
    getVermogenStates,
    fromVermogen.getPersonSelectboxData.getFailed
);
export const getBerechnungsgrundlageSelectBoxData = createSelector(
    getVermogenStates,
    fromVermogen.getPersonSelectboxData.getDatas
);



