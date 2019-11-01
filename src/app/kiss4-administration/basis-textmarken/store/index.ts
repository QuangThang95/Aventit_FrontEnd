import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromTextMarken from './reducers/basis-textmarken.reducers';

export interface TextMarkenState {
  textMarken: fromTextMarken.State;
}

export const reducers: ActionReducerMap<TextMarkenState> = {
  textMarken: fromTextMarken.reducer
};

export const getMarkenState = createFeatureSelector<TextMarkenState>(
  AppEnums.FeatureModule.basistextmarken
);

export const getTextMarken_State = createSelector(
  getMarkenState,
  (state: TextMarkenState) => state.textMarken
);

export const getTextMarkenDataLoading = createSelector(
  getTextMarken_State,
  fromTextMarken.getTextMarken.getLoading
);

export const getTextMarkenDataLoaded = createSelector(
  getTextMarken_State,
  fromTextMarken.getTextMarken.getLoaded
);

export const getTextMarkenDataFailed = createSelector(
  getTextMarken_State,
  fromTextMarken.getTextMarken.getFailed
);

export const getTextMarkenData = createSelector(
  getTextMarken_State,
  fromTextMarken.getTextMarken.getData
);

export const getTableDataLoading = createSelector(
  getTextMarken_State,
  fromTextMarken.getTable.getLoading
);

export const getTableDataLoaded = createSelector(
  getTextMarken_State,
  fromTextMarken.getTable.getLoaded
);

export const getTableDataFailed = createSelector(
  getTextMarken_State,
  fromTextMarken.getTable.getFailed
);

export const getTableData = createSelector(
  getTextMarken_State,
  fromTextMarken.getTable.getData
);

export const getTypDataLoading = createSelector(
  getTextMarken_State,
  fromTextMarken.getTyp.getLoading
);

export const getTypDataLoaded = createSelector(
  getTextMarken_State,
  fromTextMarken.getTyp.getLoaded
);

export const getTypDataFailed = createSelector(
  getTextMarken_State,
  fromTextMarken.getTyp.getFailed
);

export const getTypData = createSelector(
  getTextMarken_State,
  fromTextMarken.getTyp.getData
);

export const getModulDataLoading = createSelector(
  getTextMarken_State,
  fromTextMarken.getModul.getLoading
);

export const getModulDataLoaded = createSelector(
  getTextMarken_State,
  fromTextMarken.getModul.getLoaded
);

export const getModulDataFailed = createSelector(
  getTextMarken_State,
  fromTextMarken.getModul.getFailed
);

export const getModulpData = createSelector(
  getTextMarken_State,
  fromTextMarken.getModul.getData
);

export const getBasisTextmarkenSave = createSelector(
  getTextMarken_State,
  fromTextMarken.getSaveBasisTextmarken.getDatas
);

export const getBasisTextmarkenSaveFail = createSelector(
  getTextMarken_State,
  fromTextMarken.getSaveBasisTextmarken.getFailed
);

export const getBasisTextmarkenDel = createSelector(
  getTextMarken_State,
  fromTextMarken.getDelBasisTextmarken.getDatas
);

export const getBasisTextmarkenDelFail = createSelector(
  getTextMarken_State,
  fromTextMarken.getDelBasisTextmarken.getFailed
);
export const getBasisTextmarkenSeveFail = createSelector(
  getTextMarken_State,
  fromTextMarken.getSaveBasisTextmarken.getFailed
);
