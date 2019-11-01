import { AppStateAction } from '../../AppAction';
import { type } from '@shared/utilites/utilityHelpers';
import { LoginForm } from '@shared/models';

export const AuthActionTypes = {
  AUTH_ACTION: type('[Auth] Action'),
  DO_LOGIN: type('[Auth] Do Login'),
  DO_LOGIN_SUCCESS: type('[Auth] Do Login Success'),
  DO_LOGIN_FAIL: type('[Auth] Do Login Fail'),
  DO_LOGOUT: type('[Auth] Do Logout'),
  DO_LOGOUT_SUCCESS: type('[Auth] Do Logout Success'),
  DO_LOGOUT_FAIL: type('[Auth] Do Logout Fail'),
  ADD_USER: type('[Auth] Add user'),
  REMOVE_USER: type('[Auth] Remove user'),

  //Load User, Version, Multiplexusers, UserRigth, LinkIBan
  LOAD_USER: type('[Auth] Load User'),
  LOAD_USER_SUCCESS: type('[Auth] Load User Success'),
  LOAD_USER_FAIL: type('[Auth] Load User Fail'),

  LOAD_VERSION: type('[Auth] Load Version'),
  LOAD_VERSION_SUCCESS: type('[Auth] Load Version Success'),
  LOAD_VERSION_FAIL: type('[Auth] Load Version Fail'),

  LOAD_GETMULTIPLEXUSERS: type('[Auth] Load GetMultipleXUsers'),
  LOAD_GETMULTIPLEXUSERS_SUCCESS: type('[Auth] Load GetMultipleXUsers Success'),
  LOAD_GETMULTIPLEXUSERS_FAIL: type('[Auth] Load GetMultipleXUsers Fail'),

  LOAD_GETUSERRIGHT: type('[Auth] Load GetUserRight'),
  LOAD_GETUSERRIGHT_SUCCESS: type('[Auth] Load GetUserRight Success'),
  LOAD_GETUSERRIGHT_FAIL: type('[Auth] Load GetUserRight Fail'),

  LOAD_LINKIBAN: type('[Auth] Load LinkIBan'),
  LOAD_LINKIBAN_SUCCESS: type('[Auth] Load LinkIBan Success'),
  LOAD_LINKIBAN_FAIL: type('[Auth] Load LinkIBan Fail'),
};
// Auth Load User
export class AuthLoadUser implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_USER;
  constructor(public payload?: any) {
   }
}

export class AuthLoadUserSuccess implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload?: any) { 
  }
}

export class AuthLoadUserFail implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_USER_FAIL;
  constructor(public payload?: any) { 
  }
}

// Auth Load LinkIBan
export class AuthLoadLinkIBan implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_LINKIBAN;
  constructor(public payload?: any) {
   }
   
}

export class AuthLoadLinkIBanSuccess implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_LINKIBAN_SUCCESS;
  constructor(public payload?: any) {
   }
}

export class AuthLoadLinkIBanFail implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_LINKIBAN_FAIL;
  constructor(public payload?: any) {
   }
}


// Auth Load Version
export class AuthLoadVersion implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_VERSION;
  constructor(public payload?: any) {
   }
   
}

export class AuthLoadVersionSuccess implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_VERSION_SUCCESS;
  constructor(public payload?: any) {
   }
}

export class AuthLoadVersionFail implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_VERSION_FAIL;
  constructor(public payload?: any) {
   }
}

// Load MultipleXUsers
export class LoadGetMultipleXUsers implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_GETMULTIPLEXUSERS;
  constructor(public payload?: any) { 
  }
}

export class LoadGetMultipleXUsersSuccess implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_GETMULTIPLEXUSERS_SUCCESS;
  constructor(public payload?: any) {

   }
}

export class LoadGetMultipleXUsersFail implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_GETMULTIPLEXUSERS_FAIL;
  constructor(public payload?: any) {
   }
}


//LoadGet User Right
export class LoadGetUserRight implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_GETUSERRIGHT;
  constructor(public payload?: any) {

   }
}

export class LoadGetUserRightSuccess implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_GETUSERRIGHT_SUCCESS;
  constructor(public payload?: any) {

   }
}

export class LoadGetUserRightFail implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_GETUSERRIGHT_FAIL;
  constructor(public payload?: any) { 

  }
}

export class AuthAction implements AppStateAction {
  readonly type = AuthActionTypes.AUTH_ACTION;
  constructor(public payload?: any) { }
}

export class DoLoginAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGIN;
  constructor(public payload?: LoginForm) { }
}

export class DoLoginSuccessAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGIN_SUCCESS;
  constructor(public payload?: any) { }
}

export class DoLoginFailAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGIN_FAIL;
  constructor(public payload?: any) { }
}

export class DoLogoutAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGOUT;
  constructor(public payload?: any) { }
}

export class DoLogoutSuccessAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGOUT_SUCCESS;
  constructor(public payload?: any) { }
}

export class DoLogoutFailAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGOUT_FAIL;
  constructor(public payload?: any) { }
}

export class AddUserAction implements AppStateAction {
  readonly type = AuthActionTypes.ADD_USER;
  constructor(public payload?: any) { }
}

export class RemoveUserAction implements AppStateAction {
  readonly type = AuthActionTypes.REMOVE_USER;
  constructor(public payload?: any) { }
}

export type AuthActions
  = AuthAction
  | DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction
  | AddUserAction
  | RemoveUserAction
  | AuthLoadVersion
  | AuthLoadVersionSuccess
  | AuthLoadVersionFail
  | AuthLoadUser
  | AuthLoadUserSuccess
  | AuthLoadUserFail
  | LoadGetMultipleXUsers
  | LoadGetMultipleXUsersSuccess
  | LoadGetMultipleXUsersFail
  | LoadGetUserRight
  | LoadGetUserRightSuccess
  | LoadGetUserRightFail
  ;
