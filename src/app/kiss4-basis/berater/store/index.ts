import { AppEnums } from '@shared/AppEnum';
import {ActionReducerMap, createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromBerater from './reducers/berater.reducers';

export interface BeraterState {
  berater: fromBerater.State;
}

export const reducers: ActionReducerMap<BeraterState> = {
  berater: fromBerater.reducer
};

export const getBeraterState = createFeatureSelector<BeraterState>(
  AppEnums.FeatureModule.berater
);

export const getBerater_State = createSelector(
  getBeraterState,
  (state: BeraterState) => state.berater
);

export const getBeraterDataLoading = createSelector(
  getBerater_State,
  fromBerater.getBerater.getLoading
);
export const getBeraterDataLoaded = createSelector(
  getBerater_State,
  fromBerater.getBerater.getLoaded
);
export const getBeraterDataFailed = createSelector(
  getBerater_State,
  fromBerater.getBerater.getFailed
);
export const getBeraterData = createSelector(
  getBerater_State,
  fromBerater.getBerater.getDatas
);
// VDHoan GetKontakt
export const getBeraterKontaktLoading = createSelector(
  getBerater_State,
  fromBerater.getKontakt.getLoading
);
export const getBeraterKontaktLoaded = createSelector(
  getBerater_State,
  fromBerater.getKontakt.getLoaded
);
export const getBeraterKontaktFailed = createSelector(
  getBerater_State,
  fromBerater.getKontakt.getFailed
);
export const getBeraterKontakt = createSelector(
  getBerater_State,
  fromBerater.getKontakt.getDatas
);
// VDHoan GetInstitution
export const getBeraterInstitutionLoading = createSelector(
  getBerater_State,
  fromBerater.getInstitution.getLoading
);
export const getBeraterInstitutionLoaded = createSelector(
  getBerater_State,
  fromBerater.getInstitution.getLoaded
);
export const getBeraterInstitutionFailed = createSelector(
  getBerater_State,
  fromBerater.getInstitution.getFailed
);
export const getBeraterInstitution = createSelector(
  getBerater_State,
  fromBerater.getInstitution.getDatas
);
// VDHoan GetLanguage
export const getBeraterLanguageLoading = createSelector(
  getBerater_State,
  fromBerater.getLanguage.getLoading
);
export const getBeraterLanguageLoaded = createSelector(
  getBerater_State,
  fromBerater.getLanguage.getLoaded
);
export const getBeraterLanguageFailed = createSelector(
  getBerater_State,
  fromBerater.getLanguage.getFailed
);
export const getBeraterLanguage = createSelector(
  getBerater_State,
  fromBerater.getLanguage.getDatas
);
// VDHoan SaveBaInstitutionKontakt
export const getBeraterSaveKontaktLoading = createSelector(
  getBerater_State,
  fromBerater.getSaveKontakt.getLoading
);
export const getBeraterSaveKontaktLoaded = createSelector(
  getBerater_State,
  fromBerater.getSaveKontakt.getLoaded
);
export const getBeraterSaveKontaktFailed = createSelector(
  getBerater_State,
  fromBerater.getSaveKontakt.getFailed
);
export const getBeraterSaveKontakt = createSelector(
  getBerater_State,
  fromBerater.getSaveKontakt.getDatas
);
// VDHoan DeleteBaInstitutionKontakt
export const getBeraterDelKontaktLoading = createSelector(
  getBerater_State,
  fromBerater.getDelKontakt.getLoading
);
export const getBeraterDelKontaktLoaded = createSelector(
  getBerater_State,
  fromBerater.getDelKontakt.getLoaded
);
export const getBeraterDelKontaktFailed = createSelector(
  getBerater_State,
  fromBerater.getDelKontakt.getFailed
);
export const getBeraterDelKontakt = createSelector(
  getBerater_State,
  fromBerater.getDelKontakt.getDatas
);
