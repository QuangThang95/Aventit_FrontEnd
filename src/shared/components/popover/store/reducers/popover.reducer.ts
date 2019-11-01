import { AppEntityCustomState } from '@shared/AppAction';

import { Button } from '../../models';
import { PopOverActions, PopOverActionTypes } from '../actions/popover.action';

interface PopOverInitDatasState extends AppEntityCustomState<Button[], number> { }

export interface State { PopOverInitDatasState: PopOverInitDatasState; }

export const initialState: State = {
    PopOverInitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};

export function reducer(state = initialState, action: PopOverActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case PopOverActionTypes.PopOverTypesAction:
            return state;
        case PopOverActionTypes.PopOverTypesTypes.LOAD: {
            return Object.assign({}, state, {
                PopOverInitDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case PopOverActionTypes.PopOverTypesTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                PopOverInitDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case PopOverActionTypes.PopOverTypesTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                PopOverInitDatasState: {
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

export const getPopOverInit = {
    getDatas: (state: State) => state.PopOverInitDatasState.data,
    getLoading: (state: State) => state.PopOverInitDatasState.loading,
    getLoaded: (state: State) => state.PopOverInitDatasState.loaded,
    getFailed: (state: State) => state.PopOverInitDatasState.failed
};
