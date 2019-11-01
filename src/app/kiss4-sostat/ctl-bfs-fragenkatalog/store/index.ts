import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromCtlBfsFragenkatalog from './reducers/ctl-bfs-fragenkatalog.reducers';

export interface CtlBfsFragenkatalogState {
  ctlBfsFragenkatalog: fromCtlBfsFragenkatalog.State;
}

export const reducers: ActionReducerMap<CtlBfsFragenkatalogState> = {
  ctlBfsFragenkatalog: fromCtlBfsFragenkatalog.reducer
};

export const getCtlBfsFragenkatalogStampState = createFeatureSelector<CtlBfsFragenkatalogState>(
  AppEnums.FeatureModule.ctlbfsfragenkatalog
);

export const getCtlBfsFragenkatalog_State = createSelector(
  getCtlBfsFragenkatalogStampState,
  (state: CtlBfsFragenkatalogState) => state.ctlBfsFragenkatalog
);

export const getCtlBfsFragenkatalogLoaded = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkatalog_StateInit.getLoaded
);
export const getCtlBfsFragenkatalogLoading = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkatalog_StateInit.getLoading
);
export const getCtlBfsFragenkatalogFailed = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkatalog_StateInit.getFailed
);
export const getCtlBfsFragenkatalogData = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkatalog_StateInit.getDatas
);
// list
export const getCtlBfsFragenkataloglistLoaded = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkataloglist_StateInit.getLoaded
);
export const getCtlBfsFragenkataloglistLoading = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkataloglist_StateInit.getLoading
);
export const getCtlBfsFragenkataloglistFailed = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkataloglist_StateInit.getFailed
);
export const getCtlBfsFragenkataloglistData = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getCtlBfsFragenkataloglist_StateInit.getDatas
);
// add
export const getCtlBfsFragenkatalogAdding = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getAddCtlBfsFragenkatalog.getAdding
);
export const getCtlBfsFragenkatalogAddDatas = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getAddCtlBfsFragenkatalog.getDatas
);
export const getCtlBfsFragenkatalogAddSuccess = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getAddCtlBfsFragenkatalog.getAdded
);
export const getCtlBfsFragenkatalogAddFailed = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getAddCtlBfsFragenkatalog.getFailed
);
// update
export const getCtlBfsFragenkatalogUpdateData = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getUpdateCtlBfsFragenkatalog.getDatas
);
export const getCtlBfsFragenkatalogUpdating = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getUpdateCtlBfsFragenkatalog.getUpdating
);
export const getCtlBfsFragenkatalogUpdated = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getUpdateCtlBfsFragenkatalog.getUpdated
);
export const getCtlBfsFragenkatalogUpdateFaild = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getUpdateCtlBfsFragenkatalog.getFailed
);
export const getCtlBfsFragenkatalogUpdate = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getUpdateCtlBfsFragenkatalog.getUpdateDatasStateCtlBfsFragenkatalog
);
export const getCtlBfsFragenkatalogUpdateFail = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getUpdateCtlBfsFragenkatalog.getFailed
);
// delete
export const getCtlBfsFragenkatalogDeleteData = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getDeleteCtlBfsFragenkatalog.getDatas
);
export const getCtlBfsFragenkatalogDeleting = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getDeleteCtlBfsFragenkatalog.getDeleting
);
export const getCtlBfsFragenkatalogDeleted = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getDeleteCtlBfsFragenkatalog.getDeleted
);
export const getCtlBfsFragenkatalogDeleteFail = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getDeleteCtlBfsFragenkatalog.getFailed
);
export const getCtlBfsFragenkatalogDelete = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getDeleteCtlBfsFragenkatalog.getDeleteStateCtlBfsFragenkatalog
);
export const getStateFormCtlBfsFragenkatalog = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getStateFormCtlBfsFragenkatalog.getDatas
);
export const getObjectDetailCtlBfsFragenkatalog = createSelector(
  getCtlBfsFragenkatalog_State,
  fromCtlBfsFragenkatalog.getObjectDetailCtlBfsFragenkatalog.getDatas
);
