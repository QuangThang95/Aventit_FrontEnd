import {type} from '@shared/utilites';
import {AppStateAction} from '@shared/AppAction';
import {HaushaltQuery, IHaushalt, IKlientenSystem, InitData, IPersonenImHaushalt, IWhKennzahlen, KlientenSystemQuery, PersonenImHaushaltQuery, SaveWhPersonenQuery, TreeNav, WhKennzahlenQuery} from '../../models';

const personenImHaushaltInitDataTypes = {
  LOAD: type('[personen-im-haushalt InitDatas] Load'),
  LOAD_SUCCESS: type('[personen-im-haushalt InitDatas] Load Success'),
  LOAD_FAIL: type('[personen-im-haushalt InitDatas] Load Fail')
};
const personenImHaushaltOrganisationTypes = {
  LOAD: type('[Suche Organisation] Load'),
  LOAD_SUCCESS: type('[Suche Organisation] Load Success'),
  LOAD_FAIL: type('[Suche Organisation] Load Fail')
};
const personenImHaushaltNavTreeTypes = {
  LOAD: type('[personen-im-haushalt nav Trees] Load'),
  LOAD_SUCCESS: type('[personen-im-haushalt nav Trees] Load Success'),
  LOAD_FAIL: type('[personen-im-haushalt nav Trees] Load Fail'),
  GET_TREE_DETAIL: type(
    '[GET_TREE_DETAIL] Load detail personen-im-haushalt Tree'
  )
};
const personenImHaushaltTypes = {
  LOAD: type('[personen-im-haushalt] Load'),
  LOAD_SUCCESS: type('[personen-im-haushalt] Load Success'),
  LOAD_FAIL: type('[personen-im-haushalt] Load Fail')
};
const personenTypes = {
  LOAD: type('[personen] Load'),
  LOAD_SUCCESS: type('[personen] Load Success'),
  LOAD_FAIL: type('[personen] Load Fail')
};
const whKennzahlenTypes = {
  LOAD: type('[whKennzahlen] Load'),
  LOAD_SUCCESS: type('[whKennzahlen] Load Success'),
  LOAD_FAIL: type('[whKennzahlen] Load Fail')
};
const klientenSystemTypes = {
  LOAD: type('[klientenSystem] Load'),
  LOAD_SUCCESS: type('[klientenSystem] Load Success'),
  LOAD_FAIL: type('[klientenSystem] Load Fail')
};
const haushaltTypes = {
  LOAD: type('[haushalt] Load'),
  LOAD_SUCCESS: type('[haushalt] Load Success'),
  LOAD_FAIL: type('[haushalt] Load Fail')
};
const putPersonenImHaushaltTypes = {
  PUT: type('[PersonenImHaushalt] Put'),
  PUT_SUCCESS: type('[PersonenImHaushalt] Put Success'),
  PUT_FAIL: type('[PersonenImHaushalt] Put Fail')
};

export const personenImHaushaltActionTypes = {
  personenImHaushaltAction: type('[personen-im-haushalt] Action'),
  personenImHaushaltInitDatasTypes: personenImHaushaltInitDataTypes,
  personenImHaushaltTypes,
  personenTypes,
  whKennzahlenTypes,
  klientenSystemTypes,
  haushaltTypes,
  putPersonenImHaushaltTypes,
};

export class PersonenImHaushaltActions implements AppStateAction {
  readonly type = personenImHaushaltActionTypes.personenImHaushaltAction;

  constructor(public payload?: any) {
  }
}

/**
 * *****************************************************************
 * personen-im-haushaltInitDatasTypes Actions
 * *****************************************************************
 */
export namespace PersonenImHaushaltInitData {
  export class LoadAction implements AppStateAction {
    readonly type = personenImHaushaltInitDataTypes.LOAD;

    constructor(public payload?: number) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = personenImHaushaltInitDataTypes.LOAD_SUCCESS;

