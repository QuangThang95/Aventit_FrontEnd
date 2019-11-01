import { tryParseJSON } from '@shared/utilites/utilityHelpers';
import {
  InitData,
  BetreffBeschreibung,
  BetriffPerson,
  Pendenzgruppe,
  Falltraeger,
  VwUser,
  Leistungsverantw,
  XOrgUnit,
  XLOVCode,
  ErfassungMutation,
  TreeNav,
  ModulenStatus,
  StatusEdit,
  PendenzenVerwaltung,
  LovCodeQuery,
  ErfassungMutationQuery,
  PendenzenVerwaltungQuery
} from '../../models';
import {
  PendenzensActions,
  PendenzensActionTypes,
  PendenzenVerwaltungGetMasterAction
} from '../actions/pendenzens.actions';
import { AppEntityCustomState } from '@shared/AppAction';

interface PendenzenInitDatasState extends AppEntityCustomState<InitData, number> {}
interface PendenzenBetreffBeschreibungsState extends AppEntityCustomState<BetreffBeschreibung[], number> {}
interface PendenzenBetriffPersonsState extends AppEntityCustomState<BetriffPerson[], number> {}
interface PendenzenErstellerEmpfaengerState extends AppEntityCustomState<Pendenzgruppe[], string> {}
interface PendenzenVerwaltungFalltraegersState extends AppEntityCustomState<Falltraeger[], string> {}
interface PendenzenLeistungsState extends AppEntityCustomState<VwUser[], string> {}
interface PendenzenLeistungsverantwsState extends AppEntityCustomState<VwUser[], number> {}
interface PendenzenLeistungsverantwState extends AppEntityCustomState<Leistungsverantw[], number> {}
interface PendenzenOrganisationState extends AppEntityCustomState<XOrgUnit[]> {}
interface PendenzenStatusState extends AppEntityCustomState<XLOVCode[], LovCodeQuery> {}
interface PendenzenWithTypeState extends AppEntityCustomState<XLOVCode[], string> {}
interface PendenzenVerwaltungErfassungMutationState extends AppEntityCustomState<ErfassungMutation, ErfassungMutationQuery> {}
interface PendenzenVerwaltungNavTreeState extends AppEntityCustomState<TreeNav[]> {
  treeDetail: TreeNav;
}
interface PendenzenVerwaltungModulenStatusState extends AppEntityCustomState<ModulenStatus[], number> {}
interface PendenzenVerwaltungStatusEditState extends AppEntityCustomState<StatusEdit, number> {}
interface PendenzenVerwaltungState extends AppEntityCustomState<PendenzenVerwaltung[], PendenzenVerwaltungQuery> {
  pendenzenVerwaltung: PendenzenVerwaltung;
  adding: boolean;
  added: boolean;
  xtaskId: any;
}
interface PendenzenVerwaltungGetMasterInitDatasState extends AppEntityCustomState<any> {}
export interface State {
  PendenzenInitDatasState: PendenzenInitDatasState;
  PendenzenBetreffBeschreibungsState: PendenzenBetreffBeschreibungsState;
  PendenzenBetriffPersonsState: PendenzenBetriffPersonsState;
  PendenzenErstellerEmpfaengerState: PendenzenErstellerEmpfaengerState;
  PendenzenVerwaltungFalltraegersState: PendenzenVerwaltungFalltraegersState;
  PendenzenLeistungsState: PendenzenLeistungsState;
  PendenzenLeistungsverantwsState: PendenzenLeistungsverantwsState;
  PendenzenLeistungsverantwState: PendenzenLeistungsverantwState;
  PendenzenOrganisationState: PendenzenOrganisationState;
  PendenzenStatusState: PendenzenStatusState;
  PendenzenWithTypeState: PendenzenWithTypeState;
  PendenzenVerwaltungErfassungMutationState: PendenzenVerwaltungErfassungMutationState;
  PendenzenVerwaltungNavTreeState: PendenzenVerwaltungNavTreeState;
  PendenzenVerwaltungModulenStatusState: PendenzenVerwaltungModulenStatusState;
  PendenzenVerwaltungStatusEditState: PendenzenVerwaltungStatusEditState;
  PendenzenVerwaltungState: PendenzenVerwaltungState;
  PendenzenVerwaltungGetMasterInitDatasState: PendenzenVerwaltungGetMasterInitDatasState;
}

