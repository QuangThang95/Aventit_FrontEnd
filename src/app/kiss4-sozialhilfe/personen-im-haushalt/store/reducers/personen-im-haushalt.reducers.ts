import {PersonenImHaushaltActions, personenImHaushaltActionTypes} from '@app/kiss4-sozialhilfe/personen-im-haushalt/store/actions/personen-im-haushalt.actions';
import {tryParseJSON} from '@shared/utilites';
import {HaushaltQuery, InitData, IPersonenImHaushalt, KlientenSystemQuery, PersonenImHaushaltQuery, TreeNav, WhKennzahlenQuery} from '../../models';
import {AppEntityCustomState} from '@shared/AppAction';

interface IPersonenImHaushaltInitDatasState extends AppEntityCustomState<InitData, number> { }
interface IPersonenImHaushaltNavTreeState extends AppEntityCustomState<TreeNav[]> { treeDetail: TreeNav; }
interface IPersonenImHaushaltState extends AppEntityCustomState<IPersonenImHaushalt[], PersonenImHaushaltQuery> {
  personenImHaushalt: IPersonenImHaushalt;
  adding: boolean;
  added: boolean;
  xtaskId: any;
}
interface IPersonenDataState extends AppEntityCustomState<IPersonenImHaushalt, PersonenImHaushaltQuery> { }
interface IWhKennzahlenDataState extends AppEntityCustomState<IPersonenImHaushalt, WhKennzahlenQuery> { }
interface IKlientenSystemDataState extends AppEntityCustomState<IPersonenImHaushalt, KlientenSystemQuery> { }
interface IHaushaltDataState extends AppEntityCustomState<IPersonenImHaushalt, HaushaltQuery> { }
interface IPutPersonenImHaushaltDataState {
  data: any;
  updating: false;
  updated: false;
  update_fail: false;
}
export interface IState {
  personenImHaushaltInitDatasState: IPersonenImHaushaltInitDatasState;
  personenImHaushaltNavTreeState: IPersonenImHaushaltNavTreeState;
  personenImHaushaltState: IPersonenImHaushaltState;
  personen: IPersonenDataState;
  whKennzahlen: IWhKennzahlenDataState;
  klientenSystem: IKlientenSystemDataState;
  haushalt: IHaushaltDataState;
  putPersonenImHaushaltState: IPutPersonenImHaushaltDataState;
}

export const initialState: IState = {
  personenImHaushaltInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  personenImHaushaltNavTreeState: {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
    treeDetail: tryParseJSON(localStorage.getItem('select:pendenzen-tree')) || null
  },
  personenImHaushaltState: {
    loading: false,
    loaded: false,
    failed: false,
    query: new PersonenImHaushaltQuery(),
    data: [],
    personenImHaushalt: {
      bgFinanzplanID: null,
      baPersonID: null,
      bgBewilligungStatusCode: null,
      finanzplanVon: null,
      finanzplanBis: null,
      nameVorname: null,
      wohnsitzStrasseHausNr: null,
      wohnsitzPLZOrt: null,
      geburtsdatum: null,
      heimatort: null,
    },
    adding: false,
    added: false,
    xtaskId: null
  },
  personen: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  whKennzahlen: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  klientenSystem: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  haushalt: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  putPersonenImHaushaltState: {
    updating: false,
    updated: false,
    update_fail: false,
    data: null,
  },
};

