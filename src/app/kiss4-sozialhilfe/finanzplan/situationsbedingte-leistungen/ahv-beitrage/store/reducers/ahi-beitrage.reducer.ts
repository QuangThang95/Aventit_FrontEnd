import { AppEntityCustomState } from '@shared/AppAction';

import { AHVBeitragPosition, BgSilAHVBeitrag, PersonenUnterstuetzt, SqlQueryShPositionTyp, DropDownAnpassung } from '../../models';
import { AhvBeitrageActions, AhvBeitrageActionTypes } from '../actions/ahv-beitrage.action';

interface BgSilAHVBeitragInitDatasStates extends AppEntityCustomState<any, number> { }
interface PersonenUnterstuetztInitDatasStates extends AppEntityCustomState<any[], number> { }
interface SqlQueryShPositionTypInitDatasStates extends AppEntityCustomState<any[], number> { }
interface AHVBeitragPositionInitDatasStates extends AppEntityCustomState<any[], number> { }
interface InstitutionSuchenWhInitDatasStates extends AppEntityCustomState<any[], number> { }
interface LookUpsInitDatasStates extends AppEntityCustomState<any[], number> { }
interface DeleteAhvBeitrageInitDatasStates extends AppEntityCustomState<any, number> { }
interface UpdateAhvBeitrageInitDatasStates extends AppEntityCustomState<any, number> { }
interface CreateAhvBeitrageInitDatasStates extends AppEntityCustomState<any, number> { }
interface DropDownAnpassungDatasStates extends AppEntityCustomState<any, number> { }

export interface State {
  BgSilAHVBeitragInitDatasStates: BgSilAHVBeitragInitDatasStates;
  AHVBeitragPositionInitDatasStates: AHVBeitragPositionInitDatasStates;
  PersonenUnterstuetztInitDatasStates: PersonenUnterstuetztInitDatasStates;
  SqlQueryShPositionTypInitDatasStates: SqlQueryShPositionTypInitDatasStates;
  InstitutionSuchenWhInitDatasStates: InstitutionSuchenWhInitDatasStates;
  DeleteAhvBeitrageInitDatasStates: DeleteAhvBeitrageInitDatasStates;
  UpdateAhvBeitrageInitDatasStates: UpdateAhvBeitrageInitDatasStates;
  CreateAhvBeitrageInitDatasStates: CreateAhvBeitrageInitDatasStates;
  LookUpsInitDatasStates: LookUpsInitDatasStates;
  DropDownAnpassungDatasStates: DropDownAnpassungDatasStates;
}

export const initialState: State = {
  BgSilAHVBeitragInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  AHVBeitragPositionInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  PersonenUnterstuetztInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  SqlQueryShPositionTypInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  InstitutionSuchenWhInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DeleteAhvBeitrageInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  UpdateAhvBeitrageInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CreateAhvBeitrageInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LookUpsInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DropDownAnpassungDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
};


