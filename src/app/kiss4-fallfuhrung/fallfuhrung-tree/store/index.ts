import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as formFallfuhrungTree from './reducers/fallfuhrung-tree.reducer';

export interface IFallfuhrungTreeState {
  fallfuhrungTree: formFallfuhrungTree.State;
}

export const reducers: ActionReducerMap<IFallfuhrungTreeState> = {
  fallfuhrungTree: formFallfuhrungTree.reducer
};

export const getFeatureFallfuhrungTreeState = createFeatureSelector<IFallfuhrungTreeState>(
  AppEnums.FeatureModule.fallfuhrungTree
);

export const getFallfuhrungTreeState = createSelector(
  getFeatureFallfuhrungTreeState,
  (state: IFallfuhrungTreeState) => state.fallfuhrungTree,
);

export const getFallfuhrungTreeLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFallfuhrungTreeLoaded,
);

export const getFallfuhrungTreeLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFallfuhrungTreeLoading,
);

export const getFallfuhrungTreeFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFallfuhrungTreeFailed,
);

export const getFallfuhrungTreeVisibleZeitachse = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFallfuhrungTreeVisibleZeitachse,
);

export const getFallfuhrungTreePerson = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFallfuhrungTreePerson,
);

export const getTreeViewItemsLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeViewItems.getLoading
);

export const getTreeViewItemsFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeViewItems.getFailed
);

export const getTreeViewItems = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeViewItems.getData,
);

export const getEditModeStatus = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getEditModeStatus
);

export const getDirtyFormStatus = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getDirtyFormStatus
);

export const getSelectedNode = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getSelectedNode
);

export const getAddNewNode = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getAddNewNode
);

export const getRightContentItemsLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getRightContentItems.getLoading
);

export const getRightContentItemsFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getRightContentItems.getFailed
);

export const getRightContentItems = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getRightContentItems.getData
);

export const getUserIDFaLeistungLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUserIDFaLeistung.getLoading
);

export const getUserIDFaLeistungFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUserIDFaLeistung.getFailed
);

export const getUserIDFaLeistung = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUserIDFaLeistung.getData
);

export const getUserIDFaPhaseLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUserIDFaPhase.getLoading
);

export const getUserIDFaPhaseFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUserIDFaPhase.getFailed
);

export const getUserIDFaPhase = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUserIDFaPhase.getData
);

// Get B Module tree
export const getBNavigatorLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getBNavigatorItems.getLoading
);

export const getBNavigatorItemsFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getBNavigatorItems.getFailed
);

export const getBNavigatorItems = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getBNavigatorItems.getData,
);

export const deleteFaPhaseData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFaPhaseData.getDatas
);

export const deleteFaPhaseDeleting = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFaPhaseData.getDeleting
);
export const deleteFaPhaseDeletedSuccess = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFaPhaseData.getDeleted
);
export const deleteFaPhaseDeletedFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFaPhaseData.getFailed
);

export const getFaleistungLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaleistungData.getLoaded
);

export const getFaleistungLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaleistungData.getLoading
);
export const getFaleistungFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaleistungData.getFailed
);
export const getFaleistungData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaleistungData.getData
);

export const deleteFallverlaufData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFallverlaufData.getDatas
);
export const deleteFallverlaufDeleting = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFallverlaufData.getDeleting
);
export const deleteFallverlaufDeletedSuccess = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFallverlaufData.getDeleted
);
export const deleteFallverlaufDeletedFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteFallverlaufData.getFailed
);

// Delete BaPersonRelation
export const deleteBaPersonrelationLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteBaPersonRelation.getLoading
);

export const deleteBaPersonrelationFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteBaPersonRelation.getFailed
);

export const deleteBaPersonrelation = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.deleteBaPersonRelation.getData,
);

export const loadMessage = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.loadMessage
);

export const loadFallNavigator = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.loadFallNavigator
);

export const getNodesStatus = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getNodesStatus
);

// New Intake
export const getFaLeistungByBaPersonIDDataLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaLeistungByBaPersonIDData.getLoaded
);

export const getFaLeistungByBaPersonIDDataLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaLeistungByBaPersonIDData.getLoading
);
export const getFaLeistungByBaPersonIDDataFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaLeistungByBaPersonIDData.getFailed
);
export const getFaLeistungByBaPersonIDData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaLeistungByBaPersonIDData.getDatas
);