export const initialState: State = {
  PendenzenInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  PendenzenBetreffBeschreibungsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: []
  },
  PendenzenBetriffPersonsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: []
  },
  PendenzenErstellerEmpfaengerState: {
    loading: false,
    loaded: false,
    failed: false,
    query: '',
    data: []
  },
  PendenzenVerwaltungFalltraegersState: {
    loading: false,
    loaded: false,
    failed: false,
    query: '',
    data: []
  },
  PendenzenLeistungsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: '',
    data: []
  },
  PendenzenLeistungsverantwsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: []
  },
  PendenzenLeistungsverantwState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: []
  },
  PendenzenOrganisationState: {
    loading: false,
    loaded: false,
    failed: false,
    data: []
  },
  PendenzenStatusState: {
    loading: false,
    loaded: false,
    failed: false,
    query: new LovCodeQuery(),
    data: []
  },
  PendenzenWithTypeState: {
    loading: false,
    loaded: false,
    failed: false,
    query: '',
    data: []
  },
  PendenzenVerwaltungErfassungMutationState: {
    loading: false,
    loaded: false,
    failed: false,
    query: new ErfassungMutationQuery(),
    data: new ErfassungMutation()
  },
  PendenzenVerwaltungNavTreeState: {
    loading: false,
    loaded: false,
    failed: false,
    data: [],
    treeDetail: tryParseJSON(localStorage.getItem('select:pendenzen-tree')) || null
  },
  PendenzenVerwaltungModulenStatusState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: []
  },
  PendenzenVerwaltungStatusEditState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: new StatusEdit()
  },
  PendenzenVerwaltungState: {
    loading: false,
    loaded: false,
    failed: false,
    query: new PendenzenVerwaltungQuery(),
    data: [],
    pendenzenVerwaltung: new PendenzenVerwaltung(),
    adding: false,
    added: false,
    xtaskId: null
  },
  PendenzenVerwaltungGetMasterInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: {}
  },
};

