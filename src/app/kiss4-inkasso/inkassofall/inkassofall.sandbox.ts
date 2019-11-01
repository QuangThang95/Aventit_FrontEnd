import { Injectable } from '@angular/core';
import * as InkassofallAction from '@app/kiss4-inkasso/inkassofall/store/actions/inkassofall.action';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/rx';

import * as inkassofallStore from './store';

@Injectable()
export class InkassofallSandbox extends Sandbox {
    public inkassofallData$ = this.inkassofallState$.select(
        inkassofallStore.getInkassofallData
    );
    public inkassofalllistData$ = this.inkassofallState$.select(
        inkassofallStore.getInkassofalllistData
    );
    public inkassofallAddData$ = this.inkassofallState$.select(
        inkassofallStore.getInkassofallAddDatas
    );
    public inkassofallUpdateData$ = this.inkassofallState$.select(
        inkassofallStore.getInkassofallUpdate
    );
    public inkassofallDeleteData$ = this.inkassofallState$.select(
        inkassofallStore.getInkassofallDelete
    );
    public inkassofallGetStateForm$ = this.inkassofallState$.select(
        inkassofallStore.getStateFormInkassofall
    );
    public inkassofallGetObjectDetail$ = this.inkassofallState$.select(
        inkassofallStore.getObjectDetailInkassofall
    );

    private subscriptions: Array<Subscription> = [];

    constructor(protected appState$: Store<store.State>,
        private inkassofallState$: Store<inkassofallStore.InkassofallState>,
        private utilService: UtilService) {
        super(appState$);
    }

    public loadListInkassofall(query): void {
        this.inkassofallState$.dispatch(new InkassofallAction.InkassofallList.LoadAction(query));
    }

    public addInkassofall(Inkassofall: any): void {
        this.inkassofallState$.dispatch(new InkassofallAction.InkassofallAddData.AddNewAction(Inkassofall));
    }

    public updateInkassofall(inkassofall: any): void {
        this.inkassofallState$.dispatch(new InkassofallAction.InkassofallUpdate.UpdateAction(inkassofall));
    }

    public deleteInkassofall(inkassofallID: number): void {
        this.inkassofallState$.dispatch(new InkassofallAction.InkassofallDeleteData.DeleteAction(inkassofallID));
    }

    public saveStateFormInkassofall(objectState: any): void {
        this.inkassofallState$.dispatch(new InkassofallAction.SaveFormState.SaveFormStateAction(objectState));
    }
    public objectFromDetailInkassofall(objectDetail: any): void {
        this.inkassofallState$.dispatch(new InkassofallAction.InkassofallDetailState.InkassofallDetailStateAction({ ...objectDetail }));
    }

    /**
     * Unsubscribes from events
     */
    public unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }


}
