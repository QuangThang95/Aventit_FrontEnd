import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import { ModelQueryLeitfaden } from './models';
import * as CtlBfsDokumenteStore from './store';
import * as CtlBfsDokumenteAction from './store/actions/ctl-bfs-dokumente.action';

@Injectable()
export class CtlBfsDokumenteSandbox extends Sandbox {
    public LeitfadensData$ = this.ctlBfsDokumenteState$.select(
        CtlBfsDokumenteStore.getCtlBfsDokumenteData
    );


    constructor(
        protected appState$: Store<store.State>,
        private ctlBfsDokumenteState$: Store<CtlBfsDokumenteStore.CtlBfsDokumenteState>
    ) {
        super(appState$);
    }


    /**
  * *****************************************************************
  * dispatch action load data Leitfaden
  * Author:DNDUC
  * *****************************************************************
  */
    public loadLeitfadenData(): void {
        this.ctlBfsDokumenteState$.dispatch(new CtlBfsDokumenteAction.LeitfadenData.LoadAction());
    }

    public resetLeitfadenState(): void {
        this.ctlBfsDokumenteState$.dispatch(
            new CtlBfsDokumenteAction.LeitfadenData.ResetStateAction()
        );
    }
}
