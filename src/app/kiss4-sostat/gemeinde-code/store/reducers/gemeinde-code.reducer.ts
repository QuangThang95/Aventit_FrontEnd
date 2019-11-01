import { AppEntityCustomState } from '@shared/AppAction';

import { GemeindeCode } from '../../models';
import { GemeindeCodeActions, GemeindeCodeActionTypes } from '../actions/gemeinde-code.action';

interface GemeindeCodeInitDatasState extends AppEntityCustomState<GemeindeCode[], number> { }

export interface State {
    GemeindeCodeInitDatasState: GemeindeCodeInitDatasState;
}

export const initialState: State = {
    GemeindeCodeInitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};


export function reducer(state = initialState, action: GemeindeCodeActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case GemeindeCodeActionTypes.GemeindeCodeAction:
            return state;

        case GemeindeCodeActionTypes.GemeindeCodeTypes.LOAD: {
            return Object.assign({}, state, {
                GemeindeCodeInitDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case GemeindeCodeActionTypes.GemeindeCodeTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                GemeindeCodeInitDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case GemeindeCodeActionTypes.GemeindeCodeTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                GemeindeCodeInitDatasState: {
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

export const getGemeindeCodeInit = {
    getDatas: (state: State) => state.GemeindeCodeInitDatasState.data,
    getLoading: (state: State) => state.GemeindeCodeInitDatasState.loading,
    getLoaded: (state: State) => state.GemeindeCodeInitDatasState.loaded,
    getFailed: (state: State) => state.GemeindeCodeInitDatasState.failed
};
