import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/arbeit.action';
import { ArbeitApiClient } from '@app/kiss4-basis/arbeit/arbeitApiClient.service';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
@Injectable()
export class ArbeitEffects {
  constructor(
    private actions$: Actions,
    private arbeitApiClient: ArbeitApiClient) { }
  @Effect()
  getArBeitInitData$ = this.actions$
    .ofType(actions.ArbeitActionTypes.ArbeitTypes.LOAD)
    .pipe(
      map((action: actions.ArbeitDataAction.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.arbeitApiClient
          .getArbeit(query).pipe(
            map(
              initdata =>
                new actions.ArbeitDataAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.ArbeitDataAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getLOVNameData$ = this.actions$
    .ofType(actions.ArbeitActionTypes.LOVNameTypes.LOAD)
    .pipe(
      map((action: actions.LOVNameArbeitDataAction.LoadAction) => action.payload),
      switchMap(state => {
        return this.arbeitApiClient
          .getLookups(state).pipe(
            map(
              initdata =>
                new actions.LOVNameArbeitDataAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LOVNameArbeitDataAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getBerufData$ = this.actions$
    .ofType(actions.ArbeitActionTypes.BerufSuchenTypes.LOAD)
    .pipe(
      map((action: actions.BerufSuchenArbeitDataAction.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.arbeitApiClient
          .getBerufSuchen(query).pipe(
            map(
              initdata =>
                new actions.BerufSuchenArbeitDataAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.BerufSuchenArbeitDataAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getInstitutionSuchenArbeit$ = this.actions$
    .ofType(actions.ArbeitActionTypes.IntitutionSuchenTypes.LOAD)
    .pipe(
      map((action: actions.InstitutionSuchenArbeitDataAction.LoadAction) => action.payload),
      switchMap(() => {
        return this.arbeitApiClient
          .getInstitutionSuchenArbeit().pipe(
            map(
              initdata => {
                return new actions.InstitutionSuchenArbeitDataAction.LoadSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.InstitutionSuchenArbeitDataAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  saveArbeit$ = this.actions$
    .ofType(actions.ArbeitActionTypes.SaveArbeitSuchenTypes.LOAD)
    .pipe(
      map((action: actions.SaveArbeitSuchenAction.LoadAction) => action.payload),
      switchMap(state => {
        return this.arbeitApiClient
          .saveArbeit(state).pipe(
            map(
              initdata =>
                new actions.SaveArbeitSuchenAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.SaveArbeitSuchenAction.LoadFailAction(JSON.parse(error._body)))
            ));
      })
    );
}
