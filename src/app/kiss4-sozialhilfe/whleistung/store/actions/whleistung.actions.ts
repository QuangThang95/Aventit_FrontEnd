import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

// Load data combobox1
const ComboboxDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] Load'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] Load Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] Load Fail')
};

// Load data combobox2
const ComboboxBFSDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] LoadBFS'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] LoadBFS Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] LoadBFS Fail')
};

// Load data combobox3
const ComboboxGemeDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] LoadGeme'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] LoadGeme Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] LoadGeme Fail')
};

// Load data combobox4
const ComboboxBottomDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] LoadBottom'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] LoadBottom Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] LoadBottom Fail')
};

// Load data
const TopDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] LoadTop'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] LoadTop Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] LoadTop Fail')
};

//  Load data grid bottom
const LoadBottomDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] LoadBottomGrid'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] LoadBottomGrid Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] LoadBottomGrid Fail')
};

// Count Record
const CountDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] CountDatas'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] CountDatas Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] CountDatas Fail')
};

//  Delete
const DeleteRecordDatasTypes = {
  DELETE: type('[WhLeistung InitDatas] DeleteDatas'),
  DELETE_SUCCESS: type('[WhLeistung InitDatas] DeleteDatas Success'),
  DELETE_FAIL: type('[WhLeistung InitDatas] DeleteDatas Fail')
};

//  Update Whleistung

const UpdateDatasTypes = {
  UPDATE: type('[WhLeistung InitDatas] UpdateDatas'),
  UPDATE_SUCCESS: type('[WhLeistung InitDatas] UpdateDatas Success'),
  UPDATE_FAIL: type('[WhLeistung InitDatas] UpdateDatas Fail')
};

//  Update Vorsadol

const UpdateVorsaldoDatasTypes = {
  UPDATE: type('[WhLeistung InitDatas] UpdateVorsadolDatas'),
  UPDATE_SUCCESS: type('[WhLeistung InitDatas] UpdateVorsadolDatas Success'),
  UPDATE_FAIL: type('[WhLeistung InitDatas] UpdateVorsadolDatas Fail')
};

// GetAnzahlOffenePendenzen

const GetAnzahlOffenePendenzenDatasTypes = {
  LOAD: type('[WhLeistung InitDatas] GetAnzahlOffenePendenzenDatas'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] GetAnzahlOffenePendenzenDatas Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] GetAnzahlOffenePendenzenDatas Fail')
};

//  get Message

const GetMLMessageDataTypes = {
  LOAD: type('[WhLeistung InitDatas] GetMLMessageDatas'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] GetMLMessageDatas Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] GetMLMessageDatas Fail')
};
// Get VorsaldoKbKostenstelleID

const GetVorsaldoKbKostenstelleIDTypes = {
  LOAD: type('[WhLeistung InitDatas] GetVorsaldoKbKostenstelleID'),
  LOAD_SUCCESS: type('[WhLeistung InitDatas] GetVorsaldoKbKostenstelleID Success'),
  LOAD_FAIL: type('[WhLeistung InitDatas] GetVorsaldoKbKostenstelleID Fail')
};

export const WhLeistungActionTypes = {
  WhLeistungAction: type('[WhLeistung] Action'),
  ComboboxDatasTypes: ComboboxDatasTypes,
  ComboboxBFSDatasTypes: ComboboxBFSDatasTypes,
  ComboboxGemeDatasTypes: ComboboxGemeDatasTypes,
  ComboboxBottomDatasTypes: ComboboxBottomDatasTypes,
  TopDatasTypes: TopDatasTypes,
  LoadBottomDatasTypes: LoadBottomDatasTypes,
  CountDatasTypes: CountDatasTypes,
  DeleteRecordDatasTypes: DeleteRecordDatasTypes,
  UpdateDatasTypes: UpdateDatasTypes,
  UpdateVorsaldoDatasTypes: UpdateVorsaldoDatasTypes,
  GetAnzahlOffenePendenzenDatasTypes: GetAnzahlOffenePendenzenDatasTypes,
  GetMLMessageDataTypes: GetMLMessageDataTypes,
  GetVorsaldoKbKostenstelleIDTypes: GetVorsaldoKbKostenstelleIDTypes
};

