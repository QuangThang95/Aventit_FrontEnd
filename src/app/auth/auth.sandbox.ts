import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as authActions from '@shared/store/actions/auth.actions';
import { User } from '@shared/models/auth/user.model';
import {
    UtilService,
    ValidationService,
    tryParseJwt
} from '@shared/utilites';
import {
    LoginForm
} from '@shared/models';

@Injectable()
export class AuthSandbox extends Sandbox {

    public loginLoading$ = this.appState$.select(store.getAuthLoading);
    public loginLoaded$ = this.appState$.select(store.getAuthLoaded);
    public loggedUser$ = this.appState$.select(store.getLoggedUser);
    public LoadXUser$ = this.appState$.select(store.getXUsers);
    public LoadUserRight$ = this.appState$.select(store.getUserRight);
    public LoadMultipleXUsers$ = this.appState$.select(store.getMultipleXUsers);

    private subscriptions: Array<Subscription> = [];

    constructor(
        protected appState$: Store<store.State>,
        private router: Router,
        private utilService: UtilService,
        public validationService: ValidationService
    ) {
        super(appState$);
    }

    /**
     * Dispatches login action
     *
     * @param form
     */
    public login(form: any): void {
        this.appState$.dispatch(new authActions.DoLoginAction(new LoginForm(form)));

    }
    // Load information user 
    public LoadXUser(parmas): void {
        this.appState$.dispatch(new authActions.AuthLoadUser(parmas));
    }
    // Load information vesion 
    public LoadVesion(): void {
        this.appState$.dispatch(new authActions.AuthLoadVersion());
    }
    // Load information Role
    public LoadUserRight(userID: any): void {
        this.appState$.dispatch(new authActions.LoadGetUserRight(userID));
    }
    // Load information LinkIBan
    public LoadLinkIban(): void {
        this.appState$.dispatch(new authActions.AuthLoadLinkIBan());
    }
     // Load information MultipleXUsers
    public LoadMultipleXUsers(userID: any, primaryUserID:any ): void {
        this.appState$.dispatch(new authActions.LoadGetMultipleXUsers({userID, primaryUserID}));
    }


    public getConfigsToken() {
        return this.utilService.getConfig('tokens');
    }

    /**
     * Unsubscribe from events
     */
    public unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Registers events
     */
    public registerAuthEvents(): void {
        // Subscribes to logged user data and save/remove it from the local storage
        this.subscriptions.push(this.loggedUser$.subscribe((user: User) => {
            const forcedReload = false;
            if (user.isLoggedIn) {
                user.save(user);
                const userInfo: any = tryParseJwt(user.access_token);
                localStorage.setItem('user:userId', userInfo.sub);
                localStorage.setItem('user', userInfo.LogonName);
                // if (this.router.url === this.utilService.getConfig('page').login) {
                //     return this.router.navigate([this.utilService.getConfig('page').fallnavigator]);
                // }
            } else {
                this.clearStore();
                user.remove();
                this.unregisterEvents();
            }
        }));
    }

    /**
     * Clear store after logout for auth Sandbox
     */
    private clearStore(): void {
        // clear state appState
        store.getLoggedUser.release();
    }
}
