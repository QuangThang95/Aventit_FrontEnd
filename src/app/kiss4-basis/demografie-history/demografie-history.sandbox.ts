import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as demografieStore from './store';
import * as demografieAction from './store/actions/demografie-history.actions';

@Injectable()
export class DemografieSandbox extends Sandbox {
  public xUserHistoryData$ = this.demografieStore$.select(demografieStore.getXUserHistoryData);
  public personalienData$ = this.demografieStore$.select(demografieStore.getPersonalienData);
  public wohnsitzData$ = this.demografieStore$.select(demografieStore.getWohnsitzData);
  public aufenthaltsort$ = this.demografieStore$.select(demografieStore.getAufenthaltsortData);

  public xUserHistoryDataFail$ = this.demografieStore$.select(demografieStore.getXUserHistoryLoadFail);
  public personalienDataFail$ = this.demografieStore$.select(demografieStore.getPersonalienLoadFail);
  public wohnsitzDataFail$ = this.demografieStore$.select(demografieStore.getWohnsitzLoadFail);
  public aufenthaltsortFail$ = this.demografieStore$.select(demografieStore.getAufenthaltsortLoadFail);

  constructor(
    protected appState$: Store<store.State>,
    private demografieStore$: Store<demografieStore.IDemografieState>
  ) { super(appState$); }

  public GetXUserHistory(baPersonID): void {
    this.demografieStore$.dispatch(new demografieAction.xUserHistoryInitData.LoadAction({ baPersonID }));
  }
  public GetPersonalien(params): void {
    this.demografieStore$.dispatch(new demografieAction.PersonalienInitData.LoadAction({ baPersonID: params.baPersonID, verID: params.verID }));
  }
  public GetWohnsitz(params): void {
    this.demografieStore$.dispatch(new demografieAction.WohnsitzInitData.LoadAction({ baPersonID: params.baPersonID, verID: params.verID }));
  }
  public GetAufenthaltsort(params): void {
    this.demografieStore$.dispatch(new demografieAction.AufenthaltsortInitData.LoadAction({ baPersonID: params.baPersonID, verID: params.verID }));
  }
}
