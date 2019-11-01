import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/vorlagenProfile.actions';
import { VorlagenProfileApiClient } from '@app/kiss4-administration/vorlagen-profile/vorlagenProfileApiClient.service';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { VorlagenProfile } from '../../models';

@Injectable()
export class VorlagenProfileEffects {

  constructor(
    private actions$: Actions,
    private vorlagenProfileApiClient: VorlagenProfileApiClient) { }

  /**
   * Subcription Vorlagen Profiles
   */
  @Effect()
  getVorlagenProfile$ =
    this.actions$.ofType(actions.VorlagenProfilesActionTypes.LoadVorlagenProfilesTypes.LOAD).pipe(
      map((action: actions.LoadVorlagenProfilesAction) => action.payload),
      switchMap((state: VorlagenProfile) => {
        const query = tryMapPathApi(state);
        return this.vorlagenProfileApiClient.getVorlagenProfile(query).pipe(
          map(trees => new actions.LoadVorlagenProfilesSuccessAction(trees)),
          catchError(error => of(new actions.LoadVorlagenProfilesFailAction(error)))
        );
      })
    );

  /**
     *  Subcription XProfile Tags
     */
  @Effect()
  getProfileTagData$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.LoadXProfileTagIDTypes.LOAD)
    .pipe(
      map((action: actions.LoadXProfileTagIDAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vorlagenProfileApiClient.getXProfileTagID(query).pipe(
          map(
            initdata => {
              return new actions.LoadXProfileTagIDSuccessAction(initdata);
            }
          ),
          catchError(error => of(new actions.LoadXProfileTagIDFailAction(error))
          ));
      })
    );

  /**
  * VorlagenProfile list
  */
  @Effect()
  getProfileData$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.LoadXProfileIDTypes.LOAD)
    .pipe(
      map((action: actions.LoadXProfileIDAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vorlagenProfileApiClient.getXProfileID(query).pipe(
          map(
            initdata => {
              return new actions.LoadXProfileIDSuccessAction(initdata);
            }
          ),
          catchError(error => of(new actions.LoadXProfileIDFailAction(error))
          ));
      })
    );

  /**
   *   Insert XProfile
   */
  @Effect()
  getInsertXProfileResult$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.InsertXProfileTypes.POST)
    .pipe(
      map((action: actions.InsertXProfilePostAction) => action.payload),
      switchMap(state => {
        return this.vorlagenProfileApiClient
          .insertXProfile(state)
          .pipe(
            map(responseData => new actions.InsertXProfileSuccessAction(responseData)),
            catchError(error => of(new actions.InsertXProfileFailAction(error))));
      })
    );

  /**
   *  Subcription current TID
   */
  @Effect()
  getCurrentTIDData$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.LoadCurrentTIDTypes.LOAD)
    .pipe(
      map((action: actions.LoadCurrentTIDAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vorlagenProfileApiClient.getCurrentTID(query).pipe(
          map(
            initdata => {
              return new actions.LoadCurrentTIDSuccessAction(initdata);
            }
          ),
          catchError(error => of(new actions.LoadCurrentTIDFailAction(error))
          ));
      })
    );

  /**
   * Save XLang Text
   */
  @Effect()
  saveXLangTextResult$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.SaveXLangTextTypes.POST)
    .pipe(
      map((action: actions.SaveXLangTextPostAction) => action.payload),
      switchMap(state => {
        return this.vorlagenProfileApiClient
          .saveXLangText(state)
          .pipe(
            map(responseData => new actions.SaveXLangTextSuccessAction(responseData)),
            catchError(error => of(new actions.SaveXLangTextFailAction(error))));
      })
    );

  /**
   * Delete XProfile
   */
  @Effect()
  deleteXProfileResult$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.DeleteXProfileTypes.DELETE)
    .pipe(
      map((action: actions.DeleteXProfileDeleteAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vorlagenProfileApiClient
          .deleteXProfile(query)
          .pipe(
            map(responseData => new actions.DeleteXProfileSuccessAction(responseData)),
            catchError(error => of(new actions.DeleteXProfileFailAction(error))));
      })
    );

  /**
   * Delete XProfile
   */
  @Effect()
  deleteXProfileTagResult$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.DeleteXProfileTagTypes.DELETE)
    .pipe(
      map((action: actions.DeleteXProfileTagDeleteAction) => action.payload),
      switchMap(state => {
        return this.vorlagenProfileApiClient
          .deleteXProfileXProfileTag(state)
          .pipe(
            map(responseData => new actions.DeleteXProfileTagSuccessAction(responseData)),
            catchError(error => of(new actions.DeleteXProfileTagFailAction(error))));
      })
    );

  /**
   * Execsp XSaveProfileTags
   */
  @Effect()
  execspXSaveProfileTagsResult$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.ExecspXSaveProfileTagsTypes.POST)
    .pipe(
      map((action: actions.ExecspXSaveProfileTagsPostAction) => action.payload),
      switchMap(state => {
        return this.vorlagenProfileApiClient
          .execspXSaveProfileTags(state)
          .pipe(
            map(responseData => new actions.ExecspXSaveProfileTagsSuccessAction(responseData)),
            catchError(error => of(new actions.ExecspXSaveProfileTagsFailAction(error))));
      })
    );

  /**
   *   Insert XProfile
   */
  @Effect()
  getUpdateXProfileResult$ = this.actions$
    .ofType(actions.VorlagenProfilesActionTypes.UpdateXProfileTypes.PUT)
    .pipe(
      map((action: actions.UpdateXProfilePutAction) => action.payload),
      switchMap(state => {
        return this.vorlagenProfileApiClient
          .updateXProfile(state)
          .pipe(
            map(responseData => new actions.UpdateXProfileSuccessAction(responseData)),
            catchError(error => of(new actions.UpdateXProfileFailAction(error))));
      })
    );
}
