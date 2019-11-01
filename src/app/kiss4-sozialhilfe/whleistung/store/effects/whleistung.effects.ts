import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DeleteRecord } from '../../models';
import * as actions from '../actions/whleistung.actions';
import { WhLeistungApiClient } from '../../whleistungApiClient.service';
@Injectable()
export class WhLeistungEffects {

  constructor(
    private actions$: Actions,
    private whLeistungApiClient: WhLeistungApiClient) { }

  /**
  * WhLeistung list
  */
  @Effect()
  getCombobox$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.ComboboxDatasTypes.LOAD)
    .pipe(
      map((action: actions.WhLeistungComboboxInitDatas.LoadAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getDataCombobx(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.WhLeistungComboboxInitDatas.LoadSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.WhLeistungComboboxInitDatas.LoadFailAction(error))
            ));
      }));

  // get cbx BFS
  @Effect()
  getComboboxBFS$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.ComboboxBFSDatasTypes.LOAD)
    .pipe(
      map((action: actions.WhLeistungComboboxBFSInitDatas.LoadBFSAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getDataCombobx(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.WhLeistungComboboxBFSInitDatas.LoadBFSSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.WhLeistungComboboxBFSInitDatas.LoadBFSFailAction(error))
            ));
      }));

  // Get CbxGeme
  @Effect()
  getComboboxGeme$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.ComboboxGemeDatasTypes.LOAD)
    .pipe(
      map((action: actions.WhLeistungComboboxGemeInitDatas.LoadGemeAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getDataCombobx(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.WhLeistungComboboxGemeInitDatas.LoadGemeSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.WhLeistungComboboxGemeInitDatas.LoadGemeFailAction(error))
            ));
      }));

  // get Cbx Bottom
  @Effect()
  getComboboxBottom$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.ComboboxBottomDatasTypes.LOAD)
    .pipe(
      map((action: actions.WhLeistungComboboxBottomInitDatas.LoadBottomAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getDataCombobx(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.WhLeistungComboboxBottomInitDatas.LoadBottomSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.WhLeistungComboboxBottomInitDatas.LoadBottomFailAction(error))
            ));
      }));

  // get Load data
  @Effect()
  getDataTop$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.TopDatasTypes.LOAD)
    .pipe(
      map((action: actions.TopInitDatas.LoadTopDataAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getDataTop(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.TopInitDatas.LoadTopDataSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.TopInitDatas.LoadTopDataFailAction(error))
            ));
      }));

  // Load grid bottom
  @Effect()
  getDataGridBottom$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.LoadBottomDatasTypes.LOAD)
    .pipe(
      map((action: actions.BottomGridInitDatas.LoadBottomGridDataAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getDataGridBottom(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.BottomGridInitDatas.LoadBottomGridDataSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.BottomGridInitDatas.LoadBottomGridDataFailAction(error))
            ));
      }));

  // Count data
  @Effect()
  countRecordData$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.CountDatasTypes.LOAD)
    .pipe(
      map((action: actions.CountInitDatas.CountdDataAction) => action.payload),
      switchMap((data: any) => {
        return this.whLeistungApiClient
          .getCountRecordData(data)
          .pipe(
            map(
              whLeistungs =>
                new actions.CountInitDatas.CountDataSuccessAction(
                  whLeistungs
                )
            ),
            catchError(error =>
              of(new actions.CountInitDatas.CountDataFailAction(error))
            ));
      }));

  // delete
  @Effect()
  getWertData$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.DeleteRecordDatasTypes.DELETE)
    .pipe(
      map((action: actions.DeleteRecordInitDatas.DeleteDataAction) => action.payload),
      switchMap((state: DeleteRecord) => {
        const query = tryMapPathApi(state);
        return this.whLeistungApiClient
          .deletetRecordData(query).pipe(
            map(
              initdata =>
                new actions.DeleteRecordInitDatas.DeleteDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.DeleteRecordInitDatas.DeleteDataFailAction(error))
            ));
      })
    );

  // udapte
  @Effect()
  updateData$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.UpdateDatasTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateInitDatas.UpdateDataAction) => action.payload),
      switchMap((data) => {
        return this.whLeistungApiClient
          .updateData(data).pipe(
            map(
              initdata =>
                new actions.UpdateInitDatas.UpdateDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.UpdateInitDatas.UpdateDataFailAction(error))
            ));
      })
    );

  // udapte
  @Effect()
  updateVorsaldoData$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.UpdateVorsaldoDatasTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateVorsaldoInitDatas.UpdateVorsaldoDataAction) => action.payload),
      switchMap((data) => {
        return this.whLeistungApiClient
          .updateVorsaldoData(data).pipe(
            map(
              initdata =>
                new actions.UpdateVorsaldoInitDatas.UpdateVorsaldoDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.UpdateVorsaldoInitDatas.UpdateVorsaldoDataFailAction(error))
            ));
      })
    );

  // getAnzahlOffenePendenzen
  @Effect()
  getAnzahlOffenePendenzen$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.GetAnzahlOffenePendenzenDatasTypes.LOAD)
    .pipe(
      map((action: actions.GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenDataAction) => action.payload),
      switchMap((data) => {
        return this.whLeistungApiClient
          .getAnzahlOffenePendenzen(data).pipe(
            map(
              initdata =>
                new actions.GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetAnzahlOffenePendenzenInitDatas.GetAnzahlOffenePendenzenDataFailAction(error))
            ));
      })
    );

  // get message
  @Effect()
  getMessageData$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.GetMLMessageDataTypes.LOAD)
    .pipe(
      map((action: actions.GetMLMessageInitDatas.GetMLMessageDataAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.whLeistungApiClient
          .getMLMessage(query).pipe(
            map(
              initdata =>
                new actions.GetMLMessageInitDatas.GetMLMessageSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetMLMessageInitDatas.GetMLMessageDataFailAction(error))
            ));
      })
    );
  // get VorsaldoKbKostenstelleID
  @Effect()
  getVorsaldoKbKostenstelleID$ = this.actions$
    .ofType(actions.WhLeistungActionTypes.GetVorsaldoKbKostenstelleIDTypes.LOAD)
    .pipe(
      map((action: actions.VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDAction) => action.payload),
      switchMap((KbKostenstelleID: any) => {
        return this.whLeistungApiClient
          .getVorsaldoKbKostenstelle(KbKostenstelleID).pipe(
            map(
              initdata =>
                new actions.VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.VorsaldoKbKostenstelleID.VorsaldoKbKostenstelleIDFailAction(error))
            ));
      })
    );
}

