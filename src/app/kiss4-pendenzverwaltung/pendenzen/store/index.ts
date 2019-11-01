import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromPendenzens from './reducers/pendenzens.reducer';

import { AppEnums } from '@shared/AppEnum';

export interface PendenzenState {
    pendenzens: fromPendenzens.State;
}

export const reducers: ActionReducerMap<PendenzenState> = {
    pendenzens: fromPendenzens.reducer
};

export const getPendenzensState = createFeatureSelector<PendenzenState>(
    AppEnums.FeatureModule.pendenzen
);

/**
* *********************************************************************
* get Pendenzens store functions
*
*/
/**
 * PendenzenVerwaltung store functions
 */
export const getPendenzenVerwaltungsState = createSelector(
    getPendenzensState,
    (state: PendenzenState) => state.pendenzens
);

export const getPendenzenVerwaltungsLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getLoaded
);
export const getPendenzenVerwaltungsLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getLoading
);
export const getPendenzenVerwaltungsFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getFailed
);
export const getPendenzenVerwaltungsData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getDatas
);
export const getPendenzenVerwaltung = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getPendenzenVerwaltung
);
export const getPendenzenVerwaltungAdding = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getAdding
);
export const getPendenzenVerwaltungAdded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getAdded
);
export const getPendenzenVerwaltungQuery = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltung.getQuery
);

/**
* *********************************************************************
* get PendenzenVerwaltung Status
*
*/
export const getPendenzenVerwaltungStatusLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenStatus.getLoading
);
export const getPendenzenVerwaltungStatusLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenStatus.getLoaded
);
export const getPendenzenVerwaltungStatusFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenStatus.getFailed
);
export const getPendenzenVerwaltungStatusData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenStatus.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Type
*
*/
export const getPendenzenVerwaltungTypeLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenWithType.getLoading
);
export const getPendenzenVerwaltungTypeLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenWithType.getLoaded
);
export const getPendenzenVerwaltungTypeFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenWithType.getFailed
);
export const getPendenzenVerwaltungTypeData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenWithType.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Organisation
*
*/
export const getPendenzenVerwaltungOrganisationLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenOrganisation.getLoading
);
export const getPendenzenVerwaltungOrganisationLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenOrganisation.getLoaded
);
export const getPendenzenVerwaltungOrganisationFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenOrganisation.getFailed
);
export const getPendenzenVerwaltungOrganisationData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenOrganisation.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Leistungsverant
*
*/
export const getPendenzenVerwaltungLeistungsverantLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantws.getLoading
);
export const getPendenzenVerwaltungLeistungsverantLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantws.getLoaded
);
export const getPendenzenVerwaltungLeistungsverantFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantws.getFailed
);
export const getPendenzenVerwaltungLeistungsverantData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantws.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Leistungsverantw
*
*/
export const getPendenzenVerwaltungLeistungsverantwLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantw.getLoading
);
export const getPendenzenVerwaltungLeistungsverantwLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantw.getLoaded
);
export const getPendenzenVerwaltungLeistungsverantwFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantw.getFailed
);
export const getPendenzenVerwaltungLeistungsverantwData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungsverantw.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung ErstellerEmpfaenger
*
*/
export const getPendenzenVerwaltungErstellerEmpfaengerLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenErstellerEmpfaenger.getLoading
);
export const getPendenzenVerwaltungErstellerEmpfaengerLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenErstellerEmpfaenger.getLoaded
);
export const getPendenzenVerwaltungErstellerEmpfaengerFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenErstellerEmpfaenger.getFailed
);
export const getPendenzenVerwaltungErstellerEmpfaengerData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenErstellerEmpfaenger.getDatas
);

/**
* *********************************************************************
* get Trees PendenzenVerwaltung Navigator
*
*/
export const getPendenzenVerwaltungTreesLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungNavTree.getLoaded
);
export const getPendenzenVerwaltungTreesLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungNavTree.getLoading
);
export const getPendenzenVerwaltungTreesFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungNavTree.getFailed
);
export const getPendenzenVerwaltungTreesData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungNavTree.getDatas
);
export const getPendenzenVerwaltungTreeDetail = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungNavTree.getTreeDetail
);

