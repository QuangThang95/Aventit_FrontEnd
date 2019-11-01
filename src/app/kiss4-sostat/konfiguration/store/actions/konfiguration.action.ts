import { Konfiguration } from '@app/kiss4-sostat/konfiguration/models';
import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const KonfigurationTypes = {
  LOAD: type('[Konfiguration] Load'),
  LOAD_SUCCESS: type('[Konfiguration] Load Success'),
  LOAD_FAIL: type('[Konfiguration] Load Fail')
};

const KonfigurationTypesForGrid = {
  LOAD: type('[Konfiguration] Load Grid'),
  LOAD_SUCCESS: type('[Konfiguration] Load Grid Success'),
  LOAD_FAIL: type('[Konfiguration] Load Grid Fail')
};

export const KonfigurationActionTypes = {
  KonfigurationAction: type('[Konfiguration] Action'),
  KonfigurationTypes: KonfigurationTypes,
  KonfigurationTypesForGrid: KonfigurationTypesForGrid
};

export class KonfigurationAction implements AppStateAction {
  readonly type = KonfigurationActionTypes.KonfigurationAction;

  constructor(public payload?: any) { }
}

// KonfigurationTypes Actions
export namespace KonfigurationInitData {
  export class LoadAction implements AppStateAction {
    readonly type = KonfigurationTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = KonfigurationTypes.LOAD_SUCCESS;

    constructor(public payload?: Konfiguration) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = KonfigurationTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// KonfigurationTypesForGrid Actions

export namespace KonfigurationGridData {
  export class LoadAction implements AppStateAction {
    readonly type = KonfigurationTypesForGrid.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = KonfigurationTypesForGrid.LOAD_SUCCESS;

    constructor(public payload?: Konfiguration[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = KonfigurationTypesForGrid.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

export type KonfigurationActions
  = KonfigurationAction
  | KonfigurationInitData.LoadAction
  | KonfigurationInitData.LoadSuccessAction
  | KonfigurationInitData.LoadFailAction
  | KonfigurationGridData.LoadAction
  | KonfigurationGridData.LoadSuccessAction
  | KonfigurationGridData.LoadFailAction;

