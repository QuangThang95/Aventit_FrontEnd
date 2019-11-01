import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

import { InsertXDocContext, IXDocInsert, UpdateXDocContext, UpdateXDocContextTemplate } from '../../models';

const VorlagenKontextLoadAllXDocTypes = {
  LOAD: type('[VorlagenKontext LoadAllXDoc] Load'),
  LOAD_SUCCESS: type('[VorlagenKontext LoadAllXDoc] Load Success'),
  LOAD_FAIL: type('[VorlagenKontext LoadAllXDoc] Load Fail')
};
const VorlagenKontextLoadZugeteiltByDocContextIDTypes = {
  LOAD: type('[VorlagenKontext LoadZugeteiltByDocContextID] Load'),
  LOAD_SUCCESS: type('[VorlagenKontext LoadZugeteiltByDocContextID] Load Success'),
  LOAD_FAIL: type('[VorlagenKontext LoadZugeteiltByDocContextID] Load Fail')
};
const VorlagenKontextLoadVerfuegbarByDocContextIDTypes = {
  LOAD: type('[VorlagenKontext LoadVerfuegbarByDocContextID] Load'),
  LOAD_SUCCESS: type('[VorlagenKontext LoadVerfuegbarByDocContextID] Load Success'),
  LOAD_FAIL: type('[VorlagenKontext LoadVerfuegbarByDocContextID] Load Fail')
};
const VorlagenKontextPostXDocContextTypes = {
  POST: type('[VorlagenKontext PostXDocContext] Post'),
  POST_SUCCESS: type('[VorlagenKontext PostXDocContext] Post Success'),
  POST_FAIL: type('[VorlagenKontext PostXDocContext] Post Fail')
};
const VorlagenKontextPutXDocContextTypes = {
  PUT: type('[VorlagenKontext PutXDocContext] Put'),
  PUT_SUCCESS: type('[VorlagenKontext PutXDocContext] Put Success'),
  PUT_FAIL: type('[VorlagenKontext PutXDocContext] Put Fail')
};
const VorlagenKontextDelXDocContextTypes = {
  DEL: type('[VorlagenKontext DelXDocContext] Del'),
  DEL_SUCCESS: type('[VorlagenKontext DelXDocContext] Del Success'),
  DEL_FAIL: type('[VorlagenKontext DelXDocContext] Del Fail')
};
const VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes = {
  COUNT: type('[VorlagenKontext CountXDocContext_TemplateByDocContextID] Count'),
  COUNT_SUCCESS: type('[VorlagenKontext CountXDocContext_TemplateByDocContextID] Count Success'),
  COUNT_FAIL: type('[VorlagenKontext CountXDocContext_TemplateByDocContextID] Count Fail')
};
const VorlagenKontextLoadParentPositionTypes = {
  LOAD: type('[VorlagenKontext LoadParentPosition] Load'),
  LOAD_SUCCESS: type('[VorlagenKontext LoadParentPosition] Load Success'),
  LOAD_FAIL: type('[VorlagenKontext LoadParentPosition] Load Fail')
};
const VorlagenKontextPostXDocContext_TemplateTypes = {
  POST: type('[VorlagenKontext PostXDocContext_Template] Post'),
  POST_SUCCESS: type('[VorlagenKontext PostXDocContext_Template] Post Success'),
  POST_FAIL: type('[VorlagenKontext PostXDocContext_Template] Post Fail')
};
const VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes = {
  COUNT: type('[VorlagenKontext CountXDocContext_TemplateByDocContextID_ParentID] Count'),
  COUNT_SUCCESS: type('[VorlagenKontext CountXDocContext_TemplateByDocContextID_ParentID] Count Success'),
  COUNT_FAIL: type('[VorlagenKontext CountXDocContext_TemplateByDocContextID_ParentID] Count Fail')
};
const VorlagenKontextDelXDocContext_TemplateTypes = {
  DEL: type('[VorlagenKontext DelXDocContext_Template] Del'),
  DEL_SUCCESS: type('[VorlagenKontext DelXDocContext_Template] Del Success'),
  DEL_FAIL: type('[VorlagenKontext DelXDocContext_Template] Del Fail')
};
const VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes = {
  DEL: type('[VorlagenKontext DelXDocContext_TemplateByDocContextID] Del'),
  DEL_SUCCESS: type('[VorlagenKontext DelXDocContext_TemplateByDocContextID] Del Success'),
  DEL_FAIL: type('[VorlagenKontext DelXDocContext_TemplateByDocContextID] Del Fail')
};
const VorlagenKontextLoadTop1XDocContext_TemplateDownTypes = {
  LOAD: type('[VorlagenKontext LoadTop1XDocContext_TemplateDown] Load'),
  LOAD_SUCCESS: type('[VorlagenKontext LoadTop1XDocContext_TemplateDown] Load Success'),
  LOAD_FAIL: type('[VorlagenKontext LoadTop1XDocContext_TemplateDown] Load Fail')
};
const VorlagenKontextPutXDocContext_TemplateTypes = {
  PUT: type('[VorlagenKontext PutXDocContext_Template] Put'),
  PUT_SUCCESS: type('[VorlagenKontext PutXDocContext_Template] Put Success'),
  PUT_FAIL: type('[VorlagenKontext PutXDocContext_Template] Put Fail')
};
const VorlagenKontextLoadTop1XDocContext_TemplateUpTypes = {
  LOAD: type('[VorlagenKontext LoadTop1XDocContext_TemplateUp] Load'),
  LOAD_SUCCESS: type('[VorlagenKontext LoadTop1XDocContext_TemplateUp] Load Success'),
  LOAD_FAIL: type('[VorlagenKontext LoadTop1XDocContext_TemplateUp] Load Fail')
};

