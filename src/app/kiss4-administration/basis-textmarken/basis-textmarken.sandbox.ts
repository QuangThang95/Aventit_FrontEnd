import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs';

import { Basistextmarken } from './models';
import * as textMarkenStore from './store';
import * as textMarkensAction from './store/actions/basis-textmarken.actions';

@Injectable()
export class TextmarkenSandbox extends Sandbox {
  // Load Success
  public textmarkenData$ = this.textMarkenState$.select(textMarkenStore.getTextMarkenData);
  public getTableData$ = this.textMarkenState$.select(textMarkenStore.getTableData);
  public getTypData$ = this.textMarkenState$.select(textMarkenStore.getTypData);
  public getModulData$ = this.textMarkenState$.select(textMarkenStore.getModulpData);
  public basisTextmarkenSaveKontaktData$ = this.textMarkenState$.select(textMarkenStore.getBasisTextmarkenSave);
  public basisTextmarkenDelKontaktData$ = this.textMarkenState$.select(textMarkenStore.getBasisTextmarkenDel);
  // Load Fail
  public textmarkenDataFail$ = this.textMarkenState$.select(textMarkenStore.getTextMarkenDataFailed);
  public getTableDataFail$ = this.textMarkenState$.select(textMarkenStore.getTableDataFailed);
  public getTypDataFail$ = this.textMarkenState$.select(textMarkenStore.getTypDataFailed);
  public getModulDataFail$ = this.textMarkenState$.select(textMarkenStore.getModulDataFailed);
  public basisTextmarkenDelDataFail$ = this.textMarkenState$.select(textMarkenStore.getBasisTextmarkenDelFail);
  public basisTextmarkenSaveDataFail$ = this.textMarkenState$.select(textMarkenStore.getBasisTextmarkenSeveFail);

  private subscriptions: Subscription[] = [];
  constructor(
    protected appState$: Store<store.State>,
    private textMarkenState$: Store<textMarkenStore.TextMarkenState>,
    private utilService: UtilService) {
    super(appState$);
  }

  public textMarkenData(params): void {
    this.textMarkenState$.dispatch(new textMarkensAction.TextMarkenDatas.LoadAction(params));
  }

  public getTableName(): void {
    this.textMarkenState$.dispatch(new textMarkensAction.GetTableDatas.LoadAction());
  }

  public getTypName(params): void {
    this.textMarkenState$.dispatch(new textMarkensAction.GetTypDatas.LoadAction(params));
  }

  public getModulName(params): void {
    this.textMarkenState$.dispatch(new textMarkensAction.GetModulDatas.LoadAction(params));
  }

  public SaveBasistextmarken(basistextmarken: Basistextmarken): void {
    this.textMarkenState$.dispatch(new textMarkensAction.BasisTextmarkenPostBaInstitutionAction.PostAction(basistextmarken));
  }

  public DelBasistextmarken(params): void {
    this.textMarkenState$.dispatch(new textMarkensAction.BasisTextmarkenDelBaInstitutionAction.DelAction({ bookmarkName: params.bookmarkName, xBookmarkTS: params.xBookmarkTS }));
  }
}
