import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs';

import {
  FallNavigator,
  GetConfigIntQueryModel,
  InsertFaPhaseQueryModel,
  Message,
  MessageInformationQueryModel,
  UpdateFaLeistungQueryModel,
} from './models';
import { BNavigatorItemsQuery } from './models/b-navigator.model';
import { BapersonRelationQuery } from './models/baperson-relation.model';
import { TreeViewItemsQuery } from './models/tree-view-item.model';
import * as fallfuhrungTreeStore from './store';
import * as fallfuhrungTreeActions from './store/actions/fallfuhrung-tree.actions';

@Injectable()
export class FallfuhrungTreeSandbox extends Sandbox {
  public fallfuhrungTreeLoaded$ = this.fallfuhrungTreeState$.pipe(select(fallfuhrungTreeStore.getFallfuhrungTreeLoaded));
  public fallfuhrungTreeLoading$ = this.fallfuhrungTreeState$.pipe(select(fallfuhrungTreeStore.getFallfuhrungTreeLoading));
  public fallfuhrungTreeFailed$ = this.fallfuhrungTreeState$.pipe(select(fallfuhrungTreeStore.getFallfuhrungTreeFailed));

  public fallfuhrungTreeVisibleZeitachse$ = this.fallfuhrungTreeState$.pipe(select(fallfuhrungTreeStore.getFallfuhrungTreeVisibleZeitachse));
  public fallfuhrungTreePerson$ = this.fallfuhrungTreeState$.pipe(select(fallfuhrungTreeStore.getFallfuhrungTreePerson));

