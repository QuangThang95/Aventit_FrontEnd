// model for Top grid
export interface IBarPerSon {
    baPersonID: number;
    erwerbssituationStatus1Code?: number;
    erwerbssituationStatus2Code?: number;
    erwerbssituationStatus3Code?: number;
    erwerbssituationStatus4Code?: number;
    beschaeftigungsGradCode?: number;
    grundTeilzeitarbeit1Code?: number;
    grundTeilzeitarbeit2Code?: number;
    brancheCode?: number;
    erlernterBerufCode?: number;
    berufCode?: number;
    baInstitutionID?: number;
    hoechsteAusbildungCode?: number;
    abgebrochenAusbildungCode?: number;
    anstellungCode?: number;
    arbeitszeit?: any;
    isVariableArbeitszeit: boolean;
    stempelDatum?: any;
    wieOftArbeitslos?: any;
    ausgesteuertUnbekanntCode?: number;
    ausgesteuertDatum?: any;
    bemerkung: number;
    baArbeitAusbildungTS: string;
    integrationsstandCode?: number;
    finanziellUnabhaengig: number;
    beruf: string;
    erlernterBeruf: string;
    arbeitgeber: string;
    geschlechtCode?: number;
}

export class BarPerSon implements IBarPerSon {
    baPersonID: number;
    erwerbssituationStatus1Code?: number;
    erwerbssituationStatus2Code?: number;
    erwerbssituationStatus3Code?: number;
    erwerbssituationStatus4Code?: number;
    beschaeftigungsGradCode?: number;
    grundTeilzeitarbeit1Code?: number;
    grundTeilzeitarbeit2Code?: number;
    brancheCode?: number;
    erlernterBerufCode?: number;
    berufCode?: number;
    baInstitutionID?: number;
    hoechsteAusbildungCode?: number;
    abgebrochenAusbildungCode?: number;
    anstellungCode?: number;
    arbeitszeit?: any;
    isVariableArbeitszeit: boolean;
    stempelDatum?: any;
    wieOftArbeitslos?: any;
    ausgesteuertUnbekanntCode?: number;
    ausgesteuertDatum?: any;
    bemerkung: number;
    baArbeitAusbildungTS: string;
    integrationsstandCode?: number;
    finanziellUnabhaengig: number;
    beruf: string;
    erlernterBeruf: string;
    arbeitgeber: string;
    geschlechtCode?: number;
    constructor(data?: IBarPerSon) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface ILOVName {
    code: number;
    text: string;
    lovname: string;
    shortText: number;
    value1: string;
    value2: string;
    value3: string;
    sortKey: number;
    isActive: number;
}

export class LOVName implements ILOVName {
    code: number;
    text: string;
    lovname: string;
    shortText: number;
    value1: string;
    value2: string;
    value3: string;
    sortKey: number;
    isActive: number;
    constructor(data?: ILOVName) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IBerufSuchen {
    baBerufID: number;
    text: string;
}

export class BerufSuchen implements IBerufSuchen {
    baBerufID: number;
    text: string;
    constructor(data?: IBerufSuchen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IinstitutionSuchen {
    baInstitutionID: number;
    name: string;
    adresse: string;
    typen: string;
}

export class InstitutionSuchen implements IinstitutionSuchen {
    baInstitutionID: number;
    name: string;
    adresse: string;
    typen: string;
    constructor(data?: IinstitutionSuchen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
