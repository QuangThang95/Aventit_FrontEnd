import { AppEntityCustomState } from '@shared/AppAction';

import {
  CountRecord,
  DataGridBottom,
  DeleteRecord,
  InitDataCombox,
  ResultValue,
  TopFaLeistung,
  TopFaLeistungValue,
  UpdateVorsaldo,
  UpdateWhLeistung,
  ValueReturn,
} from '../../models';
import { WhLeistungActions, WhLeistungActionTypes } from '../actions/whleistung.actions';

interface ComboboxInitDataState extends AppEntityCustomState<ResultValue[], InitDataCombox> { }

interface ComboboxBFSInitDataState extends AppEntityCustomState<ResultValue[], InitDataCombox> { }

interface ComboboxGemeInitDataState extends AppEntityCustomState<ResultValue[], InitDataCombox> { }

interface ComboboxBototmInitDataState extends AppEntityCustomState<ResultValue[], InitDataCombox> { }

interface TopInitDataState extends AppEntityCustomState<TopFaLeistungValue, TopFaLeistung> { }

interface GridBottomInitDataState extends AppEntityCustomState<DataGridBottom[], TopFaLeistung> { }

interface CountInitDataState extends AppEntityCustomState<CountRecord, TopFaLeistung> { }

interface DeleteInitDataState extends AppEntityCustomState<any, DeleteRecord> {
  deleting: false;
  deleted: false;
}

interface UpdateInitDataState extends AppEntityCustomState<any, UpdateWhLeistung> {
  updating: false;
  updated: false;
}

interface UpdateVorsaldoInitDataState extends AppEntityCustomState<any, UpdateVorsaldo> {
  updating: false;
  updated: false;
}

interface GetAnzahlOffenePendenzenDataState extends AppEntityCustomState<any, any> { }

interface GetMLMessageDataState extends AppEntityCustomState<any, any> { }
interface VorsaldoKbKostenstelleIDState extends AppEntityCustomState<any, any> { }


export interface State {
  ComboboxInitDataState: ComboboxInitDataState;
  ComboboxBFSInitDataState: ComboboxBFSInitDataState;
  ComboboxGemeInitDataState: ComboboxGemeInitDataState;
  ComboboxBototmInitDataState: ComboboxBototmInitDataState;
  TopInitDataState: TopInitDataState;
  GridBottomInitDataState: GridBottomInitDataState;
  CountInitDataState: CountInitDataState;
  DeleteInitDataState: DeleteInitDataState;
  UpdateInitDataState: UpdateInitDataState;
  UpdateVorsaldoInitDataState: UpdateVorsaldoInitDataState;
  GetAnzahlOffenePendenzenDataState: GetAnzahlOffenePendenzenDataState;
  GetMLMessageDataState: GetMLMessageDataState;
  VorsaldoKbKostenstelleIDState: VorsaldoKbKostenstelleIDState;
}

export const initialState: State = {
  ComboboxInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  ComboboxBFSInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  ComboboxGemeInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  ComboboxBototmInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  TopInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GridBottomInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CountInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DeleteInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    query: null,
    data: null,
  },
  UpdateInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  UpdateVorsaldoInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  GetAnzahlOffenePendenzenDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GetMLMessageDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  VorsaldoKbKostenstelleIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};