export function reducer(state = initialState, action: PendenzensActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case PendenzensActionTypes.PendenzensAction:
      return state;

    case PendenzensActionTypes.PendenzenInitDatasTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenInitDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenInitDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case PendenzensActionTypes.PendenzenBetreffBeschreibungsTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenBetreffBeschreibungsState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenBetreffBeschreibungsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenBetreffBeschreibungsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenBetreffBeschreibungsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenBetreffBeschreibungsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenBetriffPersonsState
    case PendenzensActionTypes.PendenzenBetriffPersonsTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenBetriffPersonsState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenBetriffPersonsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenBetriffPersonsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenBetriffPersonsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenBetriffPersonsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenErstellerEmpfaengerState
    case PendenzensActionTypes.PendenzenErstellerEmpfaengerTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenErstellerEmpfaengerState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenErstellerEmpfaengerTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenErstellerEmpfaengerState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenErstellerEmpfaengerTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenErstellerEmpfaengerState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenVerwaltungFalltraegersState
    case PendenzensActionTypes.PendenzenVerwaltungFalltraegersTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungFalltraegersState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungFalltraegersTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungFalltraegersState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungFalltraegersTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungFalltraegersState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenLeistungsState
    case PendenzensActionTypes.PendenzenLeistungsTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenLeistungsState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenLeistungsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenLeistungsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenLeistungsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenLeistungsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenLeistungsverantwsState
    case PendenzensActionTypes.PendenzenLeistungsverantwsTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenLeistungsverantwsState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenLeistungsverantwsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenLeistungsverantwsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenLeistungsverantwsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenLeistungsverantwsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenLeistungsverantwState
    case PendenzensActionTypes.PendenzenLeistungsverantwTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenLeistungsverantwState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenLeistungsverantwTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenLeistungsverantwState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenLeistungsverantwTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenLeistungsverantwState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenOrganisationState
    case PendenzensActionTypes.PendenzenOrganisationTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenOrganisationState: {
          loading: true
        }
      });
    }

    case PendenzensActionTypes.PendenzenOrganisationTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenOrganisationState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenOrganisationTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenOrganisationState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenStatusState
    case PendenzensActionTypes.PendenzenStatusTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenStatusState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenStatusTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenStatusState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenStatusTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenStatusState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenWithTypeState
    case PendenzensActionTypes.PendenzenWithTypeTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenWithTypeState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenWithTypeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenWithTypeState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenWithTypeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenWithTypeState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenVerwaltungErfassungMutationState
    case PendenzensActionTypes.PendenzenVerwaltungErfassungMutationTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungErfassungMutationState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungErfassungMutationTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungErfassungMutationState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungErfassungMutationTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungErfassungMutationState: {
          loaded: false,
          loading: false,
          failed: true,
          data: null
        }
      });
    }

    // PendenzenVerwaltungNavTreeState
    case PendenzensActionTypes.PendenzenVerwaltungNavTreeTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungNavTreeState: {
          loading: true
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungNavTreeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungNavTreeState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungNavTreeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungNavTreeState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungNavTreeTypes.GET_TREE_DETAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungNavTreeState: {
          treeDetail: action.payload
        }
      });
    }

    // PendenzenVerwaltungModulenStatusState
    case PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungModulenStatusState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungModulenStatusState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungModulenStatusState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    // PendenzenVerwaltungStatusEditState
    case PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungStatusEditState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungStatusEditState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungStatusEditState: {
          loaded: false,
          loading: false,
          failed: true,
          data: new StatusEdit()
        }
      });
    }

    // PendenzenVerwaltungState
    case PendenzensActionTypes.PendenzenVerwaltungTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungInsertTypes.ADD_NEW: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          adding: false,
          added: false,
          pendenzenVerwaltung: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungInsertTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          adding: true,
          added: true,
          pendenzenVerwaltung: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungInsertTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          adding: false,
          added: false,
          failed: true,
          pendenzenVerwaltung: null
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungUpdateTypes.UPDATE: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          pendenzenVerwaltung: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungUpdateTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          pendenzenVerwaltung: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungUpdateTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungState: {
          failed: true,
          pendenzenVerwaltung: null
        }
      });
    }

    // PendenzenVerwaltungS GetMaster
    case PendenzensActionTypes.PendenzenVerwaltungGetMasterTypes.LOAD: {
      return Object.assign({}, state, {
        PendenzenVerwaltungGetMasterInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungGetMasterTypes.LOAD_SUCCESS: {
      console.log('reducerr', action.payload);
      return Object.assign({}, state, {
        PendenzenVerwaltungGetMasterInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case PendenzensActionTypes.PendenzenVerwaltungGetMasterTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PendenzenVerwaltungGetMasterInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: {}
        }
      });
    }
    default:
      return state;
  }
}

export const getPendenzenInit = {
  getDatas: (state: State) => state.PendenzenInitDatasState.data,
  getLoading: (state: State) => state.PendenzenInitDatasState.loading,
  getLoaded: (state: State) => state.PendenzenInitDatasState.loaded,
  getFailed: (state: State) => state.PendenzenInitDatasState.failed
};

export const getPendenzenBetreffBeschreibungs = {
  getDatas: (state: State) => state.PendenzenBetreffBeschreibungsState.data,
  getLoading: (state: State) => state.PendenzenBetreffBeschreibungsState.loading,
  getLoaded: (state: State) => state.PendenzenBetreffBeschreibungsState.loaded,
  getFailed: (state: State) => state.PendenzenBetreffBeschreibungsState.failed
};

export const getPendenzenBetriffPersons = {
  getDatas: (state: State) => state.PendenzenBetriffPersonsState.data,
  getLoading: (state: State) => state.PendenzenBetriffPersonsState.loading,
  getLoaded: (state: State) => state.PendenzenBetriffPersonsState.loaded,
  getFailed: (state: State) => state.PendenzenBetriffPersonsState.failed,
};

export const getPendenzenErstellerEmpfaenger = {
  getDatas: (state: State) => state.PendenzenErstellerEmpfaengerState.data,
  getLoading: (state: State) => state.PendenzenErstellerEmpfaengerState.loading,
  getLoaded: (state: State) => state.PendenzenErstellerEmpfaengerState.loaded,
  getFailed: (state: State) => state.PendenzenErstellerEmpfaengerState.failed
};

export const getPendenzenVerwaltungFalltraegers = {
  getDatas: (state: State) => state.PendenzenVerwaltungFalltraegersState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungFalltraegersState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungFalltraegersState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungFalltraegersState.failed
};

