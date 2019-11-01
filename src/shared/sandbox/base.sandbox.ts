import {
    Store
} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as store from '../store';
import * as authActions from '../store/actions/auth.actions';
import { localeDateString } from '@shared/utilites/utilityHelpers';
import { User } from '@shared/models';

export abstract class Sandbox {

    public loggedUser$: Observable<any> = this.appState$.select(store.getLoggedUser);
    public culture$: Observable<any> = this.appState$.select(store.getSelectedCulture);
    public culture: string;
    public availableRoles$: Observable<any> = this.appState$.select(store.getAvailableRoles);
    public selectedAction$: Observable<any> = this.appState$.select(store.getSelectedActions);

    constructor(protected appState$: Store<store.State>) { }

    /**
     * Pulls user from local storage and saves it to the store
     */
    public loadUser(): void {
        const user = JSON.parse(localStorage.getItem('user:logined'));
        this.appState$.dispatch(new authActions.AddUserAction(new User(user)));
    }

    /**
     * Formats date string based on selected culture
     *
     * @param value
     */
    public formatDate(value: string) {
        return localeDateString(value, this.culture);
    }
}
