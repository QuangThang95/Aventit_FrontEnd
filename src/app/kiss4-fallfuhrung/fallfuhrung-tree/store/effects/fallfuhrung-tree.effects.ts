import { Injectable } from '@angular/core';
import { FallNavFilterModel } from '@app/kiss4-main/fall-navigator/models';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { FallfuhrungTreeApiClient } from '../../fallfuhrung-treeApiClient.service';
import { BNavigatorItemsQuery } from '../../models/b-navigator.model';
import { BapersonRelationQuery } from '../../models/baperson-relation.model';
import {
  GetConfigIntQueryModel,
  InsertFaPhaseQueryModel,
  MessageInformationQueryModel,
  UpdateFaLeistungQueryModel,
} from '../../models/beratungsphase.model';
import { TreeViewItemsQuery } from '../../models/tree-view-item.model';
import * as actions from '../actions/fallfuhrung-tree.actions';

@Injectable()
export class FallfuhrungTreeEffects {

  constructor(
    private actions$: Actions,
    private fallfuhrungTreeApiClient: FallfuhrungTreeApiClient
  ) { }

  @Effect()
  getIconMoudle$ =
    this.actions$.ofType(actions.LoadMoudleIconTypes.LOAD).pipe(
      map((action: actions.LoadIconModuleAction.LoadAction) => action.payload),
      switchMap((payload: any) => {
        return this.fallfuhrungTreeApiClient.getIconModule(payload.baPersonID, payload.faFallID).pipe(
          map((data) => new actions.LoadIconModuleAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadIconModuleAction.LoadFailAction(error)))
        );
      })
    );
  @Effect()
  getVisibleZeitachse$ =
    this.actions$.ofType(actions.LoadVisibleZeitachseTypes.LOAD).pipe(
      map((action: actions.LoadVisibleZeitachseAction.LoadAction) => action.payload),
      switchMap((userId: number) => {
        return this.fallfuhrungTreeApiClient.getVisibleZeitachse().pipe(
          map((data) => new actions.LoadVisibleZeitachseAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadVisibleZeitachseAction.LoadFailAction(error)))
        );
      })
    );
  @Effect()
  getPersonInfoTitel$ =
    this.actions$.ofType(actions.LoadPersonInfoTitleTypes.LOAD).pipe(
      map((action: actions.LoadPersonInfoTitelAction.LoadAction) => action.payload),
      switchMap((payload: any) => {
        return this.fallfuhrungTreeApiClient.getPersonInfoTitel(payload.baPersonID, payload.userID, payload.languageCode).pipe(
          map((data) => new actions.LoadPersonInfoTitelAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadPersonInfoTitelAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getTreeViewItems$ =
    this.actions$.ofType(actions.LoadTreeViewItemsTypes.LOAD).pipe(
      map((action: actions.LoadTreeViewItemsAction.LoadAction) => action.payload),
      switchMap((state: TreeViewItemsQuery) => {
        const query = tryMapPathApi(state);
        return this.fallfuhrungTreeApiClient.getTreeViewItems(query).pipe(
          map((data) => new actions.LoadTreeViewItemsAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadTreeViewItemsAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getRightContentItems$ =
    this.actions$.ofType(actions.RightContentItemsTypes.LOAD).pipe(
      map((action: actions.LoadRightContentItemsAction.LoadAction) => action.payload),
      switchMap((params: any) => {
        return this.fallfuhrungTreeApiClient.getRightContentItems(params).pipe(
          map((data) => new actions.LoadRightContentItemsAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadRightContentItemsAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getUserIDFaLeistung$ =
    this.actions$.ofType(actions.UserIDFaLeistungTypes.LOAD).pipe(
      map((action: actions.LoadUserIDFaLeistungAction.LoadAction) => action.payload),
      switchMap((params: any) => {
        return this.fallfuhrungTreeApiClient.getUserIDFaLeistung(params).pipe(
          map((data) => new actions.LoadUserIDFaLeistungAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadUserIDFaLeistungAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getUserIDFaPhase$ =
    this.actions$.ofType(actions.UserIDFaPhaseTypes.LOAD).pipe(
      map((action: actions.LoadUserIDFaPhaseAction.LoadAction) => action.payload),
      switchMap((params: any) => {
        return this.fallfuhrungTreeApiClient.getUserIDFaPhase(params).pipe(
          map((data) => new actions.LoadUserIDFaPhaseAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadUserIDFaPhaseAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getBNavigatorItems$ =
    this.actions$.ofType(actions.LoadBNavigatorItemsTypes.LOAD).pipe(
      map((action: actions.BNavigatorItemsAction.LoadAction) => action.payload),
      switchMap((state: BNavigatorItemsQuery) => {
        const query = tryMapPathApi(state);
        return this.fallfuhrungTreeApiClient.getBNavigatorItems(query).pipe(
          map((data) => new actions.BNavigatorItemsAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.BNavigatorItemsAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  deleteFaPhaseData$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.DeleteFaPhaseTypes.DELETE_FAPHASE)
    .pipe(
      map((action: actions.DeleteFaPhaseData.DeleteFaPhaseDataAction) => action.payload),
      concatMap((state: any) => {
        return this.fallfuhrungTreeApiClient
          .deleteFaPhase(state).pipe(
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
  getFaLeistungData$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.GetFaLeistungTypes.LOAD)
    .pipe(
      map((action: actions.GetFaLeistungAction.LoadAction) => action.payload),
      switchMap(state => {
        return this.fallfuhrungTreeApiClient
          .getFaLeistung(state).pipe(
            map(
              initdata =>
                new actions.GetFaLeistungAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetFaLeistungAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  deleteFallverlaufData$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.DeleteFallverlaufTypes.DELETE_Fallverlauf)
    .pipe(
      map((action: actions.DeleteFallverlaufData.DeleteFallverlaufAction) => action.payload),
      concatMap((state: any) => {
        return this.fallfuhrungTreeApiClient
          .deleteFallverlauf(state).pipe(
            map(
              initdata =>
                new actions.DeleteFallverlaufData.DeleteFallverlaufSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DeleteFallverlaufData.DeleteFallverlaufFailAction(error))
            ));
      })
    );

  @Effect()
  deleteBaPersonRelation$ =
    this.actions$.ofType(actions.DeleteBaPersonRelationTypes.DELETE).pipe(
      map((action: actions.DeleteBapersonRelationAction.DeleteAction) => action.payload),
      concatMap((state: BapersonRelationQuery) => {
        const query = tryMapPathApi(state);
        return this.fallfuhrungTreeApiClient.deleteBaPersonRelation(query).pipe(
          map((data) => new actions.DeleteBapersonRelationAction.DeleteSuccessAction(data)),
          catchError(error => of(new actions.DeleteBapersonRelationAction.DeleteFailAction(error)))
        );
      })
    );

  @Effect()
  getFaLeistungByBaPersonID$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.GetFaLeistungByBaPersonIDTypes.LOAD)
    .pipe(
      map((action: actions.GetFaLeistungByBaPersonIDData.GetFaLeistungByBaPersonIDDataAction) => action.payload),
      switchMap((state: any) => {
        return this.fallfuhrungTreeApiClient
          .getFaLeistungByBaPersonID(state).pipe(
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
    .ofType(actions.FallfuhrungTreeActionTypes.GetCountFaPhaseTypes.LOAD)
    .pipe(
      map((action: actions.GetCountFaPhaseData.GetCountFaPhaseDataAction) => action.payload),
      switchMap((state: any) => {
        return this.fallfuhrungTreeApiClient
          .getCountFaPhase(state).pipe(
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
  getFaPhaseByFaLeistungID$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.GetFaPhaseByFaLeistungIDTypes.LOAD)
    .pipe(
      map((action: actions.GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDDataAction) => action.payload),
      switchMap((state: any) => {
        return this.fallfuhrungTreeApiClient
          .getFaPhaseByFaLeistungID(state).pipe(
            map(
              initdata =>
                new actions.GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetFaPhaseByFaLeistungIDData.GetFaPhaseByFaLeistungIDFailAction(error))
            ));
      })
    );
  @Effect()
  addFaPhase$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.InsertFaPhaseTypes.ADD)
    .pipe(
      map((action: actions.InsertFaPhaseData.InsertFaPhaseDataAction) => action.payload),
      concatMap((param?: InsertFaPhaseQueryModel) => {
        return this.fallfuhrungTreeApiClient
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
    .ofType(actions.FallfuhrungTreeActionTypes.UpdateFaLeistungDataTypes.UPDATE_FALEISTUNG_DATA)
    .pipe(
      map((action: actions.UpdateFaLeistungData.UpdateFaLeistungDataAction) => action.payload),
      concatMap((model?: UpdateFaLeistungQueryModel) => {
        return this.fallfuhrungTreeApiClient
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
    .ofType(actions.FallfuhrungTreeActionTypes.GetConfigIntTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigIntData.GetConfigIntDataAction) => action.payload),
      switchMap((param?: GetConfigIntQueryModel) => {
        const query = tryMapPathApi(param);
        return this.fallfuhrungTreeApiClient
          .getConfigIntData(query).pipe(
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
    .ofType(actions.FallfuhrungTreeActionTypes.GetConfigBoolTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigBoolData.GetConfigBoolDataAction) => action.payload),
      switchMap((param?: GetConfigIntQueryModel) => {
        const query = tryMapPathApi(param);
        return this.fallfuhrungTreeApiClient
          .getConfigBoolData(query).pipe(
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
  getConfigOffeneIntake$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.GetConfigOffeneIntakeTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigOffeneIntakeData.GetConfigOffeneIntakeAction) => action.payload),
      switchMap((param?: GetConfigIntQueryModel) => {
        const query = tryMapPathApi(param);
        return this.fallfuhrungTreeApiClient
          .getConfigIntData(query).pipe(
            map(
              initdata =>
                new actions.GetConfigOffeneIntakeData.GetConfigOffeneIntakeSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigOffeneIntakeData.GetConfigOffeneIntakeFailAction(error))
            ));
      })
    );

  @Effect()
  getConfigTotalBeratungsphasen$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.GetConfigTotalBeratungsphasenTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenAction) => action.payload),
      switchMap((param?: GetConfigIntQueryModel) => {
        const query = tryMapPathApi(param);
        return this.fallfuhrungTreeApiClient
          .getConfigIntData(query).pipe(
            map(
              initdata =>
                new actions.GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigTotalBeratungsphasenData.GetConfigTotalBeratungsphasenFailAction(error))
            ));
      })
    );

  @Effect()
  getConfigTransferPhaseUser$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.GetConfigTransferPhaseUserTypes.LOAD)
    .pipe(
      map((action: actions.GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserAction) => action.payload),
      switchMap((param?: GetConfigIntQueryModel) => {
        const query = tryMapPathApi(param);
        return this.fallfuhrungTreeApiClient
          .getConfigIntData(query).pipe(
            map(
              initdata =>
                new actions.GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetConfigTransferPhaseUserData.GetConfigTransferPhaseUserFailAction(error))
            ));
      })
    );

  @Effect()
  getMessageInformation$ = this.actions$
    .ofType(actions.FallfuhrungTreeActionTypes.LoadMessageInformationTypes.LOAD)
    .pipe(
      map((action: actions.LoadMessageInformationAction.LoadAction) => action.payload),
      switchMap((param?: MessageInformationQueryModel) => {
        const query = tryMapPathApi(param);
        return this.fallfuhrungTreeApiClient
          .getMessageInformation(query).pipe(
            map(
              initdata =>
                new actions.LoadMessageInformationAction.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LoadMessageInformationAction.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getCountBgFinanzPlan$ =
    this.actions$.ofType(actions.GetCountBgFinanzPlanTypes.LOAD).pipe(
      map((action: actions.CountBgFinanzPlanAction.GetAction) => action.payload),
      switchMap((state: BapersonRelationQuery) => {
        const query = tryMapPathApi(state);
        return this.fallfuhrungTreeApiClient.getCountBgFinanzPlan(query).pipe(
          map((data) => new actions.CountBgFinanzPlanAction.GetSuccessAction(data)),
          catchError(error => of(new actions.CountBgFinanzPlanAction.GetFailAction(error)))
        );
      })
    );

  @Effect()
  getBaPersonIDModulID$ =
    this.actions$.ofType(actions.GetBaPersonIDModulIDTypes.LOAD).pipe(
      map((action: actions.GetBaPersonIDModulIDAction.LoadAction) => action.payload),
      switchMap((faLeistungID: any) => {
        return this.fallfuhrungTreeApiClient.getBaPersonIDModulID(faLeistungID).pipe(
          map((data) => new actions.GetBaPersonIDModulIDAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.GetBaPersonIDModulIDAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getTreeFallNavigator$ =
    this.actions$.ofType(actions.GetTreeFallNavigatorTypes.LOAD).pipe(
      map((action: actions.GetTreeFallNavigatorAction.LoadAction) => action.payload),
      switchMap((state: FallNavFilterModel) => {
        const query = tryMapPathApi(state);
        return this.fallfuhrungTreeApiClient.getTreeFallNavigator(query).pipe(
          map(data => new actions.GetTreeFallNavigatorAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.GetTreeFallNavigatorAction.LoadFailAction(error)))
        );
      })
    );
}
