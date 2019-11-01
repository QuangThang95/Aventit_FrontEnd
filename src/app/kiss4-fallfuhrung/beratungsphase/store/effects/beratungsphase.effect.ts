import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BeratungsphaseApiClient } from '../../beratungsphaseApiClient.service';
import {
  CheckDatumVonQuery,
  DeletePhaseQuery,
  GetConfigBoolQueryModel,
  GetCountFaPhaseQueryModel,
  GetFaLeistungByBaPersonIDQueryModel,
  GrundSelectboxQueryModel,
  InsertFaPhaseQueryModel,
  ListGetConfigIntQuery,
  LoadFormDataQueryModel,
  UpdateFaLeistungQueryModel,
  UpdateFormDataQueryModel,
  GetLicensedModulQueryModel,
  ReopenPhaseQueryModel,
} from '../../models';
import * as actions from '../actions/beratungsphase.action';

// rxjs
// models entity
@Injectable()
export class BeratungsphaseEffects {
  constructor(
    private actions$: Actions,
    private beratungsphaseApiClient: BeratungsphaseApiClient) { }
  // get data SAR select box
  @Effect()
  getSARSelectboxData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.SARSelectboxDataTypes.LOAD)
    .pipe(
      map((action: actions.SARSelectboxData.LoadSARSelectboxDataAction) => action.payload),
      switchMap(state => {
        return this.beratungsphaseApiClient
          .getSARSelectboxDatas().pipe(
            map(
              initdata =>
                new actions.SARSelectboxData.LoadSARSelectboxDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.SARSelectboxData.LoadSARSelectboxDataFailAction(error))
            ));
      })
    );
  // get data DPL select box
  @Effect()
  getDPLSelectboxData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.DPLSelectboxDataTypes.LOAD)
    .pipe(
      map((action: actions.DPLSelectboxData.LoadDPLSelectboxDataAction) => action.payload),
      switchMap(state => {
        return this.beratungsphaseApiClient
          .getDPLzugewiesenSelectboxDatas().pipe(
            map(
              initdata =>
                new actions.DPLSelectboxData.LoadDPLSelectboxDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DPLSelectboxData.LoadDPLSelectboxDataFailAction(error))
            ));
      })
    );
  // get data Grund select box
  @Effect()
  getGrundSelectboxData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GrundSelectboxDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundSelectboxData.LoadGrundSelectboxDataAction) => action.payload),
      switchMap((state: GrundSelectboxQueryModel) => {
        return this.beratungsphaseApiClient
          .getGrundSelectboxDatas(state.FaPhaseCode).pipe(
            map(
              initdata =>
                new actions.GrundSelectboxData.LoadGrundSelectboxDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundSelectboxData.LoadGrundSelectboxDataFailAction(error))
            ));
      })
    );

  @Effect()
  loadBeratungsphaseFormData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.BeratungsphaseFormDataTypes.LOAD)
    .pipe(
      map((action: actions.BeratungsphaseFormData.LoadBeratungsphaseFormDataAction) => action.payload),
      switchMap((param?: LoadFormDataQueryModel) => {
        return this.beratungsphaseApiClient
          .loadBeratungsphaseFormData(param.faPhaseId).pipe(
            map(
              initdata =>
                new actions.BeratungsphaseFormData.LoadBeratungsphaseFormDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.BeratungsphaseFormData.LoadBeratungsphaseFormDataFailAction(error))
            ));
      })
    );

  // Update Form data
  @Effect()
  updateBeratungsphaseFormData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.BeratungsphaseUpdateFormDataTypes.UPDATE_FORM_DATA)
    .pipe(
      map((action: actions.BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataAction) => action.payload),
      switchMap((model?: UpdateFormDataQueryModel) => {
        return this.beratungsphaseApiClient
          .updateFormData(model, model.faPhaseID_old).pipe(
            map(
              initdata =>
                new actions.BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.BeratungsphaseUpdateFormData.UpdateBeratungsphaseFormDataFailAction(error))
            ));
      })
    );
  // Get DatumVon and FaLeistungID to check datumVon valid
  @Effect()
  getDatumAndFaLeistungIDData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetDatumVonAndFaLeistungIDDataTypes.LOAD)
    .pipe(
      map((action: actions.GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataAction) => action.payload),
      switchMap((param?: LoadFormDataQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getFaLeistungIDAndDatumVon(query).pipe(
            map(
              initdata =>
                new actions.GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetDatumVonAndFaLeistungIDData.GetDatumVonAndFaLeistungIDDataFailAction(error))
            ));
      })
    );

  // Get duplicate count of DatumVon
  @Effect()
  getDuplicateCountDatumVon$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.CheckDatumVonValidTypes.LOAD)
    .pipe(
      map((action: actions.CheckDatumVonValidData.CheckDatumVonValidDataAction) => action.payload),
      switchMap((param?: CheckDatumVonQuery) => {
        return this.beratungsphaseApiClient
          .getDuplicateCountDatumVon(param).pipe(
            map(
              initdata =>
                new actions.CheckDatumVonValidData.CheckDatumVonValidSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.CheckDatumVonValidData.CheckDatumVonValidFailAction(error))
            ));
      })
    );
  // Get mandatory field
  @Effect()
  getGetMandatoryField$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetMandatoryFieldTypes.LOAD)
    .pipe(
      map((action: actions.GetMandatoryFieldData.GetMandatoryFieldDataAction) => action.payload),
      switchMap((param?: LoadFormDataQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getGetMandatoryField(query).pipe(
            map(
              initdata =>
                new actions.GetMandatoryFieldData.GetMandatoryFieldSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetMandatoryFieldData.GetMandatoryFieldFailAction(error))
            ));
      })
    );
  // Check minimal all targets
  @Effect()
  checkMinimalAllTargets$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.CheckMinimalAllTargetsTypes.LOAD)
    .pipe(
      map((action: actions.CheckMinimalAllTargetsData.CheckMinimalAllTargetsDataAction) => action.payload),
      switchMap((param?: LoadFormDataQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .checkMinimalAllTargets(query).pipe(
            map(
              initdata =>
                new actions.CheckMinimalAllTargetsData.CheckMinimalAllTargetsSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.CheckMinimalAllTargetsData.CheckMinimalAllTargetsFailAction(error))
            ));
      })
    );
  @Effect()
  getFaLeistungByBaPersonID$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD)
    .pipe(
      map((action: actions.GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDDataAction) => action.payload),
      switchMap((param?: GetFaLeistungByBaPersonIDQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getFaLeistungByBaPersonID(query).pipe(
            map(
              initdata =>
                new actions.GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDFailAction(error))
            ));
      })
    );
  @Effect()
  getCountFaPhase$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetCountFaPhaseTypes.LOAD)
    .pipe(
      map((action: actions.GetCountFaPhaseData.GetCountFaPhaseDataAction) => action.payload),
      switchMap((param?: GetCountFaPhaseQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getCountFaPhase(query).pipe(
            map(
              initdata =>
                new actions.GetCountFaPhaseData.GetCountFaPhaseSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetCountFaPhaseData.GetCountFaPhaseFailAction(error))
            ));
      })
    );
  @Effect()
  getNewDateByFaLeistungID$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetNewDateByFaLeistungIDTypes.LOAD)
    .pipe(
      map((action: actions.GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDDataAction) => action.payload),
      switchMap((param?: GetCountFaPhaseQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getNewDateByFaLeistungID(query).pipe(
            map(
              initdata =>
                new actions.GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetNewDateByFaLeistungIDData.GetNewDateByFaLeistungIDFailAction(error))
            ));
      })
    );
  @Effect()
  addFaPhase$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.InsertFaPhaseTypes.ADD)
    .pipe(
      map((action: actions.InsertFaPhaseData.InsertFaPhaseDataAction) => action.payload),
      switchMap((param?: InsertFaPhaseQueryModel) => {
        return this.beratungsphaseApiClient
          .insertFaPhase(param).pipe(
            map(
              initdata =>
                new actions.InsertFaPhaseData.InsertFaPhaseSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.InsertFaPhaseData.InsertFaPhaseFailAction(error))
            ));
      })
    );
  @Effect()
  updateFaleistungData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_DATA)
    .pipe(
      map((action: actions.UpdateFaLeistungData.UpdateFaLeistungDataAction) => action.payload),
      switchMap((model?: UpdateFaLeistungQueryModel) => {
        return this.beratungsphaseApiClient
          .updateFaleistungData(model).pipe(
            map(
              initdata =>
                new actions.UpdateFaLeistungData.UpdateFaLeistungDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.UpdateFaLeistungData.UpdateFaLeistungDataFailAction(error))
            ));
      })
    );
  @Effect()
  geConfigIntData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetConfigIntTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigIntData.GetConfigIntDataAction) => action.payload),
      switchMap((param?: ListGetConfigIntQuery) => {
        return this.beratungsphaseApiClient
          .geConfigIntData(param).pipe(
            map(
              initdata =>
                new actions.GetConfigIntData.GetConfigIntSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigIntData.GetConfigIntFailAction(error))
            ));
      })
    );
  @Effect()
  geConfigBoolData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetConfigBoolTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigBoolData.GetConfigBoolDataAction) => action.payload),
      switchMap((param?: GetConfigBoolQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .geConfigBoolData(query).pipe(
            map(
              initdata =>
                new actions.GetConfigBoolData.GetConfigBoolSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigBoolData.GetConfigBoolFailAction(error))
            ));
      })
    );
  @Effect()
  deleteFaPhaseData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE)
    .pipe(
      map((action: actions.DeleteFaPhaseData.DeleteFaPhaseDataAction) => action.payload),
      switchMap((param?: DeletePhaseQuery) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .deleteFaPhase(query).pipe(
            map(
              initdata =>
                new actions.DeleteFaPhaseData.DeleteFaPhaseDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DeleteFaPhaseData.DeleteFaPhaseDataFailAction(error))
            ));
      })
    );
  @Effect()
  getIntakeAndBeratungsphaseByFaLeistungID$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetIntakeAndBeratungCountTypes.LOAD)
    .pipe(
      map((action: actions.GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountDataAction) => action.payload),
      switchMap((param?: GetCountFaPhaseQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getIntakeAndBeratungsphaseByFaLeistungID(query).pipe(
            map(
              initdata =>
                new actions.GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetIntakeAndBeratungCountData.GetIntakeAndBeratungCountFailAction(error))
            ));
      })
    );
  @Effect()
  getLicensedModule$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetLicensedModuleTypes.LOAD)
    .pipe(
      map((action: actions.GetLicensedModuleData.GetLicensedModuleDataAction) => action.payload),
      switchMap((param?: GetLicensedModulQueryModel) => {
        const query = tryMapPathApi(param);
        return this.beratungsphaseApiClient
          .getLicensedModule(query).pipe(
            map(
              initdata =>
                new actions.GetLicensedModuleData.GetLicensedModuleSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetLicensedModuleData.GetLicensedModuleFailAction(error))
            ));
      })
    );

  // Get data Fall Rights
  @Effect()
  getFallRightsData$ = this.actions$
    .ofType(actions.BeratungsphaseActionTypes.GetFallRightsTypes.LOAD)
    .pipe(
      map((action: actions.GetFallRightsData.LoadAction) => action.payload),
      switchMap(state => {
        return this.beratungsphaseApiClient
          .getDataFallRights(state).pipe(
            map(
              initdata =>
                new actions.GetFallRightsData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetFallRightsData.LoadFailAction(error))
            ));
      })
    );

    @Effect()
    getReopenPhaseData$ = this.actions$
      .ofType(actions.BeratungsphaseActionTypes.GetReopenPhaseTypes.LOAD)
      .pipe(
        map((action: actions.GetReopenPhaseData.GetReopenPhaseDataAction) => action.payload),
        switchMap((param?: ReopenPhaseQueryModel) => {
          const query = tryMapPathApi(param);
          return this.beratungsphaseApiClient
            .getReopenPhaseData(query).pipe(
              map(
                initdata =>
                  new actions.GetReopenPhaseData.GetReopenPhaseSuccessAction(initdata)
              ),
              catchError(error =>
                of(new actions.GetReopenPhaseData.GetReopenPhaseFailAction(error))
              ));
        })
      );

      @Effect()
      getFallfuhrungData$ = this.actions$
        .ofType(actions.BeratungsphaseActionTypes.FallfuhrungTypes.LOAD)
        .pipe(
          map((action: actions.FallfuhrungData.LoadAction) => action.payload),
          switchMap(state => {
            return this.beratungsphaseApiClient
              .getDataFallfuhrung(state).pipe(
                map(
                  initdata =>
                    new actions.FallfuhrungData.LoadSuccessAction(initdata)
                ),
                catchError(error =>
                  of(new actions.FallfuhrungData.LoadFailAction(error))
                ));
          })
        );
}
