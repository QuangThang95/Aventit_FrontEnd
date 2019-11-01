import { AppEntityCustomState } from '@shared/AppAction';

import {
  ASVDetenerfassung,
  ModelFileBinary,
  ModelQueryInsertASVSExport,
  ModelQueryUpdateASVSExport,
  ModelQueryUpdateTransaction,
  ModelUpdateASVSExport,
  ModelUpdateTransaction,
  ModelXOrgUnit,
  ZuExportierendeEintrage,
  ZuExportierendeEintrageQuery,
} from '../../models';
import { AsvexportActions, AsvexportActionTypes } from '../actions/asvexport.action';

interface AsvexportInitDatasState extends AppEntityCustomState<any, number> { }

interface AsvEintrageInitDatasState extends AppEntityCustomState<any, ZuExportierendeEintrageQuery> { }

interface FileBinaryDatasState extends AppEntityCustomState<any, number> { }

interface XOrgUnitsDatasState extends AppEntityCustomState<any, number> { }

interface InsertSstASVSExportState extends AppEntityCustomState<boolean, ModelQueryInsertASVSExport> { }

interface UpdateSstASVSExportState extends AppEntityCustomState<ModelUpdateASVSExport, ModelQueryUpdateASVSExport> { }

interface UpdateSstASVSExportTransactionState extends AppEntityCustomState<ModelUpdateTransaction, ModelQueryUpdateTransaction> { }

export interface State {
  AsvexportInitDatasState: AsvexportInitDatasState;
  AsvEintrageInitDatasState: AsvEintrageInitDatasState;
  FileBinaryDatasState: FileBinaryDatasState;
  XOrgUnitsDatasState: XOrgUnitsDatasState;
  InsertSstASVSExportState: InsertSstASVSExportState;
  UpdateSstASVSExportState: UpdateSstASVSExportState;
  UpdateSstASVSExportTransactionState: UpdateSstASVSExportTransactionState;
}


export const initialState: State = {
  // Load data for top grid
  AsvexportInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  // Load data for bottom grid
  AsvEintrageInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  /**
* *****************************************************************
* Load File Binary Data
* Author:DNDUC
* *****************************************************************
*/
  FileBinaryDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  /**
* *****************************************************************
* Load XOrg Units
* Author:DNDUC
* *****************************************************************
*/
  XOrgUnitsDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  /**
  * *****************************************************************
  * Insert SstASVSExport Reducer
  * Author:DNDUC
  * *****************************************************************
  */
  InsertSstASVSExportState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    query: null,

  },

  /**
  * *****************************************************************
  * Update SstASVSExport Reducer
  * Author:DNDUC
  * *****************************************************************
  */
  UpdateSstASVSExportState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    query: null,
  },

  /**
 * *****************************************************************
 * Update SstASVSExport Transaction Reducer
 * Author:DNDUC
 * *****************************************************************
 */
  UpdateSstASVSExportTransactionState: {
    loading: false,
    loaded: false,
    failed: false,
    data: null,
    query: null,
  },
};


