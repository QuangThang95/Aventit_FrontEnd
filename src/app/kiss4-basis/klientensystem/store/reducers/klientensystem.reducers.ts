import { ProcessState } from '@shared/AppAction';

import { Falltraeger, Mietvertrag, Relation, VwInstitution } from '../../models';
import { KlientensystemActions, KlientensystemActionTypes } from '../actions/klientensystem.actions';

export interface State extends ProcessState {
  falltraegers: any;
  vwInstitution: any;
  relation: any;
  mietvertrag: any;
  beziehungRelationGeneric: any;
  beziehungRelationMale: any;
  beziehungRelationFemale: any;
  inFP?: any;
  gleicheAdresse: any;
  handleGleicherHaushalt: boolean;
  updateBaPersonRelation: boolean;
  updateBaMietvertrag: any;
  updateBaPerson: boolean;
  insertHistoryVersion: boolean;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  failed: false,
  falltraegers: null,
  vwInstitution: [],
  relation: [],
  mietvertrag: [],
  beziehungRelationGeneric: [],
  beziehungRelationMale: [],
  beziehungRelationFemale: [],
  inFP: false,
  gleicheAdresse: false,
  handleGleicherHaushalt: false,
  updateBaPersonRelation: false,
  updateBaMietvertrag: false,
  updateBaPerson: false,
  insertHistoryVersion: false
};

