import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import * as fromGrundBedarf from './reducers/grund-bedarf.reducer';


export interface GrundBedarfState {
    grundbedarf: fromGrundBedarf.State;
}

export const reducers: ActionReducerMap<GrundBedarfState> = {
    grundbedarf: fromGrundBedarf.reducer
};

export const getGrundBedarfState = createFeatureSelector<GrundBedarfState>(
    AppEnums.FeatureModule.grundBedarf
);

export const getGrundBedarfStates = createSelector(
    getGrundBedarfState,
    (state: GrundBedarfState) => state.grundbedarf
);

export const getBerechnungsgrundlageSelectBoxDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getBerechnungsgrundlageSelectboxData.getLoading
);
export const getBerechnungsgrundlageSelectBoxDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getBerechnungsgrundlageSelectboxData.getFailed
);
export const getBerechnungsgrundlageSelectBoxData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getBerechnungsgrundlageSelectboxData.getDatas
);

export const getGrundBedarfFormDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfLoadFormData.getLoaded
);

export const getGrundBedarfFormDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfLoadFormData.getLoading
);
export const getGrundBedarfFormDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfLoadFormData.getFailed
);
export const getGrundBedarfFormData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfLoadFormData.getDatas
);

export const getGrundBedarfUpdateFormData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getDatas
);

export const getGrundBedarfUpdateFormDataUpdating = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getUpdating
);
export const getGrundBedarfUpdateFormDataSuccess = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getUpdated
);
export const getGrundBedarfUpdateFormDataFaild = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getFailed
);
export const getStatusCodeDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getLoaded
);

export const getStatusCodeDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getLoading
);
export const getStatusCodeDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getFailed
);
export const getStatusCodeData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getDatas
);
