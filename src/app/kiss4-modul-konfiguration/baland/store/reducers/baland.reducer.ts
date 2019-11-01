import { AppEntityCustomState } from '@shared/AppAction';

import { Baland } from '../../models';
import { BalandActions, BalandActionTypes } from '../actions/baland.action';

interface BalandInitDatasState extends AppEntityCustomState<Baland[], number> { }

interface BalandSyncDatasState extends AppEntityCustomState<any> {
    syncing: false;
    synced: false;
}

export interface State {
    BalandInitDatasStates: BalandInitDatasState;
    BalandSyncDatasState: BalandSyncDatasState;
}

export const initialState: State = {
    // Load data for top grid
    BalandInitDatasStates: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    BalandSyncDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        syncing: false,
        synced: false,
        data: null
    }
};


export function reducer(state = initialState, action: BalandActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case BalandActionTypes.BalandAction:
            return state;

        // Load data for top grid
        case BalandActionTypes.BalandTypes.LOAD: {
            // return state;
            return Object.assign({}, state, {
                BalandInitDatasStates: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case BalandActionTypes.BalandTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BalandInitDatasStates: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case BalandActionTypes.BalandTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                BalandInitDatasStates: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        case BalandActionTypes.BalandSyncTypes.SYNC: {
            return Object.assign({}, state, {
                BalandSyncDatasState: {
                    failed: false,
                    syncing: true,
                    synced: false,
                    data: null,
                }
            });
        }

        case BalandActionTypes.BalandSyncTypes.SYNC_SUCCESS: {
            return Object.assign({}, state, {
                BalandSyncDatasState: {
                    failed: false,
                    syncing: false,
                    synced: true,
                    data: action.payload,
                }
            });
        }

        case BalandActionTypes.BalandSyncTypes.SYNC_FAIL: {
            return Object.assign({}, state, {
                BalandSyncDatasState: {
                    failed: true,
                    syncing: false,
                    synced: false,
                    data: action.payload
                }
            });
        }

        case BalandActionTypes.BalandResetTypes.RESET: {
            state = initialState;
            return state;
        }

        default:
            return state;
    }
}

// Load data for top grid
export const getBalandInit = {
    getDatas: (state: State) => state.BalandInitDatasStates.data,
    getLoading: (state: State) => state.BalandInitDatasStates.loading,
    getLoaded: (state: State) => state.BalandInitDatasStates.loaded,
    getFailed: (state: State) => state.BalandInitDatasStates.failed
};

export const getBalandSyncData = {
    getDatas: (state: State) => state.BalandSyncDatasState.data,
    getSyncing: (state: State) => state.BalandSyncDatasState.syncing,
    getSynced: (state: State) => state.BalandSyncDatasState.synced,
    getFailed: (state: State) => state.BalandSyncDatasState.failed
};
