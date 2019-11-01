export interface IMietvertrag {
    baMietvertragID: number;
    datumVon?: Date;
    datumBis?: Date;
    mietkosten?: number;
    nebenkosten?: number;
    kostenanteilUE?: number;
    mietdepot?: number;
    baInstitutionID?: number;
    bemerkung: string;
    baMietvertragTS: any;
    baPersonID?: number;
    garantieBis?: Date;
    mieteAbgetreten?: boolean;
    mietzinsgarantie?: number;
    vermieter: string;
}

export class Mietvertrag implements IMietvertrag {
    baMietvertragID: number;
    datumVon?: Date;
    datumBis?: Date;
    mietkosten?: number;
    nebenkosten?: number;
    kostenanteilUE?: number;
    mietdepot?: number;
    baInstitutionID?: number;
    bemerkung: string;
    baMietvertragTS: any;
    baPersonID?: number;
    garantieBis?: Date;
    mieteAbgetreten?: boolean;
    mietzinsgarantie?: number;
    vermieter: string;

    constructor(data?: IMietvertrag) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
