import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const GemeindeDatenTypes = {
  LOAD: type('[GemeindeDaten] Load'),
  LOAD_SUCCESS: type('[GemeindeDaten] Load Success'),
  LOAD_FAIL: type('[GemeindeDaten] Load Fail')
};

const GemeindeDatenSyncTypes = {
  SYNC: type('[GemeindeDaten] Sync'),
  SYNC_SUCCESS: type('[GemeindeDaten] Sync Success'),
  SYNC_FAIL: type('[GemeindeDaten] Sync Fail')
};

const GemeindeDatenImportTypes = {
  IMPORT: type('[GemeindeDaten] Import'),
  IMPORT_SUCCESS: type('[GemeindeDaten] Import Success'),
  IMPORT_FAIL: type('[GemeindeDaten] Import Fail')
};

const GemeideDatenResetTypes = {
  RESET: type('[GemeindeDaten] Reset')
};

export const GemeindeDatenActionTypes = {
  GemeindeDatenAction: type('[GemeindeDaten] Action'),
  GemeindeDatenTypes: GemeindeDatenTypes,
  GemeindeDatenSyncTypes: GemeindeDatenSyncTypes,
  GemeindeDatenImportTypes: GemeindeDatenImportTypes,
  GemeideDatenResetTypes: GemeideDatenResetTypes
};

export class GemeindeDatenAction implements AppStateAction {
  readonly type = GemeindeDatenActionTypes.GemeindeDatenAction;

  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * GemeindeDatenTypes Actions
 * *****************************************************************
 */
export namespace GemeindeDatenInitData {
  export class LoadAction implements AppStateAction {
    readonly type = GemeindeDatenTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GemeindeDatenTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GemeindeDatenTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace GemeindeDatenSyncData {
  export class SyncAction implements AppStateAction {
    readonly type = GemeindeDatenSyncTypes.SYNC;

    constructor(public payload?: any) { }
  }

  export class SyncSuccessAction implements AppStateAction {
    readonly type = GemeindeDatenSyncTypes.SYNC_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class SyncFailAction implements AppStateAction {
    readonly type = GemeindeDatenSyncTypes.SYNC_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace GemeindeDatenImportData {
  export class ImportAction implements AppStateAction {
    readonly type = GemeindeDatenImportTypes.IMPORT;

    constructor(public payload?: any) { }
  }

  export class ImportSuccessAction implements AppStateAction {
    readonly type = GemeindeDatenImportTypes.IMPORT_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class ImportFailAction implements AppStateAction {
    readonly type = GemeindeDatenImportTypes.IMPORT_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace GemeindeDatenReset {
  export class ResetAction implements AppStateAction {
    readonly type = GemeideDatenResetTypes.RESET;

    constructor(public payload?: any) { }
  }
}

export type GemeindeDatenActions
  = GemeindeDatenAction
  | GemeindeDatenInitData.LoadAction
  | GemeindeDatenInitData.LoadSuccessAction
  | GemeindeDatenInitData.LoadFailAction
  | GemeindeDatenSyncData.SyncAction
  | GemeindeDatenSyncData.SyncSuccessAction
  | GemeindeDatenSyncData.SyncFailAction
  | GemeindeDatenImportData.ImportAction
  | GemeindeDatenImportData.ImportSuccessAction
  | GemeindeDatenImportData.ImportFailAction
  | GemeindeDatenReset.ResetAction;
