import { Injectable } from '@angular/core';
import { KennzahlenApiClient } from '@app/kiss4-sostat/kennzahlen/kennzahlenApiClient.service';
import { ModelKennzahlen } from '@app/kiss4-sostat/kennzahlen/models';
import { Actions, Effect } from '@ngrx/effects';
import { sanitizeObject, tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/kennzahlen.action';

@Injectable()
export class KennzahlensEffects {

  constructor(
    private actions$: Actions,
    private kennzahlenApiClient: KennzahlenApiClient) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.KennzahlenActionTypes.Types.LOAD)
    .pipe(
      map((action: actions.InitData.LoadAction) => action.payload),
      switchMap((state: ModelKennzahlen) => {
        sanitizeObject(state) ;
        const query = tryMapPathApi(state);
        return this.kennzahlenApiClient
          .getKennzahlens(query).pipe(
            map(
              initdata =>
              new actions.InitData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.InitData.LoadFailAction(error))
            ));
      })
    );


    @Effect()
    getInitSearch$ = this.actions$
      .ofType(actions.KennzahlenActionTypes.InitSearchTypes.LOAD)
      .pipe(
        map((action: actions.InitSearchData.LoadAction) => action.payload),
        switchMap(() => {
          return this.kennzahlenApiClient
            .initSearch().pipe(
              map(
                initdata =>
                  new actions.InitSearchData.LoadSuccessAction(initdata)
              ),
              catchError(error =>
                of(new actions.InitSearchData.LoadFailAction(error))
              ));
        })
      );

}
