export interface IFalltraeger {
    falltraeger: string;
    person: string;
    wohnsitz: string;
    aufenthaltsort: string;
    heimatort: string;
    nationalitaet: string;
    slter?: number;
    geburtstag: string;
    geschlecht: string;
    zivilstand: string;
    wohnsitzAdresseID: number;
}

export class Falltraeger implements IFalltraeger {
    falltraeger: string;
    person: string;
    wohnsitz: string;
    aufenthaltsort: string;
    heimatort: string;
    nationalitaet: string;
    alter?: number;
    geburtstag: string;
    geschlecht: string;
    zivilstand: string;
    wohnsitzAdresseID: number;
    constructor(data?: IFalltraeger) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
