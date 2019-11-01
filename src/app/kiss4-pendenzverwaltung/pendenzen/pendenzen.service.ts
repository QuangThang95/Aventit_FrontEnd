import { Injectable } from '@angular/core';
import {
    PendenzenVerwaltung,
    VwUser,
    XLOVCode,
    XOrgUnit,
    Pendenzgruppe,
    TreeNav,
    Falltraeger,
    BetriffPerson,
    BetreffBeschreibung,
    ModulenStatus,
    StatusEdit,
    ErfassungMutation
} from './models';

@Injectable()
export class PendenzenService {
    /**
     * Transforms grid data pendenzenVerwaltungs recieved from the API into array of 'PendenzenVerwaltung' instances
     *
     * @param pendenzenVerwaltungs
     */
    static gridAdapter(pendenzenVerwaltungs: any): Array<any> {
        return pendenzenVerwaltungs.map(
            pendenzenVerwaltung => new PendenzenVerwaltung(pendenzenVerwaltung)
        );
    }

    /**
     * Post new PendenzenVerwaltung
     * @param pendenzenVerwaltung: PendenzenVerwaltung
     */
    static insertPendenzenVerwaltungAdapter(
        pendenzenVerwaltung: any
    ): PendenzenVerwaltung {
        return new PendenzenVerwaltung(pendenzenVerwaltung);
    }

    /**
     * Update PendenzenVerwaltung
     * @param pendenzenVerwaltung: PendenzenVerwaltung
     */
    static updatePendenzenVerwaltungAdapter(
        pendenzenVerwaltung: any
    ): PendenzenVerwaltung {
        return new PendenzenVerwaltung(pendenzenVerwaltung);
    }

    static getStatusEditButtonAdapter(statusEdit: any): any {
        return new StatusEdit(statusEdit);
    }

    static getTreeNavigatorAdapter(treeNavigators: any): Array<any> {
        return treeNavigators.map(treeNavigator => new TreeNav(treeNavigator));
    }

    static getModulenStatusAdapter(modulenstatus: any): Array<any> {
        return modulenstatus.map(modulenst => new ModulenStatus(modulenst));
    }

    static getStatusAdapter(status: any): Array<any> {
        return status.map(st => new XLOVCode(st));
    }

    static getTypeAdapter(types: any): Array<any> {
        return types.map(type => new XLOVCode(type));
    }

    static getOrgUnitAdapter(organisations: any): Array<any> {
        return organisations.map(organisation => new XOrgUnit(organisation));
    }

    static getLeistungsverantAdapter(leistungsverantws: any): Array<any> {
        return leistungsverantws.map(
            leistungsverantw => new VwUser(leistungsverantw)
        );
    }

    static getLeistungsverantwAdapter(leistungsverantws: any): Array<any> {
        return leistungsverantws.map(
            leistungsverantw => new VwUser(leistungsverantw)
        );
    }

    static getLeistungAdapter(leistungs: any): Array<any> {
        return leistungs.map(leistung => new VwUser(leistung));
    }

    static getErstellerEmpfaengerAdapter(erstellerEmpfaengers: any): Array<any> {
        return erstellerEmpfaengers.map(
            erstellerEmpfaenger => new Pendenzgruppe(erstellerEmpfaenger)
        );
    }

    static getFalltraegerAdapter(falltraegers: any): Array<any> {
        return falltraegers.map(falltraeger => new Falltraeger(falltraeger));
    }

    static getBetriffPersonAdapter(betriffpersons: any): Array<any> {
        return betriffpersons.map(
            betriffperson => new BetriffPerson(betriffperson)
        );
    }

    static getInitItemAdapter(item: any): any {
        return new BetriffPerson(item);
    }

    static getErfassungMutationAdapter(
        erfassungmutation: any
    ): ErfassungMutation {
        return new ErfassungMutation(erfassungmutation);
    }

    static getBetreffBeschreibungAdapter(betreffbeschreibungs: any): Array<any> {
        return betreffbeschreibungs.map(
            betreffbeschreibung => new BetreffBeschreibung(betreffbeschreibung)
        );
    }

    static getMastereAdapter(getMaster: any): any {
        return getMaster;
        return getMaster.status;
    }
}
