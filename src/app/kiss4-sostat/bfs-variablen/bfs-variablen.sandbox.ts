import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as VariablenStore from './store';
import * as VariablenActions from './store/actions/bfs-variablen.action';

@Injectable()
export class VariablenSandbox extends Sandbox {
    public VariablenData$ = this.variablenState$.select(VariablenStore.getVariablenData);
    public PersonData$ = this.variablenState$.select(VariablenStore.getPersonData);
    public MitarbeiterData$ = this.variablenState$.select(VariablenStore.getMitarbeiterData);
    public SearchInitData$ = this.variablenState$.select(VariablenStore.getSearchInitData);

    constructor(protected appState$: Store<store.State>, private variablenState$: Store<VariablenStore.VariablenState>) {
        super(appState$);
    }

    public getVariablens(params: any): void {
        this.variablenState$.dispatch(new VariablenActions.VariablenInitData.LoadAction(params));
    }

    public getPersons(params: any): void {
        this.variablenState$.dispatch(new VariablenActions.PersonInitData.LoadAction(params));
    }

    public getMitarbeiters(params: any): void {
        this.variablenState$.dispatch(new VariablenActions.MitarbeiterInitData.LoadAction(params));
    }

    public getInitialDataSearch(params: any): void {
        this.variablenState$.dispatch(new VariablenActions.SearchInitData.LoadAction(params));
    }

}
