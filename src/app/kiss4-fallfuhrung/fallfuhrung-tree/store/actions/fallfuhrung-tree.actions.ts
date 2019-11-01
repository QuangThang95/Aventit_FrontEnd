import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites';

import { FallNavigator, Message } from '../../models';

export const LoadMoudleIconTypes = {
  LOAD: type('[FallfuhrungTree] Load Moudle Icon'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load Moudle Icon Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load Moudle Icon Fail'),
};
export const LoadVisibleZeitachseTypes = {
  LOAD: type('[FallfuhrungTree] Load VisibleZeitachse'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load VisibleZeitachse Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load VisibleZeitachse Fail'),
};
export const LoadPersonInfoTitleTypes = {
  LOAD: type('[FallfuhrungTree] Load Person Info Title'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load Person Info Title Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load Person Info Title Fail'),
};
export const LoadTabPersonTypes = {
  LOAD_PRE: type('[FallfuhrungTree] Load Tab Person Pre'),
  LOAD_NEXT: type('[FallfuhrungTree] Load Tab Person Next'),
  LOAD_CLOSE: type('[FallfuhrungTree] Load Tab Person Close'),
};

export const LoadTreeViewItemsTypes = {
  LOAD: type('[FallfuhrungTree] Load Tree View Items'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load Tree View Items Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load Tree View Items Fail'),
  RESET_STATE: type('[FallfuhrungTree] Reset State')
};

export const EditModeStatusTypes = {
  UPDATE_EDIT_MODE: type('[FallfuhrungTree] Change Edit Mode Status'),
};

export const DirtyFormStatusTypes = {
  UPDATE_DIRTY_FORM_STATUS: type('[FallfuhrungTree] Change Dirty Form Status'),
};

export const SelectedNodeTypes = {
  UPDATE_SELECTED_NODE: type('[FallfuhrungTree] Update Selected Node'),
};

export const AddNewNodeTypes = {
  ADD_NEW_NODE: type('[FallfuhrungTree] Add New Node'),
};

export const RightContentItemsTypes = {
  LOAD: type('[FallfuhrungTree] Load Right Content Items'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load Right Content Items Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load Right Content Items Fail'),
};

export const UserIDFaLeistungTypes = {
  LOAD: type('[FallfuhrungTree] Load UserID FaLeistung'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load UserID FaLeistung Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load UserID FaLeistung Fail'),
};

export const UserIDFaPhaseTypes = {
  LOAD: type('[FallfuhrungTree] Load UserID FaPhase'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load UserID FaPhase Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load UserID FaPhase Fail'),
};

export const LoadBNavigatorItemsTypes = {
  LOAD: type('[FallfuhrungTree] Load BNavigator Items'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load BNavigator Items Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load BNavigator Items Fail')
};

export const DeleteFaPhaseTypes = {
  DELETE_FAPHASE: type('[FallfuhrungTree] Delete FaPhase New'),
  DELETE_FAPHASE_SUCCESS: type('[FallfuhrungTree] Delete FaPhase Success'),
  DELETE_FAPHASE_FAIL: type('[FallfuhrungTree] Delete FaPhase Fail')
};

export const GetFaLeistungTypes = {
  LOAD: type('[FallfuhrungTree] Load FaLeistung'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load FaLeistung Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load FaLeistung Fail'),
};

export const DeleteFallverlaufTypes = {
  DELETE_Fallverlauf: type('[FallfuhrungTree] Delete Fallverlauf'),
  DELETE_Fallverlauf_SUCCESS: type('[FallfuhrungTree] Delete Fallverlauf Success'),
  DELETE_Fallverlauf_FAIL: type('[FallfuhrungTree] Delete Fallverlauf Fail')
};
export const DeleteBaPersonRelationTypes = {
  DELETE: type('[FallfuhrungTree] Delete BaPerson Relation'),
  DELETE_SUCCESS: type('[FallfuhrungTree] Delete BaPerson Relation Success'),
  DELETE_FAIL: type('[FallfuhrungTree] Delete BaPerson Relation Fail')
};
export const LoadMessageTypes = {
  LOAD_MESSAGE: type('[FallfuhrungTree] Load Message'),
};
export const LoadDataFallNavigatorTypes = {
  LOAD_FALL_NAVIGATOR: type('[FallfuhrungTree] Load Data Fall Navigator'),
};

export const NodesStatusTypes = {
  UPDATE_NODES_STATUS: type('[FallfuhrungTree] Update Nodes Status'),
};

// Action Add New Intake
export const GetFaLeistungByBaPersonIDTypes = {
  LOAD: type('[FallfuhrungTree] Get FaLeistung By BaPersonID'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get FaLeistung By BaPersonID Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get FaLeistung By BaPersonID Fail')
};

export const GetCountFaPhaseTypes = {
  LOAD: type('[FallfuhrungTree] Get Count FaPhase'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get Count FaPhase Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get Count FaPhase Fail')
};

export const GetConfigIntTypes = {
  LOAD: type('[FallfuhrungTree] Get Config Total Intake'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get Config Total Intake Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get Config Total Intake Fail')
};

export const GetConfigOffeneIntakeTypes = {
  LOAD: type('[FallfuhrungTree] Get Config Offene Intake'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get Config Offene Intake Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get Config Offene Intake Fail')
};

export const GetConfigTotalBeratungsphasenTypes = {
  LOAD: type('[FallfuhrungTree] Get Config Total Beratungsphasen'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get Config Total Beratungsphasen Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get Config Total Beratungsphasen Fail')
};

export const GetConfigTransferPhaseUserTypes = {
  LOAD: type('[FallfuhrungTree] Get Config TransferPhase User'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get Config TransferPhase User Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get Config TransferPhase User Fail')
};

export const GetConfigBoolTypes = {
  LOAD: type('[FallfuhrungTree] Get Config Bool'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get Config Bool Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get Config Bool Fail')
};

export const GetFaPhaseByFaLeistungIDTypes = {
  LOAD: type('[FallfuhrungTree] Get FaPhase by FaleistungID'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Get FaPhase by FaleistungID Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Get FaPhase by FaleistungID Fail')
};

export const UpdateFaLeistungDataTypes = {
  UPDATE_FALEISTUNG_DATA: type('[FallfuhrungTree] Update FaLeistung data'),
  UPDATING_FALEISTUNG_DATA: type('[FallfuhrungTree] Updating FaLeistung data'),
  UPDATE_FALEISTUNG_SUCCESS: type('[FallfuhrungTree] Update FaLeistung data Success'),
  UPDATE_FALEISTUNG_FAIL: type('[FallfuhrungTree] Update FaLeistung data Fail')
};

export const InsertFaPhaseTypes = {
  ADD: type('[FallfuhrungTree] Add new'),
  ADDING: type('[FallfuhrungTree] Adding'),
  ADD_SUCCESS: type('[FallfuhrungTree] Add new succes'),
  ADD_FAIL: type('[FallfuhrungTree] Load Add new Fail')
};

export const LoadMessageInformationTypes = {
  LOAD: type('[FallfuhrungTree] Load Message Information'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load Message Information Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load Message Information Fail'),
};
// End Action Add New Intake

export const GetCountBgFinanzPlanTypes = {
  LOAD: type('[FallfuhrungTree] Load Count BgFinanzPlan'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load Count BgFinanzPlan Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load Count BgFinanzPlan Fail'),
};

export const GetBaPersonIDModulIDTypes = {
  LOAD: type('[FallfuhrungTree] Load BaPersonIDModulID'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load BaPersonIDModulID Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load BaPersonIDModulID Fail'),
};

export const ChangeTreeNodeUpdateStateTypes = {
  CHANGE_TREE_NODE_UPDATE_STATE: type('[FallfuhrungTree] Change TreeNode Update State'),
};

export const GetTreeFallNavigatorTypes = {
  LOAD: type('[FallfuhrungTree] Load TreeFallNavigator'),
  LOAD_SUCCESS: type('[FallfuhrungTree] Load TreeFallNavigator Success'),
  LOAD_FAIL: type('[FallfuhrungTree] Load TreeFallNavigator Fail'),
};

export const FallfuhrungTreeActionTypes = {
  LoadIconMoudleTypes: LoadMoudleIconTypes,
  LoadVisibleZeitachseTypes: LoadVisibleZeitachseTypes,
  LoadPersonInfoTitelTypes: LoadPersonInfoTitleTypes,
  LoadTabPersonTypes: LoadTabPersonTypes,
  LoadTreeViewItemsTypes: LoadTreeViewItemsTypes,
  EditModeStatusTypes: EditModeStatusTypes,
  DirtyFormStatusTypes: DirtyFormStatusTypes,
  SelectedNodeTypes: SelectedNodeTypes,
  RightContentItemsTypes: RightContentItemsTypes,
  UserIDFaLeistungTypes: UserIDFaLeistungTypes,
  UserIDFaPhaseTypes: UserIDFaPhaseTypes,
  LoadBNavigatorItemsTypes: LoadBNavigatorItemsTypes,
  DeleteFaPhaseTypes: DeleteFaPhaseTypes,
  GetFaLeistungTypes: GetFaLeistungTypes,
  DeleteFallverlaufTypes: DeleteFallverlaufTypes,
  DeleteBaPersonRelationTypes: DeleteBaPersonRelationTypes,
  AddNewNodeTypes: AddNewNodeTypes,
  LoadMessageTypes: LoadMessageTypes,
  LoadDataFallNavigatorTypes: LoadDataFallNavigatorTypes,
  NodesStatusTypes: NodesStatusTypes,
  GetFaLeistungByBaPersonIDTypes: GetFaLeistungByBaPersonIDTypes,
  GetCountFaPhaseTypes: GetCountFaPhaseTypes,
  GetFaPhaseByFaLeistungIDTypes: GetFaPhaseByFaLeistungIDTypes,
  InsertFaPhaseTypes: InsertFaPhaseTypes,
  UpdateFaLeistungDataTypes: UpdateFaLeistungDataTypes,
  GetConfigIntTypes: GetConfigIntTypes,
  GetConfigBoolTypes: GetConfigBoolTypes,
  GetConfigOffeneIntakeTypes: GetConfigOffeneIntakeTypes,
  GetConfigTotalBeratungsphasenTypes: GetConfigTotalBeratungsphasenTypes,
  GetConfigTransferPhaseUserTypes: GetConfigTransferPhaseUserTypes,
  LoadMessageInformationTypes: LoadMessageInformationTypes,
  GetCountBgFinanzPlanTypes: GetCountBgFinanzPlanTypes,
  GetBaPersonIDModulIDTypes: GetBaPersonIDModulIDTypes,
  ChangeTreeNodeUpdateStateTypes: ChangeTreeNodeUpdateStateTypes,
  GetTreeFallNavigatorTypes: GetTreeFallNavigatorTypes,
};

export namespace LoadIconModuleAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadMoudleIconTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadMoudleIconTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadMoudleIconTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace LoadVisibleZeitachseAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadVisibleZeitachseTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadVisibleZeitachseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadVisibleZeitachseTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export namespace LoadPersonInfoTitelAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadPersonInfoTitleTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadPersonInfoTitleTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadPersonInfoTitleTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export namespace LoadTabPersonAction {
  export class LoadPreAction implements AppStateAction {
    readonly type = LoadTabPersonTypes.LOAD_PRE;
    constructor(public payload?: any) { }
  }
  export class LoadNextAction implements AppStateAction {
    readonly type = LoadTabPersonTypes.LOAD_NEXT;
    constructor(public payload?: any) { }
  }
  export class LoadCloseAction implements AppStateAction {
    readonly type = LoadTabPersonTypes.LOAD_CLOSE;
    constructor(public payload?: any) { }
  }
}

export namespace LoadTreeViewItemsAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
  export class ResetStateAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.RESET_STATE;
    constructor(public payload?: any) {
    }
  }
}

export class UpdateEditModeStatusAction implements AppStateAction {
  readonly type = EditModeStatusTypes.UPDATE_EDIT_MODE;
  constructor(public payload?: any) {
  }
}

export class UpdateDirtyFormStatusAction implements AppStateAction {
  readonly type = DirtyFormStatusTypes.UPDATE_DIRTY_FORM_STATUS;
  constructor(public payload?: any) {
  }
}

export class UpdateSelectedNodeAction implements AppStateAction {
  readonly type = SelectedNodeTypes.UPDATE_SELECTED_NODE;
  constructor(public payload?: any) {
  }
}

export class AddNewNodeAction implements AppStateAction {
  readonly type = AddNewNodeTypes.ADD_NEW_NODE;
  constructor(public payload?: any) {
  }
}

export namespace LoadRightContentItemsAction {
  export class LoadAction implements AppStateAction {
    readonly type = RightContentItemsTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = RightContentItemsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = RightContentItemsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace LoadUserIDFaLeistungAction {
  export class LoadAction implements AppStateAction {
    readonly type = UserIDFaLeistungTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = UserIDFaLeistungTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = UserIDFaLeistungTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace LoadUserIDFaPhaseAction {
  export class LoadAction implements AppStateAction {
    readonly type = UserIDFaPhaseTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = UserIDFaPhaseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = UserIDFaPhaseTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace BNavigatorItemsAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadBNavigatorItemsTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadBNavigatorItemsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = LoadBNavigatorItemsTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace DeleteFaPhaseData {
  export class DeleteFaPhaseDataAction implements AppStateAction {
    readonly type = DeleteFaPhaseTypes.DELETE_FAPHASE;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFaPhaseDataSuccessAction implements AppStateAction {
    readonly type = DeleteFaPhaseTypes.DELETE_FAPHASE_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFaPhaseDataFailAction implements AppStateAction {
    readonly type = DeleteFaPhaseTypes.DELETE_FAPHASE_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetFaLeistungAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetFaLeistungTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetFaLeistungTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetFaLeistungTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace DeleteFallverlaufData {
  export class DeleteFallverlaufAction implements AppStateAction {
    readonly type = DeleteFallverlaufTypes.DELETE_Fallverlauf;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFallverlaufSuccessAction implements AppStateAction {
    readonly type = DeleteFallverlaufTypes.DELETE_Fallverlauf_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFallverlaufFailAction implements AppStateAction {
    readonly type = DeleteFallverlaufTypes.DELETE_Fallverlauf_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace DeleteBapersonRelationAction {
  export class DeleteAction implements AppStateAction {
    readonly type = DeleteBaPersonRelationTypes.DELETE;
    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = DeleteBaPersonRelationTypes.DELETE_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = DeleteBaPersonRelationTypes.DELETE_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export class LoadMessageAction implements AppStateAction {
  readonly type = LoadMessageTypes.LOAD_MESSAGE;
  constructor(public payload: Message) {
  }
}
export class LoadFallNavigatorAction implements AppStateAction {
  readonly type = LoadDataFallNavigatorTypes.LOAD_FALL_NAVIGATOR;
  constructor(public payload: FallNavigator) {
  }
}

export class UpdateNodesStatusAction implements AppStateAction {
  readonly type = NodesStatusTypes.UPDATE_NODES_STATUS;
  constructor(public payload?: any) {
  }
}

export namespace GetFaLeistungByBaPersonIDData {
  export class GetFaLeistungByBaPersonIDDataAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetFaLeistungByBaPersonIDSuccessAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetFaLeistungByBaPersonIDFailAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetCountFaPhaseData {
  export class GetCountFaPhaseDataAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetCountFaPhaseSuccessAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetCountFaPhaseFailAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetConfigIntData {
  export class GetConfigIntDataAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigIntSuccessAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigIntFailAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetConfigBoolData {
  export class GetConfigBoolDataAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigBoolSuccessAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigBoolFailAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetFaPhaseByFaLeistungIDData {
  export class GetFaPhaseByFaLeistungIDDataAction implements AppStateAction {
    readonly type = GetFaPhaseByFaLeistungIDTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetFaPhaseByFaLeistungIDSuccessAction implements AppStateAction {
    readonly type = GetFaPhaseByFaLeistungIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetFaPhaseByFaLeistungIDFailAction implements AppStateAction {
    readonly type = GetFaPhaseByFaLeistungIDTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace InsertFaPhaseData {
  export class InsertFaPhaseDataAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ADD;
    constructor(public payload?: any) {
    }
  }

  export class InsertFaPhaseSuccessAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ADD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class InsertFaPhaseFailAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ADD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace UpdateFaLeistungData {
  export class UpdateFaLeistungDataAction implements AppStateAction {
    readonly type = UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_DATA;
    constructor(public payload?: any) {
    }
  }

  export class UpdateFaLeistungDataSuccessAction implements AppStateAction {
    readonly type = UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateFaLeistungDataFailAction implements AppStateAction {
    readonly type = UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetConfigOffeneIntakeData {
  export class GetConfigOffeneIntakeAction implements AppStateAction {
    readonly type = GetConfigOffeneIntakeTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigOffeneIntakeSuccessAction implements AppStateAction {
    readonly type = GetConfigOffeneIntakeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigOffeneIntakeFailAction implements AppStateAction {
    readonly type = GetConfigOffeneIntakeTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetConfigTotalBeratungsphasenData {
  export class GetConfigTotalBeratungsphasenAction implements AppStateAction {
    readonly type = GetConfigTotalBeratungsphasenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigTotalBeratungsphasenSuccessAction implements AppStateAction {
    readonly type = GetConfigTotalBeratungsphasenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigTotalBeratungsphasenFailAction implements AppStateAction {
    readonly type = GetConfigTotalBeratungsphasenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetConfigTransferPhaseUserData {
  export class GetConfigTransferPhaseUserAction implements AppStateAction {
    readonly type = GetConfigTransferPhaseUserTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigTransferPhaseUserSuccessAction implements AppStateAction {
    readonly type = GetConfigTransferPhaseUserTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigTransferPhaseUserFailAction implements AppStateAction {
    readonly type = GetConfigTransferPhaseUserTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace LoadMessageInformationAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadMessageInformationTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadMessageInformationTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadMessageInformationTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace CountBgFinanzPlanAction {
  export class GetAction implements AppStateAction {
    readonly type = GetCountBgFinanzPlanTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetSuccessAction implements AppStateAction {
    readonly type = GetCountBgFinanzPlanTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetFailAction implements AppStateAction {
    readonly type = GetCountBgFinanzPlanTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetBaPersonIDModulIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetBaPersonIDModulIDTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetBaPersonIDModulIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetBaPersonIDModulIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export class ChangeTreeNodeUpdateStateAction implements AppStateAction {
  readonly type = ChangeTreeNodeUpdateStateTypes.CHANGE_TREE_NODE_UPDATE_STATE;
  constructor(public payload?: any) {
  }
}

export namespace GetTreeFallNavigatorAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetTreeFallNavigatorTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetTreeFallNavigatorTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetTreeFallNavigatorTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export type FallfuhrungTreeActions
  = LoadIconModuleAction.LoadAction | LoadIconModuleAction.LoadSuccessAction | LoadIconModuleAction.LoadFailAction
  | LoadVisibleZeitachseAction.LoadAction | LoadVisibleZeitachseAction.LoadSuccessAction | LoadVisibleZeitachseAction.LoadFailAction
  | LoadPersonInfoTitelAction.LoadAction | LoadPersonInfoTitelAction.LoadSuccessAction | LoadPersonInfoTitelAction.LoadFailAction
  | LoadTabPersonAction.LoadPreAction | LoadTabPersonAction.LoadNextAction | LoadTabPersonAction.LoadCloseAction
  | LoadTreeViewItemsAction.LoadAction | LoadTreeViewItemsAction.LoadSuccessAction | LoadTreeViewItemsAction.LoadFailAction | LoadTreeViewItemsAction.ResetStateAction
  | UpdateEditModeStatusAction
  | UpdateDirtyFormStatusAction
  | UpdateSelectedNodeAction
  | LoadRightContentItemsAction.LoadAction | LoadRightContentItemsAction.LoadSuccessAction | LoadRightContentItemsAction.LoadFailAction
  | LoadUserIDFaLeistungAction.LoadAction | LoadUserIDFaLeistungAction.LoadSuccessAction | LoadUserIDFaLeistungAction.LoadFailAction
  | LoadUserIDFaPhaseAction.LoadAction | LoadUserIDFaPhaseAction.LoadSuccessAction | LoadUserIDFaPhaseAction.LoadFailAction
  | BNavigatorItemsAction.LoadAction | BNavigatorItemsAction.LoadSuccessAction | BNavigatorItemsAction.LoadFailAction
  | DeleteFaPhaseData.DeleteFaPhaseDataAction | DeleteFaPhaseData.DeleteFaPhaseDataSuccessAction | DeleteFaPhaseData.DeleteFaPhaseDataFailAction
  | GetFaLeistungAction.LoadAction | GetFaLeistungAction.LoadSuccessAction | GetFaLeistungAction.LoadFailAction
  | DeleteFallverlaufData.DeleteFallverlaufAction | DeleteFallverlaufData.DeleteFallverlaufSuccessAction | DeleteFallverlaufData.DeleteFallverlaufFailAction
  | DeleteBapersonRelationAction.DeleteAction | DeleteBapersonRelationAction.DeleteSuccessAction | DeleteBapersonRelationAction.DeleteFailAction
  | LoadMessageAction
  | UpdateNodesStatusAction
  | GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDDataAction | GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDSuccessAction | GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDFailAction
  | GetCountFaPhaseData.GetCountFaPhaseDataAction | GetCountFaPhaseData.GetCountFaPhaseSuccessAction | GetCountFaPhaseData.GetCountFaPhaseFailAction
  | GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDDataAction | GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDSuccessAction | GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDFailAction
  | InsertFaPhaseData.InsertFaPhaseDataAction | InsertFaPhaseData.InsertFaPhaseSuccessAction | InsertFaPhaseData.InsertFaPhaseFailAction
  | UpdateFaLeistungData.UpdateFaLeistungDataAction | UpdateFaLeistungData.UpdateFaLeistungDataSuccessAction | UpdateFaLeistungData.UpdateFaLeistungDataFailAction
  | GetConfigIntData.GetConfigIntDataAction | GetConfigIntData.GetConfigIntSuccessAction | GetConfigIntData.GetConfigIntFailAction
  | GetConfigBoolData.GetConfigBoolDataAction | GetConfigBoolData.GetConfigBoolSuccessAction | GetConfigBoolData.GetConfigBoolFailAction
  | GetConfigOffeneIntakeData.GetConfigOffeneIntakeAction | GetConfigOffeneIntakeData.GetConfigOffeneIntakeSuccessAction | GetConfigOffeneIntakeData.GetConfigOffeneIntakeFailAction
  | GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenAction | GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenSuccessAction | GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenFailAction
  | GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserAction | GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserSuccessAction | GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserFailAction
  | LoadMessageInformationAction.LoadAction |  LoadMessageInformationAction.LoadSuccessAction | LoadMessageInformationAction.LoadFailAction
  | CountBgFinanzPlanAction.GetAction | CountBgFinanzPlanAction.GetSuccessAction | CountBgFinanzPlanAction.GetFailAction
  | GetBaPersonIDModulIDAction.LoadAction | GetBaPersonIDModulIDAction.LoadSuccessAction | GetBaPersonIDModulIDAction.LoadFailAction
  | ChangeTreeNodeUpdateStateAction
  | GetTreeFallNavigatorAction.LoadAction | GetTreeFallNavigatorAction.LoadSuccessAction | GetTreeFallNavigatorAction.LoadFailAction;
