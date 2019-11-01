import { ProcessState } from '@shared/AppAction';

import { FallNavFilterModel } from '../../models';
import { FallNavsActions, FallNavsActionTypes, FiltersAction } from '../actions/fall-navigator.actions';


export interface State extends ProcessState {
  trees: any;
  filters: FallNavFilterModel;
  config: any;
  headers: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  failed: false,
  trees: [],
  filters: new FallNavFilterModel(),
  config: null,
  headers: []
};

export function reducer(state = initialState, action: FallNavsActions | FiltersAction): State {
  if (!action) { return state; }
  switch (action.type) {

    case FallNavsActionTypes.FallNavsAction:
      return state;

    /**
     * Load FallNavs Action
     * ****************************************************************
     */
    case FallNavsActionTypes.LoadFallNavsTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        filters: action.payload,
      });
    }

    case FallNavsActionTypes.LoadFallNavsTypes.LOAD_SUCCESS: {
      const datas = Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        trees: action.payload,
      });
      return datas;
    }

    case FallNavsActionTypes.LoadFallNavsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: true,
        trees: action.payload,
      });
    }

    /**
     * Filters Actions
     * ****************************************************************
     */
    case FallNavsActionTypes.FiltersTypes.ACTIVE: {
      return Object.assign({}, state, {
        filters: action.payload
      });
    }

    case FallNavsActionTypes.FiltersTypes.ARCHIVED: {
      return Object.assign({}, state, {
        filters: action.payload
      });
    }

    case FallNavsActionTypes.FiltersTypes.CLOSED: {
      return Object.assign({}, state, {
        filters: action.payload
      });
    }

    case FallNavsActionTypes.FiltersTypes.INCLUDE_GROUP: {
      return Object.assign({}, state, {
        filters: action.payload
      });
    }

    case FallNavsActionTypes.FiltersTypes.INCLUDE_GUEST: {
      return Object.assign({}, state, {
        filters: action.payload
      });
    }

    case FallNavsActionTypes.FiltersTypes.INCLUDE_TASKS: {
      return Object.assign({}, state, {
        filters: action.payload
      });
    }

    /**
     * Config Actions
     * ****************************************************************
     */

    case FallNavsActionTypes.ConfigBoolTypes.GET: {
      return Object.assign({}, state, {
        config: false
      });
    }
    case FallNavsActionTypes.ConfigBoolTypes.GET_SUCCESS: {
      return Object.assign({}, state, {
        config: action.payload
      });
    }
    case FallNavsActionTypes.ConfigBoolTypes.GET_FAIL: {
      return Object.assign({}, state, {
        config: action.payload
      });
    }
    /**
     * Header Actions
     * ****************************************************************
     */
    case FallNavsActionTypes.HeaderTypes.GET: {
      return Object.assign({}, state, {
        headers: action.payload
      });
    }
    case FallNavsActionTypes.HeaderTypes.GET_SUCCESS: {
      return Object.assign({}, state, {
        headers: action.payload
      });
    }
    case FallNavsActionTypes.HeaderTypes.GET_FAIL: {
      return Object.assign({}, state, {
        headers: action.payload
      });
    }

    default:
      return state;
  }
}

export const selectFallNavsTrees = (state: State) => state.trees;
export const getFallNavsLoading = (state: State) => state.loading;
export const getFallNavsLoaded = (state: State) => state.loaded;
export const getFallNavsFailed = (state: State) => state.failed;
export const getFilters = (state: State) => state.filters;
export const getConfigs = (state: State) => state.config;
export const getHeaders = (state: State) => state.headers;
