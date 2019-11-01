import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '@shared/store';
import * as appsActions from '@shared/store/actions/app.actions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppSandbox extends Sandbox {
    public languageChaging$: Observable<boolean> = this.appState$.select(store.getLanguageChanging);
    private subcription: Subscription[] = [];
    constructor(
        protected appState$: Store<store.State>) {
        super(appState$);
    }

    /**
     * load roles data rights from api
     */
    public setupRoles(): void {
        this.availableRoles$.subscribe((roles) => {
            if (!roles) {
                this.appState$.dispatch(new appsActions.LoadApiRolesAction());
            }
        });
    }

    /**
     * Subcriber culture change
     */
    public registerEvents() {
        this.subcription.push(
            // check logout
            this.loggedUser$.subscribe((user) => {
                if (!user.isLoggedIn) {
                    this.clearStore();
                    this.unRegisterEvents();
                }
            })
        );
    }

    public unRegisterEvents() {
        this.subcription.forEach(sub => sub.unsubscribe());
    }

    /**
     * Clear store for app Sandbox
     */
    private clearStore(): void {
        store.getSelectedActions.release();
        store.getAvailableRoles.release();
    }
}