export const getCountFaPhaseDataLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountFaPhaseData.getLoaded
);

export const getCountFaPhaseDataLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountFaPhaseData.getLoading
);
export const getCountFaPhaseDataFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountFaPhaseData.getFailed
);
export const getCountFaPhaseData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountFaPhaseData.getDatas
);

export const getFaPhaseByFaLeistungIDDataLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaPhaseByFaLeistungIDData.getLoaded
);

export const getFaPhaseByFaLeistungIDDataLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaPhaseByFaLeistungIDData.getLoading
);
export const getFaPhaseByFaLeistungIDDataFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaPhaseByFaLeistungIDData.getFailed
);
export const getFaPhaseByFaLeistungIDData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getFaPhaseByFaLeistungIDData.getDatas
);

export const getInsertFaPhaseAdding = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.insertFaPhaseData.getAdding
);
export const getInsertFaPhaseDatas = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.insertFaPhaseData.getDatas
);
export const getInsertFaPhaseSuccess = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.insertFaPhaseData.getAdded
);
export const getInsertFaPhaseFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.insertFaPhaseData.getFailed
);

export const getConfigIntDataLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigIntData.getLoaded
);
export const getConfigIntDataDataLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigIntData.getLoading
);
export const getConfigIntDataDataFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigIntData.getFailed
);
export const getConfigIntData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigIntData.getDatas
);

export const getConfigBoolDataLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigBoolData.getLoaded
);
export const getConfigBoolDataDataLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigBoolData.getLoading
);
export const getConfigBoolDataDataFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigBoolData.getFailed
);
export const getConfigBoolData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigBoolData.getDatas
);

export const getUpdateFaleistungData = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUpdateFaleistungData.getDatas
);
export const getUpdateFaleistungDataUpdating = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUpdateFaleistungData.getUpdating
);
export const getUpdateFaleistungDataSuccess = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUpdateFaleistungData.getUpdated
);
export const getUpdateFaleistungDataFaild = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getUpdateFaleistungData.getFailed
);

export const getConfigOffeneIntakeLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigOffeneIntake.getLoaded
);
export const getConfigOffeneIntakeLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigOffeneIntake.getLoading
);
export const getConfigOffeneIntakeFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigOffeneIntake.getFailed
);
export const getConfigOffeneIntake = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigOffeneIntake.getDatas
);

export const getConfigTotalBeratungsphasenLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTotalBeratungsphasen.getLoaded
);
export const getConfigTotalBeratungsphasenLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTotalBeratungsphasen.getLoading
);
export const getConfigTotalBeratungsphasenFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTotalBeratungsphasen.getFailed
);
export const getConfigTotalBeratungsphasen = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTotalBeratungsphasen.getDatas
);

export const getConfigTransferPhaseUserLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTransferPhaseUser.getLoaded
);
export const getConfigTransferPhaseUserLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTransferPhaseUser.getLoading
);
export const getConfigTransferPhaseUserFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTransferPhaseUser.getFailed
);
export const getConfigTransferPhaseUser = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getConfigTransferPhaseUser.getDatas
);

export const getMessageInformationLoaded = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getMessageInformation.getLoaded
);
export const getMessageInformationLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getMessageInformation.getLoading
);
export const getMessageInformationFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getMessageInformation.getFailed
);
export const getMessageInformation = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getMessageInformation.getDatas
);
// End New Intake

// Get CountBgFinanzPlan
export const getCountBgFinanzPlanLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountBgFinanzPlan.getLoading
);

export const getCountBgFinanzPlanFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountBgFinanzPlan.getFailed
);

export const getCountBgFinanzPlan = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getCountBgFinanzPlan.getData,
);

export const getBaPersonIDModulIDLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getBaPersonIDModulID.getLoading
);

export const getBaPersonIDModulIDFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getBaPersonIDModulID.getFailed
);

export const getBaPersonIDModulID = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getBaPersonIDModulID.getData,
);

export const getTreeNodeUpdateState = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeNodeUpdateState,
);

export const getTreeFallNavigatorLoading = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeFallNavigator.getLoading
);

export const getTreeFallNavigatorFailed = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeFallNavigator.getFailed
);

export const getTreeFallNavigator = createSelector(
  getFallfuhrungTreeState,
  formFallfuhrungTree.getTreeFallNavigator.getData,
);
