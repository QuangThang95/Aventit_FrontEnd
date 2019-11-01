import { getBgSilAHVBeitrag, updateAhvBeitrage } from './store/reducers/ahi-beitrage.reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs';
import * as ahvBeitrageStore from './store';
import * as ahvBeitrageAction from './store/actions/ahv-beitrage.action';

@Injectable()
export class AhvBeitrageSandbox extends Sandbox {
  public bgSilAHVBeitragData$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.getBgSilAHVBeitrag
  );
  public personenUnterstuetzt$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.getPersonenUnterstuetzt
  );
  public sqlQueryShPositionTyp$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.getSqlQueryShPositionTyp
  );
  public ahvBeitragPosition$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.getAHVBeitragPosition
  );
  public ahvInstitutionSuchenWh$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.getInstitutionSuchenWh
  );
  public deleteAhvBeitragePosition$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.deleteAhvBeitrage
  );
  public updateAhvBeitragePosition$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.updateAhvBeitrage
  );
  public createAhvBeitragePosition$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.createAhvBeitrage
  );
  public getLookUps$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.createLookUps
  );
  public getDropDownAnpassung$ = this.ahvBeitrageState$.select(
    ahvBeitrageStore.createDropDownAnpassung
  );
  private subscriptions: Subscription[] = [];
  constructor(
    protected appState$: Store<store.State>,
    private ahvBeitrageState$: Store<ahvBeitrageStore.AhvBeitrageState>
  ) {
    super(appState$);
  }
  public getBgSilAHVBeitrag(bgBudgetID): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.BgSilAHVBeitragDatas.LoadAction(bgBudgetID));
  }
  public getPersonenUnterstuetzt(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.PersonenUnterstuetztDatas.LoadAction(query));
  }
  public getSqlQueryShPositionTyp(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.SqlQueryShPositionTypDatas.LoadAction(query));
  }
  public getAHVBeitragPosition(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.AhvBeitragePositionDatas.LoadAction(query));
  }
  public getDropDownAnpassung(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.DropDownAnpassungDatas.LoadAction(query));
  }
  public getInstitutionSuchenWh(): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.InstitutionSuchenWhDatas.LoadAction());
  }
  public deleteAhvBeitragePosition(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.AhvBeitragePositionDeleteDatas.LoadAction(query));
  }
  public updateAhvBeitragePosition(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.AhvBeitragePositionUpdateDatas.LoadAction(query));
  }
  public createAhvBeitragePosition(query): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.AhvBeitragePositionCreateDatas.LoadAction(query));
  }
  public getLookUps(): void {
    this.ahvBeitrageState$.dispatch(new ahvBeitrageAction.LookUpsDatas.LoadAction());
  }
  clearStore() {
    ahvBeitrageStore.getBgSilAHVBeitrag.release();
    ahvBeitrageStore.getPersonenUnterstuetzt.release();
    ahvBeitrageStore.getSqlQueryShPositionTyp.release();
    ahvBeitrageStore.getAHVBeitragPosition.release();
    ahvBeitrageStore.getInstitutionSuchenWh.release();
    ahvBeitrageStore.deleteAhvBeitrage.release();
    ahvBeitrageStore.updateAhvBeitrage.release();
    ahvBeitrageStore.createAhvBeitrage.release();
    ahvBeitrageStore.createLookUps.release();
    ahvBeitrageStore.createDropDownAnpassung.release();
  }
}
