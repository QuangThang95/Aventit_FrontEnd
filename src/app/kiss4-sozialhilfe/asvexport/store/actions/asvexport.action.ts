import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';
import { ASVDetenerfassung, ZuExportierendeEintrage } from '../../models';

const AsvexportTypes = {
  LOAD: type('[Asvexport] Load'),
  LOAD_SUCCESS: type('[Asvexport] Load Success'),
  LOAD_FAIL: type('[Asvexport] Load Fail')
};

const AsvexEintragTypes = {
  LOAD: type('[Asvexport] Load AVS Eintrag'),
  LOAD_SUCCESS: type('[Asvexport] Load AVS Eintrag Success'),
  LOAD_FAIL: type('[Asvexport] Load AVS Eintrag Fail')
};

const FileBinaryActionTypes = {
  LOAD: type('[Asvexport] Load File Binary'),
  LOAD_SUCCESS: type('[Asvexport] Load File Binary Success'),
  LOAD_FAIL: type('[Asvexport] Load FileBinary Fail')
};

const GetXOrgUnitAllTypes = {
  LOAD: type('[Asvexport] Load XOrgUnit All'),
  LOAD_SUCCESS: type('[Asvexport] Load XOrgUnit All Success'),
  LOAD_FAIL: type('[Asvexport] Load XOrgUnit All Fail')
};

const SstASVSExportInsertTypes = {
  ADD_NEW: type('[Asvexport] Add New'),
  ADD_SUCCESS: type('[Asvexport] Add Success'),
  ADD_FAIL: type('[Asvexport ] Add Fail')
};


const UpdateASVSExportTypes = {
  UPDATE_ASVSExport: type('[Asvexport] Update ASVS Export'),
  UPDATE_ASVSExport_SUCCESS: type('[Asvexport] Update ASVS Export Success'),
  UPDATE_ASVSExport_FAIL: type('[Asvexport] Update ASVS Export Fail')
};

const UpdateSstASVSExportTransactionTypes = {
  UPDATE_ASVSExport_Transaction: type('[Asvexport] Update ASVS Export Transaction'),
  UPDATE_ASVSExport_Transaction_SUCCESS: type('[Asvexport] Update ASVS Export Transaction Success'),
  UPDATE_ASVSExport_Transaction_FAIL: type('[Asvexport] Update ASVS Export Transaction Fail')
};

export const AsvexportActionTypes = {
  AsvexportAction: type('[Asvexport] Action'),
  AsvexportTypes: AsvexportTypes,
  AsvexEintragTypes: AsvexEintragTypes,
  FileBinaryActionTypes: FileBinaryActionTypes,
  GetXOrgUnitAllTypes: GetXOrgUnitAllTypes,
  SstASVSExportInsertTypes: SstASVSExportInsertTypes,
  UpdateASVSExportTypes: UpdateASVSExportTypes,
  UpdateSstASVSExportTransactionTypes: UpdateSstASVSExportTransactionTypes,
};



export class AsvexportAction implements AppStateAction {
  readonly type = AsvexportActionTypes.AsvexportAction;
  constructor(public payload?: any) {
  }
}

/**
 * *****************************************************************
 * AsvexportTypes Actions
 * *****************************************************************
 */
export namespace AsvexportInitData {
  export class LoadAction implements AppStateAction {
    readonly type = AsvexportTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AsvexportTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AsvexportTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * AsvexEintrag  Actions
 * *****************************************************************
 */

export namespace AsvEintragData {
  export class LoadAction implements AppStateAction {
    readonly type = AsvexEintragTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AsvexEintragTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AsvexEintragTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * AsvexEintrag  Actions
 * Author:DNDUC
 * *****************************************************************
 */

export namespace FileBinaryData {
  export class LoadAction implements AppStateAction {
    readonly type = FileBinaryActionTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FileBinaryActionTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FileBinaryActionTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * XOrgUnitAll  Actions
 * Author:DNDUC
 * *****************************************************************
 */

export namespace XOrgUnitData {
  export class LoadAction implements AppStateAction {
    readonly type = GetXOrgUnitAllTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetXOrgUnitAllTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetXOrgUnitAllTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Insert One Row In Grid SstASVSExport Actions
 * Author:DNDUC
 * *****************************************************************
 */

export namespace SstASVSExportInsertData {
  export class AddNewAction implements AppStateAction {
    readonly type = SstASVSExportInsertTypes.ADD_NEW;
    constructor(public payload?: any) {
    }
  }

  export class AddNewSuccessAction implements AppStateAction {
    readonly type = SstASVSExportInsertTypes.ADD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class AddNewFailAction implements AppStateAction {
    readonly type = SstASVSExportInsertTypes.ADD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * UpdateASVSExportData  Actions
 * Author: DNDUC
 * *****************************************************************
 */
export namespace UpdateASVSExportData {
  export class UpdateAction implements AppStateAction {
    readonly type = UpdateASVSExportTypes.UPDATE_ASVSExport;
    constructor(public payload?: any) {
    }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = UpdateASVSExportTypes.UPDATE_ASVSExport_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = UpdateASVSExportTypes.UPDATE_ASVSExport_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * *****************************************************************
 * Update ASVSExport Transaction Data Actions
 * Author: DNDUC
 * *****************************************************************
 */
export namespace UpdateASVSExportTransactionData {
  export class UpdateTransactionAction implements AppStateAction {
    readonly type = UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction;
    constructor(public payload?: any) {
    }
  }

  export class UpdateTransactionSuccessAction implements AppStateAction {
    readonly type = UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateTransactionFailAction implements AppStateAction {
    readonly type = UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type AsvexportActions
  = AsvexportAction
  | AsvexportInitData.LoadAction
  | AsvexportInitData.LoadSuccessAction
  | AsvexportInitData.LoadFailAction
  | AsvEintragData.LoadAction
  | AsvEintragData.LoadSuccessAction
  | AsvEintragData.LoadFailAction
  | FileBinaryData.LoadAction
  | FileBinaryData.LoadSuccessAction
  | FileBinaryData.LoadFailAction
  | XOrgUnitData.LoadAction
  | XOrgUnitData.LoadSuccessAction
  | XOrgUnitData.LoadFailAction
  | SstASVSExportInsertData.AddNewAction
  | SstASVSExportInsertData.AddNewSuccessAction
  | SstASVSExportInsertData.AddNewFailAction
  | UpdateASVSExportData.UpdateAction
  | UpdateASVSExportData.UpdateSuccessAction
  | UpdateASVSExportData.UpdateFailAction
  | UpdateASVSExportTransactionData.UpdateTransactionAction
  | UpdateASVSExportTransactionData.UpdateTransactionSuccessAction
  | UpdateASVSExportTransactionData.UpdateTransactionFailAction;
