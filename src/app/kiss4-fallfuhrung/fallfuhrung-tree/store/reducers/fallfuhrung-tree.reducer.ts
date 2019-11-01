import { AppEntityCustomState, ProcessState } from '@shared/AppAction';
import { mergeArrayObject, moveItemToTopArr } from '@shared/utilites';

import { Person } from '../../models';
import { BNavigatorItem, BNavigatorItemsQuery } from '../../models/b-navigator.model';
import { BapersonRelationQuery } from '../../models/baperson-relation.model';
import {
  GetConfigIntQueryModel,
  GetCountFaPhaseModel,
  GetFaLeistungByBaPersonIDModel,
  InsertFaPhaseQueryModel,
  MessageInformationQueryModel,
  UpdateFaLeistungQueryModel,
} from '../../models/beratungsphase.model';
import { Faleistung, FallNavigator, Message } from '../../models/faleistung.model';
import { RightContentItem } from '../../models/right-content-item.model';
import { TreeViewItem, TreeViewItemsQuery } from '../../models/tree-view-item.model';
import { FallfuhrungTreeActions, FallfuhrungTreeActionTypes } from '../actions/fallfuhrung-tree.actions';

interface TreeViewItemsState extends AppEntityCustomState<TreeViewItem[], TreeViewItemsQuery> { }
interface BNavigatorState extends AppEntityCustomState<BNavigatorItem[], BNavigatorItemsQuery> { }
interface RightContentItemState extends AppEntityCustomState<RightContentItem[]> { }
interface DeleteFaPhaseDatasState extends AppEntityCustomState<any, number> {
  deleting: false;
  deleted: false;
}
interface FaleistungState extends AppEntityCustomState<Faleistung[], number> { }
interface DeleteFallverlaufDatasState extends AppEntityCustomState<any, number> {
  deleting: false;
  deleted: false;
}
interface DeleteBaPersonRelationState extends AppEntityCustomState<any, BapersonRelationQuery> { }

// Add Reducer New Intake
interface GetFaLeistungByBaPersonIDState extends AppEntityCustomState<GetFaLeistungByBaPersonIDModel, number> { }
interface GetCountFaPhaseState extends AppEntityCustomState<GetCountFaPhaseModel[], number> { }
interface GetFaPhaseByFaLeistungIDState extends AppEntityCustomState<any, number> { }
interface InsertFaPhaseState extends AppEntityCustomState<any, InsertFaPhaseQueryModel> {
  adding: false;
  added: false;
}
interface UpdateFaleistungState extends AppEntityCustomState<any, UpdateFaLeistungQueryModel> {
  updating: false;
  updated: false;
}
interface GetConfigIntDataState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigBoolDataState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigOffeneIntakeState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigTotalBeratungsphasenState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigTransferPhaseUserState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }

interface GetMessageInformationState extends AppEntityCustomState<any, MessageInformationQueryModel> { }
interface GetCountBgFinanzPlanState extends AppEntityCustomState<any, BapersonRelationQuery> { }

