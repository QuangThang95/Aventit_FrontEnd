import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';
import {
  InitData,
  BetreffBeschreibung,
  BetriffPerson,
  ErfassungMutation,
  Falltraeger,
  VwUser,
  Leistungsverantw,
  XOrgUnit,
  XLOVCode,
  TreeNav,
  ModulenStatus,
  Pendenzgruppe,
  PendenzenVerwaltung,
  ErfassungMutationQuery,
  LovCodeQuery,
  PendenzenVerwaltungQuery
} from '../../models';

const PendenzenInitDatasTypes = {
  LOAD: type('[PendenzenVerwaltung InitDatas] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung InitDatas] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung InitDatas] Load Fail')
};
const PendenzenBetreffBeschreibungsTypes = {
  LOAD: type('[PendenzenVerwaltung BetreffBeschreibungs] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung BetreffBeschreibungs] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung BetreffBeschreibungs] Load Fail')
};
const PendenzenBetriffPersonsTypes = {
  LOAD: type('[PendenzenVerwaltung BetriffPersons] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung BetriffPersons] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung BetriffPersons] Load Fail')
};

const PendenzenErstellerEmpfaengerTypes = {
  LOAD: type('[Suche ErstellerEmpfaenger] Load'),
  LOAD_SUCCESS: type('[Suche ErstellerEmpfaenger] Load Success'),
  LOAD_FAIL: type('[Suche ErstellerEmpfaenger] Load Fail')
};
const PendenzenVerwaltungFalltraegersTypes = {
  LOAD: type('[PendenzenVerwaltung Falltraegers] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung Falltraegers] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung Falltraegers] Load Fail')
};
const PendenzenLeistungsTypes = {
  LOAD: type('[Suche Leistungs] Load'),
  LOAD_SUCCESS: type('[Suche Leistungs] Load Success'),
  LOAD_FAIL: type('[Suche Leistungs] Load Fail')
};
const PendenzenLeistungsverantwsTypes = {
  LOAD: type('[Suche Leistungsverantws] Load'),
  LOAD_SUCCESS: type('[Suche Leistungsverantws] Load Success'),
  LOAD_FAIL: type('[Suche Leistungsverantws] Load Fail')
};
const PendenzenLeistungsverantwTypes = {
  LOAD: type('[Suche Leistungsverantw] Load'),
  LOAD_SUCCESS: type('[Suche Leistungsverantw] Load Success'),
  LOAD_FAIL: type('[Suche Leistungsverantw] Load Fail')
};
const PendenzenOrganisationTypes = {
  LOAD: type('[Suche Organisation] Load'),
  LOAD_SUCCESS: type('[Suche Organisation] Load Success'),
  LOAD_FAIL: type('[Suche Organisation] Load Fail')
};
const PendenzenStatusTypes = {
  LOAD: type('[Suche Status] Load'),
  LOAD_SUCCESS: type('[Suche Status] Load Success'),
  LOAD_FAIL: type('[Suche Status] Load Fail')
};
const PendenzenWithTypeTypes = {
  LOAD: type('[Suche Type] Load'),
  LOAD_SUCCESS: type('[Suche Type] Load Success'),
  LOAD_FAIL: type('[Suche Type] Load Fail')
};

const PendenzenVerwaltungErfassungMutationTypes = {
  LOAD: type('[PendenzenVerwaltung ErfassungMutation] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung ErfassungMutation] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung ErfassungMutation] Load Fail')
};
const PendenzenVerwaltungNavTreeTypes = {
  LOAD: type('[PendenzenVerwaltung nav Trees] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung nav Trees] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung nav Trees] Load Fail'),
  GET_TREE_DETAIL: type(
    '[GET_TREE_DETAIL] Load detail PendenzenVerwaltung Tree'
  )
};
const PendenzenVerwaltungModulenStatusTypes = {
  LOAD: type('[PendenzenVerwaltung ModulenStatus] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung ModulenStatus] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung ModulenStatus] Load Fail')
};
const PendenzenVerwaltungStatusEditTypes = {
  LOAD: type('[PendenzenVerwaltung StatusEdit] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung StatusEdit] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung StatusEdit] Load Fail')
};
const PendenzenVerwaltungTypes = {
  LOAD: type('[PendenzenVerwaltungs] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltungs] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltungs] Load Fail')
};
const PendenzenVerwaltungInsertTypes = {
  ADD_NEW: type('[PendenzenVerwaltung] Add new'),
  ADDING: type('[PendenzenVerwaltung] Adding'),
  ADD_SUCCESS: type(
    '[PendenzenVerwaltung] Add new  success'
  ),
  ADD_FAIL: type('[PendenzenVerwaltung] Add new Fail')
};
const PendenzenVerwaltungUpdateTypes = {
  UPDATE: type('[PendenzenVerwaltung] Update'),
  UPDATING: type('[PendenzenVerwaltung] Updating'),
  UPDATE_SUCCESS: type('[PendenzenVerwaltung] Update Success'),
  UPDATE_FAIL: type('[PendenzenVerwaltung] Update Fail')
};

