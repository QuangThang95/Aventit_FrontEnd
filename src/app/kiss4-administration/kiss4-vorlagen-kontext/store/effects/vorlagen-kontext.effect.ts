import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { InsertXDocContext, IXDocInsert, UpdateXDocContext, UpdateXDocContextTemplate } from '../../models';
import * as actions from '../actions/vorlagen-kontext.action';
import { VorlagenKontextApiClient } from './../../vorlagen-kontextApiClient.service';

@Injectable()
export class VorlagenKontextEffects {
  constructor(
    private actions$: Actions,
    private vorlagenKontextApiClient: VorlagenKontextApiClient
  ) { }

  @Effect()
  getXDocContextAll$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextLoadAllXDocTypes.LOAD).pipe(
      map((action: actions.VorlagenKontextLoadAllXDocAction.LoadAction) => action.payload),
      switchMap(() => {
        return this.vorlagenKontextApiClient.getXDocContextAll().pipe(
          map((data) => new actions.VorlagenKontextLoadAllXDocAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextLoadAllXDocAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getZugeteiltByDocContextID$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextLoadZugeteiltByDocContextIDTypes.LOAD).pipe(
      map((action: actions.VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadAction) => action.payload),
      switchMap((docContextID: number) => {
        return this.vorlagenKontextApiClient.getZugeteiltByDocContextID(docContextID).pipe(
          map((data) => new actions.VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextLoadZugeteiltByDocContextIDAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getVerfuegbarByDocContextID$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextLoadVerfuegbarByDocContextIDTypes.LOAD).pipe(
      map((action: actions.VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadAction) => action.payload),
      switchMap((docContextID: number) => {
        return this.vorlagenKontextApiClient.getVerfuegbarByDocContextID(docContextID).pipe(
          map((data) => new actions.VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextLoadVerfuegbarByDocContextIDAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  insertXDocContext$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextPostXDocContextTypes.POST).pipe(
      map((action: actions.VorlagenKontextPostXDocContextAction.PostAction) => action.payload),
      switchMap((insertXDocContext: InsertXDocContext) => {
        return this.vorlagenKontextApiClient.insertXDocContext(insertXDocContext).pipe(
          map((data) => new actions.VorlagenKontextPostXDocContextAction.PostSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextPostXDocContextAction.PostFailAction(error)))
        );
      })
    );

  @Effect()
  updateXDocContext$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextPutXDocContextTypes.PUT).pipe(
      map((action: actions.VorlagenKontextPutXDocContextAction.PutAction) => action.payload),
      switchMap((updateXDocContext: UpdateXDocContext) => {
        return this.vorlagenKontextApiClient.updateXDocContext(updateXDocContext).pipe(
          map((data) => new actions.VorlagenKontextPutXDocContextAction.PutSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextPutXDocContextAction.PutFailAction(error)))
        );
      })
    );

  @Effect()
  deleteXDocContext$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextDelXDocContextTypes.DEL).pipe(
      map((action: actions.VorlagenKontextDelXDocContextAction.DelAction) => action.payload),
      switchMap((vorlagen: any) => {
        return this.vorlagenKontextApiClient.deleteXDocContext(vorlagen).pipe(
          map((data) => new actions.VorlagenKontextDelXDocContextAction.DelSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextDelXDocContextAction.DelFailAction(error)))
        );
      })
    );

  @Effect()
  countXDocContext_TemplateByDocContextID$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextCountXDocContext_TemplateByDocContextIDTypes.COUNT).pipe(
      map((action: actions.VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountAction) => action.payload),
      switchMap((vorlagen: any) => {
        const query = tryMapPathApi(vorlagen);
        return this.vorlagenKontextApiClient.countXDocContext_TemplateByDocContextID(query).pipe(
          map((data) => new actions.VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextCountXDocContext_TemplateByDocContextIDAction.CountFailAction(error)))
        );
      })
    );

  @Effect()
  insertXDocContext_Template$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextPostXDocContext_TemplateTypes.POST).pipe(
      map((action: actions.VorlagenKontextPostXDocContext_TemplateAction.PostAction) => action.payload),
      switchMap((insertXDocContextTemplate: IXDocInsert) => {
        return this.vorlagenKontextApiClient.insertXDocContext_Template(insertXDocContextTemplate).pipe(
          map((data) => new actions.VorlagenKontextPostXDocContext_TemplateAction.PostSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextPostXDocContext_TemplateAction.PostFailAction(error)))
        );
      })
    );


  @Effect()
  updateXDocContext_Template$ =
    this.actions$.ofType(actions.VorlagenKontextActionTypes.VorlagenKontextPutXDocContext_TemplateTypes.PUT).pipe(
      map((action: actions.VorlagenKontextPutXDocContext_TemplateAction.PutAction) => action.payload),
      switchMap((payload: UpdateXDocContextTemplate[]) => {
        return this.vorlagenKontextApiClient.updateXDocContext_Template(payload).pipe(
          map((data) => new actions.VorlagenKontextPutXDocContext_TemplateAction.PutSuccessAction(data)),
          catchError(error => of(new actions.VorlagenKontextPutXDocContext_TemplateAction.PutFailAction(error)))
        );
      })
    );
}
