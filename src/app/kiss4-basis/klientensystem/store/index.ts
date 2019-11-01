import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromklientensystem from './reducers/klientensystem.reducers';

export interface KlientensystemState {
    klientensystems: fromklientensystem.State;
}

export const reducers: ActionReducerMap<KlientensystemState> = {
    klientensystems: fromklientensystem.reducer
};

export const getKlientensystemState = createFeatureSelector<KlientensystemState>(
    AppEnums.FeatureModule.klientensystem
);

/**
 * Klientensystem store functions
 */
export const selectKlientensystemState = createSelector(
    getKlientensystemState,
    (state: KlientensystemState) => state.klientensystems
);

export const getKlientensystemLoadedData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getKlientensystemLoadedData
);

export const getKlientensystemLoadingData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getKlientensystemLoadingData
);

export const getKlientensystemFailedData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getKlientensystemFailedData
);

export const getFalltraegerData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getFalltraegerData
);

export const getMietvertragData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getMietvertragData
);

export const getRelationData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getRelationData
);

export const getVwInstitutionData = createSelector(
    selectKlientensystemState,
    fromklientensystem.getVwInstitutionData
);


export const getBeziehungRelationGenericData = createSelector(
  selectKlientensystemState,
  fromklientensystem.getBeziehungRelationGeneric
);

export const getBeziehungRelationMaleData = createSelector(
  selectKlientensystemState,
  fromklientensystem.getBeziehungRelationMale
);

export const getBeziehungRelationFemaleData = createSelector(
  selectKlientensystemState,
  fromklientensystem.getBeziehungRelationFemale
);

export const getInFPData = createSelector(
  selectKlientensystemState,
  fromklientensystem.getInFP
);

export const getGleicheAdresseData = createSelector(
  selectKlientensystemState,
  fromklientensystem.getGleicheAdresse
);

export const getHandleGleicherHaushaltData = createSelector(
  selectKlientensystemState,
  fromklientensystem.getHandleGleicherHaushalt
);

export const updateBaPersonRelation = createSelector(
  selectKlientensystemState,
  fromklientensystem.updateBaPersonRelation
);

export const updateBaMietvertrag = createSelector(
  selectKlientensystemState,
  fromklientensystem.updateBaMietvertrag
);

export const updateBaPerson = createSelector(
  selectKlientensystemState,
  fromklientensystem.updateBaPerson
);

export const insertHistoryVersion = createSelector(
  selectKlientensystemState,
  fromklientensystem.insertHistoryVersion
);
