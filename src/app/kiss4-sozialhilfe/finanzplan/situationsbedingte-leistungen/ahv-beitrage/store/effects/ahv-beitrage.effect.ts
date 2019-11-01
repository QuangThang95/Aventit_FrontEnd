import { getSqlQueryShPositionTyp, updateAhvBeitrage } from './../reducers/ahi-beitrage.reducer';
import { AHVBeitragPosition } from './../../models/ahv-beitrage.model';
import { AhvBeitrageApiClient } from '../../ahv-beitrageApiClient.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';

import * as actions from '../actions/ahv-beitrage.action';

@Injectable()
export class AhvBeitrageEffects {

  constructor(
    private actions$: Actions,
    private ahvBeitrageApiClient: AhvBeitrageApiClient) { }

  @Effect()
  getBgSilAHVBeitrag$ = this.actions$
    .ofType(actions.AhvBeitrageActionTypes.BgSilAHVBeitragTypes.LOAD)
    .pipe(
      map((action: actions.BgSilAHVBeitragDatas.LoadAction) => action.payload),
      switchMap(state => {
        return this.ahvBeitrageApiClient
          .getBgSilAHVBeitrag(state)
          .pipe(
            map(
              berater => {
                return new actions.BgSilAHVBeitragDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.BgSilAHVBeitragDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getPersonenUnterstuetzt$ = this.actions$
    .ofType(actions.AhvBeitrageActionTypes.PersonenUnterstuetztTypes.LOAD)
    .pipe(
      map((action: actions.PersonenUnterstuetztDatas.LoadAction) => action.payload),
      switchMap(state => {
        return this.ahvBeitrageApiClient
          .getPersonenUnterstuetzt(state)
          .pipe(
            map(
              berater => {
                return new actions.PersonenUnterstuetztDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.PersonenUnterstuetztDatas.LoadFailAction(error))
            ));
      })
    );
  @Effect()
  getSqlQueryShPositionTyp$ = this.actions$
    .ofType(actions.AhvBeitrageActionTypes.SqlQueryShPositionTypTypes.LOAD)
    .pipe(
      map((action: actions.SqlQueryShPositionTypDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.ahvBeitrageApiClient
          .getSqlQueryShPositionTyp(query)
          .pipe(
            map(
              berater => {
                return new actions.SqlQueryShPositionTypDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.SqlQueryShPositionTypDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getAHVBeitragPosition$ = this.actions$
    .ofType(actions.AhvBeitrageActionTypes.AhvBeitragePositionTypes.LOAD)
    .pipe(
      map((action: actions.AhvBeitragePositionDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.ahvBeitrageApiClient
          .getAHVBeitragPosition(query)
          .pipe(
            map(
              berater => {
                return new actions.AhvBeitragePositionDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.AhvBeitragePositionDatas.LoadFailAction(error))
            ));
      })
    );
  @Effect()
  getInstitutionSuchenWh$ = this.actions$
    .ofType(actions.AhvBeitrageActionTypes.InstitutionSuchenWhTypes.LOAD)
    .pipe(
      map((action: actions.InstitutionSuchenWhDatas.LoadAction) => action.payload),
      switchMap(state => {
        return this.ahvBeitrageApiClient
          .getInstitutionSuchenWh()
          .pipe(
            map(
              berater => {
                return new actions.InstitutionSuchenWhDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.InstitutionSuchenWhDatas.LoadFailAction(error))
            ));
      })
    );
  @Effect()
  deleteAhvBeitrage$ = this.actions$
    .ofType(actions.AhvBeitrageActionTypes.AhvBeitragePositionDeleteTypes.LOAD)
    .pipe(
      map((action: actions.AhvBeitragePositionDeleteDatas.LoadAction) => action.payload),
      switchMap((state ?: AHVBeitragPosition) => {
        return this.ahvBeitrageApiClient
          .deleteAhvBeitrage(state)
          .pipe(
            map(
              berater => {
                return new actions.AhvBeitragePositionDeleteDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.AhvBeitragePositionDeleteDatas.LoadFailAction(error))
            ));
      })
    );
    @Effect()
    updateAhvBeitrage$ = this.actions$
      .ofType(actions.AhvBeitrageActionTypes.AhvBeitragePositionUpdateTypes.LOAD)
      .pipe(
        map((action: actions.AhvBeitragePositionUpdateDatas.LoadAction) => action.payload),
        switchMap((ahvBeitrage?: AHVBeitragPosition) => {
          return this.ahvBeitrageApiClient
            .updateAhvBeitrage(ahvBeitrage)
            .map(
              data =>
                new actions.AhvBeitragePositionUpdateDatas.LoadSuccessAction(data)
            )
            .catch(error =>
              of(new actions.AhvBeitragePositionUpdateDatas.LoadFailAction(error))
            );
        })
      );
      @Effect()
      createAhvBeitrage$ = this.actions$
        .ofType(actions.AhvBeitrageActionTypes.AhvBeitragePositionCreateTypes.LOAD)
        .pipe(
          map((action: actions.AhvBeitragePositionUpdateDatas.LoadAction) => action.payload),
          switchMap((ahvBeitrage?: AHVBeitragPosition) => {
            return this.ahvBeitrageApiClient
              .addAhvBeitrage(ahvBeitrage)
              .map(
                data =>
                  new actions.AhvBeitragePositionCreateDatas.LoadSuccessAction(data)
              )
              .catch(error =>
                of(new actions.AhvBeitragePositionCreateDatas.LoadFailAction(error))
              );
          })
        );
      @Effect()
      getLookUps$ = this.actions$
        .ofType(actions.AhvBeitrageActionTypes.LookUpsTypes.LOAD)
        .pipe(
          map((action: actions.LookUpsDatas.LoadAction) => action.payload),
          switchMap(state => {
            return this.ahvBeitrageApiClient
              .getLookUps()
              .map(
                data =>
                  new actions.LookUpsDatas.LoadSuccessAction(data)
              )
              .catch(error =>
                of(new actions.LookUpsDatas.LoadFailAction(error))
              );
          })
        );
      @Effect()
      getGetAHVBeitragPositions$ = this.actions$
      .ofType(actions.AhvBeitrageActionTypes.DropDownAnpassungTypes.LOAD)
      .pipe(
        map((action: actions.DropDownAnpassungDatas.LoadAction) => action.payload),
        switchMap(state => {
          const query = tryMapPathApi(state);
          return this.ahvBeitrageApiClient
            .getDropDownAnpassung(query)
            .pipe(
              map(
                berater => {
                  return new actions.DropDownAnpassungDatas.LoadSuccessAction(
                    berater
                  );
                }
              ),
              catchError(error =>
                of(new actions.DropDownAnpassungDatas.LoadFailAction(error))
              ));
        })
      );
}
