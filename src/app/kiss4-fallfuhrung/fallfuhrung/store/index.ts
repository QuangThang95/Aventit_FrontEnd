import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromFallfuhrung from './reducers/fallfuhrung.reducer';

export interface FallfuhrungState {
    fallfuhrungs: fromFallfuhrung.State;
}

export const reducers: ActionReducerMap<FallfuhrungState> = {
    fallfuhrungs: fromFallfuhrung.reducer
};

export const getFallfuhrungState = createFeatureSelector<FallfuhrungState>(
    AppEnums.FeatureModule.fallfuhrung
);

export const getFallfuhrungsState = createSelector(
    getFallfuhrungState,
    (state: FallfuhrungState) => state.fallfuhrungs
);
/***** Load data fallfuhrung *****/
export const getFallfuhrungLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallfuhrungInit.getLoaded
);

export const getFallfuhrungLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallfuhrungInit.getLoading
);
export const getFallfuhrungFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallfuhrungInit.getFailed
);
export const getFallfuhrungData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallfuhrungInit.getDatas
);
/***** The End Load data fallfuhrung *****/

/***** Load data config *****/
export const getConfigLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getConfigData.getLoaded
);

export const getConfigLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getConfigData.getLoading
);
export const getConfigFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getConfigData.getFailed
);
export const getConfigData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getConfigData.getDatas
);
/***** Load data config *****/

/***** Load data fall rights *****/
export const getFallRightsLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallRightsData.getLoaded
);

export const getFallRightsLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallRightsData.getLoading
);
export const getFallRightsFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallRightsData.getFailed
);
export const getFallRightsData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getFallRightsData.getDatas
);
/***** Load data fall rights  *****/

/***** Load data Kontaktveranl *****/
export const getKontaktveranlLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getKontaktveranlData.getLoaded
);

export const getKontaktveranlLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getKontaktveranlData.getLoading
);
export const getKontaktveranlFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getKontaktveranlData.getFailed
);
export const getKontaktveranlData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getKontaktveranlData.getDatas
);
/***** Load data Kontaktveranl  *****/

/***** Load data Grund *****/
export const getGrundLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGrundData.getLoaded
);

export const getGrundLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGrundData.getLoading
);
export const getGrundFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGrundData.getFailed
);
export const getGrundData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGrundData.getDatas
);
/***** Load data Grund  *****/

/***** Load data Gemeinde *****/
export const getGemeindeLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGemeindeData.getLoaded
);

export const getGemeindeLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGemeindeData.getLoading
);
export const getGemeindeFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGemeindeData.getFailed
);
export const getGemeindeData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getGemeindeData.getDatas
);
/***** Load data Gemeinde  *****/

/*****  Update FaLeistung *****/
export const updateFaLeistungUpdated = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.updateFaLeistungData.getUpdated
);

export const updateFaLeistungUpdating = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.updateFaLeistungData.getUpdating
);
export const updateFaLeistungFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.updateFaLeistungData.getFailed
);
export const updateFaLeistungData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.updateFaLeistungData.getDatas
);
/*****  Update FaLeistung  *****/

/***** Load data Anmeldeart *****/
export const getAnmeldeartLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnmeldeartData.getLoaded
);

export const getAnmeldeartLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnmeldeartData.getLoading
);
export const getAnmeldeartFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnmeldeartData.getFailed
);
export const getAnmeldeartData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnmeldeartData.getDatas
);
/***** Load data Anmeldeart  *****/



/***** Load data AnzahlOffenePendenzen *****/
export const getAnzahlOffenePendenzenLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnzahlOffenePendenzenData.getLoaded
);
export const getAnzahlOffenePendenzenLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnzahlOffenePendenzenData.getLoading
);
export const getAnzahlOffenePendenzenFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnzahlOffenePendenzenData.getFailed
);
export const getAnzahlOffenePendenzenData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getAnzahlOffenePendenzenData.getDatas
);
/***** Load data AnzahlOffenePendenzen  *****/

/***** Load data ValidationFaLeistung *****/
export const getValidationFaLeistungLoaded = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getValidationFaLeistungData.getLoaded
);

export const getValidationFaLeistungLoading = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getValidationFaLeistungData.getLoading
);
export const getValidationFaLeistungFailed = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getValidationFaLeistungData.getFailed
);
export const getValidationFaLeistungData = createSelector(
    getFallfuhrungsState,
    fromFallfuhrung.getValidationFaLeistungData.getDatas
);
/***** Load data ValidationFaLeistung  *****/