import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs/rx';

import {
  CheckDatumVonQuery,
  GetConfigBoolQueryModel,
  GetCountFaPhaseQueryModel,
  GetFaLeistungByBaPersonIDQueryModel,
  GrundSelectboxQueryModel,
  InsertFaPhaseQueryModel,
  ListGetConfigIntQuery,
  LoadFormDataQueryModel,
  UpdateFaLeistungQueryModel,
  UpdateFormDataQueryModel,
  DeletePhaseQuery,
  GetLicensedModulQueryModel,
  ReopenPhaseQueryModel,
} from './models';
import * as beratungsphasesStore from './store';
import * as BeratungsphaseAction from './store/actions/beratungsphase.action';

@Injectable()
export class BeratungsphaseSandbox extends Sandbox {
  // Get data for SAR select box
  public SARSelectboxData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getSARSelectBoxData
  );
  // Get data for DPL select box
  public DPLSelectboxData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getDPLSelectBoxData
  );
  // Get data for Grund select box
  public GrundSelectboxData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getGrundSelectBoxData
  );
  // Load Form Data
  public LoadBeratungsphaseFormData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getBeratungsphasesFormData
  );
  // Update Form Data
  public UpdateBeratungsphaseFormData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getBeratungsphasesUpdateFormData
  );
  // Get DatumVon and FaLeistungID
  public GetDatumVonAndFaLeistungIDData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getDatumVonAndFaLeistungIDData
  );
  // Get Duplicate count DatumVon
  public GetDuplicateDatumVon$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getCountDuplicateDatumVonData
  );
  // Get mandatory field
  public GetMandatoryFieldData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getMandatoryFieldData
  );
  // Check minimal all targets
  public CheckMinimalAllTargetsData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getCheckMinimalAllTargetsData
  );
  // Get FaLeistung By BaPersonID
  public GetFaLeistungByBaPersonIDData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getFaLeistungByBaPersonIDData
  );
  // Get Count FaPhase Data
  public GetCountFaPhaseData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getCountFaPhaseData
  );
  // Get NewDate By FaLeistungID Data
  public GetNewDateByFaLeistungIDData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getNewDateByFaLeistungIDData
  );
  // Get Insert FaPhase Data
  public GetInsertFaPhaseData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getInsertFaPhaseDatas
  );
  // Get Config Int Data
  public GetConfigIntData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getConfigIntData
  );
  // Get Config Bool Data
  public GetConfigBoolData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getConfigBoolData
  );
  // Update FaLeistung Data
  public GetUpdateFaleistungData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getUpdateFaleistungData
  );
  // Delete FaPhase data
  public DeleteFaPhaseData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getDeleteFaPhaseData
  );
  // Get Intake and Beratungsphase count By FaLeistungID Data
  public GetIntakeAndBeratungsphaseCountByFaLeistungIDData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getIntakeAndBeratungsphaseCountByFaLeistungIDData
  );
  // Get Licensed Module Data
  public GetLicensedModuleData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getLicensedModuleData
  );
  public FallRightsData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getFallRightsData
  );
  // Get Reopen Phase Data
  public GetReopenPhaseData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getReopenPhaseData
  );
  public FallfuhrungData$ = this.beratungsphasesState$.select(
    beratungsphasesStore.getFallfuhrungData
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private beratungsphasesState$: Store<beratungsphasesStore.BeratungsphaseState>
  ) {
    super(appState$);
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  // get SAR select box data
  public loadSARSelectboxData(): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.SARSelectboxData.LoadSARSelectboxDataAction());
  }
  // get DPL select box data
  public loadDPLSelectboxData(): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.DPLSelectboxData.LoadDPLSelectboxDataAction());
  }
  // get Grund select box data
  public loadGrundSelectboxData(modelQueryGrundSelectbox?: GrundSelectboxQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GrundSelectboxData.LoadGrundSelectboxDataAction(modelQueryGrundSelectbox));
  }
  // get Form data
  public loadBeratungsphasesFormData(formDataModelQuery?: LoadFormDataQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.BeratungsphaseFormData.LoadBeratungsphaseFormDataAction(formDataModelQuery));
  }
  // Update Form data
  public updateFormData(model: UpdateFormDataQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataAction(model));
  }
  // Get DatumVon and FaLeistungID
  public getDatumVonAndFaLeistungIDData(model: LoadFormDataQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataAction(model));
  }
  // Get duplicate count DatumVon
  public getCountDuplicateDatumVonData(model: CheckDatumVonQuery): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.CheckDatumVonValidData.CheckDatumVonValidDataAction(model));
  }
  // Get mandatory field
  public getGetMandatoryFieldData(model: LoadFormDataQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetMandatoryFieldData.GetMandatoryFieldDataAction(model));
  }
  // Check minimal all targets
  public getCheckMinimalAllTargetsData(model: LoadFormDataQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.CheckMinimalAllTargetsData.CheckMinimalAllTargetsDataAction(model));
  }
  // Get FaLeistung By BaPersonID
  public getFaLeistungByBaPersonIDData(model: GetFaLeistungByBaPersonIDQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDDataAction(model));
  }
  // Get Count FaPhase
  public getCountFaPhaseData(model: GetCountFaPhaseQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetCountFaPhaseData.GetCountFaPhaseDataAction(model));
  }
  // Get NewDate By FaLeistungID
  public getNewDateByFaLeistungIDData(model: GetCountFaPhaseQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDDataAction(model));
  }
  //  Insert FaPhase
  public insertFaPhaseData(model: InsertFaPhaseQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.InsertFaPhaseData.InsertFaPhaseDataAction(model));
  }
  //  Update Faleistung data
  public updateFaleistungData(model: UpdateFaLeistungQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.UpdateFaLeistungData.UpdateFaLeistungDataAction(model));
  }
  // Get Config int data
  public getConfigIntData(model: ListGetConfigIntQuery): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetConfigIntData.GetConfigIntDataAction(model));
  }
  // Get Config Bool data
  public getConfigBoolData(model: GetConfigBoolQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetConfigBoolData.GetConfigBoolDataAction(model));
  }
  // Get Delete FaPhase data
  public getDeleteFaPhaseData(model: DeletePhaseQuery): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.DeleteFaPhaseData.DeleteFaPhaseDataAction(model));
  }
  // Get Intake and Beratungsphase count By FaLeistungID
  public getIntakeAndBeratungsphaseCountByFaLeistungIDData(model: GetCountFaPhaseQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountDataAction(model));
  }
  // Get Licensed Module
  public getLicensedModule(model: GetLicensedModulQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetLicensedModuleData.GetLicensedModuleDataAction(model));
  }
  public loadFallRightsData(faLeistungID: any): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetFallRightsData.LoadAction(faLeistungID));
  }
  // Get Reopen Phase data
  public getReopenPhaseData(model: ReopenPhaseQueryModel): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.GetReopenPhaseData.GetReopenPhaseDataAction(model));
  }
  public resetBeratungphaseState(): void {
    this.beratungsphasesState$.dispatch(
      new BeratungsphaseAction.BeratungsphaseFormData.ResetStateAction()
    );
  }
  // dispatch action load data Fallfuhrung
  public loadFallfuhrungData(faLeistungID?: number): void {
    this.beratungsphasesState$.dispatch(new BeratungsphaseAction.FallfuhrungData.LoadAction(faLeistungID));
  }
}
