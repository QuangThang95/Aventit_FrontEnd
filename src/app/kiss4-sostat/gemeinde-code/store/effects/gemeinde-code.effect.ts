import { Injectable } from '@angular/core';
import { GemeindeCodeApiClient } from '@app/kiss4-sostat/gemeinde-code/gemeinde-code.ApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/gemeinde-code.action';

@Injectable()
export class GemeindeCodeEffects {

  constructor(
    private actions$: Actions,
    private gemeindeCodeApiClient: GemeindeCodeApiClient) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.GemeindeCodeActionTypes.GemeindeCodeTypes.LOAD)
    .pipe(
      map((action: actions.GemeindeCodeInitData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.gemeindeCodeApiClient.getGemeindeCodes(query).pipe(
          map(initdata => new actions.GemeindeCodeInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.GemeindeCodeInitData.LoadFailAction(error))));
      })
    );

}
