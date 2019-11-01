import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

import { Falltraeger, Mietvertrag, Relation, VwInstitution } from '../../models';

const LoadFalltraegerTypes = {
  LOAD: type('[Falltraeger] Load'),
  LOAD_SUCCESS: type('[Falltraeger] Load Success'),
  LOAD_FAIL: type('[Falltraeger] Load Fail'),
  RESET_STATE: type('[Falltraeger] Reset State')
};
const LoadMietvertragTypes = {
  LOAD: type('[Mietvertrag] Load'),
  LOAD_SUCCESS: type('[Mietvertrag] Load Success'),
  LOAD_FAIL: type('[Mietvertrag] Load Fail'),
};
const LoadRelationTypes = {
  LOAD: type('[Relation] Load'),
  LOAD_SUCCESS: type('[Relation] Load Success'),
  LOAD_FAIL: type('[Relation] Load Fail'),
};
const LoadVwInstitutionTypes = {
  LOAD: type('[VwInstitution] Load'),
  LOAD_SUCCESS: type('[VwInstitution] Load Success'),
  LOAD_FAIL: type('[VwInstitution] Load Fail'),
};
const BeziehungRelationGenericTypes = {
  LOAD: type('[BeziehungRelationGeneric] Load'),
  LOAD_SUCCESS: type('[BeziehungRelationGeneric] Load Success'),
  LOAD_FAIL: type('[BeziehungRelationGeneric] Load Fail'),
};
const BeziehungRelationMaleTypes = {
  LOAD: type('[BeziehungRelationMale] Load'),
  LOAD_SUCCESS: type('[BeziehungRelationMale] Load Success'),
  LOAD_FAIL: type('[BeziehungRelationMale] Load Fail'),
};
const BeziehungRelationFemaleTypes = {
  LOAD: type('[BeziehungRelationFemale] Load'),
  LOAD_SUCCESS: type('[BeziehungRelationFemale] Load Success'),
  LOAD_FAIL: type('[BeziehungRelationFemale] Load Fail'),
};
const InFPTypes = {
  LOAD: type('[InFP] Load'),
  LOAD_SUCCESS: type('[InFP] Load Success'),
  LOAD_FAIL: type('[InFP] Load Fail'),
};
const GleicheAdresseTypes = {
  LOAD: type('[GleicheAdresse] Load'),
  LOAD_SUCCESS: type('[GleicheAdresse] Load Success'),
  LOAD_FAIL: type('[GleicheAdresse] Load Fail'),
};
const HandleGleicherHaushaltTypes = {
  LOAD: type('[HandleGleicherHaushalt] Load'),
  LOAD_SUCCESS: type('[HandleGleicherHaushalt] Load Success'),
  LOAD_FAIL: type('[HandleGleicherHaushalt] Load Fail'),
};

const UpdateBaPersonRelationTypes = {
  UPDATE: type('[BaPersonRelation] Update'),
  UPDATE_SUCCESS: type('[BaPersonRelation] Update Success'),
  UPDATE_FAIL: type('[BaPersonRelation] Update Fail'),
};

const UpdateBaMietvertragTypes = {
  UPDATE: type('[BaMietvertrag] Update'),
  UPDATE_SUCCESS: type('[BaMietvertrag] Update Success'),
  UPDATE_FAIL: type('[BaMietvertrag] Update Fail'),
};

const UpdateBaPersonTypes = {
  UPDATE: type('[BaPerson] Update'),
  UPDATE_SUCCESS: type('[BaPerson] Update Success'),
  UPDATE_FAIL: type('[BaPerson] Update Fail'),
};

const InsertHistoryVersionTypes = {
  INSERT: type('[HistoryVersion] Insert'),
  INSERT_SUCCESS: type('[HistoryVersion] Insert Success'),
  INSERT_FAIL: type('[HistoryVersion] Insert Fail'),
};

