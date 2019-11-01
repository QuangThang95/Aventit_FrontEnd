import { Injectable } from '@angular/core';
// rxjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/settings.actions';
@Injectable()
export class SettingsEffects {

  constructor(private actions$: Actions) { }

  /**
   * Subcription change language effect
   */
  @Effect()
  changeLanguage$ = this.actions$
    .ofType(actions.SettingsActionTypes.SET_CULTURE)
    .pipe(
      map((action: actions.SetCultureAction) => action.payload),
      switchMap((state) => {
        return of(true).pipe(
          map(() => new actions.SetLanguageSuccessAction(true)));
      }));
}
