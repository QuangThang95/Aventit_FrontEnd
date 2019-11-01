import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as gemeindeCodeReducer from './reducers/gemeinde-code.reducer';

export interface GemeindeCodeState {
    GemeindeCode: gemeindeCodeReducer.State;
}

export const reducers: ActionReducerMap<GemeindeCodeState> = { GemeindeCode: gemeindeCodeReducer.reducer };
export const getGemeindeCodeFeatureModule = createFeatureSelector<GemeindeCodeState>(AppEnums.FeatureModule.gemeindecode);
export const getGemeindeCodeState = createSelector(getGemeindeCodeFeatureModule, (state: GemeindeCodeState) => state.GemeindeCode);
export const getGemeindeCodeLoaded = createSelector(getGemeindeCodeState, gemeindeCodeReducer.getGemeindeCodeInit.getLoaded);
export const getGemeindeCodeLoading = createSelector(getGemeindeCodeState, gemeindeCodeReducer.getGemeindeCodeInit.getLoading);
export const getGemeindeCodeFailed = createSelector(getGemeindeCodeState, gemeindeCodeReducer.getGemeindeCodeInit.getFailed);
export const getGemeindeCodeData = createSelector(getGemeindeCodeState, gemeindeCodeReducer.getGemeindeCodeInit.getDatas);
