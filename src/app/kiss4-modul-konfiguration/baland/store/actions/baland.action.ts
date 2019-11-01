import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const BalandTypes = {
  LOAD: type('[Baland] Load'),
  LOAD_SUCCESS: type('[Baland] Load Success'),
  LOAD_FAIL: type('[Baland] Load Fail')
};

const BalandSyncTypes = {
  SYNC: type('[Baland] Sync'),
  SYNC_SUCCESS: type('[Baland] Sync Success'),
  SYNC_FAIL: type('[Baland] Sync Fail')
};

const BalandResetTypes = {
  RESET: type('[Baland] Reset')
};

export const BalandActionTypes = {
  BalandAction: type('[Baland] Action'),
  BalandTypes: BalandTypes,
  BalandSyncTypes: BalandSyncTypes,
  BalandResetTypes: BalandResetTypes
};

export class BalandAction implements AppStateAction {
  readonly type = BalandActionTypes.BalandAction;

  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * Baland Actions
 * *****************************************************************
 */
export namespace BalandInitData {
  export class LoadAction implements AppStateAction {
    readonly type = BalandTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BalandTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BalandTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace BalandSyncData {
  export class SyncAction implements AppStateAction {
    readonly type = BalandSyncTypes.SYNC;

    constructor(public payload?: any) { }
  }

  export class SyncSuccessAction implements AppStateAction {
    readonly type = BalandSyncTypes.SYNC_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class SyncFailAction implements AppStateAction {
    readonly type = BalandSyncTypes.SYNC_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace BalandResetData {
  export class ResetAction implements AppStateAction {
    readonly type = BalandResetTypes.RESET;

    constructor(public payload?: any) { }
  }
}

export type BalandActions
  = BalandAction
  | BalandInitData.LoadAction
  | BalandInitData.LoadSuccessAction
  | BalandInitData.LoadFailAction
  | BalandSyncData.SyncAction
  | BalandSyncData.SyncSuccessAction
  | BalandSyncData.SyncFailAction
  | BalandResetData.ResetAction;
