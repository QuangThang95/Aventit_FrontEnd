import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/rx';
import { UtilService } from '@shared/utilites/utility.service';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as faAktennotizsAction from './store/actions/fa-aktennotiz.actions';
import * as store from '@shared/store';
import * as faAktennotizStore from './store';
import {
  FaAktennotiz,
  FaAktennotizQuery
} from './models';
import { User } from '@shared/models';

@Injectable()
export class FaAktennotizSandbox extends Sandbox {
  public faAktennotizsData$ = this.faaktennotizState$.select(
    faAktennotizStore.getFaAktennotizData
  );
  public faAktennotizLoading$ = this.faaktennotizState$.select(
    faAktennotizStore.getFaAktennotizLoading
  );
  public faAktennotiz$ = this.faaktennotizState$.select(
    faAktennotizStore.getFaAktennotiz
  );
  public faAktennotizQuery$ = this.faaktennotizState$.select(
    faAktennotizStore.getFaAktennotizQuery
  );

  public faAktennotizInitData$ = this.faaktennotizState$.select(
    faAktennotizStore.getFaAktennotizInitData
  );

  public kontaktartData$ = this.faaktennotizState$.select(
    faAktennotizStore.getKontaktartData
  );

  public mitarbeiterData$ = this.faaktennotizState$.select(
    faAktennotizStore.getMitarbeiterData
  );
  public theMenData$ = this.faaktennotizState$.select(
    faAktennotizStore.getTheMenData
  );
  public addFaAktennotizenData$ = this.faaktennotizState$.select(
    faAktennotizStore.getAddFaAktennotizenData
  );
  public deleteFaAktennotizenData$ = this.faaktennotizState$.select(
    faAktennotizStore.getDeleteFaAktennotizenData
  );
  public updateFaAktennotizenData$ = this.faaktennotizState$.select(
    faAktennotizStore.getUpdateFaAktennotizenData
  );
  public dauerData$ = this.faaktennotizState$.select(
    faAktennotizStore.getDauerData
  );
  public configData$ = this.faaktennotizState$.select(
    faAktennotizStore.getConfigData
  );
  public dokumentAktennotizenData$ = this.faaktennotizState$.select(
    faAktennotizStore.getDokumentAktennotizenData
  );
  public defaultKontartPartnerData$ = this.faaktennotizState$.select(
    faAktennotizStore.getDefaultKontartPartnerData
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private faaktennotizState$: Store<faAktennotizStore.FaAktennotizState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  /**
   * Loads faAktennotizs from the server
   */
  public loadFaAktennotizInitData(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.FaAktennotizAction.LoadAction(params));
  }

  public notifyMessage(
    messageTranslationCode: string,
    type: string = 'info',
    titleTranslationCode?: string
  ): any {
    this.utilService.displayNotification(
      messageTranslationCode,
      type,
      titleTranslationCode
    );
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  public registerEvents(): void {
    const queryData = new FaAktennotizQuery();
    queryData.itemType = '1_2';
    this.subscriptions.push(
      this.loggedUser$.subscribe((user: User) => {
        if (user.isLoggedIn) {
          this.loadFaAktennotizTreeNavigator();
        } else {
          this.unregisterEvents();
          this.clearStore();
        }
      })
    );
  }

  /**
   * Clear store for sandbox fa-aktennotiz
   */
  private clearStore() {
    faAktennotizStore.getFaAktennotizData.release();
    faAktennotizStore.getFaAktennotizLoading.release();
    faAktennotizStore.getFaAktennotiz.release();
  }

  /**
   * Loads TreeNavigator from the server
   */
  public loadFaAktennotizTreeNavigator(): void {
    this.faaktennotizState$.dispatch(
      new faAktennotizsAction.FaAktennotizNavTreeAction.LoadAction()
    );
  }
  /**
 * Loads Kontaktart from the server
 */
  public loadKontaktartData(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.KontaktartAction.LoadAction(params));
  }
  /**
* Loads Mitarbeiter from the server
*/
  public loadMitarbeiterData(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.MitarbeiterAction.LoadAction(params));
  }
  /**
* Loads TheMen from the server
*/
  public loadTheMenData(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.TheMenAction.LoadAction(params));
  }
  /**
* Add addFaAktennotizen to database
*/
  public addFaAktennotizen(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.AddFaAktennotizenAction.AddAction(params));
  }
  /**
*  delete FaAktennotizen
*/
  public deleteFaAktennotizen(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.DeleteFaAktennotizenAction.DeleteAction(params));
  }
  /**
*  update FaAktennotizen
*/
  public updateFaAktennotizen(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.UpdateFaAktennotizenAction.UpdateAction(params));
  }
  /**
* Loads Dauer from the server
*/
  public loadDauerData(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.DauerAction.LoadAction(params));
  }
  /**
* Loads Config from the server
*/
  public loadConfigData(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.GetConfigData.LoadAction(params));
  }
  /**
* Loads Config from the server
*/
  public loadDokumentAktennotizen(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.GetDokumentAktennotizen.LoadAction(params));
  }
  /**
 * Loads DefaultKontartPartner from the server
 */
  public loadDefaultKontartPartner(params?: any): void {
    this.faaktennotizState$.dispatch(new faAktennotizsAction.GetDefaultKontartPartner.LoadAction(params));
  }
}
