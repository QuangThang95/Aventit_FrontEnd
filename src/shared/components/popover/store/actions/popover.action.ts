import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const PopOverTypes = {
  LOAD: type('[PopOver] Load'),
  LOAD_SUCCESS: type('[PopOver] Load Success'),
  LOAD_FAIL: type('[PopOver] Load Fail')
};

export const PopOverActionTypes = {
  PopOverTypesAction: type('[PopOver] Action'),
  PopOverTypesTypes: PopOverTypes
};

export class PopOverAction implements AppStateAction {
  readonly type = PopOverActionTypes.PopOverTypesAction;

  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * PopOverTypes Actions
 * *****************************************************************
 */
export namespace PopOverInitData {
  export class LoadAction implements AppStateAction {
    readonly type = PopOverTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PopOverTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PopOverTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export type PopOverActions
  = PopOverAction
  | PopOverInitData.LoadAction
  | PopOverInitData.LoadSuccessAction
  | PopOverInitData.LoadFailAction;
