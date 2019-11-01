import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';
import { AHVBeitragPosition, BgSilAHVBeitrag, LookUps, PersonenUnterstuetzt, SqlQueryShPositionTyp, DropDownAnpassung } from '../../models';
import { ResSuccess } from '@shared/models/shared/res-success.model';
const AhvBeitragePositionTypes = {
  LOAD: type('[AhvBeitrage] Load'),
  LOAD_SUCCESS: type('[AhvBeitrage] Load Success'),
  LOAD_FAIL: type('[AhvBeitrage] Load Fail')
};

const BgSilAHVBeitragTypes = {
  LOAD: type('[BgSilAHVBeitrag] Load'),
  LOAD_SUCCESS: type('[BgSilAHVBeitrag] Load Success'),
  LOAD_FAIL: type('[BgSilAHVBeitrag] Load Fail')
};

const PersonenUnterstuetztTypes = {
  LOAD: type('[PersonenUnterstuetzt] Load'),
  LOAD_SUCCESS: type('[PersonenUnterstuetzt] Load Success'),
  LOAD_FAIL: type('[PersonenUnterstuetzt] Load Fail')
};

const SqlQueryShPositionTypTypes = {
  LOAD: type('[SqlQueryShPositionTyp] Load'),
  LOAD_SUCCESS: type('[SqlQueryShPositionTyp] Load Success'),
  LOAD_FAIL: type('[SqlQueryShPositionTyp] Load Fail')
};

const InstitutionSuchenWhTypes = {
  LOAD: type('[InstitutionSuchenWh] Load'),
  LOAD_SUCCESS: type('[InstitutionSuchenWh] Load Success'),
  LOAD_FAIL: type('[InstitutionSuchenWh] Load Fail')
};

const AhvBeitragePositionDeleteTypes = {
  LOAD: type('[AhvBeitragePositionDelete] Load'),
  LOAD_SUCCESS: type('[AhvBeitragePositionDelete] Load Success'),
  LOAD_FAIL: type('[AhvBeitragePositionDelete] Load Fail')
};

const AhvBeitragePositionUpdateTypes = {
  LOAD: type('[AhvBeitragePositionUpdate] Load'),
  LOAD_SUCCESS: type('[AhvBeitragePositionUpdate] Load Success'),
  LOAD_FAIL: type('[AhvBeitragePositionUpdate] Load Fail')
};

const AhvBeitragePositionCreateTypes = {
  LOAD: type('[AhvBeitragePositionCreate] Load'),
  LOAD_SUCCESS: type('[AhvBeitragePositionCreate] Load Success'),
  LOAD_FAIL: type('[AhvBeitragePositionCreate] Load Fail')
};

const LookUpsTypes = {
  LOAD: type('[LookUpsTypes] Load'),
  LOAD_SUCCESS: type('[LookUpsTypes] Load Success'),
  LOAD_FAIL: type('[LookUpsTypes] Load Fail')
};

const DropDownAnpassungTypes = {
  LOAD: type('[DropDownAnpassungTypes] Load'),
  LOAD_SUCCESS: type('[DropDownAnpassungTypes] Load Success'),
  LOAD_FAIL: type('[DropDownAnpassungTypes] Load Fail')
};

export const AhvBeitrageActionTypes = {
  AhvBeitrageAction: type('[AhvBeitrage] Action'),
  AhvBeitragePositionTypes: AhvBeitragePositionTypes,
  BgSilAHVBeitragTypes: BgSilAHVBeitragTypes,
  PersonenUnterstuetztTypes: PersonenUnterstuetztTypes,
  SqlQueryShPositionTypTypes: SqlQueryShPositionTypTypes,
  InstitutionSuchenWhTypes: InstitutionSuchenWhTypes,
  AhvBeitragePositionDeleteTypes: AhvBeitragePositionDeleteTypes,
  AhvBeitragePositionUpdateTypes: AhvBeitragePositionUpdateTypes,
  AhvBeitragePositionCreateTypes: AhvBeitragePositionCreateTypes,
  LookUpsTypes: LookUpsTypes,
  DropDownAnpassungTypes: DropDownAnpassungTypes
};

export class AhvBeitrageAction implements AppStateAction {
  readonly type = AhvBeitrageActionTypes.AhvBeitrageAction;

  constructor(public payload?: any) { }
}

// Ahv Beitrage Position Actions
export namespace AhvBeitragePositionDatas {
  export class LoadAction implements AppStateAction {
    readonly type = AhvBeitragePositionTypes.LOAD;

