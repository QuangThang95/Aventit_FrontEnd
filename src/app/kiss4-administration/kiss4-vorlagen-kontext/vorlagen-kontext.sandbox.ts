import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@shared/models';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites';
import { Subscription } from 'rxjs';

import { IXDocInsert, UpdateXDocContextTemplate } from './models';
import * as vorlageKontextStore from './store';
import * as vorlagenKontextsActions from './store/actions/vorlagen-kontext.action';

@Injectable()
export class VorlagenKontextSandbox extends Sandbox {


  // select load data  from store
  public vorlagenKontextLoadAllData$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextXDocContextAll
  );
  public vorlagenKontextLoadAllLoading$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextXDocContextAllLoading
  );

  public vorlagenKontextLoadAllLoaded$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextXDocContextAllLoaded
  );
  public vorlagenKontextLoadAllLoadFail$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextXDocContextAllFailed
  );
  // select update data  from store

  public vorlagenKontextUpdateData$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextUpdateXDocContext
  );
  public vorlagenKontextUpdating$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextUpdateXDocContextLoading
  );

  public vorlagenKontextUpdated$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextUpdateXDocContextLoaded
  );
  public vorlagenKontextUpdateFail$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextUpdateXDocContextLailed
  );

  // select insert data  from store


  public vorlagenKontextAddData$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextInsertXDocContext
  );
  public vorlagenKontextAdding$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextInsertXDocContextLoading
  );

  public vorlagenKontextAdded$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextInsertXDocContextLoaded
  );
  public vorlagenKontextAddFail$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextInsertXDocContextLailed
  );
  // select delete data  from store

  public vorlagenKontextDeleteData$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextDeleteXDocContext
  );
  public vorlagenKontextDeleting$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextDeleteXDocContextLoading
  );

  public vorlagenKontextDeleted$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextDeleteXDocContextLoaded
  );
  public vorlagenKontextDeleteFail$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextDeleteXDocContextLailed
  );
  // select count xdoccontext template data  from store

  public countXDocContext_TemplateByDocContextIDData$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextID
  );
  public countXDocContext_TemplateByDocContextIDLoading$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextIDLoading
  );

  public countXDocContext_TemplateByDocContextIDLoaded$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextIDLoaded
  );
  public countXDocContext_TemplateByDocContextIDloadFaild$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextIDLailed
  );

  public getZugeteiltByDocContextID$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextZugeteiltByDocContextID
  );
  public getVerfuegbarByDocContextID$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextVerfuegbarByDocContextID
  );
  // VDHoan using for save
  public getInsertXDocContextTemplateLoaded$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextInsertXDocContext_TemplateLoaded
  );
  public getInsertXDocContextTemplate$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextInsertXDocContext_Template
  );
  public getVorlagenKontextDeleteXDocContext$ = this.vorlagenKontextState$.select(
    vorlageKontextStore.getVorlagenKontextDeleteXDocContext
  );

  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    private vorlagenKontextState$: Store<vorlageKontextStore.VorlagenKontextState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  /**
   * Loads vorlagenkontexts from the server
   */
  public loadXDocContextInitData(params?: any): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextLoadAllXDocAction.LoadAction(params));
  }

  /**
   * update vorlagenkontexts from the server
   */
  public updateXDocContextData(params?: any): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextPutXDocContextAction.PutAction(params));
  }

  /**
   * insert vorlagenkontexts from the server
   */
  public insertXDocContextData(params?: any): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextPostXDocContextAction.PostAction(params));
  }

  /**
   * delete vorlagenkontexts from the server
   */
  public deleteXDocContextData(params?: any): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextDelXDocContextAction.DelAction(params));
  }
  /**
   * Dispatch Get parent position
   */
  public getParentPosition(query) {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextLoadParentPositionAction.LoadAction(query));
  }

  /**
   * count XdocContext template by doc kontextID from the server
   */
  public countXDocContext_TemplateByDocContextID(params?: any): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountAction(params));
  }


  /**
   * Dispatch post XDocContent Template
   */
  public postXDocContext_Template(query) {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextPostXDocContext_TemplateAction.PostAction(query));
  }

  public loadZugeteiltByDocContextID(docContextID: number): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadAction(docContextID));
  }
  public loadVerfuegbarByDocContextID(docContextID: number): void {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadAction(docContextID));
  }

  // VDHoan using for save
  public insertXDocContextTemplate(listInsertXDocContextTemplate: IXDocInsert) {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextPostXDocContext_TemplateAction.PostAction(listInsertXDocContextTemplate));
  }

  public deleteXDocContext_Template(listDeleteXDocContextTemplate: number[]) {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextDelXDocContext_TemplateAction.DelAction(listDeleteXDocContextTemplate));
  }

  public updateXDocContextTemplate(listUpdateXDocContextTemplate: UpdateXDocContextTemplate[]) {
    this.vorlagenKontextState$.dispatch(new vorlagenKontextsActions.VorlagenKontextPutXDocContext_TemplateAction.PutAction(listUpdateXDocContextTemplate));
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
    this.subscriptions.push(
      this.loggedUser$.subscribe((user: User) => {
        if (user.isLoggedIn) {

        } else {
          this.unregisterEvents();
          this.clearStore();
        }
      })
    );
  }
  private clearStore() {
    vorlageKontextStore.getVorlagenKontextXDocContextAll.release();
    vorlageKontextStore.getVorlagenKontextXDocContextAllLoading.release();
    vorlageKontextStore.getVorlagenKontextXDocContextAllLoaded.release();
    vorlageKontextStore.getVorlagenKontextXDocContextAllFailed.release();
    // release update data
    vorlageKontextStore.getVorlagenKontextUpdateXDocContext.release();
    vorlageKontextStore.getVorlagenKontextUpdateXDocContextLoading.release();
    vorlageKontextStore.getVorlagenKontextUpdateXDocContextLoaded.release();
    vorlageKontextStore.getVorlagenKontextUpdateXDocContextLailed.release();
    // release insert data
    vorlageKontextStore.getVorlagenKontextInsertXDocContext.release();
    vorlageKontextStore.getVorlagenKontextInsertXDocContextLoading.release();
    vorlageKontextStore.getVorlagenKontextInsertXDocContextLoaded.release();
    vorlageKontextStore.getVorlagenKontextInsertXDocContextLailed.release();
    // release delete data
    vorlageKontextStore.getVorlagenKontextDeleteXDocContext.release();
    vorlageKontextStore.getVorlagenKontextDeleteXDocContextLoading.release();
    vorlageKontextStore.getVorlagenKontextDeleteXDocContextLoaded.release();
    vorlageKontextStore.getVorlagenKontextDeleteXDocContextLailed.release();
    vorlageKontextStore.getVorlagenKontextZugeteiltByDocContextID.release();
    vorlageKontextStore.getVorlagenKontextVerfuegbarByDocContextID.release();

    // release count DocContext  template by doc context by id data
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextID.release();
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextIDLoading.release();
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextIDLoaded.release();
    vorlageKontextStore.getVorlagenKontextCountXDocContext_TemplateByDocContextIDLailed.release();


    // VDHoan release save
    vorlageKontextStore.getVorlagenKontextInsertXDocContext_TemplateLoaded.release();
  }
}