export function reducer(state = initialState, action: WhLeistungActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case WhLeistungActionTypes.WhLeistungAction:
      return state;

    case WhLeistungActionTypes.ComboboxDatasTypes.LOAD: {
      return Object.assign({}, state, {
        ComboboxInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.ComboboxDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ComboboxInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.ComboboxDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ComboboxInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // cbx BFS
    case WhLeistungActionTypes.ComboboxBFSDatasTypes.LOAD: {
      return Object.assign({}, state, {
        ComboboxBFSInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.ComboboxBFSDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ComboboxBFSInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.ComboboxBFSDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ComboboxBFSInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: action.payload,
        }
      });
    }

    // cbx Geme
    case WhLeistungActionTypes.ComboboxGemeDatasTypes.LOAD: {
      return Object.assign({}, state, {
        ComboboxGemeInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.ComboboxGemeDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ComboboxGemeInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.ComboboxGemeDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ComboboxGemeInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // cbx Bottom
    case WhLeistungActionTypes.ComboboxBottomDatasTypes.LOAD: {
      return Object.assign({}, state, {
        ComboboxBototmInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.ComboboxBottomDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ComboboxBototmInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.ComboboxBottomDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ComboboxBototmInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Load Top

    case WhLeistungActionTypes.TopDatasTypes.LOAD: {
      return Object.assign({}, state, {
        TopInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.TopDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        TopInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.TopDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        TopInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Load Bottom data Grid

    case WhLeistungActionTypes.LoadBottomDatasTypes.LOAD: {
      return Object.assign({}, state, {
        GridBottomInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.LoadBottomDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GridBottomInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.LoadBottomDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GridBottomInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Count Data

    case WhLeistungActionTypes.CountDatasTypes.LOAD: {
      return Object.assign({}, state, {
        CountInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.CountDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CountInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.CountDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CountInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Delete
    case WhLeistungActionTypes.DeleteRecordDatasTypes.DELETE: {
      return Object.assign({}, state, {
        DeleteInitDataState: {
          deleting: true,
          deleted: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.DeleteRecordDatasTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        DeleteInitDataState: {
          deleting: false,
          deleted: true,
          failed: false,
          query: null,
          data: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.DeleteRecordDatasTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        DeleteInitDataState: {
          deleting: false,
          deleted: false,
          failed: true,
          query: null,
          data: action.payload,
        }
      });
    }

    //  Update Whleistung
    case WhLeistungActionTypes.UpdateDatasTypes.UPDATE: {
      return Object.assign({}, state, {
        UpdateInitDataState: {
          updating: true,
          updated: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case WhLeistungActionTypes.UpdateDatasTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        UpdateInitDataState: {
          updating: false,
          updated: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.UpdateDatasTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        UpdateInitDataState: {
          adding: false,
          added: false,
          failed: true,
          data: action.payload
        }
      });
    }

    // Update Vorsaldo
    case WhLeistungActionTypes.UpdateVorsaldoDatasTypes.UPDATE: {
      return Object.assign({}, state, {
        UpdateVorsaldoInitDataState: {
          updating: true,
          updated: false,
          failed: false,
        }
      });
    }

    case WhLeistungActionTypes.UpdateVorsaldoDatasTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        UpdateVorsaldoInitDataState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.UpdateVorsaldoDatasTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        UpdateVorsaldoInitDataState: {
          adding: false,
          added: false,
          failed: true,
          data: action.payload
        }
      });
    }
    // GetAnzahlOffenePendenzen
    case WhLeistungActionTypes.GetAnzahlOffenePendenzenDatasTypes.LOAD: {
      return Object.assign({}, state, {
        GetAnzahlOffenePendenzenDataState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.GetAnzahlOffenePendenzenDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetAnzahlOffenePendenzenDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.GetAnzahlOffenePendenzenDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetAnzahlOffenePendenzenDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // GetMLMessageDataState
    case WhLeistungActionTypes.GetMLMessageDataTypes.LOAD: {
      return Object.assign({}, state, {
        GetMLMessageDataState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.GetMLMessageDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetMLMessageDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.GetMLMessageDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetMLMessageDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Get VorsaldoKbKostenstelle
    case WhLeistungActionTypes.GetVorsaldoKbKostenstelleIDTypes.LOAD: {
      return Object.assign({}, state, {
        VorsaldoKbKostenstelleIDState: {
          loading: true,
          query: action.payload,
        }
      });
    }

    case WhLeistungActionTypes.GetVorsaldoKbKostenstelleIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        VorsaldoKbKostenstelleIDState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case WhLeistungActionTypes.GetVorsaldoKbKostenstelleIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        VorsaldoKbKostenstelleIDState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    default:
      return state;
  }
}

export const getComboboxWhLeiStung = {
  getDatas: (state: State) => state.ComboboxInitDataState.data,
  getLoading: (state: State) => state.ComboboxInitDataState.loading,
  getLoaded: (state: State) => state.ComboboxInitDataState.loaded,
  getFailed: (state: State) => state.ComboboxInitDataState.failed
};

export const getComboboxBFSWhLeiStung = {
  getDatas: (state: State) => state.ComboboxBFSInitDataState.data,
  getLoading: (state: State) => state.ComboboxBFSInitDataState.loading,
  getLoaded: (state: State) => state.ComboboxBFSInitDataState.loaded,
  getFailed: (state: State) => state.ComboboxBFSInitDataState.failed
};

export const getComboboxGemeWhLeiStung = {
  getDatas: (state: State) => state.ComboboxGemeInitDataState.data,
  getLoading: (state: State) => state.ComboboxGemeInitDataState.loading,
  getLoaded: (state: State) => state.ComboboxGemeInitDataState.loaded,
  getFailed: (state: State) => state.ComboboxGemeInitDataState.failed
};

export const getComboboxBottomWhLeiStung = {
  getDatas: (state: State) => state.ComboboxBototmInitDataState.data,
  getLoading: (state: State) => state.ComboboxBototmInitDataState.loading,
  getLoaded: (state: State) => state.ComboboxBototmInitDataState.loaded,
  getFailed: (state: State) => state.ComboboxBototmInitDataState.failed
};

export const getTopWhLeiStung = {
  getDatas: (state: State) => state.TopInitDataState.data,
  getLoading: (state: State) => state.TopInitDataState.loading,
  getLoaded: (state: State) => state.TopInitDataState.loaded,
  getFailed: (state: State) => state.TopInitDataState.failed
};

export const getBottomDataGridWhLeiStung = {
  getDatas: (state: State) => state.GridBottomInitDataState.data,
  getLoading: (state: State) => state.GridBottomInitDataState.loading,
  getLoaded: (state: State) => state.GridBottomInitDataState.loaded,
  getFailed: (state: State) => state.GridBottomInitDataState.failed
};

export const countDataWhLeiStung = {
  getDatas: (state: State) => state.CountInitDataState.data,
  getLoading: (state: State) => state.CountInitDataState.loading,
  getLoaded: (state: State) => state.CountInitDataState.loaded,
  getFailed: (state: State) => state.CountInitDataState.failed
};

export const deleteDataWhLeiStung = {
  getDatas: (state: State) => state.DeleteInitDataState.data,
  getDeleting: (state: State) => state.DeleteInitDataState.deleting,
  getDeleted: (state: State) => state.DeleteInitDataState.deleted,
  getFailed: (state: State) => state.DeleteInitDataState.failed
};

export const updateDataWhLeiStung = {
  getDatas: (state: State) => state.UpdateInitDataState.data,
  getUpdating: (state: State) => state.UpdateInitDataState.updating,
  getUpdated: (state: State) => state.UpdateInitDataState.updated,
  getFailed: (state: State) => state.UpdateInitDataState.failed
};

export const updateVorsaldoDataWhLeiStung = {
  getDatas: (state: State) => state.UpdateVorsaldoInitDataState.data,
  getUpdating: (state: State) => state.UpdateVorsaldoInitDataState.updating,
  getUpdated: (state: State) => state.UpdateVorsaldoInitDataState.updated,
  getFailed: (state: State) => state.UpdateVorsaldoInitDataState.failed
};

export const getAnzahlOffenePendenzen = {
  getDatas: (state: State) => state.GetAnzahlOffenePendenzenDataState.data,
  getLoading: (state: State) => state.GetAnzahlOffenePendenzenDataState.loading,
  getLoaded: (state: State) => state.GetAnzahlOffenePendenzenDataState.loaded,
  getFailed: (state: State) => state.GetAnzahlOffenePendenzenDataState.failed
};

export const getMLMessage = {
  getDatas: (state: State) => state.GetMLMessageDataState.data,
  getLoading: (state: State) => state.GetMLMessageDataState.loading,
  getLoaded: (state: State) => state.GetMLMessageDataState.loaded,
  getFailed: (state: State) => state.GetMLMessageDataState.failed
};
export const getVorsaldoKbKostenstelleID = {
  getDatas: (state: State) => state.VorsaldoKbKostenstelleIDState.data
};