export const KlientensystemActionTypes = {
  KlientensystemAction: type('[Klientensystem] Action'),
  LoadFalltraegerTypes: LoadFalltraegerTypes,
  LoadMietvertragTypes: LoadMietvertragTypes,
  LoadRelationTypes: LoadRelationTypes,
  LoadVwInstitutionTypes: LoadVwInstitutionTypes,
  BeziehungRelationGenericTypes: BeziehungRelationGenericTypes,
  BeziehungRelationMaleTypes: BeziehungRelationMaleTypes,
  BeziehungRelationFemaleTypes: BeziehungRelationFemaleTypes,
  InFPTypes: InFPTypes,
  GleicheAdresseTypes: GleicheAdresseTypes,
  HandleGleicherHaushaltTypes: HandleGleicherHaushaltTypes,
  UpdateBaPersonRelationTypes: UpdateBaPersonRelationTypes,
  UpdateBaMietvertragTypes: UpdateBaMietvertragTypes,
  UpdateBaPersonTypes: UpdateBaPersonTypes,
  InsertHistoryVersionTypes: InsertHistoryVersionTypes
};

export class KlientensystemAction implements AppStateAction {
  readonly type = KlientensystemActionTypes.KlientensystemAction;
  constructor(public payload?: any) { }
}

/**
 * Get Falltraeger action
 */
export class LoadFalltraegerAction implements AppStateAction {
  readonly type = LoadFalltraegerTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadFalltraegerSuccessAction implements AppStateAction {
  readonly type = LoadFalltraegerTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<Falltraeger, any>[]) { }
}

