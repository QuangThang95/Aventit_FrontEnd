interface IInitDataCombox {
    lovName: string;
}

export class InitDataCombox implements IInitDataCombox {
    public lovName: string;

    constructor(data?: IInitDataCombox) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface IResult {
    code: number;
    text: string;
    shortText: string;
    value1: string;
    value2: string;
    value3: string;
    sortKey: number;
    isActive: boolean;
}

export class ResultValue implements IResult {
    public code: number;
    public text: string;
    public shortText: string;
    public value1: string;
    public value2: string;
    public value3: string;
    public sortKey: number;
    public isActive: boolean;
    constructor(data?: IResult) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class ITopFaLeistung {
    faLeistungID: number;
}

export class TopFaLeistung implements ITopFaLeistung {
    public faLeistungID: number;

    constructor(data?: ITopFaLeistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export class ITopFaLeistungValue {
    faLeistungID: number;
    baPersonID: number;
    faFallID: number;
    modulID: number;
    userID: number;
    sachbearbeiterID: number;
    schuldnerBaPersonID?: number;
    faProzessCode?: number;
    gemeindeCode?: number;
    leistungsartCode?: number;
    eroeffnungsGrundCode?: number;
    abschlussGrundCode?: number;
    datumVon?: Date;
    datumBis?: Date;
    bemerkung: string;
    dossiernummer: string;
    faAufnahmeartCode?: number;
    faKontaktveranlasserCode?: number;
    faTeilleistungserbringerCodes: string;
    faModulDienstleistungenCode: number;
    ikSchuldnerStatusCode?: number;
    ikAufenthaltsartCode?: number;
    ikHatUnterstuetzung: boolean;
    ikIstRentenbezueger: boolean;
    ikSchuldnerMahnen: boolean;
    ikEinnahmenQuoteCode?: number;
    ikDatumRechtskraft?: Date;
    ikInkassoBemuehungCode?: number;
    ikVerjaehrungAm?: Date;
    ikLeistungStatusCode?: number;
    ikDatumForderungstitel?: Date;
    ikRueckerstattungTypCode?: number;
    ikForderungTitelCode: number;
    ikErreichungsGradCode?: number;
    oldUnitID?: number;
    vmAuftragCode?: number;
    kaProzessCode?: number;
    kaEpqJob: boolean;
    bezeichnung: string;
    migrationKA?: number;
    pscdVertragsgegenstandID: number;
    migBemerkung: string;
    migHerkunftCode?: number;
    migAlteFallNr?: number;
    vUFaFallID?: number;
    visdat36Area: string;
    visdat36FALLID: string;
    visdat36LEISTUNGID: string;
    miederholteSpezifischeErmittlungEAF: boolean;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    faLeistungTS: any;
    kbKostenstelleID?: number;
    vorsaldo: any;
    kbKostenstelleTS: any;
    abschlussGrundText?: string;
    leistungsartText?: string;
    eroeffnungsGrundText?: string;
    gemeindeText?: string;
}

export class TopFaLeistungValue implements ITopFaLeistungValue {
    public faLeistungID: number;
    public baPersonID: number;
    public faFallID: number;
    public modulID: number;
    public userID: number;
    public sachbearbeiterID: number;
    public schuldnerBaPersonID?: number;
    public faProzessCode?: number;
    public gemeindeCode?: number;
    public leistungsartCode?: number;
    public eroeffnungsGrundCode?: number;
    public abschlussGrundCode?: number;
    public datumVon?: any;
    public datumBis?: any;
    public bemerkung: string;
    public dossiernummer: string;
    public faAufnahmeartCode?: number;
    public faKontaktveranlasserCode?: number;
    public faTeilleistungserbringerCodes: string;
    public faModulDienstleistungenCode: number;
    public ikSchuldnerStatusCode?: number;
    public ikAufenthaltsartCode?: number;
    public ikHatUnterstuetzung: boolean;
    public ikIstRentenbezueger: boolean;
    public ikSchuldnerMahnen: boolean;
    public ikEinnahmenQuoteCode?: number;
    public ikDatumRechtskraft?: Date;
    public ikInkassoBemuehungCode?: number;
    public ikVerjaehrungAm?: Date;
    public ikLeistungStatusCode?: number;
    public ikDatumForderungstitel?: Date;
    public ikRueckerstattungTypCode?: number;
    public ikForderungTitelCode: number;
    public ikErreichungsGradCode?: number;
    public oldUnitID?: number;
    public vmAuftragCode?: number;
    public kaProzessCode?: number;
    public kaEpqJob: boolean;
    public bezeichnung: string;
    public migrationKA?: number;
    public pscdVertragsgegenstandID: number;
    public migBemerkung: string;
    public migHerkunftCode?: number;
    public migAlteFallNr?: number;
    public vUFaFallID?: number;
    public visdat36Area: string;
    public visdat36FALLID: string;
    public visdat36LEISTUNGID: string;
    public miederholteSpezifischeErmittlungEAF: boolean;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: Date;
    public faLeistungTS: any;
    public kbKostenstelleID?: number;
    public vorsaldo: any;
    public kbKostenstelleTS: any;
    public abschlussGrundText?: string;
    public leistungsartText?: string;
    public eroeffnungsGrundText?: string;
    public gemeindeText?: string;

    constructor(data?: ITopFaLeistungValue) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}


export class IDataGridBottom {
    bgFinanzplanID: number;
    faLeistungID: number;
    bgBewilligungStatusCode: number;
    bgGrundEroeffnenCode: number;
    bgGrundAbschlussCode: number;
    whHilfeTypCode: number;
    geplantVon: Date;
    geplantBis?: Date;
    datumVon?: Date;
    datumBis?: Date;
    bemerkung: string;
    bgFinanzplanTS: any;
    whGrundbedarfTypCode: number;
    ub: boolean;
    hg: number;
    ue: number;
    finanzPlaene: string;
}

export class DataGridBottom implements IDataGridBottom {
    public bgFinanzplanID: number;
    public faLeistungID: number;
    public bgBewilligungStatusCode: number;
    public bgGrundEroeffnenCode: number;
    public bgGrundAbschlussCode: number;
    public whHilfeTypCode: number;
    public geplantVon: Date;
    public geplantBis?: Date;
    public datumVon?: Date;
    public datumBis?: Date;
    public bemerkung: string;
    public bgFinanzplanTS: any;
    public whGrundbedarfTypCode: number;
    public ub: boolean;
    public hg: number;
    public ue: number;
    public finanzPlaene: string;

    constructor(data?: IDataGridBottom) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class ICountRecord {
    result: number;
}

export class CountRecord implements ICountRecord {
    public result: number;

    constructor(data?: ICountRecord) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class IValueReturn {
    isSuccess: boolean;
}

export class ValueReturn implements IValueReturn {
    public isSuccess: boolean;

    constructor(data?: IValueReturn) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}


export class IDeleteRecord {
    faLeistungID: number;
    faLeistungTS: any;
}

export class DeleteRecord implements IDeleteRecord {
    public faLeistungID: number;
    public faLeistungTS: any;

    constructor(data?: IDeleteRecord) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class IUpdateWhLeistung {
    GemeindeCode?: number;
    LeistungsartCode?: number;
    EroeffnungsGrundCode?: number;
    AbschlussGrundCode?: number;
    DatumVon: any;
    DatumBis?: any;
    Bemerkung: string;
    FaLeistungID: number;
    FaLeistungTS: any;
    BgFinanzplanID?: number;
    LeiOrigDatumBis?: any;
    KbKostenstelleID: number;
    KbKostenstelleTS: any;
    Vorsaldo: number;
    DatumVonText: string;
    ZustGemeindeText: string;
    FaFallID?: number;
    ModulID?: number;
    FaProzessCode?: number;
    IsConfirmInfo: boolean;
    IsConfirmYes: boolean;

}

export class UpdateWhLeistung implements IUpdateWhLeistung {
    public GemeindeCode?: number;
    public LeistungsartCode?: number;
    public EroeffnungsGrundCode?: number;
    public AbschlussGrundCode?: number;
    public DatumVon: any;
    public DatumBis?: any;
    public Bemerkung: string;
    public FaLeistungID: number;
    public FaLeistungTS: any;
    public BgFinanzplanID?: number;
    public LeiOrigDatumBis?: any;
    public KbKostenstelleID: number;
    public KbKostenstelleTS: any;
    public Vorsaldo: number;
    public DatumVonText: string;
    public ZustGemeindeText: string;
    public FaFallID?: number;
    public ModulID?: number;
    public FaProzessCode?: number;
    public IsConfirmInfo: boolean;
    public IsConfirmYes: boolean;

    constructor(data?: IDeleteRecord) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class IUpdateVorsaldo {
    kbKostenstelleID: number;
    kbKostenstelleTS: any;
    vorsaldo: any;
}

export class UpdateVorsaldo implements IUpdateVorsaldo {
    public kbKostenstelleID: number;
    public kbKostenstelleTS: any;
    public vorsaldo: any;

    constructor(data?: IUpdateVorsaldo) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

