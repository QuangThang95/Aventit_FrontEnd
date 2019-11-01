import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TextmarkenApiClient } from '../../basis-textmarkenApiClient.service';
import { Basistextmarken } from '../../models';
import * as actions from '../actions/basis-textmarken.actions';

@Injectable()
export class TextmarkenEffects {
  constructor(private actions$: Actions, private textmarkenApiClient: TextmarkenApiClient) {
  }

  @Effect()
  getData$ = this.actions$
    .ofType(actions.TextMarkenActionTypes.TextMarkenDatasTypes.LOAD)
    .pipe(
      map((action: actions.TextMarkenDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.textmarkenApiClient
          .getXBookMark(state)
          .pipe(
            map(
              textMarken => {
                return new actions.TextMarkenDatas.LoadSuccessAction(textMarken);
              }
            ),
            catchError(
              error => of(new actions.TextMarkenDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getTableData$ = this.actions$
    .ofType(actions.TextMarkenActionTypes.GetTableDatasTypes.LOAD)
    .pipe(
      map((action: actions.GetTableDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.textmarkenApiClient
          .getTableBookMark()
          .pipe(
            map(
              getTable => {
                return new actions.GetTableDatas.LoadSuccessAction(getTable);
              }
            ),
            catchError(
              error => of(new actions.GetTableDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getTypData$ = this.actions$
    .ofType(actions.TextMarkenActionTypes.GetTypDatasTypes.LOAD)
    .pipe(
      map((action: actions.GetTypDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.textmarkenApiClient
          .getTypBookMark()
          .pipe(
            map(
              getTable => {
                return new actions.GetTypDatas.LoadSuccessAction(getTable);
              }
            ),
            catchError(
              error => of(new actions.GetTypDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getModulData$ = this.actions$
    .ofType(actions.TextMarkenActionTypes.GetModulDatasTypes.LOAD)
    .pipe(
      map((action: actions.GetModulDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.textmarkenApiClient
          .getModulBookMark(query)
          .pipe(
            map(
              getTable => {
                return new actions.GetModulDatas.LoadSuccessAction(getTable);
              }
            ),
            catchError(
              error => of(new actions.GetModulDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  saveBaInstitutionKontakt$ = this.actions$
    .ofType(actions.TextMarkenActionTypes.BasisTextmarkenPostBaInstitutionTypes.POST)
    .pipe(
      map((action: actions.BasisTextmarkenPostBaInstitutionAction.PostAction) => action.payload),
      switchMap((state: Basistextmarken) => {
        return this.textmarkenApiClient
          .saveBaInstitutionKontakt(state)
          .pipe(
            map(berater => new actions.BasisTextmarkenPostBaInstitutionAction.PostSuccessAction(berater)),
            catchError(error => of(new actions.BasisTextmarkenPostBaInstitutionAction.PostFailAction(error))));
      }));

  @Effect()
  deleteBaInstitutionKontakt$ = this.actions$
    .ofType(actions.TextMarkenActionTypes.BasisTextmarkenDelBaInstitutionTypes.DEL)
    .pipe(
      map((action: actions.BasisTextmarkenDelBaInstitutionAction.DelAction) => action.payload),
      switchMap((state: any) => {
        return this.textmarkenApiClient
          .deleteBaInstitutionBasistextmarken(state)
          .pipe(
            map(berater => new actions.BasisTextmarkenDelBaInstitutionAction.DelSuccessAction(berater)),
            catchError(error => of(new actions.BasisTextmarkenDelBaInstitutionAction.DelFailAction(error))));
      }));
}
