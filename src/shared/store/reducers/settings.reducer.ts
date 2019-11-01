import { SettingsActions, SettingsActionTypes } from '../actions/settings.actions';
import { tryParseJSON, mergeArrayObject, spliceObjectArray, moveItemToTopArr, mergeOrUpdateObjectIntoArray } from '@shared/utilites/utilityHelpers';

export interface State {
  toogleMenuLeft: boolean;
  langChanging: boolean;
  selectedLanguage: string;
  selectedCulture: string;
  availableLanguages: any[];
  selectedActions: any[];
}

export const initialState: State = {
  toogleMenuLeft: false,
  langChanging: false,
  selectedLanguage: '',
  selectedCulture: '',
  availableLanguages: [
    { code: 'de', name: 'Deutsch', culture: 'de-CH', flag: 'famfamfam-flag-de' },
    { code: 'en', name: 'English', culture: 'en-EN', flag: 'famfamfam-flag-gb' },
    { code: 'fr', name: 'France', culture: 'fr-CH', flag: 'famfamfam-flag-fr' },
    { code: 'it', name: 'Italy', culture: 'it-CH', flag: 'famfamfam-flag-it' }
  ],
  selectedActions: tryParseJSON(localStorage.getItem('select:actions')) || []
};

export function reducer(state = initialState, action: SettingsActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case SettingsActionTypes.SettingsAction:
      return state;

    case SettingsActionTypes.SET_LANGUAGE: {
      return Object.assign({}, state, { selectedLanguage: action.payload });
    }

    case SettingsActionTypes.SET_CULTURE: {
      const selectedCulture = action.payload;
      return Object.assign({}, state, { selectedCulture: selectedCulture, langChanging: false });
    }

    case SettingsActionTypes.SET_LANGUAGES_SUCCESS: {
      return Object.assign({}, state, { langChanging: action.payload });
    }

    case SettingsActionTypes.SET_AVAIBLE_LANGUAGE: {
      return Object.assign({}, state, {
        availableLanguages: action.payload
      });
    }

    case SettingsActionTypes.UPDATE_SELECT_ACTION: {
      let selecteds = mergeArrayObject(state.selectedActions, action.payload, 'id');
      selecteds = moveItemToTopArr(selecteds, action.payload);
      localStorage.setItem('select:actions', JSON.stringify(selecteds));
      return Object.assign({}, state, {
        selectedActions: [...selecteds]
      });
    }

    case SettingsActionTypes.DELETE_ITEM_SELECT_ACTION: {
      const selecteds = spliceObjectArray(state.selectedActions, action.payload, 'id');
      localStorage.setItem('select:actions', JSON.stringify(selecteds));
      return Object.assign({}, state, {
        selectedActions: [...selecteds]
      });
    }

    case SettingsActionTypes.UPDATE_OR_ADD_STICKY: {
      const selecteds = mergeOrUpdateObjectIntoArray(state.selectedActions, action.payload, 'id');
      localStorage.setItem('select:actions', JSON.stringify(selecteds));
      return Object.assign({}, state, {
        selectedActions: [...selecteds]
      });
    }

    default:
      return state;
  }
}

export const getSelectedLanguage = (state: State) => state.selectedLanguage;
export const getSelectedCulture = (state: State) => state.selectedCulture;
export const getAvailableLanguages = (state: State) => state.availableLanguages;
export const getSelectedActions = (state: State) => state.selectedActions;
export const getLanguageChanging = (state: State) => state.langChanging;
export const getToogleMenuLeft = (state: State) => state.toogleMenuLeft;
