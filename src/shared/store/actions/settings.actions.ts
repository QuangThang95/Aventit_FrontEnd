import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

export const SettingsActionTypes = {
  SettingsAction: type('[Settings] Action'),
  SET_LANGUAGE: type('[Settings] SetLanguage'),
  SET_CULTURE: type('[Settings] SetCulture'),
  SET_LANGUAGES_SUCCESS: type('Set Languages sucess'),
  SET_AVAIBLE_LANGUAGE: type('[SET_AVAIBLE_LANGUAGE] Get data'),
  UPDATE_SELECT_ACTION: type('[UPDATE_SELECT_ACTION] Set'),
  DELETE_ITEM_SELECT_ACTION: type('[DELETE_ITEM_SELECT_ACTION] update'),
  UPDATE_OR_ADD_STICKY: type('[Settings] Update Or Add Sticky'),
};

export class Settings implements AppStateAction {
  readonly type = SettingsActionTypes.SettingsAction;
  constructor(public payload?: any) { }
}

/**
 * Settings Actions
 */
export class SetLanguageAction implements AppStateAction {
  readonly type = SettingsActionTypes.SET_LANGUAGE;
  constructor(public payload?: string) { }
}

export class SetCultureAction implements AppStateAction {
  readonly type = SettingsActionTypes.SET_CULTURE;
  constructor(public payload?: string) { }
}

export class SetLanguageSuccessAction implements AppStateAction {
  readonly type = SettingsActionTypes.SET_LANGUAGES_SUCCESS;
  constructor(public payload?: boolean) {}
}

export class SetAvailableLanguagesAction implements AppStateAction {
  readonly type = SettingsActionTypes.SET_AVAIBLE_LANGUAGE;
  constructor(public payload?: any) { }
}

export class UpdateSelectedAction implements AppStateAction {
  readonly type = SettingsActionTypes.UPDATE_SELECT_ACTION;
  constructor(public payload?: any) { }
}

export class DeleteItemSelectedAction implements AppStateAction {
  readonly type = SettingsActionTypes.DELETE_ITEM_SELECT_ACTION;
  constructor(public payload?: any) { }
}

export class UpdateOrAddStickyAction implements AppStateAction {
  readonly type = SettingsActionTypes.UPDATE_OR_ADD_STICKY;
  constructor(public payload?: any) { }
}

export type SettingsActions
  = Settings
  | SetLanguageAction
  | SetCultureAction
  | SetLanguageSuccessAction
  | SetAvailableLanguagesAction
  | UpdateSelectedAction
  | DeleteItemSelectedAction
  | UpdateOrAddStickyAction;
