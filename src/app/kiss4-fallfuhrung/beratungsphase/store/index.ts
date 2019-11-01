import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromBeratungsphases from './reducers/beratungsphase.reducer';

export interface BeratungsphaseState {
    beratungsphases: fromBeratungsphases.State;
}

export const reducers: ActionReducerMap<BeratungsphaseState> = {
    beratungsphases: fromBeratungsphases.reducer
};

export const getBeratungsphaseState = createFeatureSelector<BeratungsphaseState>(
    AppEnums.FeatureModule.beratungsphase
);

export const getBeratungsphasesStates = createSelector(
    getBeratungsphaseState,
    (state: BeratungsphaseState) => state.beratungsphases
);

export const getSARSelectBoxDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getSARSelectboxData.getLoading
);
export const getSARSelectBoxDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getSARSelectboxData.getFailed
);
export const getSARSelectBoxData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getSARSelectboxData.getDatas
);

export const getDPLSelectBoxDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDPLSelectboxData.getLoading
);
export const getDPLSelectBoxDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDPLSelectboxData.getFailed
);
export const getDPLSelectBoxData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDPLSelectboxData.getDatas
);

export const getGrundSelectBoxDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getGrundSelectboxData.getLoading
);
export const getGrundSelectBoxDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getGrundSelectboxData.getFailed
);
export const getGrundSelectBoxData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getGrundSelectboxData.getDatas
);

export const getBeratungsphasesFormDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesLoadFormData.getLoaded
);

export const getBeratungsphasesFormDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesLoadFormData.getLoading
);
export const getBeratungsphasesFormDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesLoadFormData.getFailed
);
export const getBeratungsphasesFormData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesLoadFormData.getDatas
);

export const getBeratungsphasesUpdateFormData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesUpdateFormData.getDatas
);

export const getBeratungsphasesUpdateFormDataUpdating = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesUpdateFormData.getUpdating
);
export const getBeratungsphasesUpdateFormDataSuccess = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesUpdateFormData.getUpdated
);
export const getBeratungsphasesUpdateFormDataFaild = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getBeratungsphasesUpdateFormData.getFailed
);

export const getUpdateFaleistungData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getUpdateFaleistungData.getDatas
);

export const getUpdateFaleistungDataUpdating = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getUpdateFaleistungData.getUpdating
);
export const getUpdateFaleistungDataSuccess = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getUpdateFaleistungData.getUpdated
);
export const getUpdateFaleistungDataFaild = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getUpdateFaleistungData.getFailed
);

export const getDatumVonAndFaLeistungIDDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDatumVonAndFaLeistungIDData.getLoaded
);

export const getDatumVonAndFaLeistungIDDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDatumVonAndFaLeistungIDData.getLoading
);
export const getDatumVonAndFaLeistungIDDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDatumVonAndFaLeistungIDData.getFailed
);
export const getDatumVonAndFaLeistungIDData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDatumVonAndFaLeistungIDData.getDatas
);

export const getCountDuplicateDatumVonDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDuplicateDatumVonData.getLoaded
);

export const getCountDuplicateDatumVonDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDuplicateDatumVonData.getLoading
);
export const getCountDuplicateDatumVonDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDuplicateDatumVonData.getFailed
);
export const getCountDuplicateDatumVonData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDuplicateDatumVonData.getDatas
);

export const getMandatoryFieldDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getMandatoryFieldData.getLoaded
);

export const getMandatoryFieldDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getMandatoryFieldData.getLoading
);
export const getMandatoryFieldDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getMandatoryFieldData.getFailed
);
export const getMandatoryFieldData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getMandatoryFieldData.getDatas
);

export const getCheckMinimalAllTargetsDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCheckMinimalAllTargetsData.getLoaded
);

export const getCheckMinimalAllTargetsDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCheckMinimalAllTargetsData.getLoading
);
export const getCheckMinimalAllTargetsDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCheckMinimalAllTargetsData.getFailed
);
export const getCheckMinimalAllTargetsData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCheckMinimalAllTargetsData.getDatas
);

export const getFaLeistungByBaPersonIDDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFaLeistungByBaPersonIDData.getLoaded
);

export const getFaLeistungByBaPersonIDDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFaLeistungByBaPersonIDData.getLoading
);
export const getFaLeistungByBaPersonIDDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFaLeistungByBaPersonIDData.getFailed
);
export const getFaLeistungByBaPersonIDData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFaLeistungByBaPersonIDData.getDatas
);

export const getCountFaPhaseDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCountFaPhaseData.getLoaded
);

export const getCountFaPhaseDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCountFaPhaseData.getLoading
);
export const getCountFaPhaseDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCountFaPhaseData.getFailed
);
export const getCountFaPhaseData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getCountFaPhaseData.getDatas
);

export const getNewDateByFaLeistungIDDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getNewDateByFaLeistungIDData.getLoaded
);

export const getNewDateByFaLeistungIDDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getNewDateByFaLeistungIDData.getLoading
);
export const getNewDateByFaLeistungIDDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getNewDateByFaLeistungIDData.getFailed
);
export const getNewDateByFaLeistungIDData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getNewDateByFaLeistungIDData.getDatas
);

export const getInsertFaPhaseAdding = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.insertFaPhaseData.getAdding
);
export const getInsertFaPhaseDatas = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.insertFaPhaseData.getDatas
);
export const getInsertFaPhaseSuccess = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.insertFaPhaseData.getAdded
);
export const getInsertFaPhaseFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.insertFaPhaseData.getFailed
);

export const getConfigIntDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigIntData.getLoaded
);

export const getConfigIntDataDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigIntData.getLoading
);
export const getConfigIntDataDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigIntData.getFailed
);
export const getConfigIntData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigIntData.getDatas
);

export const getConfigBoolDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigBoolData.getLoaded
);

export const getConfigBoolDataDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigBoolData.getLoading
);
export const getConfigBoolDataDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigBoolData.getFailed
);
export const getConfigBoolData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getConfigBoolData.getDatas
);
export const getDeleteFaPhaseData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDeleteFaPhaseData.getDatas
);

export const getDeleteFaPhaseDeleting = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDeleteFaPhaseData.getDeleting
);
export const getDeleteFaPhaseDeletedSuccess = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDeleteFaPhaseData.getDeleted
);
export const getDeleteFaPhaseDeletedFaild = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getDeleteFaPhaseData.getFailed
);
export const getIntakeAndBeratungsphaseCountByFaLeistungIDDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getIntakeAndBeratungsphaseCountByFaLeistungIDData.getLoaded
);

export const getIntakeAndBeratungsphaseCountByFaLeistungIDDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getIntakeAndBeratungsphaseCountByFaLeistungIDData.getLoading
);
export const getIntakeAndBeratungsphaseCountByFaLeistungIDDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getIntakeAndBeratungsphaseCountByFaLeistungIDData.getFailed
);
export const getIntakeAndBeratungsphaseCountByFaLeistungIDData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getIntakeAndBeratungsphaseCountByFaLeistungIDData.getDatas
);

export const getLicensedModuleDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getLicensedModuleData.getLoaded
);

export const getLicensedModuleDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getLicensedModuleData.getLoading
);
export const getLicensedModuleDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getLicensedModuleData.getFailed
);
export const getLicensedModuleData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getLicensedModuleData.getDatas
);
/***** Load data fall rights *****/
export const getFallRightsLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallRightsData.getLoaded
);

export const getFallRightsLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallRightsData.getLoading
);
export const getFallRightsFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallRightsData.getFailed
);
export const getFallRightsData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallRightsData.getDatas
);
/***** Get Reopen Phase *****/
export const getReopenPhaseDataLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getReopenPhaseData.getLoaded
);

export const getReopenPhaseDataLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getReopenPhaseData.getLoading
);
export const getReopenPhaseDataFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getReopenPhaseData.getFailed
);
export const getReopenPhaseData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getReopenPhaseData.getDatas
);
/***** Load data fallfuhrung *****/
export const getFallfuhrungLoaded = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallfuhrungInit.getLoaded
);

export const getFallfuhrungLoading = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallfuhrungInit.getLoading
);
export const getFallfuhrungFailed = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallfuhrungInit.getFailed
);
export const getFallfuhrungData = createSelector(
    getBeratungsphasesStates,
    fromBeratungsphases.getFallfuhrungInit.getDatas
);
/***** The End Load data fallfuhrung *****/