export interface State extends ProcessState {
  person: Person;
  visibleZeitachse: boolean;
  treeViewItemsState: TreeViewItemsState;
  isEditModeState: boolean;
  isFormDirtyState: boolean;
  selectedNode: any;
  addNewNode: any;
  rightContentItemsState: RightContentItemState;
  userIDFaLeistung: any;
  userIDFaPhase: any;
  bNavigatorItemsState: BNavigatorState;
  DeleteFaPhaseDatasState: DeleteFaPhaseDatasState;
  FaleistungState: FaleistungState;
  DeleteFallverlaufDatasState: DeleteFallverlaufDatasState;
  deleteBaPersonRelationState: DeleteBaPersonRelationState;
  LoadMessageState: Message;
  LoadFallNavigatorState: FallNavigator;
  nodesStatus: any;
  GetFaLeistungByBaPersonIDState: GetFaLeistungByBaPersonIDState;
  GetCountFaPhaseState: GetCountFaPhaseState;
  GetFaPhaseByFaLeistungIDState: GetFaPhaseByFaLeistungIDState;
  InsertFaPhaseState: InsertFaPhaseState;
  UpdateFaleistungState: UpdateFaleistungState;
  GetConfigIntDataState: GetConfigIntDataState;
  GetConfigBoolDataState: GetConfigBoolDataState;
  GetConfigOffeneIntakeState: GetConfigOffeneIntakeState;
  GetConfigTotalBeratungsphasenState: GetConfigTotalBeratungsphasenState;
  GetConfigTransferPhaseUserState: GetConfigTransferPhaseUserState;
  GetMessageInformationState: GetMessageInformationState;
  GetCountBgFinanzPlanState: GetCountBgFinanzPlanState;
  baPersonIDModulID: any;
  isUpdatedTreeNode: boolean;
  treeFallNavigatorState: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  failed: false,
  person: new Person(),
  visibleZeitachse: false,
  treeViewItemsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  isEditModeState: null,
  isFormDirtyState: null,
  selectedNode: null,
  addNewNode: null,
  rightContentItemsState: {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
  },
  userIDFaLeistung: {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
  },
  userIDFaPhase: {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
  },
  bNavigatorItemsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  DeleteFaPhaseDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    data: null,
  },
  FaleistungState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  deleteBaPersonRelationState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  DeleteFallverlaufDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    data: null,
  },
  LoadMessageState: null,
  LoadFallNavigatorState: null,
  nodesStatus: [
    {
      id: '',
      isEditMode: false
    },
  ],
  GetFaLeistungByBaPersonIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetCountFaPhaseState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetConfigIntDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetConfigBoolDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetFaPhaseByFaLeistungIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  InsertFaPhaseState: {
    loading: false,
    loaded: false,
    failed: false,
    adding: false,
    added: false,
    data: null,
  },
  UpdateFaleistungState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  GetConfigOffeneIntakeState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetConfigTotalBeratungsphasenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetConfigTransferPhaseUserState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetMessageInformationState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetCountBgFinanzPlanState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  baPersonIDModulID: {
    loading: false,
    loaded: false,
    failed: false,
    faLeistungID: null,
    data: null,
  },
  isUpdatedTreeNode: false,
  treeFallNavigatorState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
};

