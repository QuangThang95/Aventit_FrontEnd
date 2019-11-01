import { AppEntityCustomState } from '@shared/AppAction';

import { Mitarbeiter, Person } from '../../models';
import { VariablenActions, VariablenActionTypes } from '../actions/bfs-variablen.action';

interface VariablenInitDataState extends AppEntityCustomState<any, number> { }
interface PersonInitDataState extends AppEntityCustomState<Person[], number> { }
interface MitarbeiterInitDataState extends AppEntityCustomState<Mitarbeiter[], number> { }
interface SearchInitDataState extends AppEntityCustomState<any, number> { }

export interface State {
    VariablenInitDataState: VariablenInitDataState;
    PersonInitDataState: PersonInitDataState;
    MitarbeiterInitDataState: MitarbeiterInitDataState;
    SearchInitDataState: SearchInitDataState;
}

export const initialState: State = {
    VariablenInitDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    PersonInitDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    MitarbeiterInitDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    SearchInitDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};


export function reducer(state = initialState, action: VariablenActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case VariablenActionTypes.VariablenAction:
            return state;
        case VariablenActionTypes.VariablenTypes.LOAD: {
            return Object.assign({}, state, {
                VariablenInitDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case VariablenActionTypes.VariablenTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                VariablenInitDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case VariablenActionTypes.VariablenTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                VariablenInitDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }
        // Person
        case VariablenActionTypes.PersonTypes.LOAD: {
            return Object.assign({}, state, {
                PersonInitDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case VariablenActionTypes.PersonTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                PersonInitDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case VariablenActionTypes.PersonTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                PersonInitDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }
        // Mitarbeiter
        case VariablenActionTypes.MitarbeiterTypes.LOAD: {
            return Object.assign({}, state, {
                MitarbeiterInitDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case VariablenActionTypes.MitarbeiterTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                MitarbeiterInitDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case VariablenActionTypes.MitarbeiterTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                MitarbeiterInitDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }
        // search init data
        case VariablenActionTypes.SearchInitialData.LOAD: {
            return Object.assign({}, state, {
                SearchInitDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case VariablenActionTypes.SearchInitialData.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                SearchInitDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case VariablenActionTypes.SearchInitialData.LOAD_FAIL: {
            return Object.assign({}, state, {
                SearchInitDataState: {
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

export const getVariablenInit = {
    getDatas: (state: State) => state.VariablenInitDataState.data,
    getLoading: (state: State) => state.VariablenInitDataState.loading,
    getLoaded: (state: State) => state.VariablenInitDataState.loaded,
    getFailed: (state: State) => state.VariablenInitDataState.failed
};
export const getPersonInit = {
    getDatas: (state: State) => state.PersonInitDataState.data,
    getLoading: (state: State) => state.PersonInitDataState.loading,
    getLoaded: (state: State) => state.PersonInitDataState.loaded,
    getFailed: (state: State) => state.PersonInitDataState.failed
};
export const getMitarbeiterInit = {
    getDatas: (state: State) => state.MitarbeiterInitDataState.data,
    getLoading: (state: State) => state.MitarbeiterInitDataState.loading,
    getLoaded: (state: State) => state.MitarbeiterInitDataState.loaded,
    getFailed: (state: State) => state.MitarbeiterInitDataState.failed
};
export const getSearchInit = {
    getDatas: (state: State) => state.SearchInitDataState.data,
    getLoading: (state: State) => state.SearchInitDataState.loading,
    getLoaded: (state: State) => state.SearchInitDataState.loaded,
    getFailed: (state: State) => state.SearchInitDataState.failed
};