export class LoadFalltraegerFailAction implements AppStateAction {
  readonly type = LoadFalltraegerTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class ResetStateAction implements AppStateAction {
  readonly type = LoadFalltraegerTypes.RESET_STATE;
  constructor(public payload?: any) {
  }
}

/**
 * Get Mietvertrag action
 */
export class LoadMietvertragAction implements AppStateAction {
  readonly type = LoadMietvertragTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadMietvertragSuccessAction implements AppStateAction {
  readonly type = LoadMietvertragTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<Mietvertrag, any>[]) { }
}

export class LoadMietvertragFailAction implements AppStateAction {
  readonly type = LoadMietvertragTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get Relation action
 */
export class LoadRelationAction implements AppStateAction {
  readonly type = LoadRelationTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadRelationSuccessAction implements AppStateAction {
  readonly type = LoadRelationTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<Relation, any>[]) { }
}

export class LoadRelationFailAction implements AppStateAction {
  readonly type = LoadRelationTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get VwInstitution action
 */
export class LoadVwInstitutionAction implements AppStateAction {
  readonly type = LoadVwInstitutionTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadVwInstitutionSuccessAction implements AppStateAction {
  readonly type = LoadVwInstitutionTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadVwInstitutionFailAction implements AppStateAction {
  readonly type = LoadVwInstitutionTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/*******************************************/
/**
 * Get BeziehungRelationGeneric action
 */
export class LoadBeziehungRelationGenericAction implements AppStateAction {
  readonly type = BeziehungRelationGenericTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadBeziehungRelationGenericSuccessAction implements AppStateAction {
  readonly type = BeziehungRelationGenericTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadBeziehungRelationGenericFailAction implements AppStateAction {
  readonly type = BeziehungRelationGenericTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class LoadBeziehungRelationMaleAction implements AppStateAction {
  readonly type = BeziehungRelationMaleTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadBeziehungRelationMaleSuccessAction implements AppStateAction {
  readonly type = BeziehungRelationMaleTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadBeziehungRelationMaleFailAction implements AppStateAction {
  readonly type = BeziehungRelationMaleTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class LoadBeziehungRelationFemaleAction implements AppStateAction {
  readonly type = BeziehungRelationFemaleTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadBeziehungRelationFemaleSuccessAction implements AppStateAction {
  readonly type = BeziehungRelationFemaleTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadBeziehungRelationFemaleFailAction implements AppStateAction {
  readonly type = BeziehungRelationFemaleTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class LoadInFPAction implements AppStateAction {
  readonly type = InFPTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadInFPSuccessAction implements AppStateAction {
  readonly type = InFPTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadInFPFailAction implements AppStateAction {
  readonly type = InFPTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class LoadGleicheAdresseAction implements AppStateAction {
  readonly type = GleicheAdresseTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadGleicheAdresseSuccessAction implements AppStateAction {
  readonly type = GleicheAdresseTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadGleicheAdresseFailAction implements AppStateAction {
  readonly type = GleicheAdresseTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class LoadHandleGleicherHaushaltAction implements AppStateAction {
  readonly type = HandleGleicherHaushaltTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadHandleGleicherHaushaltSuccessAction implements AppStateAction {
  readonly type = HandleGleicherHaushaltTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class LoadHandleGleicherHaushaltFailAction implements AppStateAction {
  readonly type = HandleGleicherHaushaltTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

export class UpdateBaPersonRelationAction implements AppStateAction {
  readonly type = UpdateBaPersonRelationTypes.UPDATE;
  constructor(public payload?: any) { }
}

export class UpdateBaPersonRelationSuccessAction implements AppStateAction {
  readonly type = UpdateBaPersonRelationTypes.UPDATE_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class UpdateBaPersonRelationFailAction implements AppStateAction {
  readonly type = UpdateBaPersonRelationTypes.UPDATE_FAIL;
  constructor(public payload?: any) { }
}

export class UpdateBaMietvertragAction implements AppStateAction {
  readonly type = UpdateBaMietvertragTypes.UPDATE;
  constructor(public payload?: any) { }
}

export class UpdateBaMietvertragSuccessAction implements AppStateAction {
  readonly type = UpdateBaMietvertragTypes.UPDATE_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class UpdateBaMietvertragFailAction implements AppStateAction {
  readonly type = UpdateBaMietvertragTypes.UPDATE_FAIL;
  constructor(public payload?: any) { }
}

export class UpdateBaPersonAction implements AppStateAction {
  readonly type = UpdateBaPersonTypes.UPDATE;
  constructor(public payload?: any) { }
}

export class UpdateBaPersonSuccessAction implements AppStateAction {
  readonly type = UpdateBaPersonTypes.UPDATE_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class UpdateBaPersonFailAction implements AppStateAction {
  readonly type = UpdateBaPersonTypes.UPDATE_FAIL;
  constructor(public payload?: any) { }
}

export class InsertHistoryVersionAction implements AppStateAction {
  readonly type = InsertHistoryVersionTypes.INSERT;
  constructor(public payload?: any) { }
}

export class InsertHistoryVersionSuccessAction implements AppStateAction {
  readonly type = InsertHistoryVersionTypes.INSERT_SUCCESS;
  constructor(public payload?: Pick<VwInstitution, any>[]) { }
}

export class InsertHistoryVersionFailAction implements AppStateAction {
  readonly type = InsertHistoryVersionTypes.INSERT_FAIL;
  constructor(public payload?: any) { }
}

export type KlientensystemActions
  = KlientensystemAction
  | LoadFalltraegerAction
  | LoadFalltraegerSuccessAction
  | LoadFalltraegerFailAction
  | ResetStateAction
  | LoadMietvertragAction
  | LoadMietvertragFailAction
  | LoadMietvertragSuccessAction
  | LoadRelationAction
  | LoadRelationFailAction
  | LoadRelationSuccessAction
  | LoadVwInstitutionAction
  | LoadVwInstitutionFailAction
  | LoadVwInstitutionSuccessAction
  | LoadBeziehungRelationGenericAction
  | LoadBeziehungRelationGenericSuccessAction
  | LoadBeziehungRelationGenericFailAction
  | LoadBeziehungRelationMaleAction
  | LoadBeziehungRelationMaleSuccessAction
  | LoadBeziehungRelationMaleFailAction
  | LoadBeziehungRelationFemaleAction
  | LoadBeziehungRelationFemaleSuccessAction
  | LoadBeziehungRelationFemaleFailAction
  | LoadInFPAction
  | LoadInFPSuccessAction
  | LoadInFPFailAction
  | LoadGleicheAdresseAction
  | LoadGleicheAdresseSuccessAction
  | LoadGleicheAdresseFailAction
  | LoadHandleGleicherHaushaltAction
  | LoadHandleGleicherHaushaltSuccessAction
  | LoadHandleGleicherHaushaltFailAction
  | UpdateBaPersonRelationAction
  | UpdateBaPersonRelationSuccessAction
  | UpdateBaPersonRelationFailAction
  | UpdateBaMietvertragAction
  | UpdateBaMietvertragSuccessAction
  | UpdateBaMietvertragFailAction
  | UpdateBaPersonAction
  | UpdateBaPersonSuccessAction
  | UpdateBaPersonFailAction
  | InsertHistoryVersionAction
  | InsertHistoryVersionSuccessAction
  | InsertHistoryVersionFailAction;
