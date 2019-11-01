import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromCtlBfsDokumente from './reducers/ctl-bfs-dokumente.reducer';

import { AppEnums } from '@shared/AppEnum';
export interface CtlBfsDokumenteState {
    ctlBfsDokumente: fromCtlBfsDokumente.State;
}

export const reducers: ActionReducerMap<CtlBfsDokumenteState> = {
    ctlBfsDokumente: fromCtlBfsDokumente.reducer
};

export const getCtlBfsDokumenteState = createFeatureSelector<CtlBfsDokumenteState>(
    AppEnums.FeatureModule.ctlbfsdokumente
);

export const getCtlBfsDokumentesState = createSelector(
    getCtlBfsDokumenteState,
    (state: CtlBfsDokumenteState) =>  state.ctlBfsDokumente
);
/***** Load data leitfaden *****/
export const getCtlBfsDokumenteLoaded = createSelector(
    getCtlBfsDokumentesState,
    fromCtlBfsDokumente.getLeitfadenInit.getLoaded
);

export const getCtlBfsDokumenteLoading = createSelector(
    getCtlBfsDokumentesState,
    fromCtlBfsDokumente.getLeitfadenInit.getLoading
);
export const getCtlBfsDokumenteFailed = createSelector(
    getCtlBfsDokumentesState,
    fromCtlBfsDokumente.getLeitfadenInit.getFailed
);
export const getCtlBfsDokumenteData = createSelector(
    getCtlBfsDokumentesState,
    fromCtlBfsDokumente.getLeitfadenInit.getDatas
);
/***** The End Load data leitfaden *****/