export const getPendenzenLeistungs = {
  getDatas: (state: State) => state.PendenzenLeistungsState.data,
  getLoading: (state: State) => state.PendenzenLeistungsState.loading,
  getLoaded: (state: State) => state.PendenzenLeistungsState.loaded,
  getFailed: (state: State) => state.PendenzenLeistungsState.failed
};

export const getPendenzenLeistungsverantws = {
  getDatas: (state: State) => state.PendenzenLeistungsverantwsState.data,
  getLoading: (state: State) => state.PendenzenLeistungsverantwsState.loading,
  getLoaded: (state: State) => state.PendenzenLeistungsverantwsState.loaded,
  getFailed: (state: State) => state.PendenzenLeistungsverantwsState.failed
};

export const getPendenzenLeistungsverantw = {
  getDatas: (state: State) => state.PendenzenLeistungsverantwState.data,
  getLoading: (state: State) => state.PendenzenLeistungsverantwState.loading,
  getLoaded: (state: State) => state.PendenzenLeistungsverantwState.loaded,
  getFailed: (state: State) => state.PendenzenLeistungsverantwState.failed
};

export const getPendenzenOrganisation = {
  getDatas: (state: State) => state.PendenzenOrganisationState.data,
  getLoading: (state: State) => state.PendenzenOrganisationState.loading,
  getLoaded: (state: State) => state.PendenzenOrganisationState.loaded,
  getFailed: (state: State) => state.PendenzenOrganisationState.failed
};

export const getPendenzenStatus = {
  getDatas: (state: State) => state.PendenzenStatusState.data,
  getLoading: (state: State) => state.PendenzenStatusState.loading,
  getLoaded: (state: State) => state.PendenzenStatusState.loaded,
  getFailed: (state: State) => state.PendenzenStatusState.failed
};

export const getPendenzenWithType = {
  getDatas: (state: State) => state.PendenzenWithTypeState.data,
  getLoading: (state: State) => state.PendenzenWithTypeState.loading,
  getLoaded: (state: State) => state.PendenzenWithTypeState.loaded,
  getFailed: (state: State) => state.PendenzenWithTypeState.failed
};

export const getPendenzenVerwaltungErfassungMutation = {
  getDatas: (state: State) => state.PendenzenVerwaltungErfassungMutationState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungErfassungMutationState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungErfassungMutationState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungErfassungMutationState.failed
};

export const getPendenzenVerwaltungNavTree = {
  getDatas: (state: State) => state.PendenzenVerwaltungNavTreeState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungNavTreeState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungNavTreeState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungNavTreeState.failed,
  getTreeDetail: (state: State) => state.PendenzenVerwaltungNavTreeState.treeDetail
};

export const getPendenzenVerwaltungModulenStatus = {
  getDatas: (state: State) => state.PendenzenVerwaltungModulenStatusState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungModulenStatusState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungModulenStatusState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungModulenStatusState.failed,
};

export const getPendenzenVerwaltungStatusEdit = {
  getDatas: (state: State) => state.PendenzenVerwaltungStatusEditState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungStatusEditState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungStatusEditState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungStatusEditState.failed,
};

export const getPendenzenVerwaltung = {
  getDatas: (state: State) => state.PendenzenVerwaltungState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungState.failed,
  getPendenzenVerwaltung: (state: State) => state.PendenzenVerwaltungState.pendenzenVerwaltung,
  getAdding: (state: State) => state.PendenzenVerwaltungState.adding,
  getAdded: (state: State) => state.PendenzenVerwaltungState.added,
  getXtaskId: (state: State) => state.PendenzenVerwaltungState.xtaskId,
  getQuery: (state: State) => state.PendenzenVerwaltungState.query,
};

export const getPendenzenVerwaltungGetMaster = {
  getDatas: (state: State) => state.PendenzenVerwaltungGetMasterInitDatasState.data,
  getLoading: (state: State) => state.PendenzenVerwaltungGetMasterInitDatasState.loading,
  getLoaded: (state: State) => state.PendenzenVerwaltungGetMasterInitDatasState.loaded,
  getFailed: (state: State) => state.PendenzenVerwaltungGetMasterInitDatasState.failed
};

