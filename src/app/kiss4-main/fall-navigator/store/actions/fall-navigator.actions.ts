import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';
import { FallNavFilterModel, FallNavNavigatorTreeModel } from '@app/kiss4-main/fall-navigator/models';

const LoadFallNavsTypes = {
  LOAD: type('[FallNav] Load'),
  LOAD_SUCCESS: type('[FallNav] Load Success'),
  LOAD_FAIL: type('[FallNav] Load Fail'),
};

const FiltersTypes = {
  ACTIVE: type('[Filter with Fall Nav:] --- Aktiv'),
  CLOSED: type('[Filter with Fall Nav:] --- Closed'),
  ARCHIVED: type('[Filter with Fall Nav:] --- Archived'),
  INCLUDE_GROUP: type('[Filter with Fall Nav:] --- IncludeGroup'),
  INCLUDE_GUEST: type('[Filter with Fall Nav:] --- IncludeGuest'),
  INCLUDE_TASKS: type('[Filter with Fall Nav:] --- IncludeTasks')
};

const ConfigBoolTypes = {
  GET: type('[ConfigBool] Load'),
  GET_SUCCESS: type('[ConfigBool] Load Success'),
  GET_FAIL: type('[ConfigBool] Load Fail'),
};

const HeaderTypes = {
  GET: type('[Header] Load'),
  GET_SUCCESS: type('[Header] Load Success'),
  GET_FAIL: type('[Header] Load Fail'),
};
export const FallNavsActionTypes = {
  FallNavsAction: type('[FallNavs] Action'),
  LoadFallNavsTypes: LoadFallNavsTypes,
  FiltersTypes: FiltersTypes,
  ConfigBoolTypes: ConfigBoolTypes,
  HeaderTypes: HeaderTypes
};

export class FallNavsAction implements AppStateAction {
  readonly type = FallNavsActionTypes.FallNavsAction;
  constructor(public payload?: any) { }
}

/**
 * Get Fall Navigator action
 */

export class LoadFallNavsAction implements AppStateAction {
  readonly type = LoadFallNavsTypes.LOAD;
  constructor(public payload?: FallNavFilterModel) { }
}

export class LoadFallNavsSuccessAction implements AppStateAction {
  readonly type = LoadFallNavsTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<FallNavNavigatorTreeModel, any>[]) { }
}

export class LoadFallNavsFailAction implements AppStateAction {
  readonly type = LoadFallNavsTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get config bool action
 */

export class LoadConfigBoolAction implements AppStateAction {
  readonly type = ConfigBoolTypes.GET;
  constructor(public payload?: any) { }
}

export class LoadConfigBoolSuccessAction implements AppStateAction {
  readonly type = ConfigBoolTypes.GET_SUCCESS;
  constructor(public payload?: any) { }
}

export class LoadConfigBoolFailAction implements AppStateAction {
  readonly type = ConfigBoolTypes.GET_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get header action
 */

export class LoadHeaderAction implements AppStateAction {
  readonly type = HeaderTypes.GET;
  constructor(public payload?: any) { }
}

export class LoadHeaderSuccessAction implements AppStateAction {
  readonly type = HeaderTypes.GET_SUCCESS;
  constructor(public payload?: any) { }
}

export class LoadHeaderFailAction implements AppStateAction {
  readonly type = HeaderTypes.GET_FAIL;
  constructor(public payload?: any) { }
}


/**
 * ------------------------------------
 * Set Visibility FallNav Filter Action
 * @param payload: FallNavFilterModel
 * ------------------------------------
*/

export namespace FiltersAction {
  export class SetActiveAction implements AppStateAction {
    readonly type = FiltersTypes.ACTIVE;
    constructor(public payload?: FallNavFilterModel) { }
  }
  export class SetClosedAction implements AppStateAction {
    readonly type = FiltersTypes.CLOSED;
    constructor(public payload?: FallNavFilterModel) { }
  }
  export class SetArchivedAction implements AppStateAction {
    readonly type = FiltersTypes.ARCHIVED;
    constructor(public payload?: FallNavFilterModel) { }
  }
  export class SetIncludeGroupAction implements AppStateAction {
    readonly type = FiltersTypes.INCLUDE_GROUP;
    constructor(public payload?: FallNavFilterModel) { }
  }
  export class SetIncludeGuestAction implements AppStateAction {
    readonly type = FiltersTypes.INCLUDE_GUEST;
    constructor(public payload?: FallNavFilterModel) { }
  }
  export class SetIncludeTasksAction implements AppStateAction {
    readonly type = FiltersTypes.INCLUDE_TASKS;
    constructor(public payload?: FallNavFilterModel) { }
  }
}


export type FallNavsActions
  = FallNavsAction
  | LoadFallNavsAction
  | LoadFallNavsSuccessAction
  | LoadFallNavsFailAction;

export type FiltersAction
  = FiltersAction.SetActiveAction
  | FiltersAction.SetClosedAction
  | FiltersAction.SetArchivedAction
  | FiltersAction.SetIncludeGroupAction
  | FiltersAction.SetIncludeGuestAction
  | FiltersAction.SetIncludeTasksAction;

export type ConfigBoolActions
  = LoadConfigBoolAction
  | LoadConfigBoolFailAction
  | LoadConfigBoolSuccessAction;

export type HeaderActions
  = LoadHeaderAction
  | LoadHeaderSuccessAction
  | LoadFallNavsSuccessAction;
