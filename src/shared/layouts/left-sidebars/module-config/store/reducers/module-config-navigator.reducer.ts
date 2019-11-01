import { AppEntityCustomState } from '@shared/AppAction';

import { ModuleConfigNavigatorItem, ModuleConfigNavigatorItemsQuery } from '../../models';
import { ModuleConfigNavigatorActions, ModuleConfigNavigatorActionTypes } from '../actions/module-config-navigator.action';

interface ModuleConfigNavigatorItemsState extends AppEntityCustomState<ModuleConfigNavigatorItem[], ModuleConfigNavigatorItemsQuery> { }

export interface State {
    moduleConfigNavigatorItemsState: ModuleConfigNavigatorItemsState;
    initialParametersState: any;
    isEditModeState: any;
    isFormDirtyState: boolean;
    isChangeFormState: boolean;
    selectNodeState: any;
}

export const initialState: State = {
    moduleConfigNavigatorItemsState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: [],
    },
    initialParametersState: {
        moduleClassName: null,
        menuItemClassName: null,
        parentMenuItemID: null
    },
    isEditModeState: { attr: null },
    isFormDirtyState: null,
    isChangeFormState: null,
    selectNodeState: { attr: null }
};

export function reducer(state = initialState, action: ModuleConfigNavigatorActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case ModuleConfigNavigatorActionTypes.ModuleConfigNavigatorAction:
            return state;

        case ModuleConfigNavigatorActionTypes.ModuleConfigNavigatorItemsTypes.LOAD: {
            return Object.assign({}, state, {
                moduleConfigNavigatorItemsState: {
                    loading: true,
                    query: action.payload
                }
            });
        }

        case ModuleConfigNavigatorActionTypes.ModuleConfigNavigatorItemsTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                moduleConfigNavigatorItemsState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ModuleConfigNavigatorActionTypes.ModuleConfigNavigatorItemsTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                moduleConfigNavigatorItemsState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: []
                }
            });
        }

        case ModuleConfigNavigatorActionTypes.InitialParametersTypes.UPDATE_INITIAL_PARAMETERS: {
            return Object.assign({}, state, {
                initialParametersState: action.payload
            });
        }

        case ModuleConfigNavigatorActionTypes.EditModeStatusTypes.UPDATE_EDIT_MODE: {
            return {
                ...state,
                isEditModeState: { ...action.payload }
            };
        }

        case ModuleConfigNavigatorActionTypes.DirtyFormStatusTypes.UPDATE_DIRTY_FORM_STATUS: {
            return Object.assign({}, state, {
                isFormDirtyState: action.payload
            });
        }

        case ModuleConfigNavigatorActionTypes.ChangeFormTypes.CHANGE_FORM_TYPES: {
            return Object.assign({}, state, {
                isChangeFormState: action.payload
            });
        }

        case ModuleConfigNavigatorActionTypes.SelectNodeTypes.SELECT_NODE_TYPES: {
            return {
                ...state,
                selectNodeState: { ...action.payload }
            };
        }

        default:
            return state;
    }
}

export const getModuleConfigNavigatorItems = {
    getData: (state: State) => state.moduleConfigNavigatorItemsState.data,
    getLoading: (state: State) => state.moduleConfigNavigatorItemsState.loading,
    getLoaded: (state: State) => state.moduleConfigNavigatorItemsState.loaded,
    getFailed: (state: State) => state.moduleConfigNavigatorItemsState.failed
};

export const getInitialParameters = (state: State) => state.initialParametersState;

export const getEditModeStatus = (state: State) => state.isEditModeState;

export const getDirtyFormStatus = (state: State) => state.isFormDirtyState;

export const getChangeForm = (state: State) => state.isChangeFormState;

export const getSelectNode = (state: State) => state.selectNodeState;
