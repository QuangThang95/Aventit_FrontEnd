import { AppEntityCustomState } from '@shared/AppAction';

import { VorlagenKontextActions, VorlagenKontextActionTypes } from '../actions/vorlagen-kontext.action';

interface VorlagenKontextLoadXDocContextAllState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextLoadZugeteiltByDocContextIDState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextLoadVerfuegbarByDocContextIDState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextPostXDocContextState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextPutXDocContextState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextDelXDocContextState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextCountXDocContextTemplateByDocContextIDState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextLoadParentPositionState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextPostXDocContextTemplateState extends AppEntityCustomState<any, any> {
  data: any[];
}
interface VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextDelXDocContextTemplateState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextDelXDocContextTemplateByDocContextIDState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextLoadTop1XDocContextTemplateDownState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextPutXDocContextTemplateState extends AppEntityCustomState<any, any> {
  data: null;
}
interface VorlagenKontextLoadTop1XDocContextTemplateUpState extends AppEntityCustomState<any, any> {
  data: null;
}
export interface State {
  VorlagenKontextLoadXDocContextAllState: VorlagenKontextLoadXDocContextAllState;
  VorlagenKontextLoadZugeteiltByDocContextIDState: VorlagenKontextLoadZugeteiltByDocContextIDState;
  VorlagenKontextLoadVerfuegbarByDocContextIDState: VorlagenKontextLoadVerfuegbarByDocContextIDState;
  VorlagenKontextPostXDocContextState: VorlagenKontextPostXDocContextState;
  VorlagenKontextPutXDocContextState: VorlagenKontextPutXDocContextState;
  VorlagenKontextDelXDocContextState: VorlagenKontextDelXDocContextState;
  VorlagenKontextCountXDocContextTemplateByDocContextIDState: VorlagenKontextCountXDocContextTemplateByDocContextIDState;
  VorlagenKontextLoadParentPositionState: VorlagenKontextLoadParentPositionState;
  VorlagenKontextPostXDocContextTemplateState: VorlagenKontextPostXDocContextTemplateState;
  VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState: VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState;
  VorlagenKontextDelXDocContextTemplateState: VorlagenKontextDelXDocContextTemplateState;
  VorlagenKontextDelXDocContextTemplateByDocContextIDState: VorlagenKontextDelXDocContextTemplateByDocContextIDState;
  VorlagenKontextLoadTop1XDocContextTemplateDownState: VorlagenKontextLoadTop1XDocContextTemplateDownState;
  VorlagenKontextPutXDocContextTemplateState: VorlagenKontextPutXDocContextTemplateState;
  VorlagenKontextLoadTop1XDocContextTemplateUpState: VorlagenKontextLoadTop1XDocContextTemplateUpState;
}
export const initialState: State = {
  VorlagenKontextLoadXDocContextAllState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextLoadZugeteiltByDocContextIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextLoadVerfuegbarByDocContextIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextPostXDocContextState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextPutXDocContextState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextDelXDocContextState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextCountXDocContextTemplateByDocContextIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextLoadParentPositionState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextPostXDocContextTemplateState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextDelXDocContextTemplateState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextDelXDocContextTemplateByDocContextIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextLoadTop1XDocContextTemplateDownState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextPutXDocContextTemplateState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  VorlagenKontextLoadTop1XDocContextTemplateUpState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
};

