export interface IModelFallfuhrung {

    faLeistungID?: number;
}

export class ModelFallfuhrung implements IModelFallfuhrung {
    public faLeistungID?: number;
    constructor(data?: IModelFallfuhrung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Query Get Config
export interface IModelQueryGetConfig {
    keyPath: string;
    defaultValue: boolean;
}

export class ModelQueryGetConfig implements IModelQueryGetConfig {
    public keyPath: string;
    public defaultValue: boolean;
    constructor(data?: IModelQueryGetConfig) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get Config
export interface IModelGetConfig {
    value: boolean;
    _body: any;
    status: number;

}

export class ModelGetConfig implements IModelGetConfig {
    public value: boolean;
    public _body: any;
    public status: number;
    constructor(data?: IModelGetConfig) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get Config
export interface IModelGetFaLeistung {
    faLeistungID: number;
    baPersonID: number;
    faFallID: number;
    modulID: number;
    userID: number;
    sachbearbeiterID?: number;
    schuldnerBaPersonID?: number;
    faProzessCode?: number;
    gemeindeCode?: number;
    leistungsartCode?: number;
    eroeffnungsGrundCode?: number;
    abschlussGrundCode?: number;
    datumVon: Date;
    datumBis?: Date;
    bemerkung: string;

    dossiernummer: string;
    faAufnahmeartCode?: number;
    faKontaktveranlasserCode?: number;
    faTeilleistungserbringerCodes: string;
    faModulDienstleistungenCode?: number;
    ikSchuldnerStatusCode?: number;
    ikAufenthaltsartCode?: number;
    ikHatUnterstuetzung: boolean;
    ikIstRentenbezueger: boolean;
    ikSchuldnerMahnen: boolean;
    ikEinnahmenQuoteCode?: number;
    ikDatumRechtskraft: Date;
    ikInkassoBemuehungCode?: number;

    ikVerjaehrungAm?: Date;
    ikLeistungStatusCode: number;
    ikDatumForderungstitel?: Date;
    ikRueckerstattungTypCode?: number;
    ikForderungTitelCode?: number;
    ikErreichungsGradCode?: number;
    oldUnitID?: number;
    vmAuftragCode?: number;
    kaProzessCode?: number;
    kaEpqJob?: boolean;
    bezeichnung: string;
    migrationKA?: number;
    pscdVertragsgegenstandID?: number;
    migBemerkung: string;
    migHerkunftCode?: number;
    migAlteFallNr?: number;
    vUFaFallID?: number;
    visdat36Area: string;
    visdat36FALLID: string;
    visdat36LEISTUNGID: string;
    wiederholteSpezifischeErmittlungEAF: boolean;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    faLeistungTS: any[];
    sar: string;
    faLeistungArchivID?: number;
    gemeindeText: string;
    faKontaktveranlasserText: string;
    absschlussGrundText: string;
    faAufnahmeartText: string;
}

export class ModelGetFaLeistung implements IModelGetFaLeistung {
    public faLeistungID: number;
    public baPersonID: number;
    public faFallID: number;
    public modulID: number;
    public userID: number;
    public sachbearbeiterID?: number;
    public schuldnerBaPersonID?: number;
    public faProzessCode?: number;
    public gemeindeCode?: number;
    public leistungsartCode?: number;
    public eroeffnungsGrundCode?: number;
    public abschlussGrundCode?: number;
    public datumVon: Date;
    public datumBis?: Date;
    public bemerkung: string;

    public dossiernummer: string;
    public faAufnahmeartCode?: number;
    public faKontaktveranlasserCode?: number;
    public faTeilleistungserbringerCodes: string;
    public faModulDienstleistungenCode?: number;
    public ikSchuldnerStatusCode?: number;
    public ikAufenthaltsartCode?: number;
    public ikHatUnterstuetzung: boolean;
    public ikIstRentenbezueger: boolean;
    public ikSchuldnerMahnen: boolean;
    public ikEinnahmenQuoteCode?: number;
    public ikDatumRechtskraft: Date;
    public ikInkassoBemuehungCode?: number;

    public ikVerjaehrungAm?: Date;
    public ikLeistungStatusCode: number;
    public ikDatumForderungstitel?: Date;
    public ikRueckerstattungTypCode?: number;
    public ikForderungTitelCode?: number;
    public ikErreichungsGradCode?: number;
    public oldUnitID?: number;
    public vmAuftragCode?: number;
    public kaProzessCode?: number;
    public kaEpqJob?: boolean;
    public bezeichnung: string;
    public migrationKA?: number;
    public pscdVertragsgegenstandID?: number;
    public migBemerkung: string;
    public migHerkunftCode?: number;
    public migAlteFallNr?: number;
    public vUFaFallID?: number;
    public visdat36Area: string;
    public visdat36FALLID: string;
    public visdat36LEISTUNGID: string;
    public wiederholteSpezifischeErmittlungEAF: boolean;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: Date;
    public faLeistungTS: any[];
    public sar: string;
    public faLeistungArchivID?: number;
    public gemeindeText: string;
    public faKontaktveranlasserText: string;
    public absschlussGrundText: string;
    public faAufnahmeartText: string;
    constructor(data?: IModelGetFaLeistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Query Get FallRight
export interface IModelFallRights {
    mayRead: boolean;
    mayInsert: boolean;
    mayUpdate: boolean;
    mayDelete: boolean;
    closed?: boolean;
    archived?: boolean;
    mayClose?: boolean;
    mayReopen?: boolean;

}

export class ModelFallRights implements IModelFallRights {
    public mayRead: boolean;
    public mayInsert: boolean;
    public mayUpdate: boolean;
    public mayDelete: boolean;
    public closed?: boolean;
    public archived?: boolean;
    public mayClose?: boolean;
    public mayReopen?: boolean;
    constructor(data?: IModelFallRights) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get Data Combobox
export interface IModelGetDataCombobox {
    code: number;
    text?: string;
    shortText?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    sortKey: number;
    isActive: boolean;
}

export class ModelGetDataCombobox implements IModelGetDataCombobox {
    public code: number;
    public text: string;
    public shortText: string;
    public value1: string;
    public value2: string;
    public value3: string;
    public sortKey: number;
    public isActive: boolean;
    constructor(data?: IModelGetDataCombobox) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Query Update Faleistung
export interface IModelQueryUpdateFaleistung {
    isDatumVonModified: boolean;
    baPersonID: number;
    datumVon: any;
    faLeistungID: number;
    datumBis?: any;
    gemeindeCode?: number;
    abschlussGrundCode?: number;
    bemerkung: string;
    faAufnahmeartCode?: number;
    faKontaktveranlasserCode?: number;
    modulID: number;
    faLeistungTS: any[];

}

export class ModelQueryUpdateFaleistung implements IModelQueryUpdateFaleistung {
    public isDatumVonModified: boolean;
    public baPersonID: number;
    public datumVon: any;
    public faLeistungID: number;
    public datumBis?: any;
    public gemeindeCode?: number;
    public abschlussGrundCode?: number;
    public bemerkung: string;
    public faAufnahmeartCode?: number;
    public faKontaktveranlasserCode?: number;
    public modulID: number;
    public faLeistungTS: any[];
    constructor(data?: IModelQueryUpdateFaleistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Combobox
export interface IModelQueryGetLOVName {

    lOVName: string;
    languageCode: number;
}

export class ModelQueryGetLOVName implements IModelQueryGetLOVName {
    public lOVName: string;
    public languageCode: number;
    constructor(data?: IModelQueryGetLOVName) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Validation FaLeistung
export interface IModelQueryValidationFaLeistung {
    isDatumVonModified: boolean;
    datumVon?: any;
    datumBis?: any;
    baPersonID: number;
    faLeistungID: number;
}

export class ModelQueryValidationFaLeistung implements IModelQueryValidationFaLeistung {
    public isDatumVonModified: boolean;
    public datumVon?: any;
    public datumBis?: any;
    public baPersonID: number;
    public faLeistungID: number;
    constructor(data?: IModelQueryValidationFaLeistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