    constructor(public payload?: AHVBeitragPosition) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AhvBeitragePositionTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AhvBeitragePositionTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// BgSilAHVBeitrag Actions
export namespace BgSilAHVBeitragDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgSilAHVBeitragTypes.LOAD;

    constructor(public payload?: BgSilAHVBeitrag) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BgSilAHVBeitragTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BgSilAHVBeitragTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// PersonenUnterstuetzt Actions
export namespace PersonenUnterstuetztDatas {
  export class LoadAction implements AppStateAction {
    readonly type = PersonenUnterstuetztTypes.LOAD;

    constructor(public payload?: PersonenUnterstuetzt) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PersonenUnterstuetztTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PersonenUnterstuetztTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// SqlQueryShPosition Actions
export namespace SqlQueryShPositionTypDatas {
  export class LoadAction implements AppStateAction {
    readonly type = SqlQueryShPositionTypTypes.LOAD;

    constructor(public payload?: SqlQueryShPositionTyp) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = SqlQueryShPositionTypTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = SqlQueryShPositionTypTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// InstitutionSuchenWh Actions
export namespace InstitutionSuchenWhDatas {
  export class LoadAction implements AppStateAction {
    readonly type = InstitutionSuchenWhTypes.LOAD;

    constructor(public payload?: SqlQueryShPositionTyp) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = InstitutionSuchenWhTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = InstitutionSuchenWhTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// AHVBeitrage Actions delete
export namespace AhvBeitragePositionDeleteDatas {
  export class LoadAction implements AppStateAction {
    readonly type = AhvBeitragePositionDeleteTypes.LOAD;

    constructor(public payload?: AHVBeitragPosition) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AhvBeitragePositionDeleteTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AhvBeitragePositionDeleteTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// AHVBeitrage Actions update
export namespace AhvBeitragePositionUpdateDatas {
  export class LoadAction implements AppStateAction {
    readonly type = AhvBeitragePositionUpdateTypes.LOAD;

    constructor(public payload?: AHVBeitragPosition) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AhvBeitragePositionUpdateTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AhvBeitragePositionUpdateTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// LookUps Actions create
export namespace LookUpsDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LookUpsTypes.LOAD;

    constructor(public payload?: LookUps) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = LookUpsTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = LookUpsTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// AhvBeitrage Actions create
export namespace AhvBeitragePositionCreateDatas {
  export class LoadAction implements AppStateAction {
    readonly type = AhvBeitragePositionCreateTypes.LOAD;

    constructor(public payload?: AHVBeitragPosition) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AhvBeitragePositionCreateTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AhvBeitragePositionCreateTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// AhvBeitrage Actions create
export namespace DropDownAnpassungDatas {
  export class LoadAction implements AppStateAction {
    readonly type = DropDownAnpassungTypes.LOAD;

    constructor(public payload?: DropDownAnpassung) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = DropDownAnpassungTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = DropDownAnpassungTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export type AhvBeitrageActions
  = AhvBeitrageAction
  | AhvBeitragePositionDatas.LoadAction
  | AhvBeitragePositionDatas.LoadSuccessAction
  | AhvBeitragePositionDatas.LoadFailAction
  | BgSilAHVBeitragDatas.LoadAction
  | BgSilAHVBeitragDatas.LoadSuccessAction
  | BgSilAHVBeitragDatas.LoadFailAction
  | PersonenUnterstuetztDatas.LoadAction
  | PersonenUnterstuetztDatas.LoadSuccessAction
  | PersonenUnterstuetztDatas.LoadFailAction
  | SqlQueryShPositionTypDatas.LoadAction
  | SqlQueryShPositionTypDatas.LoadSuccessAction
  | SqlQueryShPositionTypDatas.LoadFailAction
  | InstitutionSuchenWhDatas.LoadAction
  | InstitutionSuchenWhDatas.LoadSuccessAction
  | InstitutionSuchenWhDatas.LoadFailAction
  | AhvBeitragePositionDeleteDatas.LoadAction
  | AhvBeitragePositionDeleteDatas.LoadSuccessAction
  | AhvBeitragePositionDeleteDatas.LoadFailAction
  | AhvBeitragePositionUpdateDatas.LoadAction
  | AhvBeitragePositionUpdateDatas.LoadSuccessAction
  | AhvBeitragePositionUpdateDatas.LoadFailAction
  | AhvBeitragePositionCreateDatas.LoadAction
  | AhvBeitragePositionCreateDatas.LoadSuccessAction
  | AhvBeitragePositionCreateDatas.LoadFailAction
  | DropDownAnpassungDatas.LoadAction
  | DropDownAnpassungDatas.LoadSuccessAction
  | DropDownAnpassungDatas.LoadFailAction;