export function reducer(state = initialState, action: PersonenImHaushaltActions): IState {
  if (!action) { return state; }
  switch (action.type) {
    case personenImHaushaltActionTypes.personenImHaushaltInitDatasTypes.LOAD: {
      return Object.assign({}, state, {
        personenImHaushaltInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.personenImHaushaltInitDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        personenImHaushaltInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.personenImHaushaltInitDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        personenImHaushaltInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // personen
    case personenImHaushaltActionTypes.personenTypes.LOAD: {
      return Object.assign({}, state, {
        personen: {
          loading: true,
          query: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.personenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        personen: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.personenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        personen: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // whKennzahlen
    case personenImHaushaltActionTypes.whKennzahlenTypes.LOAD: {
      return Object.assign({}, state, {
        whKennzahlen: {
          loading: true,
          query: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.whKennzahlenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        whKennzahlen: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.whKennzahlenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        whKennzahlen: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // klientenSystem
    case personenImHaushaltActionTypes.klientenSystemTypes.LOAD: {
      return Object.assign({}, state, {
        klientenSystem: {
          loading: true,
          query: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.klientenSystemTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        klientenSystem: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.klientenSystemTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        klientenSystem: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // haushalt
    case personenImHaushaltActionTypes.haushaltTypes.LOAD: {
      return Object.assign({}, state, {
        haushalt: {
          loading: true,
          query: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.haushaltTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        haushalt: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.haushaltTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        haushalt: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // Put Personen Im Haushalt
    case personenImHaushaltActionTypes.putPersonenImHaushaltTypes.PUT: {
      return Object.assign({}, state, {
        putPersonenImHaushaltState: {
          updated: false,
          updating: true,
          updating_fail: false,
          query: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.putPersonenImHaushaltTypes.PUT_SUCCESS: {
      return Object.assign({}, state, {
        putPersonenImHaushaltState: {
          updated: true,
          updating: false,
          updating_fail: false,
          data: action.payload
        }
      });
    }

    case personenImHaushaltActionTypes.putPersonenImHaushaltTypes.PUT_FAIL: {
      return Object.assign({}, state, {
        putPersonenImHaushaltState: {
          updated: false,
          updating: false,
          updating_fail: true,
          data: action.payload
        }
      });
    }

    default:
      return state;
  }
}

export const getPersonenImHaushaltInit = {
  getData: (state: IState) => state.personenImHaushaltInitDatasState.data,
  getLoading: (state: IState) => state.personenImHaushaltInitDatasState.loading,
  getLoaded: (state: IState) => state.personenImHaushaltInitDatasState.loaded,
  getFailed: (state: IState) => state.personenImHaushaltInitDatasState.failed
};

export const getPersonenImHaushaltNavTree = {
  getData: (state: IState) => state.personenImHaushaltNavTreeState.data,
  getLoading: (state: IState) => state.personenImHaushaltNavTreeState.loading,
  getLoaded: (state: IState) => state.personenImHaushaltNavTreeState.loaded,
  getFailed: (state: IState) => state.personenImHaushaltNavTreeState.failed,
  getTreeDetail: (state: IState) => state.personenImHaushaltNavTreeState.treeDetail
};

export const getPersonenImHaushalt = {
  getData: (state: IState) => state.personenImHaushaltState.data,
  getLoading: (state: IState) => state.personenImHaushaltState.loading,
  getLoaded: (state: IState) => state.personenImHaushaltState.loaded,
  getFailed: (state: IState) => state.personenImHaushaltState.failed,
  getPersonenImHaushalt: (state: IState) => state.personenImHaushaltState.personenImHaushalt,
  getXtaskId: (state: IState) => state.personenImHaushaltState.xtaskId,
  getQuery: (state: IState) => state.personenImHaushaltState.query,
};
///////////////////////////////////////////
export const getPersonen = {
  getData: (state: IState) => state.personen.data,
  getLoading: (state: IState) => state.personen.loading,
  getLoaded: (state: IState) => state.personen.loaded,
  getFailed: (state: IState) => state.personen.failed
};

export const getWhKennzahlen = {
  getData: (state: IState) => state.whKennzahlen.data,
  getLoading: (state: IState) => state.whKennzahlen.loading,
  getLoaded: (state: IState) => state.whKennzahlen.loaded,
  getFailed: (state: IState) => state.whKennzahlen.failed
};

export const getKlientenSystem = {
  getData: (state: IState) => state.klientenSystem.data,
  getLoading: (state: IState) => state.klientenSystem.loading,
  getLoaded: (state: IState) => state.klientenSystem.loaded,
  getFailed: (state: IState) => state.klientenSystem.failed
};

export const getHaushalt = {
  getData: (state: IState) => state.haushalt.data,
  getLoading: (state: IState) => state.haushalt.loading,
  getLoaded: (state: IState) => state.haushalt.loaded,
  getFailed: (state: IState) => state.haushalt.failed
};

export const putPersonenImHaushalt = {
  getRespone: (state: IState) => state.putPersonenImHaushaltState.data,
  getUpdating: (state: IState) => state.putPersonenImHaushaltState.updating,
  getUpdated: (state: IState) => state.putPersonenImHaushaltState.updated,
  getUpdateFail: (state: IState) => state.putPersonenImHaushaltState.data
};
