export interface IvwInstitution {
    baInstitutionID: number;
    orgUnitID?: number;
    institutionNr: string;
    baInstitutionArtCode?: number;
    aktiv: boolean;
    debitor: boolean;
    kreditor: boolean;
    keinSerienbrief: boolean;
    manuelleAnrede: boolean;
    anrede: string;
    briefanrede: string;
    titel: string;
    name: string;
    vorname: string;
    geschlechtCode?: number;
    telefon: string;
    telefon2: string;
    telefon3: string;
    fax: string;
    eMail: string;
    homepage: string;
    sprachCode?: number;
    bemerkung: string;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    baInstitutionTS: any;
    nameVorname: string;
    adresse: string;
    adresseMehrzeilig: string;
    ortStrasse: string;
    zusatz: string;
    adressZusatz: string;
    strasse: string;
    hausNr: string;
    strasseHausNr: string;
    postfach: string;
    postfachOhneNr?: boolean;
    postfachTextD: string;
    pLZ: string;
    ort: string;
    pLZOrt: string;
    bezirk: string;
    kanton: string;
    land: string;
    ortschaftCode?: number;
    baLandID?: number;
    baFreigabeStatusCode: number;
    typen: string;
}

export class VwInstitution implements IvwInstitution {
    baInstitutionID: number;
    orgUnitID?: number;
    institutionNr: string;
    baInstitutionArtCode?: number;
    aktiv: boolean;
    debitor: boolean;
    kreditor: boolean;
    keinSerienbrief: boolean;
    manuelleAnrede: boolean;
    anrede: string;
    briefanrede: string;
    titel: string;
    name: string;
    vorname: string;
    geschlechtCode?: number;
    telefon: string;
    telefon2: string;
    telefon3: string;
    fax: string;
    eMail: string;
    homepage: string;
    sprachCode?: number;
    bemerkung: string;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    baInstitutionTS: any;
    nameVorname: string;
    adresse: string;
    adresseMehrzeilig: string;
    ortStrasse: string;
    zusatz: string;
    adressZusatz: string;
    strasse: string;
    hausNr: string;
    strasseHausNr: string;
    postfach: string;
    postfachOhneNr?: boolean;
    postfachTextD: string;
    pLZ: string;
    ort: string;
    pLZOrt: string;
    bezirk: string;
    kanton: string;
    land: string;
    ortschaftCode?: number;
    baLandID?: number;
    baFreigabeStatusCode: number;
    typen: string;
    constructor(data?: IvwInstitution) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
