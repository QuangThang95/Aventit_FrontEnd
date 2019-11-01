import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const CultureInfoTypes = {
  LOAD: type('[CultureInfo] Load'),
  LOAD_SUCCESS: type('[CultureInfo] Load Success'),
  LOAD_FAIL: type('[CultureInfo] Load Fail')
};

const DatabaseInfoTypes = {
  LOAD: type('[DatabaseInfo] Load'),
  LOAD_SUCCESS: type('[DatabaseInfo] Load Success'),
  LOAD_FAIL: type('[DatabaseInfo] Load Fail')
};

const DatabaseVersionsTypes = {
  LOAD: type('[DatabaseVersions] Load'),
  LOAD_SUCCESS: type('[DatabaseVersions] Load Success'),
  LOAD_FAIL: type('[DatabaseVersions] Load Fail')
};

const Kiss4WebVersionTypes = {
  LOAD: type('[Kiss4WebVersion] Load'),
  LOAD_SUCCESS: type('[Kiss4WebVersion] Load Success'),
  LOAD_FAIL: type('[Kiss4WebVersion] Load Fail')
};

export const UberActionTypes = {
  UberAction: type('[Uber] Action'),
  CultureInfoTypes: CultureInfoTypes,
  DatabaseInfoTypes: DatabaseInfoTypes,
  DatabaseVersionsTypes: DatabaseVersionsTypes,
  Kiss4WebVersionTypes: Kiss4WebVersionTypes
};

export class UberAction implements AppStateAction {
  readonly type = UberActionTypes.UberAction;
  constructor(public payload?: any) {
  }
}

// CultureInfo
export namespace CultureInfoLoadData {
  export class LoadAction implements AppStateAction {
    readonly type = CultureInfoTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = CultureInfoTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = CultureInfoTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// DatabaseInfo
export namespace DatabaseInfoLoadData {
  export class LoadAction implements AppStateAction {
    readonly type = DatabaseInfoTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = DatabaseInfoTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = DatabaseInfoTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// DatabaseVersions
export namespace DatabaseVersionsLoadData {
  export class LoadAction implements AppStateAction {
    readonly type = DatabaseVersionsTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = DatabaseVersionsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = DatabaseVersionsTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Kiss4WebVersion
export namespace Kiss4WebVersionLoadData {
  export class LoadAction implements AppStateAction {
    readonly type = Kiss4WebVersionTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = Kiss4WebVersionTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = Kiss4WebVersionTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type UberActions
  = UberAction
  | CultureInfoLoadData.LoadAction
  | CultureInfoLoadData.LoadSuccessAction
  | CultureInfoLoadData.LoadFailAction
  | DatabaseInfoLoadData.LoadAction
  | DatabaseInfoLoadData.LoadSuccessAction
  | DatabaseInfoLoadData.LoadFailAction
  | DatabaseVersionsLoadData.LoadAction
  | DatabaseVersionsLoadData.LoadSuccessAction
  | DatabaseVersionsLoadData.LoadFailAction
  | Kiss4WebVersionLoadData.LoadAction
  | Kiss4WebVersionLoadData.LoadSuccessAction
  | Kiss4WebVersionLoadData.LoadFailAction;
