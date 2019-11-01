export interface IKennzahlen {
    Bezeichnung: any;
    WertBetrag: any;
}


export class Kennzahlen implements IKennzahlen {
    public Bezeichnung: any;
    public WertBetrag: any;
    constructor(data?: IKennzahlen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelKennzahlen {
    erhebungsjahr?: number;
    letzteAuszahlungVon?: any;
    letzteAuszahlungBis?: any;
    nettobedarfGroesser0?: boolean;
    proDossier?: boolean;
}

export class ModelKennzahlen implements IModelKennzahlen {
    public erhebungsjahr?: number;
    public letzteAuszahlungVon: any;
    public letzteAuszahlungBis: any;
    public nettobedarfGroesser0: boolean;
    public proDossier: boolean;
    constructor(data?: IModelKennzahlen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}



