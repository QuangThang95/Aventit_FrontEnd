import {
  BarPerSon,
  LOVName,
  BerufSuchen,
  InstitutionSuchen
} from '../../models';
import {
  ArbeitActions,
  ArbeitActionTypes
} from '../actions/arbeit.action';
import { AppEntityCustomState } from '@shared/AppAction';

interface ArbeitInitDatasState extends AppEntityCustomState<BarPerSon, number> { }

interface LOVNameDatasState extends AppEntityCustomState<LOVName, number> { }

interface BerufSuchenDatasState extends AppEntityCustomState<BerufSuchen, number> { }

interface InstitutionSuchenDatasState extends AppEntityCustomState<InstitutionSuchen, number> { }

interface SaveBeitDatasState extends AppEntityCustomState<any> { }

export interface State {
  ArbeitInitDatasState: ArbeitInitDatasState;
  LOVNameDatasState: LOVNameDatasState;
  BerufSuchenDatasState: BerufSuchenDatasState;
  InstitutionSuchenDatasState: InstitutionSuchenDatasState;
  SaveBeitDatasState: SaveBeitDatasState;
}

export const initialState: State = {
  // Load data for top grid
  ArbeitInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  LOVNameDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  BerufSuchenDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  InstitutionSuchenDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  SaveBeitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

};

export function reducer(state = initialState, action: ArbeitActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case ArbeitActionTypes.ArbeitAction:
      return state;
    // Load data for form
    case ArbeitActionTypes.ArbeitTypes.LOAD: {
      return Object.assign({}, state, {
        ArbeitInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case ArbeitActionTypes.ArbeitTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ArbeitInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case ArbeitActionTypes.ArbeitTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ArbeitInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }

    // Load data LOVName
    case ArbeitActionTypes.LOVNameTypes.LOAD: {
      return Object.assign({}, state, {
        LOVNameDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case ArbeitActionTypes.LOVNameTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LOVNameDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case ArbeitActionTypes.LOVNameTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LOVNameDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }

    // Load data BerufSuchenDatasState
    case ArbeitActionTypes.BerufSuchenTypes.LOAD: {
      return Object.assign({}, state, {
        BerufSuchenDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case ArbeitActionTypes.BerufSuchenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        BerufSuchenDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case ArbeitActionTypes.BerufSuchenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BerufSuchenDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }

    // Load data InstitutionSuchenDatasState
    case ArbeitActionTypes.IntitutionSuchenTypes.LOAD: {
      return Object.assign({}, state, {
        InstitutionSuchenDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case ArbeitActionTypes.IntitutionSuchenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        InstitutionSuchenDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case ArbeitActionTypes.IntitutionSuchenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        InstitutionSuchenDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null,
          query: null,
        }
      });
    }

    // Load data Save Arbeit Suchen
    case ArbeitActionTypes.SaveArbeitSuchenTypes.LOAD: {
      return Object.assign({}, state, {
        SaveBeitDatasState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case ArbeitActionTypes.SaveArbeitSuchenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        SaveBeitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case ArbeitActionTypes.SaveArbeitSuchenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        SaveBeitDatasState: {
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

// Load data arbeitInit
export const getArbeitInit = {
  getData: (state: State) => state.ArbeitInitDatasState.data,
  getLoading: (state: State) => state.ArbeitInitDatasState.loading,
  getLoaded: (state: State) => state.ArbeitInitDatasState.loaded,
  getFailed: (state: State) => state.ArbeitInitDatasState.failed
};

// Load data LOVName beit
export const getLOVNameArbeit = {
  getData: (state: State) => state.LOVNameDatasState.data,
  getLoading: (state: State) => state.LOVNameDatasState.loading,
  getLoaded: (state: State) => state.LOVNameDatasState.loaded,
  getFailed: (state: State) => state.LOVNameDatasState.failed
};

// Load data BerufSuchen
export const getBeruSuchenArbeitInit = {
  getData: (state: State) => state.BerufSuchenDatasState.data,
  getLoading: (state: State) => state.BerufSuchenDatasState.loading,
  getLoaded: (state: State) => state.BerufSuchenDatasState.loaded,
  getFailed: (state: State) => state.BerufSuchenDatasState.failed
};

// Load data institutionSuchen
export const getInstitutionSuchenArbeit = {
  getData: (state: State) => state.InstitutionSuchenDatasState.data,
  getLoading: (state: State) => state.InstitutionSuchenDatasState.loading,
  getLoaded: (state: State) => state.InstitutionSuchenDatasState.loaded,
  getFailed: (state: State) => state.InstitutionSuchenDatasState.failed
};

// Load data Save
export const getSaveArbeit = {
  getData: (state: State) => state.SaveBeitDatasState.data,
  getLoading: (state: State) => state.SaveBeitDatasState.loading,
  getLoaded: (state: State) => state.SaveBeitDatasState.loaded,
  getFailed: (state: State) => state.SaveBeitDatasState.failed
};
