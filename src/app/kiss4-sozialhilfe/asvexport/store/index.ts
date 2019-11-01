import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromAsvexportes from './reducers/asvexport.reducer';

import { AppEnums } from '@shared/AppEnum';
export interface AsvexportState {
    Asvexportes: fromAsvexportes.State;
}

export const reducers: ActionReducerMap<AsvexportState> = {
    Asvexportes: fromAsvexportes.reducer
};

export const getAsvexportState = createFeatureSelector<AsvexportState>(
    AppEnums.FeatureModule.asvexport
);

export const getAsvexportsState = createSelector(
    getAsvexportState,
    (state: AsvexportState) => state.Asvexportes

);
/***** Load data for top grid *****/
export const getAsvexportesLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvexportInit.getLoaded
);

export const getAsvexportesLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvexportInit.getLoading
);
export const getAsvexportesFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvexportInit.getFailed
);
export const getAsvexportesData = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvexportInit.getDatas
);
/***** The End Load data for top grid *****/

/***** Load data for bottom grid *****/
export const getAsvEintrageLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvEintrageData.getLoaded
);
export const getAsvEintrageLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvEintrageData.getLoading
);
export const getAsvEintrageFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvEintrageData.getFailed
);
export const getAsvEintrageData = createSelector(
    getAsvexportsState,
    fromAsvexportes.getAsvEintrageData.getDatas
);
/***** The End Load data for bottom grid *****/

/**
* *****************************************************************
* Load File Binary Data
* Author:DNDUC
* *****************************************************************
*/

export const getFileBinaryDataLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.getFileBinaryData.getLoaded
);
export const getFileBinaryDataLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.getFileBinaryData.getLoading
);
export const getFileBinaryDataFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.getFileBinaryData.getFailed
);
export const getFileBinaryData = createSelector(
    getAsvexportsState,
    fromAsvexportes.getFileBinaryData.getDatas
);
/***** The End Load File Binary Data*****/

/**
* *****************************************************************
* Get XOrgUnit
* Author:DNDUC
* *****************************************************************
*/

export const getXOrgUnitsDataLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.getXOrgUnitsData.getLoaded
);
export const getXOrgUnitsDataLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.getXOrgUnitsData.getLoading
);
export const getXOrgUnitsDataFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.getXOrgUnitsData.getFailed
);
export const getXOrgUnitsData = createSelector(
    getAsvexportsState,
    fromAsvexportes.getXOrgUnitsData.getDatas
);
/***** The End Get XOrgUnit*****/

/**
* *****************************************************************
* Insert SstASVS Export
* Author:DNDUC
* *****************************************************************
*/

export const insertSstASVSExportDataLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.insertSstASVSExportData.getLoaded
);
export const insertSstASVSExportDataLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.insertSstASVSExportData.getLoading
);
export const insertSstASVSExportDataFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.insertSstASVSExportData.getFailed
);
export const insertSstASVSExportData = createSelector(
    getAsvexportsState,
    fromAsvexportes.insertSstASVSExportData.getDatas
);
/***** The End Insert SstASVS Export*****/

/**
* *****************************************************************
* Update SstASVS Export
* Author:DNDUC
* *****************************************************************
*/

export const updateSstASVSExportDataLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportData.getLoaded
);
export const updateSstASVSExportDataLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportData.getLoading
);
export const updateSstASVSExportDataFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportData.getFailed
);
export const updateSstASVSExportData = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportData.getDatas
);
/***** The End Update SstASVS Export*****/

/**
* *****************************************************************
* Update SstASVS Export Transaction
* Author:DNDUC
* *****************************************************************
*/

export const updateSstASVSExportTransactionDataLoaded = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportTransactionData.getLoaded
);
export const updateSstASVSExportTransactionDataLoading = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportTransactionData.getLoading
);
export const updateSstASVSExportTransactionDataFailed = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportTransactionData.getFailed
);
export const updateSstASVSExportTransactionData = createSelector(
    getAsvexportsState,
    fromAsvexportes.updateSstASVSExportTransactionData.getDatas
);
/***** The End Update SstASVS Transaction Export*****/