  public treeViewItemsLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeViewItemsLoading);
  public treeViewItemsFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeViewItemsFailed);
  public treeViewItems$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeViewItems);

  public isEditModeStatus$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getEditModeStatus);
  public isDirtyFormStatus$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getDirtyFormStatus);
  public selectedNode$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getSelectedNode);
  public addNewNode$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getAddNewNode);

  public rightContentItemsLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getRightContentItemsLoading);
  public rightContentItemsFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getRightContentItemsFailed);
  public rightContentItems$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getRightContentItems);

  public userIDFaLeistungLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getUserIDFaLeistungLoading);
  public userIDFaLeistungFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getUserIDFaLeistungFailed);
  public userIDFaLeistung$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getUserIDFaLeistung);

  public userIDFaPhaseLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getUserIDFaPhaseLoading);
  public userIDFaPhaseFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getUserIDFaPhaseFailed);
  public userIDFaPhase$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getUserIDFaPhase);

  public bNavigatorLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getBNavigatorLoading);
  public bNavigatorFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getBNavigatorItemsFailed);
  public bNavigatorItems$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getBNavigatorItems);

  public deleteFaPhaseData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.deleteFaPhaseData
  );
  public getFaleistungData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getFaleistungData
  );
  public deleteFallverlaufData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.deleteFallverlaufData
  );

  public deleteBaPersonRelationLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.deleteBaPersonrelationLoading);
  public deleteBaPersonRelationFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.deleteBaPersonrelationFailed);
  public deleteBaPersonRelation$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.deleteBaPersonrelation);

  public loadMessage$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.loadMessage);
  public loadFallNavigator$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.loadFallNavigator);

  public nodesStatus$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getNodesStatus);

  // Get FaLeistung By BaPersonID
  public GetFaLeistungByBaPersonIDData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getFaLeistungByBaPersonIDData
  );
  // Get Count FaPhase Data
  public GetCountFaPhaseData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getCountFaPhaseData
  );
  // Get FaPhase By FaLeistungID Data
  public GetFaPhaseByFaLeistungIDData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getFaPhaseByFaLeistungIDData
  );
  // Get Insert FaPhase Data
  public GetInsertFaPhaseData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getInsertFaPhaseDatas
  );
  // Get Config Int Data
  public GetConfigIntData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getConfigIntData
  );
  // Get Config Bool Data
  public GetConfigBoolData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getConfigBoolData
  );
  // Update FaLeistung Data
  public GetUpdateFaleistungData$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getUpdateFaleistungData
  );
  // Get Config Offene Intake
  public GetConfigOffeneIntake$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getConfigOffeneIntake
  );
  // Get Config Total Beratungsphasen
  public GetConfigTotalBeratungsphasen$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getConfigTotalBeratungsphasen
  );
  // Get Config TransferPhase User
  public GetConfigTransferPhaseUser$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getConfigTransferPhaseUser
  );
  // Get Message Information
  public GetMessageInformation$ = this.fallfuhrungTreeState$.select(
    fallfuhrungTreeStore.getMessageInformation
  );

  public getCountBgFinanzPlanLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getCountBgFinanzPlanLoading);
  public getCountBgFinanzPlanFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getCountBgFinanzPlanFailed);
  public getCountBgFinanzPlan$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getCountBgFinanzPlan);

  public baPersonIDModulIDLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getBaPersonIDModulIDLoading);
  public baPersonIDModulIDFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getBaPersonIDModulIDFailed);
  public baPersonIDModulID$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getBaPersonIDModulID);

  public treeNodeUpdateState$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeNodeUpdateState);

  public treeFallNavigatorLoading$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeFallNavigatorLoading);
  public treeFallNavigatorFailed$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeFallNavigatorFailed);
  public treeFallNavigator$ = this.fallfuhrungTreeState$.select(fallfuhrungTreeStore.getTreeFallNavigator);

  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    private fallfuhrungTreeState$: Store<fallfuhrungTreeStore.IFallfuhrungTreeState>,
  ) {
    super(appState$);
  }

  public getIconMoudle(baPersonID: string, faFallID: any) {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadIconModuleAction.LoadAction({ baPersonID, faFallID }));
  }

  public getVisibleZeitachse() {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadVisibleZeitachseAction.LoadAction());
  }

  public getPersonInfoTitle(baPersonID: string, userID: number, languageCode: number) {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadPersonInfoTitelAction.LoadAction({ baPersonID, userID, languageCode }));
  }

  public loadPrePerson(baPersonID: string) {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadTabPersonAction.LoadPreAction(baPersonID));
  }

  public loadNextPerson(baPersonID: string) {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadTabPersonAction.LoadNextAction(baPersonID));
  }

  public loadClosePerson(baPersonID: string) {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadTabPersonAction.LoadCloseAction(baPersonID));
  }

  public getTreeViewItems(treeViewItemsQuery?: TreeViewItemsQuery): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadTreeViewItemsAction.LoadAction(treeViewItemsQuery));
  }

  public updateEditModeStatus(isEditMode: boolean): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.UpdateEditModeStatusAction(isEditMode));
  }

  public updateDirtyFormStatus(isDirtyForm: boolean): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.UpdateDirtyFormStatusAction(isDirtyForm));
  }

  public updateSelectedNode(selectedNode: any): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.UpdateSelectedNodeAction(selectedNode));
  }

  public addNewNode(addNewNode: any): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.AddNewNodeAction(addNewNode));
  }

  public getRightContentItems(LOVName: string): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadRightContentItemsAction.LoadAction(LOVName));
  }

  public getUserIDFaLeistung(FaLeistungID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadUserIDFaLeistungAction.LoadAction(FaLeistungID));
  }

  public getUserIDFaPhase(FaPhaseID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadUserIDFaPhaseAction.LoadAction(FaPhaseID));
  }

  public loadBNavigatorItems(bNavigatorItemsQuery?: BNavigatorItemsQuery): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.BNavigatorItemsAction.LoadAction(bNavigatorItemsQuery));
  }
  public deleteFaPhaseData(faPhaseID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.DeleteFaPhaseData.DeleteFaPhaseDataAction(faPhaseID));
  }
  public getFaleistungData(faleistungID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetFaLeistungAction.LoadAction(faleistungID));
  }
  public deleteFallverlaufData(faLeistungID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.DeleteFallverlaufData.DeleteFallverlaufAction(faLeistungID));
  }
  public resetTreeState(): void {
    this.fallfuhrungTreeState$.dispatch(
      new fallfuhrungTreeActions.LoadTreeViewItemsAction.ResetStateAction()
    );
  }

  public deleteBaPersonRelation(baPersonRelationQuery: BapersonRelationQuery): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.DeleteBapersonRelationAction.DeleteAction(baPersonRelationQuery));
  }

  public loadMessage(data: Message): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadMessageAction(data));
  }

  public loadFallNavigator(data: FallNavigator): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadFallNavigatorAction(data));
  }

  public updateNodesStatus(data: any): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.UpdateNodesStatusAction(data));
  }

  // Get FaLeistung By BaPersonID
  public getFaLeistungByBaPersonIDData(baPersonID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDDataAction(baPersonID));
  }
  // Get Count FaPhase
  public getCountFaPhaseData(faLeistungID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetCountFaPhaseData.GetCountFaPhaseDataAction(faLeistungID));
  }
  // Get FaPhase By FaLeistungID
  public getFaPhaseByFaLeistungIDData(faLeistungID: number): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDDataAction(faLeistungID));
  }
  //  Insert FaPhase
  public insertFaPhaseData(model: InsertFaPhaseQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.InsertFaPhaseData.InsertFaPhaseDataAction(model));
  }
  //  Update Faleistung data
  public updateFaleistungData(model: UpdateFaLeistungQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.UpdateFaLeistungData.UpdateFaLeistungDataAction(model));
  }
  // Get Config int data
  public getConfigIntData(model: GetConfigIntQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetConfigIntData.GetConfigIntDataAction(model));
  }
  // Get Config Bool data
  public getConfigBoolData(model: GetConfigIntQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetConfigBoolData.GetConfigBoolDataAction(model));
  }
  // Get Config Offene Intake
  public getConfigOffeneIntake(model: GetConfigIntQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetConfigOffeneIntakeData.GetConfigOffeneIntakeAction(model));
  }
  // Get Config Total Beratungsphasen
  public getConfigTotalBeratungsphasen(model: GetConfigIntQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenAction(model));
  }
  // Get Config TransferPhase User
  public getConfigTransferPhaseUser(model: GetConfigIntQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserAction(model));
  }
  // Get Message Information
  public getMessageInformation(model: MessageInformationQueryModel): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.LoadMessageInformationAction.LoadAction(model));
  }

  public getCountBgFinanzPlan(data: BapersonRelationQuery): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.CountBgFinanzPlanAction.GetAction(data));
  }

  public getBaPersonIDModulID(faLeistungID: any): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetBaPersonIDModulIDAction.LoadAction(faLeistungID));
  }

  public changeTreeNodeUpdateState(isUpdatedTreeNode: any): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.ChangeTreeNodeUpdateStateAction(isUpdatedTreeNode));
  }

  public getTreeFallNavigator(query: any): void {
    this.fallfuhrungTreeState$.dispatch(new fallfuhrungTreeActions.GetTreeFallNavigatorAction.LoadAction(query));
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public registerEvents(): void {
    this.subscriptions.push(this.loggedUser$.subscribe((user: any) => {
      if (user.isLoggedIn) {
        // Do something here
      } else {
        this.unregisterEvents();
        this.clearStore();
      }
    }));
  }

  clearStore() {
    fallfuhrungTreeStore.getFallfuhrungTreeLoaded.release();
    fallfuhrungTreeStore.getFallfuhrungTreeLoading.release();
    fallfuhrungTreeStore.getFallfuhrungTreeFailed.release();
    fallfuhrungTreeStore.getFallfuhrungTreeVisibleZeitachse.release();
    fallfuhrungTreeStore.getFallfuhrungTreePerson.release();
    fallfuhrungTreeStore.getTreeViewItems.release();
    fallfuhrungTreeStore.getBNavigatorItems.release();
    fallfuhrungTreeStore.deleteBaPersonrelation.release();
    fallfuhrungTreeStore.getCountBgFinanzPlan.release();
  }
}