export function reducer(state = initialState, action: KlientensystemActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case KlientensystemActionTypes.KlientensystemAction:
      return state;

    /**
     * Load falltraegers
     */
    case KlientensystemActionTypes.LoadFalltraegerTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        falltraegers: null
      });
    }

    case KlientensystemActionTypes.LoadFalltraegerTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        falltraegers: action.payload
      });
    }

    case KlientensystemActionTypes.LoadFalltraegerTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        falltraegers: action.payload
      });
    }
    case KlientensystemActionTypes.LoadFalltraegerTypes.RESET_STATE: {
      state = initialState;
      return state;
    }
    /**
     * Load Mietvertrag
     */
    case KlientensystemActionTypes.LoadMietvertragTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        mietvertrag: []
      });
    }

    case KlientensystemActionTypes.LoadMietvertragTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        mietvertrag: action.payload
      });
    }

    case KlientensystemActionTypes.LoadMietvertragTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        mietvertrag: action.payload
      });
    }

    /**
     * Load Mietvertrag
     */
    case KlientensystemActionTypes.LoadRelationTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        relation: [],
      });
    }

    case KlientensystemActionTypes.LoadRelationTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        relation: action.payload,
      });
    }

    case KlientensystemActionTypes.LoadRelationTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        relation: action.payload,
      });
    }

    /**
     * Load VwInstitution
     */
    case KlientensystemActionTypes.LoadVwInstitutionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        vwInstitution: []
      });
    }

    case KlientensystemActionTypes.LoadVwInstitutionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        vwInstitution: action.payload
      });
    }

    case KlientensystemActionTypes.LoadVwInstitutionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        vwInstitution: action.payload
      });
    }

    /**
     * Load BeziehungRelationGeneric
     */
    case KlientensystemActionTypes.BeziehungRelationGenericTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        beziehungRelationGeneric: []
      });
    }

    case KlientensystemActionTypes.BeziehungRelationGenericTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        beziehungRelationGeneric: action.payload
      });
    }

    case KlientensystemActionTypes.BeziehungRelationGenericTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        beziehungRelationGeneric: action.payload
      });
    }

    /**
     * Load BeziehungRelationMale
     */
    case KlientensystemActionTypes.BeziehungRelationMaleTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        beziehungRelationMale: []
      });
    }

    case KlientensystemActionTypes.BeziehungRelationMaleTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        beziehungRelationMale: action.payload
      });
    }

    case KlientensystemActionTypes.BeziehungRelationMaleTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        beziehungRelationMale: action.payload
      });
    }

    /**
     * Load BeziehungRelationFemale
     */
    case KlientensystemActionTypes.BeziehungRelationFemaleTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        beziehungRelationFemale: []
      });
    }

    case KlientensystemActionTypes.BeziehungRelationFemaleTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        beziehungRelationFemale: action.payload
      });
    }

    case KlientensystemActionTypes.BeziehungRelationFemaleTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        beziehungRelationFemale: action.payload
      });
    }
    /**
     * Load InFP
     */
    case KlientensystemActionTypes.InFPTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        inFP: null
      });
    }

    case KlientensystemActionTypes.InFPTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        inFP: action.payload
      });
    }

    case KlientensystemActionTypes.InFPTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        inFP: action.payload
      });
    }

    /**
     * Load GleicheAdresse
     */
    case KlientensystemActionTypes.GleicheAdresseTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        gleicheAdresse: false
      });
    }

    case KlientensystemActionTypes.GleicheAdresseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        gleicheAdresse: action.payload
      });
    }

    case KlientensystemActionTypes.GleicheAdresseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        gleicheAdresse: action.payload
      });
    }

    /**
     * Load HandleGleicherHaushalt
     */
    case KlientensystemActionTypes.HandleGleicherHaushaltTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        handleGleicherHaushalt: false
      });
    }

    case KlientensystemActionTypes.HandleGleicherHaushaltTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        handleGleicherHaushalt: action.payload
      });
    }

    case KlientensystemActionTypes.HandleGleicherHaushaltTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        handleGleicherHaushalt: action.payload
      });
    }

    /**
     * Update BaPersonRelation
     */
    case KlientensystemActionTypes.UpdateBaPersonRelationTypes.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        updateBaPersonRelation: false
      });
    }

    case KlientensystemActionTypes.UpdateBaPersonRelationTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        updateBaPersonRelation: action.payload
      });
    }

    case KlientensystemActionTypes.UpdateBaPersonRelationTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        updateBaPersonRelation: false
      });
    }
    /**
     * Update BaMietvertrag
     */
    case KlientensystemActionTypes.UpdateBaMietvertragTypes.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        updateBaMietvertrag: false
      });
    }

    case KlientensystemActionTypes.UpdateBaMietvertragTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        updateBaMietvertrag: action.payload
      });
    }

    case KlientensystemActionTypes.UpdateBaMietvertragTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        updateBaMietvertrag: action.payload
      });
    }

    /**
     * Update BaPerson
     */
    case KlientensystemActionTypes.UpdateBaPersonTypes.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        updateBaPerson: false
      });
    }

    case KlientensystemActionTypes.UpdateBaPersonTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        updateBaPerson: action.payload
      });
    }

    case KlientensystemActionTypes.UpdateBaPersonTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        updateBaPerson: false
      });
    }
    /**
     * Insert HistoryVersion
     */
    case KlientensystemActionTypes.InsertHistoryVersionTypes.INSERT: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
        insertHistoryVersion: false
      });
    }

    case KlientensystemActionTypes.InsertHistoryVersionTypes.INSERT_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        insertHistoryVersion: action.payload
      });
    }

    case KlientensystemActionTypes.InsertHistoryVersionTypes.INSERT_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: true,
        insertHistoryVersion: false
      });
    }

    default:
      return state;
  }
}
export const getKlientensystemLoadingData = (state: State) => state.loading;
export const getKlientensystemLoadedData = (state: State) => state.loaded;
export const getKlientensystemFailedData = (state: State) => state.failed;

export const getFalltraegerData = (state: State) => state.falltraegers;
export const getMietvertragData = (state: State) => state.mietvertrag;
export const getRelationData = (state: State) => state.relation;
export const getVwInstitutionData = (state: State) => state.vwInstitution;

export const getBeziehungRelationGeneric = (state: State) => state.beziehungRelationGeneric;
export const getBeziehungRelationMale = (state: State) => state.beziehungRelationMale;
export const getBeziehungRelationFemale = (state: State) => state.beziehungRelationFemale;
export const getInFP = (state: State) => state.inFP;
export const getGleicheAdresse = (state: State) => state.gleicheAdresse;
export const getHandleGleicherHaushalt = (state: State) => state.handleGleicherHaushalt;
export const updateBaPersonRelation = (state: State) => state.updateBaPersonRelation;
export const updateBaMietvertrag = (state: State) => state.updateBaMietvertrag;
export const updateBaPerson = (state: State) => state.updateBaPerson;
export const insertHistoryVersion = (state: State) => state.insertHistoryVersion;
