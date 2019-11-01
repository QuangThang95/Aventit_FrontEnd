import { Injectable } from '@angular/core';
import { GemeindeDatenApiClient } from '@app/kiss4-modul-konfiguration/gemeinde-daten/gemeinde-daten.ApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/gemeinde-daten.action';

@Injectable()
export class GemeindeDatensEffects {

  constructor(
    private actions$: Actions,
    private gemeindeDatenApiClient: GemeindeDatenApiClient) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.GemeindeDatenActionTypes.GemeindeDatenTypes.LOAD)
    .pipe(
      map((action: actions.GemeindeDatenInitData.LoadAction) => action.payload),
      switchMap(state => {
        return this.gemeindeDatenApiClient.getGemeindeDatens().pipe(
          map(initdata => new actions.GemeindeDatenInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.GemeindeDatenInitData.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  syncData$ = this.actions$
    .ofType(actions.GemeindeDatenActionTypes.GemeindeDatenSyncTypes.SYNC)
    .pipe(
      map((action: actions.GemeindeDatenSyncData.SyncAction) => action.payload),
      switchMap((state?: any) => {
        return this.gemeindeDatenApiClient.syncData().pipe(
          map(initdata => new actions.GemeindeDatenSyncData.SyncSuccessAction(initdata)),
          catchError(error => of(new actions.GemeindeDatenSyncData.SyncFailAction(error)))
        );
      })
    );

  @Effect()
  importData$ = this.actions$
    .ofType(actions.GemeindeDatenActionTypes.GemeindeDatenImportTypes.IMPORT)
    .pipe(
      map((action: actions.GemeindeDatenImportData.ImportAction) => action.payload),
      switchMap((state?: any) => {
        return this.gemeindeDatenApiClient.importData(state).pipe(
          map(initdata => new actions.GemeindeDatenImportData.ImportSuccessAction(initdata)),
          catchError(error => of(new actions.GemeindeDatenImportData.ImportFailAction(error)))
        );
      })
    );

}
