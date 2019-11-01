import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromFaAktennotiz from './reducers/fa-aktennotiz.reducers';

import { AppEnums } from '@shared/AppEnum';

export interface FaAktennotizState {
    faAktennotizs: fromFaAktennotiz.State;
}

export const reducers: ActionReducerMap<FaAktennotizState> = {
    faAktennotizs: fromFaAktennotiz.reducer
};

export const getFaAktennotizState = createFeatureSelector<FaAktennotizState>(
    AppEnums.FeatureModule.faaktennotiz
);

/**
* *********************************************************************
* get FaAktennotiz store functions
*
*/
/**
 * FaAktennotiz store functions
 */
export const getFaAktennotiz_State = createSelector(
    getFaAktennotizState,
    (state: FaAktennotizState) => state.faAktennotizs
);

export const getFaAktennotizLoaded = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotiz.getLoaded
);
export const getFaAktennotizLoading = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotiz.getLoading
);
export const getFaAktennotizFailed = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotiz.getFailed
);
export const getFaAktennotizData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotiz.getDatas
);
export const getFaAktennotiz = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotiz.getFaAktennotiz
);
export const getFaAktennotizQuery = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotiz.getQuery
);
export const getKontaktartData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getKontaktart.getDatas
);
export const getMitarbeiterData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getMitarbeiter.getDatas
);
export const getTheMenData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getTheMen.getDatas
);
export const getAddFaAktennotizenData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getAddFaAktennotizen.getDatas
);
export const getDeleteFaAktennotizenData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getDeleteFaAktennotizen.getDatas
);
export const getUpdateFaAktennotizenData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getUpdateFaAktennotizen.getDatas
);
export const getDauerData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getDauerFaAktennotizen.getDatas
);
export const getConfigData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getConfigData.getDatas
);
export const getDokumentAktennotizenData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getDokumentAktennotizen.getDatas
);
export const getDefaultKontartPartnerData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getDefaultKontartPartner.getDatas
);
/**
* *********************************************************************
* get FaAktennotiz InitData
*
*/
export const getFaAktennotizInitDataLoading = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotizInit.getLoading
);
export const getFaAktennotizInitDataLoaded = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotizInit.getLoaded
);
export const getFaAktennotizInitDataFailed = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotizInit.getFailed
);
export const getFaAktennotizInitData = createSelector(
    getFaAktennotiz_State,
    fromFaAktennotiz.getFaAktennotizInit.getDatas
);
