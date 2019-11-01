import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { UserForm, UserRight, MultipleXUsers, Version, LinkiBan } from '@app/auth/models';

import { User } from '@shared/models';
import { ProcessState } from '@shared/AppAction';
import { AppEntityCustomState } from '@shared/AppAction';

interface UserLogin extends AppEntityCustomState<UserForm, string> { }

export interface State {
  user: User;
  userLogin: UserLogin;
  userRight: any;
  multiplexusers: any;
  version: Version;
  linkiBan: LinkiBan;
}

export const initialState: State = {
  user: new User(),
  userLogin: {
    loading: false,
    loaded: false,
    failed: false,
    data: null
  },
  userRight: [],
  multiplexusers: [],
  version: undefined,
  linkiBan: undefined,
}

export function reducer(state = initialState, action: AuthActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case AuthActionTypes.AUTH_ACTION:
      return state;

    case AuthActionTypes.LOAD_USER: {

      return Object.assign({}, state, {
        userLogin: {
          loading: true,
          loaded: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case AuthActionTypes.LOAD_USER_SUCCESS: {
      return Object.assign({}, state, {
        userLogin: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case AuthActionTypes.LOAD_USER_FAIL: {
      return Object.assign({}, state, {
        user: new User(),
        userLogin: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload
        }
      });
    }

    case AuthActionTypes.LOAD_VERSION: {
      return Object.assign({}, state, {
        version: {
          loading: true,
          loaded: false,
          failed: false,
        }
      });
    }

    case AuthActionTypes.LOAD_VERSION_SUCCESS: {
      return Object.assign({}, state, {
        version: {
          user: new User(),
          loading: false,
          loaded: true,
          failed: false,
        }

      });
    }

    case AuthActionTypes.LOAD_VERSION_FAIL: {
      return Object.assign({}, state, {
        version: {
          user: new User(),
          failed: true,
          loading: false,
          loaded: true
        }
      });
    }
    // Get LinkIBan
    case AuthActionTypes.LOAD_LINKIBAN: {
      return Object.assign({}, state, {
        linkiBan: {
          loading: true,
          loaded: false,
          failed: false,
        }
      });
    }

    case AuthActionTypes.LOAD_LINKIBAN_SUCCESS: {
      return Object.assign({}, state, {
        linkiBan: {
          user: new User(),
          loading: false,
          loaded: true,
          failed: false
        }

      });
    }

    case AuthActionTypes.LOAD_LINKIBAN_FAIL: {
      return Object.assign({}, state, {
        linkiBan: {
          user: new User(),
          failed: true,
          loading: false,
          loaded: true
        }
      });
    }

    case AuthActionTypes.LOAD_GETMULTIPLEXUSERS: {
      return Object.assign({}, state, {
        multiplexusers: {
          multipleXUsers: [],
          loading: true,
          loaded: false,
          failed: false,
        }
      });
    }

    case AuthActionTypes.LOAD_GETMULTIPLEXUSERS_SUCCESS: {
        return Object.assign({}, state, {
          multiplexusers: {
            multipleXUsers: [...action.payload],
            loading: false,
            loaded: true,
            failed: false
          }
        });
      
    }

    case AuthActionTypes.LOAD_GETMULTIPLEXUSERS_FAIL: {
      return Object.assign({}, state, {
        multiplexusers: {
          multipleXUsers: [],
          failed: true,
          loading: false,
          loaded: true
        }
      });
    }

    case AuthActionTypes.LOAD_GETUSERRIGHT: {
      return Object.assign({}, state, {
        userRight: {
          userXRight: [],
          loading: true,
          loaded: false,
          failed: false,
        }
      });
    }

    case AuthActionTypes.LOAD_GETUSERRIGHT_SUCCESS: {
      return Object.assign({}, state, {
        userRight: {
          userXRight: [...action.payload],
          loading: false,
          loaded: true,
          failed: false
        }
      });
    }

    case AuthActionTypes.LOAD_GETUSERRIGHT_FAIL: {
      return Object.assign({}, state, {
        userRight: {
          userXRight: [],
          failed: true,
          loading: false,
          loaded: true
        }
      });
    }


    case AuthActionTypes.DO_LOGIN: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }

    case AuthActionTypes.DO_LOGOUT: {
      return state;
    }

    case AuthActionTypes.DO_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user: new User(),
        loading: false,
        loaded: true,
        failed: false
      });
    }

    case AuthActionTypes.DO_LOGIN_FAIL: {
      return Object.assign({}, state, {
        user: new User(),
        failed: true,
        loading: false,
        loaded: true
      });
    }

    case AuthActionTypes.DO_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        user: action.payload
      });
    }

    case AuthActionTypes.DO_LOGIN_FAIL: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: true
      });
    }

    case AuthActionTypes.ADD_USER: {
      return Object.assign({}, state, { user: action.payload });
    }

    case AuthActionTypes.REMOVE_USER: {
      return Object.assign({}, state, { user: action.payload });
    }

    default:
      return state;
  }
}

export const selectLoggedUser = (state: State) => state.user;
export const getLoading = (state: State) => state.userLogin.loading;
export const getLoaded = (state: State) => state.userLogin.loaded;
export const getFailed = (state: State) => state.userLogin.failed;
export const getVersion = (state: State) => state.userLogin.loading;

export const getXUsers = (state: State) => state.userLogin.data;
export const getUserRight = (state: State) => state.userRight.userXRight;
export const getMultipleXUsers = (state: State) => state.multiplexusers.multipleXUsers;

export const getLinkIBan = {
  getDatas: (state: State) => state.userLogin.data,
  getLoading: (state: State) => state.userLogin.loading,
  getLoaded: (state: State) => state.userLogin.loaded,
  getFailed: (state: State) => state.userLogin.failed
}
