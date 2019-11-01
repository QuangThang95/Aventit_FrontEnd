import { Injectable } from '@angular/core';
// rsjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
//
import * as actions from '../actions/fall-navigator.actions';
import { FallNavApiClient } from '@app/kiss4-main/fall-navigator/fall-navigatorApiClient.service';
import { FallNavFilterModel } from '@app/kiss4-main/fall-navigator/models';

@Injectable()
export class FallNavsEffects {

  constructor(
    private actions$: Actions,
    private FallNavApiClient: FallNavApiClient) { }

  /**
   * Subcription Trees list FallNav navigator
   */
  @Effect()
  getTrees$ =
    this.actions$.ofType(actions.FallNavsActionTypes.LoadFallNavsTypes.LOAD).pipe(
      map((action: actions.LoadFallNavsAction) => action.payload),
      switchMap((state: FallNavFilterModel) => {
        const query = tryMapPathApi(state);
        return this.FallNavApiClient.getTrees(query).pipe(
          map(trees => new actions.LoadFallNavsSuccessAction(trees)),
          catchError(error => of(new actions.LoadFallNavsFailAction(error)))
        );
      })
    );

  /**
   * Subcription kategorie config
   */
  @Effect()
  getConfigData$ = this.actions$
    .ofType(actions.FallNavsActionTypes.ConfigBoolTypes.GET)
    .pipe(
      map((action: actions.LoadConfigBoolAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.FallNavApiClient.getConfigBool(query).pipe(
          map(
            initdata => {
              return new actions.LoadConfigBoolSuccessAction(initdata);
            }
          ),
          catchError(error =>
            of(new actions.LoadConfigBoolFailAction(error))
          ));
      })
    );

  /**
   *  Subcription headers
   */
  @Effect()
  getHeaderData$ = this.actions$
    .ofType(actions.FallNavsActionTypes.HeaderTypes.GET)
    .pipe(
      map((action: actions.LoadHeaderAction) => action.payload),
      switchMap(state => {
        return this.FallNavApiClient.getHeaders().pipe(
          map(
            initdata => {
              return new actions.LoadHeaderSuccessAction(initdata);
            }
          ),
          catchError(error =>
            of(new actions.LoadHeaderFailAction(error))
          ));
      })
    );
}