export function reducer(state = initialState, action: FallfuhrungTreeActions): State {
  if (state.LoadMessageState === action.payload) {
    state.LoadMessageState = null;
  }
  if (!action) { return state; }
  switch (action.type) {
    // get icon module
    case FallfuhrungTreeActionTypes.LoadIconMoudleTypes.LOAD:
    // get visibleZeitachse
    case FallfuhrungTreeActionTypes.LoadVisibleZeitachseTypes.LOAD:
    // get person info title
    case FallfuhrungTreeActionTypes.LoadPersonInfoTitelTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case FallfuhrungTreeActionTypes.LoadIconMoudleTypes.LOAD_FAIL:
    case FallfuhrungTreeActionTypes.LoadVisibleZeitachseTypes.LOAD_FAIL:
    case FallfuhrungTreeActionTypes.LoadPersonInfoTitelTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: true,
      });
    }

    case FallfuhrungTreeActionTypes.LoadIconMoudleTypes.LOAD_SUCCESS: {
      const newPerson = Object.assign({}, state.person, {
        icons: action.payload,
      });
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        false: false,
        person: newPerson,
      });
    }

    case FallfuhrungTreeActionTypes.LoadVisibleZeitachseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        false: false,
        visibleZeitachse: action.payload,
      });
    }

    case FallfuhrungTreeActionTypes.LoadPersonInfoTitelTypes.LOAD_SUCCESS: {
      const data = action.payload;
      const newPerson = Object.assign({}, state.person, {
        titleText: data.titleText,
        imageIndex: data.imageIndex,
        toolTipText: data.toolTipText,
      });
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        false: false,
        person: newPerson,
      });
    }

    case FallfuhrungTreeActionTypes.LoadTreeViewItemsTypes.LOAD: {
      return Object.assign({}, state, {
        treeViewItemsState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadTreeViewItemsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        treeViewItemsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadTreeViewItemsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        treeViewItemsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadTreeViewItemsTypes.RESET_STATE: {
      return {
        ...initialState,
        LoadFallNavigatorState: state.LoadFallNavigatorState
      };
    }

    case FallfuhrungTreeActionTypes.RightContentItemsTypes.LOAD: {
      return Object.assign({}, state, {
        rightContentItemsState: {
          loading: true,
        }
      });
    }
    case FallfuhrungTreeActionTypes.RightContentItemsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        rightContentItemsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.RightContentItemsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        rightContentItemsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case FallfuhrungTreeActionTypes.EditModeStatusTypes.UPDATE_EDIT_MODE: {
      return Object.assign({}, state, {
        isEditModeState: action.payload
      });
    }

    case FallfuhrungTreeActionTypes.DirtyFormStatusTypes.UPDATE_DIRTY_FORM_STATUS: {
      return Object.assign({}, state, {
        isFormDirtyState: action.payload
      });
    }

    case FallfuhrungTreeActionTypes.SelectedNodeTypes.UPDATE_SELECTED_NODE: {
      return Object.assign({}, state, {
        selectedNode: action.payload
      });
    }

    case FallfuhrungTreeActionTypes.AddNewNodeTypes.ADD_NEW_NODE: {
      return Object.assign({}, state, {
        addNewNode: action.payload
      });
    }

    case FallfuhrungTreeActionTypes.UserIDFaLeistungTypes.LOAD: {
      return Object.assign({}, state, {
        userIDFaLeistung: {
          loading: true,
        }
      });
    }
    case FallfuhrungTreeActionTypes.UserIDFaLeistungTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        userIDFaLeistung: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.UserIDFaLeistungTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        userIDFaLeistung: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case FallfuhrungTreeActionTypes.UserIDFaPhaseTypes.LOAD: {
      return Object.assign({}, state, {
        userIDFaPhase: {
          loading: true,
        }
      });
    }
    case FallfuhrungTreeActionTypes.UserIDFaPhaseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        userIDFaPhase: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.UserIDFaPhaseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        userIDFaPhase: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case FallfuhrungTreeActionTypes.LoadBNavigatorItemsTypes.LOAD: {
      return Object.assign({}, state, {
        bNavigatorItemsState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadBNavigatorItemsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        bNavigatorItemsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadBNavigatorItemsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        bNavigatorItemsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case FallfuhrungTreeActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE: {
      return Object.assign({}, state, {
        DeleteFaPhaseDatasState: {
          deleting: true,
          deleted: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE_SUCCESS: {
      return Object.assign({}, state, {
        DeleteFaPhaseDatasState: {
          deleting: false,
          deleted: true,
          failed: false,
          data: action.payload,
        }
      });
    }

    case FallfuhrungTreeActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE_FAIL: {
      return Object.assign({}, state, {
        DeleteFaPhaseDatasState: {
          deleting: false,
          deleted: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetFaLeistungTypes.LOAD: {
      return Object.assign({}, state, {
        FaleistungState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetFaLeistungTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        FaleistungState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetFaLeistungTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        FaleistungState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.DeleteFallverlaufTypes.DELETE_Fallverlauf: {
      return Object.assign({}, state, {
        DeleteFallverlaufDatasState: {
          deleting: true,
          deleted: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.DeleteFallverlaufTypes.DELETE_Fallverlauf_SUCCESS: {
      return Object.assign({}, state, {
        DeleteFallverlaufDatasState: {
          deleting: false,
          deleted: true,
          failed: false,
          data: action.payload,
        }
      });
    }
    case FallfuhrungTreeActionTypes.DeleteFallverlaufTypes.DELETE_Fallverlauf_FAIL: {
      return Object.assign({}, state, {
        DeleteFallverlaufDatasState: {
          deleting: false,
          deleted: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FallfuhrungTreeActionTypes.DeleteBaPersonRelationTypes.DELETE: {
      return Object.assign({}, state, {
        deleteBaPersonRelationState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.DeleteBaPersonRelationTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteBaPersonRelationState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.DeleteBaPersonRelationTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteBaPersonRelationState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadMessageTypes.LOAD_MESSAGE: {
      return {
        ...state,
        LoadMessageState: { ...action.payload }
      };
    }
    case FallfuhrungTreeActionTypes.LoadDataFallNavigatorTypes.LOAD_FALL_NAVIGATOR: {
      return {
        ...state,
        LoadFallNavigatorState: { ...action.payload }
      };
    }

    case FallfuhrungTreeActionTypes.NodesStatusTypes.UPDATE_NODES_STATUS: {
      const nodesStatusTemp = mergeArrayObject(state.nodesStatus, action.payload, 'id');
      moveItemToTopArr(nodesStatusTemp, action.payload);
      return Object.assign({}, state, {
        nodesStatus: [...nodesStatusTemp]
      });
    }

    case FallfuhrungTreeActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD: {
      return Object.assign({}, state, {
        GetFaLeistungByBaPersonIDState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetFaLeistungByBaPersonIDState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetFaLeistungByBaPersonIDState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetCountFaPhaseTypes.LOAD: {
      return Object.assign({}, state, {
        GetCountFaPhaseState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetCountFaPhaseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetCountFaPhaseState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetCountFaPhaseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetCountFaPhaseState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetConfigIntTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigIntDataState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigIntTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetConfigIntDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigIntTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigIntDataState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetConfigBoolTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigBoolDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigBoolTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetConfigBoolDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigBoolTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigBoolDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetFaPhaseByFaLeistungIDTypes.LOAD: {
      return Object.assign({}, state, {
        GetFaPhaseByFaLeistungIDState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetFaPhaseByFaLeistungIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetFaPhaseByFaLeistungIDState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetFaPhaseByFaLeistungIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetFaPhaseByFaLeistungIDState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.InsertFaPhaseTypes.ADD: {
      return Object.assign({}, state, {
        InsertFaPhaseState: {
          adding: true,
          added: false,
          failed: false,
          data: null
        }
      });
    }

    case FallfuhrungTreeActionTypes.InsertFaPhaseTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        InsertFaPhaseState: {
          adding: false,
          added: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.InsertFaPhaseTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        InsertFaPhaseState: {
          adding: false,
          added: false,
          failed: true,
          data: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_DATA: {
      return Object.assign({}, state, {
        UpdateFaleistungState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case FallfuhrungTreeActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_SUCCESS: {
      return Object.assign({}, state, {
        UpdateFaleistungState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_FAIL: {
      return Object.assign({}, state, {
        UpdateFaleistungState: {
          updating: false,
          updated: false,
          failed: true,
          data: action.payload
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigOffeneIntakeTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigOffeneIntakeState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigOffeneIntakeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetConfigOffeneIntakeState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigOffeneIntakeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigOffeneIntakeState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigTotalBeratungsphasenTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigTotalBeratungsphasenState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigTotalBeratungsphasenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetConfigTotalBeratungsphasenState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigTotalBeratungsphasenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigTotalBeratungsphasenState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigTransferPhaseUserTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigTransferPhaseUserState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigTransferPhaseUserTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetConfigTransferPhaseUserState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetConfigTransferPhaseUserTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigTransferPhaseUserState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null,
        }
      });
    }
    case FallfuhrungTreeActionTypes.LoadMessageInformationTypes.LOAD: {
      return Object.assign({}, state, {
        GetMessageInformationState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case FallfuhrungTreeActionTypes.LoadMessageInformationTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetMessageInformationState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.LoadMessageInformationTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetMessageInformationState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null,
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetCountBgFinanzPlanTypes.LOAD: {
      return Object.assign({}, state, {
        GetCountBgFinanzPlanState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetCountBgFinanzPlanTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetCountBgFinanzPlanState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetCountBgFinanzPlanTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetCountBgFinanzPlanState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case FallfuhrungTreeActionTypes.GetBaPersonIDModulIDTypes.LOAD: {
      return Object.assign({}, state, {
        baPersonIDModulID: {
          loaded: false,
          loading: true,
          failed: false,
          faLeistungID: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetBaPersonIDModulIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        baPersonIDModulID: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case FallfuhrungTreeActionTypes.GetBaPersonIDModulIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        baPersonIDModulID: {
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }

    case FallfuhrungTreeActionTypes.ChangeTreeNodeUpdateStateTypes.CHANGE_TREE_NODE_UPDATE_STATE: {
      return Object.assign({}, state, {
        isUpdatedTreeNode: action.payload,
      });
    }

    case FallfuhrungTreeActionTypes.GetTreeFallNavigatorTypes.LOAD: {
      return Object.assign({}, state, {
        treeFallNavigatorState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: [],
        },
      });
    }
    case FallfuhrungTreeActionTypes.GetTreeFallNavigatorTypes.LOAD_SUCCESS: {
      const datas = Object.assign({}, state, {
        treeFallNavigatorState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload,
        },
      });
      return datas;
    }
    case FallfuhrungTreeActionTypes.GetTreeFallNavigatorTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        treeFallNavigatorState: {
          loading: false,
          loaded: false,
          failed: true,
          data: [],
        },
      });
    }

    default: return state;
  }
}

export const getFallfuhrungTreeLoading = (state: State) => state.loading;
export const getFallfuhrungTreeLoaded = (state: State) => state.loaded;
export const getFallfuhrungTreeFailed = (state: State) => state.failed;
export const getFallfuhrungTreeVisibleZeitachse = (state: State) => state.visibleZeitachse;
export const getFallfuhrungTreePerson = (state: State) => state.person;
export const getTreeViewItems = {
  getData: (state: State) => state.treeViewItemsState.data,
  getLoading: (state: State) => state.treeViewItemsState.loading,
  getLoaded: (state: State) => state.treeViewItemsState.loaded,
  getFailed: (state: State) => state.treeViewItemsState.failed
};
export const getEditModeStatus = (state: State) => state.isEditModeState;
export const getDirtyFormStatus = (state: State) => state.isFormDirtyState;
export const getSelectedNode = (state: State) => state.selectedNode;
export const getAddNewNode = (state: State) => state.addNewNode;
export const getRightContentItems = {
  getData: (state: State) => state.rightContentItemsState.data,
  getLoading: (state: State) => state.rightContentItemsState.loading,
  getLoaded: (state: State) => state.rightContentItemsState.loaded,
  getFailed: (state: State) => state.rightContentItemsState.failed
};
export const getUserIDFaLeistung = {
  getData: (state: State) => state.userIDFaLeistung.data,
  getLoading: (state: State) => state.userIDFaLeistung.loading,
  getLoaded: (state: State) => state.userIDFaLeistung.loaded,
  getFailed: (state: State) => state.userIDFaLeistung.failed
};
export const getUserIDFaPhase = {
  getData: (state: State) => state.userIDFaPhase.data,
  getLoading: (state: State) => state.userIDFaPhase.loading,
  getLoaded: (state: State) => state.userIDFaPhase.loaded,
  getFailed: (state: State) => state.userIDFaPhase.failed
};
export const getBNavigatorItems = {
  getData: (state: State) => state.bNavigatorItemsState.data,
  getLoading: (state: State) => state.bNavigatorItemsState.loading,
  getLoaded: (state: State) => state.bNavigatorItemsState.loaded,
  getFailed: (state: State) => state.bNavigatorItemsState.failed
};

export const deleteFaPhaseData = {
  getDatas: (state: State) => state.DeleteFaPhaseDatasState.data,
  getDeleting: (state: State) => state.DeleteFaPhaseDatasState.deleting,
  getDeleted: (state: State) => state.DeleteFaPhaseDatasState.deleted,
  getFailed: (state: State) => state.DeleteFaPhaseDatasState.failed
};
export const getFaleistungData = {
  getData: (state: State) => state.FaleistungState.data,
  getLoading: (state: State) => state.FaleistungState.loading,
  getLoaded: (state: State) => state.FaleistungState.loaded,
  getFailed: (state: State) => state.FaleistungState.failed
};
export const deleteFallverlaufData = {
  getDatas: (state: State) => state.DeleteFallverlaufDatasState.data,
  getDeleting: (state: State) => state.DeleteFallverlaufDatasState.deleting,
  getDeleted: (state: State) => state.DeleteFallverlaufDatasState.deleted,
  getFailed: (state: State) => state.DeleteFallverlaufDatasState.failed
};
export const deleteBaPersonRelation = {
  getData: (state: State) => state.deleteBaPersonRelationState.data,
  getLoading: (state: State) => state.deleteBaPersonRelationState.loading,
  getLoaded: (state: State) => state.deleteBaPersonRelationState.loaded,
  getFailed: (state: State) => state.deleteBaPersonRelationState.failed
};
export const loadMessage = (state: State) => state.LoadMessageState;
export const loadFallNavigator = (state: State) => state.LoadFallNavigatorState;
export const getNodesStatus = (state: State) => state.nodesStatus;

// Add Reducer New Intake
export const getFaLeistungByBaPersonIDData = {
  getDatas: (state: State) => state.GetFaLeistungByBaPersonIDState.data,
  getLoading: (state: State) => state.GetFaLeistungByBaPersonIDState.loading,
  getLoaded: (state: State) => state.GetFaLeistungByBaPersonIDState.loaded,
  getFailed: (state: State) => state.GetFaLeistungByBaPersonIDState.failed
};
export const getCountFaPhaseData = {
  getDatas: (state: State) => state.GetCountFaPhaseState.data,
  getLoading: (state: State) => state.GetCountFaPhaseState.loading,
  getLoaded: (state: State) => state.GetCountFaPhaseState.loaded,
  getFailed: (state: State) => state.GetCountFaPhaseState.failed
};
export const getFaPhaseByFaLeistungIDData = {
  getDatas: (state: State) => state.GetFaPhaseByFaLeistungIDState.data,
  getLoading: (state: State) => state.GetFaPhaseByFaLeistungIDState.loading,
  getLoaded: (state: State) => state.GetFaPhaseByFaLeistungIDState.loaded,
  getFailed: (state: State) => state.GetFaPhaseByFaLeistungIDState.failed
};
export const insertFaPhaseData = {
  getDatas: (state: State) => state.InsertFaPhaseState.data,
  getAdding: (state: State) => state.InsertFaPhaseState.adding,
  getAdded: (state: State) => state.InsertFaPhaseState.added,
  getFailed: (state: State) => state.InsertFaPhaseState.failed
};
export const getConfigIntData = {
  getDatas: (state: State) => state.GetConfigIntDataState.data,
  getLoading: (state: State) => state.GetConfigIntDataState.loading,
  getLoaded: (state: State) => state.GetConfigIntDataState.loaded,
  getFailed: (state: State) => state.GetConfigIntDataState.failed
};
export const getConfigBoolData = {
  getDatas: (state: State) => state.GetConfigBoolDataState.data,
  getLoading: (state: State) => state.GetConfigBoolDataState.loading,
  getLoaded: (state: State) => state.GetConfigBoolDataState.loaded,
  getFailed: (state: State) => state.GetConfigBoolDataState.failed
};

export const getUpdateFaleistungData = {
  getDatas: (state: State) => state.UpdateFaleistungState.data,
  getUpdating: (state: State) => state.UpdateFaleistungState.updating,
  getUpdated: (state: State) => state.UpdateFaleistungState.updated,
  getFailed: (state: State) => state.UpdateFaleistungState.failed
};

export const getConfigOffeneIntake = {
  getDatas: (state: State) => state.GetConfigOffeneIntakeState.data,
  getLoading: (state: State) => state.GetConfigOffeneIntakeState.loading,
  getLoaded: (state: State) => state.GetConfigOffeneIntakeState.loaded,
  getFailed: (state: State) => state.GetConfigOffeneIntakeState.failed
};

export const getConfigTotalBeratungsphasen = {
  getDatas: (state: State) => state.GetConfigTotalBeratungsphasenState.data,
  getLoading: (state: State) => state.GetConfigTotalBeratungsphasenState.loading,
  getLoaded: (state: State) => state.GetConfigTotalBeratungsphasenState.loaded,
  getFailed: (state: State) => state.GetConfigTotalBeratungsphasenState.failed
};

export const getConfigTransferPhaseUser = {
  getDatas: (state: State) => state.GetConfigTransferPhaseUserState.data,
  getLoading: (state: State) => state.GetConfigTransferPhaseUserState.loading,
  getLoaded: (state: State) => state.GetConfigTransferPhaseUserState.loaded,
  getFailed: (state: State) => state.GetConfigTransferPhaseUserState.failed
};

export const getMessageInformation = {
  getDatas: (state: State) => state.GetMessageInformationState.data,
  getLoading: (state: State) => state.GetMessageInformationState.loading,
  getLoaded: (state: State) => state.GetMessageInformationState.loaded,
  getFailed: (state: State) => state.GetMessageInformationState.failed
};
// End Add Reducer New Intake

export const getCountBgFinanzPlan = {
  getData: (state: State) => state.GetCountBgFinanzPlanState.data,
  getLoading: (state: State) => state.GetCountBgFinanzPlanState.loading,
  getLoaded: (state: State) => state.GetCountBgFinanzPlanState.loaded,
  getFailed: (state: State) => state.GetCountBgFinanzPlanState.failed
};

export const getBaPersonIDModulID = {
  getData: (state: State) => state.baPersonIDModulID.data,
  getLoading: (state: State) => state.baPersonIDModulID.loading,
  getLoaded: (state: State) => state.baPersonIDModulID.loaded,
  getFailed: (state: State) => state.baPersonIDModulID.failed
};

export const getTreeNodeUpdateState = (state: State) => state.isUpdatedTreeNode;

export const getTreeFallNavigator = {
  getData: (state: State) => state.treeFallNavigatorState.data,
  getLoading: (state: State) => state.treeFallNavigatorState.loading,
  getLoaded: (state: State) => state.treeFallNavigatorState.loaded,
  getFailed: (state: State) => state.treeFallNavigatorState.failed
};
