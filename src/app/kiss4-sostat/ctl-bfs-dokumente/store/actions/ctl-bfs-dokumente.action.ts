import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const CtlBfsDokumenteTypes = {
  LOAD: type('[CtlBfsDokumente] Load'),
  LOAD_SUCCESS: type('[CtlBfsDokumente] Load Success'),
  LOAD_FAIL: type('[CtlBfsDokumente] Load Fail'),
  RESET_STATE: type('[CtlBfsDokumente] Reset State')
};

export const CtlBfsDokumenteActionTypes = {
  CtlBfsDokumenteAction: type('[CtlBfsDokumente] Action'),
  CtlBfsDokumenteTypes: CtlBfsDokumenteTypes,
};



export class CtlBfsDokumenteAction implements AppStateAction {
  readonly type = CtlBfsDokumenteActionTypes.CtlBfsDokumenteAction;
  constructor(public payload?: any) {
  }
}

/**
 * *****************************************************************
 * CtlBfsDokumenteTypes Actions
 * *****************************************************************
 */
export namespace LeitfadenData {
  export class LoadAction implements AppStateAction {
    readonly type = CtlBfsDokumenteTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = CtlBfsDokumenteTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = CtlBfsDokumenteTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }

  export class ResetStateAction implements AppStateAction {
    readonly type = CtlBfsDokumenteTypes.RESET_STATE;
    constructor(public payload?: any) {
    }
  }
}


export type CtlBfsDokumenteActions
  = CtlBfsDokumenteAction
  | LeitfadenData.LoadAction
  | LeitfadenData.LoadSuccessAction
  | LeitfadenData.LoadFailAction;
