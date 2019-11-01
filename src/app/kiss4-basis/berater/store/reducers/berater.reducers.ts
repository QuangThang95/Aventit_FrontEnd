import {AppEntityCustomState} from '@shared/AppAction';
import {tryParseJSON} from '@shared/utilites/utilityHelpers';
import {BeraterActions, BeraterActionTypes} from '../actions/berater.actions';

interface BeraterState extends AppEntityCustomState<any[], any> {
  data: any;
}
interface IBeraterKontaktState extends AppEntityCustomState<any[], any> {
  data: any;
}
interface IBeraterInstitutionState extends AppEntityCustomState<any[], any> {
  data: any;
}
interface IBeraterLanguageState extends AppEntityCustomState<any[], any> {
  data: any;
}
interface IBeraterSaveKontaktState extends AppEntityCustomState<any[], any> {
  data: any;
  dataFail: any;
}
interface IBeraterDelKontaktState extends AppEntityCustomState<any[], any> {
  data: any;
  dataFail: any;
}

export interface State {
  beraterState: BeraterState;
  beraterKontaktState: IBeraterKontaktState;
  beraterInstitutionState: IBeraterInstitutionState;
  beraterLanguageState: IBeraterLanguageState;
  beraterSaveKontaktState: IBeraterSaveKontaktState;
  beraterDelKontaktState: IBeraterDelKontaktState;
}

export const initialState: State = {
  beraterState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  beraterKontaktState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  beraterInstitutionState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  beraterLanguageState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  beraterSaveKontaktState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  beraterDelKontaktState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  }
};

export function reducer(state = initialState, action: BeraterActions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case BeraterActionTypes.BeraterAction:
      return state;

    case BeraterActionTypes.BeraterDatasTypes.LOAD: {
      return Object.assign({}, state, {
        beraterState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case BeraterActionTypes.BeraterDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        beraterState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case BeraterActionTypes.BeraterDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BeraterState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // VDHoan GetKontakt
    case BeraterActionTypes.BeraterLoadKontaktTypes.LOAD: {
      return Object.assign({}, state, {
        beraterKontaktState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterLoadKontaktTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        beraterKontaktState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterLoadKontaktTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        beraterKontaktState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // VDHoan GetInstitution
    case BeraterActionTypes.BeraterLoadInstitutionTypes.LOAD: {
      return Object.assign({}, state, {
        beraterInstitutionState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterLoadInstitutionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        beraterInstitutionState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterLoadInstitutionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        beraterInstitutionState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // VDHoan GetLanguage
    case BeraterActionTypes.BeraterLoadLanguageTypes.LOAD: {
      return Object.assign({}, state, {
        beraterLanguageState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterLoadLanguageTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        beraterLanguageState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterLoadLanguageTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        beraterLanguageState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // VDHoan SaveBaInstitutionKontakt
    case BeraterActionTypes.BeraterPostBaInstitutionKontaktTypes.POST: {
      return Object.assign({}, state, {
        beraterSaveKontaktState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterPostBaInstitutionKontaktTypes.POST_SUCCESS: {
      return Object.assign({}, state, {
        beraterSaveKontaktState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterPostBaInstitutionKontaktTypes.POST_FAIL: {
      return Object.assign({}, state, {
        beraterSaveKontaktState: {
          loaded: false,
          loading: false,
          failed: true,
          dataFail: action.payload
        }
      });
    }
    // VDHoan DeleteBaInstitutionKontakt
    case BeraterActionTypes.BeraterDelBaInstitutionKontaktTypes.DEL: {
      return Object.assign({}, state, {
        beraterDelKontaktState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterDelBaInstitutionKontaktTypes.DEL_SUCCESS: {
      return Object.assign({}, state, {
        beraterDelKontaktState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case BeraterActionTypes.BeraterDelBaInstitutionKontaktTypes.DEL_FAIL: {
      return Object.assign({}, state, {
        beraterDelKontaktState: {
          loaded: false,
          loading: false,
          failed: true,
          dataFail: action.payload
        }
      });
    }
    default:
      return state;
  }
}

export const getBerater = {
  getDatas: (state: State) => state.beraterState.data,
  getLoading: (state: State) => state.beraterState.loading,
  getLoaded: (state: State) => state.beraterState.loaded,
  getFailed: (state: State) => state.beraterState.failed
};

export const getKontakt = {
  getDatas: (state: State) => state.beraterKontaktState.data,
  getLoading: (state: State) => state.beraterKontaktState.loading,
  getLoaded: (state: State) => state.beraterKontaktState.loaded,
  getFailed: (state: State) => state.beraterKontaktState.failed
};

export const getInstitution = {
  getDatas: (state: State) => state.beraterInstitutionState.data,
  getLoading: (state: State) => state.beraterInstitutionState.loading,
  getLoaded: (state: State) => state.beraterInstitutionState.loaded,
  getFailed: (state: State) => state.beraterInstitutionState.failed
};

export const getLanguage = {
  getDatas: (state: State) => state.beraterLanguageState.data,
  getLoading: (state: State) => state.beraterLanguageState.loading,
  getLoaded: (state: State) => state.beraterLanguageState.loaded,
  getFailed: (state: State) => state.beraterLanguageState.failed
};

export const getSaveKontakt = {
  getDatas: (state: State) => state.beraterSaveKontaktState.data,
  getLoading: (state: State) => state.beraterSaveKontaktState.loading,
  getLoaded: (state: State) => state.beraterSaveKontaktState.loaded,
  getFailed: (state: State) => state.beraterSaveKontaktState.dataFail
};

export const getDelKontakt = {
  getDatas: (state: State) => state.beraterDelKontaktState.data,
  getLoading: (state: State) => state.beraterDelKontaktState.loading,
  getLoaded: (state: State) => state.beraterDelKontaktState.loaded,
  getFailed: (state: State) => state.beraterDelKontaktState.dataFail
};
