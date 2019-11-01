import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromWhLeistung from './reducers/whleistung.reducers';

export interface WhLeistungState {
    whLeistungs: fromWhLeistung.State;
}

export const reducers: ActionReducerMap<WhLeistungState> = {
    whLeistungs: fromWhLeistung.reducer
};

export const getWhLeistungState = createFeatureSelector<WhLeistungState>(
    AppEnums.FeatureModule.whleistung
);

/**
* *********************************************************************
* get WhLeistung store functions
*
*/
/**
 * WhLeistung store functions
 */
export const getWhLeistung_State = createSelector(
    getWhLeistungState,
    (state: WhLeistungState) => state.whLeistungs
);


// Get data combobox
export const getComboboxLoaded = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxWhLeiStung.getLoaded
);
export const getComboboxLoading = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxWhLeiStung.getLoading
);
export const getComboboxFailed = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxWhLeiStung.getFailed
);
export const getComboboxgData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxWhLeiStung.getDatas
);

// get data combobox BFS
export const getComboboxBFSData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxBFSWhLeiStung.getDatas
);

// get data cbx Geme
export const getComboboxGemeData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxGemeWhLeiStung.getDatas
);

//  get data cbx Bottom
export const getComboboxBottomData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getComboboxBottomWhLeiStung.getDatas
);

//  get data cbx Bottom
export const getTopData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getTopWhLeiStung.getDatas
);

// get data grid bottom
export const getGridBottomData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getBottomDataGridWhLeiStung.getDatas
);

//  count Data

export const countData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.countDataWhLeiStung.getDatas
);

//  Delete
export const deleteData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.deleteDataWhLeiStung.getDatas
);

// Update

export const updateData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.updateDataWhLeiStung.getDatas
);

// Update Vorsaldo

export const updateVorsaldoData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.updateVorsaldoDataWhLeiStung.getDatas
);

// GetAnzahlOffenePendenzen

export const getAnzahlOffenePendenzenData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getAnzahlOffenePendenzen.getDatas
);

// GetMLMessage

export const getMLMessageData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getMLMessage.getDatas
);
// Get VorsaldoKbKostenstelleID

export const getVorsaldoKbKostenstelleIDData = createSelector(
    getWhLeistung_State,
    fromWhLeistung.getVorsaldoKbKostenstelleID.getDatas
);
