import { Injectable } from '@angular/core';
// rsjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
// actions & services
import * as actions from '../actions/app.actions';
import { AppApiClient } from '@app/appApiClient.service';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private appApiClient: AppApiClient) { }

  /**
   * Get Roles effect
   */
  @Effect()
  getRoles$ =
    this.actions$.ofType(actions.AppActionTypes.LOAD_API_ROLES).pipe(
      map((action: actions.LoadApiRolesAction) => action.payload),
      switchMap(() => {
        return this.appApiClient
          .getRoles()
          .pipe(
            map((roles) => new actions.SetAvailableRolesAction(roles)),
            catchError(error => of(new actions.LoadApiRolesFailAction(error)))
          );
      })
    );
}
