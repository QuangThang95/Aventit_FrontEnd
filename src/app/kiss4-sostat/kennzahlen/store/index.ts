import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';
import * as fromkennzahlens from './reducers/kennzahlen.reducer';
import { AppEnums } from '@shared/AppEnum';

export interface KennzahlenState {
    Kennzahlens: fromkennzahlens.State;
}

export const reducers: ActionReducerMap<KennzahlenState> = {
    Kennzahlens: fromkennzahlens.reducer
};

export const getKennzahlenState = createFeatureSelector<KennzahlenState>(
    AppEnums.FeatureModule.kennzahlen
);

export const getKennzahlensState = createSelector(
    getKennzahlenState,
    (state: KennzahlenState) => state.Kennzahlens
);

export const getKennzahlensLoaded = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.getLoaded
);

export const getKennzahlensLoading = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.getLoading
);

export const getKennzahlensFailed = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.getFailed
);

export const getKennzahlensData = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.getDatas
);


export const initKennzahlensLoaded = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.initloaded
);

export const initKennzahlensLoading = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.initloading
);

export const initKennzahlensFailed = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.initloaded
);

export const initKennzahlensData = createSelector(
    getKennzahlensState,
    fromkennzahlens.getKennzahlenDatenInit.initSearch
);
