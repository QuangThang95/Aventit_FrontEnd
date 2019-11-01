import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as BalandStore from './store';
import * as BalandAction from './store/actions/baland.action';

@Injectable()
export class BalandSandbox extends Sandbox {

  public BalandData$ = this.BalandState$.select(
    BalandStore.getBalandData
  );

  public BalandSyncData$ = this.BalandState$.select(
    BalandStore.getBalandSyncData
  );

  constructor(
    protected appState$: Store<store.State>,
    private BalandState$: Store<BalandStore.BalandState>
  ) {
    super(appState$);
  }

  public getBaland(): void {
    this.BalandState$.dispatch(new BalandAction.BalandInitData.LoadAction());
  }

  public syncData(): void {
    this.BalandState$.dispatch(new BalandAction.BalandSyncData.SyncAction());
  }

  public reset(): void {
    this.BalandState$.dispatch(new BalandAction.BalandResetData.ResetAction());
  }

}
