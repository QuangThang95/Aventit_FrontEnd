import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { GrundBedarfApiClient } from '../../grund-bedarfApiClient.service';
import { LoadFormDataQueryModel, StatusCodeQuery, UpdateFormDataQueryModel } from '../../models';
import * as actions from '../actions/grund-bedarf.action';


// rxjs
// models entity
@Injectable()
export class GrundBedarfEffects {
  constructor(
    private actions$: Actions,
    private grundBedarfApiClient: GrundBedarfApiClient) { }
  // get data DPL select box
  @Effect()
  getDatasourceSelectboxData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD)
    .pipe(
      map((action: actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction) => action.payload),
      switchMap(state => {
        return this.grundBedarfApiClient
          .getSelectboxDatas().pipe(
            map(
              initdata =>
                new actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataFailAction(error))
            ));
      })
    );
  // Load Form data
  @Effect()
  loadGrundBedarfFormData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfFormDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundBedarfFormData.LoadGrundBedarfFormDataAction) => action.payload),
      switchMap((param?: LoadFormDataQueryModel) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .loadGrundBedarfFormData(query).pipe(
            map(
              initdata =>
                new actions.GrundBedarfFormData.LoadGrundBedarfFormDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfFormData.LoadGrundBedarfFormDataFailAction(error))
            ));
      })
    );

  // Update Form data
  @Effect()
  updateGrundBedarfFormData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA)
    .pipe(
      map((action: actions.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataAction) => action.payload),
      concatMap((model?: UpdateFormDataQueryModel) => {
        return this.grundBedarfApiClient
          .updateFormData(model).pipe(
            map(
              initdata =>
                new actions.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataFailAction(error))
            ));
      })
    );
  // Load Status code
  @Effect()
  getStatusCodeData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GetStatusCodeTypes.LOAD)
    .pipe(
      map((action: actions.LoadStatusCodeData.LoadStatusCodeDataAction) => action.payload),
      switchMap((param?: StatusCodeQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .getStatusCodeDatas(query).pipe(
            map(
              initdata =>
                new actions.LoadStatusCodeData.LoadStatusCodeDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LoadStatusCodeData.LoadStatusCodeDataFailAction(error))
            ));
      })
    );
}
