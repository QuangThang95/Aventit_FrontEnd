import { AppEntityCustomState } from '@shared/AppAction';

import {
  BeratungsphaseFormData,
  CheckDatumVon,
  CheckDatumVonQuery,
  CheckMinimalAllTargetsModel,
  DatumVonAndFaLeistungID,
  DPLSelectboxModel,
  GetConfigBoolItemModel,
  GetConfigBoolQueryModel,
  GetConfigIntItemModel,
  GetCountFaPhaseModel,
  GetFaLeistungByBaPersonIDModel,
  GetMandatoryField,
  GetNewDateByFaLeistungIDModel,
  GrundSelectboxModel,
  GrundSelectboxQueryModel,
  InsertFaPhaseModel,
  InsertFaPhaseQueryModel,
  ListGetConfigIntQuery,
  Result,
  SARSelectboxModel,
  UpdateFaLeistungQueryModel,
  UpdateFaLeistungResultModel,
  UpdateFormDataQueryModel,
  DeletePhaseItem,
  DeletePhaseQuery,
  GetIntakeAndBeratungCountItemModel,
  GetLicensedModulModel,
  GetFallRightsModel,
  ReopenPhaseQueryModel,
} from '../../models';
import { BeratungsphaseActions, BeratungsphaseActionTypes } from '../actions/beratungsphase.action';

interface LoadSARSelectboxDataState extends AppEntityCustomState<SARSelectboxModel[], number> { }
interface LoadDPLSelectboxDatasState extends AppEntityCustomState<DPLSelectboxModel[], number> { }
interface LoadGrundSelectboxDataState extends AppEntityCustomState<GrundSelectboxModel[], GrundSelectboxQueryModel> { }
interface BeratungsphaseLoadFormDatasState extends AppEntityCustomState<BeratungsphaseFormData, number> { }
interface BeratungsphaseUpdateFormDatasState extends AppEntityCustomState<Result, UpdateFormDataQueryModel> {
  updating: false;
  updated: false;
}
interface GetDatumVonFaLeistungIDDatasState extends AppEntityCustomState<DatumVonAndFaLeistungID[], number> { }
interface GetDuplicateCountDatumVonState extends AppEntityCustomState<CheckDatumVon[], CheckDatumVonQuery> { }
interface GetMandatoryFieldState extends AppEntityCustomState<GetMandatoryField[], number> { }
interface CheckMinimalAllTargetsState extends AppEntityCustomState<CheckMinimalAllTargetsModel[], number> { }
interface GetFaLeistungByBaPersonIDState extends AppEntityCustomState<GetFaLeistungByBaPersonIDModel, number> { }
interface GetCountFaPhaseState extends AppEntityCustomState<GetCountFaPhaseModel[], number> { }
interface GetNewDateByFaLeistungIDState extends AppEntityCustomState<GetNewDateByFaLeistungIDModel, number> { }
interface InsertFaPhaseState extends AppEntityCustomState<InsertFaPhaseModel, InsertFaPhaseQueryModel> {
  adding: false;
  added: false;
}
interface UpdateFaleistungState extends AppEntityCustomState<UpdateFaLeistungResultModel, UpdateFaLeistungQueryModel> {
  updating: false;
  updated: false;
}
interface GetConfigIntDataState extends AppEntityCustomState<GetConfigIntItemModel[], ListGetConfigIntQuery> { }
interface GetConfigBoolDataState extends AppEntityCustomState<GetConfigBoolItemModel, GetConfigBoolQueryModel> { }
// Delete FaPhase
interface DeleteFaPhaseDatasState extends AppEntityCustomState<DeletePhaseItem, DeletePhaseQuery> {
  deleting: false;
  deleted: false;
}
interface GetIntakeAndBeratungCountByFaLeistungIDState extends AppEntityCustomState<GetIntakeAndBeratungCountItemModel[], number> { }
interface GetLicensedModuleState extends AppEntityCustomState<GetLicensedModulModel[], number> { }
// Add state for get Fall Rights data
interface LoadFallRightsState extends AppEntityCustomState<GetFallRightsModel, number> { }
interface GetReopenPhaseDataState extends AppEntityCustomState<any, ReopenPhaseQueryModel> { }
// Add state for get fallfuhrung data
interface LoadFallfuhrungDataState extends AppEntityCustomState<any, number> { }
export interface State {
  LoadSARSelectboxDataState: LoadSARSelectboxDataState;
  LoadDPLSelectboxDatasState: LoadDPLSelectboxDatasState;
  LoadGrundSelectboxDataState: LoadGrundSelectboxDataState;
  BeratungsphaseLoadFormDatasState: BeratungsphaseLoadFormDatasState;
  BeratungsphaseUpdateFormDatasState: BeratungsphaseUpdateFormDatasState;
  GetDatumVonFaLeistungIDDatasState: GetDatumVonFaLeistungIDDatasState;
  GetDuplicateCountDatumVonState: GetDuplicateCountDatumVonState;
  GetMandatoryFieldState: GetMandatoryFieldState;
  CheckMinimalAllTargetsState: CheckMinimalAllTargetsState;
  GetFaLeistungByBaPersonIDState: GetFaLeistungByBaPersonIDState;
  GetCountFaPhaseState: GetCountFaPhaseState;
  GetNewDateByFaLeistungIDState: GetNewDateByFaLeistungIDState;
  InsertFaPhaseState: InsertFaPhaseState;
  UpdateFaleistungState: UpdateFaleistungState;
  GetConfigIntDataState: GetConfigIntDataState;
  GetConfigBoolDataState: GetConfigBoolDataState;
  DeleteFaPhaseDatasState: DeleteFaPhaseDatasState;
  GetIntakeAndBeratungCountByFaLeistungIDState: GetIntakeAndBeratungCountByFaLeistungIDState;
  GetLicensedModuleState: GetLicensedModuleState;
  LoadFallRightsState: LoadFallRightsState;
  GetReopenPhaseDataState: GetReopenPhaseDataState;
  LoadFallfuhrungDataState: LoadFallfuhrungDataState;
}


