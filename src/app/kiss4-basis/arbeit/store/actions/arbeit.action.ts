import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const ArbeitTypes = {
  LOAD: type('[Arbeit] Load'),
  LOAD_SUCCESS: type('[Arbeit] Load Success'),
  LOAD_FAIL: type('[Arbeit] Load Fail')
};

const LOVNameTypes = {
  LOAD: type('[LOVName] Load'),
  LOAD_SUCCESS: type('[LOVName] Load Success'),
  LOAD_FAIL: type('[LOVName] Load Fail')
};

const BerufSuchenTypes = {
  LOAD: type('[BerufSuchenArbeit] Load'),
  LOAD_SUCCESS: type('[BerufSuchenArbeit] Load Success'),
  LOAD_FAIL: type('[BerufSuchenArbeit] Load Fail')
};

const IntitutionSuchenTypes = {
  LOAD: type('[IntitutionSuchenArbeit] Load'),
  LOAD_SUCCESS: type('[IntitutionSuchenArbeit] Load Success'),
  LOAD_FAIL: type('[IntitutionSuchenArbeit] Load Fail')
};

const SaveArbeitSuchenTypes = {
  LOAD: type('[SaveArbeit] Load'),
  LOAD_SUCCESS: type('[SaveArbeit] Load Success'),
  LOAD_FAIL: type('[SaveArbeit] Load Fail')
};

export const ArbeitActionTypes = {
  ArbeitAction: type('[Arbeit] Action'),
  ArbeitTypes: ArbeitTypes,
  LOVNameTypes: LOVNameTypes,
  BerufSuchenTypes: BerufSuchenTypes,
  IntitutionSuchenTypes: IntitutionSuchenTypes,
  SaveArbeitSuchenTypes: SaveArbeitSuchenTypes

};

export class ArbeitAction implements AppStateAction {
  readonly type = ArbeitActionTypes.ArbeitAction;
  constructor(public payload?: any) {
  }
}

/**
 * *****************************************************************
 * ArbeitTypes Actions
 * *****************************************************************
 */
export namespace ArbeitDataAction {
  export class LoadAction implements AppStateAction {
    readonly type = ArbeitTypes.LOAD;
    constructor(public payload?: any) {

    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = ArbeitTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = ArbeitTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * LOVNameTypes Actions
 * *****************************************************************
 */
export namespace LOVNameArbeitDataAction {
  export class LoadAction implements AppStateAction {
    readonly type = LOVNameTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = LOVNameTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = LOVNameTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * BerufSuchenTypes Actions
 * *****************************************************************
 */
export namespace BerufSuchenArbeitDataAction {
  export class LoadAction implements AppStateAction {
    readonly type = BerufSuchenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BerufSuchenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BerufSuchenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * IntitutionSuchenTypes Actions
 * *****************************************************************
 */
export namespace InstitutionSuchenArbeitDataAction {
  export class LoadAction implements AppStateAction {
    readonly type = IntitutionSuchenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = IntitutionSuchenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = IntitutionSuchenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * SaveArbeitSuchenTypes Actions
 * *****************************************************************
 */
export namespace SaveArbeitSuchenAction {
  export class LoadAction implements AppStateAction {
    readonly type = SaveArbeitSuchenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = SaveArbeitSuchenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = SaveArbeitSuchenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type ArbeitActions
  = ArbeitAction
  | ArbeitDataAction.LoadAction
  | ArbeitDataAction.LoadSuccessAction
  | ArbeitDataAction.LoadFailAction
  | LOVNameArbeitDataAction.LoadAction
  | LOVNameArbeitDataAction.LoadSuccessAction
  | LOVNameArbeitDataAction.LoadFailAction
  | BerufSuchenArbeitDataAction.LoadAction
  | BerufSuchenArbeitDataAction.LoadSuccessAction
  | BerufSuchenArbeitDataAction.LoadFailAction
  | InstitutionSuchenArbeitDataAction.LoadAction
  | InstitutionSuchenArbeitDataAction.LoadSuccessAction
  | InstitutionSuchenArbeitDataAction.LoadFailAction
  | SaveArbeitSuchenAction.LoadAction
  | SaveArbeitSuchenAction.LoadSuccessAction
  | SaveArbeitSuchenAction.LoadFailAction;