/**
* *********************************************************************
* get PendenzenVerwaltung Leistung
*
*/
export const getPendenzenVerwaltungLeistungLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungs.getLoading
);
export const getPendenzenVerwaltungLeistungLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungs.getLoaded
);
export const getPendenzenVerwaltungLeistungFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungs.getFailed
);
export const getPendenzenVerwaltungLeistungData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenLeistungs.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Falltraeger
*
*/
export const getPendenzenVerwaltungFalltraegerLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungFalltraegers.getLoading
);
export const getPendenzenVerwaltungFalltraegerLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungFalltraegers.getLoaded
);
export const getPendenzenVerwaltungFalltraegerFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungFalltraegers.getFailed
);
export const getPendenzenVerwaltungFalltraegerData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungFalltraegers.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung BetriffPerson
*
*/
export const getPendenzenVerwaltungBetriffPersonLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetriffPersons.getLoading
);
export const getPendenzenVerwaltungBetriffPersonLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetriffPersons.getLoaded
);
export const getPendenzenVerwaltungBetriffPersonFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetriffPersons.getFailed
);
export const getPendenzenVerwaltungBetriffPersonData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetriffPersons.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung BetreffBeschreibung
*
*/
export const getPendenzenVerwaltungBetreffBeschreibungLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetreffBeschreibungs.getLoading
);
export const getPendenzenVerwaltungBetreffBeschreibungLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetreffBeschreibungs.getLoaded
);
export const getPendenzenVerwaltungBetreffBeschreibungFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetreffBeschreibungs.getFailed
);
export const getPendenzenVerwaltungBetreffBeschreibungData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenBetreffBeschreibungs.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung InitData
*
*/
export const getPendenzenVerwaltungInitDataLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenInit.getLoading
);
export const getPendenzenVerwaltungInitDataLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenInit.getLoaded
);
export const getPendenzenVerwaltungInitDataFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenInit.getFailed
);
export const getPendenzenVerwaltungInitData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenInit.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung ModulenStatus
*
*/
export const getPendenzenVerwaltungModulenStatusLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungModulenStatus.getLoading
);
export const getPendenzenVerwaltungModulenStatusLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungModulenStatus.getLoaded
);
export const getPendenzenVerwaltungModulenStatusFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungModulenStatus.getFailed
);
export const getPendenzenVerwaltungModulenStatusData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungModulenStatus.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Status Edit
*
*/
export const getPendenzenVerwaltungStatusEditLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungStatusEdit.getLoading
);
export const getPendenzenVerwaltungStatusEditLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungStatusEdit.getLoaded
);
export const getPendenzenVerwaltungStatusEditFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungStatusEdit.getFailed
);
export const getPendenzenVerwaltungStatusEditData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungStatusEdit.getDatas
);

/**
* *********************************************************************
* get PendenzenVerwaltung Erfassung Mutation
*
*/
export const getPendenzenVerwaltungErfassungMutationLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungErfassungMutation.getLoading
);
export const getPendenzenVerwaltungErfassungMutationLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungErfassungMutation.getLoaded
);
export const getPendenzenVerwaltungErfassungMutationFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungErfassungMutation.getFailed
);
export const getPendenzenVerwaltungErfassungMutationData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungErfassungMutation.getDatas
);


/**
* *********************************************************************
* get PendenzenVerwaltung Get Master
*
*/
export const getPendenzenVerwaltungGetMasterLoading = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungGetMaster.getLoading
);
export const getPendenzenVerwaltungGetMasterLoaded = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungGetMaster.getLoaded
);
export const getPendenzenVerwaltungGetMasterFailed = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungGetMaster.getFailed
);
export const getPendenzenVerwaltungGetMasterData = createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungGetMaster.getDatas
);
console.log(createSelector(
    getPendenzenVerwaltungsState,
    fromPendenzens.getPendenzenVerwaltungGetMaster.getDatas
));
