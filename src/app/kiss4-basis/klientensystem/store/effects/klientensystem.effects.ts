import { Injectable } from '@angular/core';
import { KlientensystemApiClient } from '@app/kiss4-basis/klientensystem/klientensystemApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Falltraeger, Mietvertrag, Relation, VwInstitution } from '../../models';
import * as actions from '../actions/klientensystem.actions';

@Injectable()
export class KlientensystemEffects {

  constructor(
    private actions$: Actions,
    private klientensystemApiClient: KlientensystemApiClient) { }

  /**
   * Subcription Falltraeger
   */
  @Effect()
  getFalltraeger$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.LoadFalltraegerTypes.LOAD).pipe(
      map((action: actions.LoadFalltraegerAction) => action.payload),
      switchMap((state: Falltraeger) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getFalltraeger(query).pipe(
          map(trees => new actions.LoadFalltraegerSuccessAction(trees)),
          catchError(error => of(new actions.LoadFalltraegerFailAction(error)))
        );
      })
    );

  /**
   * Subcription Mietvertrag
   */
  @Effect()
  getMietvertrag$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.LoadMietvertragTypes.LOAD).pipe(
      map((action: actions.LoadMietvertragAction) => action.payload),
      switchMap((state: Mietvertrag) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getMietvertrag(query).pipe(
          map(trees => new actions.LoadMietvertragSuccessAction(trees)),
          catchError(error => of(new actions.LoadMietvertragFailAction(error)))
        );
      })
    );

  /**
   * Subcription Relation
   */
  @Effect()
  getRelation$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.LoadRelationTypes.LOAD).pipe(
      map((action: actions.LoadRelationAction) => action.payload),
      switchMap((state: Relation) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getRelation(query).pipe(
          map(trees => new actions.LoadRelationSuccessAction(trees)),
          catchError(error => of(new actions.LoadRelationFailAction(error)))
        );
      })
    );

  /**
   * Subcription Relation
   */
  @Effect()
  getVwInstitution$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.LoadVwInstitutionTypes.LOAD).pipe(
      map((action: actions.LoadVwInstitutionAction) => action.payload),
      switchMap((state: VwInstitution) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getVwInstitution(query).pipe(
          map(trees => new actions.LoadVwInstitutionSuccessAction(trees)),
          catchError(error => of(new actions.LoadVwInstitutionFailAction(error)))
        );
      })
    );

  /**
   * Subcription BeziehungRelationGeneric
   */
  @Effect()
  getBeziehungRelationGeneric$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.BeziehungRelationGenericTypes.LOAD).pipe(
      map((action: actions.LoadBeziehungRelationGenericAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getBeziehungRelationGeneric(query).pipe(
          map(trees => new actions.LoadBeziehungRelationGenericSuccessAction(trees)),
          catchError(error => of(new actions.LoadBeziehungRelationGenericFailAction(error)))
        );
      })
    );

  /**
   * Subcription BeziehungRelationMale
   */
  @Effect()
  getBeziehungRelationMale$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.BeziehungRelationMaleTypes.LOAD).pipe(
      map((action: actions.LoadBeziehungRelationMaleAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getBeziehungRelationMale(query).pipe(
          map(trees => new actions.LoadBeziehungRelationMaleSuccessAction(trees)),
          catchError(error => of(new actions.LoadBeziehungRelationFemaleFailAction(error)))
        );
      })
    );

  /**
   * Subcription BeziehungRelationFemale
   */
  @Effect()
  getBeziehungRelationFemale$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.BeziehungRelationFemaleTypes.LOAD).pipe(
      map((action: actions.LoadBeziehungRelationFemaleAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getBeziehungRelationFemale(query).pipe(
          map(trees => new actions.LoadBeziehungRelationFemaleSuccessAction(trees)),
          catchError(error => of(new actions.LoadBeziehungRelationFemaleFailAction(error)))
        );
      })
    );

   /**
   * Subcription InFP
   */
  @Effect()
  getInFP$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.InFPTypes.LOAD).pipe(
      map((action: actions.LoadInFPAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getInFP(query).pipe(
          map(trees => new actions.LoadInFPSuccessAction(trees)),
          catchError(error => of(new actions.LoadInFPFailAction(error)))
        );
      })
    );

   /**
   * Subcription GleicheAdresse
   */
  @Effect()
  getGleicheAdresse$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.GleicheAdresseTypes.LOAD).pipe(
      map((action: actions.LoadGleicheAdresseAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getGleicheAdresse(query).pipe(
          map(trees => new actions.LoadGleicheAdresseSuccessAction(trees)),
          catchError(error => of(new actions.LoadGleicheAdresseFailAction(error)))
        );
      })
    );

  /**
   * Subcription HandleGleicherHaushalt
   */
  @Effect()
  getHandleGleicherHaushalt$ =
    this.actions$.ofType(actions.KlientensystemActionTypes.HandleGleicherHaushaltTypes.LOAD).pipe(
      map((action: actions.LoadHandleGleicherHaushaltAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.klientensystemApiClient.getHandleGleicherHaushaltFlagSet(query).pipe(
          map(trees => new actions.LoadHandleGleicherHaushaltSuccessAction(trees)),
          catchError(error => of(new actions.LoadHandleGleicherHaushaltFailAction(error)))
        );
      })
    );

/**
* Update BaPerson
*/
  @Effect()
  updateBaPersonData$ = this.actions$
    .ofType(actions.KlientensystemActionTypes.UpdateBaPersonTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateBaPersonAction) => action.payload),
      switchMap((model?: any) => {
        return this.klientensystemApiClient.updateBaPerson(model).pipe(
            map(
              initdata => {
                return new actions.UpdateBaPersonSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.UpdateBaPersonFailAction(error))
            ));
      })
    );

/**
* Update BaPersonRelation
*/
  @Effect()
  updateBaPersonRelationData$ = this.actions$
    .ofType(actions.KlientensystemActionTypes.UpdateBaPersonRelationTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateBaPersonRelationAction) => action.payload),
      switchMap((model?: any) => {
        return this.klientensystemApiClient.updateBaPersonRelation(model).pipe(
            map(
              initdata => {
                return new actions.UpdateBaPersonRelationSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.UpdateBaPersonRelationFailAction(error))
            ));
      })
    );

/**
* Update BaMietvertrag
*/
  @Effect()
  updateBaMietvertragData$ = this.actions$
    .ofType(actions.KlientensystemActionTypes.UpdateBaMietvertragTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateBaMietvertragAction) => action.payload),
      switchMap((model?: any) => {
        return this.klientensystemApiClient.updateBaMietvertrag(model).pipe(
            map(
              initdata => {
                return new actions.UpdateBaMietvertragSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.UpdateBaMietvertragFailAction(error))
            ));
      })
    );

/**
* Insert HistoryVersion
*/
  @Effect()
  insertHistoryVersionData$ = this.actions$
    .ofType(actions.KlientensystemActionTypes.InsertHistoryVersionTypes.INSERT)
    .pipe(
      map((action: actions.InsertHistoryVersionAction) => action.payload),
      switchMap((model?: any) => {
        return this.klientensystemApiClient.insertHistoryVersion(model).pipe(
            map(
              initdata => {
                return new actions.InsertHistoryVersionSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.InsertHistoryVersionFailAction(error))
            ));
      })
    );
}
