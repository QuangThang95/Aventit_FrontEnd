import { tryParseJSON } from '@shared/utilites/utilityHelpers';
import { AppActions, AppActionTypes } from '../actions/app.actions';
import { ProcessState } from '@shared/AppAction';

export interface State extends ProcessState {
  availableRoles: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  failed: false,
  availableRoles: tryParseJSON(localStorage.getItem('user.rights')) || null,
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {

    case AppActionTypes.AppAction:
      return state;

    case AppActionTypes.LOAD_API_ROLES: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case AppActionTypes.SET_AVAIBLE_ROLES: {
      const rightData = action.payload;
      const rights = {};
      rightData.forEach(right => rights[right.className] = right);
      localStorage.setItem('user.rights', JSON.stringify(rights));
      return Object.assign({}, state, {
        availableRoles: rights,
        loading: false,
        loaded: false,
        failed: false,
      });
    }

    case AppActionTypes.LOAD_API_ROLES_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: true,
        availableRoles: {}
      });
    }

    default:
      return state;
  }
}

export const getAvailableRoles = (state: State) => state.availableRoles;
export const getRolesLoading = (state: State) => state.loading;
export const getRolesLoaded = (state: State) => state.loaded;
export const getRolesFailed = (state: State) => state.failed;
