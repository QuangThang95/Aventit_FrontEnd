import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

// Add action for load data for DPL select box data
const BerechnungsgrundlageSelectboxDataTypes = {
  LOAD: type('[Grund-Bedarf] Load Berechnungsgrundlage select box'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Berechnungsgrundlage select box Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Berechnungsgrundlage select box Fail')
};
// Add action for load data for Form data
const GrundBedarfFormDataTypes = {
  LOAD: type('[Grund-Bedarf] Load Form data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Form data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Form data Fail')
};
// Add action for update Form data
const GrundBedarfUpdateFormDataTypes = {
  UPDATE_FORM_DATA: type('[Grund-Bedarf] Update Form data'),
  UPDATING_FORM_DATA: type('[Grund-Bedarf] Updating Form data'),
  UPDATE_FORM_DATA_SUCCESS: type('[Grund-Bedarf] Update Form data Success'),
  UPDATE_FORM_DATA_FAIL: type('[Grund-Bedarf] Update Form data Fail')
};
// Add action for load status code data
const GetStatusCodeTypes = {
  LOAD: type('[Grund-Bedarf] Load Status Code'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Status Code Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Status Code Fail')
};

export const GrundBedarfActionTypes = {
  GrundBedarfAction: type('[Grund-Bedarf] Action'),
  BerechnungsgrundlageSelectboxDataTypes: BerechnungsgrundlageSelectboxDataTypes,
  GrundBedarfFormDataTypes: GrundBedarfFormDataTypes,
  GrundBedarfUpdateFormDataTypes: GrundBedarfUpdateFormDataTypes,
  GetStatusCodeTypes: GetStatusCodeTypes,
};

export class GrundBedarfAction implements AppStateAction {
  readonly type = GrundBedarfActionTypes.GrundBedarfAction;
  constructor(public payload?: any) {
  }
}

// Load Berechnungsgrundlage select box Data
export namespace LoadDataSourceSelectboxData {
  export class LoadDataSourceSelectboxDataAction implements AppStateAction {
    readonly type = BerechnungsgrundlageSelectboxDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadDataSourceSelectboxDataSuccessAction implements AppStateAction {
    readonly type = BerechnungsgrundlageSelectboxDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadDataSourceSelectboxDataFailAction implements AppStateAction {
    readonly type = BerechnungsgrundlageSelectboxDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load data for Form
export namespace GrundBedarfFormData {
  export class LoadGrundBedarfFormDataAction implements AppStateAction {
    readonly type = GrundBedarfFormDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfFormDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfFormDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfFormDataFailAction implements AppStateAction {
    readonly type = GrundBedarfFormDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Update Form data
export namespace GrundBedarfUpdateFormData {
  export class UpdateGrundBedarfFormDataAction implements AppStateAction {
    readonly type = GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA;
    constructor(public payload?: any) {
    }
  }

  export class UpdateGrundBedarfFormDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateGrundBedarfFormDataFailAction implements AppStateAction {
    readonly type = GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Get status code
export namespace LoadStatusCodeData {
  export class LoadStatusCodeDataAction implements AppStateAction {
    readonly type = GetStatusCodeTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadStatusCodeDataSuccessAction implements AppStateAction {
    readonly type = GetStatusCodeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadStatusCodeDataFailAction implements AppStateAction {
    readonly type = GetStatusCodeTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type GrundBedarfActions
  = GrundBedarfAction
  | LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction
  | LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataSuccessAction
  | LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataFailAction
  | GrundBedarfFormData.LoadGrundBedarfFormDataAction
  | GrundBedarfFormData.LoadGrundBedarfFormDataSuccessAction
  | GrundBedarfFormData.LoadGrundBedarfFormDataFailAction
  | GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataAction
  | GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataSuccessAction
  | GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataFailAction
  | LoadStatusCodeData.LoadStatusCodeDataAction
  | LoadStatusCodeData.LoadStatusCodeDataSuccessAction
  | LoadStatusCodeData.LoadStatusCodeDataFailAction;