export class WhLeistungAction implements AppStateAction {
  readonly type = WhLeistungActionTypes.WhLeistungAction;
  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * ComboboxDatasTypes Actions
 * *****************************************************************
 */
export namespace WhLeistungComboboxInitDatas {
  export class LoadAction implements AppStateAction {
    readonly type = ComboboxDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = ComboboxDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = ComboboxDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Cbx BFS
export namespace WhLeistungComboboxBFSInitDatas {
  export class LoadBFSAction implements AppStateAction {
    readonly type = ComboboxBFSDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadBFSSuccessAction implements AppStateAction {
    readonly type = ComboboxBFSDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadBFSFailAction implements AppStateAction {
    readonly type = ComboboxBFSDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Cbx Geme
export namespace WhLeistungComboboxGemeInitDatas {
  export class LoadGemeAction implements AppStateAction {
    readonly type = ComboboxGemeDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadGemeSuccessAction implements AppStateAction {
    readonly type = ComboboxGemeDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadGemeFailAction implements AppStateAction {
    readonly type = ComboboxGemeDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Cbx Bottom

export namespace WhLeistungComboboxBottomInitDatas {
  export class LoadBottomAction implements AppStateAction {
    readonly type = ComboboxBottomDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadBottomSuccessAction implements AppStateAction {
    readonly type = ComboboxBottomDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadBottomFailAction implements AppStateAction {
    readonly type = ComboboxBottomDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Load Top

export namespace TopInitDatas {
  export class LoadTopDataAction implements AppStateAction {
    readonly type = TopDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadTopDataSuccessAction implements AppStateAction {
    readonly type = TopDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadTopDataFailAction implements AppStateAction {
    readonly type = TopDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Load data grid

export namespace BottomGridInitDatas {
  export class LoadBottomGridDataAction implements AppStateAction {
    readonly type = LoadBottomDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadBottomGridDataSuccessAction implements AppStateAction {
    readonly type = LoadBottomDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadBottomGridDataFailAction implements AppStateAction {
    readonly type = LoadBottomDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Count Data CountDatasTypes
export namespace CountInitDatas {
  export class CountdDataAction implements AppStateAction {
    readonly type = CountDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class CountDataSuccessAction implements AppStateAction {
    readonly type = CountDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class CountDataFailAction implements AppStateAction {
    readonly type = CountDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

//  Delete

export namespace DeleteRecordInitDatas {
  export class DeleteDataAction implements AppStateAction {
    readonly type = DeleteRecordDatasTypes.DELETE;
    constructor(public payload?: any) { }
  }

  export class DeleteDataSuccessAction implements AppStateAction {
    readonly type = DeleteRecordDatasTypes.DELETE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DeleteDataFailAction implements AppStateAction {
    readonly type = DeleteRecordDatasTypes.DELETE_FAIL;
    constructor(public payload?: any) { }
  }
}

//  Update

export namespace UpdateInitDatas {
  export class UpdateDataAction implements AppStateAction {
    readonly type = UpdateDatasTypes.UPDATE;
    constructor(public payload?: any) { }
  }

  export class UpdateDataSuccessAction implements AppStateAction {
    readonly type = UpdateDatasTypes.UPDATE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class UpdateDataFailAction implements AppStateAction {
    readonly type = UpdateDatasTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}

// Update Vorsaldo

export namespace UpdateVorsaldoInitDatas {
  export class UpdateVorsaldoDataAction implements AppStateAction {
    readonly type = UpdateVorsaldoDatasTypes.UPDATE;
    constructor(public payload?: any) { }
  }

  export class UpdateVorsaldoDataSuccessAction implements AppStateAction {
    readonly type = UpdateVorsaldoDatasTypes.UPDATE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class UpdateVorsaldoDataFailAction implements AppStateAction {
    readonly type = UpdateVorsaldoDatasTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}

// GetAnzahlOffenePendenzenDatasTypes

export namespace GetAnzahlOffenePendenzenInitDatas {
  export class GetAnzahlOffenePendenzenDataAction implements AppStateAction {
    readonly type = GetAnzahlOffenePendenzenDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class GetAnzahlOffenePendenzenSuccessAction implements AppStateAction {
    readonly type = GetAnzahlOffenePendenzenDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class GetAnzahlOffenePendenzenDataFailAction implements AppStateAction {
    readonly type = GetAnzahlOffenePendenzenDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// GetMLMessage

export namespace GetMLMessageInitDatas {
  export class GetMLMessageDataAction implements AppStateAction {
    readonly type = GetMLMessageDataTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class GetMLMessageSuccessAction implements AppStateAction {
    readonly type = GetMLMessageDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class GetMLMessageDataFailAction implements AppStateAction {
    readonly type = GetMLMessageDataTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
// VorsaldoKbKostenstelleID

export namespace VorsaldoKbKostenstelleID {
  export class VorsaldoKbKostenstelleIDAction implements AppStateAction {
    readonly type = GetVorsaldoKbKostenstelleIDTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class VorsaldoKbKostenstelleIDSuccessAction implements AppStateAction {
    readonly type = GetVorsaldoKbKostenstelleIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class VorsaldoKbKostenstelleIDFailAction implements AppStateAction {
    readonly type = GetVorsaldoKbKostenstelleIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export type WhLeistungActions
  = WhLeistungAction
  | WhLeistungComboboxInitDatas.LoadAction
  | WhLeistungComboboxInitDatas.LoadSuccessAction
  | WhLeistungComboboxInitDatas.LoadFailAction
  | WhLeistungComboboxBFSInitDatas.LoadBFSAction
  | WhLeistungComboboxBFSInitDatas.LoadBFSFailAction
  | WhLeistungComboboxBFSInitDatas.LoadBFSSuccessAction
  | WhLeistungComboboxGemeInitDatas.LoadGemeAction
  | WhLeistungComboboxGemeInitDatas.LoadGemeFailAction
  | WhLeistungComboboxGemeInitDatas.LoadGemeSuccessAction
  | WhLeistungComboboxBottomInitDatas.LoadBottomAction
  | WhLeistungComboboxBottomInitDatas.LoadBottomSuccessAction
  | WhLeistungComboboxBottomInitDatas.LoadBottomFailAction
  | TopInitDatas.LoadTopDataAction
  | TopInitDatas.LoadTopDataSuccessAction
  | TopInitDatas.LoadTopDataFailAction
  | BottomGridInitDatas.LoadBottomGridDataAction
  | BottomGridInitDatas.LoadBottomGridDataSuccessAction
  | BottomGridInitDatas.LoadBottomGridDataFailAction
  | CountInitDatas.CountdDataAction
  | CountInitDatas.CountDataSuccessAction
  | CountInitDatas.CountDataFailAction
  | DeleteRecordInitDatas.DeleteDataAction
  | DeleteRecordInitDatas.DeleteDataSuccessAction
  | DeleteRecordInitDatas.DeleteDataFailAction
  | UpdateInitDatas.UpdateDataAction
  | UpdateInitDatas.UpdateDataSuccessAction
  | UpdateInitDatas.UpdateDataFailAction
  | UpdateVorsaldoInitDatas.UpdateVorsaldoDataAction
  | UpdateVorsaldoInitDatas.UpdateVorsaldoDataSuccessAction
  | UpdateVorsaldoInitDatas.UpdateVorsaldoDataFailAction
  | GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenDataAction
  | GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenSuccessAction
  | GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenDataFailAction
  | GetMLMessageInitDatas.GetMLMessageDataAction
  | GetMLMessageInitDatas.GetMLMessageSuccessAction
  | GetMLMessageInitDatas.GetMLMessageDataFailAction
  | VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDAction
  | VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDSuccessAction
  | VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDFailAction;

