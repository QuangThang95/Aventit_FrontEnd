import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

export const AppActionTypes = {
  AppAction: type('[App] Action'),
  LOAD_API_ROLES: type('[LOAD_API_ROLES] call api'),
  SET_AVAIBLE_ROLES: type('[SET_AVAIBLE_ROLES] Get data'),
  LOAD_API_ROLES_FAIL: type('[LOAD_API_ROLES] failed')
};

export class AppAction implements AppStateAction {
  readonly type = AppActionTypes.AppAction;
  constructor(public payload?: any) { }
}

export class LoadApiRolesAction implements AppStateAction {
  readonly type = AppActionTypes.LOAD_API_ROLES;
  constructor(public payload?: any) { }
}

export class SetAvailableRolesAction implements AppStateAction {
  readonly type = AppActionTypes.SET_AVAIBLE_ROLES;
  constructor(public payload?: any[]) { }
}

export class LoadApiRolesFailAction implements AppStateAction {
  readonly type = AppActionTypes.LOAD_API_ROLES_FAIL;
  constructor(public payload?: any) {}
}

export type AppActions
  = AppAction
  | LoadApiRolesAction
  | SetAvailableRolesAction
  | LoadApiRolesFailAction;
