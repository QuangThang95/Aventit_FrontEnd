import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const VariablenTypes = {
    LOAD: type('[Variablen] Load'),
    LOAD_SUCCESS: type('[Variablen] Load Success'),
    LOAD_FAIL: type('[Variablen] Load Fail')
};

const PersonTypes = {
    LOAD: type('[Person] Load'),
    LOAD_SUCCESS: type('[Person] Load Success'),
    LOAD_FAIL: type('[Person] Load Fail')
};

const MitarbeiterTypes = {
    LOAD: type('[Mitarbeiter] Load'),
    LOAD_SUCCESS: type('[Mitarbeiter] Load Success'),
    LOAD_FAIL: type('[Mitarbeiter] Load Fail')
};


const SearchInitialData = {
    LOAD: type('[SearchInitialData] Load'),
    LOAD_SUCCESS: type('[SearchInitialData] Load Success'),
    LOAD_FAIL: type('[SearchInitialData] Load Fail')
};

export const VariablenActionTypes = {
    VariablenAction: type('[Variablen] Action'),
    VariablenTypes: VariablenTypes,
    PersonTypes: PersonTypes,
    MitarbeiterTypes: MitarbeiterTypes,
    SearchInitialData: SearchInitialData
};

export class VariablenAction implements AppStateAction {
    readonly type = VariablenActionTypes.VariablenAction;
    constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * VariablenTypes Actions
 * *****************************************************************
 */
export namespace VariablenInitData {
    export class LoadAction implements AppStateAction {
        readonly type = VariablenTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = VariablenTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = VariablenTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
// Person Actions
export namespace PersonInitData {
    export class LoadAction implements AppStateAction {
        readonly type = PersonTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = PersonTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = PersonTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
// Mitarbeiter Actions
export namespace MitarbeiterInitData {
    export class LoadAction implements AppStateAction {
        readonly type = MitarbeiterTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MitarbeiterTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MitarbeiterTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
// data search initial
export namespace SearchInitData {
    export class LoadAction implements AppStateAction {
        readonly type = SearchInitialData.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = SearchInitialData.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = SearchInitialData.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
export type VariablenActions
    = VariablenAction
    | VariablenInitData.LoadAction
    | VariablenInitData.LoadSuccessAction
    | VariablenInitData.LoadFailAction
    | PersonInitData.LoadAction
    | PersonInitData.LoadSuccessAction
    | PersonInitData.LoadFailAction
    | MitarbeiterInitData.LoadAction
    | MitarbeiterInitData.LoadSuccessAction
    | MitarbeiterInitData.LoadFailAction
    | SearchInitData.LoadAction
    | SearchInitData.LoadSuccessAction
    | SearchInitData.LoadFailAction;
