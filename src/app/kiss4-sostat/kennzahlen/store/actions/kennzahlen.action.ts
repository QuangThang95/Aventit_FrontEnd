import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const KennzahlenTypes = {
  LOAD: type('[Kennzahlen] Load'),
  LOAD_SUCCESS: type('[Kennzahlen] Load Success'),
  LOAD_FAIL: type('[Kennzahlen] Load Fail')
};

const KennzahlenInitSearchTypes = {
  LOAD: type('[Kennzahlen] Search'),
  LOAD_SUCCESS: type('[Kennzahlen] Search Success'),
  LOAD_FAIL: type('[Kennzahlen] Search Fail')
};


export const KennzahlenActionTypes = {
  Action: type('[Kennzahlen] Action'),
  Types: KennzahlenTypes,
  InitSearchTypes: KennzahlenInitSearchTypes
};

export class KennzahlenAction implements AppStateAction {
  readonly type = KennzahlenActionTypes.Action;

  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * Kennzahlen Types Actions
 * *****************************************************************
 */
export namespace InitData {
  export class LoadAction implements AppStateAction {
    readonly type = KennzahlenTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = KennzahlenTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = KennzahlenTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace InitSearchData {
  export class LoadAction implements AppStateAction {
    readonly type = KennzahlenInitSearchTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = KennzahlenInitSearchTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = KennzahlenInitSearchTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export type KennzahlenActions
  = KennzahlenAction
  | InitData.LoadAction
  | InitData.LoadSuccessAction
  | InitData.LoadFailAction
  | InitSearchData.LoadAction
  | InitSearchData.LoadSuccessAction
  | InitSearchData.LoadFailAction;
