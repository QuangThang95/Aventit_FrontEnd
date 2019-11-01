import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';
import {
  VorlagenProfile
} from '../../models';

const LoadVorlagenProfilesTypes = {
  LOAD: type('[VorlagenProfile] Load'),
  LOAD_SUCCESS: type('[VorlagenProfile] Load Success'),
  LOAD_FAIL: type('[VorlagenProfile] Load Fail'),
};

const LoadXProfileIDTypes = {
  LOAD: type('[XProfileID] Load'),
  LOAD_SUCCESS: type('[XProfileID] Load Success'),
  LOAD_FAIL: type('[XProfileID] Load Fail'),
};

const LoadXProfileTagIDTypes = {
  LOAD: type('[XProfileTagID] Load'),
  LOAD_SUCCESS: type('[XProfileTagID] Load Success'),
  LOAD_FAIL: type('[XProfileTagID] Load Fail'),
};

const InsertXProfileTypes = {
  POST: type('[InsertXProfile] POST'),
  POST_SUCCESS: type('[InsertXProfile] POST Success'),
  POST_FAIL: type('[InsertXProfile] POST Fail'),
};

const LoadCurrentTIDTypes = {
  LOAD: type('[CurrentTID] Load'),
  LOAD_SUCCESS: type('[CurrentTID] Load Success'),
  LOAD_FAIL: type('[CurrentTID] Load Fail'),
};

const SaveXLangTextTypes = {
  POST: type('[SaveXLangText] POST'),
  POST_SUCCESS: type('[SaveXLangText] POST Success'),
  POST_FAIL: type('[SaveXLangText] POST Fail'),
};

const DeleteXProfileTypes = {
  DELETE: type('[DeleteXProfile] DELETE'),
  DELETE_SUCCESS: type('[DeleteXProfile] DELETE Success'),
  DELETE_FAIL: type('[DeleteXProfile] DELETE Fail'),
};

const DeleteXProfileTagTypes = {
  DELETE: type('[DeleteXProfile_XProfileTag] DELETE'),
  DELETE_SUCCESS: type('[DeleteXProfile_XProfileTag] DELETE Success'),
  DELETE_FAIL: type('[DeleteXProfile_XProfileTag] DELETE Fail'),
};

const ExecspXSaveProfileTagsTypes = {
  POST: type('[ExecspXSaveProfileTags] POST'),
  POST_SUCCESS: type('[ExecspXSaveProfileTags] POST Success'),
  POST_FAIL: type('[ExecspXSaveProfileTags] POST Fail'),
};

const UpdateXProfileTypes = {
  PUT: type('[UpdateXProfile] PUT'),
  PUT_SUCCESS: type('[UpdateXProfile] PUT Success'),
  PUT_FAIL: type('[UpdateXProfile] PUT Fail'),
};

export const VorlagenProfilesActionTypes = {
  VorlagenProfilesAction: type('[VorlagenProfile] Action'),
  LoadVorlagenProfilesTypes: LoadVorlagenProfilesTypes,
  LoadXProfileIDTypes: LoadXProfileIDTypes,
  LoadXProfileTagIDTypes: LoadXProfileTagIDTypes,
  InsertXProfileTypes: InsertXProfileTypes,
  LoadCurrentTIDTypes: LoadCurrentTIDTypes,
  SaveXLangTextTypes: SaveXLangTextTypes,
  DeleteXProfileTypes: DeleteXProfileTypes,
  DeleteXProfileTagTypes: DeleteXProfileTagTypes,
  ExecspXSaveProfileTagsTypes: ExecspXSaveProfileTagsTypes,
  UpdateXProfileTypes: UpdateXProfileTypes
};

export class VorlagenProfilesAction implements AppStateAction {
  readonly type = VorlagenProfilesActionTypes.VorlagenProfilesAction;
  constructor(public payload?: any) { }
}

/**
 * Get VorlagenProfile action
 */
