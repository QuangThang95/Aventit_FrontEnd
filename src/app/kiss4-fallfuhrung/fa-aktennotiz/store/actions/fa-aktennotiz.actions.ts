import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';
import {
  InitData,
  TreeNav,
  FaAktennotiz,
  FaAktennotizQuery
} from '../../models';

const FaAktennotizInitDatasTypes = {
  LOAD: type('[FaAktennotiz InitDatas] Load'),
  LOAD_SUCCESS: type('[FaAktennotiz InitDatas] Load Success'),
  LOAD_FAIL: type('[FaAktennotiz InitDatas] Load Fail')
};
const FaAktennotizOrganisationTypes = {
  LOAD: type('[Suche FaAktennotiz] Load'),
  LOAD_SUCCESS: type('[Suche FaAktennotiz] Load Success'),
  LOAD_FAIL: type('[Suche FaAktennotiz] Load Fail')
};
const FaAktennotizNavTreeTypes = {
  LOAD: type('[FaAktennotiz nav Trees] Load'),
  LOAD_SUCCESS: type('[FaAktennotiz nav Trees] Load Success'),
  LOAD_FAIL: type('[FaAktennotiz nav Trees] Load Fail'),
  GET_TREE_DETAIL: type(
    '[GET_TREE_DETAIL] Load detail FaAktennotiz Tree'
  )
};
const FaAktennotizTypes = {
  LOAD: type('[FaAktennotiz] Load'),
  LOAD_SUCCESS: type('[FaAktennotiz] Load Success'),
  LOAD_FAIL: type('[FaAktennotiz] Load Fail')
};
const KontaktartTypes = {
  LOAD: type('[Kontaktart] Load'),
  LOAD_SUCCESS: type('[Kontaktart] Load Success'),
  LOAD_FAIL: type('[Kontaktart] Load Fail')
};
const MitarbeiterTypes = {
  LOAD: type('[Mitarbeiter] Load'),
  LOAD_SUCCESS: type('[Mitarbeiter] Load Success'),
  LOAD_FAIL: type('[Mitarbeiter] Load Fail')
};
const TheMenTypes = {
  LOAD: type('[TheMen] Load'),
  LOAD_SUCCESS: type('[TheMen] Load Success'),
  LOAD_FAIL: type('[TheMen] Load Fail')
};
const AddFaAktennotizenTypes = {
  ADD: type('[AddFaAktennotizen] Add'),
  ADD_SUCCESS: type('[AddFaAktennotizen] Add Success'),
  ADD_FAIL: type('[AddFaAktennotizen] Add Fail')
};
const DeleteFaAktennotizenTypes = {
  DELETE: type('[DeleteFaAktennotizen] Delete'),
  DELETE_SUCCESS: type('[DeleteFaAktennotizen] Delete Success'),
  DELETE_FAIL: type('[DeleteFaAktennotizen] Delete Fail')
};
const UpdateFaAktennotizenTypes = {
  UPDATE: type('[UpdateFaAktennotizen] Update'),
  UPDATE_SUCCESS: type('[UpdateFaAktennotizen] Update Success'),
  UPDATE_FAIL: type('[UpdateFaAktennotizen] Update Fail')
};
const DauerTypes = {
  LOAD: type('[DauerFaAktennotizen] Load'),
  LOAD_SUCCESS: type('[DauerFaAktennotizen] Load Success'),
  LOAD_FAIL: type('[DauerFaAktennotizen] Load Fail')
};
const GetConfigTypes = {
  LOAD: type('[DauerFaAktennotizen] Load Config '),
  LOAD_SUCCESS: type('[DauerFaAktennotizen] Load Config Success'),
  LOAD_FAIL: type('[DauerFaAktennotizen] Load Config Fail')
};
const GetDokumentAktennotizenTypes = {
  LOAD: type('[DokumentAktennotizen] Load'),
  LOAD_SUCCESS: type('[DokumentAktennotizen] Load Success'),
  LOAD_FAIL: type('[DokumentAktennotizen] Load Fail')
};
const GetDefaultKontartPartnerTypes = {
  LOAD: type('[DefaultKontartPartner] Load'),
  LOAD_SUCCESS: type('[DefaultKontartPartner] Load Success'),
  LOAD_FAIL: type('[DefaultKontartPartner] Load Fail')
};

export const FaAktennotizActionTypes = {
  FaAktennotizAction: type('[FaAktennotiz] Action'),
  FaAktennotizInitDatasTypes: FaAktennotizInitDatasTypes,
  FaAktennotizTypes: FaAktennotizTypes,
  KontaktartTypes: KontaktartTypes,
  MitarbeiterTypes: MitarbeiterTypes,
  TheMenTypes: TheMenTypes,
  AddFaAktennotizenTypes: AddFaAktennotizenTypes,
  DeleteFaAktennotizenTypes: DeleteFaAktennotizenTypes,
  UpdateFaAktennotizenTypes: UpdateFaAktennotizenTypes,
  DauerTypes: DauerTypes,
  GetConfigTypes: GetConfigTypes,
  GetDokumentAktennotizenTypes: GetDokumentAktennotizenTypes,
  GetDefaultKontartPartnerTypes: GetDefaultKontartPartnerTypes
};

