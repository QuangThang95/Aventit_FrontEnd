import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/rx';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as ArbeitActions from './store/actions/arbeit.action';
import * as store from '@shared/store';
import * as arbeitStore from './store';
import {
  BarPerSon
} from './models';
@Injectable()
export class ArbeitSandbox extends Sandbox {

  // select arbeit
  public arbeitsData$ = this.arbeitState$.select(
    arbeitStore.getArbeiteInitData
  );
  public arbeitsDataLoaded$ = this.arbeitState$.select(
    arbeitStore.getArbeiteLoaded
  );
  public arbeitsDataLoading$ = this.arbeitState$.select(
    arbeitStore.getArbeiteLoading
  );
  public arbeitsDataFaild$ = this.arbeitState$.select(
    arbeitStore.getArbeiteFaild
  );

  // select lovName
  public lovNameArbeitsData$ = this.arbeitState$.select(
    arbeitStore.getLOVNameArbeiteInitData
  );
  public lovNameArbeitsDataLoaded$ = this.arbeitState$.select(
    arbeitStore.getLOVNameArbeiteLoaded
  );
  public lovNameArbeitsDataLoading$ = this.arbeitState$.select(
    arbeitStore.getLOVNameArbeiteLoading
  );
  public lovNameArbeitsDataFaild$ = this.arbeitState$.select(
    arbeitStore.getLOVNameArbeiteFaild
  );

  // select berufarbeit
  public berufArbeitsData$ = this.arbeitState$.select(
    arbeitStore.getBeruArbeiteInitData
  );
  public berufArbeitsDataLoaded$ = this.arbeitState$.select(
    arbeitStore.getBerufArbeiteLoaded
  );
  public berufArbeitsDataLoading$ = this.arbeitState$.select(
    arbeitStore.getBerufArbeiteLoading
  );
  public berufArbeitsDataFaild$ = this.arbeitState$.select(
    arbeitStore.getBerufArbeiteFaild
  );

  // select arbeit
  public institutionArbeitsData$ = this.arbeitState$.select(
    arbeitStore.getInstitutionSuchenArbeiteInitData
  );
  public institutionArbeitsDataLoaded$ = this.arbeitState$.select(
    arbeitStore.getInstitutionArbeiteLoaded
  );
  public institutionArbeitsDataLoading$ = this.arbeitState$.select(
    arbeitStore.getInstitutionSuchenArbeiteLoading
  );
  public institutionArbeitsDataFaild$ = this.arbeitState$.select(
    arbeitStore.getInstitutionSuchenArbeiteInitData
  );

  // select arbeit
  public saveArbeitsData$ = this.arbeitState$.select(
    arbeitStore.getSaveArbeiteInitData
  );
  public saveArbeitsDataLoaded$ = this.arbeitState$.select(
    arbeitStore.getSaveArbeiteLoaded
  );
  public saveArbeitsDataLoading$ = this.arbeitState$.select(
    arbeitStore.getSaveArbeiteLoading
  );
  public saveArbeitsDataFaild$ = this.arbeitState$.select(
    arbeitStore.getSaveArbeiteFaild
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private arbeitState$: Store<arbeitStore.ArbeitState>
  ) {
    super(appState$);
  }

  public getBapersonArbeit(params): void {
    this.arbeitState$.dispatch(new ArbeitActions.ArbeitDataAction.LoadAction(params));
  }

  public getLOVNameArbeit(params): void {
    this.arbeitState$.dispatch(new ArbeitActions.LOVNameArbeitDataAction.LoadAction(params));
  }

  public getBerufSuchenArbeit(params): void {
    this.arbeitState$.dispatch(new ArbeitActions.BerufSuchenArbeitDataAction.LoadAction(params));
  }

  public getInstitutionSuchenArbeit(): void {
    this.arbeitState$.dispatch(new ArbeitActions.InstitutionSuchenArbeitDataAction.LoadAction());
  }

  public saveArbeit(params): void {
    this.arbeitState$.dispatch(new ArbeitActions.SaveArbeitSuchenAction.LoadAction(params));
  }

  /**
   * Subcriber culture change
   */
  public registerEvents() {
    this.subscriptions.push(
      // check logout
      this.loggedUser$.subscribe((user) => {
        if (!user.isLoggedIn) {
          this.clearStore();
          this.unRegisterEvents();
        }
      })
    );
  }

  public unRegisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Clear store for app Sandbox
   */
  private clearStore(): void {
    // select arbeit
    arbeitStore.getArbeiteInitData.release();
    arbeitStore.getArbeiteLoaded.release();
    arbeitStore.getArbeiteLoading.release();
    arbeitStore.getArbeiteFaild.release();
    // select lovName
    arbeitStore.getLOVNameArbeiteInitData.release();
    arbeitStore.getLOVNameArbeiteLoaded.release();
    arbeitStore.getLOVNameArbeiteLoading.release();
    arbeitStore.getLOVNameArbeiteFaild.release();
    // select berufarbeit
    arbeitStore.getBeruArbeiteInitData.release();
    arbeitStore.getBerufArbeiteLoaded.release();
    arbeitStore.getBerufArbeiteLoading.release();
    arbeitStore.getBerufArbeiteFaild.release();
    // select arbeit
    arbeitStore.getInstitutionSuchenArbeiteInitData.release();
    arbeitStore.getInstitutionArbeiteLoaded.release();
    arbeitStore.getInstitutionSuchenArbeiteLoading.release();
    arbeitStore.getInstitutionSuchenArbeiteInitData.release();
    // select arbeit
    arbeitStore.getSaveArbeiteInitData.release();
    arbeitStore.getSaveArbeiteLoaded.release();
    arbeitStore.getSaveArbeiteLoading.release();
    arbeitStore.getSaveArbeiteFaild.release();
  }
}
