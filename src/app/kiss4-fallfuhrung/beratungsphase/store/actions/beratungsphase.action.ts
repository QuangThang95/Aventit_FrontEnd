import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

// Add action for load data for SAR select box data
const SARSelectboxDataTypes = {
  LOAD: type('[Beratungsphase] Load SAR select box'),
  LOAD_SUCCESS: type('[Beratungsphase] Load SAR select box Success'),
  LOAD_FAIL: type('[Beratungsphase] Load SAR select box Fail')
};
// Add action for load data for DPL select box data
const DPLSelectboxDataTypes = {
  LOAD: type('[Beratungsphase] Load DPL select box'),
  LOAD_SUCCESS: type('[Beratungsphase] Load DPL select box Success'),
  LOAD_FAIL: type('[Beratungsphase] Load DPL select box Fail')
};
// Add action for load data for Grund select box data
const GrundSelectboxDataTypes = {
  LOAD: type('[Beratungsphase] Load Grund select box'),
  LOAD_SUCCESS: type('[Beratungsphase] Load Grund select box Success'),
  LOAD_FAIL: type('[Beratungsphase] Load Grund select box Fail')
};
// Add action for load data for Form data
const BeratungsphaseFormDataTypes = {
  LOAD: type('[Beratungsphase] Load Form data'),
  LOAD_SUCCESS: type('[Beratungsphase] Load Form data Success'),
  LOAD_FAIL: type('[Beratungsphase] Load Form data Fail'),
  RESET_STATE: type('[Beratungsphase] Reset State')
};
// Add action for update Form data
const BeratungsphaseUpdateFormDataTypes = {
  UPDATE_FORM_DATA: type('[Beratungsphase] Update Form data'),
  UPDATING_FORM_DATA: type('[Beratungsphase] Updating Form data'),
  UPDATE_FORM_DATA_SUCCESS: type('[Beratungsphase] Update Form data Success'),
  UPDATE_FORM_DATA_FAIL: type('[Beratungsphase] Update Form data Fail')
};
// Add action for get DatumVon And FaLeistungID
const GetDatumVonAndFaLeistungIDDataTypes = {
  LOAD: type('[Beratungsphase] Get DatumVon And FaLeistungID data'),
  LOAD_SUCCESS: type('[Beratungsphase] Get DatumVon And FaLeistungID Success'),
  LOAD_FAIL: type('[Beratungsphase] Get DatumVon And FaLeistungID Fail')
};
// Add action for get duplicate count of DatumVon
const CheckDatumVonValidTypes = {
  LOAD: type('[Beratungsphase] Check DatumVon Valid'),
  LOAD_SUCCESS: type('[Beratungsphase] Check DatumVon Valid Success'),
  LOAD_FAIL: type('[Beratungsphase] Check DatumVon Valid Fail')
};
// Add action for Get mandatory field
const GetMandatoryFieldTypes = {
  LOAD: type('[Beratungsphase] Get mandatory field'),
  LOAD_SUCCESS: type('[Beratungsphase] Get mandatory field Success'),
  LOAD_FAIL: type('[Beratungsphase] Get mandatory field Fail')
};
// Add action for Check minimal all targets
const CheckMinimalAllTargetsTypes = {
  LOAD: type('[Beratungsphase] Check minimal all targets'),
  LOAD_SUCCESS: type('[Beratungsphase] Check minimal all targets Success'),
  LOAD_FAIL: type('[Beratungsphase] Check minimal all targets Fail')
};
const GetFaLeistungByBaPersonIDTypes = {
  LOAD: type('[Beratungsphase] Get FaLeistung and DatumBis By BaPersonID'),
  LOAD_SUCCESS: type('[Beratungsphase] Get FaLeistung and DatumBis By BaPersonID Success'),
  LOAD_FAIL: type('[Beratungsphase] Get FaLeistung and DatumBis By BaPersonID Fail')
};
const GetCountFaPhaseTypes = {
  LOAD: type('[Beratungsphase] Get Count FaPhase'),
  LOAD_SUCCESS: type('[Beratungsphase] Get Count FaPhase Success'),
  LOAD_FAIL: type('[Beratungsphase] Get Count FaPhase Fail')
};
// Get NewDate from GetFaPhaseByFaLeistungID api
const GetNewDateByFaLeistungIDTypes = {
  LOAD: type('[Beratungsphase] Get NewDate by FaleistungID'),
  LOAD_SUCCESS: type('[Beratungsphase] Get NewDate by FaleistungID Success'),
  LOAD_FAIL: type('[Beratungsphase] Get NewDate by FaleistungID Fail')
};
const InsertFaPhaseTypes = {
  ADD: type('[Beratungsphase] Add new'),
  ADDING: type('[Beratungsphase] Adding'),
  ADD_SUCCESS: type('[Beratungsphase] Add new succes'),
  ADD_FAIL: type('[Beratungsphase] Load Add new Fail')
};
// Add action for update FaLeistung
const UpdateFaLeistungDataTypes = {
  UPDATE_FALEISTUNG_DATA: type('[Beratungsphase] Update FaLeistung data'),
  UPDATING_FALEISTUNG_DATA: type('[Beratungsphase] Updating FaLeistung data'),
  UPDATE_FALEISTUNG_SUCCESS: type('[Beratungsphase] Update FaLeistung data Success'),
  UPDATE_FALEISTUNG_FAIL: type('[Beratungsphase] Update FaLeistung data Fail')
};
// Get Config Int
const GetConfigIntTypes = {
  LOAD: type('[Beratungsphase] Get Config Int by keyPath and default value'),
  LOAD_SUCCESS: type('[Beratungsphase] Get Config Int by keyPath and default value Success'),
  LOAD_FAIL: type('[Beratungsphase] Get Config Int by keyPath and default value Fail')
};
// Get Config Bool
const GetConfigBoolTypes = {
  LOAD: type('[Beratungsphase] Get Config Bool by keyPath and default value'),
  LOAD_SUCCESS: type('[Beratungsphase] Get Config Bool by keyPath and default value Success'),
  LOAD_FAIL: type('[Beratungsphase] Get Config Bool by keyPath and default value Fail')
};
// Delete Faphase
const DeleteFaPhaseTypes = {
  DELETE_FAPHASE: type('[Beratungsphase] Delete Faphase New'),
  DELETE_FAPHASE_SUCCESS: type('[Beratungsphase] Deleted Faphase Success'),
  DELETE_FAPHASE_FAIL: type('[Beratungsphase] Delete Faphase Fail')
};
// Get Intake And Beratung Count
const GetIntakeAndBeratungCountTypes = {
  LOAD: type('[Beratungsphase] Get Intake And Beratung Count'),
  LOAD_SUCCESS: type('[Beratungsphase] Get Intake And Beratung Count Success'),
  LOAD_FAIL: type('[Beratungsphase] Get Intake And Beratung Count Fail')
};
// Get licensed module
const GetLicensedModuleTypes = {
  LOAD: type('[Beratungsphase] Get licensed module'),
  LOAD_SUCCESS: type('[Beratungsphase] Get licensed module Success'),
  LOAD_FAIL: type('[Beratungsphase] Get licensed module Fail')
};
// Load FallRight
const GetFallRightsTypes = {
  LOAD: type('[Beratungsphase] Load Fall Right '),
  LOAD_SUCCESS: type('[Beratungsphase] Load Fall Right Success'),
  LOAD_FAIL: type('[Beratungsphase] Load Fall Right Fail')
};
// Get Reopen Phase
const GetReopenPhaseTypes = {
  LOAD: type('[Beratungsphase] Get Reopen Phase'),
  LOAD_SUCCESS: type('[Beratungsphase] Get Reopen Phase Success'),
  LOAD_FAIL: type('[Beratungsphase] Get Reopen Phase Fail')
};
const FallfuhrungTypes = {
  LOAD: type('[Fallfuhrung] Load Data Fallfuhrung'),
  LOAD_SUCCESS: type('[Fallfuhrung] Load Data Fallfuhrung Success'),
  LOAD_FAIL: type('[Fallfuhrung] Load Data Fallfuhrung Fail'),
};

