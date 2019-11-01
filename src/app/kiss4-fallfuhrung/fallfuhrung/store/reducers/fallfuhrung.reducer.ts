import { query } from '@angular/animations';
import { AppEntityCustomState } from '@shared/AppAction';

import {
    ModelFallRights,
    ModelGetConfig,
    ModelGetDataCombobox,
    ModelGetFaLeistung,
    ModelQueryGetConfig,
    ModelQueryUpdateFaleistung,
    ModelQueryValidationFaLeistung
} from '../../models';
import { FallfuhrungActions, FallfuhrungActionTypes } from '../actions/fallfuhrung.action';

// Add state for get fallfuhrung data
interface LoadFallfuhrungDataState extends AppEntityCustomState<any, number> { }

// Add state for get config data
interface LoadConfigDataState extends AppEntityCustomState<ModelGetConfig, ModelQueryGetConfig> { }

// Add state for get Fall Rights data
interface LoadFallRightsState extends AppEntityCustomState<ModelFallRights, number> { }

// Add state for get Kontaktveranl data
interface LoadKontaktveranlState extends AppEntityCustomState<any, string> { }

// Add state for get Grund data
interface LoadGrundState extends AppEntityCustomState<any, string> { }

// Add state for get Gemeinde data
interface LoadGemeindeState extends AppEntityCustomState<any, string> { }

// Add state update faLeistung
interface UpdateFaLeistungState extends AppEntityCustomState<ModelGetConfig, ModelQueryUpdateFaleistung> {
    updating: false;
    updated: false;
}

// Add state for get Anmeldeart data
interface LoadAnmeldeartState extends AppEntityCustomState<any, string> { }

// Add state for get AnzahlOffenePendenzen
interface LoadAnzahlOffenePendenzenState extends AppEntityCustomState<number, string> { }

// Add state for get ValidationFaLeistung
interface LoadValidationFaLeistungState extends AppEntityCustomState<ModelGetConfig, ModelQueryValidationFaLeistung> { }
export interface State {
    LoadFallfuhrungDataState: LoadFallfuhrungDataState;
    LoadConfigDataState: LoadConfigDataState;
    LoadFallRightsState: LoadFallRightsState;
    LoadKontaktveranlState: LoadKontaktveranlState;
    LoadGrundState: LoadGrundState;
    LoadGemeindeState: LoadGemeindeState;
    UpdateFaLeistungState: UpdateFaLeistungState;
    LoadAnmeldeartState: LoadAnmeldeartState;
    LoadAnzahlOffenePendenzenState: LoadAnzahlOffenePendenzenState;
    LoadValidationFaLeistungState: LoadValidationFaLeistungState;
}
export const initialState: State = {
    // Load data fallfuhrung
    LoadFallfuhrungDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data config
    LoadConfigDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data Fall Rights
    LoadFallRightsState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data Kontaktveranl
    LoadKontaktveranlState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data Grund
    LoadGrundState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data Gemeinde
    LoadGemeindeState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    //  Update FaLeistung
    UpdateFaLeistungState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        updating: false,
        updated: false,
    },

    // Load data Anmeldeart
    LoadAnmeldeartState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data AnzahlOffenePendenzen
    LoadAnzahlOffenePendenzenState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },

    // Load data ValidationFaLeistung
    LoadValidationFaLeistungState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};
