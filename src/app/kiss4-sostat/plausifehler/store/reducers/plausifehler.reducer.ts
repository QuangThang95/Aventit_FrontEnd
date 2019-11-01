import { AppEntityCustomState } from '@shared/AppAction';

import { DataSearch, Mitarbeiter, Person, Plausifehler } from '../../models';
import { PlausifehlerAction, PlausifehlerActionTypes } from '../actions/plausifehler.action';

interface PlausifehlerInitDatasState extends AppEntityCustomState<Plausifehler[], number> { }
interface PlausifehlerSearchDataState extends AppEntityCustomState<DataSearch, number> { }
interface PlausifehlerPersonDataState extends AppEntityCustomState<Person[], number> { }
interface PlausifehlerMitarbeiterInDataState extends AppEntityCustomState<Mitarbeiter[], number> { }

export interface State {
    InitDatasState: PlausifehlerInitDatasState;
    SearchDataState: PlausifehlerSearchDataState;
    PersonDataState: PlausifehlerPersonDataState;
    MitarbeiterInDataState: PlausifehlerMitarbeiterInDataState;
}

export const initialState: State = {
    InitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    SearchDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    PersonDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    MitarbeiterInDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
};


export function reducer(state = initialState, action: PlausifehlerAction): State {
    if (!action) { return state; }
    switch (action.type) {
        case PlausifehlerActionTypes.Action:
            return state;

        case PlausifehlerActionTypes.Types.LOAD: {
            return Object.assign({}, state, {
                InitDatasState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case PlausifehlerActionTypes.Types.LOAD_SUCCESS: {
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

        case PlausifehlerActionTypes.Types.LOAD_FAIL: {
            return Object.assign({}, state, {
                InitDatasState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        case PlausifehlerActionTypes.Search.SEARCH: {
            return Object.assign({}, state, {
                SearchDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case PlausifehlerActionTypes.Search.SEARCH_SUCCESS: {
            return Object.assign({}, state, {
                SearchDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case PlausifehlerActionTypes.Search.SEARCH_FAIL: {
            return Object.assign({}, state, {
                SearchDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        case PlausifehlerActionTypes.Person.LOAD: {
            return Object.assign({}, state, {
                PersonDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case PlausifehlerActionTypes.Person.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                PersonDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case PlausifehlerActionTypes.Person.LOAD_FAIL: {
            return Object.assign({}, state, {
                PersonDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        case PlausifehlerActionTypes.MitarbeiterIn.LOAD: {
            return Object.assign({}, state, {
                MitarbeiterInDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case PlausifehlerActionTypes.MitarbeiterIn.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                MitarbeiterInDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case PlausifehlerActionTypes.MitarbeiterIn.LOAD_FAIL: {
            return Object.assign({}, state, {
                MitarbeiterInDataState: {
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

export const getPlausifehlerDatenInit = {
    getDatas: (state: State) => state.InitDatasState.data,
    getLoading: (state: State) => state.InitDatasState.loading,
    getLoaded: (state: State) => state.InitDatasState.loaded,
    getFailed: (state: State) => state.InitDatasState.failed
};

// Load data for top grid
export const getPlausifehlerSearchInit = {
    getDatas: (state: State) => state.SearchDataState.data,
    getLoading: (state: State) => state.SearchDataState.loading,
    getLoaded: (state: State) => state.SearchDataState.loaded,
    getFailed: (state: State) => state.SearchDataState.failed
};

// Load data for top grid
export const getPersonInit = {
    getDatas: (state: State) => state.PersonDataState.data,
    getLoading: (state: State) => state.PersonDataState.loading,
    getLoaded: (state: State) => state.PersonDataState.loaded,
    getFailed: (state: State) => state.PersonDataState.failed
};

// Load data for top grid
export const getMitarbeiterInInit = {
    getDatas: (state: State) => state.MitarbeiterInDataState.data,
    getLoading: (state: State) => state.MitarbeiterInDataState.loading,
    getLoaded: (state: State) => state.MitarbeiterInDataState.loaded,
    getFailed: (state: State) => state.MitarbeiterInDataState.failed
};
