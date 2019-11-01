import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/rx';

import * as whLeistungStore from './store';
import * as whLeistungsAction from './store/actions/whleistung.actions';

@Injectable()
export class WhLeistungSandbox extends Sandbox {
  public comBoBoxData$ = this.whleistungState$.select(
    whLeistungStore.getComboboxgData
  );

  // get data CbxBFS
  public comBoBoxDataBFS$ = this.whleistungState$.select(
    whLeistungStore.getComboboxBFSData
  );

  // get data CbxGeme
  public comBoBoxDataGeme$ = this.whleistungState$.select(
    whLeistungStore.getComboboxGemeData
  );

  // get data cbx Bottom
  public comBoBoxDataBottom$ = this.whleistungState$.select(
    whLeistungStore.getComboboxBottomData
  );

  // Get data Top
  public loadTopdata$ = this.whleistungState$.select(
    whLeistungStore.getTopData
  );

  //  Get bottom data grid
  public loadGridBottomdata$ = this.whleistungState$.select(
    whLeistungStore.getGridBottomData
  );

  //  count Data
  public countWhLeistungdata$ = this.whleistungState$.select(
    whLeistungStore.countData
  );

  // Delete Data
  public deleteWhLeistungdata$ = this.whleistungState$.select(
    whLeistungStore.deleteData
  );

  //  Update
  public updateWhLeistungdata$ = this.whleistungState$.select(
    whLeistungStore.updateData
  );

  //  Update Vorsaldo
  public updateVorsaldoWhLeistungdata$ = this.whleistungState$.select(
    whLeistungStore.updateVorsaldoData
  );

  // GetAnzahlOffenePendenzen
  public getAnzahlOffenePendenzen$ = this.whleistungState$.select(
    whLeistungStore.getAnzahlOffenePendenzenData
  );

  // get Message
  public getMLMessage$ = this.whleistungState$.select(
    whLeistungStore.getMLMessageData
  );
   // get VorsaldoKbKostenstelleID
   public getVorsaldoKbKostenstelleIdData$ = this.whleistungState$.select(
    whLeistungStore.getVorsaldoKbKostenstelleIDData
  );


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private whleistungState$: Store<whLeistungStore.WhLeistungState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  // get Data Combobox
  public getDataCombobox(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.WhLeistungComboboxInitDatas.LoadAction(data));
  }

  // get Data ComboboxBFS
  public getDataComboboxBFS(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.WhLeistungComboboxBFSInitDatas.LoadBFSAction(data));
  }

  // get Data CbxGeme
  public getDataComboboxGeme(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.WhLeistungComboboxGemeInitDatas.LoadGemeAction(data));
  }

  // get Data cbxBottom
  public getDataComboboxBottom(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.WhLeistungComboboxBottomInitDatas.LoadBottomAction(data));
  }

  // get Data Top
  public getDataTop(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.TopInitDatas.LoadTopDataAction(data));
  }

  // get Data Top
  public getDataBottomGrid(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.BottomGridInitDatas.LoadBottomGridDataAction(data));
  }

  //  count Data
   public countDataWhLeistung(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.CountInitDatas.CountdDataAction(data));
  }

  //  Delete
  public deleteDataWhLeistung(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.DeleteRecordInitDatas.DeleteDataAction(data));
  }

   //  Update
   public updateDataWhLeistung(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.UpdateInitDatas.UpdateDataAction(data));
  }

  //  Update Vorsaldo
  public updateVorsaldoDataWhLeistung(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.UpdateVorsaldoInitDatas.UpdateVorsaldoDataAction(data));
  }

  // getAnzahlOffenePendenzen
  public getAnzahlOffenePendenzen(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenDataAction(data));
  }

  // getMLMessage
  public getMLMessage(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.GetMLMessageInitDatas.GetMLMessageDataAction(data));
  }
  // get VorsaldoKbKostenstelleID
  public getVorsaldoKbKostenstelleID(data: any): void {
    this.whleistungState$.dispatch(new whLeistungsAction.VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDAction(data));
  }
}