const PendenzenVerwaltungGetMasterTypes = {
  LOAD: type('[PendenzenVerwaltung get Master] Load'),
  LOAD_SUCCESS: type('[PendenzenVerwaltung get Master] Load Success'),
  LOAD_FAIL: type('[PendenzenVerwaltung get Master] Load Fail'),
  GET_MASTER_DETAIL: type(
    '[GET_MASTER_DETAIL] Load detail PendenzenVerwaltung Get Master'
  )
};

export const PendenzensActionTypes = {
  PendenzensAction: type('[Pendenzens] Action'),
  PendenzenInitDatasTypes: PendenzenInitDatasTypes,
  PendenzenBetreffBeschreibungsTypes: PendenzenBetreffBeschreibungsTypes,
  PendenzenBetriffPersonsTypes: PendenzenBetriffPersonsTypes,
  PendenzenErstellerEmpfaengerTypes: PendenzenErstellerEmpfaengerTypes,
  PendenzenVerwaltungFalltraegersTypes: PendenzenVerwaltungFalltraegersTypes,
  PendenzenLeistungsTypes: PendenzenLeistungsTypes,
  PendenzenLeistungsverantwsTypes: PendenzenLeistungsverantwsTypes,
  PendenzenLeistungsverantwTypes: PendenzenLeistungsverantwTypes,
  PendenzenOrganisationTypes: PendenzenOrganisationTypes,
  PendenzenStatusTypes: PendenzenStatusTypes,
  PendenzenWithTypeTypes: PendenzenWithTypeTypes,
  PendenzenVerwaltungErfassungMutationTypes: PendenzenVerwaltungErfassungMutationTypes,
  PendenzenVerwaltungNavTreeTypes: PendenzenVerwaltungNavTreeTypes,
  PendenzenVerwaltungModulenStatusTypes: PendenzenVerwaltungModulenStatusTypes,
  PendenzenVerwaltungStatusEditTypes: PendenzenVerwaltungStatusEditTypes,
  PendenzenVerwaltungTypes: PendenzenVerwaltungTypes,
  PendenzenVerwaltungInsertTypes: PendenzenVerwaltungInsertTypes,
  PendenzenVerwaltungUpdateTypes: PendenzenVerwaltungUpdateTypes,
  PendenzenVerwaltungGetMasterTypes: PendenzenVerwaltungGetMasterTypes
};

