import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';
import { GetKontakt, GetInstitution, PostKontakt } from '../../models';


const BeraterDatasTypes = {
  LOAD: type('[Berater InitDatas] Load'),
  LOAD_SUCCESS: type('[Berater InitDatas] Load Success'),
  LOAD_FAIL: type('[Berater InitDatas] Load Fail')
};
// VDHoan start types
const BeraterLoadKontaktTypes = {
  LOAD: type('[Berater LoadKontakt] Load'),
  LOAD_SUCCESS: type('[Berater LoadKontakt] Load Success'),
  LOAD_FAIL: type('[Berater LoadKontakt] Load Fail')
};
const BeraterLoadInstitutionTypes = {
  LOAD: type('[Berater LoadInstitution] Load'),
  LOAD_SUCCESS: type('[Berater LoadInstitution] Load Success'),
  LOAD_FAIL: type('[Berater LoadInstitution] Load Fail')
};
const BeraterLoadLanguageTypes = {
  LOAD: type('[Berater LoadLanguage] Load'),
  LOAD_SUCCESS: type('[Berater LoadLanguage] Load Success'),
  LOAD_FAIL: type('[Berater LoadLanguage] Load Fail')
};
const BeraterPostBaInstitutionKontaktTypes = {
  POST: type('[Berater PostBaInstitutionKontakt] Post'),
  POST_SUCCESS: type('[Berater PostBaInstitutionKontakt] Post Success'),
  POST_FAIL: type('[Berater PostBaInstitutionKontakt] Post Fail')
};
const BeraterDelBaInstitutionKontaktTypes = {
  DEL: type('[Berater DelBaInstitutionKontakt] Del'),
  DEL_SUCCESS: type('[Berater DelBaInstitutionKontakt] Del Success'),
  DEL_FAIL: type('[Berater DelBaInstitutionKontakt] Del Fail')
};
// VDHoan end types

export const BeraterActionTypes = {
  BeraterAction: type('[Berater] Action'),
  BeraterDatasTypes: BeraterDatasTypes,
  BeraterLoadKontaktTypes: BeraterLoadKontaktTypes,
  BeraterLoadInstitutionTypes: BeraterLoadInstitutionTypes,
  BeraterLoadLanguageTypes: BeraterLoadLanguageTypes,
  BeraterPostBaInstitutionKontaktTypes: BeraterPostBaInstitutionKontaktTypes,
  BeraterDelBaInstitutionKontaktTypes: BeraterDelBaInstitutionKontaktTypes,
};

export class BeraterAction implements AppStateAction {
  readonly type = BeraterActionTypes.BeraterAction;
  constructor(public payload?: any) { }
}

export namespace BeraterDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BeraterDatasTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BeraterDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BeraterDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
// VDHoan start action
export namespace BeraterLoadKontaktAction {
  export class LoadAction implements AppStateAction {
    readonly type = BeraterLoadKontaktTypes.LOAD;
    constructor(public payload?: GetKontakt) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BeraterLoadKontaktTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BeraterLoadKontaktTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace BeraterLoadInstitutionAction {
  export class LoadAction implements AppStateAction {
    readonly type = BeraterLoadInstitutionTypes.LOAD;
    constructor(public payload?: GetInstitution) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BeraterLoadInstitutionTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BeraterLoadInstitutionTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace BeraterLoadLanguageAction {
  export class LoadAction implements AppStateAction {
    readonly type = BeraterLoadLanguageTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BeraterLoadLanguageTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BeraterLoadLanguageTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace BeraterPostBaInstitutionKontaktAction {
  export class PostAction implements AppStateAction {
    readonly type = BeraterPostBaInstitutionKontaktTypes.POST;
    constructor(public payload?: PostKontakt) { }
  }

  export class PostSuccessAction implements AppStateAction {
    readonly type = BeraterPostBaInstitutionKontaktTypes.POST_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PostFailAction implements AppStateAction {
    readonly type = BeraterPostBaInstitutionKontaktTypes.POST_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace BeraterDelBaInstitutionKontaktAction {
  export class DelAction implements AppStateAction {
    readonly type = BeraterDelBaInstitutionKontaktTypes.DEL;
    constructor(public payload?: any) { }
  }

  export class DelSuccessAction implements AppStateAction {
    readonly type = BeraterDelBaInstitutionKontaktTypes.DEL_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DelFailAction implements AppStateAction {
    readonly type = BeraterDelBaInstitutionKontaktTypes.DEL_FAIL;
    constructor(public payload?: any) { }
  }
}
// VDHoan end action

export type BeraterActions
  = BeraterAction
  | BeraterDatas.LoadAction
  | BeraterLoadKontaktAction.LoadAction | BeraterLoadKontaktAction.LoadSuccessAction | BeraterLoadKontaktAction.LoadFailAction
  | BeraterLoadInstitutionAction.LoadAction | BeraterLoadInstitutionAction.LoadSuccessAction | BeraterLoadInstitutionAction.LoadFailAction
  | BeraterLoadLanguageAction.LoadAction | BeraterLoadLanguageAction.LoadSuccessAction | BeraterLoadLanguageAction.LoadFailAction
  | BeraterPostBaInstitutionKontaktAction.PostAction | BeraterPostBaInstitutionKontaktAction.PostSuccessAction | BeraterPostBaInstitutionKontaktAction.PostFailAction
  | BeraterDelBaInstitutionKontaktAction.DelAction | BeraterDelBaInstitutionKontaktAction.DelSuccessAction | BeraterDelBaInstitutionKontaktAction.DelFailAction;

