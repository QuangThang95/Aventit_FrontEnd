import { Injectable } from '@angular/core';
import { KonfigurationApiClient } from '@app/kiss4-sostat/konfiguration/konfigurationApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/konfiguration.action';

@Injectable()
export class KonfigurationsEffects {

  constructor(
    private actions$: Actions,
    private konfigurationApiClient: KonfigurationApiClient) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.KonfigurationActionTypes.KonfigurationTypes.LOAD)
    .pipe(
      map((action: actions.KonfigurationInitData.LoadAction) => action.payload),
      switchMap(state => {
        return this.konfigurationApiClient
          .getKonfigurations().pipe(
            map(
              initdata =>
                new actions.KonfigurationInitData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.KonfigurationInitData.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getGridData$ = this.actions$
    .ofType(actions.KonfigurationActionTypes.KonfigurationTypesForGrid.LOAD)
    .pipe(
      map((action: actions.KonfigurationGridData.LoadAction) => action.payload),
      switchMap(state => {
        return this.konfigurationApiClient
          .getKonfigurationsGrid().pipe(
            map(
              initdata =>
                new actions.KonfigurationGridData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.KonfigurationGridData.LoadFailAction(error))
            ));
      })
    );
}
