import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const CtlBfsFragenkatalogTypes = {
  LOAD: type('[CtlBfsFragenkatalog] Load Data Search'),
  LOAD_SUCCESS: type('[CtlBfsFragenkatalog] Load Data Search Success'),
  LOAD_FAIL: type('[CtlBfsFragenkatalog] Load Data Search Fail')
};
const CtlBfsFragenkatalogListTypes = {
  LOAD: type('[CtlBfsFragenkatalog] Load Data View List'),
  LOAD_SUCCESS: type('[CtlBfsFragenkatalog] Load Data View List Success'),
  LOAD_FAIL: type('[CtlBfsFragenkatalog] Load Data View List Fail')
};
const CtlBfsFragenkatalogAddTypes = {
  ADD: type('[CtlBfsFragenkatalog] Add new'),
  ADD_SUCCESS: type('[CtlBfsFragenkatalog] Add new succes'),
  ADD_FAIL: type('[CtlBfsFragenkatalog] Add new Fail')
};
const CtlBfsFragenkatalogUpdateTypes = {
  UPDATE_CTLBFSFRAGENKATALOG: type('[CtlBfsFragenkatalog] Update CtlBfsFragenkatalog'),
  UPDATING_CTLBFSFRAGENKATALOG: type('[CtlBfsFragenkatalog] Updating CtlBfsFragenkatalog'),
  UPDATE_CTLBFSFRAGENKATALOG_SUCCESS: type('[CtlBfsFragenkatalog] Update CtlBfsFragenkatalog Success'),
  UPDATE_CTLBFSFRAGENKATALOG_FAIL: type('[CtlBfsFragenkatalog] Update CtlBfsFragenkatalog Fail')
};
const CtlBfsFragenkatalogDeleteTypes = {
  DELETE: type('[CtlBfsFragenkatalog] Delete new'),
  DELETE_SUCCESS: type('[CtlBfsFragenkatalog] Delete succes'),
  DELETE_FAIL: type('[CtlBfsFragenkatalog] Delete Fail')
};
const SaveFormStateTypes = {
  SAVE_FORM_STATE_TYPES: type('[SaveFormState] Save'),
};
const CtlBfsFragenkatalogDetailTypes = {
  DETAIL_CTLBFSFRAGENKATALOG: type('[CtlBfsFragenkatalog] Object detail'),
};

export const CtlBfsFragenkatalogActionTypes = {
  CtlBfsFragenkatalogAction: type('[CtlBfsFragenkatalog] Action'),
  CtlBfsFragenkatalogTypes: CtlBfsFragenkatalogTypes,
  CtlBfsFragenkatalogListTypes: CtlBfsFragenkatalogListTypes,
  CtlBfsFragenkatalogAddTypes: CtlBfsFragenkatalogAddTypes,
  CtlBfsFragenkatalogUpdateTypes: CtlBfsFragenkatalogUpdateTypes,
  CtlBfsFragenkatalogDeleteTypes: CtlBfsFragenkatalogDeleteTypes,
  SaveFormStateTypes: SaveFormStateTypes,
  CtlBfsFragenkatalogDetailTypes: CtlBfsFragenkatalogDetailTypes
};


/**
 * Ctl bfs fragenkatalog action
 */
export class CtlBfsFragenkatalogAction implements AppStateAction {
  readonly type = CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogAction;

  constructor(public payload?: any) {
  }
}

export namespace CtlBfsFragenkatalogInitDatas {
  export class LoadAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogTypes.LOAD;

    constructor(public payload?: number) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

export namespace CtlBfsFragenkatalogList {
  export class LoadAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogListTypes.LOAD;

    constructor(public payload?: number) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogListTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogListTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}
// add new
export namespace CtlBfsFragenkatalogAddData {
  export class AddNewAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogAddTypes.ADD;

    constructor(public payload?: any) {
    }
  }

  export class AddSuccessAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogAddTypes.ADD_SUCCESS;

    constructor(public payload: any) {
    }
  }

  export class AddFailAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogAddTypes.ADD_FAIL;

    constructor(public payload?: any) {
    }
  }
}
export namespace CtlBfsFragenkatalogUpdate {
  export class UpdateAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG;

    constructor(public payload?: any) {
    }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG_SUCCESS;

    constructor(public payload: any) {
    }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG_FAIL;

    constructor(public payload?: any) {
    }
  }
}
// Delete
export namespace CtlBfsFragenkatalogDeleteData {
  export class DeleteAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogDeleteTypes.DELETE;

    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogDeleteTypes.DELETE_SUCCESS;

    constructor(public payload: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogDeleteTypes.DELETE_FAIL;

    constructor(public payload?: any) {
    }
  }
}
// Delete
export namespace SaveFormState {
  export class SaveFormStateAction implements AppStateAction {
    readonly type = SaveFormStateTypes.SAVE_FORM_STATE_TYPES;

    constructor(public payload?: any) {
    }
  }
}
// Detail
export namespace CtlBfsFragenkatalogDetailState {
  export class CtlBfsFragenkatalogDetailStateAction implements AppStateAction {
    readonly type = CtlBfsFragenkatalogDetailTypes.DETAIL_CTLBFSFRAGENKATALOG;

    constructor(public payload?: any) {
    }
  }
}


export type CtlBfsFragenkatalogActions
  = CtlBfsFragenkatalogAction
  | CtlBfsFragenkatalogInitDatas.LoadAction
  | CtlBfsFragenkatalogInitDatas.LoadSuccessAction
  | CtlBfsFragenkatalogInitDatas.LoadFailAction
  | CtlBfsFragenkatalogList.LoadAction
  | CtlBfsFragenkatalogList.LoadSuccessAction
  | CtlBfsFragenkatalogList.LoadFailAction
  | CtlBfsFragenkatalogAddData.AddNewAction
  | CtlBfsFragenkatalogAddData.AddSuccessAction
  | CtlBfsFragenkatalogAddData.AddFailAction
  | CtlBfsFragenkatalogUpdate.UpdateAction
  | CtlBfsFragenkatalogUpdate.UpdateSuccessAction
  | CtlBfsFragenkatalogUpdate.UpdateFailAction
  | CtlBfsFragenkatalogDeleteData.DeleteAction
  | CtlBfsFragenkatalogDeleteData.DeleteSuccessAction
  | CtlBfsFragenkatalogDeleteData.DeleteFailAction
  | SaveFormState.SaveFormStateAction
  | CtlBfsFragenkatalogDetailState.CtlBfsFragenkatalogDetailStateAction;
