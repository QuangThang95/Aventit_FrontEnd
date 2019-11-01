import { Injectable } from '@angular/core';
// rxjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/asvexport.action';
import { AsvexportApiClient } from '../../asvexport.ApiClient.service';

// models entity
import {
  ASVDetenerfassung, ZuExportierendeEintrage, ZuExportierendeEintrageQuery, ModelQueryInsertASVSExport,
  ModelQueryUpdateASVSExport, ModelQueryUpdateTransaction
} from '../../models';
import { AsvexportAction } from '../actions/asvexport.action';
import { tryMapPathApi } from '@shared/utilites';
@Injectable()
export class AsvexportesEffects {
  constructor(
    private actions$: Actions,
    private AsvexportApi: AsvexportApiClient) { }
  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.AsvexportTypes.LOAD)
    .pipe(
      map((action: actions.AsvexportInitData.LoadAction) => action.payload),
      switchMap(state => {
        return this.AsvexportApi
          .getAsvexports().pipe(
            map(
              initdata =>
                new actions.AsvexportInitData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.AsvexportInitData.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getAVSEintragData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.AsvexEintragTypes.LOAD)
    .pipe(
      map((action: actions.AsvEintragData.LoadAction) => action.payload),
      switchMap((state: ZuExportierendeEintrageQuery) => {
        const query = tryMapPathApi(state);
        return this.AsvexportApi
          .getAsvEintrage(query).pipe(
            map(
              initdata =>
                new actions.AsvEintragData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.AsvEintragData.LoadFailAction(error))
            ));
      })
    );

  /**
* *****************************************************************
* Get File Binary Effect
* Author:DNDUC
* *****************************************************************
*/
  @Effect()
  getGetFileBinaryData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.FileBinaryActionTypes.LOAD)
    .pipe(
      map((action: actions.FileBinaryData.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.AsvexportApi
          .getFileBinaryByDocumnetID(state).pipe(
            map(
              initdata =>
                new actions.FileBinaryData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.FileBinaryData.LoadFailAction(error))
            ));
      })
    );

  /**
* *****************************************************************
* Get XOrgUnit Data Effect
* Author:DNDUC
* *****************************************************************
*/
  @Effect()
  getXOrgUnitData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.GetXOrgUnitAllTypes.LOAD)
    .pipe(
      map((action: actions.XOrgUnitData.LoadAction) => action.payload),
      switchMap(state => {
        return this.AsvexportApi
          .getXOrgUnits().pipe(
            map(
              initdata =>
                new actions.XOrgUnitData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.XOrgUnitData.LoadFailAction(error))
            ));
      })
    );

  /**
* *****************************************************************
* Insert One Row In Grid SstASVSExport Effect
* Author:DNDUC
* *****************************************************************
*/
  @Effect()
  insertSstASVSExportData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.SstASVSExportInsertTypes.ADD_NEW)
    .pipe(
      map((action: actions.SstASVSExportInsertData.AddNewAction) => action.payload),
      switchMap((state: ModelQueryInsertASVSExport) => {
        return this.AsvexportApi
          .insertSstASVSExport(state).pipe(
            map(
              initdata =>
                new actions.SstASVSExportInsertData.AddNewSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.SstASVSExportInsertData.AddNewFailAction(error))
            ));
      })
    );

  /**
* *****************************************************************
* Update ASVSExport Data  effect
* Author: DNDUC
* *****************************************************************
*/
  @Effect()
  updateASVSExportData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.UpdateASVSExportTypes.UPDATE_ASVSExport)
    .pipe(
      map((action: actions.UpdateASVSExportData.UpdateAction) => action.payload),
      switchMap((modelUpdateASVSExport?: ModelQueryUpdateASVSExport) => {
        return this.AsvexportApi
          .updateASVSExport(modelUpdateASVSExport)
          .map(
            initdata =>
              new actions.UpdateASVSExportData.UpdateSuccessAction(
                initdata
              )
          )
          .catch(error =>
            of(new actions.UpdateASVSExportData.UpdateFailAction(error))
          );
      })
    );

  /**
* *****************************************************************
* Update ASVSExport Transaction Data  effect
* Author: DNDUC
* *****************************************************************
*/
  @Effect()
  updateASVSExportTransactionData$ = this.actions$
    .ofType(actions.AsvexportActionTypes.UpdateSstASVSExportTransactionTypes.UPDATE_ASVSExport_Transaction)
    .pipe(
      map((action: actions.UpdateASVSExportTransactionData.UpdateTransactionAction) => action.payload),
      switchMap((modelUpdateASVSExportTransaction?: ModelQueryUpdateTransaction) => {
        return this.AsvexportApi
          .updateASVSExportTransaction(modelUpdateASVSExportTransaction)
          .map(
            initdata =>
              new actions.UpdateASVSExportTransactionData.UpdateTransactionSuccessAction(
                initdata
              )
          )
          .catch(error =>
            of(new actions.UpdateASVSExportTransactionData.UpdateTransactionFailAction(error))
          );
      })
    );
}
