import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PopOverApiClient } from '@shared/components/popover/popoverApiClient.service';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/popover.action';

@Injectable()
export class PopOverEffects {

  constructor(
    private actions$: Actions,
    private popoverApiClient: PopOverApiClient) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.PopOverActionTypes.PopOverTypesTypes.LOAD)
    .pipe(
      map((action: actions.PopOverInitData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.popoverApiClient.getButtons(query).pipe(
          map(initdata => new actions.PopOverInitData.LoadSuccessAction(initdata)),
          catchError(error => of(new actions.PopOverInitData.LoadFailAction(error))));
      })
    );

}
