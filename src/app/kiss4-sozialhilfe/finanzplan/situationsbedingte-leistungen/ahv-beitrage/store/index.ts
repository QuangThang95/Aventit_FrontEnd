import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromAhvBeitrage from './reducers/ahi-beitrage.reducer';

export interface AhvBeitrageState {
  ahvBeitrages: fromAhvBeitrage.State;
}

export const reducers: ActionReducerMap<AhvBeitrageState> = {
  ahvBeitrages: fromAhvBeitrage.reducer
};

export const getAhvBeitrageState = createFeatureSelector<AhvBeitrageState>(
  AppEnums.FeatureModule.ahvBeitrage
);

export const getAhvBeitragesState = createSelector(
  getAhvBeitrageState,
  (state: AhvBeitrageState) => state.ahvBeitrages

);
/***** Load data BgSilAHVBeitrag *****/
export const getBgSilAHVBeitragLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getBgSilAHVBeitrag.getLoaded
);

export const getBgSilAHVBeitragLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getBgSilAHVBeitrag.getLoading
);

export const getBgSilAHVBeitragFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getBgSilAHVBeitrag.getFailed
);

export const getBgSilAHVBeitrag = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getBgSilAHVBeitrag.getDatas
);

/***** Load data BgSilAHVBeitrag *****/
export const getPersonenUnterstuetztLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getPersonenUnterstuetzt.getLoaded
);

export const getPersonenUnterstuetztLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getPersonenUnterstuetzt.getLoading
);

export const getPersonenUnterstuetztFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getPersonenUnterstuetzt.getFailed
);

export const getPersonenUnterstuetzt = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getPersonenUnterstuetzt.getDatas
);

/***** Load data SqlQueryShPositionTyp *****/
export const getSqlQueryShPositionTypLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getSqlQueryShPositionTyp.getLoaded
);

export const getSqlQueryShPositionTypLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getSqlQueryShPositionTyp.getLoading
);

export const getSqlQueryShPositionTypFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getSqlQueryShPositionTyp.getFailed
);

export const getSqlQueryShPositionTyp = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getSqlQueryShPositionTyp.getDatas
);

/***** Load data AHVBeitragPosition *****/
export const getAHVBeitragPositionLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getAHVBeitragPosition.getLoaded
);

export const getAHVBeitragPositionLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getAHVBeitragPosition.getLoading
);

export const getAHVBeitragPositionFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getAHVBeitragPosition.getFailed
);

export const getAHVBeitragPosition = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getAHVBeitragPosition.getDatas
);

/***** Load data InstitutionSuchenWh *****/
export const getInstitutionSuchenWhLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getInstitutionSuchenWh.getLoaded
);

export const getInstitutionSuchenWhLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getInstitutionSuchenWh.getLoading
);

export const getInstitutionSuchenWhFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getInstitutionSuchenWh.getFailed
);

export const getInstitutionSuchenWh = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getInstitutionSuchenWh.getDatas
);

/***** Load data for delete ahv beitrage *****/
export const deleteAhvBeitrageLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.deleteAhvBeitrage.getLoaded
);

export const deleteAhvBeitrageLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.deleteAhvBeitrage.getLoading
);

export const deleteAhvBeitrageFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.deleteAhvBeitrage.getFailed
);

export const deleteAhvBeitrage = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.deleteAhvBeitrage.getDatas
);

/***** Load data for update ahv beitrage *****/
export const updateAhvBeitrageLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.updateAhvBeitrage.getLoaded
);

export const updateAhvBeitrageLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.updateAhvBeitrage.getLoading
);

export const updateAhvBeitrageFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.updateAhvBeitrage.getFailed
);

export const updateAhvBeitrage = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.updateAhvBeitrage.getDatas
);

/***** Load data for create ahv beitrage *****/
export const createAhvBeitrageLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.createAhvBeitrage.getLoaded
);

export const createAhvBeitrageLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.createAhvBeitrage.getLoading
);

export const createAhvBeitrageFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.createAhvBeitrage.getFailed
);

export const createAhvBeitrage = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.createAhvBeitrage.getDatas
);

/***** Load data for lookups *****/
export const createLookUpsLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getLookUps.getLoaded
);

export const createLookUpsLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getLookUps.getLoading
);

export const createLookUpsFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getLookUps.getFailed
);

export const createLookUps = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getLookUps.getDatas
);

/***** Load data for DropDownAnpassung *****/
export const createDropDownAnpassungLoaded = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getDropDownAnpassung.getLoaded
);

export const createDropDownAnpassungLoading = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getDropDownAnpassung.getLoading
);

export const createDropDownAnpassungFailed = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getDropDownAnpassung.getFailed
);

export const createDropDownAnpassung = createSelector(
  getAhvBeitragesState,
  fromAhvBeitrage.getDropDownAnpassung.getDatas
);
