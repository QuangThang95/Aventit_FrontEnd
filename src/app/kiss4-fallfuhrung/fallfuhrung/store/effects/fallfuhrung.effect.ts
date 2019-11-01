import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FallfuhrungApiClient } from '../../fallfuhrung.ApiClient.service';
import { ModelQueryGetConfig, ModelQueryUpdateFaleistung, ModelQueryValidationFaLeistung } from '../../models';
import * as actions from '../actions/fallfuhrung.action';

// rxjs
@Injectable()
export class FallfuhrungsEffects {
  constructor(
    private actions$: Actions,
    private FallfuhrungApi: FallfuhrungApiClient) { }
  @Effect()
  getFallfuhrungData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.FallfuhrungTypes.LOAD)
    .pipe(
      map((action: actions.FallfuhrungData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getDataFallfuhrung(state).pipe(
            map(
              initdata =>
                new actions.FallfuhrungData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.FallfuhrungData.LoadFailAction(error))
            ));
      })
    );

  // Get data config
  @Effect()
  getConfigData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetConfigTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigData.LoadAction) => action.payload),
      switchMap((state: ModelQueryGetConfig) => {
        const query = tryMapPathApi(state);
        return this.FallfuhrungApi
          .getConfig(query).pipe(
            map(
              initdata =>
                new actions.GetConfigData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigData.LoadFailAction(error))
            ));
      })
    );

  // Get data Fall Rights
  @Effect()
  getFallRightsData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetFallRightsTypes.LOAD)
    .pipe(
      map((action: actions.GetFallRightsData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getDataFallRights(state).pipe(
            map(
              initdata =>
                new actions.GetFallRightsData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetFallRightsData.LoadFailAction(error))
            ));
      })
    );

  // Get data Kontaktveranl
  @Effect()
  getKontaktveranlData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetKontaktveranlTypes.LOAD)
    .pipe(
      map((action: actions.GetKontaktveranlData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getDataCombobox(state).pipe(
            map(
              initdata =>
                new actions.GetKontaktveranlData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetKontaktveranlData.LoadFailAction(error))
            ));
      })
    );

  // Get data Grund
  @Effect()
  getGrundData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetGrundTypes.LOAD)
    .pipe(
      map((action: actions.GetGrundData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getDataCombobox(state).pipe(
            map(
              initdata =>
                new actions.GetGrundData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetGrundData.LoadFailAction(error))
            ));
      })
    );

  // Get data Gemeinde
  @Effect()
  getGemeindeData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetGemeindeTypes.LOAD)
    .pipe(
      map((action: actions.GetGemeindeData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getDataCombobox(state).pipe(
            map(
              initdata =>
                new actions.GetGemeindeData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetGemeindeData.LoadFailAction(error))
            ));
      })
    );

  // Update Transaction FaLeistung
  @Effect()
  updateTransactionFaLeistung$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.UpdateFaLeistungTypes.Update_FaLeistung)
    .pipe(
      map((action: actions.UpdateFaLeistungData.UpdateAction) => action.payload),
      switchMap((state: ModelQueryUpdateFaleistung) => {
        return this.FallfuhrungApi
          .updateFaLeistungTransaction(state).pipe(
            map(
              initdata =>
                new actions.UpdateFaLeistungData.UpdateSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.UpdateFaLeistungData.UpdateFailAction(error))
            ));
      })
    );
  // Get data Anmeldeart
  @Effect()
  getAnmeldeartData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetAnmeldeartTypes.LOAD)
    .pipe(
      map((action: actions.GetAnmeldeartData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getDataCombobox(state).pipe(
            map(
              initdata =>
                new actions.GetAnmeldeartData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetAnmeldeartData.LoadFailAction(error))
            ));
      })
    );

  // Get data AnzahlOffenePendenzen
  @Effect()
  getAnzahlOffenePendenzenData$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetAnzahlOffenePendenzenTypes.LOAD)
    .pipe(
      map((action: actions.GetAnzahlOffeneData.LoadAction) => action.payload),
      switchMap(state => {
        return this.FallfuhrungApi
          .getAnzahlOffenePendenzen(state).pipe(
            map(
              initdata =>
                new actions.GetAnzahlOffeneData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetAnzahlOffeneData.LoadFailAction(error))
            ));
      })
    );

  // Validation FaLeistung
  @Effect()
  validationFaLeistung$ = this.actions$
    .ofType(actions.FallfuhrungActionTypes.GetValidationFaLeistungTypes.LOAD)
    .pipe(
      map((action: actions.ValidationFaLeistungData.LoadAction) => action.payload),
      switchMap((state: ModelQueryValidationFaLeistung) => {
        return this.FallfuhrungApi
          .validationFaLeistung(state).pipe(
            map(
              initdata =>
                new actions.ValidationFaLeistungData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.ValidationFaLeistungData.LoadFailAction(error))
            ));
      })
    );
}
