import { Injectable } from '@angular/core';
import { UberApiClient } from '@app/kiss4-main/uber/uberApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/uber.action';

// rxjs
// models entity
@Injectable()
export class UberEffects {
  constructor(
    private actions$: Actions,
    // tslint:disable-next-line:no-shadowed-variable
    private UberApiClient: UberApiClient ) {}
  @Effect()
  getCultureInfoData$ = this.actions$
    .ofType(actions.UberActionTypes.CultureInfoTypes.LOAD)
    .pipe(
      map((action: actions.CultureInfoLoadData.LoadAction) => action.payload),
      switchMap((query?: number) => {
        return this.UberApiClient
          .getCultureInfo(query).pipe(
            map(
              initdata =>
                new actions.CultureInfoLoadData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.CultureInfoLoadData.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getDatabaseInfoData$ = this.actions$
    .ofType(actions.UberActionTypes.DatabaseInfoTypes.LOAD)
    .pipe(
      map((action: actions.DatabaseInfoLoadData.LoadAction) => action.payload),
      switchMap(state => {
        return this.UberApiClient
          .getDatabaseInfo().pipe(
            map(
              initdata =>
                new actions.DatabaseInfoLoadData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DatabaseInfoLoadData.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getDatabaseVersionsData$ = this.actions$
    .ofType(actions.UberActionTypes.DatabaseVersionsTypes.LOAD)
    .pipe(
      map((action: actions.DatabaseVersionsLoadData.LoadAction) => action.payload),
      switchMap(state => {
        return this.UberApiClient
          .getDatabaseVersions().pipe(
            map(
              initdata =>
                new actions.DatabaseVersionsLoadData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DatabaseVersionsLoadData.LoadFailAction(error))
            ));
      })
    );

    @Effect()
    getKiss4WebVersionData$ = this.actions$
      .ofType(actions.UberActionTypes.Kiss4WebVersionTypes.LOAD)
      .pipe(
        map((action: actions.Kiss4WebVersionLoadData.LoadAction) => action.payload),
        switchMap(state => {
          return this.UberApiClient
            .getKiss4WebVersion().pipe(
              map(
                initdata =>
                  new actions.Kiss4WebVersionLoadData.LoadSuccessAction(initdata)
              ),
              catchError(error =>
                of(new actions.Kiss4WebVersionLoadData.LoadFailAction(error))
              ));
        })
      );
}
