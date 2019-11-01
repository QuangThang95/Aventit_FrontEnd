﻿import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromInkassofall from './reducers/inkassofall.reducer';

export interface InkassofallState {
    inkassofall: fromInkassofall.State;
}

export const reducers: ActionReducerMap<InkassofallState> = {
    inkassofall: fromInkassofall.reducer
};

export const getInkassofallStampState = createFeatureSelector<InkassofallState>(
    AppEnums.FeatureModule.inkassofall
);

export const getInkassofall_State = createSelector(
    getInkassofallStampState,
    (state: InkassofallState) => state.inkassofall
);

export const getInkassofallLoaded = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofall_StateInit.getLoaded
);
export const getInkassofallLoading = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofall_StateInit.getLoading
);
export const getInkassofallFailed = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofall_StateInit.getFailed
);
export const getInkassofallData = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofall_StateInit.getDatas
);
// list
export const getInkassofalllistLoaded = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofalllist_StateInit.getLoaded
);
export const getInkassofalllistLoading = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofalllist_StateInit.getLoading
);
export const getInkassofalllistFailed = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofalllist_StateInit.getFailed
);
export const getInkassofalllistData = createSelector(
    getInkassofall_State,
    fromInkassofall.getInkassofalllist_StateInit.getDatas
);
// add
export const getInkassofallAdding = createSelector(
    getInkassofall_State,
    fromInkassofall.getAddInkassofall.getAdding
);
export const getInkassofallAddDatas = createSelector(
    getInkassofall_State,
    fromInkassofall.getAddInkassofall.getDatas
);
export const getInkassofallAddSuccess = createSelector(
    getInkassofall_State,
    fromInkassofall.getAddInkassofall.getAdded
);
export const getInkassofallAddFailed = createSelector(
    getInkassofall_State,
    fromInkassofall.getAddInkassofall.getFailed
);
// update
export const getInkassofallUpdateData = createSelector(
    getInkassofall_State,
    fromInkassofall.getUpdateInkassofall.getDatas
);
export const getInkassofallUpdating = createSelector(
    getInkassofall_State,
    fromInkassofall.getUpdateInkassofall.getUpdating
);
export const getInkassofallUpdated = createSelector(
    getInkassofall_State,
    fromInkassofall.getUpdateInkassofall.getUpdated
);
export const getInkassofallUpdateFaild = createSelector(
    getInkassofall_State,
    fromInkassofall.getUpdateInkassofall.getFailed
);
export const getInkassofallUpdate = createSelector(
    getInkassofall_State,
    fromInkassofall.getUpdateInkassofall.getUpdateDatasStateInkassofall
);
// delete
export const getInkassofallDeleteData = createSelector(
    getInkassofall_State,
    fromInkassofall.getDeleteInkassofall.getDatas
);
export const getInkassofallDeleting = createSelector(
    getInkassofall_State,
    fromInkassofall.getDeleteInkassofall.getDeleting
);
export const getInkassofallDeleted = createSelector(
    getInkassofall_State,
    fromInkassofall.getDeleteInkassofall.getDeleted
);
export const getInkassofallDeleteFail = createSelector(
    getInkassofall_State,
    fromInkassofall.getDeleteInkassofall.getFailed
);
export const getInkassofallDelete = createSelector(
    getInkassofall_State,
    fromInkassofall.getDeleteInkassofall.getDeleteStateInkassofall
);
export const getStateFormInkassofall = createSelector(
    getInkassofall_State,
    fromInkassofall.getStateFormInkassofall.getDatas
);
export const getObjectDetailInkassofall = createSelector(
    getInkassofall_State,
    fromInkassofall.getObjectDetailInkassofall.getDatas
);
