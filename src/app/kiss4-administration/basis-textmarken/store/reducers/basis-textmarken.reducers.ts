import { AppEntityCustomState } from '@shared/AppAction';

import { TextMarkenActions, TextMarkenActionTypes } from '../actions/basis-textmarken.actions';

interface TextMarkenState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}

interface GetTableState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}

interface GetTypState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}

interface GetModulState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface IBasisTextmarkenSaveState extends AppEntityCustomState<any> {
  data: any;
  dataFail: any;
}
interface IBasisTextmarkenDelState extends AppEntityCustomState<any> {
  data: any;
}

export interface State {
  markenState: TextMarkenState;
}

export interface State {
  getTableState: GetTableState;
}

export interface State {
  getTypState: GetTypState;
}

export interface State {
  getModulState: GetModulState;
}
export interface State {
  basisTextmarkenSaveState: IBasisTextmarkenSaveState;
}
export interface State {
  basisTextmarkenDelState: any;
}

export const initialState: State = {
  markenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  getTableState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    dataFail: null
  },
  getTypState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  getModulState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  basisTextmarkenSaveState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null,
  },
  basisTextmarkenDelState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
};

export function reducer(state = initialState, action: TextMarkenActions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case TextMarkenActionTypes.TextMarkenAction:
      return state;

    case TextMarkenActionTypes.TextMarkenDatasTypes.LOAD: {
      return Object.assign({}, state, {
        markenState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case TextMarkenActionTypes.TextMarkenDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        markenState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case TextMarkenActionTypes.TextMarkenDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        markenState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetTableDatasTypes.LOAD: {
      return Object.assign({}, state, {
        getTableState: {
          loading: true,
          loaded: false,
          failed: false
        }
      });
    }

    case TextMarkenActionTypes.GetTableDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getTableState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetTableDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getTableState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetTypDatasTypes.LOAD: {
      return Object.assign({}, state, {
        getTypState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetTypDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getTypState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetTypDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getTypState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetModulDatasTypes.LOAD: {
      return Object.assign({}, state, {
        getModulState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetModulDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getModulState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case TextMarkenActionTypes.GetModulDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getModulState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }

    case TextMarkenActionTypes.BasisTextmarkenPostBaInstitutionTypes.POST: {
      return Object.assign({}, state, {
        basisTextmarkenSaveState: {
          loading: true,
          loaded: false,
          failed: false
        }
      });
    }
    case TextMarkenActionTypes.BasisTextmarkenPostBaInstitutionTypes.POST_SUCCESS: {
      return Object.assign({}, state, {
        basisTextmarkenSaveState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case TextMarkenActionTypes.BasisTextmarkenPostBaInstitutionTypes.POST_FAIL: {
      return Object.assign({}, state, {
        basisTextmarkenSaveState: {
          loaded: false,
          loading: false,
          failed: true,
          dataFail: action.payload
        }
      });
    }

    case TextMarkenActionTypes.BasisTextmarkenDelBaInstitutionTypes.DEL: {
      return Object.assign({}, state, {
        basisTextmarkenDelState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }
    case TextMarkenActionTypes.BasisTextmarkenDelBaInstitutionTypes.DEL_SUCCESS: {
      return Object.assign({}, state, {
        basisTextmarkenDelState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case TextMarkenActionTypes.BasisTextmarkenDelBaInstitutionTypes.DEL_FAIL: {
      return Object.assign({}, state, {
        basisTextmarkenDelState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }

    default:
      return state;
  }
}

export const getTextMarken = {
  getData: (state: State) => state.markenState.data,
  getLoading: (state: State) => state.markenState.loading,
  getLoaded: (state: State) => state.markenState.loaded,
  getFailed: (state: State) => state.markenState.dataFail
};

export const getTable = {
  getData: (state: State) => state.getTableState.data,
  getLoading: (state: State) => state.getTableState.loading,
  getLoaded: (state: State) => state.getTableState.loaded,
  getFailed: (state: State) => state.getTableState.dataFail
};

export const getTyp = {
  getData: (state: State) => state.getTypState.data,
  getLoading: (state: State) => state.getTypState.loading,
  getLoaded: (state: State) => state.getTypState.loaded,
  getFailed: (state: State) => state.getTypState.dataFail
};

export const getModul = {
  getData: (state: State) => state.getModulState.data,
  getLoading: (state: State) => state.getModulState.loading,
  getLoaded: (state: State) => state.getModulState.loaded,
  getFailed: (state: State) => state.getModulState.dataFail
};

export const getSaveBasisTextmarken = {
  getDatas: (state: State) => state.basisTextmarkenSaveState.data,
  getLoading: (state: State) => state.basisTextmarkenSaveState.loading,
  getLoaded: (state: State) => state.basisTextmarkenSaveState.loaded,
  getFailed: (state: State) => state.basisTextmarkenSaveState.dataFail
};

export const getDelBasisTextmarken = {
  getDatas: (state: State) => state.basisTextmarkenDelState.data,
  getLoading: (state: State) => state.basisTextmarkenDelState.loading,
  getLoaded: (state: State) => state.basisTextmarkenDelState.loaded,
  getFailed: (state: State) => state.basisTextmarkenDelState.data
};