export function reducer(state = initialState, action: VorlagenKontextActions): State {
  if (!action) { return state; }
  switch (action.type) {
    // GetXDocContextAll
    case (VorlagenKontextActionTypes.VorlagenKontextLoadAllXDocTypes.LOAD): {
      return Object.assign({}, state, {
        VorlagenKontextLoadXDocContextAllState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadAllXDocTypes.LOAD_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextLoadXDocContextAllState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadAllXDocTypes.LOAD_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextLoadXDocContextAllState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // GetZugeteiltByDocContextID
    case (VorlagenKontextActionTypes.VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD): {
      return Object.assign({}, state, {
        VorlagenKontextLoadZugeteiltByDocContextIDState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextLoadZugeteiltByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextLoadZugeteiltByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // GetVerfuegbarByDocContextID
    case (VorlagenKontextActionTypes.VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD): {
      return Object.assign({}, state, {
        VorlagenKontextLoadVerfuegbarByDocContextIDState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextLoadVerfuegbarByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextLoadVerfuegbarByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // InsertXDocContext
    case (VorlagenKontextActionTypes.VorlagenKontextPostXDocContextTypes.POST): {
      return Object.assign({}, state, {
        VorlagenKontextPostXDocContextState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPostXDocContextTypes.POST_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextPostXDocContextState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPostXDocContextTypes.POST_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextPostXDocContextState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload
        }
      });
    }

    // UpdateXDocContext
    case (VorlagenKontextActionTypes.VorlagenKontextPutXDocContextTypes.PUT): {
      return Object.assign({}, state, {
        VorlagenKontextPutXDocContextState: {
          loading: true,
          data: null
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPutXDocContextTypes.PUT_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextPutXDocContextState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPutXDocContextTypes.PUT_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextPutXDocContextState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload
        }
      });
    }

    // DeleteXDocContext
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContextTypes.DEL): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContextTypes.DEL_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextState: {
          loading: false,
          loaded: true,
          failed: false,
          data: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContextTypes.DEL_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload
        }
      });
    }

    // CountXDocContext_TemplateByDocContextID
    case (VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT): {
      return Object.assign({}, state, {
        VorlagenKontextCountXDocContextTemplateByDocContextIDState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextCountXDocContextTemplateByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextCountXDocContextTemplateByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // GetParentPosition
    case (VorlagenKontextActionTypes.VorlagenKontextLoadParentPositionTypes.LOAD): {
      return Object.assign({}, state, {
        VorlagenKontextLoadParentPositionState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadParentPositionTypes.LOAD_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextLoadParentPositionState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadParentPositionTypes.LOAD_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextLoadParentPositionState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // InsertXDocContext_Template
    case (VorlagenKontextActionTypes.VorlagenKontextPostXDocContext_TemplateTypes.POST): {
      return Object.assign({}, state, {
        VorlagenKontextPostXDocContextTemplateState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPostXDocContext_TemplateTypes.POST_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextPostXDocContextTemplateState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPostXDocContext_TemplateTypes.POST_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextPostXDocContextTemplateState: {
          loading: false,
          loaded: true,
          failed: true,
          data: []
        }
      });
    }

    // CountXDocContext_TemplateByDocContextID_ParentID
    case (VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes.COUNT): {
      return Object.assign({}, state, {
        VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes.COUNT_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes.COUNT_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // DeleteXDocContext_Template
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContext_TemplateTypes.DEL): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextTemplateState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContext_TemplateTypes.DEL_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextTemplateState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContext_TemplateTypes.DEL_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextTemplateState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // DeleteXDocContext_TemplateByDocContextID
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes.DEL): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextTemplateByDocContextIDState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes.DEL_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextTemplateByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes.DEL_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextDelXDocContextTemplateByDocContextIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // GetTop1XDocContext_TemplateDown
    case (VorlagenKontextActionTypes.VorlagenKontextLoadTop1XDocContext_TemplateDownTypes.LOAD): {
      return Object.assign({}, state, {
        VorlagenKontextLoadTop1XDocContextTemplateDownState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadTop1XDocContext_TemplateDownTypes.LOAD_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextLoadTop1XDocContextTemplateDownState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadTop1XDocContext_TemplateDownTypes.LOAD_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextLoadTop1XDocContextTemplateDownState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // UpdateXDocContext_Template
    case (VorlagenKontextActionTypes.VorlagenKontextPutXDocContext_TemplateTypes.PUT): {
      return Object.assign({}, state, {
        VorlagenKontextPutXDocContextTemplateState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPutXDocContext_TemplateTypes.PUT_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextPutXDocContextTemplateState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextPutXDocContext_TemplateTypes.PUT_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextPutXDocContextTemplateState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }

    // GetTop1XDocContext_TemplateUp
    case (VorlagenKontextActionTypes.VorlagenKontextLoadTop1XDocContext_TemplateUpTypes.LOAD): {
      return Object.assign({}, state, {
        VorlagenKontextLoadTop1XDocContextTemplateUpState: {
          loading: true
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadTop1XDocContext_TemplateUpTypes.LOAD_SUCCESS): {
      return Object.assign({}, state, {
        VorlagenKontextLoadTop1XDocContextTemplateUpState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case (VorlagenKontextActionTypes.VorlagenKontextLoadTop1XDocContext_TemplateUpTypes.LOAD_FAIL): {
      return Object.assign({}, state, {
        VorlagenKontextLoadTop1XDocContextTemplateUpState: {
          loading: false,
          loaded: true,
          failed: true,
          data: null
        }
      });
    }
    default:
      return state;
  }
}

export const getXDocContextAll = {
  getData: (state: State) => state.VorlagenKontextLoadXDocContextAllState.data,
  getLoading: (state: State) => state.VorlagenKontextLoadXDocContextAllState.loading,
  getLoaded: (state: State) => state.VorlagenKontextLoadXDocContextAllState.loaded,
  getFailed: (state: State) => state.VorlagenKontextLoadXDocContextAllState.failed
};
export const getZugeteiltByDocContextID = {
  getData: (state: State) => state.VorlagenKontextLoadZugeteiltByDocContextIDState.data,
  getLoading: (state: State) => state.VorlagenKontextLoadZugeteiltByDocContextIDState.loading,
  getLoaded: (state: State) => state.VorlagenKontextLoadZugeteiltByDocContextIDState.loaded,
  getFailed: (state: State) => state.VorlagenKontextLoadZugeteiltByDocContextIDState.failed
};
export const getVerfuegbarByDocContextID = {
  getData: (state: State) => state.VorlagenKontextLoadVerfuegbarByDocContextIDState.data,
  getLoading: (state: State) => state.VorlagenKontextLoadVerfuegbarByDocContextIDState.loading,
  getLoaded: (state: State) => state.VorlagenKontextLoadVerfuegbarByDocContextIDState.loaded,
  getFailed: (state: State) => state.VorlagenKontextLoadVerfuegbarByDocContextIDState.failed
};
export const insertXDocContext = {
  getData: (state: State) => state.VorlagenKontextPostXDocContextState.data,
  getLoading: (state: State) => state.VorlagenKontextPostXDocContextState.loading,
  getLoaded: (state: State) => state.VorlagenKontextPostXDocContextState.loaded,
  getFailed: (state: State) => state.VorlagenKontextPostXDocContextState.failed
};
export const updateXDocContext = {
  getData: (state: State) => state.VorlagenKontextPutXDocContextState.data,
  getLoading: (state: State) => state.VorlagenKontextPutXDocContextState.loading,
  getLoaded: (state: State) => state.VorlagenKontextPutXDocContextState.loaded,
  getFailed: (state: State) => state.VorlagenKontextPutXDocContextState.failed
};
export const deleteXDocContext = {
  getData: (state: State) => state.VorlagenKontextDelXDocContextState.data,
  getLoading: (state: State) => state.VorlagenKontextDelXDocContextState.loading,
  getLoaded: (state: State) => state.VorlagenKontextDelXDocContextState.loaded,
  getFailed: (state: State) => state.VorlagenKontextDelXDocContextState.failed
};
export const countXDocContext_TemplateByDocContextID = {
  getData: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDState.data,
  getLoading: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDState.loading,
  getLoaded: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDState.loaded,
  getFailed: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDState.failed
};
export const getParentPosition = {
  getData: (state: State) => state.VorlagenKontextLoadParentPositionState.data,
  getLoading: (state: State) => state.VorlagenKontextLoadParentPositionState.loading,
  getLoaded: (state: State) => state.VorlagenKontextLoadParentPositionState.loaded,
  getFailed: (state: State) => state.VorlagenKontextLoadParentPositionState.failed
};
export const insertXDocContext_Template = {
  getData: (state: State) => state.VorlagenKontextPostXDocContextTemplateState.data,
  getLoading: (state: State) => state.VorlagenKontextPostXDocContextTemplateState.loading,
  getLoaded: (state: State) => state.VorlagenKontextPostXDocContextTemplateState.loaded,
  getFailed: (state: State) => state.VorlagenKontextPostXDocContextTemplateState.failed
};
export const countXDocContext_TemplateByDocContextID_ParentID = {
  getData: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState.data,
  getLoading: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState.loading,
  getLoaded: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState.loaded,
  getFailed: (state: State) => state.VorlagenKontextCountXDocContextTemplateByDocContextIDParentIDState.failed
};
export const deleteXDocContext_Template = {
  getData: (state: State) => state.VorlagenKontextDelXDocContextTemplateState.data,
  getLoading: (state: State) => state.VorlagenKontextDelXDocContextTemplateState.loading,
  getLoaded: (state: State) => state.VorlagenKontextDelXDocContextTemplateState.loaded,
  getFailed: (state: State) => state.VorlagenKontextDelXDocContextTemplateState.failed
};
export const deleteXDocContext_TemplateByDocContextID = {
  getData: (state: State) => state.VorlagenKontextDelXDocContextTemplateByDocContextIDState.data,
  getLoading: (state: State) => state.VorlagenKontextDelXDocContextTemplateByDocContextIDState.loading,
  getLoaded: (state: State) => state.VorlagenKontextDelXDocContextTemplateByDocContextIDState.loaded,
  getFailed: (state: State) => state.VorlagenKontextDelXDocContextTemplateByDocContextIDState.failed
};
export const getTop1XDocContext_TemplateDown = {
  getData: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateDownState.data,
  getLoading: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateDownState.loading,
  getLoaded: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateDownState.loaded,
  getFailed: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateDownState.failed
};
export const updateXDocContext_Template = {
  getData: (state: State) => state.VorlagenKontextPutXDocContextTemplateState.data,
  getLoading: (state: State) => state.VorlagenKontextPutXDocContextTemplateState.loading,
  getLoaded: (state: State) => state.VorlagenKontextPutXDocContextTemplateState.loaded,
  getFailed: (state: State) => state.VorlagenKontextPutXDocContextTemplateState.failed
};
export const getTop1XDocContext_TemplateUp = {
  getData: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateUpState.data,
  getLoading: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateUpState.loading,
  getLoaded: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateUpState.loaded,
  getFailed: (state: State) => state.VorlagenKontextLoadTop1XDocContextTemplateUpState.failed
};
