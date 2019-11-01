import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as popoverReducer from './reducers/popover.reducer';

export interface PopOverState { PopOver: popoverReducer.State; }
export const reducers: ActionReducerMap<PopOverState> = { PopOver: popoverReducer.reducer };
export const getPopOverFeatureName = createFeatureSelector<PopOverState>(AppEnums.FeatureModule.popover);
export const getPopOverState = createSelector(getPopOverFeatureName, (state: PopOverState) => state.PopOver);

export const getButtonsLoaded = createSelector(getPopOverState, popoverReducer.getPopOverInit.getLoaded);
export const getButtonsLoading = createSelector(getPopOverState, popoverReducer.getPopOverInit.getLoading);
export const getButtonsFailed = createSelector(getPopOverState, popoverReducer.getPopOverInit.getFailed);
export const getButtonsData = createSelector(getPopOverState, popoverReducer.getPopOverInit.getDatas);
