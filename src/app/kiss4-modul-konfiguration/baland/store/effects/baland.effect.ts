import { Injectable } from '@angular/core';
import { BalandApiClient } from '@app/kiss4-modul-konfiguration/baland/baland.ApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/baland.action';

@Injectable()
export class BalandsEffects {

  constructor(
    private actions$: Actions,
    private balandApiClient: BalandApiClient) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.BalandActionTypes.BalandTypes.LOAD)
    .pipe(
      map((action: actions.BalandInitData.LoadAction) => action.payload),
      switchMap(state => {
        return this.balandApiClient.getBaland().pipe(
          map(initdata => new actions.BalandInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.BalandInitData.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  syncData$ = this.actions$
    .ofType(actions.BalandActionTypes.BalandSyncTypes.SYNC)
    .pipe(
      map((action: actions.BalandSyncData.SyncAction) => action.payload),
      switchMap((state?: any) => {
        return this.balandApiClient.syncData().pipe(
          map(initdata => new actions.BalandSyncData.SyncSuccessAction(initdata)),
          catchError(error => of(new actions.BalandSyncData.SyncFailAction(error)))
        );
      })
    );

}
