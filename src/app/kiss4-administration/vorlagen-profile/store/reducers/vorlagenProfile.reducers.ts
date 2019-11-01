import { VorlagenProfile } from '../../models';
import { VorlagenProfileActions, VorlagenProfilesActionTypes } from '../actions/vorlagenProfile.actions';
import { AppEntityCustomState, ProcessState } from '@shared/AppAction';

export interface State extends ProcessState {
  gridData: any;
  xProfile: any;
  xProfileTag: any;
  insertResult: any;
  currentTID: any;
  saveXLangTextResult: any;
  deleteXProfileResult: any;
  deleteXProfileTagResult: any;
  execspXSaveProfileTagsResult: any;
  updateResult: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  failed: false,
  gridData: [],
  xProfile: [],
  xProfileTag: [],
  insertResult: false,
  currentTID: null,
  saveXLangTextResult: false,
  deleteXProfileResult: false,
  deleteXProfileTagResult: false,
  execspXSaveProfileTagsResult: false,
  updateResult: false
};


export function reducer(state = initialState, action: VorlagenProfileActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case VorlagenProfilesActionTypes.VorlagenProfilesAction:
      return state;

    /**
     * Load data grid
     */
    case VorlagenProfilesActionTypes.LoadVorlagenProfilesTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        gridData: []
      });
    }

    case VorlagenProfilesActionTypes.LoadVorlagenProfilesTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        gridData: action.payload,
      });
    }

    case VorlagenProfilesActionTypes.LoadVorlagenProfilesTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        gridData: action.payload,
      });
    }

    /**
    * Load xProfile
    */
    case VorlagenProfilesActionTypes.LoadXProfileIDTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        xProfile: null,
      });
    }

    case VorlagenProfilesActionTypes.LoadXProfileIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        xProfile: action.payload
      });
    }

    case VorlagenProfilesActionTypes.LoadXProfileIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        xProfile: action.payload
      });
    }

    /**
     * Load XProfile Tag
     */
    case VorlagenProfilesActionTypes.LoadXProfileTagIDTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        xProfileTag: []
      });
    }

    case VorlagenProfilesActionTypes.LoadXProfileTagIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        xProfileTag: action.payload
      });
    }

    case VorlagenProfilesActionTypes.LoadXProfileTagIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        xProfileTag: action.payload
      });
    }

    /**
     * Insert XProfile
     */
    case VorlagenProfilesActionTypes.InsertXProfileTypes.POST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        insertResult: false
      });
    }

    case VorlagenProfilesActionTypes.InsertXProfileTypes.POST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        insertResult: action.payload
      });
    }

    case VorlagenProfilesActionTypes.InsertXProfileTypes.POST_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        insertResult: action.payload
      });
    }

    /**
     * Get Current TID
     */
    case VorlagenProfilesActionTypes.LoadCurrentTIDTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        currentTID: null
      });
    }

    case VorlagenProfilesActionTypes.LoadCurrentTIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        currentTID: action.payload
      });
    }

    case VorlagenProfilesActionTypes.LoadCurrentTIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        currentTID: action.payload
      });
    }

    /**
    * Save XLang Text Result
    */
    case VorlagenProfilesActionTypes.SaveXLangTextTypes.POST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        saveXLangTextResult: false,
      });
    }

    case VorlagenProfilesActionTypes.SaveXLangTextTypes.POST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        saveXLangTextResult: action.payload,
      });
    }

    case VorlagenProfilesActionTypes.SaveXLangTextTypes.POST_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        saveXLangTextResult: action.payload
      });
    }

    /**
    * Delete XProfile Result
    */
    case VorlagenProfilesActionTypes.DeleteXProfileTypes.DELETE: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        deleteXProfileResult: false
      });
    }

    case VorlagenProfilesActionTypes.DeleteXProfileTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        deleteXProfileResult: action.payload
      });
    }

    case VorlagenProfilesActionTypes.DeleteXProfileTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        deleteXProfileResult: action.payload
      });
    }

    /**
    * Delete XProfile Tag Result
    */
    case VorlagenProfilesActionTypes.DeleteXProfileTagTypes.DELETE: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        deleteXProfileTagResult: false,
      });
    }

    case VorlagenProfilesActionTypes.DeleteXProfileTagTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        deleteXProfileTagResult: action.payload
      });
    }

    case VorlagenProfilesActionTypes.DeleteXProfileTagTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        deleteXProfileTagResult: action.payload
      });
    }

    /**
    * Execsp XSaveProfile Tags Result
    */
    case VorlagenProfilesActionTypes.ExecspXSaveProfileTagsTypes.POST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        execspXSaveProfileTagsResult: false
      });
    }

    case VorlagenProfilesActionTypes.ExecspXSaveProfileTagsTypes.POST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        execspXSaveProfileTagsResult: action.payload
      });
    }

    case VorlagenProfilesActionTypes.ExecspXSaveProfileTagsTypes.POST_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        execspXSaveProfileTagsResult: action.payload
      });
    }

    /**
     * Update XProfile
     */
    case VorlagenProfilesActionTypes.UpdateXProfileTypes.PUT: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        updateResult: false
      });
    }

    case VorlagenProfilesActionTypes.UpdateXProfileTypes.PUT_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        updateResult: action.payload
      });
    }

    case VorlagenProfilesActionTypes.UpdateXProfileTypes.PUT_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        updateResult: action.payload
      });
    }

    default:
      return state;
  }
}

export const getVorlagenProfileData = (state: State) => state.gridData;
export const getXProfileID = (state: State) => state.xProfile;
export const getXProfileTagID = (state: State) => state.xProfileTag;
export const getInsertXProfileResult = (state: State) => state.insertResult;
export const getCurrentTID = (state: State) => state.currentTID;
export const getSaveXLangTextResult = (state: State) => state.saveXLangTextResult;
export const getDeleteXProfileResult = (state: State) => state.deleteXProfileResult;
export const getDeleteXProfileTagResult = (state: State) => state.deleteXProfileTagResult;
export const getExecspXSaveProfileTagsResult = (state: State) => state.execspXSaveProfileTagsResult;
export const getUpdateXProfileResult = (state: State) => state.updateResult;
export const getVorlagenProfileLoading = (state: State) => state.loading;
export const getVorlagenProfileLoaded = (state: State) => state.loaded;
export const getVorlagenProfileFailed = (state: State) => state.failed;
