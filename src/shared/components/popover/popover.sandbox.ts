import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as PopOverStore from './store';
import * as PopOverAction from './store/actions/popover.action';

@Injectable()
export class PopOverSandbox extends Sandbox {
  public PopOverData$ = this.popoverStore$.select(PopOverStore.getButtonsData);

  constructor(protected appState$: Store<store.State>, private popoverStore$: Store<PopOverStore.PopOverState>) {
    super(appState$);
  }

  public getButtons(params: any): void {
    this.popoverStore$.dispatch(new PopOverAction.PopOverInitData.LoadAction(params));
  }

}
