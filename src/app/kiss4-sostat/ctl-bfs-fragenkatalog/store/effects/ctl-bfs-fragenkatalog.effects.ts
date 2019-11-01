import {Injectable} from '@angular/core';
// rxjs
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
//
import * as actions from '../actions/ctl-bfs-fragenkatalog.actions';
// models entity
import {tryMapPathApi} from '@shared/utilites';
import {CtlBfsFragenkatalogApiClient} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.ApiClient.service';

@Injectable()
export class CtlBfsFragenkatalogEffects {

  constructor(private actions$: Actions,
              private ctlBfsFragenkatalogapiclient: CtlBfsFragenkatalogApiClient) {
  }

  @Effect()
  getCtlBfsFragenkatalog$ = this.actions$
    .ofType(actions.CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogTypes.LOAD)
    .pipe(
      map((action: actions.CtlBfsFragenkatalogInitDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.ctlBfsFragenkatalogapiclient.getCtlBfsFragenkatalog()
          .pipe(
            map(
              ctlBfsFragenkatalog =>
                new actions.CtlBfsFragenkatalogInitDatas.LoadSuccessAction(ctlBfsFragenkatalog)
            ),
            catchError(error =>
              of(new actions.CtlBfsFragenkatalogInitDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getCtlBfsFragenkatalogList$ = this.actions$
    .ofType(actions.CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogListTypes.LOAD)
    .pipe(
      map((action: actions.CtlBfsFragenkatalogList.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.ctlBfsFragenkatalogapiclient.getListCtlBfsFragenkatalog(query)
          .pipe(
            map(
              ctlBfsFragenkatalog =>
                new actions.CtlBfsFragenkatalogList.LoadSuccessAction(ctlBfsFragenkatalog)
            ),
            catchError(error =>
              of(new actions.CtlBfsFragenkatalogList.LoadFailAction(error))
            ));
      }));
  @Effect()
  addData$ = this.actions$
    .ofType(actions.CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogAddTypes.ADD)
    .map((action: actions.CtlBfsFragenkatalogAddData.AddNewAction) => action.payload)
    .switchMap((state: any) => {
      return this.ctlBfsFragenkatalogapiclient
        .addCtlBfsFragenkatalog(state)
        .map(
          data => new actions.CtlBfsFragenkatalogAddData.AddSuccessAction(data)
        ).catch(error =>
          of(new actions.CtlBfsFragenkatalogAddData.AddFailAction(error))
        );
    })
  ;
  @Effect()
  getCtlBfsFragenkatalogUpdate$ = this.actions$
    .ofType(actions.CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogUpdateTypes.UPDATE_CTLBFSFRAGENKATALOG)
    .pipe(
      map((action: actions.CtlBfsFragenkatalogUpdate.UpdateAction) => action.payload),
      switchMap((state: any) => {
        return this.ctlBfsFragenkatalogapiclient.updateCtlBfsFragenkatalog(state.BFSFrageID, state)
          .pipe(
            map(
              ctlBfsFragenkatalog =>
                new actions.CtlBfsFragenkatalogUpdate.UpdateSuccessAction(ctlBfsFragenkatalog)
            ),
            catchError(error =>
              of(new actions.CtlBfsFragenkatalogUpdate.UpdateFailAction(error))
            ));
      }));
  @Effect()
  deleteData$ = this.actions$
    .ofType(actions.CtlBfsFragenkatalogActionTypes.CtlBfsFragenkatalogDeleteTypes.DELETE)
    .pipe(
      map((action: actions.CtlBfsFragenkatalogDeleteData.DeleteAction) => action.payload),
      switchMap((BFSFrageID?: any) => {
        return this.ctlBfsFragenkatalogapiclient.deleteCtlBfsFragenkatalog(BFSFrageID)
          .pipe(
            map(initdata => new actions.CtlBfsFragenkatalogDeleteData.DeleteSuccessAction(initdata)),
            catchError(error => of(new actions.CtlBfsFragenkatalogDeleteData.DeleteFailAction(error)))
          );
      })
    );
}

