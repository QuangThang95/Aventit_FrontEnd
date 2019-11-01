import { AppEntityCustomState } from '@shared/AppAction';

import { ModelQueryLeitfaden } from '../../models';
import { CtlBfsDokumenteAction, CtlBfsDokumenteActionTypes } from '../actions/ctl-bfs-dokumente.action';

// Add state for get leitfaden data
interface LoadLeitfadenDataState extends AppEntityCustomState<any, ModelQueryLeitfaden> { }
export interface State {
    LoadLeitfadenDataState: LoadLeitfadenDataState;
}
export const initialState: State = {
    // Load data leitfaden
    LoadLeitfadenDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
};
export function reducer(state = initialState, action: CtlBfsDokumenteAction): State {
    if (!action) { return state; }
    switch (action.type) {
        case CtlBfsDokumenteActionTypes.CtlBfsDokumenteAction:
            return state;
        // Load data leitfaden
        case CtlBfsDokumenteActionTypes.CtlBfsDokumenteTypes.LOAD: {
            return Object.assign({}, state, {
                LoadLeitfadenDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case CtlBfsDokumenteActionTypes.CtlBfsDokumenteTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadLeitfadenDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case CtlBfsDokumenteActionTypes.CtlBfsDokumenteTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadLeitfadenDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case CtlBfsDokumenteActionTypes.CtlBfsDokumenteTypes.RESET_STATE: {
            state = initialState;
            return state;
        }
        default:
            return state;
    }
}
// Load Leitfaden
export const getLeitfadenInit = {
    getDatas: (state: State) => state.LoadLeitfadenDataState.data,
    getLoading: (state: State) => state.LoadLeitfadenDataState.loading,
    getLoaded: (state: State) => state.LoadLeitfadenDataState.loaded,
    getFailed: (state: State) => state.LoadLeitfadenDataState.failed
};
