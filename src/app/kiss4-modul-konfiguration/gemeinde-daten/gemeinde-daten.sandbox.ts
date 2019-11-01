import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as GemeindeDatenStore from './store';
import * as GemeindeDatenAction from './store/actions/gemeinde-daten.action';

@Injectable()
export class GemeindeDatenSandbox extends Sandbox {

  public GemeindeDatensData$ = this.gemeindeDatenState$.select(
    GemeindeDatenStore.getGemeindeDatensData
  );

  public GemeindeDatensSyncData$ = this.gemeindeDatenState$.select(
    GemeindeDatenStore.getGemeindeDatensSyncData
  );

  public GemeindeDatensImportData$ = this.gemeindeDatenState$.select(
    GemeindeDatenStore.getGemeindeDatensImportData
  );

  constructor(
    protected appState$: Store<store.State>,
    private gemeindeDatenState$: Store<GemeindeDatenStore.GemeindeDatenState>
  ) {
    super(appState$);
  }

  public getGemeindeDaten(): void {
    this.gemeindeDatenState$.dispatch(new GemeindeDatenAction.GemeindeDatenInitData.LoadAction());
  }

  public syncData(): void {
    this.gemeindeDatenState$.dispatch(new GemeindeDatenAction.GemeindeDatenSyncData.SyncAction());
  }

  public importData(uploadObj: Object): void {
    this.gemeindeDatenState$.dispatch(new GemeindeDatenAction.GemeindeDatenImportData.ImportAction(uploadObj));
  }

  public reset(): void {
    this.gemeindeDatenState$.dispatch(new GemeindeDatenAction.GemeindeDatenReset.ResetAction());
  }

}
