import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as PlausifehlerStore from './store';
import * as PlausifehlerAction from './store/actions/plausifehler.action';
import { ModelSearch } from './models';

@Injectable()
export class PlausifehlerSandbox extends Sandbox {
  public PlausifehlersData$ = this.plausifehlerState$.select(
    PlausifehlerStore.getPlausifehlersData
  );
  public PlausifehlersSearchData$ = this.plausifehlerState$.select(
    PlausifehlerStore.getPlausifehlersSearchData
  );

  public PlausifehlersPersonData$ = this.plausifehlerState$.select(
    PlausifehlerStore.getPersonData
  );

  public PlausifehlersMitarbeiterData$ = this.plausifehlerState$.select(
    PlausifehlerStore.getMitarbeiterInData
  );

  constructor(
    protected appState$: Store<store.State>,
    private plausifehlerState$: Store<PlausifehlerStore.PlausifehlerState>
  ) {
    super(appState$);
  }

  public getPlausifehler(model: ModelSearch): void {
    this.plausifehlerState$.dispatch(new PlausifehlerAction.InitData.LoadAction(model));
  }

  public searchPlausifehler(): void {
    this.plausifehlerState$.dispatch(new PlausifehlerAction.InitSearch.SearchAction());
  }

  public getPersonSuchen(): void {
    this.plausifehlerState$.dispatch(new PlausifehlerAction.InitPerson.PersonInitAction());
  }

  public getMitarbeiterInSuchen(): void {
    this.plausifehlerState$.dispatch(new PlausifehlerAction.InitMitarbeiterIn.MitarbeiterInInitAction());
  }
}
