import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromFallNavs from './reducers/fall-navigator.reducers';
import { AppEnums } from '@shared/AppEnum';

export interface FallNavNavState {
    fallNavs: fromFallNavs.State;
}

export const reducers: ActionReducerMap<FallNavNavState> = {
    fallNavs: fromFallNavs.reducer,
};

export const getFallNavNavState = createFeatureSelector<FallNavNavState>(
    AppEnums.FeatureModule.fallnavigator
);

/**
 * *********************************************************************
 * get Trees Fall Navigator
 *
 */
export const selectFallNavsTreeState = createSelector(
    getFallNavNavState,
    (state: FallNavNavState) => state.fallNavs
);

export const getFallNavTreesLoaded = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.getFallNavsLoaded
);
export const getFallNavTreesLoading = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.getFallNavsLoading
);
export const getFallNavTreesFailed = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.getFallNavsFailed
);
export const getFallNavTreesData = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.selectFallNavsTrees
);
export const getFiltersFallNav = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.getFilters
);
export const getConfigsFallNav = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.getConfigs
);
export const getHeadersFallNav = createSelector(
    selectFallNavsTreeState,
    fromFallNavs.getHeaders
);
