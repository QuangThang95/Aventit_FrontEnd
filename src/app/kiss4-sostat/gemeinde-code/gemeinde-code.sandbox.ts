import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as GemeindeCodeStore from './store';
import * as GemeindeCodeAction from './store/actions/gemeinde-code.action';

@Injectable()
export class GemeindeCodeSandbox extends Sandbox {
    public GemeindeCodeData$ = this.gemeindeCodeState$.select(GemeindeCodeStore.getGemeindeCodeData);

    constructor(protected appState$: Store<store.State>, private gemeindeCodeState$: Store<GemeindeCodeStore.GemeindeCodeState>) {
        super(appState$);
    }

    public getGemeindeCodes(params: any): void {
        this.gemeindeCodeState$.dispatch(new GemeindeCodeAction.GemeindeCodeInitData.LoadAction(params));
    }

}
