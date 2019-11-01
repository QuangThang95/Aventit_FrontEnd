import { Injectable } from '@angular/core';
import { ModelSearch } from '@app/kiss4-sostat/plausifehler/models';
import { PlausifehlerApiClient } from '@app/kiss4-sostat/plausifehler/plausifehlerApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/plausifehler.action';

@Injectable()
export class PlausifehlersEffects {

    constructor(
        private actions$: Actions,
        private plausifehlerApiClient: PlausifehlerApiClient) { }

    @Effect()
    getInitData$ = this.actions$
        .ofType(actions.PlausifehlerActionTypes.Types.LOAD)
        .pipe(
            map((action: actions.InitData.LoadAction) => action.payload),
            switchMap((state: ModelSearch) => {
                const query = tryMapPathApi(state);
                return this.plausifehlerApiClient
                    .getPlausifehlers(query).pipe(
                        map(
                            initdata =>
                                new actions.InitData.LoadSuccessAction(initdata)
                        ),
                        catchError(error =>
                            of(new actions.InitData.LoadFailAction(error))
                        ));
            })
        );
    @Effect()
    getSearchData$ = this.actions$
        .ofType(actions.PlausifehlerActionTypes.Search.SEARCH)
        .pipe(
            map((action: actions.InitSearch.SearchAction) => action.payload),
            switchMap(() => {
                return this.plausifehlerApiClient
                    .searchPlausifehlers().pipe(
                        map(
                            returndata =>
                                new actions.InitSearch.SearchSuccessAction(returndata)
                        ),
                        catchError(error =>
                            of(new actions.InitSearch.SearchFailAction(error))
                        ));
            })
        );

    @Effect()
    getPersonData$ = this.actions$
        .ofType(actions.PlausifehlerActionTypes.Person.LOAD)
        .pipe(
            map((action: actions.InitPerson.PersonInitAction) => action.payload),
            switchMap(() => {
                return this.plausifehlerApiClient
                    .getPerson().pipe(
                        map(
                            returndata =>
                                new actions.InitPerson.PersonInitSuccessAction(returndata)
                        ),
                        catchError(error =>
                            of(new actions.InitPerson.PersonInitFailAction(error))
                        ));
            })
        );

    @Effect()
    getMitarbeiterInData$ = this.actions$
        .ofType(actions.PlausifehlerActionTypes.MitarbeiterIn.LOAD)
        .pipe(
            map((action: actions.InitMitarbeiterIn.MitarbeiterInInitAction) => action.payload),
            switchMap(() => {
                return this.plausifehlerApiClient
                    .getMitarberter().pipe(
                        map(
                            returndata =>
                                new actions.InitMitarbeiterIn.MitarbeiterInInitSuccessAction(returndata)
                        ),
                        catchError(error =>
                            of(new actions.InitMitarbeiterIn.MitarbeiterInInitFailAction(error))
                        ));
            })
        );

}
