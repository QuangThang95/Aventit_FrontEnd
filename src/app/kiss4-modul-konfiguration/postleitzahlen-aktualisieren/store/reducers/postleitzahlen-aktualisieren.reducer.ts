import { AppEntityCustomState } from '@shared/AppAction';

import {
  PostleitzahlenAktualisierenActions,
  PostleitzahlenAktualisierenActionTypes,
} from '../actions/postleitzahlen-aktualisieren.action';

interface PostleitzahlenAktualisierenInitDatasState extends AppEntityCustomState<any, any> {
}

interface PostleitzahlenAktualisierenSyncDatasState extends AppEntityCustomState<any> {
  syncing: false;
  synced: false;
}

export interface State {
  PostleitzahlenAktualisierenInitDatasState: PostleitzahlenAktualisierenInitDatasState;
  PostleitzahlenAktualisierenSyncDatasState: PostleitzahlenAktualisierenSyncDatasState;
}

export const initialState: State = {
  PostleitzahlenAktualisierenInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  PostleitzahlenAktualisierenSyncDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    syncing: false,
    synced: false,
    data: null
  }
};


export function reducer(state = initialState, action: PostleitzahlenAktualisierenActions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenAction:
      return state;

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenTypes.LOAD: {
      return Object.assign({}, state, {
        PostleitzahlenAktualisierenInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        PostleitzahlenAktualisierenInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        PostleitzahlenAktualisierenInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenSyncTypes.SYNC: {
      return Object.assign({}, state, {
        PostleitzahlenAktualisierenSyncDatasState: {
          failed: false,
          syncing: true,
          synced: false,
          data: null,
        }
      });
    }

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenSyncTypes.SYNC_SUCCESS: {
      return Object.assign({}, state, {
        PostleitzahlenAktualisierenSyncDatasState: {
          failed: false,
          syncing: false,
          synced: true,
          data: action.payload,
        }
      });
    }

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenSyncTypes.SYNC_FAIL: {
      return Object.assign({}, state, {
        PostleitzahlenAktualisierenSyncDatasState: {
          failed: true,
          syncing: false,
          synced: false,
          data: action.payload
        }
      });
    }

    case PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenResetTypes.RESET: {
      state = initialState;
      return state;
    }

    default:
      return state;
  }
}

export const getPostleitzahlenAktualisierenInit = {
  getDatas: (state: State) => state.PostleitzahlenAktualisierenInitDatasState.data,
  getLoading: (state: State) => state.PostleitzahlenAktualisierenInitDatasState.loading,
  getLoaded: (state: State) => state.PostleitzahlenAktualisierenInitDatasState.loaded,
  getFailed: (state: State) => state.PostleitzahlenAktualisierenInitDatasState.failed
};

export const getPostleitzahlenAktualisierenSyncData = {
  getDatas: (state: State) => state.PostleitzahlenAktualisierenSyncDatasState.data,
  getSyncing: (state: State) => state.PostleitzahlenAktualisierenSyncDatasState.syncing,
  getSynced: (state: State) => state.PostleitzahlenAktualisierenSyncDatasState.synced,
  getFailed: (state: State) => state.PostleitzahlenAktualisierenSyncDatasState.failed
};
