import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromVorlagenKontext from './reducers/vorlagen-kontext.reducer';

export interface VorlagenKontextState {
  vorlagenKontext: fromVorlagenKontext.State;
}

export const reducers: ActionReducerMap<VorlagenKontextState> = {
  vorlagenKontext: fromVorlagenKontext.reducer
};

export const getVorlagenKontextState = createFeatureSelector<VorlagenKontextState>(
  AppEnums.FeatureModule.vorlagenKontext
);

export const getVorlagenKontext_State = createSelector(
  getVorlagenKontextState,
  (state: VorlagenKontextState) => state.vorlagenKontext
);

/**
 * get VorlagenKontext XDocContextAll
 */
export const getVorlagenKontextXDocContextAllLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getXDocContextAll.getLoading
);
export const getVorlagenKontextXDocContextAllLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getXDocContextAll.getLoaded
);
export const getVorlagenKontextXDocContextAllFailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getXDocContextAll.getFailed
);
export const getVorlagenKontextXDocContextAll = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getXDocContextAll.getData
);

/**
 * get VorlagenKontext ZugeteiltByDocContextID
 */
export const getVorlagenKontextZugeteiltByDocContextIDLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getZugeteiltByDocContextID.getLoading
);
export const getVorlagenKontextZugeteiltByDocContextIDLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getZugeteiltByDocContextID.getLoaded
);
export const getVorlagenKontextZugeteiltByDocContextIDLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getZugeteiltByDocContextID.getFailed
);
export const getVorlagenKontextZugeteiltByDocContextID = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getZugeteiltByDocContextID.getData
);

/**
 * get VorlagenKontext VerfuegbarByDocContextID
 */
export const getVorlagenKontextVerfuegbarByDocContextIDLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getVerfuegbarByDocContextID.getLoading
);
export const getVorlagenKontextVerfuegbarByDocContextIDLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getVerfuegbarByDocContextID.getLoaded
);
export const getVorlagenKontextVerfuegbarByDocContextIDLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getVerfuegbarByDocContextID.getFailed
);
export const getVorlagenKontextVerfuegbarByDocContextID = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.getVerfuegbarByDocContextID.getData
);

/**
 * get VorlagenKontext InsertXDocContext
 */
export const getVorlagenKontextInsertXDocContextLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext.getLoading
);
export const getVorlagenKontextInsertXDocContextLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext.getLoaded
);
export const getVorlagenKontextInsertXDocContextLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext.getFailed
);
export const getVorlagenKontextInsertXDocContext = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext.getData
);

/**
 * get VorlagenKontext UpdateXDocContext
 */
export const getVorlagenKontextUpdateXDocContextLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.updateXDocContext.getLoading
);
export const getVorlagenKontextUpdateXDocContextLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.updateXDocContext.getLoaded
);
export const getVorlagenKontextUpdateXDocContextLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.updateXDocContext.getFailed
);
export const getVorlagenKontextUpdateXDocContext = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.updateXDocContext.getData
);

/**
 * get VorlagenKontext DeleteXDocContext
 */
export const getVorlagenKontextDeleteXDocContextLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.deleteXDocContext.getLoading
);
export const getVorlagenKontextDeleteXDocContextLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.deleteXDocContext.getLoaded
);
export const getVorlagenKontextDeleteXDocContextLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.deleteXDocContext.getFailed
);
export const getVorlagenKontextDeleteXDocContext = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.deleteXDocContext.getData
);

/**
 * get VorlagenKontext CountXDocContext_TemplateByDocContextID
 */
export const getVorlagenKontextCountXDocContext_TemplateByDocContextIDLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.countXDocContext_TemplateByDocContextID.getLoading
);
export const getVorlagenKontextCountXDocContext_TemplateByDocContextIDLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.countXDocContext_TemplateByDocContextID.getLoaded
);
export const getVorlagenKontextCountXDocContext_TemplateByDocContextIDLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.countXDocContext_TemplateByDocContextID.getFailed
);
export const getVorlagenKontextCountXDocContext_TemplateByDocContextID = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.countXDocContext_TemplateByDocContextID.getData
);


/**
 * get VorlagenKontext InsertXDocContext_Template
 */
export const getVorlagenKontextInsertXDocContext_TemplateLoading = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext_Template.getLoading
);
export const getVorlagenKontextInsertXDocContext_TemplateLoaded = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext_Template.getLoaded
);
export const getVorlagenKontextInsertXDocContext_TemplateLailed = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext_Template.getFailed
);
export const getVorlagenKontextInsertXDocContext_Template = createSelector(
  getVorlagenKontext_State,
  fromVorlagenKontext.insertXDocContext_Template.getData
);
