import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CtlBfsDokumenteApiClient } from '../../ctl-bfs-dokumente.ApiClient.service';
import * as actions from '../actions/ctl-bfs-dokumente.action';

@Injectable()
export class CtlBfsDokumentesEffects {
  constructor(
    private actions$: Actions,
    private CtlBfsDokumenteApi: CtlBfsDokumenteApiClient) { }
  @Effect()
  getLeitfadenData$ = this.actions$
    .ofType(actions.CtlBfsDokumenteActionTypes.CtlBfsDokumenteTypes.LOAD)
    .pipe(
      map((action: actions.LeitfadenData.LoadAction) => action.payload),
      switchMap(() => {
        return this.CtlBfsDokumenteApi
          .getHyperlink().pipe(
            map(
              initdata =>
                new actions.LeitfadenData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LeitfadenData.LoadFailAction(error))
            ));
      })
    );
}
