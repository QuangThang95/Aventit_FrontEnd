import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

// Add action for load data for DPL select box data
const PersonSelectboxDataTypes = {
    LOAD: type('[Vermogen] Load Person select box'),
    LOAD_SUCCESS: type('[Vermogen] Load Person select box Success'),
    LOAD_FAIL: type('[Vermogen] Load Person select box Fail')
};

export const VermogenActionTypes = {
    VermogenAction: type('[Vermogen] Action'),
    PersonSelectboxDataTypes: PersonSelectboxDataTypes
};

export class VermogenAction implements AppStateAction {
    readonly type = VermogenActionTypes.VermogenAction;
    constructor(public payload?: any) {
    }
}


// Load Person select box Data
export namespace LoadDataSourceSelectboxData {
    export class LoadDataSourceSelectboxDataAction implements AppStateAction {
        readonly type = PersonSelectboxDataTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadDataSourceSelectboxDataSuccessAction implements AppStateAction {
        readonly type = PersonSelectboxDataTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadDataSourceSelectboxDataFailAction implements AppStateAction {
        readonly type = PersonSelectboxDataTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export type VermogenActions
= VermogenAction
|LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction
|LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataSuccessAction
|LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataFailAction;