export function reducer(state = initialState, action: AhvBeitrageActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case AhvBeitrageActionTypes.AhvBeitrageAction:
      return state;

    // Load data BgSilAHVBeitrag
    case AhvBeitrageActionTypes.BgSilAHVBeitragTypes.LOAD: {
      return Object.assign({}, state, {
        BgSilAHVBeitragInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.BgSilAHVBeitragTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        BgSilAHVBeitragInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.BgSilAHVBeitragTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BgSilAHVBeitragInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    // Load data PersonenUnterstuetzt
    case AhvBeitrageActionTypes.PersonenUnterstuetztTypes.LOAD: {
      return Object.assign({}, state, {
        PersonenUnterstuetztInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.PersonenUnterstuetztTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PersonenUnterstuetztInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.PersonenUnterstuetztTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PersonenUnterstuetztInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    // Load data SqlQueryShPositionTyp
    case AhvBeitrageActionTypes.SqlQueryShPositionTypTypes.LOAD: {
      return Object.assign({}, state, {
        SqlQueryShPositionTypInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.SqlQueryShPositionTypTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        SqlQueryShPositionTypInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.SqlQueryShPositionTypTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        SqlQueryShPositionTypInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    // Load data AHVBeitragPosition
    case AhvBeitrageActionTypes.AhvBeitragePositionTypes.LOAD: {
      return Object.assign({}, state, {
        AHVBeitragPositionInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AHVBeitragPositionInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AHVBeitragPositionInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    // Load data InstitutionSuchenWh
    case AhvBeitrageActionTypes.InstitutionSuchenWhTypes.LOAD: {
      return Object.assign({}, state, {
        InstitutionSuchenWhInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.InstitutionSuchenWhTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        InstitutionSuchenWhInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.InstitutionSuchenWhTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        InstitutionSuchenWhInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    // Delete AHV Beitrage postion
    case AhvBeitrageActionTypes.AhvBeitragePositionDeleteTypes.LOAD: {
      return Object.assign({}, state, {
        DeleteAhvBeitrageInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionDeleteTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DeleteAhvBeitrageInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionDeleteTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DeleteAhvBeitrageInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    // Update AHV Beitrage postion
    case AhvBeitrageActionTypes.AhvBeitragePositionUpdateTypes.LOAD: {
      return Object.assign({}, state, {
        UpdateAhvBeitrageInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionUpdateTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        UpdateAhvBeitrageInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionUpdateTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        UpdateAhvBeitrageInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    // Update AHV Beitrage postion
    case AhvBeitrageActionTypes.AhvBeitragePositionCreateTypes.LOAD: {
      return Object.assign({}, state, {
        CreateAhvBeitrageInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionCreateTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CreateAhvBeitrageInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.AhvBeitragePositionCreateTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CreateAhvBeitrageInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    // LookupS
    case AhvBeitrageActionTypes.LookUpsTypes.LOAD: {
      return Object.assign({}, state, {
        LookUpsInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.LookUpsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LookUpsInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.LookUpsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LookUpsInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    // DropDownAnpassung
    case AhvBeitrageActionTypes.DropDownAnpassungTypes.LOAD: {
      return Object.assign({}, state, {
        DropDownAnpassungDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AhvBeitrageActionTypes.DropDownAnpassungTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DropDownAnpassungDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AhvBeitrageActionTypes.DropDownAnpassungTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DropDownAnpassungDatasStates: {
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

export const getBgSilAHVBeitrag = {
  getDatas: (state: State) => state.BgSilAHVBeitragInitDatasStates.data,
  getLoading: (state: State) => state.BgSilAHVBeitragInitDatasStates.loading,
  getLoaded: (state: State) => state.BgSilAHVBeitragInitDatasStates.loaded,
  getFailed: (state: State) => state.BgSilAHVBeitragInitDatasStates.failed
};

export const getPersonenUnterstuetzt = {
  getDatas: (state: State) => state.PersonenUnterstuetztInitDatasStates.data,
  getLoading: (state: State) => state.PersonenUnterstuetztInitDatasStates.loading,
  getLoaded: (state: State) => state.PersonenUnterstuetztInitDatasStates.loaded,
  getFailed: (state: State) => state.PersonenUnterstuetztInitDatasStates.failed
};

export const getSqlQueryShPositionTyp = {
  getDatas: (state: State) => state.SqlQueryShPositionTypInitDatasStates.data,
  getLoading: (state: State) => state.SqlQueryShPositionTypInitDatasStates.loading,
  getLoaded: (state: State) => state.SqlQueryShPositionTypInitDatasStates.loaded,
  getFailed: (state: State) => state.SqlQueryShPositionTypInitDatasStates.failed
};

export const getAHVBeitragPosition = {
  getDatas: (state: State) => state.AHVBeitragPositionInitDatasStates.data,
  getLoading: (state: State) => state.AHVBeitragPositionInitDatasStates.loading,
  getLoaded: (state: State) => state.AHVBeitragPositionInitDatasStates.loaded,
  getFailed: (state: State) => state.AHVBeitragPositionInitDatasStates.failed
};

export const getInstitutionSuchenWh = {
  getDatas: (state: State) => state.InstitutionSuchenWhInitDatasStates.data,
  getLoading: (state: State) => state.InstitutionSuchenWhInitDatasStates.loading,
  getLoaded: (state: State) => state.InstitutionSuchenWhInitDatasStates.loaded,
  getFailed: (state: State) => state.InstitutionSuchenWhInitDatasStates.failed
};

export const deleteAhvBeitrage = {
  getDatas: (state: State) => state.DeleteAhvBeitrageInitDatasStates.data,
  getLoading: (state: State) => state.DeleteAhvBeitrageInitDatasStates.loading,
  getLoaded: (state: State) => state.DeleteAhvBeitrageInitDatasStates.loaded,
  getFailed: (state: State) => state.DeleteAhvBeitrageInitDatasStates.failed
};
export const updateAhvBeitrage = {
  getDatas: (state: State) => state.UpdateAhvBeitrageInitDatasStates.data,
  getLoading: (state: State) => state.UpdateAhvBeitrageInitDatasStates.loading,
  getLoaded: (state: State) => state.UpdateAhvBeitrageInitDatasStates.loaded,
  getFailed: (state: State) => state.UpdateAhvBeitrageInitDatasStates.failed
};
export const createAhvBeitrage = {
  getDatas: (state: State) => state.CreateAhvBeitrageInitDatasStates.data,
  getLoading: (state: State) => state.CreateAhvBeitrageInitDatasStates.loading,
  getLoaded: (state: State) => state.CreateAhvBeitrageInitDatasStates.loaded,
  getFailed: (state: State) => state.CreateAhvBeitrageInitDatasStates.failed
};
export const getLookUps = {
  getDatas: (state: State) => state.LookUpsInitDatasStates.data,
  getLoading: (state: State) => state.LookUpsInitDatasStates.loading,
  getLoaded: (state: State) => state.LookUpsInitDatasStates.loaded,
  getFailed: (state: State) => state.LookUpsInitDatasStates.failed
};
export const getDropDownAnpassung = {
  getDatas: (state: State) => state.DropDownAnpassungDatasStates.data,
  getLoading: (state: State) => state.DropDownAnpassungDatasStates.loading,
  getLoaded: (state: State) => state.DropDownAnpassungDatasStates.loaded,
  getFailed: (state: State) => state.DropDownAnpassungDatasStates.failed
};