export const BeratungsphaseActionTypes = {
  BeratungsphaseAction: type('[Beratungsphase] Action'),
  SARSelectboxDataTypes: SARSelectboxDataTypes,
  DPLSelectboxDataTypes: DPLSelectboxDataTypes,
  GrundSelectboxDataTypes: GrundSelectboxDataTypes,
  BeratungsphaseFormDataTypes: BeratungsphaseFormDataTypes,
  BeratungsphaseUpdateFormDataTypes: BeratungsphaseUpdateFormDataTypes,
  GetDatumVonAndFaLeistungIDDataTypes: GetDatumVonAndFaLeistungIDDataTypes,
  CheckDatumVonValidTypes: CheckDatumVonValidTypes,
  GetMandatoryFieldTypes: GetMandatoryFieldTypes,
  CheckMinimalAllTargetsTypes: CheckMinimalAllTargetsTypes,
  GetFaLeistungByBaPersonIDTypes: GetFaLeistungByBaPersonIDTypes,
  GetCountFaPhaseTypes: GetCountFaPhaseTypes,
  GetNewDateByFaLeistungIDTypes: GetNewDateByFaLeistungIDTypes,
  InsertFaPhaseTypes: InsertFaPhaseTypes,
  UpdateFaLeistungDataTypes: UpdateFaLeistungDataTypes,
  GetConfigIntTypes: GetConfigIntTypes,
  GetConfigBoolTypes: GetConfigBoolTypes,
  DeleteFaPhaseTypes: DeleteFaPhaseTypes,
  GetIntakeAndBeratungCountTypes: GetIntakeAndBeratungCountTypes,
  GetLicensedModuleTypes: GetLicensedModuleTypes,
  GetFallRightsTypes: GetFallRightsTypes,
  GetReopenPhaseTypes: GetReopenPhaseTypes,
  FallfuhrungTypes: FallfuhrungTypes
};

