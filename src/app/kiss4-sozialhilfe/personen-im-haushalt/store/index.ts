import {ActionReducerMap, createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromPersonenImHaushalt from './reducers/personen-im-haushalt.reducers';
import {AppEnums} from '@shared/AppEnum';

export interface IPersonenImHaushaltState {
    personenImHaushalts: fromPersonenImHaushalt.IState;
}

export const reducers: ActionReducerMap<IPersonenImHaushaltState> = {
    personenImHaushalts: fromPersonenImHaushalt.reducer
};

export const getIPersonenImHaushaltState = createFeatureSelector<IPersonenImHaushaltState>(
    AppEnums.FeatureModule.personenimhaushalt
);

/**
* *********************************************************************
* get personen-im-haushalt store functions
*
*/
/**
 * personen-im-haushalt store functions
 */
export const getPersonenImHaushaltStore_State = createSelector(
    getIPersonenImHaushaltState,
    (state: IPersonenImHaushaltState) => state.personenImHaushalts
);

export const getPersonenImHaushaltStoreLoaded = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonenImHaushalt.getLoaded
);
export const getPersonenImHaushaltStoreLoading = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonenImHaushalt.getLoading
);
export const getPersonenImHaushaltStoreFailed = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonenImHaushalt.getFailed
);
export const getPersonenImHaushaltStoreData = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonenImHaushalt.getData
);
export const getPersonenImHaushaltStore = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonenImHaushalt.getPersonenImHaushalt
);
export const getPersonenImHaushaltStoreQuery = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonenImHaushalt.getQuery
);

/**
* *********************************************************************
* get personen Data
*
*/
export const getPersonenLoading = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonen.getLoading
);
export const getPersonenLoaded = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonen.getLoaded
);
export const getPersonenFailed = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonen.getFailed
);
export const getPersonenData = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getPersonen.getData
);

/**
* *********************************************************************
* get WhKennzahlen Data
*
*/
export const getWhKennzahlenLoading = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getWhKennzahlen.getLoading
);
export const getWhKennzahlenLoaded = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getWhKennzahlen.getLoaded
);
export const getWhKennzahlenFailed = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getWhKennzahlen.getFailed
);
export const getWhKennzahlenData = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getWhKennzahlen.getData
);

/**
* *********************************************************************
* get Klientensystem Data
*
*/
export const getKlientenSystemLoading = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getKlientenSystem.getLoading
);
export const getKlientenSystemLoaded = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getKlientenSystem.getLoaded
);
export const getKlientenSystemFailed = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getKlientenSystem.getFailed
);
export const getKlientenSystemData = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getKlientenSystem.getData
);

/**
* *********************************************************************
* get Haushalt Data
*
*/
export const getHaushaltLoading = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getHaushalt.getLoading
);
export const getHaushaltLoaded = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getHaushalt.getLoaded
);
export const getHaushaltFailed = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getHaushalt.getFailed
);
export const getHaushaltData = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.getHaushalt.getData
);

/**
* *********************************************************************
* Put Personen Im Haushalt Data
*
*/
export const getPersonenImHaushaltUpdateData = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.putPersonenImHaushalt.getRespone
);

export const getPersonenImHaushaltUpdating = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.putPersonenImHaushalt.getUpdating
);
export const getPersonenImHaushaltUpdatedSuccess = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.putPersonenImHaushalt.getUpdated
);
export const getPersonenImHaushaltUpdatedFaild = createSelector(
    getPersonenImHaushaltStore_State,
    fromPersonenImHaushalt.putPersonenImHaushalt.getUpdateFail
);