export const VorlagenKontextActionTypes = {
  VorlagenKontextAction: type('[VorlagenKontext] Action'),
  VorlagenKontextLoadAllXDocTypes: VorlagenKontextLoadAllXDocTypes,
  VorlagenKontextLoadZugeteiltByDocContextIDTypes: VorlagenKontextLoadZugeteiltByDocContextIDTypes,
  VorlagenKontextLoadVerfuegbarByDocContextIDTypes: VorlagenKontextLoadVerfuegbarByDocContextIDTypes,
  VorlagenKontextPostXDocContextTypes: VorlagenKontextPostXDocContextTypes,
  VorlagenKontextPutXDocContextTypes: VorlagenKontextPutXDocContextTypes,
  VorlagenKontextDelXDocContextTypes: VorlagenKontextDelXDocContextTypes,
  VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes: VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes,
  VorlagenKontextLoadParentPositionTypes: VorlagenKontextLoadParentPositionTypes,
  VorlagenKontextPostXDocContext_TemplateTypes: VorlagenKontextPostXDocContext_TemplateTypes,
  VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes: VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes,
  VorlagenKontextDelXDocContext_TemplateTypes: VorlagenKontextDelXDocContext_TemplateTypes,
  VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes: VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes,
  VorlagenKontextLoadTop1XDocContext_TemplateDownTypes: VorlagenKontextLoadTop1XDocContext_TemplateDownTypes,
  VorlagenKontextPutXDocContext_TemplateTypes: VorlagenKontextPutXDocContext_TemplateTypes,
  VorlagenKontextLoadTop1XDocContext_TemplateUpTypes: VorlagenKontextLoadTop1XDocContext_TemplateUpTypes,
};

export class VorlagenKontextAction implements AppStateAction {
  readonly type = VorlagenKontextActionTypes.VorlagenKontextAction;
  constructor(public payload?: any) { }
}

