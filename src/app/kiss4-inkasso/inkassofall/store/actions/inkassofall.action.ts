import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const InkassofallListTypes = {
    LOAD: type('[Inkassofall] Load Data View List'),
    LOAD_SUCCESS: type('[Inkassofall] Load Data View List Success'),
    LOAD_FAIL: type('[Inkassofall] Load Data View List Fail')
};
const InkassofallAddTypes = {
    ADD: type('[Inkassofall] Add new'),
    ADD_SUCCESS: type('[Inkassofall] Add new succes'),
    ADD_FAIL: type('[Inkassofall] Add new Fail')
};
const InkassofallUpdateTypes = {
    UPDATE_INKASSOFALL: type('[Inkassofall] Update Inkassofall'),
    UPDATING_INKASSOFALL: type('[Inkassofall] Updating Inkassofall'),
    UPDATE_INKASSOFALL_SUCCESS: type('[Inkassofall] Update Inkassofall Success'),
    UPDATE_INKASSOFALL_FAIL: type('[Inkassofall] Update Inkassofall Fail')
};
const InkassofallDeleteTypes = {
    DELETE: type('[Inkassofall] Delete new'),
    DELETE_SUCCESS: type('[Inkassofall] Delete succes'),
    DELETE_FAIL: type('[Inkassofall] Delete Fail')
};
const SaveFormStateTypes = {
    SAVE_FORM_STATE_TYPES: type('[SaveFormState] Save'),
};
const InkassofallDetailTypes = {
    DETAIL_INKASSOFALL: type('[Inkassofall] Object detail'),
};

export const InkassofallActionTypes = {
    InkassofallAction: type('[Inkassofall] Action'),
    InkassofallListTypes: InkassofallListTypes,
    InkassofallAddTypes: InkassofallAddTypes,
    InkassofallUpdateTypes: InkassofallUpdateTypes,
    InkassofallDeleteTypes: InkassofallDeleteTypes,
    SaveFormStateTypes: SaveFormStateTypes,
    InkassofallDetailTypes: InkassofallDetailTypes
};


/**
 * Inkassofall action
 */
export class InkassofallAction implements AppStateAction {
    readonly type = InkassofallActionTypes.InkassofallAction;

    constructor(public payload?: any) {
    }
}

export namespace InkassofallList {
    export class LoadAction implements AppStateAction {
        readonly type = InkassofallListTypes.LOAD;

        constructor(public payload?: number) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = InkassofallListTypes.LOAD_SUCCESS;

        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = InkassofallListTypes.LOAD_FAIL;

        constructor(public payload?: any) {
        }
    }
}
// Add new
export namespace InkassofallAddData {
    export class AddNewAction implements AppStateAction {
        readonly type = InkassofallAddTypes.ADD;

        constructor(public payload?: any) {
        }
    }

    export class AddSuccessAction implements AppStateAction {
        readonly type = InkassofallAddTypes.ADD_SUCCESS;

        constructor(public payload: any) {
        }
    }

    export class AddFailAction implements AppStateAction {
        readonly type = InkassofallAddTypes.ADD_FAIL;

        constructor(public payload?: any) {
        }
    }
}
export namespace InkassofallUpdate {
    export class UpdateAction implements AppStateAction {
        readonly type = InkassofallUpdateTypes.UPDATE_INKASSOFALL;

        constructor(public payload?: any) {
        }
    }

    export class UpdateSuccessAction implements AppStateAction {
        readonly type = InkassofallUpdateTypes.UPDATE_INKASSOFALL_SUCCESS;

        constructor(public payload: any) {
        }
    }

    export class UpdateFailAction implements AppStateAction {
        readonly type = InkassofallUpdateTypes.UPDATE_INKASSOFALL_FAIL;

        constructor(public payload?: any) {
        }
    }
}
// Delete
export namespace InkassofallDeleteData {
    export class DeleteAction implements AppStateAction {
        readonly type = InkassofallDeleteTypes.DELETE;

        constructor(public payload?: any) {
        }
    }

    export class DeleteSuccessAction implements AppStateAction {
        readonly type = InkassofallDeleteTypes.DELETE_SUCCESS;

        constructor(public payload: any) {
        }
    }

    export class DeleteFailAction implements AppStateAction {
        readonly type = InkassofallDeleteTypes.DELETE_FAIL;

        constructor(public payload?: any) {
        }
    }
}
// Save
export namespace SaveFormState {
    export class SaveFormStateAction implements AppStateAction {
        readonly type = SaveFormStateTypes.SAVE_FORM_STATE_TYPES;

        constructor(public payload?: any) {
        }
    }
}
// Detail
export namespace InkassofallDetailState {
    export class InkassofallDetailStateAction implements AppStateAction {
        readonly type = InkassofallDetailTypes.DETAIL_INKASSOFALL;

        constructor(public payload?: any) {
        }
    }
}


export type InkassofallActions
    = InkassofallAction
    | InkassofallList.LoadAction
    | InkassofallList.LoadSuccessAction
    | InkassofallList.LoadFailAction
    | InkassofallAddData.AddNewAction
    | InkassofallAddData.AddSuccessAction
    | InkassofallAddData.AddFailAction
    | InkassofallUpdate.UpdateAction
    | InkassofallUpdate.UpdateSuccessAction
    | InkassofallUpdate.UpdateFailAction
    | InkassofallDeleteData.DeleteAction
    | InkassofallDeleteData.DeleteSuccessAction
    | InkassofallDeleteData.DeleteFailAction
    | SaveFormState.SaveFormStateAction
    | InkassofallDetailState.InkassofallDetailStateAction;
