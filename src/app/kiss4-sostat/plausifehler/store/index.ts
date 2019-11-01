import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';
import * as fromplausifehlers from './reducers/plausifehler.reducer';
import { AppEnums } from '@shared/AppEnum';

export interface PlausifehlerState {
    Plausifehlers: fromplausifehlers.State;
}

export const reducers: ActionReducerMap<PlausifehlerState> = {
    Plausifehlers: fromplausifehlers.reducer
};

export const getPlausifehlerState = createFeatureSelector<PlausifehlerState>(
    AppEnums.FeatureModule.plausifehler
);

export const getPlausifehlersState = createSelector(
    getPlausifehlerState,
    (state: PlausifehlerState) => state.Plausifehlers
);

export const getPlausifehlersLoaded = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerDatenInit.getLoaded
);

export const getPlausifehlersLoading = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerDatenInit.getLoading
);

export const getPlausifehlersFailed = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerDatenInit.getFailed
);

export const getPlausifehlersData = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerDatenInit.getDatas
);
// searchData
export const getPlausifehlersSearchLoaded = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerSearchInit.getLoaded
);

export const getPlausifehlersSearchLoading = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerSearchInit.getLoading
);

export const getPlausifehlersSearchFailed = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerSearchInit.getFailed
);

export const getPlausifehlersSearchData = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPlausifehlerSearchInit.getDatas
);

// get Person
export const getPersonLoaded = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPersonInit.getLoaded
);

export const getPersonLoading = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPersonInit.getLoading
);

export const getPersonFailed = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPersonInit.getFailed
);

export const getPersonData = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getPersonInit.getDatas
);

// searchData
export const getMitarbeiterInLoaded = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getMitarbeiterInInit.getLoaded
);

export const getMitarbeiterInLoading = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getMitarbeiterInInit.getLoading
);

export const getMitarbeiterInFailed = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getMitarbeiterInInit.getFailed
);

export const getMitarbeiterInData = createSelector(
    getPlausifehlersState,
    fromplausifehlers.getMitarbeiterInInit.getDatas
);