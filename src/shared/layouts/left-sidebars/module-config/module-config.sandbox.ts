import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import { ModuleConfigNavigatorItemsQuery } from './models';
import * as moduleConfigStore from './store';
import * as moduleConfigNavigatorAction from './store/actions/module-config-navigator.action';


@Injectable()
export class ModuleConfigSandbox extends Sandbox {
    public moduleConfigNavigatorItems$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getModuleConfigNavigatorItems
    );

    public moduleConfigNavigatorItemsLoading$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getModuleConfigNavigatorItemsLoading
    );

    public initialParameters$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getInitialParameters
    );

    public isEditModeStatus$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getEditModeStatus
    );

    public isDirtyFormStatus$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getDirtyFormStatus
    );

    public isChangeForm$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getChangeForm
    );

    public selectNode$ = this.moduleConfigNavigatorState$.select(
        moduleConfigStore.getSelectNode
    );

    constructor(protected appState$: Store<store.State>, private moduleConfigNavigatorState$: Store<moduleConfigStore.ModuleConfigNavigatorState>) {
        super(appState$);
    }

    public loadModuleConfigNavigatorItems(moduleConfigNavigatorItemsQuery?: ModuleConfigNavigatorItemsQuery): void {
        this.moduleConfigNavigatorState$.dispatch(new moduleConfigNavigatorAction.ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsAction(moduleConfigNavigatorItemsQuery));
    }

    public updateInitialParameters(initialParameters: any): void {
        this.moduleConfigNavigatorState$.dispatch(new moduleConfigNavigatorAction.UpdateInitialParametersAction(initialParameters));
    }

    public updateEditModeStatus(isEditMode: any): void {
        this.moduleConfigNavigatorState$.dispatch(new moduleConfigNavigatorAction.UpdateEditModeStatusAction(isEditMode));
    }

    public updateDirtyFormStatus(isDirtyForm: boolean): void {
        this.moduleConfigNavigatorState$.dispatch(new moduleConfigNavigatorAction.UpdateDirtyFormStatusAction(isDirtyForm));
    }

    public updateChangeFormStatus(isDirtyForm: boolean): void {
        this.moduleConfigNavigatorState$.dispatch(new moduleConfigNavigatorAction.ChangeFormAction(isDirtyForm));
    }

    public selectNode(node: any): void {
        this.moduleConfigNavigatorState$.dispatch(new moduleConfigNavigatorAction.SelectNodeAction(node));
    }

}