export class BeratungsphaseAction implements AppStateAction {
  readonly type = BeratungsphaseActionTypes.BeratungsphaseAction;
  constructor(public payload?: any) {
  }
}

// Load SAR Select box Data
export namespace SARSelectboxData {
  export class LoadSARSelectboxDataAction implements AppStateAction {
    readonly type = SARSelectboxDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSARSelectboxDataSuccessAction implements AppStateAction {
    readonly type = SARSelectboxDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadSARSelectboxDataFailAction implements AppStateAction {
    readonly type = SARSelectboxDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load DPL Select box Data
export namespace DPLSelectboxData {
  export class LoadDPLSelectboxDataAction implements AppStateAction {
    readonly type = DPLSelectboxDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadDPLSelectboxDataSuccessAction implements AppStateAction {
    readonly type = DPLSelectboxDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadDPLSelectboxDataFailAction implements AppStateAction {
    readonly type = DPLSelectboxDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load Grund Select box Data
export namespace GrundSelectboxData {
  export class LoadGrundSelectboxDataAction implements AppStateAction {
    readonly type = GrundSelectboxDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundSelectboxDataSuccessAction implements AppStateAction {
    readonly type = GrundSelectboxDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundSelectboxDataFailAction implements AppStateAction {
    readonly type = GrundSelectboxDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load data for Form
export namespace BeratungsphaseFormData {
  export class LoadBeratungsphaseFormDataAction implements AppStateAction {
    readonly type = BeratungsphaseFormDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadBeratungsphaseFormDataSuccessAction implements AppStateAction {
    readonly type = BeratungsphaseFormDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadBeratungsphaseFormDataFailAction implements AppStateAction {
    readonly type = BeratungsphaseFormDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }

  export class ResetStateAction implements AppStateAction {
    readonly type = BeratungsphaseFormDataTypes.RESET_STATE;
    constructor(public payload?: any) {
    }
  }
}
// Update Form data
export namespace BeratungsphaseUpdateFormData {
  export class UpdateBeratungsphaseFormDataAction implements AppStateAction {
    readonly type = BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA;
    constructor(public payload?: any) {
    }
  }

  export class UpdateBeratungsphaseFormDataSuccessAction implements AppStateAction {
    readonly type = BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateBeratungsphaseFormDataFailAction implements AppStateAction {
    readonly type = BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Get DatumVon and FaLeistungID to check datumVon valid
export namespace GetDatumVonAndFaLeistungIDData {
  export class GetDatumVonAndFaLeistungIDDataAction implements AppStateAction {
    readonly type = GetDatumVonAndFaLeistungIDDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetDatumVonAndFaLeistungIDDataSuccessAction implements AppStateAction {
    readonly type = GetDatumVonAndFaLeistungIDDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetDatumVonAndFaLeistungIDDataFailAction implements AppStateAction {
    readonly type = GetDatumVonAndFaLeistungIDDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Check DatumVon Valid
export namespace CheckDatumVonValidData {
  export class CheckDatumVonValidDataAction implements AppStateAction {
    readonly type = CheckDatumVonValidTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class CheckDatumVonValidSuccessAction implements AppStateAction {
    readonly type = CheckDatumVonValidTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class CheckDatumVonValidFailAction implements AppStateAction {
    readonly type = CheckDatumVonValidTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Get mandatory field
export namespace GetMandatoryFieldData {
  export class GetMandatoryFieldDataAction implements AppStateAction {
    readonly type = GetMandatoryFieldTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetMandatoryFieldSuccessAction implements AppStateAction {
    readonly type = GetMandatoryFieldTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetMandatoryFieldFailAction implements AppStateAction {
    readonly type = GetMandatoryFieldTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Check minimal all targets
export namespace CheckMinimalAllTargetsData {
  export class CheckMinimalAllTargetsDataAction implements AppStateAction {
    readonly type = CheckMinimalAllTargetsTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class CheckMinimalAllTargetsSuccessAction implements AppStateAction {
    readonly type = CheckMinimalAllTargetsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class CheckMinimalAllTargetsFailAction implements AppStateAction {
    readonly type = CheckMinimalAllTargetsTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetFaLeistungByBaPersonIDData {
  export class GetFaLeistungByBaPersonIDDataAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetFaLeistungByBaPersonIDSuccessAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetFaLeistungByBaPersonIDFailAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetCountFaPhaseData {
  export class GetCountFaPhaseDataAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetCountFaPhaseSuccessAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetCountFaPhaseFailAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// GetConfigIntTypes
export namespace GetConfigIntData {
  export class GetConfigIntDataAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigIntSuccessAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigIntFailAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// GetConfigBoolTypes
export namespace GetConfigBoolData {
  export class GetConfigBoolDataAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigBoolSuccessAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetConfigBoolFailAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
export namespace GetNewDateByFaLeistungIDData {
  export class GetNewDateByFaLeistungIDDataAction implements AppStateAction {
    readonly type = GetNewDateByFaLeistungIDTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetNewDateByFaLeistungIDSuccessAction implements AppStateAction {
    readonly type = GetNewDateByFaLeistungIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetNewDateByFaLeistungIDFailAction implements AppStateAction {
    readonly type = GetNewDateByFaLeistungIDTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// InsertFaPhaseTypes
export namespace InsertFaPhaseData {
  export class InsertFaPhaseDataAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ADD;
    constructor(public payload?: any) {
    }
  }

  export class InsertFaPhaseSuccessAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ADD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class InsertFaPhaseFailAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ADD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Update FaLeistung Data
export namespace UpdateFaLeistungData {
  export class UpdateFaLeistungDataAction implements AppStateAction {
    readonly type = UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_DATA;
    constructor(public payload?: any) {
    }
  }

  export class UpdateFaLeistungDataSuccessAction implements AppStateAction {
    readonly type = UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateFaLeistungDataFailAction implements AppStateAction {
    readonly type = UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Delete FaPhase
export namespace DeleteFaPhaseData {
  export class DeleteFaPhaseDataAction implements AppStateAction {
    readonly type = DeleteFaPhaseTypes.DELETE_FAPHASE;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFaPhaseDataSuccessAction implements AppStateAction {
    readonly type = DeleteFaPhaseTypes.DELETE_FAPHASE_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFaPhaseDataFailAction implements AppStateAction {
    readonly type = DeleteFaPhaseTypes.DELETE_FAPHASE_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetIntakeAndBeratungCountData {
  export class GetIntakeAndBeratungCountDataAction implements AppStateAction {
    readonly type = GetIntakeAndBeratungCountTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetIntakeAndBeratungCountSuccessAction implements AppStateAction {
    readonly type = GetIntakeAndBeratungCountTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetIntakeAndBeratungCountFailAction implements AppStateAction {
    readonly type = GetIntakeAndBeratungCountTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetLicensedModuleData {
  export class GetLicensedModuleDataAction implements AppStateAction {
    readonly type = GetLicensedModuleTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetLicensedModuleSuccessAction implements AppStateAction {
    readonly type = GetLicensedModuleTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetLicensedModuleFailAction implements AppStateAction {
    readonly type = GetLicensedModuleTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
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

// Get Reopen Phase
export namespace GetReopenPhaseData {
  export class GetReopenPhaseDataAction implements AppStateAction {
    readonly type = GetReopenPhaseTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetReopenPhaseSuccessAction implements AppStateAction {
    readonly type = GetReopenPhaseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetReopenPhaseFailAction implements AppStateAction {
    readonly type = GetReopenPhaseTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

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
}
export type BeratungsphaseActions
  = BeratungsphaseAction
  | SARSelectboxData.LoadSARSelectboxDataAction
  | SARSelectboxData.LoadSARSelectboxDataSuccessAction
  | SARSelectboxData.LoadSARSelectboxDataFailAction
  | DPLSelectboxData.LoadDPLSelectboxDataAction
  | DPLSelectboxData.LoadDPLSelectboxDataSuccessAction
  | DPLSelectboxData.LoadDPLSelectboxDataFailAction
  | GrundSelectboxData.LoadGrundSelectboxDataAction
  | GrundSelectboxData.LoadGrundSelectboxDataSuccessAction
  | GrundSelectboxData.LoadGrundSelectboxDataFailAction
  | BeratungsphaseFormData.LoadBeratungsphaseFormDataAction
  | BeratungsphaseFormData.LoadBeratungsphaseFormDataSuccessAction
  | BeratungsphaseFormData.LoadBeratungsphaseFormDataFailAction
  | BeratungsphaseFormData.ResetStateAction
  | BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataAction
  | BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataSuccessAction
  | BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataFailAction
  | GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataAction
  | GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataSuccessAction
  | GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataFailAction
  | CheckDatumVonValidData.CheckDatumVonValidDataAction
  | CheckDatumVonValidData.CheckDatumVonValidSuccessAction
  | CheckDatumVonValidData.CheckDatumVonValidFailAction
  | GetMandatoryFieldData.GetMandatoryFieldDataAction
  | GetMandatoryFieldData.GetMandatoryFieldSuccessAction
  | GetMandatoryFieldData.GetMandatoryFieldFailAction
  | CheckMinimalAllTargetsData.CheckMinimalAllTargetsDataAction
  | CheckMinimalAllTargetsData.CheckMinimalAllTargetsSuccessAction
  | CheckMinimalAllTargetsData.CheckMinimalAllTargetsFailAction
  | GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDDataAction
  | GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDSuccessAction
  | GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDFailAction
  | GetCountFaPhaseData.GetCountFaPhaseDataAction
  | GetCountFaPhaseData.GetCountFaPhaseSuccessAction
  | GetCountFaPhaseData.GetCountFaPhaseFailAction
  | GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDDataAction
  | GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDSuccessAction
  | GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDFailAction
  | InsertFaPhaseData.InsertFaPhaseDataAction
  | InsertFaPhaseData.InsertFaPhaseSuccessAction
  | InsertFaPhaseData.InsertFaPhaseFailAction
  | UpdateFaLeistungData.UpdateFaLeistungDataAction
  | UpdateFaLeistungData.UpdateFaLeistungDataSuccessAction
  | UpdateFaLeistungData.UpdateFaLeistungDataFailAction
  | GetConfigIntData.GetConfigIntDataAction
  | GetConfigIntData.GetConfigIntSuccessAction
  | GetConfigIntData.GetConfigIntFailAction
  | GetConfigBoolData.GetConfigBoolDataAction
  | GetConfigBoolData.GetConfigBoolSuccessAction
  | GetConfigBoolData.GetConfigBoolFailAction
  | DeleteFaPhaseData.DeleteFaPhaseDataAction
  | DeleteFaPhaseData.DeleteFaPhaseDataSuccessAction
  | DeleteFaPhaseData.DeleteFaPhaseDataFailAction
  | GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountDataAction
  | GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountSuccessAction
  | GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountFailAction
  | GetLicensedModuleData.GetLicensedModuleDataAction
  | GetLicensedModuleData.GetLicensedModuleSuccessAction
  | GetLicensedModuleData.GetLicensedModuleFailAction
  | GetFallRightsData.LoadAction
  | GetFallRightsData.LoadSuccessAction
  | GetFallRightsData.LoadFailAction
  | GetReopenPhaseData.GetReopenPhaseDataAction | GetReopenPhaseData.GetReopenPhaseFailAction | GetReopenPhaseData.GetReopenPhaseSuccessAction
  | FallfuhrungData.LoadAction | FallfuhrungData.LoadSuccessAction | FallfuhrungData.LoadFailAction;
