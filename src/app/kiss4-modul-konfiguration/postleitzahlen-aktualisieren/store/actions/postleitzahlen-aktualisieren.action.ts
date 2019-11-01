import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const PostleitzahlenAktualisierenTypes = {
  LOAD: type('[PostleitzahlenAktualisieren] Load'),
  LOAD_SUCCESS: type('[PostleitzahlenAktualisieren] Load Success'),
  LOAD_FAIL: type('[PostleitzahlenAktualisieren] Load Fail')
};

const PostleitzahlenAktualisierenSyncTypes = {
  SYNC: type('[PostleitzahlenAktualisieren] Sync'),
  SYNC_SUCCESS: type('[PostleitzahlenAktualisieren] Sync Success'),
  SYNC_FAIL: type('[PostleitzahlenAktualisieren] Sync Fail')
};

const PostleitzahlenAktualisierenResetTypes = {
  RESET: type('[PostleitzahlenAktualisieren] Reset')
};

export const PostleitzahlenAktualisierenActionTypes = {
  PostleitzahlenAktualisierenAction: type('[PostleitzahlenAktualisieren] Action'),
  PostleitzahlenAktualisierenTypes: PostleitzahlenAktualisierenTypes,
  PostleitzahlenAktualisierenSyncTypes: PostleitzahlenAktualisierenSyncTypes,
  PostleitzahlenAktualisierenResetTypes: PostleitzahlenAktualisierenResetTypes
};

export class PostleitzahlenAktualisierenAction implements AppStateAction {
  readonly type = PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenAction;

  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * PostleitzahlenAktualisierenTypes Actions
 * *****************************************************************
 */
export namespace PostleitzahlenAktualisierenInitData {
  export class LoadAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace PostleitzahlenAktualisierenSyncData {
  export class SyncAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenSyncTypes.SYNC;

    constructor(public payload?: any) { }
  }

  export class SyncSuccessAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenSyncTypes.SYNC_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class SyncFailAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenSyncTypes.SYNC_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace PostleitzahlenAktualisierenResetData {
  export class ResetAction implements AppStateAction {
    readonly type = PostleitzahlenAktualisierenResetTypes.RESET;

    constructor(public payload?: any) { }
  }
}

export type PostleitzahlenAktualisierenActions
  = PostleitzahlenAktualisierenAction
  | PostleitzahlenAktualisierenInitData.LoadAction
  | PostleitzahlenAktualisierenInitData.LoadSuccessAction
  | PostleitzahlenAktualisierenInitData.LoadFailAction
  | PostleitzahlenAktualisierenSyncData.SyncAction
  | PostleitzahlenAktualisierenSyncData.SyncSuccessAction
  | PostleitzahlenAktualisierenSyncData.SyncFailAction
  | PostleitzahlenAktualisierenResetData.ResetAction;
