import { tryParseJSON } from '@shared/utilites/utilityHelpers';
import {
  InitData,
  TreeNav,
  FaAktennotiz,
  FaAktennotizQuery
} from '../../models';
import {
  FaAktennotizActions,
  FaAktennotizActionTypes
} from '../actions/fa-aktennotiz.actions';
import { AppEntityCustomState } from '@shared/AppAction';

interface FaAktennotizInitDatasState extends AppEntityCustomState<any, any> { }
interface FaAktennotizNavTreeState extends AppEntityCustomState<TreeNav[]> { treeDetail: TreeNav; }
interface FaAktennotizState extends AppEntityCustomState<FaAktennotiz[], FaAktennotizQuery> {
  faAktennotiz: FaAktennotiz;
  adding: boolean;
  added: boolean;
  xtaskId: any;
}
interface KontaktartState extends AppEntityCustomState<any, any> { }
interface MitarbeiterState extends AppEntityCustomState<any, any> { }
interface TheMenState extends AppEntityCustomState<any, any> { }
interface AddFaAktennotizenState extends AppEntityCustomState<any, any> {
  adding: boolean;
  added: boolean;
}
interface DeleteFaAktennotizenState extends AppEntityCustomState<any, any> {
  deleting: boolean;
  deleted: boolean;
}
interface UpdateFaAktennotizenState extends AppEntityCustomState<any, any> {
  updating: boolean;
  updated: boolean;
}
interface DauerState extends AppEntityCustomState<any, any> { }
interface LoadConfigDataState extends AppEntityCustomState<any, any> { }
interface DokumentAktennotizenState extends AppEntityCustomState<any, any> { }
interface DefaultKontartPartnerState extends AppEntityCustomState<any, any> { }
export interface State {
  FaAktennotizInitDatasState: FaAktennotizInitDatasState;
  FaAktennotizNavTreeState: FaAktennotizNavTreeState;
  FaAktennotizState: FaAktennotizState;
  KontaktartState: KontaktartState;
  MitarbeiterState: MitarbeiterState;
  TheMenState: TheMenState;
  AddFaAktennotizenState: AddFaAktennotizenState;
  DeleteFaAktennotizenState: DeleteFaAktennotizenState;
  UpdateFaAktennotizenState: UpdateFaAktennotizenState;
  DauerState: DauerState;
  LoadConfigDataState: LoadConfigDataState;
  DokumentAktennotizenState: DokumentAktennotizenState;
  DefaultKontartPartnerState: DefaultKontartPartnerState;
}

export const initialState: State = {
  FaAktennotizInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  FaAktennotizNavTreeState: {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
    treeDetail: tryParseJSON(localStorage.getItem('select:pendenzen-tree')) || null
  },
  FaAktennotizState: {
    loading: false,
    loaded: false,
    failed: false,
    query: new FaAktennotizQuery(),
    data: [],
    faAktennotiz: new FaAktennotiz(),
    adding: false,
    added: false,
    xtaskId: null
  },
  KontaktartState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  MitarbeiterState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  TheMenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  AddFaAktennotizenState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    adding: false,
    added: false,
  },
  DeleteFaAktennotizenState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    deleting: false,
    deleted: false,
  },
  UpdateFaAktennotizenState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    updating: false,
    updated: false,
  },
  DauerState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadConfigDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DokumentAktennotizenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DefaultKontartPartnerState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};

