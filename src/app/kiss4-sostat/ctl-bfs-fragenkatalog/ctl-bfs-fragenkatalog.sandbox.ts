import { Injectable } from '@angular/core';
import * as CtlBfsFragenkatalogAction from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/store/actions/ctl-bfs-fragenkatalog.actions';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/rx';

import * as ctlBfsFragenkatalogStore from './store';

@Injectable()
export class CtlBfsFragenkatalogSandbox extends Sandbox {
  public ctlBfsFragenkatalogData$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getCtlBfsFragenkatalogData
  );
  public ctlBfsFragenkataloglistData$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getCtlBfsFragenkataloglistData
  );
  public ctlBfsFragenkatalogAddData$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getCtlBfsFragenkatalogAddDatas
  );
  public ctlBfsFragenkatalogUpdateData$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getCtlBfsFragenkatalogUpdate
  );
  public ctlBfsFragenkatalogUpdateFail$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getCtlBfsFragenkatalogUpdateFail
  );
  public ctlBfsFragenkatalogDeleteData$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getCtlBfsFragenkatalogDelete
  );
  public ctlBfsFragenkatalogGetStateForm$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getStateFormCtlBfsFragenkatalog
  );
  public ctlBfsFragenkatalogGetObjectDetail$ = this.ctlBfsFragenkatalogState$.select(
    ctlBfsFragenkatalogStore.getObjectDetailCtlBfsFragenkatalog
  );

  private subscriptions: Array<Subscription> = [];

  constructor(protected appState$: Store<store.State>,
    private ctlBfsFragenkatalogState$: Store<ctlBfsFragenkatalogStore.CtlBfsFragenkatalogState>,
    private utilService: UtilService) {
    super(appState$);
  }

  public loadCtlBfsFragenkatalog(): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.CtlBfsFragenkatalogInitDatas.LoadAction());
  }

  public loadListCtlBfsFragenkatalog(query): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.CtlBfsFragenkatalogList.LoadAction(query));
  }

  public addCtlBfsFragenkatalog(CtlBfsFragenkatalog: any): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.CtlBfsFragenkatalogAddData.AddNewAction(CtlBfsFragenkatalog));
  }

  public updateCtlBfsFragenkatalog(ctlBfsFragenkatalog: any): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.CtlBfsFragenkatalogUpdate.UpdateAction(ctlBfsFragenkatalog));
  }

  public deleteCtlBfsFragenkatalog(BFSFrageID: number): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.CtlBfsFragenkatalogDeleteData.DeleteAction(BFSFrageID));
  }

  public saveStateFormCtlBfsFragenkatalog(objectState: any): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.SaveFormState.SaveFormStateAction(objectState));
  }
  public objectFromDetailCtlBfsFragenkatalog(objectDetail: any): void {
    this.ctlBfsFragenkatalogState$.dispatch(new CtlBfsFragenkatalogAction.CtlBfsFragenkatalogDetailState.CtlBfsFragenkatalogDetailStateAction({...objectDetail}));
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