export class FaAktennotizAction implements AppStateAction {
  readonly type = FaAktennotizActionTypes.FaAktennotizAction;
  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * FaAktennotizInitDatasTypes Actions
 * *****************************************************************
 */
export namespace FaAktennotizInitDatas {
  export class LoadAction implements AppStateAction {
    readonly type = FaAktennotizInitDatasTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FaAktennotizInitDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: InitData[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FaAktennotizInitDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * FaAktennotizNavTreeTypes Action
 */
export namespace FaAktennotizNavTreeAction {
  export class LoadAction implements AppStateAction {
    readonly type = FaAktennotizNavTreeTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FaAktennotizNavTreeTypes.LOAD_SUCCESS;
    constructor(public payload?: TreeNav[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FaAktennotizNavTreeTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }

  export class GetTreeDetailAction implements AppStateAction {
    readonly type = FaAktennotizNavTreeTypes.GET_TREE_DETAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * FaAktennotizTypes Action
 */
export namespace FaAktennotizAction {
  export class LoadAction implements AppStateAction {
    readonly type = FaAktennotizTypes.LOAD;
    constructor(public payload?: FaAktennotizQuery) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FaAktennotizTypes.LOAD_SUCCESS;
    constructor(public payload?: FaAktennotiz[]) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FaAktennotizTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

/**
 * KontaktartTypes Action
 */
export namespace KontaktartAction {
  export class LoadAction implements AppStateAction {
    readonly type = KontaktartTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = KontaktartTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = KontaktartTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * MitarbeiterTypes Action
 */
export namespace MitarbeiterAction {
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
/**
 * TheMenTypes Action
 */
export namespace TheMenAction {
  export class LoadAction implements AppStateAction {
    readonly type = TheMenTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = TheMenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = TheMenTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * AddFaAktennotizenTypes Action
 */
export namespace AddFaAktennotizenAction {
  export class AddAction implements AppStateAction {
    readonly type = AddFaAktennotizenTypes.ADD;
    constructor(public payload?: any) { }
  }

  export class AddSuccessAction implements AppStateAction {
    readonly type = AddFaAktennotizenTypes.ADD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class AddFailAction implements AppStateAction {
    readonly type = AddFaAktennotizenTypes.ADD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * DeleteFaAktennotizenTypes Action
 */
export namespace DeleteFaAktennotizenAction {
  export class DeleteAction implements AppStateAction {
    readonly type = DeleteFaAktennotizenTypes.DELETE;
    constructor(public payload?: any) { }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = DeleteFaAktennotizenTypes.DELETE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = DeleteFaAktennotizenTypes.DELETE_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 *UpdateFaAktennotizenTypes Action
 */
export namespace UpdateFaAktennotizenAction {
  export class UpdateAction implements AppStateAction {
    readonly type = UpdateFaAktennotizenTypes.UPDATE;
    constructor(public payload?: any) { }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = UpdateFaAktennotizenTypes.UPDATE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = UpdateFaAktennotizenTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 *DauerTypes Action
 */
export namespace DauerAction {
  export class LoadAction implements AppStateAction {
    readonly type = DauerTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = DauerTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = DauerTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 *GetConfigTypes Action
 */
export namespace GetConfigData {
  export class LoadAction implements AppStateAction {
    readonly type = GetConfigTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetConfigTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetConfigTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
/**
 *GetConfigTypes Action
 */
export namespace GetDokumentAktennotizen {
  export class LoadAction implements AppStateAction {
    readonly type = GetDokumentAktennotizenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetDokumentAktennotizenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetDokumentAktennotizenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
/**
 *GetDefaultKontartPartner Action
 */
export namespace GetDefaultKontartPartner {
  export class LoadAction implements AppStateAction {
    readonly type = GetDefaultKontartPartnerTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetDefaultKontartPartnerTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetDefaultKontartPartnerTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export type FaAktennotizActions
  = FaAktennotizAction
  | FaAktennotizInitDatas.LoadAction
  | FaAktennotizInitDatas.LoadSuccessAction
  | FaAktennotizInitDatas.LoadFailAction
  | FaAktennotizAction.LoadAction
  | FaAktennotizAction.LoadFailAction
  | FaAktennotizAction.LoadSuccessAction
  | KontaktartAction.LoadAction
  | KontaktartAction.LoadSuccessAction
  | KontaktartAction.LoadFailAction
  | MitarbeiterAction.LoadAction
  | MitarbeiterAction.LoadSuccessAction
  | MitarbeiterAction.LoadFailAction
  | TheMenAction.LoadAction
  | TheMenAction.LoadSuccessAction
  | TheMenAction.LoadFailAction
  | AddFaAktennotizenAction.AddAction
  | AddFaAktennotizenAction.AddSuccessAction
  | AddFaAktennotizenAction.AddFailAction
  | DeleteFaAktennotizenAction.DeleteAction
  | DeleteFaAktennotizenAction.DeleteSuccessAction
  | DeleteFaAktennotizenAction.DeleteFailAction
  | UpdateFaAktennotizenAction.UpdateAction
  | UpdateFaAktennotizenAction.UpdateSuccessAction
  | UpdateFaAktennotizenAction.UpdateFailAction
  | DauerAction.LoadAction
  | DauerAction.LoadSuccessAction
  | DauerAction.LoadFailAction
  | GetConfigData.LoadAction
  | GetConfigData.LoadSuccessAction
  | GetConfigData.LoadFailAction
  | GetDokumentAktennotizen.LoadAction
  | GetDokumentAktennotizen.LoadSuccessAction
  | GetDokumentAktennotizen.LoadFailAction
  | GetDefaultKontartPartner.LoadAction
  | GetDefaultKontartPartner.LoadSuccessAction
  | GetDefaultKontartPartner.LoadFailAction;
