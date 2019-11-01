import { mergeArrayObject } from '@shared/utilites/utilityHelpers';
import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';
import { MenuModel, SearchBoxModel } from '@shared/models';
import { ProcessState } from '@shared/AppAction';

interface LoadSearchBoxState extends ProcessState {
  datas: Pick<SearchBoxModel, any>[];
}

export interface State {
  error: any;
  menu?: MenuModel;
  datas: MenuModel[];
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  loadSearchBoxState: LoadSearchBoxState;
}

export const initialState: State = {
  error: null,
  loading: false,
  loaded: false,
  failed: false,
  menu: null,
  datas: [],
  loadSearchBoxState: {
    loading: false,
    loaded: false,
    failed: false,
    datas: []
  }
};

export function reducer(state = initialState, action: LayoutActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case LayoutActionTypes.LayoutAction:
      return state;

    /**
     * load Menu reducer
     */
    case LayoutActionTypes.LoadMenu.LOAD: {
     return {
      ...state,
      loading: true
     };
    }

    case LayoutActionTypes.LoadMenu.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        datas: action.payload
      });
    }

    case LayoutActionTypes.LoadMenu.LOAD_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        failed: true,
        datas: []
      };
    }

    /**
     * ************************************************************
     */
    /**
     * load Search box reducer
     */
    case LayoutActionTypes.LoadSearchBox.LOAD: {
      return Object.assign({}, state, {
        loadSearchBoxState: {
          loading: true
        }
      });
    }

    case LayoutActionTypes.LoadSearchBox.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loadSearchBoxState: {
          loaded: true,
          loading: false,
          failed: false,
          datas: action.payload
        }
      });
    }

    case LayoutActionTypes.LoadSearchBox.LOAD_FAIL: {
      return Object.assign({}, state, {
        loadSearchBoxState: {
          loaded: false,
          loading: false,
          failed: true,
          datas: []
        }
      });
    }

    default:
      return state;
  }
}
/**
 * *************************************************************************************
 */
export const selectMenuDatas = (state: State) => state.datas;
export const selectMenuLoading = (state: State) => state.loading;
export const selectMenuLoaded = (state: State) => state.loaded;
export const selectMenuLoadFail = (state: State) => state.failed;
/**
 * *************************************************************************************
 */
export const selectSearchBoxDatas = (state: State) => state.loadSearchBoxState.datas;
export const selectSearchBoxLoading = (state: State) => state.loadSearchBoxState.loading;
export const selectSearchBoxLoaded = (state: State) => state.loadSearchBoxState.loaded;
export const selectSearchBoxLoadFail = (state: State) => state.loadSearchBoxState.failed;
