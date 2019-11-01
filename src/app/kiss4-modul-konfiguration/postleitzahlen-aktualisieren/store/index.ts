import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromPostleitzahlenAktualisierens from './reducers/postleitzahlen-aktualisieren.reducer';

export interface PostleitzahlenAktualisierenStateState {
    PostleitzahlenAktualisierens: fromPostleitzahlenAktualisierens.State;
}

export const reducers: ActionReducerMap<PostleitzahlenAktualisierenStateState> = {
    PostleitzahlenAktualisierens: fromPostleitzahlenAktualisierens.reducer
};

export const getPostleitzahlenAktualisierenState = createFeatureSelector<PostleitzahlenAktualisierenStateState>(
    AppEnums.FeatureModule.postleitzahlenAktualisieren
);

export const getPostleitzahlenAktualisierensState = createSelector(
    getPostleitzahlenAktualisierenState,
    (state: PostleitzahlenAktualisierenStateState) => state.PostleitzahlenAktualisierens
);

export const getPostleitzahlenAktualisierensLoaded = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenInit.getLoaded
);

export const getPostleitzahlenAktualisierensLoading = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenInit.getLoading
);

export const getPostleitzahlenAktualisierensFailed = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenInit.getFailed
);

export const getPostleitzahlenAktualisierensData = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenInit.getDatas
);

export const getPostleitzahlenAktualisierensSyncData = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenSyncData.getDatas
);

export const getPostleitzahlenAktualisierensSyncing = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenSyncData.getSyncing
);

export const getPostleitzahlenAktualisierensSynced = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenSyncData.getSynced
);

export const getPostleitzahlenAktualisierensSyncFailed = createSelector(
    getPostleitzahlenAktualisierensState,
    fromPostleitzahlenAktualisierens.getPostleitzahlenAktualisierenSyncData.getFailed
);
