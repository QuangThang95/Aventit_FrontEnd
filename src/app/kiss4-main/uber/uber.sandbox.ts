import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as uberStore from './store';
import * as ubersAction from './store/actions/uber.action';

@Injectable()
export class UbersSandbox extends Sandbox {
  public cultureInfoData$ = this.uberState$.select(
    uberStore.getCultureInfoData
  );

  public databaseInfoData$ = this.uberState$.select(
    uberStore.getDatabaseInfoData
  );

  public databaseVersions$ = this.uberState$.select(
    uberStore.getDatabaseVersionsData
  );

  public kiss4WebVersion$ = this.uberState$.select(
    uberStore.getKiss4WebVersionsData
  );

  constructor(
    protected appState$: Store<store.State>,
    private uberState$: Store<uberStore.UberState>
  ) {
    super(appState$);
  }

  public loadCultureInfo(languageCode: number): void {
    this.uberState$.dispatch(new ubersAction.CultureInfoLoadData.LoadAction(languageCode));
  }

  public loadDatabaseInfo(): void {
    this.uberState$.dispatch(new ubersAction.DatabaseInfoLoadData.LoadAction());
  }

  public loadDatabaseVersions(): void {
    this.uberState$.dispatch(new ubersAction.DatabaseVersionsLoadData.LoadAction());
  }

  public loadKiss4WebVersion(): void {
    this.uberState$.dispatch(new ubersAction.Kiss4WebVersionLoadData.LoadAction());
  }
}
