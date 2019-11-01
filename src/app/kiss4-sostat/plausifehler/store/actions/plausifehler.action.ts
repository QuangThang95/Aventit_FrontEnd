import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const PlausifehlerTypes = {
  LOAD: type('[Plausifehler] Load'),
  LOAD_SUCCESS: type('[Plausifehler] Load Success'),
  LOAD_FAIL: type('[Plausifehler] Load Fail')
};

const PlausifehlerSearch = {
  SEARCH: type('[Plausifehler] Search Load'),
  SEARCH_SUCCESS: type('[Plausifehler] Search Load Success'),
  SEARCH_FAIL: type('[Plausifehler] Search Load Fail')
};

const PersonSuchenInit = {
  LOAD: type('[Plausifehler] Person Load'),
  LOAD_SUCCESS: type('[Plausifehler] Person Load Success'),
  LOAD_FAIL: type('[Plausifehler] Person Load Fail')
};

const MitarbeiterInSuchenInit = {
  LOAD: type('[Plausifehler] MitarbeiterIn Load'),
  LOAD_SUCCESS: type('[Plausifehler] MitarbeiterIn Load Success'),
  LOAD_FAIL: type('[Plausifehler] MitarbeiterIn Load Fail')
};

export const PlausifehlerActionTypes = {
  Action: type('[Plausifehler] Action'),
  Types: PlausifehlerTypes,
  Search: PlausifehlerSearch,
  Person: PersonSuchenInit,
  MitarbeiterIn: MitarbeiterInSuchenInit
};

export class PlausifehlerAction implements AppStateAction {
  readonly type = PlausifehlerActionTypes.Action;

  constructor(public payload?: any) { }
}

/**
 * *****************************************************************
 * Plausifehler Types Actions
 * *****************************************************************
 */
export namespace InitData {
  export class LoadAction implements AppStateAction {
    readonly type = PlausifehlerTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = PlausifehlerTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = PlausifehlerTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace InitSearch {
  export class SearchAction implements AppStateAction {
    readonly type = PlausifehlerSearch.SEARCH;

    constructor(public payload?: any) { }
  }

  export class SearchSuccessAction implements AppStateAction {
    readonly type = PlausifehlerSearch.SEARCH_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class SearchFailAction implements AppStateAction {
    readonly type = PlausifehlerSearch.SEARCH_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace InitMitarbeiterIn {
  export class MitarbeiterInInitAction implements AppStateAction {
    readonly type = MitarbeiterInSuchenInit.LOAD;

    constructor(public payload?: any) { }
  }

  export class MitarbeiterInInitSuccessAction implements AppStateAction {
    readonly type = MitarbeiterInSuchenInit.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class MitarbeiterInInitFailAction implements AppStateAction {
    readonly type = MitarbeiterInSuchenInit.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export namespace InitPerson {
  export class PersonInitAction implements AppStateAction {
    readonly type = PersonSuchenInit.LOAD;

    constructor(public payload?: any) { }
  }

  export class PersonInitSuccessAction implements AppStateAction {
    readonly type = PersonSuchenInit.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class PersonInitFailAction implements AppStateAction {
    readonly type = PersonSuchenInit.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}



export type PlausifehlerActions
  = PlausifehlerAction
  | InitData.LoadAction
  | InitData.LoadSuccessAction
  | InitData.LoadFailAction
  | InitSearch.SearchAction
  | InitSearch.SearchSuccessAction
  | InitSearch.SearchFailAction
  | InitPerson.PersonInitAction
  | InitPerson.PersonInitSuccessAction
  | InitPerson.PersonInitFailAction
  | InitMitarbeiterIn.MitarbeiterInInitAction
  | InitMitarbeiterIn.MitarbeiterInInitSuccessAction
  | InitMitarbeiterIn.MitarbeiterInInitFailAction;
