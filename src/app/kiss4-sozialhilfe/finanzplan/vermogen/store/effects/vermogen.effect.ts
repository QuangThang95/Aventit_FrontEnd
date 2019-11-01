import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { VermogenApiClient } from '../../vermogenApiClient.service';
import * as actions from '../actions/vermogen.action';



// rxjs
// models entity
@Injectable()
export class VermogenEffects {

  constructor(
    private actions$: Actions,
    private vermogenApiClient: VermogenApiClient) { }

  // get data DPL select box
  @Effect()
  getDatasourceSelectboxData$ = this.actions$
    .ofType(actions.VermogenActionTypes.PersonSelectboxDataTypes.LOAD)
    .pipe(
      map((action: actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction) => action.payload),
      switchMap(state => {
        return this.vermogenApiClient
          .getSelectboxDatas().pipe(
            map(
              initdata =>
                new actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataFailAction(error))
            ));
      })
    );

}
