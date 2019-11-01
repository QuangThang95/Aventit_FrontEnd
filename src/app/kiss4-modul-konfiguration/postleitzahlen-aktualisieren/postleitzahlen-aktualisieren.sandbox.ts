import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as PostleitzahlenAktualisierenStore from './store';
import * as PostleitzahlenAktualisierenAction from './store/actions/postleitzahlen-aktualisieren.action';

@Injectable()
export class PostleitzahlenAktualisierenSandbox extends Sandbox {

  public PostleitzahlenAktualisierensData$ = this.postleitzahlenAktualisierenState$.select(
    PostleitzahlenAktualisierenStore.getPostleitzahlenAktualisierensData
  );

  public PostleitzahlenAktualisierensSyncData$ = this.postleitzahlenAktualisierenState$.select(
    PostleitzahlenAktualisierenStore.getPostleitzahlenAktualisierensSyncData
  );

  constructor(
    protected appState$: Store<store.State>,
    private postleitzahlenAktualisierenState$: Store<PostleitzahlenAktualisierenStore.PostleitzahlenAktualisierenStateState>
  ) {
    super(appState$);
  }

  public getPostleitzahlenAktualisieren(): void {
    this.postleitzahlenAktualisierenState$.dispatch(new PostleitzahlenAktualisierenAction.PostleitzahlenAktualisierenInitData.LoadAction());
  }

  public syncData(): void {
    this.postleitzahlenAktualisierenState$.dispatch(new PostleitzahlenAktualisierenAction.PostleitzahlenAktualisierenSyncData.SyncAction());
  }

  public reset(): void {
    this.postleitzahlenAktualisierenState$.dispatch(new PostleitzahlenAktualisierenAction.PostleitzahlenAktualisierenResetData.ResetAction());
  }

}