export class PendenzenAction implements AppStateAction {
  readonly type = PendenzensActionTypes.PendenzensAction;
  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * PendenzenInitDatasTypes Actions
 * *****************************************************************
 */
export namespace PendenzenInitDatas {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenInitDatasTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenInitDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: InitData[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenInitDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * *****************************************************************
 * PendenzenBetreffBeschreibungsTypes Actions
 * *****************************************************************
 */
export namespace PendenzenBetreffBeschreibungs {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenBetreffBeschreibungsTypes.LOAD;
    constructor(public payload: number = null) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenBetreffBeschreibungsTypes.LOAD_SUCCESS;
    constructor(public payload?: BetreffBeschreibung[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenBetreffBeschreibungsTypes.LOAD_FAIL;
    constructor(public payload: any = null) { }
  }
}

/**
 * *****************************************************************
 * PendenzenBetriffPersonsTypes Actions
 * *****************************************************************
 */
export namespace PendenzenBetriffPersonsAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenBetriffPersonsTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenBetriffPersonsTypes.LOAD_SUCCESS;
    constructor(public payload?: BetriffPerson[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenBetriffPersonsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenErstellerEmpfaengerTypes Actions
 */
export namespace PendenzenErstellerEmpfaengerAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenErstellerEmpfaengerTypes.LOAD;
    constructor(public payload?: string) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenErstellerEmpfaengerTypes.LOAD_SUCCESS;
    constructor(public payload?: Pendenzgruppe) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenErstellerEmpfaengerTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * PendenzenVerwaltungFalltraegersTypes Actions
 */

export namespace PendenzenVerwaltungFalltraegersAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungFalltraegersTypes.LOAD;
    constructor(public payload?: string) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungFalltraegersTypes.LOAD_SUCCESS;
    constructor(public payload?: Falltraeger[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungFalltraegersTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenLeistungsTypes Actions
 */
export namespace PendenzenLeistungsAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenLeistungsTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenLeistungsTypes.LOAD_SUCCESS;
    constructor(public payload?: VwUser[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenLeistungsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenLeistungsverantwsTypes actions
 */
export namespace PendenzenLeistungsverantwsAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenLeistungsverantwsTypes.LOAD;
    constructor(public payload?: string) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenLeistungsverantwsTypes.LOAD_SUCCESS;
    constructor(public payload?: VwUser[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenLeistungsverantwsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenLeistungsverantwTypes Actions
 */
export namespace PendenzenLeistungsverantwAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenLeistungsverantwTypes.LOAD;
    constructor(public payload?: string) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenLeistungsverantwTypes.LOAD_SUCCESS;
    constructor(public payload?: Leistungsverantw[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenLeistungsverantwTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenOrganisationTypes Actions
 */
export namespace PendenzenOrganisationAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenOrganisationTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenOrganisationTypes.LOAD_SUCCESS;
    constructor(public payload?: XOrgUnit[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenOrganisationTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenStatusTypes Actions
 */
export namespace PendenzenStatusAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenStatusTypes.LOAD;
    constructor(public payload: LovCodeQuery) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenStatusTypes.LOAD_SUCCESS;
    constructor(public payload: XLOVCode[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenStatusTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenWithTypeTypes Actions
 */
export namespace PendenzenWithTypeAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenWithTypeTypes.LOAD;
    constructor(public payload?: string) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenWithTypeTypes.LOAD_SUCCESS;
    constructor(public payload?: XLOVCode[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenWithTypeTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenVerwaltungErfassungMutationTypes Action
 */
export namespace PendenzenVerwaltungErfassungMutationAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungErfassungMutationTypes.LOAD;
    constructor(public payload?: ErfassungMutationQuery) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungErfassungMutationTypes.LOAD_SUCCESS;
    constructor(public payload?: ErfassungMutation) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungErfassungMutationTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }

}
/**
 * PendenzenVerwaltungNavTreeTypes Action
 */
export namespace PendenzenVerwaltungNavTreeAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungNavTreeTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungNavTreeTypes.LOAD_SUCCESS;
    constructor(public payload?: TreeNav[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungNavTreeTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }

  export class GetTreeDetailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungNavTreeTypes.GET_TREE_DETAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenVerwaltungModulenStatusTypes Action
 */
export namespace PendenzenVerwaltungModulenStatusAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungModulenStatusTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungModulenStatusTypes.LOAD_SUCCESS;
    constructor(public payload?: ModulenStatus[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungModulenStatusTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenVerwaltungStatusEditTypes Action
 */
export namespace PendenzenVerwaltungStatusEditAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungStatusEditTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungStatusEditTypes.LOAD_SUCCESS;
    constructor(public payload?: Pendenzgruppe) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungStatusEditTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }

}
/**
 * PendenzenVerwaltungTypes Action
 */
export namespace PendenzenVerwaltungAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungTypes.LOAD;
    constructor(public payload?: PendenzenVerwaltungQuery) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungTypes.LOAD_SUCCESS;
    constructor(public payload?: PendenzenVerwaltung[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * PendenzenVerwaltungInsertTypes Action
 */
export namespace PendenzenVerwaltungInsertAction {
  export class AddNewAction implements AppStateAction {
    readonly type = PendenzenVerwaltungInsertTypes.ADD_NEW;
    constructor(public payload?: PendenzenVerwaltung) { }
  }

  export class AddSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungInsertTypes.ADD_SUCCESS;
    constructor(public payload?: PendenzenVerwaltung) { }
  }

  export class AddFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungInsertTypes.ADD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenVerwaltungUpdateTypes Action
 */
export namespace PendenzenVerwaltungUpdateAction {
  export class UpdateAction implements AppStateAction {
    readonly type = PendenzenVerwaltungUpdateTypes.UPDATE;
    constructor(public payload?: PendenzenVerwaltung) { }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungUpdateTypes.UPDATE_SUCCESS;
    constructor(public payload?: PendenzenVerwaltung) { }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungUpdateTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * PendenzenVerwaltungGetMasterTypes Action
 */
export namespace PendenzenVerwaltungGetMasterAction {
  export class LoadAction implements AppStateAction {
    readonly type = PendenzenVerwaltungGetMasterTypes.LOAD;
    constructor(public payload?: any) {}
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PendenzenVerwaltungGetMasterTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {}
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PendenzenVerwaltungGetMasterTypes.LOAD_FAIL;
    constructor(public payload?: any) {}
  }
}

export type PendenzensActions =
  | PendenzenAction
  | PendenzenInitDatas.LoadAction
  | PendenzenInitDatas.LoadSuccessAction
  | PendenzenInitDatas.LoadFailAction
  | PendenzenBetreffBeschreibungs.LoadAction
  | PendenzenBetreffBeschreibungs.LoadFailAction
  | PendenzenBetreffBeschreibungs.LoadSuccessAction
  | PendenzenBetriffPersonsAction.LoadAction
  | PendenzenBetriffPersonsAction.LoadFailAction
  | PendenzenBetriffPersonsAction.LoadSuccessAction
  | PendenzenErstellerEmpfaengerAction.LoadAction
  | PendenzenErstellerEmpfaengerAction.LoadFailAction
  | PendenzenErstellerEmpfaengerAction.LoadSuccessAction
  | PendenzenVerwaltungFalltraegersAction.LoadAction
  | PendenzenVerwaltungFalltraegersAction.LoadFailAction
  | PendenzenVerwaltungFalltraegersAction.LoadSuccessAction
  | PendenzenLeistungsAction.LoadAction
  | PendenzenLeistungsAction.LoadFailAction
  | PendenzenLeistungsAction.LoadSuccessAction
  | PendenzenLeistungsverantwsAction.LoadAction
  | PendenzenLeistungsverantwsAction.LoadFailAction
  | PendenzenLeistungsverantwsAction.LoadSuccessAction
  | PendenzenLeistungsverantwAction.LoadAction
  | PendenzenLeistungsverantwAction.LoadFailAction
  | PendenzenLeistungsverantwAction.LoadSuccessAction
  | PendenzenOrganisationAction.LoadAction
  | PendenzenOrganisationAction.LoadFailAction
  | PendenzenOrganisationAction.LoadSuccessAction
  | PendenzenOrganisationAction.LoadAction
  | PendenzenOrganisationAction.LoadFailAction
  | PendenzenOrganisationAction.LoadSuccessAction
  | PendenzenWithTypeAction.LoadAction
  | PendenzenWithTypeAction.LoadFailAction
  | PendenzenWithTypeAction.LoadSuccessAction
  | PendenzenVerwaltungErfassungMutationAction.LoadAction
  | PendenzenVerwaltungErfassungMutationAction.LoadFailAction
  | PendenzenVerwaltungErfassungMutationAction.LoadSuccessAction
  | PendenzenVerwaltungNavTreeAction.LoadAction
  | PendenzenVerwaltungNavTreeAction.LoadFailAction
  | PendenzenVerwaltungNavTreeAction.LoadSuccessAction
  | PendenzenVerwaltungNavTreeAction.GetTreeDetailAction
  | PendenzenVerwaltungModulenStatusAction.LoadAction
  | PendenzenVerwaltungModulenStatusAction.LoadFailAction
  | PendenzenVerwaltungModulenStatusAction.LoadSuccessAction
  | PendenzenVerwaltungStatusEditAction.LoadAction
  | PendenzenVerwaltungStatusEditAction.LoadFailAction
  | PendenzenVerwaltungStatusEditAction.LoadSuccessAction
  | PendenzenVerwaltungAction.LoadAction
  | PendenzenVerwaltungAction.LoadFailAction
  | PendenzenVerwaltungAction.LoadSuccessAction
  | PendenzenVerwaltungInsertAction.AddFailAction
  | PendenzenVerwaltungInsertAction.AddNewAction
  | PendenzenVerwaltungInsertAction.AddSuccessAction
  | PendenzenVerwaltungUpdateAction.UpdateAction
  | PendenzenVerwaltungUpdateAction.UpdateFailAction
  | PendenzenVerwaltungUpdateAction.UpdateSuccessAction
  | PendenzenVerwaltungGetMasterAction.LoadSuccessAction
  | PendenzenVerwaltungGetMasterAction.LoadAction
  | PendenzenVerwaltungGetMasterAction.LoadFailAction;
