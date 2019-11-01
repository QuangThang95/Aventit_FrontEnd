import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs/rx';

import * as vermogenStore from './store';
import * as VermogenAction from './store/actions/vermogen.action';

@Injectable()
export class VermogenSandbox extends Sandbox {
  // Get data for DPL select box
  GetDataSourceSelectboxData$ = this.vermogenState$.select(
    vermogenStore.getPersonSelectBoxDataLoading
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private vermogenState$: Store<vermogenStore.VermogenState>
  ) {
    super(appState$);
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  // get DPL select box data
  public loadSelectboxData(): void {
    this.vermogenState$.dispatch(new VermogenAction.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction());
  }

}
