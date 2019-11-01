import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FaAktennotizApiClient } from '../../fa-aktennotizApiClient.service';
import { FaAktennotizQuery } from '../../models';
import * as actions from '../actions/fa-aktennotiz.actions';

// rxjs
//
// models entity
@Injectable()
export class FaAktennotizEffects {

  constructor(
    private actions$: Actions,
    private faAktennotizApiClient: FaAktennotizApiClient) { }

  /**
  * FaAktennotiz list
  */
  @Effect()
  getFaAktennotiz$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.FaAktennotizTypes.LOAD)
    .pipe(
      map((action: actions.FaAktennotizAction.LoadAction) => action.payload),
      switchMap((queryBody: FaAktennotizQuery) => {
        return this.faAktennotizApiClient
          .getFaAktennotiz(queryBody)
          .pipe(
            map(
              faAktennotizs =>
                new actions.FaAktennotizAction.LoadSuccessAction(
                  faAktennotizs
                )
            ),
            catchError(error =>
              of(new actions.FaAktennotizAction.LoadFailAction(error))
            ));
      }));

  /**
   * Subcriber Kontaktart
   */
  @Effect()
  getKontaktartData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.KontaktartTypes.LOAD)
    .pipe(
      map((action: actions.KontaktartAction.LoadAction) => action.payload),
      switchMap(() => {
        return this.faAktennotizApiClient
          .getKontaktart().pipe(
            map(
              initdata =>
                new actions.KontaktartAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.KontaktartAction.LoadFailAction(error))
            ));
      })
    );

  /**
* Subcriber Mitarbeiter
*/
  @Effect()
  getMitarbeiterData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.MitarbeiterTypes.LOAD)
    .pipe(
      map((action: actions.MitarbeiterAction.LoadAction) => action.payload),
      switchMap(() => {
        return this.faAktennotizApiClient
          .getMitarbeiter().pipe(
            map(
              initdata =>
                new actions.MitarbeiterAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.MitarbeiterAction.LoadFailAction(error))
            ));
      })
    );

  /**
* Subcriber TheMen
*/
  @Effect()
  getTheMenData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.TheMenTypes.LOAD)
    .pipe(
      map((action: actions.TheMenAction.LoadAction) => action.payload),
      switchMap(() => {
        return this.faAktennotizApiClient
          .getTheMen().pipe(
            map(
              initdata =>
                new actions.TheMenAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.TheMenAction.LoadFailAction(error))
            ));
      })
    );

  /**
* Subcriber addFaAktennotiz
*/
  @Effect()
  getaddFaAktennotizData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.AddFaAktennotizenTypes.ADD)
    .pipe(
      map((action: actions.AddFaAktennotizenAction.AddAction) => action.payload),
      switchMap((body: any) => {
        return this.faAktennotizApiClient
          .addFaAktennotiz(body).pipe(
            map(
              initdata =>
                new actions.AddFaAktennotizenAction.AddSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.AddFaAktennotizenAction.AddFailAction(error))
            ));
      })
    );
  /**
* Subcriber deleteFaAktennotiz
*/
  @Effect()
  getDeleteFaAktennotizData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.DeleteFaAktennotizenTypes.DELETE)
    .pipe(
      map((action: actions.DeleteFaAktennotizenAction.DeleteAction) => action.payload),
      switchMap((queryModel: any) => {
        const query = tryMapPathApi(queryModel);
        return this.faAktennotizApiClient
          .deleteFaAktennotiz(query).pipe(
            map(
              initdata =>
                new actions.DeleteFaAktennotizenAction.DeleteSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DeleteFaAktennotizenAction.DeleteFailAction(error))
            ));
      })
    );
  /**
* Subcriber deleteFaAktennotiz
*/
  @Effect()
  getUpdateFaAktennotizData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.UpdateFaAktennotizenTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateFaAktennotizenAction.UpdateAction) => action.payload),
      switchMap((body: any) => {
        return this.faAktennotizApiClient
          .updateFaAktennotiz(body).pipe(
            map(
              initdata =>
                new actions.UpdateFaAktennotizenAction.UpdateSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.UpdateFaAktennotizenAction.UpdateFailAction(error))
            ));
      })
    );
  /**
* Subcriber Dauer
*/
  @Effect()
  getDauerData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.DauerTypes.LOAD)
    .pipe(
      map((action: actions.DauerAction.LoadAction) => action.payload),
      switchMap(() => {
        return this.faAktennotizApiClient
          .getDauer().pipe(
            map(
              initdata =>
                new actions.DauerAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DauerAction.LoadFailAction(error))
            ));
      })
    );

  /**
* Subcriber get config
*/
  @Effect()
  getConfigData$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.GetConfigTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigData.LoadAction) => action.payload),
      switchMap((queryModel: any) => {
        const query = tryMapPathApi(queryModel);
        return this.faAktennotizApiClient
          .getConfigBool(query).pipe(
            map(
              initdata =>
                new actions.GetConfigData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigData.LoadFailAction(error))
            ));
      })
    );
  /**
* Subcriber get config
*/
  @Effect()
  getDokumentAktennotizen$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.GetDokumentAktennotizenTypes.LOAD)
    .pipe(
      map((action: actions.GetDokumentAktennotizen.LoadAction) => action.payload),
      switchMap(() => {
        return this.faAktennotizApiClient
          .getDokumentAktennotizen().pipe(
            map(
              initdata =>
                new actions.GetDokumentAktennotizen.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetDokumentAktennotizen.LoadFailAction(error))
            ));
      })
    );
  /**
* Subcriber get config
*/
  @Effect()
  getDefaultKontartPartner$ = this.actions$
    .ofType(actions.FaAktennotizActionTypes.GetDefaultKontartPartnerTypes.LOAD)
    .pipe(
      map((action: actions.GetDefaultKontartPartner.LoadAction) => action.payload),
      switchMap((baPersonID: number) => {
        return this.faAktennotizApiClient
          .getDefaultKontartPartner(baPersonID).pipe(
            map(
              initdata =>
                new actions.GetDefaultKontartPartner.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetDefaultKontartPartner.LoadFailAction(error))
            ));
      })
    );
}

