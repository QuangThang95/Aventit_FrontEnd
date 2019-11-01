import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/rx';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as AsvexportAction from './store/actions/asvexport.action';
import * as store from '@shared/store';
import * as AsvexportStore from './store';
import {
  ASVDetenerfassung,
  ZuExportierendeEintrage,
  ZuExportierendeEintrageQuery,
  ModelQueryInsertASVSExport,
  ModelQueryUpdateASVSExport,
  ModelQueryUpdateTransaction
} from './models';
@Injectable()
export class AsvexportSandbox extends Sandbox {
  public AsvexportesData$ = this.asvexportState$.select(
    AsvexportStore.getAsvexportesData
  );

  public AsvEintrageData$ = this.asvexportState$.select(
    AsvexportStore.getAsvEintrageData
  );

  public FileBinaryData$ = this.asvexportState$.select(
    AsvexportStore.getFileBinaryData
  );

  public XOrgUnitsData$ = this.asvexportState$.select(
    AsvexportStore.getXOrgUnitsData
  );

  public InsertSstASVSExportData$ = this.asvexportState$.select(
    AsvexportStore.insertSstASVSExportData
  );

  public UpdateSstASVSExportData$ = this.asvexportState$.select(
    AsvexportStore.updateSstASVSExportData
  );

  public UpdateSstASVSExportTransactionData$ = this.asvexportState$.select(
    AsvexportStore.updateSstASVSExportTransactionData
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private asvexportState$: Store<AsvexportStore.AsvexportState>
  ) {
    super(appState$);
  }

  public getAsvexport(): void {
    this.asvexportState$.dispatch(new AsvexportAction.AsvexportInitData.LoadAction());
  }

  // load grid bottom
  public getEintrage(modelQueryEintrage: ZuExportierendeEintrageQuery): void {
    this.asvexportState$.dispatch(new AsvexportAction.AsvEintragData.LoadAction(modelQueryEintrage));
  }

  /**
* *****************************************************************
* dispatch action load file binary
* Author:DNDUC
* *****************************************************************
*/
  public getFileBinaryData(documentID?: number): void {
    this.asvexportState$.dispatch(new AsvexportAction.FileBinaryData.LoadAction(documentID));
  }

  /**
* *****************************************************************
* dispatch action get xorgunit
* Author:DNDUC
* *****************************************************************
*/
  public getXOrgUnitsData(): void {
    this.asvexportState$.dispatch(new AsvexportAction.XOrgUnitData.LoadAction());
  }

  /**
* *****************************************************************
* dispatch action insert SstASVSExport
* Author:DNDUC
* *****************************************************************
*/
  public insertSstASVSExport(sstASVSExport: ModelQueryInsertASVSExport): void {
    this.asvexportState$.dispatch(new AsvexportAction.SstASVSExportInsertData.AddNewAction(sstASVSExport));
  }

  /**
* *****************************************************************
* dispatch action update SstASVSExport
* Author:DNDUC
* *****************************************************************
*/
  public updateSstASVSExport(sstASVSExportUpdate: ModelQueryUpdateASVSExport): void {
    this.asvexportState$.dispatch(new AsvexportAction.UpdateASVSExportData.UpdateAction(sstASVSExportUpdate));
  }

  /**
* *****************************************************************
* dispatch action update SstASVSExport Transaction
* Author:DNDUC
* *****************************************************************
*/
  public updateSstASVSExportTransaction(sstASVSExportUpdateTransaction: ModelQueryUpdateTransaction): void {
    this.asvexportState$.dispatch(new AsvexportAction.UpdateASVSExportTransactionData.UpdateTransactionAction(sstASVSExportUpdateTransaction));
  }

}
