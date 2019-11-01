import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites';

const ModuleConfigNavigatorItemsTypes = {
    LOAD: type('[ModuleConfigNavigatorItems] Load'),
    LOAD_SUCCESS: type('[ModuleConfigNavigatorItems] Load Success'),
    LOAD_FAIL: type('[ModuleConfigNavigatorItems] Load Fail')
};

const InitialParametersTypes = {
    UPDATE_INITIAL_PARAMETERS: type('[InitialParameters] Update'),
};

const EditModeStatusTypes = {
    UPDATE_EDIT_MODE: type('[EditModeStatus] Update'),
};

const DirtyFormStatusTypes = {
    UPDATE_DIRTY_FORM_STATUS: type('[DirtyFormStatus] Update'),
};

const ChangeFormTypes = {
    CHANGE_FORM_TYPES: type('[ChangeFormTypes] Update'),
};

const SelectNodeTypes = {
    SELECT_NODE_TYPES: type('[SelectNodeTypes] Select'),
};

export const ModuleConfigNavigatorActionTypes = {
    ModuleConfigNavigatorAction: type('[ModuleConfigNavigator] Action'),
    ModuleConfigNavigatorItemsTypes: ModuleConfigNavigatorItemsTypes,
    InitialParametersTypes: InitialParametersTypes,
    EditModeStatusTypes: EditModeStatusTypes,
    DirtyFormStatusTypes: DirtyFormStatusTypes,
    ChangeFormTypes: ChangeFormTypes,
    SelectNodeTypes: SelectNodeTypes
};

export class ModuleConfigNavigatorAction implements AppStateAction {
    readonly type = ModuleConfigNavigatorActionTypes.ModuleConfigNavigatorAction;
    constructor(public payload?: any) {
    }
}

export namespace ModuleConfigNavigatorItems {
    export class LoadModuleConfigNavigatorItemsAction implements AppStateAction {
        readonly type = ModuleConfigNavigatorItemsTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadModuleConfigNavigatorItemsSuccessAction implements AppStateAction {
        readonly type = ModuleConfigNavigatorItemsTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadModuleConfigNavigatorItemsFailAction implements AppStateAction {
        readonly type = ModuleConfigNavigatorItemsTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export class UpdateInitialParametersAction implements AppStateAction {
    readonly type = InitialParametersTypes.UPDATE_INITIAL_PARAMETERS;
    constructor(public payload?: any) {
    }
}

export class UpdateEditModeStatusAction implements AppStateAction {
    readonly type = EditModeStatusTypes.UPDATE_EDIT_MODE;
    constructor(public payload?: any) {
    }
}

export class UpdateDirtyFormStatusAction implements AppStateAction {
    readonly type = DirtyFormStatusTypes.UPDATE_DIRTY_FORM_STATUS;
    constructor(public payload?: any) {
    }
}

export class ChangeFormAction implements AppStateAction {
    readonly type = ChangeFormTypes.CHANGE_FORM_TYPES;
    constructor(public payload?: any) {
    }
}

export class SelectNodeAction implements AppStateAction {
    readonly type = SelectNodeTypes.SELECT_NODE_TYPES;
    constructor(public payload?: any) {
    }
}

export type ModuleConfigNavigatorActions
    = ModuleConfigNavigatorAction
    | ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsAction
    | ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsSuccessAction
    | ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsFailAction
    | UpdateInitialParametersAction
    | UpdateEditModeStatusAction
    | UpdateDirtyFormStatusAction
    | ChangeFormAction
    | SelectNodeAction;
