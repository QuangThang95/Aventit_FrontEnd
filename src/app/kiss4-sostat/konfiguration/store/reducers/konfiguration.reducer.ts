import { AppEntityCustomState } from '@shared/AppAction';

import { KonfigurationActions, KonfigurationActionTypes } from '../actions/konfiguration.action';

interface KonfigurationInitDatasState extends AppEntityCustomState<any, any> { }
interface KonfigurationGridDatasState extends AppEntityCustomState<any[], any> { }

export interface State {
    konfigurationInitDatasState: KonfigurationInitDatasState;
    konfigurationGridDatasState: KonfigurationGridDatasState;
}

export const initialState: State = {
    // Load data for detail
    konfigurationInitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data for grid
    konfigurationGridDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};

export function reducer(state = initialState, action: KonfigurationActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case KonfigurationActionTypes.KonfigurationAction: {
            return state;
        }
        // Load data for detail
        case KonfigurationActionTypes.KonfigurationTypes.LOAD: {
            return Object.assign({}, state, {
                konfigurationInitDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case KonfigurationActionTypes.KonfigurationTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                konfigurationInitDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case KonfigurationActionTypes.KonfigurationTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                konfigurationInitDatasState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        // Load data for grid
        case KonfigurationActionTypes.KonfigurationTypesForGrid.LOAD: {
            return Object.assign({}, state, {
                konfigurationGridDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case KonfigurationActionTypes.KonfigurationTypesForGrid.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                konfigurationGridDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case KonfigurationActionTypes.KonfigurationTypesForGrid.LOAD_FAIL: {
            return Object.assign({}, state, {
                konfigurationGridDatasState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        default:
            return state;
    }
}

// Load data for detail
export const getKonfigurationInit = {
    getDatas: (state: State) => state.konfigurationInitDatasState.data,
    getLoading: (state: State) => state.konfigurationInitDatasState.loading,
    getLoaded: (state: State) => state.konfigurationInitDatasState.loaded,
    getFailed: (state: State) => state.konfigurationInitDatasState.failed
};

// Load data for grid
export const getKonfigurationGrid = {
    getDatas: (state: State) => state.konfigurationGridDatasState.data,
    getLoading: (state: State) => state.konfigurationGridDatasState.loading,
    getLoaded: (state: State) => state.konfigurationGridDatasState.loaded,
    getFailed: (state: State) => state.konfigurationGridDatasState.failed
};
