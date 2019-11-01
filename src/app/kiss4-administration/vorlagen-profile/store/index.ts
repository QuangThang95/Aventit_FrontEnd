import { ActionReducerMap, createSelector, createFeatureSelector, } from '@ngrx/store';
import * as fromVorlagenProfile from './reducers/vorlagenProfile.reducers';
import { AppEnums } from '@shared/AppEnum';

export interface VorlagenProfileState {
    vorlagenProfiles: fromVorlagenProfile.State;
}

export const reducers: ActionReducerMap<VorlagenProfileState> = {
    vorlagenProfiles: fromVorlagenProfile.reducer
};

export const getVorlagenProfileState = createFeatureSelector<VorlagenProfileState>(
    AppEnums.FeatureModule.vorlagenprofile
);

/**
 * VorlagenProfile store functions
 */
export const selectVorlagenProfileState = createSelector(
    getVorlagenProfileState,
    (state: VorlagenProfileState) => state.vorlagenProfiles
);

export const getVorlagenProfileLoaded = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getVorlagenProfileLoaded
);

export const getVorlagenProfileLoading = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getVorlagenProfileLoading
);

export const getVorlagenProfileFailed = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getVorlagenProfileFailed
);

export const getVorlagenProfileData = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getVorlagenProfileData
);

export const getXProfileID = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getXProfileID
);

export const getXProfileTagID = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getXProfileTagID
);

export const getInsertXProfileResult = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getInsertXProfileResult
);

export const getCurrentTID = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getCurrentTID
);

export const getSaveXLangTextResult = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getSaveXLangTextResult
);

export const getDeleteXProfileResult = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getDeleteXProfileResult
);

export const getDeleteXProfileTagResult = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getDeleteXProfileTagResult
);

export const getExecspXSaveProfileTagsResult = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getExecspXSaveProfileTagsResult
);

export const getUpdateXProfileResult = createSelector(
    selectVorlagenProfileState,
    fromVorlagenProfile.getUpdateXProfileResult
);
