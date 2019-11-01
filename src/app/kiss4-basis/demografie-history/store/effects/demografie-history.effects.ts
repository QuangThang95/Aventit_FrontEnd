import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DemografieApiClient } from '../../demografie-historyApiClient.service';
import * as actions from '../actions/demografie-history.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';

@Injectable()
export class DemografieEffects {
    constructor(
        private action$: Actions,
        private demografieApiClient: DemografieApiClient
    ) { }

    @Effect()
    getXUserHistory$ = this.action$
        .ofType(actions.DemografieActionTypes.xUserHistoryTypes.LOAD)
        .pipe(
            map((action: actions.xUserHistoryInitData.LoadAction) => action.payload),
            switchMap((state: any) => {
                const query = tryMapPathApi(state);
                return this.demografieApiClient
                    .getXUserHistory(query)
                    .pipe(
                        map(xUserHistory => new actions.xUserHistoryInitData.LoadSuccessAction(xUserHistory)),
                        catchError(error => of(new actions.xUserHistoryInitData.LoadFailAction(error))));
            })
        );

    @Effect()
    getPersonalienData$ = this.action$
        .ofType(actions.DemografieActionTypes.PersonalienTypes.LOAD)
        .pipe(
            map((action: actions.PersonalienInitData.LoadAction) => action.payload),
            switchMap((state: any) => {
                return this.demografieApiClient
                    .getPersonalien(state.baPersonID, state.verID)
                    .pipe(
                        map(berater => new actions.PersonalienInitData.LoadSuccessAction(berater)),
                        catchError(error => of(new actions.PersonalienInitData.LoadFailAction(error))));
            }));

    @Effect()
    getWohnsitzData$ = this.action$
        .ofType(actions.DemografieActionTypes.WohnsitzTypes.LOAD)
        .pipe(
            map((action: actions.WohnsitzInitData.LoadAction) => action.payload),
            switchMap((state: any) => {
                return this.demografieApiClient
                    .getWohnsitz(state.baPersonID, state.verID)
                    .pipe(
                        map(wohnsitz => new actions.WohnsitzInitData.LoadSuccessAction(wohnsitz)),
                        catchError(error => of(new actions.WohnsitzInitData.LoadFailAction(error))));
            })
        );

    @Effect()
    getAufenthaltsortData$ = this.action$
        .ofType(actions.DemografieActionTypes.AufenthaltsortTypes.LOAD)
        .pipe(
            map((action: actions.AufenthaltsortInitData.LoadAction) => action.payload),
            switchMap((state: any) => {
                return this.demografieApiClient
                    .getAufenthaltsort(state.baPersonID, state.verID)
                    .pipe(
                        map(aufenthaltsort => new actions.AufenthaltsortInitData.LoadSuccessAction(aufenthaltsort)),
                        catchError(error => of(new actions.AufenthaltsortInitData.LoadFailAction(error))));
            })
        );
}
