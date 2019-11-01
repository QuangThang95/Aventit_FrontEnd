import { AppEntityCustomState } from '@shared/AppAction';
import { UberAction, UberActionTypes } from '../actions/uber.action';


interface CultureInfoLoadDataState extends AppEntityCustomState<any, any> { }
interface DatabaseInfoLoadDataState extends AppEntityCustomState<any, any> { }
interface DatabaseVersionsLoadDataState extends AppEntityCustomState<any, any> { }
interface Kiss4WebVersionLoadDataState extends AppEntityCustomState<any, any> { }


export interface State {
  CultureInfoLoadDataState: CultureInfoLoadDataState;
  DatabaseInfoLoadDataState: DatabaseInfoLoadDataState;
  DatabaseVersionsLoadDataState: DatabaseVersionsLoadDataState;
  Kiss4WebVersionLoadDataState: Kiss4WebVersionLoadDataState;
}

export const initialState: State = {
  CultureInfoLoadDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DatabaseInfoLoadDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DatabaseVersionsLoadDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  Kiss4WebVersionLoadDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};


export function reducer(state = initialState, action: UberAction): State {
  if (!action) { return state; }
  switch (action.type) {
    case UberActionTypes.UberAction:
      return state;
    // CultureInfo
    case UberActionTypes.CultureInfoTypes.LOAD: {
      return Object.assign({}, state, {
        CultureInfoLoadDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case UberActionTypes.CultureInfoTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CultureInfoLoadDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case UberActionTypes.CultureInfoTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CultureInfoLoadDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // DatabaseInfo
    case UberActionTypes.DatabaseInfoTypes.LOAD: {
      return Object.assign({}, state, {
        DatabaseInfoLoadDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case UberActionTypes.DatabaseInfoTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DatabaseInfoLoadDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case UberActionTypes.DatabaseInfoTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DatabaseInfoLoadDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // DatabaseVersions
    case UberActionTypes.DatabaseVersionsTypes.LOAD: {
      return Object.assign({}, state, {
        DatabaseVersionsLoadDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case UberActionTypes.DatabaseVersionsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DatabaseVersionsLoadDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case UberActionTypes.DatabaseVersionsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DatabaseVersionsLoadDataState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // Kiss4WebVersion
    case UberActionTypes.Kiss4WebVersionTypes.LOAD: {
      return Object.assign({}, state, {
        Kiss4WebVersionLoadDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case UberActionTypes.Kiss4WebVersionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        Kiss4WebVersionLoadDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case UberActionTypes.Kiss4WebVersionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        Kiss4WebVersionLoadDataState: {
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

export const getCultureInfoInit = {
  getData: (state: State) => state.CultureInfoLoadDataState.data,
  getLoading: (state: State) => state.CultureInfoLoadDataState.loading,
  getLoaded: (state: State) => state.CultureInfoLoadDataState.loaded,
  getFailed: (state: State) => state.CultureInfoLoadDataState.failed
};

export const getDatabaseInfoInit = {
  getData: (state: State) => state.DatabaseInfoLoadDataState.data,
  getLoading: (state: State) => state.DatabaseInfoLoadDataState.loading,
  getLoaded: (state: State) => state.DatabaseInfoLoadDataState.loaded,
  getFailed: (state: State) => state.DatabaseInfoLoadDataState.failed
};

export const getDatabaseVersionsInit = {
  getData: (state: State) => state.DatabaseVersionsLoadDataState.data,
  getLoading: (state: State) => state.DatabaseVersionsLoadDataState.loading,
  getLoaded: (state: State) => state.DatabaseVersionsLoadDataState.loaded,
  getFailed: (state: State) => state.DatabaseVersionsLoadDataState.failed
};

export const getKiss4WebVersionInit = {
  getData: (state: State) => state.Kiss4WebVersionLoadDataState.data,
  getLoading: (state: State) => state.Kiss4WebVersionLoadDataState.loading,
  getLoaded: (state: State) => state.Kiss4WebVersionLoadDataState.loaded,
  getFailed: (state: State) => state.Kiss4WebVersionLoadDataState.failed
};