export function reducer(state = initialState, action: AsvexportActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case AsvexportActionTypes.AsvexportAction:
      return state;
    // Load data for top grid
    case AsvexportActionTypes.AsvexportTypes.LOAD: {
      return Object.assign({}, state, {
        AsvexportInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.AsvexportTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AsvexportInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.AsvexportTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AsvexportInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }


    // Load data for bottom grid
    case AsvexportActionTypes.AsvexEintragTypes.LOAD: {
      return Object.assign({}, state, {
        AsvEintrageInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.AsvexEintragTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AsvEintrageInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.AsvexEintragTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AsvEintrageInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    /**
* *****************************************************************
* Load File Binary Reducer
* Author:DNDUC
* *****************************************************************
*/

    case AsvexportActionTypes.FileBinaryActionTypes.LOAD: {
      return Object.assign({}, state, {
        FileBinaryDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.FileBinaryActionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        FileBinaryDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.FileBinaryActionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        FileBinaryDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }
    /**
   * *****************************************************************
   * Load Get XOrgUnit Reducer
   * Author:DNDUC
   * *****************************************************************
   */

    case AsvexportActionTypes.GetXOrgUnitAllTypes.LOAD: {
      return Object.assign({}, state, {
        XOrgUnitsDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.GetXOrgUnitAllTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        XOrgUnitsDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.GetXOrgUnitAllTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        XOrgUnitsDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    /**
      * *****************************************************************
      * Insert SstASVSExport Reducer
      * Author:DNDUC
      * *****************************************************************
      */

    case AsvexportActionTypes.SstASVSExportInsertTypes.ADD_NEW: {
      return Object.assign({}, state, {
        InsertSstASVSExportState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.SstASVSExportInsertTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        InsertSstASVSExportState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.SstASVSExportInsertTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        InsertSstASVSExportState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    /**
      * *****************************************************************
      * Update SstASVSExport Reducer
      * Author:DNDUC
      * *****************************************************************
      */

    case AsvexportActionTypes.UpdateASVSExportTypes.UPDATE_ASVSExport: {
      return Object.assign({}, state, {
        UpdateSstASVSExportState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.UpdateASVSExportTypes.UPDATE_ASVSExport_SUCCESS: {
      return Object.assign({}, state, {
        UpdateSstASVSExportState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.UpdateASVSExportTypes.UPDATE_ASVSExport_FAIL: {
      return Object.assign({}, state, {
        UpdateSstASVSExportState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    /**
      * *****************************************************************
      * Update SstASVSExport Transaction Reducer
      * Author:DNDUC
      * *****************************************************************
      */

    case AsvexportActionTypes.UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction: {
      return Object.assign({}, state, {
        UpdateSstASVSExportTransactionState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case AsvexportActionTypes.UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction_SUCCESS: {
      return Object.assign({}, state, {
        UpdateSstASVSExportTransactionState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case AsvexportActionTypes.UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction_FAIL: {
      return Object.assign({}, state, {
        UpdateSstASVSExportTransactionState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: action.payload,
        }
      });
    }
    default:
      return state;
  }
}
// Load data for top grid
export const getAsvexportInit = {
  getDatas: (state: State) => state.AsvexportInitDatasState.data,
  getLoading: (state: State) => state.AsvexportInitDatasState.loading,
  getLoaded: (state: State) => state.AsvexportInitDatasState.loaded,
  getFailed: (state: State) => state.AsvexportInitDatasState.failed
};

// Load data for bottom grid
export const getAsvEintrageData = {
  getDatas: (state: State) => state.AsvEintrageInitDatasState.data,
  getLoading: (state: State) => state.AsvEintrageInitDatasState.loading,
  getLoaded: (state: State) => state.AsvEintrageInitDatasState.loaded,
  getFailed: (state: State) => state.AsvEintrageInitDatasState.failed
};


/**
* *****************************************************************
* Load File Binary
* Author:DNDUC
* *****************************************************************
*/

export const getFileBinaryData = {
  getDatas: (state: State) => state.FileBinaryDatasState.data,
  getLoading: (state: State) => state.FileBinaryDatasState.loading,
  getLoaded: (state: State) => state.FileBinaryDatasState.loaded,
  getFailed: (state: State) => state.FileBinaryDatasState.failed
};

/**
* *****************************************************************
* Get XOrgUnit
* Author:DNDUC
* *****************************************************************
*/

export const getXOrgUnitsData = {
  getDatas: (state: State) => state.XOrgUnitsDatasState.data,
  getLoading: (state: State) => state.XOrgUnitsDatasState.loading,
  getLoaded: (state: State) => state.XOrgUnitsDatasState.loaded,
  getFailed: (state: State) => state.XOrgUnitsDatasState.failed
};

/**
* *****************************************************************
* Insert SstASVSExport Data
* Author:DNDUC
* *****************************************************************
*/

export const insertSstASVSExportData = {
  getDatas: (state: State) => state.InsertSstASVSExportState.data,
  getLoading: (state: State) => state.InsertSstASVSExportState.loading,
  getLoaded: (state: State) => state.InsertSstASVSExportState.loaded,
  getFailed: (state: State) => state.InsertSstASVSExportState.failed
};

/**
* *****************************************************************
* Update SstASVSExport Data
* Author:DNDUC
* *****************************************************************
*/

export const updateSstASVSExportData = {
  getDatas: (state: State) => state.UpdateSstASVSExportState.data,
  getLoading: (state: State) => state.UpdateSstASVSExportState.loading,
  getLoaded: (state: State) => state.UpdateSstASVSExportState.loaded,
  getFailed: (state: State) => state.UpdateSstASVSExportState.failed
};

/**
* *****************************************************************
* Update SstASVSExport Transaction Data
* Author:DNDUC
* *****************************************************************
*/

export const updateSstASVSExportTransactionData = {
  getDatas: (state: State) => state.UpdateSstASVSExportTransactionState.data,
  getLoading: (state: State) => state.UpdateSstASVSExportTransactionState.loading,
  getLoaded: (state: State) => state.UpdateSstASVSExportTransactionState.loaded,
  getFailed: (state: State) => state.UpdateSstASVSExportTransactionState.failed
};
