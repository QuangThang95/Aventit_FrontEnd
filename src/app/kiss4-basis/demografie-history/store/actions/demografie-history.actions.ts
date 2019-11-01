import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const xUserHistoryTypes = {
    LOAD: type('[xUserHistory Datas] Load'),
    LOAD_SUCCESS: type('[xUserHistory Datas] Load Success'),
    LOAD_FAIL: type('[xUserHistory Datas] Load Fail')
};
const PersonalienTypes = {
    LOAD: type('[Personalien Datas] Load'),
    LOAD_SUCCESS: type('[Personalien Datas] Load Success'),
    LOAD_FAIL: type('[Personalien Datas] Load Fail')
};
const WohnsitzTypes = {
    LOAD: type('[Wohnsitz Datas] Load'),
    LOAD_SUCCESS: type('[Wohnsitz Datas] Load Success'),
    LOAD_FAIL: type('[Wohnsitz Datas] Load Fail')
};
const AufenthaltsortTypes = {
    LOAD: type('[Aufenthaltsort Datas] Load'),
    LOAD_SUCCESS: type('[Aufenthaltsort Datas] Load Success'),
    LOAD_FAIL: type('[Aufenthaltsort Datas] Load Fail')
};

export const DemografieActionTypes = {
    DemografieTypes: type('[Demografie Datas] Action'),
    xUserHistoryTypes: xUserHistoryTypes,
    PersonalienTypes: PersonalienTypes,
    WohnsitzTypes: WohnsitzTypes,
    AufenthaltsortTypes: AufenthaltsortTypes,
};

export class DemografieAction implements AppStateAction {
    readonly type = DemografieActionTypes.DemografieTypes;
    constructor(public payload?: any) {
    }
}
// Get xUserHistory
export namespace xUserHistoryInitData {
    export class LoadAction implements AppStateAction {
        readonly type = DemografieActionTypes.xUserHistoryTypes.LOAD;
        constructor(public payload?: any) {
        }
    }
    export class LoadSuccessAction implements AppStateAction {
        readonly type = DemografieActionTypes.xUserHistoryTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class LoadFailAction implements AppStateAction {
        readonly type = DemografieActionTypes.xUserHistoryTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}
// Get Personalien
export namespace PersonalienInitData {
    export class LoadAction implements AppStateAction {
        readonly type = DemografieActionTypes.PersonalienTypes.LOAD;
        constructor(public payload?: any) {
        }
    }
    export class LoadSuccessAction implements AppStateAction {
        readonly type = DemografieActionTypes.PersonalienTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class LoadFailAction implements AppStateAction {
        readonly type = DemografieActionTypes.PersonalienTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}
// Get Wohnsitz
export namespace WohnsitzInitData {
    export class LoadAction implements AppStateAction {
        readonly type = DemografieActionTypes.WohnsitzTypes.LOAD;
        constructor(public payload?: any) {
        }
    }
    export class LoadSuccessAction implements AppStateAction {
        readonly type = DemografieActionTypes.WohnsitzTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class LoadFailAction implements AppStateAction {
        readonly type = DemografieActionTypes.WohnsitzTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}
// Get Aufenthaltsort
export namespace AufenthaltsortInitData {
    export class LoadAction implements AppStateAction {
        readonly type = DemografieActionTypes.AufenthaltsortTypes.LOAD;
        constructor(public payload?: any) {
        }
    }
    export class LoadSuccessAction implements AppStateAction {
        readonly type = DemografieActionTypes.AufenthaltsortTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class LoadFailAction implements AppStateAction {
        readonly type = DemografieActionTypes.AufenthaltsortTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}
export type DemografieActions = DemografieAction
    | xUserHistoryInitData.LoadAction
    | xUserHistoryInitData.LoadSuccessAction
    | xUserHistoryInitData.LoadFailAction
    | PersonalienInitData.LoadAction
    | PersonalienInitData.LoadSuccessAction
    | PersonalienInitData.LoadFailAction
    | WohnsitzInitData.LoadAction
    | WohnsitzInitData.LoadSuccessAction
    | WohnsitzInitData.LoadFailAction
    | AufenthaltsortInitData.LoadAction
    | AufenthaltsortInitData.LoadSuccessAction
    | AufenthaltsortInitData.LoadFailAction;
