import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap, concatMap} from 'rxjs/operators';
import * as actions from '../actions/personen-im-haushalt.actions';
import {tryMapPathApi} from '@shared/utilites';
import {PersonenImHaushaltApiClient} from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushaltApiClient.service';

@Injectable()
export class PersonenImHaushaltEffects {

  constructor(
    private actions$: Actions,
    private personenImHaushaltApiClient: PersonenImHaushaltApiClient
  ) { }

  /**
  * Subcriber personen data
  */
  @Effect()
  getPersonen$ = this.actions$
    .ofType(actions.personenImHaushaltActionTypes.personenImHaushaltTypes.LOAD)
    .pipe(
      map((action: actions.PersonenAction.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.personenImHaushaltApiClient
          .getHeader(query)
          .pipe(
            map(personenImHaushalts => {
              if (!personenImHaushalts.baPersonID) {
                personenImHaushalts.baPersonID = state.baPersonID;
              }
              return new actions.PersonenAction.LoadSuccessAction(personenImHaushalts);
            }
            ),
            catchError(error =>
              of(new actions.PersonenAction.LoadFailAction(error))
            ));
      }));

  /**
   * Subcriber WhKennzahlen data
   */
  @Effect()
  getWhKennzahlen$ = this.actions$
    .ofType(actions.personenImHaushaltActionTypes.personenImHaushaltTypes.LOAD)
    .pipe(
      map((action: actions.WhKennzahlenAction.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi({ bgFinanzplanID: state.bgFinanzplanID });
        return this.personenImHaushaltApiClient
          .getWhKennzahlen(query).pipe(
            map(res => new actions.WhKennzahlenAction.LoadSuccessAction(res)),
            catchError(error =>
              of(new actions.WhKennzahlenAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber KlientenSystem data
   */
  @Effect()
  getKlientenSystem$ = this.actions$
    .ofType(actions.personenImHaushaltActionTypes.personenImHaushaltTypes.LOAD)
    .pipe(
      map((action: actions.KlientenSystemAction.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.personenImHaushaltApiClient
          .getKlientenSystem(query).pipe(
            map(res =>
              new actions.KlientenSystemAction.LoadSuccessAction(res)
            ),
            catchError(error =>
              of(new actions.KlientenSystemAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Haushalt data
   */
  @Effect()
  getHaushalt$ = this.actions$
    .ofType(actions.personenImHaushaltActionTypes.personenImHaushaltTypes.LOAD)
    .pipe(
      map((action: actions.HaushaltAction.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi({ BgFinanzplanID: state.bgFinanzplanID });
        return this.personenImHaushaltApiClient
          .getHaushalt(query).pipe(
            map(res =>
              new actions.HaushaltAction.LoadSuccessAction(res)
            ),
            catchError(error =>
              of(new actions.HaushaltAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  updatePersonenImHaushalt$ =
    this.actions$.ofType(actions.personenImHaushaltActionTypes.putPersonenImHaushaltTypes.PUT).pipe(
      map((action: actions.PutPersonenImHaushaltAction.PutAction) => action.payload),
      concatMap((body: any) => {
        return this.personenImHaushaltApiClient
          .putPersonenImHaushalt(body).pipe(
            map((data) =>
              new actions.PutPersonenImHaushaltAction.PutSuccessAction(data)
            ),
            catchError(error =>
              of(new actions.PutPersonenImHaushaltAction.PutFailAction(error))
            ));
      })
    );
}
