import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as KennzahlenStore from './store';
import * as KennzahlenAction from './store/actions/kennzahlen.action';
import { ModelKennzahlen, IModelKennzahlen } from './models';

@Injectable()
export class KennzahlenSandbox extends Sandbox {
  public KennzahlensData$ = this.kennzahlenState$.select(
    KennzahlenStore.getKennzahlensData
  );
  public KennzahlensInitSearch$ = this.kennzahlenState$.select(
    KennzahlenStore.initKennzahlensData
  );
  constructor(
    protected appState$: Store<store.State>,
    private kennzahlenState$: Store<KennzahlenStore.KennzahlenState>
  ) {
    super(appState$);
  }

  public getKennzahlen(data: ModelKennzahlen | IModelKennzahlen ): void {
    this.kennzahlenState$.dispatch(new KennzahlenAction.InitData.LoadAction(data));
  }

  public initKennzahlen(): void {
    this.kennzahlenState$.dispatch(new KennzahlenAction.InitSearchData.LoadAction());
  }
}