export namespace VorlagenKontextLoadAllXDocAction {
  export class LoadAction implements AppStateAction {
    readonly type = VorlagenKontextLoadAllXDocTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextLoadAllXDocTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
     }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VorlagenKontextLoadAllXDocTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextLoadZugeteiltByDocContextIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextLoadVerfuegbarByDocContextIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD;
    constructor(public payload?: number) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextPostXDocContextAction {
  export class PostAction implements AppStateAction {
    readonly type = VorlagenKontextPostXDocContextTypes.POST;
    constructor(public payload?: InsertXDocContext) { }
  }

  export class PostSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextPostXDocContextTypes.POST_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PostFailAction implements AppStateAction {
    readonly type = VorlagenKontextPostXDocContextTypes.POST_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextPutXDocContextAction {
  export class PutAction implements AppStateAction {
    readonly type = VorlagenKontextPutXDocContextTypes.PUT;
    constructor(public payload?: UpdateXDocContext) { }
  }

  export class PutSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextPutXDocContextTypes.PUT_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PutFailAction implements AppStateAction {
    readonly type = VorlagenKontextPutXDocContextTypes.PUT_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextDelXDocContextAction {
  export class DelAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContextTypes.DEL;
    constructor(public payload?: any) { }
  }

  export class DelSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContextTypes.DEL_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DelFailAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContextTypes.DEL_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextCountXDocContext_TemplateByDocContextIDAction {
  export class CountAction implements AppStateAction {
    readonly type = VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT;
    constructor(public payload?: number) { }
  }

  export class CountSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class CountFailAction implements AppStateAction {
    readonly type = VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextLoadParentPositionAction {
  export class LoadAction implements AppStateAction {
    readonly type = VorlagenKontextLoadParentPositionTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextLoadParentPositionTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VorlagenKontextLoadParentPositionTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextPostXDocContext_TemplateAction {
  export class PostAction implements AppStateAction {
    readonly type = VorlagenKontextPostXDocContext_TemplateTypes.POST;
    constructor(public payload?: IXDocInsert) { }
  }

  export class PostSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextPostXDocContext_TemplateTypes.POST_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PostFailAction implements AppStateAction {
    readonly type = VorlagenKontextPostXDocContext_TemplateTypes.POST_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDAction {
  export class CountAction implements AppStateAction {
    readonly type = VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes.COUNT;
    constructor(public payload?: any) { }
  }

  export class CountSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes.COUNT_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class CountFailAction implements AppStateAction {
    readonly type = VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDTypes.COUNT_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextDelXDocContext_TemplateAction {
  export class DelAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContext_TemplateTypes.DEL;
    constructor(public payload?: number[]) { }
  }

  export class DelSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContext_TemplateTypes.DEL_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DelFailAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContext_TemplateTypes.DEL_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextDelXDocContext_TemplateByDocContextIDAction {
  export class DelAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes.DEL;
    constructor(public payload?: number) { }
  }

  export class DelSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes.DEL_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DelFailAction implements AppStateAction {
    readonly type = VorlagenKontextDelXDocContext_TemplateByDocContextIDTypes.DEL_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextLoadTop1XDocContext_TemplateDownAction {
  export class LoadAction implements AppStateAction {
    readonly type = VorlagenKontextLoadTop1XDocContext_TemplateDownTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextLoadTop1XDocContext_TemplateDownTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VorlagenKontextLoadTop1XDocContext_TemplateDownTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextPutXDocContext_TemplateAction {
  export class PutAction implements AppStateAction {
    readonly type = VorlagenKontextPutXDocContext_TemplateTypes.PUT;
    constructor(public payload?: UpdateXDocContextTemplate[]) { }
  }

  export class PutSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextPutXDocContext_TemplateTypes.PUT_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PutFailAction implements AppStateAction {
    readonly type = VorlagenKontextPutXDocContext_TemplateTypes.PUT_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace VorlagenKontextLoadTop1XDocContext_TemplateUpAction {
  export class LoadAction implements AppStateAction {
    readonly type = VorlagenKontextLoadTop1XDocContext_TemplateUpTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VorlagenKontextLoadTop1XDocContext_TemplateUpTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VorlagenKontextLoadTop1XDocContext_TemplateUpTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export type VorlagenKontextActions
  = VorlagenKontextAction
  | VorlagenKontextLoadAllXDocAction.LoadAction | VorlagenKontextLoadAllXDocAction.LoadSuccessAction | VorlagenKontextLoadAllXDocAction.LoadFailAction
  | VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadAction | VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadSuccessAction | VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadFailAction
  | VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadAction | VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadSuccessAction | VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadFailAction
  | VorlagenKontextPostXDocContextAction.PostAction | VorlagenKontextPostXDocContextAction.PostSuccessAction | VorlagenKontextPostXDocContextAction.PostFailAction
  | VorlagenKontextPutXDocContextAction.PutAction | VorlagenKontextPutXDocContextAction.PutSuccessAction | VorlagenKontextPutXDocContextAction.PutFailAction
  | VorlagenKontextDelXDocContextAction.DelAction | VorlagenKontextDelXDocContextAction.DelSuccessAction | VorlagenKontextDelXDocContextAction.DelFailAction
  | VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountAction | VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountSuccessAction | VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountFailAction
  | VorlagenKontextLoadParentPositionAction.LoadAction | VorlagenKontextLoadParentPositionAction.LoadSuccessAction | VorlagenKontextLoadParentPositionAction.LoadFailAction
  | VorlagenKontextPostXDocContext_TemplateAction.PostAction | VorlagenKontextPostXDocContext_TemplateAction.PostSuccessAction | VorlagenKontextPostXDocContext_TemplateAction.PostFailAction
  | VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDAction.CountAction | VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDAction.CountSuccessAction
  | VorlagenKontextCountXDocContext_TemplateByDocContextID_ParentIDAction.CountFailAction
  | VorlagenKontextDelXDocContext_TemplateAction.DelAction | VorlagenKontextDelXDocContext_TemplateAction.DelSuccessAction | VorlagenKontextDelXDocContext_TemplateAction.DelFailAction
  | VorlagenKontextDelXDocContext_TemplateByDocContextIDAction.DelAction | VorlagenKontextDelXDocContext_TemplateByDocContextIDAction.DelSuccessAction | VorlagenKontextDelXDocContext_TemplateByDocContextIDAction.DelFailAction
  | VorlagenKontextLoadTop1XDocContext_TemplateDownAction.LoadAction | VorlagenKontextLoadTop1XDocContext_TemplateDownAction.LoadSuccessAction | VorlagenKontextLoadTop1XDocContext_TemplateDownAction.LoadFailAction
  | VorlagenKontextPutXDocContext_TemplateAction.PutAction | VorlagenKontextPutXDocContext_TemplateAction.PutSuccessAction | VorlagenKontextPutXDocContext_TemplateAction.PutFailAction
  | VorlagenKontextLoadTop1XDocContext_TemplateUpAction.LoadAction | VorlagenKontextLoadTop1XDocContext_TemplateUpAction.LoadSuccessAction | VorlagenKontextLoadTop1XDocContext_TemplateUpAction.LoadFailAction;