export const initialState: State = {
  LoadSARSelectboxDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadDPLSelectboxDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadGrundSelectboxDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BeratungsphaseLoadFormDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BeratungsphaseUpdateFormDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  GetDatumVonFaLeistungIDDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetDuplicateCountDatumVonState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetMandatoryFieldState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CheckMinimalAllTargetsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
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
  GetNewDateByFaLeistungIDState: {
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
  DeleteFaPhaseDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    data: null,
  },
  GetIntakeAndBeratungCountByFaLeistungIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetLicensedModuleState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadFallRightsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetReopenPhaseDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  // Load data fallfuhrung
  LoadFallfuhrungDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
};

export function reducer(state = initialState, action: BeratungsphaseActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case BeratungsphaseActionTypes.BeratungsphaseAction:
      return state;

    case BeratungsphaseActionTypes.SARSelectboxDataTypes.LOAD: {
      return Object.assign({}, state, {
        LoadSARSelectboxDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.SARSelectboxDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadSARSelectboxDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.SARSelectboxDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadSARSelectboxDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case BeratungsphaseActionTypes.DPLSelectboxDataTypes.LOAD: {
      return Object.assign({}, state, {
        LoadDPLSelectboxDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.DPLSelectboxDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadDPLSelectboxDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.DPLSelectboxDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadDPLSelectboxDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case BeratungsphaseActionTypes.GrundSelectboxDataTypes.LOAD: {
      return Object.assign({}, state, {
        LoadGrundSelectboxDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GrundSelectboxDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadGrundSelectboxDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GrundSelectboxDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadGrundSelectboxDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case BeratungsphaseActionTypes.BeratungsphaseFormDataTypes.LOAD: {
      return Object.assign({}, state, {
        BeratungsphaseLoadFormDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.BeratungsphaseFormDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        BeratungsphaseLoadFormDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.BeratungsphaseFormDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BeratungsphaseLoadFormDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.BeratungsphaseFormDataTypes.RESET_STATE: {
      state = initialState;
      return state;
    }
    case BeratungsphaseActionTypes.BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA: {
      return Object.assign({}, state, {
        BeratungsphaseUpdateFormDatasState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case BeratungsphaseActionTypes.BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA_SUCCESS: {
      return Object.assign({}, state, {
        BeratungsphaseUpdateFormDatasState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA_FAIL: {
      return Object.assign({}, state, {
        BeratungsphaseUpdateFormDatasState: {
          updating: false,
          updated: false,
          failed: true,
          data: action.payload
        }
      });
    }
    case BeratungsphaseActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_DATA: {
      return Object.assign({}, state, {
        UpdateFaleistungState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case BeratungsphaseActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_SUCCESS: {
      return Object.assign({}, state, {
        UpdateFaleistungState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_FAIL: {
      return Object.assign({}, state, {
        UpdateFaleistungState: {
          updating: false,
          updated: false,
          failed: true,
          data: null
        }
      });
    }
    case BeratungsphaseActionTypes.GetDatumVonAndFaLeistungIDDataTypes.LOAD: {
      return Object.assign({}, state, {
        GetDatumVonFaLeistungIDDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetDatumVonAndFaLeistungIDDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetDatumVonFaLeistungIDDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.GetDatumVonAndFaLeistungIDDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetDatumVonFaLeistungIDDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.CheckDatumVonValidTypes.LOAD: {
      return Object.assign({}, state, {
        GetDuplicateCountDatumVonState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.CheckDatumVonValidTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetDuplicateCountDatumVonState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.CheckDatumVonValidTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetDuplicateCountDatumVonState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetMandatoryFieldTypes.LOAD: {
      return Object.assign({}, state, {
        GetMandatoryFieldState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetMandatoryFieldTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetMandatoryFieldState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.GetMandatoryFieldTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetMandatoryFieldState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.CheckMinimalAllTargetsTypes.LOAD: {
      return Object.assign({}, state, {
        CheckMinimalAllTargetsState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.CheckMinimalAllTargetsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CheckMinimalAllTargetsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.CheckMinimalAllTargetsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CheckMinimalAllTargetsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD: {
      return Object.assign({}, state, {
        GetFaLeistungByBaPersonIDState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD_SUCCESS: {
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

    case BeratungsphaseActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetFaLeistungByBaPersonIDState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetCountFaPhaseTypes.LOAD: {
      return Object.assign({}, state, {
        GetCountFaPhaseState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetCountFaPhaseTypes.LOAD_SUCCESS: {
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

    case BeratungsphaseActionTypes.GetCountFaPhaseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetCountFaPhaseState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetConfigIntTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigIntDataState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case BeratungsphaseActionTypes.GetConfigIntTypes.LOAD_SUCCESS: {
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

    case BeratungsphaseActionTypes.GetConfigIntTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigIntDataState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: [],
        }
      });
    }
    case BeratungsphaseActionTypes.GetConfigBoolTypes.LOAD: {
      return Object.assign({}, state, {
        GetConfigBoolDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetConfigBoolTypes.LOAD_SUCCESS: {
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

    case BeratungsphaseActionTypes.GetConfigBoolTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetConfigBoolDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetNewDateByFaLeistungIDTypes.LOAD: {
      return Object.assign({}, state, {
        GetNewDateByFaLeistungIDState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetNewDateByFaLeistungIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetNewDateByFaLeistungIDState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.GetNewDateByFaLeistungIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetNewDateByFaLeistungIDState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.InsertFaPhaseTypes.ADD: {
      return Object.assign({}, state, {
        InsertFaPhaseState: {
          adding: true,
          added: false,
          failed: false,
          data: null
        }
      });
    }

    case BeratungsphaseActionTypes.InsertFaPhaseTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        InsertFaPhaseState: {
          adding: false,
          added: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.InsertFaPhaseTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        InsertFaPhaseState: {
          adding: false,
          added: false,
          failed: true,
          data: null
        }
      });
    }
    case BeratungsphaseActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE: {
      return Object.assign({}, state, {
        DeleteFaPhaseDatasState: {
          deleting: true,
          deleted: false,
          failed: false,
          data: null,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE_SUCCESS: {
      return Object.assign({}, state, {
        DeleteFaPhaseDatasState: {
          deleting: false,
          deleted: true,
          failed: false,
          data: action.payload,
        }
      });
    }

    case BeratungsphaseActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE_FAIL: {
      return Object.assign({}, state, {
        DeleteFaPhaseDatasState: {
          deleting: false,
          deleted: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    case BeratungsphaseActionTypes.GetIntakeAndBeratungCountTypes.LOAD: {
      return Object.assign({}, state, {
        GetIntakeAndBeratungCountByFaLeistungIDState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetIntakeAndBeratungCountTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetIntakeAndBeratungCountByFaLeistungIDState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.GetIntakeAndBeratungCountTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetIntakeAndBeratungCountByFaLeistungIDState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetLicensedModuleTypes.LOAD: {
      return Object.assign({}, state, {
        GetLicensedModuleState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetLicensedModuleTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetLicensedModuleState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.GetLicensedModuleTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetLicensedModuleState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    // Load Fall Rights
    case BeratungsphaseActionTypes.GetFallRightsTypes.LOAD: {
      return Object.assign({}, state, {
        LoadFallRightsState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case BeratungsphaseActionTypes.GetFallRightsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadFallRightsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetFallRightsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadFallRightsState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
        }
      });
    }
    case BeratungsphaseActionTypes.GetReopenPhaseTypes.LOAD: {
      return Object.assign({}, state, {
        GetReopenPhaseDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case BeratungsphaseActionTypes.GetReopenPhaseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetReopenPhaseDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case BeratungsphaseActionTypes.GetReopenPhaseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetReopenPhaseDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    // Load data fallfuhrung
    case BeratungsphaseActionTypes.FallfuhrungTypes.LOAD: {
      return Object.assign({}, state, {
          LoadFallfuhrungDataState: {
              loading: true,
              query: action.payload
          }
      });
  }
  case BeratungsphaseActionTypes.FallfuhrungTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
          LoadFallfuhrungDataState: {
              loaded: true,
              loading: false,
              failed: false,
              data: action.payload,
              query: null,
          }
      });
  }
  case BeratungsphaseActionTypes.FallfuhrungTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
          LoadFallfuhrungDataState: {
              loaded: false,
              loading: false,
              failed: true,
              data: action.payload,
              query: null,
          }
      });
  }
    default:
      return state;
  }
}
export const getSARSelectboxData = {
  getDatas: (state: State) => state.LoadSARSelectboxDataState.data,
  getLoading: (state: State) => state.LoadSARSelectboxDataState.loading,
  getLoaded: (state: State) => state.LoadSARSelectboxDataState.loaded,
  getFailed: (state: State) => state.LoadSARSelectboxDataState.failed
};
export const getDPLSelectboxData = {
  getDatas: (state: State) => state.LoadDPLSelectboxDatasState.data,
  getLoading: (state: State) => state.LoadDPLSelectboxDatasState.loading,
  getLoaded: (state: State) => state.LoadDPLSelectboxDatasState.loaded,
  getFailed: (state: State) => state.LoadDPLSelectboxDatasState.failed
};
export const getGrundSelectboxData = {
  getDatas: (state: State) => state.LoadGrundSelectboxDataState.data,
  getLoading: (state: State) => state.LoadGrundSelectboxDataState.loading,
  getLoaded: (state: State) => state.LoadGrundSelectboxDataState.loaded,
  getFailed: (state: State) => state.LoadGrundSelectboxDataState.failed
};
export const getBeratungsphasesLoadFormData = {
  getDatas: (state: State) => state.BeratungsphaseLoadFormDatasState.data,
  getLoading: (state: State) => state.BeratungsphaseLoadFormDatasState.loading,
  getLoaded: (state: State) => state.BeratungsphaseLoadFormDatasState.loaded,
  getFailed: (state: State) => state.BeratungsphaseLoadFormDatasState.failed
};
export const getBeratungsphasesUpdateFormData = {
  getDatas: (state: State) => state.BeratungsphaseUpdateFormDatasState.data,
  getUpdating: (state: State) => state.BeratungsphaseUpdateFormDatasState.updating,
  getUpdated: (state: State) => state.BeratungsphaseUpdateFormDatasState.updated,
  getFailed: (state: State) => state.BeratungsphaseUpdateFormDatasState.failed
};
export const getUpdateFaleistungData = {
  getDatas: (state: State) => state.UpdateFaleistungState.data,
  getUpdating: (state: State) => state.UpdateFaleistungState.updating,
  getUpdated: (state: State) => state.UpdateFaleistungState.updated,
  getFailed: (state: State) => state.UpdateFaleistungState.failed
};
export const getDatumVonAndFaLeistungIDData = {
  getDatas: (state: State) => state.GetDatumVonFaLeistungIDDatasState.data,
  getLoading: (state: State) => state.GetDatumVonFaLeistungIDDatasState.loading,
  getLoaded: (state: State) => state.GetDatumVonFaLeistungIDDatasState.loaded,
  getFailed: (state: State) => state.GetDatumVonFaLeistungIDDatasState.failed
};
export const getDuplicateDatumVonData = {
  getDatas: (state: State) => state.GetDuplicateCountDatumVonState.data,
  getLoading: (state: State) => state.GetDuplicateCountDatumVonState.loading,
  getLoaded: (state: State) => state.GetDuplicateCountDatumVonState.loaded,
  getFailed: (state: State) => state.GetDuplicateCountDatumVonState.failed
};
export const getMandatoryFieldData = {
  getDatas: (state: State) => state.GetMandatoryFieldState.data,
  getLoading: (state: State) => state.GetMandatoryFieldState.loading,
  getLoaded: (state: State) => state.GetMandatoryFieldState.loaded,
  getFailed: (state: State) => state.GetMandatoryFieldState.failed
};
export const getCheckMinimalAllTargetsData = {
  getDatas: (state: State) => state.CheckMinimalAllTargetsState.data,
  getLoading: (state: State) => state.CheckMinimalAllTargetsState.loading,
  getLoaded: (state: State) => state.CheckMinimalAllTargetsState.loaded,
  getFailed: (state: State) => state.CheckMinimalAllTargetsState.failed
};
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
export const getNewDateByFaLeistungIDData = {
  getDatas: (state: State) => state.GetNewDateByFaLeistungIDState.data,
  getLoading: (state: State) => state.GetNewDateByFaLeistungIDState.loading,
  getLoaded: (state: State) => state.GetNewDateByFaLeistungIDState.loaded,
  getFailed: (state: State) => state.GetNewDateByFaLeistungIDState.failed
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
// Delete FaPhase
export const getDeleteFaPhaseData = {
  getDatas: (state: State) => state.DeleteFaPhaseDatasState.data,
  getDeleting: (state: State) => state.DeleteFaPhaseDatasState.deleting,
  getDeleted: (state: State) => state.DeleteFaPhaseDatasState.deleted,
  getFailed: (state: State) => state.DeleteFaPhaseDatasState.failed
};
export const getIntakeAndBeratungsphaseCountByFaLeistungIDData = {
  getDatas: (state: State) => state.GetIntakeAndBeratungCountByFaLeistungIDState.data,
  getLoading: (state: State) => state.GetIntakeAndBeratungCountByFaLeistungIDState.loading,
  getLoaded: (state: State) => state.GetIntakeAndBeratungCountByFaLeistungIDState.loaded,
  getFailed: (state: State) => state.GetIntakeAndBeratungCountByFaLeistungIDState.failed
};
export const getLicensedModuleData = {
  getDatas: (state: State) => state.GetLicensedModuleState.data,
  getLoading: (state: State) => state.GetLicensedModuleState.loading,
  getLoaded: (state: State) => state.GetLicensedModuleState.loaded,
  getFailed: (state: State) => state.GetLicensedModuleState.failed
};
// Load data Fall Right
export const getFallRightsData = {
  getDatas: (state: State) => state.LoadFallRightsState.data,
  getLoading: (state: State) => state.LoadFallRightsState.loading,
  getLoaded: (state: State) => state.LoadFallRightsState.loaded,
  getFailed: (state: State) => state.LoadFallRightsState.failed
};
export const getReopenPhaseData = {
  getDatas: (state: State) => state.GetReopenPhaseDataState.data,
  getLoading: (state: State) => state.GetReopenPhaseDataState.loading,
  getLoaded: (state: State) => state.GetReopenPhaseDataState.loaded,
  getFailed: (state: State) => state.GetReopenPhaseDataState.failed
};
// Load fallfuhrung
export const getFallfuhrungInit = {
  getDatas: (state: State) => state.LoadFallfuhrungDataState.data,
  getLoading: (state: State) => state.LoadFallfuhrungDataState.loading,
  getLoaded: (state: State) => state.LoadFallfuhrungDataState.loaded,
  getFailed: (state: State) => state.LoadFallfuhrungDataState.failed
};