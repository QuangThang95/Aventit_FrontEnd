import { AppEntityCustomState } from '@shared/AppAction';

import { GemeindeDaten } from '../../models';
import { GemeindeDatenActions, GemeindeDatenActionTypes } from '../actions/gemeinde-daten.action';

interface GemeindeDatenInitDatasState extends AppEntityCustomState<GemeindeDaten[], number> { }

interface GemeindeDatenSyncDatasState extends AppEntityCustomState<any> {
    syncing: false;
    synced: false;
}

interface GemeindeDatenImportDatasState extends AppEntityCustomState<any> {
    importing: false;
    imported: false;
}

export interface State {
    GemeindeDatenInitDatasState: GemeindeDatenInitDatasState;
    GemeindeDatenSyncDatasState: GemeindeDatenSyncDatasState;
    GemeindeDatenImportDatasState: GemeindeDatenImportDatasState;
}

export const initialState: State = {
    GemeindeDatenInitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    GemeindeDatenSyncDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        syncing: false,
        synced: false,
        data: null
    },
    GemeindeDatenImportDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        importing: false,
        imported: false,
        data: null
    }
};


export function reducer(state = initialState, action: GemeindeDatenActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case GemeindeDatenActionTypes.GemeindeDatenAction:
            return state;

        case GemeindeDatenActionTypes.GemeindeDatenTypes.LOAD: {
            return Object.assign({}, state, {
                GemeindeDatenInitDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                GemeindeDatenInitDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                GemeindeDatenInitDatasState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenSyncTypes.SYNC: {
            return Object.assign({}, state, {
                GemeindeDatenSyncDatasState: {
                    failed: false,
                    syncing: true,
                    synced: false,
                    data: null,
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenSyncTypes.SYNC_SUCCESS: {
            return Object.assign({}, state, {
                GemeindeDatenSyncDatasState: {
                    failed: false,
                    syncing: false,
                    synced: true,
                    data: action.payload,
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenSyncTypes.SYNC_FAIL: {
            return Object.assign({}, state, {
                GemeindeDatenSyncDatasState: {
                    failed: true,
                    syncing: false,
                    synced: false,
                    data: action.payload
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenImportTypes.IMPORT: {
            return Object.assign({}, state, {
                GemeindeDatenImportDatasState: {
                    failed: false,
                    importing: true,
                    imported: false,
                    data: null,
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenImportTypes.IMPORT_SUCCESS: {
            return Object.assign({}, state, {
                GemeindeDatenImportDatasState: {
                    failed: false,
                    importing: false,
                    imported: true,
                    data: action.payload,
                }
            });
        }

        case GemeindeDatenActionTypes.GemeindeDatenImportTypes.IMPORT_FAIL: {
            return Object.assign({}, state, {
                GemeindeDatenImportDatasState: {
                    failed: true,
                    importing: false,
                    imported: false,
                    data: action.payload
                }
            });
        }

        case GemeindeDatenActionTypes.GemeideDatenResetTypes.RESET: {
            state = initialState;
            return state;
        }

        default:
            return state;
    }
}

export const getGemeindeDatenInit = {
    getDatas: (state: State) => state.GemeindeDatenInitDatasState.data,
    getLoading: (state: State) => state.GemeindeDatenInitDatasState.loading,
    getLoaded: (state: State) => state.GemeindeDatenInitDatasState.loaded,
    getFailed: (state: State) => state.GemeindeDatenInitDatasState.failed
};

export const getGemeindeDatenSyncData = {
    getDatas: (state: State) => state.GemeindeDatenSyncDatasState.data,
    getSyncing: (state: State) => state.GemeindeDatenSyncDatasState.syncing,
    getSynced: (state: State) => state.GemeindeDatenSyncDatasState.synced,
    getFailed: (state: State) => state.GemeindeDatenSyncDatasState.failed
};

export const getGemeindeDatenImportData = {
    getDatas: (state: State) => state.GemeindeDatenImportDatasState.data,
    getImporting: (state: State) => state.GemeindeDatenImportDatasState.importing,
    getImported: (state: State) => state.GemeindeDatenImportDatasState.imported,
    getFailed: (state: State) => state.GemeindeDatenImportDatasState.failed
};