    constructor(public payload?: InitData[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = personenImHaushaltInitDataTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * personen-im-haushaltNavTreeTypes Action
 */
export namespace PersonenImHaushaltNavTreeAction {
  export class LoadAction implements AppStateAction {
    readonly type = personenImHaushaltNavTreeTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = personenImHaushaltNavTreeTypes.LOAD_SUCCESS;

    constructor(public payload?: TreeNav[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = personenImHaushaltNavTreeTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }

  export class GetTreeDetailAction implements AppStateAction {
    readonly type = personenImHaushaltNavTreeTypes.GET_TREE_DETAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * personen-im-haushaltTypes Action
 */
export namespace PersonenImHaushaltAction {
  export class LoadAction implements AppStateAction {
    readonly type = personenImHaushaltTypes.LOAD;

    constructor(public payload?: PersonenImHaushaltQuery) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = personenImHaushaltTypes.LOAD_SUCCESS;

    constructor(public payload?: IPersonenImHaushalt) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = personenImHaushaltTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * personen Action
 */
export namespace PersonenAction {
  export class LoadAction implements AppStateAction {
    readonly type = personenTypes.LOAD;

    constructor(public payload?: PersonenImHaushaltQuery) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = personenTypes.LOAD_SUCCESS;

    constructor(public payload?: IPersonenImHaushalt) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = personenTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * WhKennzahlen Action
 */
export namespace WhKennzahlenAction {
  export class LoadAction implements AppStateAction {
    readonly type = whKennzahlenTypes.LOAD;

    constructor(public payload?: WhKennzahlenQuery) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = whKennzahlenTypes.LOAD_SUCCESS;

    constructor(public payload?: IWhKennzahlen) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = whKennzahlenTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * KlientenSystem Action
 */
export namespace KlientenSystemAction {
  export class LoadAction implements AppStateAction {
    readonly type = klientenSystemTypes.LOAD;

    constructor(public payload?: KlientenSystemQuery) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = klientenSystemTypes.LOAD_SUCCESS;

    constructor(public payload?: IKlientenSystem) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = klientenSystemTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * Haushalt Action
 */
export namespace HaushaltAction {
  export class LoadAction implements AppStateAction {
    readonly type = haushaltTypes.LOAD;

    constructor(public payload?: HaushaltQuery) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = haushaltTypes.LOAD_SUCCESS;

    constructor(public payload?: IHaushalt) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = haushaltTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

/**
 * Put Personen Im Haushalt Action
 */
export namespace PutPersonenImHaushaltAction {
  export class PutAction implements AppStateAction {
    readonly type = putPersonenImHaushaltTypes.PUT;

    constructor(public payload?: any) {
    }
  }

  export class PutSuccessAction implements AppStateAction {
    readonly type = putPersonenImHaushaltTypes.PUT_SUCCESS;

    constructor(public payload?: SaveWhPersonenQuery) {
    }
  }

  export class PutFailAction implements AppStateAction {
    readonly type = putPersonenImHaushaltTypes.PUT_FAIL;

    constructor(public payload?: any) {
    }
  }
}

export type personenImHaushaltAction
  = PersonenImHaushaltActions
  | PersonenImHaushaltInitData.LoadAction
  | PersonenImHaushaltInitData.LoadSuccessAction
  | PersonenImHaushaltInitData.LoadFailAction
  | PersonenImHaushaltAction.LoadAction
  | PersonenImHaushaltAction.LoadFailAction
  | PersonenImHaushaltAction.LoadSuccessAction

  | PersonenAction.LoadAction
  | PersonenAction.LoadFailAction
  | PersonenAction.LoadSuccessAction
  | WhKennzahlenAction.LoadAction
  | WhKennzahlenAction.LoadFailAction
  | WhKennzahlenAction.LoadSuccessAction
  | KlientenSystemAction.LoadAction
  | KlientenSystemAction.LoadFailAction
  | KlientenSystemAction.LoadSuccessAction
  | HaushaltAction.LoadAction
  | HaushaltAction.LoadFailAction
  | HaushaltAction.LoadSuccessAction
  | PutPersonenImHaushaltAction.PutAction
  | PutPersonenImHaushaltAction.PutFailAction
  | PutPersonenImHaushaltAction.PutSuccessAction;
