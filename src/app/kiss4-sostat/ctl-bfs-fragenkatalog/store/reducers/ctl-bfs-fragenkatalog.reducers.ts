import {
  CtlBfsFragenkatalogActions,
  CtlBfsFragenkatalogActionTypes,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/store/actions/ctl-bfs-fragenkatalog.actions';
import { AppEntityCustomState } from '@shared/AppAction';

interface CtlBfsFragenkatalogState extends AppEntityCustomState<any[], any> {
}

interface CtlBfsFragenkatalogListState extends AppEntityCustomState<any[], any> {
}

interface CtlBfsFragenkatalogAddNewDatasState extends AppEntityCustomState<any> {
  adding: false;
  added: false;
}

interface CtlBfsFragenkatalogUpdateDatasState extends AppEntityCustomState<any, any> {
  updating: false;
  updated: false;
}

interface CtlBfsFragenkatalogDeleteDatasState extends AppEntityCustomState<any> {
  deleting: false;
  deleted: false;
}

interface CtlBfsFragenkatalogSaveFormState extends AppEntityCustomState<any> {
}

interface CtlBfsFragenkatalogObjectDetailState extends AppEntityCustomState<any> {
}

export interface State {
  CtlBfsFragenkatalogStateInitDatasState: CtlBfsFragenkatalogState;
  CtlBfsFragenkatalogListState: CtlBfsFragenkatalogListState;
  CtlBfsFragenkatalogAddNewDatasState: CtlBfsFragenkatalogAddNewDatasState;
  CtlBfsFragenkatalogUpdateDatasState: CtlBfsFragenkatalogUpdateDatasState;
  CtlBfsFragenkatalogDeleteDatasState: CtlBfsFragenkatalogDeleteDatasState;
  CtlBfsFragenkatalogSaveFormState: CtlBfsFragenkatalogSaveFormState;
  CtlBfsFragenkatalogObjectDetailState: CtlBfsFragenkatalogObjectDetailState;
}

export const initialState: State = {
  CtlBfsFragenkatalogStateInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CtlBfsFragenkatalogListState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CtlBfsFragenkatalogAddNewDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    adding: false,
    added: false,
    data: null
  },
  CtlBfsFragenkatalogUpdateDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null
  },
  CtlBfsFragenkatalogDeleteDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    data: null
  },
  CtlBfsFragenkatalogSaveFormState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null
  },
  CtlBfsFragenkatalogObjectDetailState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null
  }
};

export function reducer(state = initialState, action: CtlBfsFragenkatalogActions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogAction:
      return state;

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogTypes.LOAD: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogStateInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogStateInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogStateInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogListTypes.LOAD: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogListState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogListTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogListState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogListTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogListState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    // add new
    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogAddTypes.ADD: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogAddNewDatasState: {
          adding: true,
          added: false,
          failed: false,
          data: null
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogAddTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogAddNewDatasState: {
          adding: false,
          added: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogAddTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogAddNewDatasState: {
          adding: false,
          added: false,
          failed: true,
          data: null
        }
      });
    }
    // update a row in top grid
    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogUpdateDatasState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG_SUCCESS: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogUpdateDatasState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG_FAIL: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogUpdateDatasState: {
          updating: false,
          updated: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // delete kurs
    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogDeleteTypes.DELETE: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogDeleteDatasState: {
          failed: false,
          deleting: true,
          deleted: false,
          data: null,
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogDeleteTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogDeleteDatasState: {
          failed: false,
          deleting: false,
          deleted: true,
          data: action.payload,
        }
      });
    }

    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogDeleteTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogDeleteDatasState: {
          failed: true,
          deleting: false,
          deleted: false,
          data: action.payload
        }
      });
    }
    case CtlBfsFragenkatalogActionTypes.SaveFormStateTypes.SAVE_FORM_STATE_TYPES: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogSaveFormState: {
          failed: true,
          deleting: false,
          deleted: false,
          data: action.payload,
        }
      });
    }
    case CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogDetailTypes.DETAIL_CTLBFSFRAGENKATALOG: {
      return Object.assign({}, state, {
        CtlBfsFragenkatalogObjectDetailState: {
          failed: true,
          deleting: false,
          deleted: false,
          data: action.payload,
        }
      });
    }

    default:
      return state;
  }
}

export const getCtlBfsFragenkatalog_StateInit = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogStateInitDatasState.data,
  getLoading: (state: State) => state.CtlBfsFragenkatalogStateInitDatasState.loading,
  getLoaded: (state: State) => state.CtlBfsFragenkatalogStateInitDatasState.loaded,
  getFailed: (state: State) => state.CtlBfsFragenkatalogStateInitDatasState.failed
};

export const getCtlBfsFragenkataloglist_StateInit = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogListState.data,
  getLoading: (state: State) => state.CtlBfsFragenkatalogListState.loading,
  getLoaded: (state: State) => state.CtlBfsFragenkatalogListState.loaded,
  getFailed: (state: State) => state.CtlBfsFragenkatalogListState.failed
};
export const getAddCtlBfsFragenkatalog = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogAddNewDatasState.data,
  getAdding: (state: State) => state.CtlBfsFragenkatalogAddNewDatasState.adding,
  getAdded: (state: State) => state.CtlBfsFragenkatalogAddNewDatasState.added,
  getFailed: (state: State) => state.CtlBfsFragenkatalogAddNewDatasState.failed
};
export const getUpdateCtlBfsFragenkatalog = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogUpdateDatasState.data,
  getUpdating: (state: State) => state.CtlBfsFragenkatalogUpdateDatasState.updating,
  getUpdated: (state: State) => state.CtlBfsFragenkatalogUpdateDatasState.updated,
  getFailed: (state: State) => state.CtlBfsFragenkatalogUpdateDatasState.data,
  getUpdateDatasStateCtlBfsFragenkatalog: (state: State) => state.CtlBfsFragenkatalogUpdateDatasState
};
export const getDeleteCtlBfsFragenkatalog = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogDeleteDatasState.data,
  getDeleting: (state: State) => state.CtlBfsFragenkatalogDeleteDatasState.deleting,
  getDeleted: (state: State) => state.CtlBfsFragenkatalogDeleteDatasState.deleted,
  getFailed: (state: State) => state.CtlBfsFragenkatalogDeleteDatasState.failed,
  getDeleteStateCtlBfsFragenkatalog: (state: State) => state.CtlBfsFragenkatalogDeleteDatasState
};
export const getStateFormCtlBfsFragenkatalog = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogSaveFormState.data,
};
export const getObjectDetailCtlBfsFragenkatalog = {
  getDatas: (state: State) => state.CtlBfsFragenkatalogObjectDetailState.data,
};



