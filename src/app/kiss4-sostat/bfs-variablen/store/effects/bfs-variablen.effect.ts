import { Injectable } from '@angular/core';
import { VariablenApiClient } from '@app/kiss4-sostat/bfs-variablen/bfs-variablen.ApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/bfs-variablen.action';

@Injectable()
export class VariablenEffects {

  constructor(
    private actions$: Actions,
    private variablenApiClient: VariablenApiClient) { }
  // VariablenEffects
  @Effect()
  getVariablenInitData$ = this.actions$
    .ofType(actions.VariablenActionTypes.VariablenTypes.LOAD)
    .pipe(
      map((action: actions.VariablenInitData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.variablenApiClient.getVariablens(query).pipe(
          map(initdata => new actions.VariablenInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.VariablenInitData.LoadFailAction(error))));
      })
    );
  // PersonEffects
  @Effect()
  getPersonInitData$ = this.actions$
    .ofType(actions.VariablenActionTypes.PersonTypes.LOAD)
    .pipe(
      map((action: actions.PersonInitData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.variablenApiClient.getPersons(query).pipe(
          map(initdata => new actions.PersonInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.PersonInitData.LoadFailAction(error))));
      })
    );
  // MitarbeiterEffects
  @Effect()
  getMitarbeiterInitData$ = this.actions$
    .ofType(actions.VariablenActionTypes.MitarbeiterTypes.LOAD)
    .pipe(
      map((action: actions.MitarbeiterInitData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.variablenApiClient.getMitarbeiters(query).pipe(
          map(initdata => new actions.MitarbeiterInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.MitarbeiterInitData.LoadFailAction(error))));
      })
    );
  // search init data
  @Effect()
  getSearchInitData$ = this.actions$
    .ofType(actions.VariablenActionTypes.SearchInitialData.LOAD)
    .pipe(
      map((action: actions.SearchInitData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.variablenApiClient.getInitialDataSearch(query).pipe(
          map(initdata => new actions.SearchInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.SearchInitData.LoadFailAction(error))));
      })
    );

  @Effect()
  getVariablenFirstInitData$ = this.actions$
    .ofType(actions.VariablenActionTypes.SearchInitialData.LOAD_SUCCESS)
    .pipe(
      map((action: actions.VariablenInitData.LoadAction) => action.payload),
      switchMap(state => {
        const defaultYear = state.data001[0].code ? state.data001[0].code : 0;
        const param = {
          Erhebungsjahr: defaultYear,
          UserID: '',
          KlientID: '',
          BFSLeistungsartCode: 2,
          NurDossiertraeger: false,
          ExcelExport: true,
          OrgUnit: '',
          NurStichtag: true,
          NurAnfangszustand: true
        };
        const query = tryMapPathApi(param);
        return this.variablenApiClient.getVariablens(query).pipe(
          map(initdata => new actions.VariablenInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.VariablenInitData.LoadFailAction(error))));
      })
    );
}
