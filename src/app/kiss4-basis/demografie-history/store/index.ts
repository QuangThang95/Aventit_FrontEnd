import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromDemografie from './reducers/demografie-history.reducers';

export interface IDemografieState {
  fromsDemografie: fromDemografie.State;
}

export const reducers: ActionReducerMap<IDemografieState> = {
  fromsDemografie: fromDemografie.reducer
};

export const getDemografieState = createFeatureSelector<IDemografieState>(
  AppEnums.FeatureModule.demografie
);

export const getDemografiesState = createSelector(
  getDemografieState,
  (state: IDemografieState) => state.fromsDemografie
);
// XUserHistory
export const getXUserHistoryLoaded = createSelector(
  getDemografiesState,
  fromDemografie.getXUserHistoryInit.getLoaded
);
export const getXUserHistoryLoading = createSelector(
  getDemografiesState,
  fromDemografie.getXUserHistoryInit.getLoading
);
export const getXUserHistoryLoadFail = createSelector(
  getDemografiesState,
  fromDemografie.getXUserHistoryInit.getFailed
);
export const getXUserHistoryData = createSelector(
  getDemografiesState,
  fromDemografie.getXUserHistoryInit.getDatas
);
// Personalien
export const getPersonalienLoaded = createSelector(
  getDemografiesState,
  fromDemografie.getPersonalienInit.getLoaded
);
export const getPersonalienLoading = createSelector(
  getDemografiesState,
  fromDemografie.getPersonalienInit.getLoading
);
export const getPersonalienLoadFail = createSelector(
  getDemografiesState,
  fromDemografie.getPersonalienInit.getFailed
);
export const getPersonalienData = createSelector(
  getDemografiesState,
  fromDemografie.getPersonalienInit.getDatas
);

// Wohnsitz
export const getWohnsitzLoaded = createSelector(
  getDemografiesState,
  fromDemografie.getWohnsitzInit.getLoaded
);
export const getWohnsitzLoading = createSelector(
  getDemografiesState,
  fromDemografie.getWohnsitzInit.getLoading
);
export const getWohnsitzLoadFail = createSelector(
  getDemografiesState,
  fromDemografie.getWohnsitzInit.getFailed
);
export const getWohnsitzData = createSelector(
  getDemografiesState,
  fromDemografie.getWohnsitzInit.getDatas
);

// Wohnsitz
export const getAufenthaltsortLoaded = createSelector(
  getDemografiesState,
  fromDemografie.getAufenthaltsortInit.getLoaded
);
export const getAufenthaltsortLoading = createSelector(
  getDemografiesState,
  fromDemografie.getAufenthaltsortInit.getLoading
);
export const getAufenthaltsortLoadFail = createSelector(
  getDemografiesState,
  fromDemografie.getAufenthaltsortInit.getFailed
);
export const getAufenthaltsortData = createSelector(
  getDemografiesState,
  fromDemografie.getAufenthaltsortInit.getDatas
);