export function reducer(state = initialState, action: FaAktennotizActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case FaAktennotizActionTypes.FaAktennotizAction:
      return state;

    case FaAktennotizActionTypes.FaAktennotizInitDatasTypes.LOAD: {
      return Object.assign({}, state, {
        FaAktennotizInitDatasState: {
          loading: true,
          query: action.payload,
          data: [],
        }
      });
    }

    case FaAktennotizActionTypes.FaAktennotizInitDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        FaAktennotizInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.FaAktennotizInitDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        FaAktennotizInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // FaAktennotizState
    case FaAktennotizActionTypes.FaAktennotizTypes.LOAD: {
      return Object.assign({}, state, {
        FaAktennotizState: {
          loading: true,
          query: action.payload,
          data: [],
        }
      });
    }

    case FaAktennotizActionTypes.FaAktennotizTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        FaAktennotizState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.FaAktennotizTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        FaAktennotizState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // KontaktartState
    case FaAktennotizActionTypes.KontaktartTypes.LOAD: {
      return Object.assign({}, state, {
        KontaktartState: {
          loading: true,
          query: action.payload,
          data: null,
        }
      });
    }

    case FaAktennotizActionTypes.KontaktartTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        KontaktartState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.KontaktartTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        KontaktartState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }
    // MitarbeiterState
    case FaAktennotizActionTypes.MitarbeiterTypes.LOAD: {
      return Object.assign({}, state, {
        MitarbeiterState: {
          loading: true,
          query: action.payload,
          data: null,
        }
      });
    }

    case FaAktennotizActionTypes.MitarbeiterTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        MitarbeiterState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.MitarbeiterTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        MitarbeiterState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }
    // TheMenState
    case FaAktennotizActionTypes.TheMenTypes.LOAD: {
      return Object.assign({}, state, {
        TheMenState: {
          loading: true,
          query: action.payload,
          data: null,
        }
      });
    }

    case FaAktennotizActionTypes.TheMenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        TheMenState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.TheMenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        TheMenState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }
    // AddFaAktennotizenState
    case FaAktennotizActionTypes.AddFaAktennotizenTypes.ADD: {
      return Object.assign({}, state, {
        AddFaAktennotizenState: {
          adding: true,
          added: false,
          failed: false,
          query: null,
          data: null,
        }
      });
    }

    case FaAktennotizActionTypes.AddFaAktennotizenTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        AddFaAktennotizenState: {
          adding: false,
          added: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.AddFaAktennotizenTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        AddFaAktennotizenState: {
          added: false,
          adding: false,
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // DeleteFaAktennotizenState
    case FaAktennotizActionTypes.DeleteFaAktennotizenTypes.DELETE: {
      return Object.assign({}, state, {
        DeleteFaAktennotizenState: {
          deleting: true,
          deleted: false,
          failed: false,
          query: null,
          data: null,
        }
      });
    }

    case FaAktennotizActionTypes.DeleteFaAktennotizenTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        DeleteFaAktennotizenState: {
          deleting: false,
          deleted: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.DeleteFaAktennotizenTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        DeleteFaAktennotizenState: {
          deleting: false,
          deleted: false,
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }
    // UpdateFaAktennotizenState
    case FaAktennotizActionTypes.UpdateFaAktennotizenTypes.UPDATE: {
      return Object.assign({}, state, {
        UpdateFaAktennotizenState: {
          updating: true,
          updated: false,
          failed: false,
          query: null,
          data: null,
        }
      });
    }

    case FaAktennotizActionTypes.UpdateFaAktennotizenTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        UpdateFaAktennotizenState: {
          updating: false,
          updated: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.UpdateFaAktennotizenTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        UpdateFaAktennotizenState: {
          updating: false,
          updated: false,
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // DauerState
    case FaAktennotizActionTypes.DauerTypes.LOAD: {
      return Object.assign({}, state, {
        DauerState: {
          loading: true,
          query: action.payload,
          data: state.DauerState.data,
        }
      });
    }

    case FaAktennotizActionTypes.DauerTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DauerState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaAktennotizActionTypes.DauerTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DauerState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }
    // Load config
    case FaAktennotizActionTypes.GetConfigTypes.LOAD: {
      return Object.assign({}, state, {
        LoadConfigDataState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FaAktennotizActionTypes.GetConfigTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadConfigDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case FaAktennotizActionTypes.GetConfigTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadConfigDataState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
        }
      });
    }
    // Load DokumentAktennotizen
    case FaAktennotizActionTypes.GetDokumentAktennotizenTypes.LOAD: {
      return Object.assign({}, state, {
        DokumentAktennotizenState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FaAktennotizActionTypes.GetDokumentAktennotizenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DokumentAktennotizenState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case FaAktennotizActionTypes.GetDokumentAktennotizenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DokumentAktennotizenState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
        }
      });
    }
     // Load DefaultKontartPartner
     case FaAktennotizActionTypes.GetDefaultKontartPartnerTypes.LOAD: {
      return Object.assign({}, state, {
        DefaultKontartPartnerState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case FaAktennotizActionTypes.GetDefaultKontartPartnerTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DefaultKontartPartnerState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case FaAktennotizActionTypes.GetDefaultKontartPartnerTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DefaultKontartPartnerState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
        }
      });
    }
    default:
      return state;
  }
}

export const getFaAktennotizInit = {
  getDatas: (state: State) => state.FaAktennotizInitDatasState.data,
  getLoading: (state: State) => state.FaAktennotizInitDatasState.loading,
  getLoaded: (state: State) => state.FaAktennotizInitDatasState.loaded,
  getFailed: (state: State) => state.FaAktennotizInitDatasState.failed
};

export const getFaAktennotizNavTree = {
  getDatas: (state: State) => state.FaAktennotizNavTreeState.data,
  getLoading: (state: State) => state.FaAktennotizNavTreeState.loading,
  getLoaded: (state: State) => state.FaAktennotizNavTreeState.loaded,
  getFailed: (state: State) => state.FaAktennotizNavTreeState.failed,
  getTreeDetail: (state: State) => state.FaAktennotizNavTreeState.treeDetail
};

export const getFaAktennotiz = {
  getDatas: (state: State) => state.FaAktennotizState.data,
  getLoading: (state: State) => state.FaAktennotizState.loading,
  getLoaded: (state: State) => state.FaAktennotizState.loaded,
  getFailed: (state: State) => state.FaAktennotizState.failed,
  getFaAktennotiz: (state: State) => state.FaAktennotizState.faAktennotiz,
  getXtaskId: (state: State) => state.FaAktennotizState.xtaskId,
  getQuery: (state: State) => state.FaAktennotizState.query,
};
export const getKontaktart = {
  getDatas: (state: State) => state.KontaktartState.data,
};
export const getMitarbeiter = {
  getDatas: (state: State) => state.MitarbeiterState.data,
};
export const getTheMen = {
  getDatas: (state: State) => state.TheMenState.data,
};
export const getAddFaAktennotizen = {
  getDatas: (state: State) => state.AddFaAktennotizenState.data,
};
export const getDeleteFaAktennotizen = {
  getDatas: (state: State) => state.DeleteFaAktennotizenState.data,
};
export const getUpdateFaAktennotizen = {
  getDatas: (state: State) => state.UpdateFaAktennotizenState.data,
};
export const getDauerFaAktennotizen = {
  getDatas: (state: State) => state.DauerState.data,
};
export const getConfigData = {
  getDatas: (state: State) => state.LoadConfigDataState.data,
};
export const getDokumentAktennotizen = {
  getDatas: (state: State) => state.DokumentAktennotizenState.data,
};
export const getDefaultKontartPartner = {
  getDatas: (state: State) => state.DefaultKontartPartnerState.data,
};
