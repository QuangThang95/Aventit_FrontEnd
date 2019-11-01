import { Injectable } from '@angular/core';
// rsjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
//
import * as actions from '../actions/auth.actions';
import { AuthApiClientService } from '../../../app/auth/auth-api-client.service';
import { LoginForm, User } from '@shared/models';
import { UserForm } from '@app/auth/models/xuser.model';

@Injectable()
export class AuthEffects {
var
  constructor(
    private actions$: Actions,
    private authApiClient: AuthApiClientService) { }

  /**
    * Login effect
    */
  @Effect()
  doLogin$ =
    this.actions$.ofType(actions.AuthActionTypes.DO_LOGIN).pipe(
      map((action: actions.DoLoginAction) => action.payload),
      switchMap((state: LoginForm) => {
        const urlSearchParams: URLSearchParams = new URLSearchParams();
        urlSearchParams.append('username', state.username);
        urlSearchParams.append('password', state.password);
        urlSearchParams.append('client_id', state.client_id);
        urlSearchParams.append('client_secret', state.client_secret);
        urlSearchParams.append('grant_type', state.grant_type);
        urlSearchParams.append('scope', state.scope);
        return this.authApiClient.login(urlSearchParams.toString()).pipe(
          map(user => new actions.DoLoginSuccessAction(new User(user))),
          catchError(error => of(new actions.DoLoginFailAction(error)))
        );
      })
    );
  /**
   * load User
   */
  @Effect()
  loadUser$ = this.actions$
    .ofType(actions.AuthActionTypes.LOAD_USER)
    .pipe(
      map((actions: actions.AuthLoadUser) => actions.payload),
      switchMap((parmas: number) => {
        return this.authApiClient.getUser(parmas).pipe(
          map(user => new actions.AuthLoadUserSuccess(new UserForm(user))),
          catchError(error => of(new actions.AuthLoadUserFail(error)))
        );
      })
    )



  /**
   * load Version DoLogin
   */
  @Effect()
  loadVersionDoLogin$ =
    this.actions$.ofType(actions.AuthActionTypes.LOAD_VERSION).pipe(
      map((actions: actions.AuthLoadVersion) => actions.payload),
      switchMap((state: any) => {
        return this.authApiClient.loadVersion().pipe(
          map(user => new actions.AuthLoadVersionSuccess(new User(user))),
          catchError(error => of(new actions.AuthLoadVersionFail(error)))
        );
      })
    )

  /**
   * load Get Multiple XUsers
   */
  @Effect()
  loadGetMultipleXUsers$ =
    this.actions$.ofType(actions.AuthActionTypes.LOAD_GETMULTIPLEXUSERS).pipe(
      map((actions: actions.LoadGetMultipleXUsers) => actions.payload),
      switchMap((state) => {
        return this.authApiClient.getMultipleXUsers(state.userID, state.primaryUserID).pipe(
          map(user => new actions.LoadGetMultipleXUsersSuccess(user)),
          catchError(error => of(new actions.LoadGetMultipleXUsersFail(error)))
        );
      })
    )


  /**
   * load Get User Right
   */
  @Effect()
  loadGetUserRight$ = 
  this.actions$.ofType(actions.AuthActionTypes.LOAD_GETUSERRIGHT).pipe(
      map((actions: actions.LoadGetUserRight) => actions.payload),
      switchMap((state) => {
        return this.authApiClient.getUserRight(state).pipe(
          map(user => new actions.LoadGetUserRightSuccess(user)),
          catchError(error => of(new actions.LoadGetUserRightFail(error)))
        );
      })
    )


  /**
   * load Link IBan
   */
  @Effect()
  loadLnkIBanDoLogin$ =
    this.actions$.ofType(actions.AuthActionTypes.LOAD_LINKIBAN).pipe(
      map((actions: actions.AuthLoadLinkIBan) => actions.payload),
      switchMap((state: any) => {
        return this.authApiClient.loadLinkIBan().pipe(
          map(user => new actions.AuthLoadLinkIBanSuccess(new User(user))),
          catchError(error => of(new actions.AuthLoadLinkIBanFail(error)))
        );
      })
    )

  /**
   * Logout effect
   */
  @Effect()
  doLogout$ =
    this.actions$.ofType(actions.AuthActionTypes.DO_LOGOUT).pipe(
      map((action: actions.DoLogoutAction) => action.payload),
      switchMap(() => {
        return this.authApiClient.logout().pipe(
          map(() => new actions.DoLogoutSuccessAction()),
          catchError(error => of(new actions.DoLogoutFailAction(error)))
        );
      })
    );
}
