import { InkassofallActions, InkassofallActionTypes } from '@app/kiss4-inkasso/inkassofall/store/actions/inkassofall.action';
import { AppEntityCustomState } from '@shared/AppAction';

interface InkassofallState extends AppEntityCustomState<any[], any> {
}

interface InkassofallListState extends AppEntityCustomState<any[], any> {
}

interface InkassofallAddNewDatasState extends AppEntityCustomState<any> {
    adding: false;
    added: false;
}

interface InkassofallUpdateDatasState extends AppEntityCustomState<any, any> {
    updating: false;
    updated: false;
}

interface InkassofallDeleteDatasState extends AppEntityCustomState<any> {
    deleting: false;
    deleted: false;
}

interface InkassofallSaveFormState extends AppEntityCustomState<any> {
}

interface DsInkassofallsDetailState extends AppEntityCustomState<any> {
}

export interface State {
    InkassofallStateInitDatasState: InkassofallState;
    InkassofallListState: InkassofallListState;
    InkassofallAddNewDatasState: InkassofallAddNewDatasState;
    InkassofallUpdateDatasState: InkassofallUpdateDatasState;
    InkassofallDeleteDatasState: InkassofallDeleteDatasState;
    InkassofallSaveFormState: InkassofallSaveFormState;
    DsInkassofallsDetailState: DsInkassofallsDetailState;
}

export const initialState: State = {
    InkassofallStateInitDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    InkassofallListState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    InkassofallAddNewDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        adding: false,
        added: false,
        data: null
    },
    InkassofallUpdateDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        updating: false,
        updated: false,
        data: null
    },
    InkassofallDeleteDatasState: {
        loading: false,
        loaded: false,
        failed: false,
        deleting: false,
        deleted: false,
        data: null
    },
    InkassofallSaveFormState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null
    },
    DsInkassofallsDetailState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null
    }
};

export function reducer(state = initialState, action: InkassofallActions): State {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case InkassofallActionTypes.InkassofallAction:
            return state;

        case InkassofallActionTypes.InkassofallListTypes.LOAD: {
            return Object.assign({}, state, {
                InkassofallListState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case InkassofallActionTypes.InkassofallListTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                InkassofallListState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case InkassofallActionTypes.InkassofallListTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                InkassofallListState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: []
                }
            });
        }
        // Add new
        case InkassofallActionTypes.InkassofallAddTypes.ADD: {
            return Object.assign({}, state, {
                InkassofallAddNewDatasState: {
                    adding: true,
                    added: false,
                    failed: false,
                    data: null
                }
            });
        }

        case InkassofallActionTypes.InkassofallAddTypes.ADD_SUCCESS: {
            return Object.assign({}, state, {
                InkassofallAddNewDatasState: {
                    adding: false,
                    added: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case InkassofallActionTypes.InkassofallAddTypes.ADD_FAIL: {
            return Object.assign({}, state, {
                InkassofallAddNewDatasState: {
                    adding: false,
                    added: false,
                    failed: true,
                    data: null
                }
            });
        }
        // Update a row in top grid
        case InkassofallActionTypes.InkassofallUpdateTypes.UPDATE_INKASSOFALL: {
            return Object.assign({}, state, {
                InkassofallUpdateDatasState: {
                    updating: true,
                    updated: false,
                    failed: false,
                    data: null
                }
            });
        }

        case InkassofallActionTypes.InkassofallUpdateTypes.UPDATE_INKASSOFALL_SUCCESS: {
            return Object.assign({}, state, {
                InkassofallUpdateDatasState: {
                    updating: false,
                    updated: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case InkassofallActionTypes.InkassofallUpdateTypes.UPDATE_INKASSOFALL_FAIL: {
            return Object.assign({}, state, {
                InkassofallUpdateDatasState: {
                    updating: false,
                    updated: false,
                    failed: true,
                    data: action.payload
                }
            });
        }
        // Delete
        case InkassofallActionTypes.InkassofallDeleteTypes.DELETE: {
            return Object.assign({}, state, {
                InkassofallDeleteDatasState: {
                    failed: false,
                    deleting: true,
                    deleted: false,
                    data: null,
                }
            });
        }

        case InkassofallActionTypes.InkassofallDeleteTypes.DELETE_SUCCESS: {
            return Object.assign({}, state, {
                InkassofallDeleteDatasState: {
                    failed: false,
                    deleting: false,
                    deleted: true,
                    data: action.payload,
                }
            });
        }

        case InkassofallActionTypes.InkassofallDeleteTypes.DELETE_FAIL: {
            return Object.assign({}, state, {
                InkassofallDeleteDatasState: {
                    failed: true,
                    deleting: false,
                    deleted: false,
                    data: action.payload
                }
            });
        }
        case InkassofallActionTypes.SaveFormStateTypes.SAVE_FORM_STATE_TYPES: {
            return Object.assign({}, state, {
                InkassofallSaveFormState: {
                    failed: true,
                    deleting: false,
                    deleted: false,
                    data: action.payload,
                }
            });
        }
        case InkassofallActionTypes.InkassofallDetailTypes.DETAIL_INKASSOFALL: {
            return Object.assign({}, state, {
                DsInkassofallsDetailState: {
                    failed: true,
                    deleting: false,
                    deleted: false,
                    data: action.payload,
                }
            });
        }

        default:
            return state;
    }
}

export const getInkassofall_StateInit = {
    getDatas: (state: State) => state.InkassofallStateInitDatasState.data,
    getLoading: (state: State) => state.InkassofallStateInitDatasState.loading,
    getLoaded: (state: State) => state.InkassofallStateInitDatasState.loaded,
    getFailed: (state: State) => state.InkassofallStateInitDatasState.failed
};

export const getInkassofalllist_StateInit = {
    getDatas: (state: State) => state.InkassofallListState.data,
    getLoading: (state: State) => state.InkassofallListState.loading,
    getLoaded: (state: State) => state.InkassofallListState.loaded,
    getFailed: (state: State) => state.InkassofallListState.failed
};
export const getAddInkassofall = {
    getDatas: (state: State) => state.InkassofallAddNewDatasState.data,
    getAdding: (state: State) => state.InkassofallAddNewDatasState.adding,
    getAdded: (state: State) => state.InkassofallAddNewDatasState.added,
    getFailed: (state: State) => state.InkassofallAddNewDatasState.failed
};
export const getUpdateInkassofall = {
    getDatas: (state: State) => state.InkassofallUpdateDatasState.data,
    getUpdating: (state: State) => state.InkassofallUpdateDatasState.updating,
    getUpdated: (state: State) => state.InkassofallUpdateDatasState.updated,
    getFailed: (state: State) => state.InkassofallUpdateDatasState.failed,
    getUpdateDatasStateInkassofall: (state: State) => state.InkassofallUpdateDatasState
};
export const getDeleteInkassofall = {
    getDatas: (state: State) => state.InkassofallDeleteDatasState.data,
    getDeleting: (state: State) => state.InkassofallDeleteDatasState.deleting,
    getDeleted: (state: State) => state.InkassofallDeleteDatasState.deleted,
    getFailed: (state: State) => state.InkassofallDeleteDatasState.failed,
    getDeleteStateInkassofall: (state: State) => state.InkassofallDeleteDatasState
};
export const getStateFormInkassofall = {
    getDatas: (state: State) => state.InkassofallSaveFormState.data,
};
export const getObjectDetailInkassofall = {
    getDatas: (state: State) => state.DsInkassofallsDetailState.data,
};
