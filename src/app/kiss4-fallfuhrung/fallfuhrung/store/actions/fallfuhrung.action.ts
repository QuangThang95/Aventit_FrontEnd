import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const FallfuhrungTypes = {
  LOAD: type('[Fallfuhrung] Load '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Fail'),
  RESET_STATE: type('[Fallfuhrung] Reset State')
};

// Load Config Data
const GetConfigTypes = {
  LOAD: type('[Fallfuhrung] Load Config '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Config Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Config Fail')
};

// Load FallRight
const GetFallRightsTypes = {
  LOAD: type('[Fallfuhrung] Load Fall Right '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Fall Right Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Fall Right Fail')
};

// Load Conbobox Kontaktveranl.
const GetKontaktveranlTypes = {
  LOAD: type('[Fallfuhrung] Load Kontaktveranl '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Kontaktveranl Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Kontaktveranl Fail')
};

// Load Combobox Grund
const GetGrundTypes = {
  LOAD: type('[Fallfuhrung] Load Grund '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Grund Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Grund Fail')
};

// Load Combobox zust. Gemeinde
const GetGemeindeTypes = {
  LOAD: type('[Fallfuhrung] Load Gemeinde '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Gemeinde Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Gemeinde Fail')
};

// Update FaLeistung
const UpdateFaLeistungTypes = {
  Update_FaLeistung: type('[Fallfuhrung] Update FaLeistung '),
  Update_FaLeistung_SUCCESS: type('[Fallfuhrung] Update FaLeistung Success'),
  Update_FaLeistung_FAIL: type('[Fallfuhrung] Update FaLeistung Fail')
};

// Load Combobox Anmeldeart
const GetAnmeldeartTypes = {
  LOAD: type('[Fallfuhrung] Load Anmeldeart '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Anmeldeart Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Anmeldeart Fail')
};

// Load AnzahlOffene Data
const GetAnzahlOffenePendenzenTypes = {
  LOAD: type('[Fallfuhrung] Load AnzahlOffene '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load AnzahlOffene Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load AnzahlOffene Fail')
};

// Load Validation FaLeistung Data
const GetValidationFaLeistungTypes = {
  LOAD: type('[Fallfuhrung] Load ValidationFaLeistung '),
  LOAD_SUCCESS: type('[Fallfuhrung] Load ValidationFaLeistung Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load ValidationFaLeistung Fail')
};

export const FallfuhrungActionTypes = {
  FallfuhrungAction: type('[Fallfuhrung] Action'),
  FallfuhrungTypes: FallfuhrungTypes,
  GetConfigTypes: GetConfigTypes,
  GetFallRightsTypes: GetFallRightsTypes,
  GetKontaktveranlTypes: GetKontaktveranlTypes,
  GetGrundTypes: GetGrundTypes,
  GetGemeindeTypes: GetGemeindeTypes,
  UpdateFaLeistungTypes: UpdateFaLeistungTypes,
  GetAnmeldeartTypes: GetAnmeldeartTypes,
  GetAnzahlOffenePendenzenTypes: GetAnzahlOffenePendenzenTypes,
  GetValidationFaLeistungTypes: GetValidationFaLeistungTypes,
};



export class FallfuhrungAction implements AppStateAction {
  readonly type = FallfuhrungActionTypes.FallfuhrungAction;
  constructor(public payload?: any) {
  }
}

/**
 * *****************************************************************
 * FallfuhrungTypes Actions
 * *****************************************************************
 */
export namespace FallfuhrungData {
  export class LoadAction implements AppStateAction {
    readonly type = FallfuhrungTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FallfuhrungTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FallfuhrungTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }

  export class ResetStateAction implements AppStateAction {
    readonly type = FallfuhrungTypes.RESET_STATE;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * GetConfigTypes Actions
 * *****************************************************************
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
 * *****************************************************************
 * Get Fall Rights Actions
 * *****************************************************************
 */
export namespace GetFallRightsData {
  export class LoadAction implements AppStateAction {
    readonly type = GetFallRightsTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetFallRightsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetFallRightsTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Get Kontaktveranl Actions
 * *****************************************************************
 */
export namespace GetKontaktveranlData {
  export class LoadAction implements AppStateAction {
    readonly type = GetKontaktveranlTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetKontaktveranlTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetKontaktveranlTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Get Grund Types Actions
 * *****************************************************************
 */
export namespace GetGrundData {
  export class LoadAction implements AppStateAction {
    readonly type = GetGrundTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetGrundTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetGrundTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Get Gemeinde Actions
 * *****************************************************************
 */
export namespace GetGemeindeData {
  export class LoadAction implements AppStateAction {
    readonly type = GetGemeindeTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetGemeindeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetGemeindeTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Update FaLeistung Actions
 * *****************************************************************
 */
export namespace UpdateFaLeistungData {
  export class UpdateAction implements AppStateAction {
    readonly type = UpdateFaLeistungTypes.Update_FaLeistung;
    constructor(public payload?: any) {
    }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = UpdateFaLeistungTypes.Update_FaLeistung_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = UpdateFaLeistungTypes.Update_FaLeistung_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Get Anmeldeart Actions
 * *****************************************************************
 */
export namespace GetAnmeldeartData {
  export class LoadAction implements AppStateAction {
    readonly type = GetAnmeldeartTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetAnmeldeartTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetAnmeldeartTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Get AnzahlOffenePendenzen Actions
 * *****************************************************************
 */
export namespace GetAnzahlOffeneData {
  export class LoadAction implements AppStateAction {
    readonly type = GetAnzahlOffenePendenzenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetAnzahlOffenePendenzenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetAnzahlOffenePendenzenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
/**
 * *****************************************************************
 * Get Validation FaLeistung Actions
 * *****************************************************************
 */
export namespace ValidationFaLeistungData {
  export class LoadAction implements AppStateAction {
    readonly type = GetValidationFaLeistungTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetValidationFaLeistungTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetValidationFaLeistungTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type FallfuhrungActions
  = FallfuhrungAction
  | FallfuhrungData.LoadAction
  | FallfuhrungData.LoadSuccessAction
  | FallfuhrungData.LoadFailAction
  | FallfuhrungData.ResetStateAction
  | GetConfigData.LoadAction
  | GetConfigData.LoadSuccessAction
  | GetConfigData.LoadFailAction
  | GetFallRightsData.LoadAction
  | GetFallRightsData.LoadSuccessAction
  | GetFallRightsData.LoadFailAction
  | GetKontaktveranlData.LoadAction
  | GetKontaktveranlData.LoadSuccessAction
  | GetKontaktveranlData.LoadFailAction
  | GetGrundData.LoadAction
  | GetGrundData.LoadSuccessAction
  | GetGrundData.LoadFailAction
  | GetGemeindeData.LoadAction
  | GetGemeindeData.LoadSuccessAction
  | GetGemeindeData.LoadFailAction
  | UpdateFaLeistungData.UpdateAction
  | UpdateFaLeistungData.UpdateSuccessAction
  | UpdateFaLeistungData.UpdateFailAction
  | GetAnmeldeartData.LoadAction
  | GetAnmeldeartData.LoadSuccessAction
  | GetAnmeldeartData.LoadFailAction
  | GetAnzahlOffeneData.LoadAction | GetAnzahlOffeneData.LoadFailAction | GetAnzahlOffeneData.LoadSuccessAction
  | ValidationFaLeistungData.LoadAction | ValidationFaLeistungData.LoadSuccessAction | ValidationFaLeistungData.LoadFailAction;