export function reducer(state = initialState, action: FallfuhrungActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case FallfuhrungActionTypes.FallfuhrungAction:
            return state;
        // Load data fallfuhrung
        case FallfuhrungActionTypes.FallfuhrungTypes.LOAD: {
            return Object.assign({}, state, {
                LoadFallfuhrungDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.FallfuhrungTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadFallfuhrungDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.FallfuhrungTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadFallfuhrungDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case FallfuhrungActionTypes.FallfuhrungTypes.RESET_STATE: {
            state = initialState;
            return state;
        }

        // Load data config
        case FallfuhrungActionTypes.GetConfigTypes.LOAD: {
            return Object.assign({}, state, {
                LoadConfigDataState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetConfigTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadConfigDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetConfigTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadConfigDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        // Load Fall Rights
        case FallfuhrungActionTypes.GetFallRightsTypes.LOAD: {
            return Object.assign({}, state, {
                LoadFallRightsState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetFallRightsTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadFallRightsState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetFallRightsTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadFallRightsState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        // Load Kontaktveranl
        case FallfuhrungActionTypes.GetKontaktveranlTypes.LOAD: {
            return Object.assign({}, state, {
                LoadKontaktveranlState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetKontaktveranlTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadKontaktveranlState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetKontaktveranlTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadKontaktveranlState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        // Load Grund
        case FallfuhrungActionTypes.GetGrundTypes.LOAD: {
            return Object.assign({}, state, {
                LoadGrundState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetGrundTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadGrundState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetGrundTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadGrundState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        // Load Gemeinde
        case FallfuhrungActionTypes.GetGemeindeTypes.LOAD: {
            return Object.assign({}, state, {
                LoadGemeindeState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetGemeindeTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadGemeindeState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetGemeindeTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadGemeindeState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        //  Update FaLeistung
        case FallfuhrungActionTypes.UpdateFaLeistungTypes.Update_FaLeistung: {
            return Object.assign({}, state, {
                UpdateFaLeistungState: {
                    updating: true,
                    updated: false,
                    failed: false,
                    data: null,
                    query: action.payload
                }
            });
        }

        case FallfuhrungActionTypes.UpdateFaLeistungTypes.Update_FaLeistung_SUCCESS: {
            return Object.assign({}, state, {
                UpdateFaLeistungState: {
                    updating: false,
                    updated: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case FallfuhrungActionTypes.UpdateFaLeistungTypes.Update_FaLeistung_FAIL: {
            return Object.assign({}, state, {
                UpdateFaLeistungState: {
                    adding: false,
                    added: false,
                    failed: true,
                    data: action.payload
                }
            });
        }

        // Load Anmeldeart
        case FallfuhrungActionTypes.GetAnmeldeartTypes.LOAD: {
            return Object.assign({}, state, {
                LoadAnmeldeartState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetAnmeldeartTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadAnmeldeartState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetAnmeldeartTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadAnmeldeartState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        // Load AnzahlOffenePendenzen
        case FallfuhrungActionTypes.GetAnzahlOffenePendenzenTypes.LOAD: {
            return Object.assign({}, state, {
                LoadAnzahlOffenePendenzenState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetAnzahlOffenePendenzenTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadAnzahlOffenePendenzenState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetAnzahlOffenePendenzenTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadAnzahlOffenePendenzenState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                }
            });
        }

        // Load ValidationFaLeistung
        case FallfuhrungActionTypes.GetValidationFaLeistungTypes.LOAD: {
            return Object.assign({}, state, {
                LoadValidationFaLeistungState: {
                    loading: true,
                    query: action.payload
                }
            });
        }
        case FallfuhrungActionTypes.GetValidationFaLeistungTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                LoadValidationFaLeistungState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }
        case FallfuhrungActionTypes.GetValidationFaLeistungTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                LoadValidationFaLeistungState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }
        default:
            return state;
    }
}
// Load fallfuhrung
export const getFallfuhrungInit = {
    getDatas: (state: State) => state.LoadFallfuhrungDataState.data,
    getLoading: (state: State) => state.LoadFallfuhrungDataState.loading,
    getLoaded: (state: State) => state.LoadFallfuhrungDataState.loaded,
    getFailed: (state: State) => state.LoadFallfuhrungDataState.failed
};

// Load data config
export const getConfigData = {
    getDatas: (state: State) => state.LoadConfigDataState.data,
    getLoading: (state: State) => state.LoadConfigDataState.loading,
    getLoaded: (state: State) => state.LoadConfigDataState.loaded,
    getFailed: (state: State) => state.LoadConfigDataState.failed
};

// Load data Fall Right
export const getFallRightsData = {
    getDatas: (state: State) => state.LoadFallRightsState.data,
    getLoading: (state: State) => state.LoadFallRightsState.loading,
    getLoaded: (state: State) => state.LoadFallRightsState.loaded,
    getFailed: (state: State) => state.LoadFallRightsState.failed
};

// Load data Kontaktveranl
export const getKontaktveranlData = {
    getDatas: (state: State) => state.LoadKontaktveranlState.data,
    getLoading: (state: State) => state.LoadKontaktveranlState.loading,
    getLoaded: (state: State) => state.LoadKontaktveranlState.loaded,
    getFailed: (state: State) => state.LoadKontaktveranlState.failed
};

// Load data Grund
export const getGrundData = {
    getDatas: (state: State) => state.LoadGrundState.data,
    getLoading: (state: State) => state.LoadGrundState.loading,
    getLoaded: (state: State) => state.LoadGrundState.loaded,
    getFailed: (state: State) => state.LoadGrundState.failed
};

// Load data Gemeinde
export const getGemeindeData = {
    getDatas: (state: State) => state.LoadGemeindeState.data,
    getLoading: (state: State) => state.LoadGemeindeState.loading,
    getLoaded: (state: State) => state.LoadGemeindeState.loaded,
    getFailed: (state: State) => state.LoadGemeindeState.failed
};

// Update FaLeistung
export const updateFaLeistungData = {
    getDatas: (state: State) => state.UpdateFaLeistungState.data,
    getUpdating: (state: State) => state.UpdateFaLeistungState.updating,
    getUpdated: (state: State) => state.UpdateFaLeistungState.updated,
    getFailed: (state: State) => state.UpdateFaLeistungState.failed
};

// Load data Anmeldeart
export const getAnmeldeartData = {
    getDatas: (state: State) => state.LoadAnmeldeartState.data,
    getLoading: (state: State) => state.LoadAnmeldeartState.loading,
    getLoaded: (state: State) => state.LoadAnmeldeartState.loaded,
    getFailed: (state: State) => state.LoadAnmeldeartState.failed
};

// Load data AnzahlOffenePendenzen
export const getAnzahlOffenePendenzenData = {
    getDatas: (state: State) => state.LoadAnzahlOffenePendenzenState.data,
    getLoading: (state: State) => state.LoadAnzahlOffenePendenzenState.loading,
    getLoaded: (state: State) => state.LoadAnzahlOffenePendenzenState.loaded,
    getFailed: (state: State) => state.LoadAnzahlOffenePendenzenState.failed
};

// Load data ValidationFaLeistung
export const getValidationFaLeistungData = {
    getDatas: (state: State) => state.LoadValidationFaLeistungState.data,
    getLoading: (state: State) => state.LoadValidationFaLeistungState.loading,
    getLoaded: (state: State) => state.LoadValidationFaLeistungState.loaded,
    getFailed: (state: State) => state.LoadValidationFaLeistungState.failed
};
