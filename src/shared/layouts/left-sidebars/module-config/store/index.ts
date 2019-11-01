import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as moduleConfigReducer from './reducers/module-config-navigator.reducer';

export interface ModuleConfigNavigatorState {
    moduleConfigNavigatorState: moduleConfigReducer.State;
}

export const reducers: ActionReducerMap<ModuleConfigNavigatorState> = {
    moduleConfigNavigatorState: moduleConfigReducer.reducer
};

export const getmoduleConfigNavigatorState = createFeatureSelector<ModuleConfigNavigatorState>(
    AppEnums.FeatureModule.moduleConfigNavigator
);

/**
 * ModuleConfigNavigatorItems store functions
 */
export const getModuleConfigNavigator_State = createSelector(
    getmoduleConfigNavigatorState,
    (state: ModuleConfigNavigatorState) => state.moduleConfigNavigatorState
);

export const getModuleConfigNavigatorItemsLoaded = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getModuleConfigNavigatorItems.getLoaded
);

export const getModuleConfigNavigatorItemsLoading = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getModuleConfigNavigatorItems.getLoading
);

export const getModuleConfigNavigatorItemsFailed = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getModuleConfigNavigatorItems.getFailed
);

export const getModuleConfigNavigatorItems = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getModuleConfigNavigatorItems.getData
);

export const getInitialParameters = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getInitialParameters
);

export const getEditModeStatus = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getEditModeStatus
);

export const getDirtyFormStatus = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getDirtyFormStatus
);

export const getChangeForm = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getChangeForm
);

export const getSelectNode = createSelector(
    getModuleConfigNavigator_State,
    moduleConfigReducer.getSelectNode
);
