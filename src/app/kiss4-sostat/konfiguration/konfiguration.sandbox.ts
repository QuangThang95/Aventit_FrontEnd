import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as konfigurationStore from './store';
import * as konfigurationAction from './store/actions/konfiguration.action';

@Injectable()
export class KonfigurationSandbox extends Sandbox {
  public konfigurationsData$ = this.konfigurationState$.select(
    konfigurationStore.getKonfigurationsData
  );

  public konfigurationsDataGrid$ = this.konfigurationState$.select(
    konfigurationStore.getKonfigurationsDataForGrid
  );

  constructor(
    protected appState$: Store<store.State>,
    private konfigurationState$: Store<konfigurationStore.KonfigurationState>
  ) {
    super(appState$);
  }

  public getKonfiguration(): void {
    this.konfigurationState$.dispatch(new konfigurationAction.KonfigurationInitData.LoadAction());
  }


  public getKonfigurationGrid(): void {
    this.konfigurationState$.dispatch(new konfigurationAction.KonfigurationGridData.LoadAction());
  }


}
