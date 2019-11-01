import { AppEntityCustomState } from '@shared/AppAction';
import { BeratungsphaseFormData, DPLSelectboxModel, Result, StatusCodeModel, StatusCodeQuery, UpdateFormDataQueryModel } from '../../models';
import { GrundBedarfActions, GrundBedarfActionTypes } from '../actions/grund-bedarf.action';


interface LoadDatasourceSelectboxDatasState extends AppEntityCustomState<DPLSelectboxModel[], number> { }
interface GrundBedarfLoadFormDatasState extends AppEntityCustomState<BeratungsphaseFormData[], number> { }
interface GrundBedarfUpdateFormDatasState extends AppEntityCustomState<Result, UpdateFormDataQueryModel> {
  updating: false;
  updated: false;
}
interface LoadStatusCodeDatasState extends AppEntityCustomState<StatusCodeModel[], StatusCodeQuery> { }

export interface State {
  LoadDatasourceSelectboxDatasState: LoadDatasourceSelectboxDatasState;
  GrundBedarfLoadFormDatasState: GrundBedarfLoadFormDatasState;
  GrundBedarfUpdateFormDatasState: GrundBedarfUpdateFormDatasState;
  LoadStatusCodeDatasState: LoadStatusCodeDatasState;

}


export const initialState: State = {

  LoadDatasourceSelectboxDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfLoadFormDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfUpdateFormDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  LoadStatusCodeDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
};

export function reducer(state = initialState, action: GrundBedarfActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case GrundBedarfActionTypes.GrundBedarfAction:
      return state;

    case GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD: {
      return Object.assign({}, state, {
        LoadDatasourceSelectboxDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadDatasourceSelectboxDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadDatasourceSelectboxDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfFormDataTypes.LOAD: {
      return Object.assign({}, state, {
        GrundBedarfLoadFormDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfFormDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfLoadFormDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfFormDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfLoadFormDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    case GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA: {
      return Object.assign({}, state, {
        GrundBedarfUpdateFormDatasState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfUpdateFormDatasState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfUpdateFormDatasState: {
          updating: false,
          updated: false,
          failed: true,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GetStatusCodeTypes.LOAD: {
      return Object.assign({}, state, {
        LoadStatusCodeDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GetStatusCodeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadStatusCodeDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GetStatusCodeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadStatusCodeDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    default:
      return state;
  }
}

export const getBerechnungsgrundlageSelectboxData = {
  getDatas: (state: State) => state.LoadDatasourceSelectboxDatasState.data,
  getLoading: (state: State) => state.LoadDatasourceSelectboxDatasState.loading,
  getLoaded: (state: State) => state.LoadDatasourceSelectboxDatasState.loaded,
  getFailed: (state: State) => state.LoadDatasourceSelectboxDatasState.failed
};

export const getGrundBedarfLoadFormData = {
  getDatas: (state: State) => state.GrundBedarfLoadFormDatasState.data,
  getLoading: (state: State) => state.GrundBedarfLoadFormDatasState.loading,
  getLoaded: (state: State) => state.GrundBedarfLoadFormDatasState.loaded,
  getFailed: (state: State) => state.GrundBedarfLoadFormDatasState.failed
};
export const getGrundBedarfUpdateFormData = {
  getDatas: (state: State) => state.GrundBedarfUpdateFormDatasState.data,
  getUpdating: (state: State) => state.GrundBedarfUpdateFormDatasState.updating,
  getUpdated: (state: State) => state.GrundBedarfUpdateFormDatasState.updated,
  getFailed: (state: State) => state.GrundBedarfUpdateFormDatasState.failed
};
export const getStatusCodeData = {
  getDatas: (state: State) => state.LoadStatusCodeDatasState.data,
  getLoading: (state: State) => state.LoadStatusCodeDatasState.loading,
  getLoaded: (state: State) => state.LoadStatusCodeDatasState.loaded,
  getFailed: (state: State) => state.LoadStatusCodeDatasState.failed
};
