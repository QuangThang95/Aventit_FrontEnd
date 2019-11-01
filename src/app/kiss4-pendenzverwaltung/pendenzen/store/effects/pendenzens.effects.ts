import { Injectable } from '@angular/core';
// rxjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
//
import * as actions from '../actions/pendenzens.actions';
import { PendenzenApiClient } from '@app/kiss4-pendenzverwaltung/pendenzen/pendenzenApiClient.service';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
// models entity
import {
  PendenzenVerwaltung,
  PendenzenVerwaltungQuery,
  LovCodeQuery,
  ErfassungMutationQuery
} from '../../models';

@Injectable()
export class PendenzensEffects {

  constructor(
    private actions$: Actions,
    private pendenzenApiClient: PendenzenApiClient) { }

  /**
   * Subcriber Pendenzen InitData
   */
  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenInitDatasTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenInitDatas.LoadAction) => action.payload),
      switchMap((faFallId?: number) => {
        return this.pendenzenApiClient
          .getInitDatas(faFallId).pipe(
            map(
              initdata =>
                new actions.PendenzenInitDatas.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.PendenzenInitDatas.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen BetreffBeschreibung
   */
  @Effect()
  getBetreffBeschreibung$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenBetreffBeschreibungsTypes.LOAD)
    .pipe(
      map(
        (action: actions.PendenzenBetreffBeschreibungs.LoadAction) => action.payload
      ),
      switchMap((taskTypeCode: number) => {
        return this.pendenzenApiClient
          .getBetreffBeschreibungs(taskTypeCode)
          .pipe(
            map(betriffperson => new actions.PendenzenBetreffBeschreibungs.LoadSuccessAction(betriffperson)
            ),
            catchError(error =>
              of(new actions.PendenzenBetreffBeschreibungs.LoadFailAction())
            ));
      })
    );

  /**
   * Subcriber Pendenzen BetriffPerson
   */
  @Effect()
  getBetriffPerson$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenBetriffPersonsTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenBetriffPersonsAction.LoadAction) => action.payload),
      switchMap((faFallId: number) => {
        return this.pendenzenApiClient
          .getBetriffPersons(faFallId)
          .pipe(
            map(
              betriffperson =>
                new actions.PendenzenBetriffPersonsAction.LoadSuccessAction(betriffperson)
            ),
            catchError(error =>
              of(new actions.PendenzenBetriffPersonsAction.LoadFailAction())
            ));
      })
    );

  /**
   * Subcriber Pendenzen EffassungMutation
   */
  @Effect()
  getErfassungMutation$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungErfassungMutationTypes.LOAD)
    .pipe(
      map(
        (action: actions.PendenzenVerwaltungErfassungMutationAction.LoadAction) => action.payload
      ),
      switchMap((state: ErfassungMutationQuery) => {
        const query = tryMapPathApi(state);
        return this.pendenzenApiClient
          .getErfassungMutations(query)
          .pipe(
            map(
              status =>
                new actions.PendenzenVerwaltungErfassungMutationAction.LoadSuccessAction(status)
            ),
            catchError(error =>
              of(
                new actions.PendenzenVerwaltungErfassungMutationAction.LoadFailAction(error)
              )
            ));
      })
    );

  /**
   * Subcriber Pendenzen ErstellerEmpfaenger
   */
  @Effect()
  getErstellerEmpfaenger$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenErstellerEmpfaengerTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenErstellerEmpfaengerAction.LoadAction) => action.payload),
      switchMap((keyword: string) => {
        return this.pendenzenApiClient
          .getErstellerEmpfaengers(keyword)
          .pipe(
            map(erstellerEmpfaenger => new actions.PendenzenErstellerEmpfaengerAction.LoadSuccessAction(erstellerEmpfaenger)),
            catchError(error =>
              of(new actions.PendenzenErstellerEmpfaengerAction.LoadFailAction(error))
            ));
      })
    );
  /**
   * Subcriber Pendenzen Falltraeger
   */
  @Effect()
  getFalltraeger$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungFalltraegersTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenVerwaltungFalltraegersAction.LoadAction) => action.payload),
      switchMap((keyword: string) => {
        return this.pendenzenApiClient
          .getFalltraegers(keyword)
          .pipe(
            map(
              falltraeger =>
                new actions.PendenzenVerwaltungFalltraegersAction.LoadSuccessAction(falltraeger)
            ),
            catchError(error =>
              of(new actions.PendenzenVerwaltungFalltraegersAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen Leistung
   */
  @Effect()
  getLeistung$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenLeistungsTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenLeistungsAction.LoadAction) => action.payload),
      switchMap((faFallId: number) => {
        return this.pendenzenApiClient
          .getLeistungs(faFallId)
          .pipe(
            map(
              Leistung =>
                new actions.PendenzenLeistungsAction.LoadSuccessAction(Leistung),
            ),
            catchError(error =>
              of(new actions.PendenzenLeistungsAction.LoadFailAction())
            ));
      })
    );

  /**
   * Subcriber Pendenzen Leistungsverant
   */
  @Effect()
  getLeistungsverant$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenLeistungsverantwsTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenLeistungsverantwsAction.LoadAction) => action.payload),
      switchMap((faFallId: string) => {
        return this.pendenzenApiClient
          .getLeistungsverants(faFallId)
          .pipe(
            map(
              Leistungsverant =>
                new actions.PendenzenLeistungsverantwsAction.LoadSuccessAction(Leistungsverant)
            ),
            catchError(error =>
              of(new actions.PendenzenLeistungsverantwsAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen LeistungsverantW
   */
  @Effect()
  getLeistungsverantW$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenLeistungsverantwTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenLeistungsverantwAction.LoadAction) => action.payload),
      switchMap((leistungId: string) => {
        return this.pendenzenApiClient
          .getLeistungsverantw(leistungId)
          .pipe(
            map(
              leistungsverantw =>
                new actions.PendenzenLeistungsverantwAction.LoadSuccessAction(leistungsverantw)
            ),
            catchError(error =>
              of(new actions.PendenzenLeistungsverantwAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen ModulenStatus
   */
  @Effect()
  getModulenStatus$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungModulenStatusTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenVerwaltungModulenStatusAction.LoadAction) => action.payload),
      switchMap((baPersonId: number) => {
        return this.pendenzenApiClient
          .getModulenStatus(baPersonId)
          .pipe(
            map(
              modulenStatus =>
                new actions.PendenzenVerwaltungModulenStatusAction.LoadSuccessAction(modulenStatus),
            ),
            catchError(error =>
              of(new actions.PendenzenVerwaltungModulenStatusAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen Organisation
   */
  @Effect()
  getOrganisation$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenOrganisationTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenOrganisationAction.LoadAction) => action.payload),
      switchMap(state => {
        return this.pendenzenApiClient
          .getOrganisations()
          .pipe(
            map(
              organisation =>
                new actions.PendenzenOrganisationAction.LoadSuccessAction(organisation)
            ),
            catchError(error =>
              of(new actions.PendenzenOrganisationAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen StatusEdit
   */
  @Effect()
  getStatusEdit$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungStatusEditTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenVerwaltungStatusEditAction.LoadAction) => action.payload),
      switchMap(taskId => {
        return this.pendenzenApiClient
          .getStatusEditButton(taskId)
          .pipe(
            map(
              statusEdit =>
                new actions.PendenzenVerwaltungStatusEditAction.LoadSuccessAction(statusEdit)
            ),
            catchError(error =>
              of(new actions.PendenzenVerwaltungStatusEditAction.LoadFailAction(error))
            ));
      })
    );

  /**
   * Subcriber Pendenzen Status
   */
  @Effect()
  getStatus$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenStatusTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenStatusAction.LoadAction) => action.payload),
      switchMap((state: LovCodeQuery) => {
        const query = tryMapPathApi(state);
        return this.pendenzenApiClient
          .getStatus(query)
          .pipe(
            map(status => new actions.PendenzenStatusAction.LoadSuccessAction(status)),
            catchError(error =>
              of(new actions.PendenzenStatusAction.LoadFailAction(error))
            ));
      }));

  /**
   * Subcriber Pendenzen TreeNavigator
   */
  @Effect()
  getTreeNavigators$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungNavTreeTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenVerwaltungNavTreeAction.LoadAction) => action.payload),
      switchMap(state => {
        return this.pendenzenApiClient
          .getTreeNavigators()
          .pipe(
            map(
              organisation =>
                new actions.PendenzenVerwaltungNavTreeAction.LoadSuccessAction(organisation),
            ),
            catchError(error =>
              of(new actions.PendenzenVerwaltungNavTreeAction.LoadFailAction(error))
            ));
      }));

  /**
   * Subcriber Pendenzen Type
   */
  @Effect()
  getType$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenWithTypeTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenWithTypeAction.LoadAction) => action.payload),
      switchMap((lovName: string) => {
        return this.pendenzenApiClient
          .getTypes(lovName)
          .pipe(
            map(type => new actions.PendenzenWithTypeAction.LoadSuccessAction(type)),
            catchError(error =>
              of(new actions.PendenzenWithTypeAction.LoadFailAction(error))
            ));
      }));

  /**
   * PendenzenVerwaltung list
   */
  @Effect()
  getPendenzenVerwaltungs$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungTypes.LOAD)
    .pipe(
      map((action: actions.PendenzenVerwaltungAction.LoadAction) => action.payload),
      switchMap((state: PendenzenVerwaltungQuery) => {
        const query = tryMapPathApi(state);
        return this.pendenzenApiClient
          .getPendenzenVerwaltungs(query)
          .pipe(
            map(
              pendenzenVerwaltungs =>
                new actions.PendenzenVerwaltungAction.LoadSuccessAction(
                  pendenzenVerwaltungs
                )
            ),
            catchError(error =>
              of(new actions.PendenzenVerwaltungAction.LoadFailAction(error))
            ));
      }));

  /**
   * Add PendenzenVerwaltung
   */
  @Effect()
  addPendenzenVerwaltung$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungInsertTypes.ADD_NEW)
    .pipe(
      map((action: actions.PendenzenVerwaltungInsertAction.AddNewAction) => action.payload),
      switchMap((task: PendenzenVerwaltung) => {
        return this.pendenzenApiClient
          .insertPendenzenVerwaltung(task)
          .pipe(
            map(
              pendenzenVerwaltung =>
                new actions.PendenzenVerwaltungInsertAction.AddSuccessAction(pendenzenVerwaltung),
            ),
            catchError(error =>
              of(new actions.PendenzenVerwaltungInsertAction.AddFailAction(error))
            ));
      }));

  // UPDATE
  @Effect()
  updateStatusDonePendenzenVerwaltung$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungUpdateTypes.UPDATE)
    .map((action: actions.PendenzenVerwaltungUpdateAction.UpdateAction) => action.payload)
    .switchMap((task: PendenzenVerwaltung) => {
      return this.pendenzenApiClient
        .updatePendenzenVerwaltung(task)
        .map(
          pendenzenVerwaltung =>
            new actions.PendenzenVerwaltungUpdateAction.UpdateSuccessAction(
              pendenzenVerwaltung
            )
        )
        .catch(error =>
          of(new actions.PendenzenVerwaltungUpdateAction.UpdateFailAction(error))
        );
    });

   // get Master Data
  @Effect()
  getMasterData$ = this.actions$
    .ofType(actions.PendenzensActionTypes.PendenzenVerwaltungGetMasterTypes.LOAD)
    .map((action: actions.PendenzenVerwaltungGetMasterAction.LoadAction) => action.payload)
    .switchMap((state) => {
      return this.pendenzenApiClient
        .getMasterData()
        .map(
          data => new actions.PendenzenVerwaltungGetMasterAction.LoadSuccessAction(data)
        )
        .catch(error =>
          of(new actions. PendenzenVerwaltungGetMasterAction.LoadFailAction(error))
        );
    });
}
