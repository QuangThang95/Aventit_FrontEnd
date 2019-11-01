import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const GemeindeCodeTypes = {
    LOAD: type('[GemeindeCode] Load'),
    LOAD_SUCCESS: type('[GemeindeCode] Load Success'),
    LOAD_FAIL: type('[GemeindeCode] Load Fail')
};

export const GemeindeCodeActionTypes = {
    GemeindeCodeAction: type('[GemeindeCode] Action'),
    GemeindeCodeTypes: GemeindeCodeTypes
};

export class GemeindeCodeAction implements AppStateAction {
    readonly type = GemeindeCodeActionTypes.GemeindeCodeAction;
    constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * GemeindeCodeTypes Actions
 * *****************************************************************
 */
export namespace GemeindeCodeInitData {
    export class LoadAction implements AppStateAction {
        readonly type = GemeindeCodeTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = GemeindeCodeTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = GemeindeCodeTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}

export type GemeindeCodeActions
    = GemeindeCodeAction
    | GemeindeCodeInitData.LoadAction
    | GemeindeCodeInitData.LoadSuccessAction
    | GemeindeCodeInitData.LoadFailAction;