export class LoadVorlagenProfilesAction implements AppStateAction {
  readonly type = LoadVorlagenProfilesTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadVorlagenProfilesSuccessAction implements AppStateAction {
  readonly type = LoadVorlagenProfilesTypes.LOAD_SUCCESS;
  constructor(public payload?: Pick<VorlagenProfile, any>[]) { }
}

export class LoadVorlagenProfilesFailAction implements AppStateAction {
  readonly type = LoadVorlagenProfilesTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get VorlagenProfile detail action
 */
export class LoadXProfileIDAction implements AppStateAction {
  readonly type = LoadXProfileIDTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadXProfileIDSuccessAction implements AppStateAction {
  readonly type = LoadXProfileIDTypes.LOAD_SUCCESS;
  constructor(public payload?: any) { }
}

export class LoadXProfileIDFailAction implements AppStateAction {
  readonly type = LoadXProfileIDTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get Load XProfile Tag ID Types action
 */
export class LoadXProfileTagIDAction implements AppStateAction {
  readonly type = LoadXProfileTagIDTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadXProfileTagIDSuccessAction implements AppStateAction {
  readonly type = LoadXProfileTagIDTypes.LOAD_SUCCESS;
  constructor(public payload?: any) { }
}

export class LoadXProfileTagIDFailAction implements AppStateAction {
  readonly type = LoadXProfileTagIDTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get Insert XProfile action
 */
export class InsertXProfilePostAction implements AppStateAction {
  readonly type = InsertXProfileTypes.POST;
  constructor(public payload?: any) { }
}

export class InsertXProfileSuccessAction implements AppStateAction {
  readonly type = InsertXProfileTypes.POST_SUCCESS;
  constructor(public payload?: any) { }
}

export class InsertXProfileFailAction implements AppStateAction {
  readonly type = InsertXProfileTypes.POST_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get CurrentTID action
 */
export class LoadCurrentTIDAction implements AppStateAction {
  readonly type = LoadCurrentTIDTypes.LOAD;
  constructor(public payload?: any) { }
}

export class LoadCurrentTIDSuccessAction implements AppStateAction {
  readonly type = LoadCurrentTIDTypes.LOAD_SUCCESS;
  constructor(public payload?: any) { }
}

export class LoadCurrentTIDFailAction implements AppStateAction {
  readonly type = LoadCurrentTIDTypes.LOAD_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get Save XLang Text action
 */
export class SaveXLangTextPostAction implements AppStateAction {
  readonly type = SaveXLangTextTypes.POST;
  constructor(public payload?: any) { }
}

export class SaveXLangTextSuccessAction implements AppStateAction {
  readonly type = SaveXLangTextTypes.POST_SUCCESS;
  constructor(public payload?: any) { }
}

export class SaveXLangTextFailAction implements AppStateAction {
  readonly type = SaveXLangTextTypes.POST_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Delete XProfile
 */
export class DeleteXProfileDeleteAction implements AppStateAction {
  readonly type = DeleteXProfileTypes.DELETE;
  constructor(public payload?: any) { }
}

export class DeleteXProfileSuccessAction implements AppStateAction {
  readonly type = DeleteXProfileTypes.DELETE_SUCCESS;
  constructor(public payload?: any) { }
}

export class DeleteXProfileFailAction implements AppStateAction {
  readonly type = DeleteXProfileTypes.DELETE_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Delete XProfile Tag
 */
export class DeleteXProfileTagDeleteAction implements AppStateAction {
  readonly type = DeleteXProfileTagTypes.DELETE;
  constructor(public payload?: any) { }
}

export class DeleteXProfileTagSuccessAction implements AppStateAction {
  readonly type = DeleteXProfileTagTypes.DELETE_SUCCESS;
  constructor(public payload?: any) { }
}

export class DeleteXProfileTagFailAction implements AppStateAction {
  readonly type = DeleteXProfileTagTypes.DELETE_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get Save XLang Text action
 */
export class ExecspXSaveProfileTagsPostAction implements AppStateAction {
  readonly type = ExecspXSaveProfileTagsTypes.POST;
  constructor(public payload?: any) { }
}

export class ExecspXSaveProfileTagsSuccessAction implements AppStateAction {
  readonly type = ExecspXSaveProfileTagsTypes.POST_SUCCESS;
  constructor(public payload?: any) { }
}

export class ExecspXSaveProfileTagsFailAction implements AppStateAction {
  readonly type = ExecspXSaveProfileTagsTypes.POST_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Get Update XProfile action
 */
export class UpdateXProfilePutAction implements AppStateAction {
  readonly type = UpdateXProfileTypes.PUT;
  constructor(public payload?: any) { }
}

export class UpdateXProfileSuccessAction implements AppStateAction {
  readonly type = UpdateXProfileTypes.PUT_SUCCESS;
  constructor(public payload?: any) { }
}

export class UpdateXProfileFailAction implements AppStateAction {
  readonly type = UpdateXProfileTypes.PUT_FAIL;
  constructor(public payload?: any) { }
}

export type VorlagenProfileActions
  = VorlagenProfilesAction
  | LoadVorlagenProfilesAction
  | LoadVorlagenProfilesFailAction
  | LoadVorlagenProfilesSuccessAction;

export type XProfileIDActions
  = LoadXProfileIDAction
  | LoadXProfileIDFailAction
  | LoadXProfileIDSuccessAction;

export type XProfileTagIDActions
  = LoadXProfileTagIDAction
  | LoadXProfileTagIDFailAction
  | LoadXProfileTagIDSuccessAction;

export type InsertXProfileAction
  = InsertXProfilePostAction
  | InsertXProfileSuccessAction
  | InsertXProfileFailAction;

export type GetCurrentTIDAction
  = LoadCurrentTIDAction
  | LoadCurrentTIDSuccessAction
  | LoadCurrentTIDSuccessAction;

export type SaveXLangTextAction
  = SaveXLangTextPostAction
  | SaveXLangTextSuccessAction
  | SaveXLangTextFailAction;

export type DeleteXProfileAction
  = DeleteXProfileDeleteAction
  | DeleteXProfileSuccessAction
  | DeleteXProfileFailAction;

export type DeleteXProfileTagAction
  = DeleteXProfileTagDeleteAction
  | DeleteXProfileTagSuccessAction
  | DeleteXProfileTagFailAction;

export type ExecspXSaveProfileTagsAction
  = ExecspXSaveProfileTagsPostAction
  | ExecspXSaveProfileTagsSuccessAction
  | ExecspXSaveProfileTagsFailAction;

export type UpdateXProfileAction
  = UpdateXProfilePutAction
  | UpdateXProfileSuccessAction
  | UpdateXProfileFailAction;
