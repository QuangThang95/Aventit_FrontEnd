import { AppEntityCustomState } from '@shared/AppAction';

import { Kennzahlen, ModelKennzahlen } from '../../models';
import { KennzahlenAction, KennzahlenActionTypes } from '../actions/kennzahlen.action';

interface KennzahlenInitDatasState extends AppEntityCustomState<any, number> { }
interface KennzahlenInitSearchState extends AppEntityCustomState<ModelKennzahlen, number> { }

export interface State {
    InitDatasState: KennzahlenInitDatasState;
    InitSearchState: KennzahlenInitSearchState;
}

export const initialState: State = {
    InitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    InitSearchState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};


export function reducer(state = initialState, action: KennzahlenAction): State {
    if (!action) { return state; }
    switch (action.type) {
        case KennzahlenActionTypes.Action:
            return state;

        case KennzahlenActionTypes.Types.LOAD: {
            return Object.assign({}, state, {
                InitDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case KennzahlenActionTypes.Types.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                InitDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case KennzahlenActionTypes.Types.LOAD_FAIL: {
            return Object.assign({}, state, {
                InitDatasState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case KennzahlenActionTypes.InitSearchTypes.LOAD: {
            return Object.assign({}, state, {
                InitSearchState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case KennzahlenActionTypes.InitSearchTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                InitSearchState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case KennzahlenActionTypes.InitSearchTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                InitSearchState: {
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

export const getKennzahlenDatenInit = {
    getDatas: (state: State) => state.InitDatasState.data,
    getLoading: (state: State) => state.InitDatasState.loading,
    getLoaded: (state: State) => state.InitDatasState.loaded,
    getFailed: (state: State) => state.InitDatasState.failed,
    initSearch: (state: State) => state.InitSearchState.data,
    initloading: (state: State) => state.InitSearchState.loading,
    initloaded: (state: State) => state.InitSearchState.loaded,
    initFailed: (state: State) => state.InitSearchState.failed
};
