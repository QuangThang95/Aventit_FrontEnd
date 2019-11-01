import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { UtilService } from '@shared/utilites/utility.service';
import * as beraterAction from './store/actions/berater.actions';
import * as beraterStore from './store';
import * as store from '@shared/store';
import { BeraterLoadInstitutionAction } from '@app/kiss4-basis/berater/store/actions/berater.actions';
import { PostKontakt } from './models';
import { Subscription } from 'rxjs';

@Injectable()
export class BeraterSandbox extends Sandbox {
  public beraterData$ = this.beraterState$.select(
    beraterStore.getBeraterData
  );

  public institutionData$ = this.beraterState$.select(
    beraterStore.getBeraterInstitution
  );
  // VDHoan getInstitution
  public beraterInstitutionData$ = this.beraterState$.select(
    beraterStore.getBeraterInstitution
  );
  // VDHoan getLanguage
  public beraterLanguageData$ = this.beraterState$.select(
    beraterStore.getBeraterLanguage
  );
  // VDHoan getSaveKontakt
  public beraterSaveKontaktData$ = this.beraterState$.select(
    beraterStore.getBeraterSaveKontakt
  );

  // get fail save
  public beraterSaveKontakDataFail$ = this.beraterState$.select(
    beraterStore.getBeraterSaveKontaktFailed
  );
  // VDHoan getDelKontakt
  public beraterDelKontaktData$ = this.beraterState$.select(
    beraterStore.getBeraterDelKontakt
  );

  // del fail
  public beraterDelKontaktFailData$ = this.beraterState$.select(
    beraterStore.getBeraterDelKontaktFailed
  );
  private subscriptions: Subscription[] = [];
  constructor(
    protected appState$: Store<store.State>,
    private beraterState$: Store<beraterStore.BeraterState>,
    private utilService: UtilService) {
    super(appState$);
  }

  public loadBeraterData(params: any): void {
    this.beraterState$.dispatch(new beraterAction.BeraterDatas.LoadAction(params));
  }

  public loadInstitution(params: any): void {
    this.beraterState$.dispatch(new beraterAction.BeraterLoadInstitutionAction.LoadAction(params));
  }
  // VDHoan save kontakt
  public saveKontakt(postKontakt: PostKontakt) {
    this.beraterState$.dispatch(new beraterAction.BeraterPostBaInstitutionKontaktAction.PostAction(postKontakt));
  }
  // VDHoan dispatch Language
  public getLanguage() {
    this.beraterState$.dispatch(new beraterAction.BeraterLoadLanguageAction.LoadAction());
  }
  // VDHoan dispatch delete kontakt
  public delKontakt(baInstitutionKontaktID, baInstitutionKontaktTS) {
    this.beraterState$.dispatch(new beraterAction.BeraterDelBaInstitutionKontaktAction.DelAction({ BaInstitutionKontaktID: baInstitutionKontaktID, BaInstitutionKontaktTS: baInstitutionKontaktTS }));
  }

  public registerEvents(): void {
    this.subscriptions.push(this.loggedUser$.subscribe((user: any) => {
      if (user.isLoggedIn) {
        // Do something here
      } else {
        this.unregisterEvents();
        this.clearStore();
      }
    }));
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  clearStore() {
    beraterStore.getBeraterData.release();
    beraterStore.getBeraterInstitution.release();
    beraterStore.getBeraterLanguage.release();
    beraterStore.getBeraterSaveKontakt.release();
    beraterStore.getBeraterDelKontakt.release();
  }
}
