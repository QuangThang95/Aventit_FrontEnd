import { Injectable } from '@angular/core';
import { FallNavNavigatorTreeModel } from '@app/kiss4-main/fall-navigator/models';
import { Store } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import { SelectedActionsModel } from '@shared/models';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as settingsActions from '@shared/store/actions/settings.actions';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/rx';

import * as klientensystemStore from './store';
import * as klientensystemAction from './store/actions/klientensystem.actions';

@Injectable()
export class KlientensystemSandbox extends Sandbox {

  public falltraegerData$ = this.klientensystemState$.select(klientensystemStore.getFalltraegerData);
  public mietvertragData$ = this.klientensystemState$.select(klientensystemStore.getMietvertragData);
  public relationData$ = this.klientensystemState$.select(klientensystemStore.getRelationData);
  public vwInstitutionData$ = this.klientensystemState$.select(klientensystemStore.getVwInstitutionData);

  public beziehungRelationFemaleData$ = this.klientensystemState$.select(klientensystemStore.getBeziehungRelationFemaleData);
  public beziehungRelationMaleData$ = this.klientensystemState$.select(klientensystemStore.getBeziehungRelationMaleData);
  public beziehungRelationGenericData$ = this.klientensystemState$.select(klientensystemStore.getBeziehungRelationGenericData);
  public inFPData$ = this.klientensystemState$.select(klientensystemStore.getInFPData);
  public gleicheAdresseData$ = this.klientensystemState$.select(klientensystemStore.getGleicheAdresseData);
  public handleGleicherHaushaltData$ = this.klientensystemState$.select(klientensystemStore.getHandleGleicherHaushaltData);

  public updateBaPersonData$ = this.klientensystemState$.select(klientensystemStore.updateBaPerson);
  public updateBaPersonRelationData$ = this.klientensystemState$.select(klientensystemStore.updateBaPersonRelation);
  public updateBaMietvertragData$ = this.klientensystemState$.select(klientensystemStore.updateBaMietvertrag);
  public insertHistoryVersionData$ = this.klientensystemState$.select(klientensystemStore.insertHistoryVersion);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private klientensystemState$: Store<klientensystemStore.KlientensystemState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  public selectAction(treeModel: FallNavNavigatorTreeModel, url: string): void {
    const actions: SelectedActionsModel = {
      id: treeModel.id,
      name: treeModel.name,
      time: new Date(),
      data: treeModel,
      url: url,
      age: treeModel['age'] ? treeModel['age'] : 0,
      gender: treeModel['geschlechtName'] ? treeModel['geschlechtName'].split('')[0] : 'n',
      type: AppEnums.PageType.fallnavigator
    };
    this.appState$.dispatch(new settingsActions.UpdateSelectedAction(actions));
  }

  /**
   * Loads Falltraeger from the server
   */
  public loadFalltraegerInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadFalltraegerAction(params));
  }

  /**
   * Loads Mietvertrag from the server
   */
  public loadMietvertragInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadMietvertragAction(params));
  }

  /**
   * Loads Relation from the server
   */
  public loadRelationInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadRelationAction(params));
  }

  /**
   * Loads Falltraeger from the server
   */
  public loadVwInstitutionInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadVwInstitutionAction(params));
  }

  /**
   * Loads BeziehungRelationGeneric from the server
   */
  public loadBeziehungRelationGenericInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadBeziehungRelationGenericAction(params));
  }

  /**
   * Loads BeziehungRelationMale from the server
   */
  public loadBeziehungRelationMaleInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadBeziehungRelationMaleAction(params));
  }

  /**
   * Loads BeziehungRelationFemale from the server
   */
  public loadBeziehungRelationFemaleInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadBeziehungRelationFemaleAction(params));
  }

  /**
   * Loads InFP from the server
   */
  public loadInFPInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadInFPAction(params));
  }

  /**
   * Loads GleicheAdresse from the server
   */
  public loadGleicheAdresseInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadGleicheAdresseAction(params));
  }

  /**
  * Loads HandleGleicherHaushalt from the server
  */
  public loadHandleGleicherHaushaltInitData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.LoadHandleGleicherHaushaltAction(params));
  }

  /**
   * Update BaPersonRelation to the server
   */
  public updateBaPersonRelationData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.UpdateBaPersonRelationAction(params));
  }

  /**
   * Update BaPerson to the server
   */
  public updateBaPersonData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.UpdateBaPersonAction(params));
  }

  /**
   * Update BaMietvertrag to the server
   */
  public updateBaMietvertragData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.UpdateBaMietvertragAction(params));
  }

  /**
   * Insert HistoryVersion to the server
   */
  public insertHistoryVersionData(params?: any): void {
    this.klientensystemState$.dispatch(new klientensystemAction.InsertHistoryVersionAction(params));
  }

  public resetState(): void {
    this.klientensystemState$.dispatch(
        new klientensystemAction.ResetStateAction()
    );
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
    this.subscriptions.push(this.loggedUser$.subscribe((user: any) => {
      if (user.isLoggedIn) {
      } else {
        this.clearStore();
        this.unregisterEvents();
      }
    }));
  }

  /**
   * Clear store for sandbox
   */
  private clearStore() {
    klientensystemStore.getFalltraegerData.release();
    klientensystemStore.getMietvertragData.release();
    klientensystemStore.getRelationData.release();
    klientensystemStore.getVwInstitutionData.release();

    klientensystemStore.getBeziehungRelationGenericData.release();
    klientensystemStore.getBeziehungRelationMaleData.release();
    klientensystemStore.getBeziehungRelationFemaleData.release();
    klientensystemStore.getInFPData.release();
    klientensystemStore.getGleicheAdresseData.release();
    klientensystemStore.getHandleGleicherHaushaltData.release();

    klientensystemStore.updateBaPersonRelation.release();
    klientensystemStore.updateBaPerson.release();
    klientensystemStore.updateBaMietvertrag.release();
    klientensystemStore.insertHistoryVersion.release();
  }
}
