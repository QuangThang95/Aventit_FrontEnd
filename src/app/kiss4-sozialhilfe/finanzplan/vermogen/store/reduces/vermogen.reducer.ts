import { AppEntityCustomState } from '@shared/AppAction';
import { DPLSelectboxModel } from '../../models';
import { VermogenActions, VermogenActionTypes } from '../actions/vermogen.action';


interface LoadDatasourceSelectboxDatasState extends AppEntityCustomState<DPLSelectboxModel[], number> { }

export interface State {
    LoadDatasourceSelectboxDatasState: LoadDatasourceSelectboxDatasState;
}

export const initialState: State = {

    LoadDatasourceSelectboxDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }

};

export function reducer(state = initialState, action: VermogenActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case VermogenActionTypes.VermogenAction:
            return state;

        case VermogenActionTypes.PersonSelectboxDataTypes.LOAD: {
            return Object.assign({}, state, {
                LoadDatasourceSelectboxDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case VermogenActionTypes.PersonSelectboxDataTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadDatasourceSelectboxDatasState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.PersonSelectboxDataTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadDatasourceSelectboxDatasState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: []
                }
            });
        }

        default:
            return state;
    }
}

export const getPersonSelectboxData = {
    getDatas: (state: State) => state.LoadDatasourceSelectboxDatasState.data,
    getLoading: (state: State) => state.LoadDatasourceSelectboxDatasState.loading,
    getLoaded: (state: State) => state.LoadDatasourceSelectboxDatasState.loaded,
    getFailed: (state: State) => state.LoadDatasourceSelectboxDatasState.failed
};
