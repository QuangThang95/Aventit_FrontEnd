import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';
import { MenuModel, SearchBoxModel } from '@shared/models';

const LoadMenuTypes = {
  LOAD: type('[Menus] Loading'),
  LOAD_SUCCESS: type('[Menus] Load data success'),
  LOAD_FAIL: type('[Menus] Load data Fail -> []')
};

const LoadSearchBoxTypes = {
  LOAD: type('[Search_Box_data] Loading'),
  LOAD_SUCCESS: type('[Search_Box_data] Load data success'),
  LOAD_FAIL: type('[Search_Box_data] Load Fail')
};

export const LayoutActionTypes = {
  LayoutAction: type('[Layout] Action'),
  // Load menu hozirontal
  LoadMenu: LoadMenuTypes,
  // Load search box data
  LoadSearchBox: LoadSearchBoxTypes
};

/**
 * Load Menu hozirontal data Action
 */
export class LoadMenuAction implements AppStateAction {
  readonly type = LoadMenuTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadMenuSuccessAction implements AppStateAction {
  readonly type = LoadMenuTypes.LOAD_SUCCESS;
  constructor(public payload?: MenuModel[]) { }
}

export class LoadMenuFailAction implements AppStateAction {
  readonly type = LoadMenuTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class LayoutAction implements AppStateAction {
  readonly type = LayoutActionTypes.LayoutAction;
  constructor(public payload?: any) { }
}

/**
 * -------------------------------------------------------
 */

/**
 * Load Search box data Action
 */
export class LoadSearchBoxDataAction implements AppStateAction {
  readonly type = LoadSearchBoxTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadSearchBoxDataSuccessAction implements AppStateAction {
  readonly type = LoadSearchBoxTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<SearchBoxModel, any>[]) { }
}

export class LoadSearchBoxDataFailAction implements AppStateAction {
  readonly type = LoadSearchBoxTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export type LayoutActions
  = LayoutAction
  | LoadMenuAction
  | LoadMenuSuccessAction
  | LoadMenuFailAction
  | LoadSearchBoxDataAction
  | LoadSearchBoxDataSuccessAction
  | LoadSearchBoxDataFailAction;
