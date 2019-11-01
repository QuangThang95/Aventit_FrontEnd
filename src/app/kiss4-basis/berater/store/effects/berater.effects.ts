import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, concatMap } from 'rxjs/operators';
import * as actions from '@app/kiss4-basis/berater/store/actions/berater.actions';
import { BeraterApiClient } from '@app/kiss4-basis/berater/beraterApiClient.service';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { GetKontakt, GetInstitution, PostKontakt } from '@app/kiss4-basis/berater/models';

@Injectable()
export class BeraterEffects {
  constructor(private actions$: Actions, private beraterApiClient: BeraterApiClient) {
  }

  @Effect()
  getBerater$ = this.actions$
    .ofType(actions.BeraterActionTypes.BeraterDatasTypes.LOAD)
    .pipe(
      map((action: actions.BeraterDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.beraterApiClient
          .getBerater(state)
          .pipe(
            map(
              berater => {
                return new actions.BeraterDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.BeraterDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getKontakt$ = this.actions$
    .ofType(actions.BeraterActionTypes.BeraterLoadKontaktTypes.LOAD)
    .pipe(
      map((action: actions.BeraterLoadKontaktAction.LoadAction) => action.payload),
      switchMap((state: GetKontakt) => {
        const query = tryMapPathApi(state);
        return this.beraterApiClient
          .getKontakt(query)
          .pipe(
            map(berater => new actions.BeraterLoadKontaktAction.LoadSuccessAction(berater)),
            catchError(error => of(new actions.BeraterLoadKontaktAction.LoadFailAction(error))));
      }));

  @Effect()
  getInstitution$ = this.actions$
    .ofType(actions.BeraterActionTypes.BeraterLoadInstitutionTypes.LOAD)
    .pipe(
      map((action: actions.BeraterLoadInstitutionAction.LoadAction) => action.payload),
      switchMap((state: GetInstitution) => {
        const query = tryMapPathApi(state);
        return this.beraterApiClient
          .getInstitution(query)
          .pipe(
            map(berater => new actions.BeraterLoadInstitutionAction.LoadSuccessAction(berater)),
            catchError(error => of(new actions.BeraterLoadInstitutionAction.LoadFailAction(error))));
      }));

  @Effect()
  getLanguage$ = this.actions$
    .ofType(actions.BeraterActionTypes.BeraterLoadLanguageTypes.LOAD)
    .pipe(
      map((action: actions.BeraterLoadLanguageAction.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.beraterApiClient
          .getLanguage()
          .pipe(
            map(berater => new actions.BeraterLoadLanguageAction.LoadSuccessAction(berater)),
            catchError(error => of(new actions.BeraterLoadLanguageAction.LoadFailAction(error))));
      }));

  @Effect()
  saveBaInstitutionKontakt$ = this.actions$
    .ofType(actions.BeraterActionTypes.BeraterPostBaInstitutionKontaktTypes.POST)
    .pipe(
      map((action: actions.BeraterPostBaInstitutionKontaktAction.PostAction) => action.payload),
      concatMap((state: PostKontakt) => {
        return this.beraterApiClient
          .saveBaInstitutionKontakt(state)
          .pipe(
            map(berater => new actions.BeraterPostBaInstitutionKontaktAction.PostSuccessAction(berater)),
            catchError(error => of(new actions.BeraterPostBaInstitutionKontaktAction.PostFailAction(error))));
      }));

  @Effect()
  deleteBaInstitutionKontakt$ = this.actions$
    .ofType(actions.BeraterActionTypes.BeraterDelBaInstitutionKontaktTypes.DEL)
    .pipe(
      map((action: actions.BeraterDelBaInstitutionKontaktAction.DelAction) => action.payload),
      concatMap((state: any) => {
        return this.beraterApiClient
          .deleteBaInstitutionKontakt(state)
          .pipe(
            map(berater => new actions.BeraterDelBaInstitutionKontaktAction.DelSuccessAction(berater)),
            catchError(error => of(new actions.BeraterDelBaInstitutionKontaktAction.DelFailAction(error))));
      }));
}
