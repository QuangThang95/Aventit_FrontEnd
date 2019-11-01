import { DemografieActions, DemografieActionTypes } from '../actions/demografie-history.actions';
import { AppEntityCustomState } from '@shared/AppAction';

interface XUserHistoryInitDatasState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface PersonalienInitDatasState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface WohnsitzInitDatasState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface AufenthaltsortInitDatasState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}

export interface State {
  xUserHistoryInitDatasState: XUserHistoryInitDatasState;
  personalienInitDatasState: PersonalienInitDatasState;
  wohnsitzInitDatasState: WohnsitzInitDatasState;
  aufenthaltsortInitDatasState: AufenthaltsortInitDatasState;
}

export const initialState: State = {
  xUserHistoryInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null,
  },
  personalienInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null,
  },
  wohnsitzInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null,
  },
  aufenthaltsortInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null,
  }
};

export function reducer(state = initialState, action: DemografieActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case DemografieActionTypes.DemografieTypes:
      return state;
    // XUserHistory Types
    case DemografieActionTypes.xUserHistoryTypes.LOAD: {
      return Object.assign({}, state, {
        xUserHistoryInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case DemografieActionTypes.xUserHistoryTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        xUserHistoryInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case DemografieActionTypes.xUserHistoryTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        xUserHistoryInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }
    // PersonalienTypes
    case DemografieActionTypes.PersonalienTypes.LOAD: {
      return Object.assign({}, state, {
        personalienInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case DemografieActionTypes.PersonalienTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        personalienInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case DemografieActionTypes.PersonalienTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        personalienInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }
    // WohnsitzTypes
    case DemografieActionTypes.WohnsitzTypes.LOAD: {
      return Object.assign({}, state, {
        wohnsitzInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case DemografieActionTypes.WohnsitzTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        wohnsitzInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case DemografieActionTypes.WohnsitzTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        wohnsitzInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }

    // AufenthaltsortTypes
    case DemografieActionTypes.AufenthaltsortTypes.LOAD: {
      return Object.assign({}, state, {
        aufenthaltsortInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case DemografieActionTypes.AufenthaltsortTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        aufenthaltsortInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case DemografieActionTypes.AufenthaltsortTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        aufenthaltsortInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          dataFail: action.payload
        }
      });
    }
    default:
      return state;
  }
}
export const getXUserHistoryInit = {
  getDatas: (state: State) => state.xUserHistoryInitDatasState.data,
  getLoading: (state: State) => state.xUserHistoryInitDatasState.loading,
  getLoaded: (state: State) => state.xUserHistoryInitDatasState.loaded,
  getFailed: (state: State) => state.xUserHistoryInitDatasState.dataFail
};
export const getPersonalienInit = {
  getDatas: (state: State) => state.personalienInitDatasState.data,
  getLoading: (state: State) => state.personalienInitDatasState.loading,
  getLoaded: (state: State) => state.personalienInitDatasState.loaded,
  getFailed: (state: State) => state.personalienInitDatasState.dataFail
};
export const getWohnsitzInit = {
  getDatas: (state: State) => state.wohnsitzInitDatasState.data,
  getLoading: (state: State) => state.wohnsitzInitDatasState.loading,
  getLoaded: (state: State) => state.wohnsitzInitDatasState.loaded,
  getFailed: (state: State) => state.wohnsitzInitDatasState.dataFail
};

export const getAufenthaltsortInit = {
  getDatas: (state: State) => state.aufenthaltsortInitDatasState.data,
  getLoading: (state: State) => state.aufenthaltsortInitDatasState.loading,
  getLoaded: (state: State) => state.aufenthaltsortInitDatasState.loaded,
  getFailed: (state: State) => state.aufenthaltsortInitDatasState.dataFail
};
