import { Injectable } from '@angular/core';
import { InkassofallApiClient } from '@app/kiss4-inkasso/inkassofall/inkassofall.ApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/inkassofall.action';

// rxjs
//
// models entity
@Injectable()
export class InkassofallEffects {

    constructor(private actions$: Actions,
        private inkassofallApiClient: InkassofallApiClient) {
    }

    @Effect()
    getInkassofallList$ = this.actions$
        .ofType(actions.InkassofallActionTypes.InkassofallListTypes.LOAD)
        .pipe(
            map((action: actions.InkassofallList.LoadAction) => action.payload),
            switchMap((state: any) => {
                const query = tryMapPathApi(state);
                return this.inkassofallApiClient.getListInkassofall(query)
                    .pipe(
                        map(
                            inkassofall =>
                                new actions.InkassofallList.LoadSuccessAction(inkassofall)
                        ),
                        catchError(error =>
                            of(new actions.InkassofallList.LoadFailAction(error))
                        ));
            }));
    @Effect()
    addData$ = this.actions$
        .ofType(actions.InkassofallActionTypes.InkassofallAddTypes.ADD)
        .pipe(
            map((action: actions.InkassofallAddData.AddNewAction) => action.payload),
            concatMap((state: any) => {
                return this.inkassofallApiClient
                    .addInkassofall(state)
                    .pipe(
                        map(data => new actions.InkassofallAddData.AddSuccessAction(data)),
                        catchError(error =>
                            of(new actions.InkassofallAddData.AddFailAction(error))
                        )
                    );
            })
        )
        ;
    @Effect()
    getInkassofallUpdate$ = this.actions$
        .ofType(actions.InkassofallActionTypes.InkassofallUpdateTypes.UPDATE_INKASSOFALL)
        .pipe(
            map((action: actions.InkassofallUpdate.UpdateAction) => action.payload),
            concatMap((state: any) => {
                return this.inkassofallApiClient.updateInkassofall(state.BFSFrageID, state)
                    .pipe(
                        map(
                            inkassofall =>
                                new actions.InkassofallUpdate.UpdateSuccessAction(inkassofall)
                        ),
                        catchError(error =>
                            of(new actions.InkassofallUpdate.UpdateFailAction(error))
                        ));
            }));
    @Effect()
    deleteData$ = this.actions$
        .ofType(actions.InkassofallActionTypes.InkassofallDeleteTypes.DELETE)
        .pipe(
            map((action: actions.InkassofallDeleteData.DeleteAction) => action.payload),
            concatMap((BFSFrageID?: any) => {
                return this.inkassofallApiClient.deleteInkassofall(BFSFrageID)
                    .pipe(
                        map(initdata => new actions.InkassofallDeleteData.DeleteSuccessAction(initdata)),
                        catchError(error => of(new actions.InkassofallDeleteData.DeleteFailAction(error)))
                    );
            })
        );
}

