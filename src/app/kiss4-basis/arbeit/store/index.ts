import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromArbeits from './reducers/arbeit.reducer';

import { AppEnums } from '@shared/AppEnum';
export interface ArbeitState {
    Arbeites: fromArbeits.State;
}

export const reducers: ActionReducerMap<ArbeitState> = {
    Arbeites: fromArbeits.reducer
};

export const getArbeitState = createFeatureSelector<ArbeitState>(
    AppEnums.FeatureModule.arbeit
);

export const getArbeitsState = createSelector(
    getArbeitState,
    (state: ArbeitState) => state.Arbeites

);
/***** Load data beit *****/
export const getArbeiteLoaded = createSelector(
    getArbeitsState,
    fromArbeits.getArbeitInit.getLoaded
);

export const getArbeiteLoading = createSelector(
    getArbeitsState,
    fromArbeits.getArbeitInit.getLoading
);

export const getArbeiteFaild = createSelector(
    getArbeitsState,
    fromArbeits.getArbeitInit.getFailed
);
export const getArbeiteInitData = createSelector(
    getArbeitsState,
    fromArbeits.getArbeitInit.getData
);

/***** Load data LOVName *****/
export const getLOVNameArbeiteLoaded = createSelector(
    getArbeitsState,
    fromArbeits.getLOVNameArbeit.getLoaded
);

export const getLOVNameArbeiteLoading = createSelector(
    getArbeitsState,
    fromArbeits.getLOVNameArbeit.getLoading
);

export const getLOVNameArbeiteFaild = createSelector(
    getArbeitsState,
    fromArbeits.getLOVNameArbeit.getFailed
);
export const getLOVNameArbeiteInitData = createSelector(
    getArbeitsState,
    fromArbeits.getLOVNameArbeit.getData
);

/***** Load data beruf *****/
export const getBerufArbeiteLoaded = createSelector(
    getArbeitsState,
    fromArbeits.getBeruSuchenArbeitInit.getLoaded
);

export const getBerufArbeiteLoading = createSelector(
    getArbeitsState,
    fromArbeits.getBeruSuchenArbeitInit.getLoading
);

export const getBerufArbeiteFaild = createSelector(
    getArbeitsState,
    fromArbeits.getBeruSuchenArbeitInit.getFailed
);
export const getBeruArbeiteInitData = createSelector(
    getArbeitsState,
    fromArbeits.getBeruSuchenArbeitInit.getData
);

/***** Load data institutionSuchen *****/
export const getInstitutionArbeiteLoaded = createSelector(
    getArbeitsState,
    fromArbeits.getInstitutionSuchenArbeit.getLoaded
);

export const getInstitutionSuchenArbeiteLoading = createSelector(
    getArbeitsState,
    fromArbeits.getInstitutionSuchenArbeit.getLoading
);

export const getInstitutionArbeiteFaild = createSelector(
    getArbeitsState,
    fromArbeits.getInstitutionSuchenArbeit.getFailed
);
export const getInstitutionSuchenArbeiteInitData = createSelector(
    getArbeitsState,
    fromArbeits.getInstitutionSuchenArbeit.getData
);

/***** save data Save *****/
export const getSaveArbeiteLoaded = createSelector(
    getArbeitsState,
    fromArbeits.getSaveArbeit.getLoaded
);

export const getSaveArbeiteLoading = createSelector(
    getArbeitsState,
    fromArbeits.getSaveArbeit.getLoading
);

export const getSaveArbeiteFaild = createSelector(
    getArbeitsState,
    fromArbeits.getSaveArbeit.getFailed
);
export const getSaveArbeiteInitData = createSelector(
    getArbeitsState,
    fromArbeits.getSaveArbeit.getData
);