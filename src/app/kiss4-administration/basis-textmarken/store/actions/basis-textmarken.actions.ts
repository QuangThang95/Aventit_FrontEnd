import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

import { Basistextmarken } from '../../models/basis-textmarken.models';

const TextMarkenDatasTypes = {
  LOAD: type('[TextMarken Datas] Load'),
  LOAD_SUCCESS: type('[TextMarken Datas] Load Success'),
  LOAD_FAIL: type('[TextMarken Datas] Load Fail')
};

const GetTableDatasTypes = {
  LOAD: type('[GetTable Datas] Load'),
  LOAD_SUCCESS: type('[GetTable Datas] Load Success'),
  LOAD_FAIL: type('[GetTable Datas] Load Fail')
};

const GetTypDatasTypes = {
  LOAD: type('[GetTyp Datas] Load'),
  LOAD_SUCCESS: type('[GetTyp Datas] Load Success'),
  LOAD_FAIL: type('[GetTyp Datas] Load Fail')
};

const GetModulDatasTypes = {
  LOAD: type('[GetModul Datas] Load'),
  LOAD_SUCCESS: type('[GetModul Datas] Load Success'),
  LOAD_FAIL: type('[GetModul Datas] Load Fail')
};

const BasisTextmarkenPostBaInstitutionTypes = {
  POST: type('[BasisTextmarken PostBaInstitutionKontakt] Post'),
  POST_SUCCESS: type('[BasisTextmarken PostBaInstitutionKontakt] Post Success'),
  POST_FAIL: type('[BasisTextmarken PostBaInstitutionKontakt] Post Fail')
};
const BasisTextmarkenDelBaInstitutionTypes = {
  DEL: type('[BasisTextmarken DelBaInstitutionKontakt] Del'),
  DEL_SUCCESS: type('[BasisTextmarken DelBaInstitutionKontakt] Del Success'),
  DEL_FAIL: type('[BasisTextmarken DelBaInstitutionKontakt] Del Fail')
};
export const TextMarkenActionTypes = {
  TextMarkenAction: type('[TextMarken] Action'),
  TextMarkenDatasTypes: TextMarkenDatasTypes,
  GetTableDatasTypes: GetTableDatasTypes,
  GetTypDatasTypes: GetTypDatasTypes,
  GetModulDatasTypes: GetModulDatasTypes,
  BasisTextmarkenPostBaInstitutionTypes: BasisTextmarkenPostBaInstitutionTypes,
  BasisTextmarkenDelBaInstitutionTypes: BasisTextmarkenDelBaInstitutionTypes
};


export class TextMarkenAction implements AppStateAction {
  readonly type = TextMarkenActionTypes.TextMarkenAction;
  constructor(public payload?: any) { }
}
// Funtion Post.
export namespace BasisTextmarkenPostBaInstitutionAction {
  export class PostAction implements AppStateAction {
    readonly type = BasisTextmarkenPostBaInstitutionTypes.POST;
    constructor(public payload?: Basistextmarken) { }
  }

  export class PostSuccessAction implements AppStateAction {
    readonly type = BasisTextmarkenPostBaInstitutionTypes.POST_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PostFailAction implements AppStateAction {
    readonly type = BasisTextmarkenPostBaInstitutionTypes.POST_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace BasisTextmarkenDelBaInstitutionAction {
  export class DelAction implements AppStateAction {
    readonly type = BasisTextmarkenDelBaInstitutionTypes.DEL;
    constructor(public payload?: any) { }
  }

  export class DelSuccessAction implements AppStateAction {
    readonly type = BasisTextmarkenDelBaInstitutionTypes.DEL_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DelFailAction implements AppStateAction {
    readonly type = BasisTextmarkenDelBaInstitutionTypes.DEL_FAIL;
    constructor(public payload?: any) { }
  }
}


export namespace TextMarkenDatas {
  export class LoadAction implements AppStateAction {
    readonly type = TextMarkenDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = TextMarkenDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = TextMarkenDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetTableDatas {
  export class LoadAction implements AppStateAction {
    readonly type = GetTableDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetTableDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetTableDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetTypDatas {
  export class LoadAction implements AppStateAction {
    readonly type = GetTypDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetTypDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetTypDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetModulDatas {
  export class LoadAction implements AppStateAction {
    readonly type = GetModulDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetModulDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetModulDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export type TextMarkenActions
  = TextMarkenAction
  | TextMarkenDatas.LoadAction | TextMarkenDatas.LoadSuccessAction | TextMarkenDatas.LoadFailAction
  | GetTableDatas.LoadAction | GetTableDatas.LoadSuccessAction | GetTableDatas.LoadFailAction
  | GetTypDatas.LoadAction | GetTypDatas.LoadSuccessAction | GetTypDatas.LoadFailAction
  | GetModulDatas.LoadAction | GetModulDatas.LoadSuccessAction | GetModulDatas.LoadFailAction
  | BasisTextmarkenPostBaInstitutionAction.PostAction
  | BasisTextmarkenPostBaInstitutionAction.PostSuccessAction
  | BasisTextmarkenPostBaInstitutionAction.PostFailAction
  | BasisTextmarkenDelBaInstitutionAction.DelAction
  | BasisTextmarkenDelBaInstitutionAction.DelSuccessAction
  | BasisTextmarkenDelBaInstitutionAction.DelFailAction
  ;

