import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/rx';
import { UtilService } from '@shared/utilites';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as personenImHaushaltsAction from './store/actions/personen-im-haushalt.actions';
import * as store from '@shared/store/index';
import * as personenImHaushaltStore from './store/index';
import { User } from '@shared/models';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class PersonenImHaushaltSandbox extends Sandbox {
  personenImHaushaltData$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getPersonenImHaushaltStoreData
  );
  personenImHaushaltLoading$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getPersonenImHaushaltStoreLoading
  );
  personenImHaushalt$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getPersonenImHaushaltStore
  );
  personenImHaushaltQuery$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getPersonenImHaushaltStoreData
  );

  personenData$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getPersonenData
  );

  whKennzahlenData$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getWhKennzahlenData
  );

  klientenSystemData$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getKlientenSystemData
  );

  haushaltData$ = this.personenImHaushaltState$.select(
    personenImHaushaltStore.getHaushaltData
  );

  savePersonenImHaushaltRes$ = combineLatest(
    this.personenImHaushaltState$.select(personenImHaushaltStore.getPersonenImHaushaltUpdatedSuccess),
    this.personenImHaushaltState$.select(personenImHaushaltStore.getPersonenImHaushaltUpdatedFaild)
  ).pipe(debounceTime(250));

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private personenImHaushaltState$: Store<personenImHaushaltStore.IPersonenImHaushaltState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  /**
   * Loads personenImHaushalts from the server
   */
  loadPersonenImHaushaltInitData(params?: any): void {
    this.personenImHaushaltState$.dispatch(new personenImHaushaltsAction.PersonenImHaushaltAction.LoadAction(params));
  }

  /**
   * Save personenImHaushalts to the server
   */
  savePersonenImHaushaltData(params?: any): void {
    this.personenImHaushaltState$.dispatch(new personenImHaushaltsAction.PutPersonenImHaushaltAction.PutAction(params));
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
  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  public registerEvents(): void {
    this.subscriptions.push(
      this.loggedUser$.subscribe((user: User) => {
        if (user.isLoggedIn) {
          this.loadPersonenImHaushaltTreeNavigator();
        } else {
          this.unregisterEvents();
          this.clearStore();
        }
      })
    );
  }

  /**
   * Clear store for sandbox personen-im-haushalt
   */
  private clearStore() {
    personenImHaushaltStore.getPersonenImHaushaltStoreData.release();
    personenImHaushaltStore.getPersonenImHaushaltStoreLoading.release();
    personenImHaushaltStore.getPersonenImHaushaltStore.release();
  }

  /**
   * Loads TreeNavigator from the server
   */
  public loadPersonenImHaushaltTreeNavigator(): void {
    this.personenImHaushaltState$.dispatch(
      new personenImHaushaltsAction.PersonenImHaushaltNavTreeAction.LoadAction()
    );
  }
}
