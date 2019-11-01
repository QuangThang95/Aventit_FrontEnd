// Model for DPL select box data
export interface IDPLSelectboxModel {
    code: number;
    text?: string;
}

export class DPLSelectboxModel implements IDPLSelectboxModel {
    public code: number;
    public text: string;
    constructor(data?: IDPLSelectboxModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

/********** model for form data *********/
export interface IBeratungsphaseFormData {
    datumVon: Date;
    abschlussGrundCode: any;
    sar: any;
    fsDienstleistungspaketID_Zugewiesen: any;
    fsDienstleistungspaketID_Bedarf: any;
    datumBis?: Date;
    bemerkung: string;
    created: any;
    creator: any;
    faLeistungArchivID: any;
    faLeistungID: any;
    faPhaseCode: any;
    faPhaseID: any;
    faPhaseTS: any;
    fallDatumBis: any;
    modified: any;
    modifier: any;
    userID: any;
}

export class BeratungsphaseFormData implements IBeratungsphaseFormData {
    public datumVon: Date;
    public abschlussGrundCode: any;
    public sar: any;
    public fsDienstleistungspaketID_Zugewiesen: any;
    public fsDienstleistungspaketID_Bedarf: any;
    public datumBis?: Date;
    public bemerkung: string;
    public created: any;
    public creator: any;
    public faLeistungArchivID: any;
    public faLeistungID: any;
    public faPhaseCode: any;
    public faPhaseID: any;
    public faPhaseTS: any;
    public fallDatumBis: any;
    public modified: any;
    public modifier: any;
    public userID: any;

    constructor(data?: IBeratungsphaseFormData) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// model for query
export interface ILoadFormDataQueryModel {
    faPhaseId: number;
}

export class LoadFormDataQueryModel implements ILoadFormDataQueryModel {
    public faPhaseId: number;
    constructor(data?: ILoadFormDataQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/********** The end model for form data *********/
/********* Model for Update function *************/
export interface IUpdateFormDataQueryModel {
    faPhaseID_old: any;
    faLeistungID: any;
    faPhaseCode: any;
    userID: any;
    datumVon: Date;
    datumBis?: any;
    abschlussGrundCode: any;
    bemerkung: any;
    FaPhaseTS_old: any;
    fsDienstleistungspaketID_Bedarf: any;
    fsDienstleistungspaketID_Zugewiesen: 1;
}

export class UpdateFormDataQueryModel implements IUpdateFormDataQueryModel {
    public faPhaseID_old: any;
    public faLeistungID: any;
    public faPhaseCode: any;
    public userID: any;
    public datumVon: Date;
    public datumBis?: any;
    public abschlussGrundCode: any;
    public bemerkung: any;
    public FaPhaseTS_old: any;
    public fsDienstleistungspaketID_Bedarf: any;
    public fsDienstleistungspaketID_Zugewiesen: 1;
    constructor(data?: IUpdateFormDataQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IResult {
    value: boolean;
    _body: any;
    status: number;
}

export class Result implements IResult {
    public value: boolean;
    public _body: any;
    public status: number;
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
/********* The end model for Update function *****/
/****** Add code  *****/
export interface IGrundBedarfFormDataModel {
    berechnungsgrundlage: number;
    // Group 2: SKOS bzw. interne Richtlinien
    grundbedarfI_furHG: number;
    anpassungI_furHG: string;
    abzugVVG_furHG: string;
    zuschlag_furHG: number;
    grundbedarfII_furHG: number;
    anpassungII_furHG: string;
    total_furHG: string;

    grundbedarfI_furUE: number;
    anpassungI_furUE: number;
    abzugVVG_furUE: number;
    zuschlag_furUE: number;
    grundbedarfII_furUE: number;
    anpassungII_furUE: number;
    keineCheckbox: boolean;
    total_furUE: number;

    // Group 1: SKOS 2005
    grundbedarf_furHG_SKOS2005: number;
    anpassung_furHG_SKOS2005: string;
    abzugVVG_furHG_SKOS2005: string;
    total_furHG_SKOS2005: string;

    grundbedarf_furUE_SKOS2005: number;
    anpassung_furUE_SKOS2005: number;
    abzugVVG_furUE_SKOS2005: number;
    total_furUE_SKOS2005: number;
    // Group 3: Berechnungsgrundlage
    monatlicher_furHG_Berechnungsgrundlage: string;
    anpassung_furHG_Berechnungsgrundlage: number;
    abzugVVG_furHG_Berechnungsgrundlage: string;
    total_furHG_Berechnungsgrundlage: string;

    monatlicher_furUE_Berechnungsgrundlage: number;
    anpassung_furUE_Berechnungsgrundlage: number;
    abzugVVG_furUE_Berechnungsgrundlage: number;
    total_furUE_Berechnungsgrundlage: number;

    kennzahlen_haushaltsgrosse_grundbedarf: string;
    kennzahlen_haushaltsgrosse_wohnkosten: string;
    kennzahlen_unterstutzungseinheit_grundbedarf: string;
    kennzahlen_unterstutzungseinheit_wohnkosten: string;
    kennzahlen_unterstutzungseinheit_zuschlagI: string;
    kennzahlen_begrundungen: string;
}

export class GrundBedarfFormDataModel implements IGrundBedarfFormDataModel {
    public berechnungsgrundlage: number;
    // Group 2: SKOS bzw. interne Richtlinien
    public grundbedarfI_furHG: number;
    public anpassungI_furHG: string;
    public abzugVVG_furHG: string;
    public zuschlag_furHG: number;
    public grundbedarfII_furHG: number;
    public anpassungII_furHG: string;
    public total_furHG: string;

    public grundbedarfI_furUE: number;
    public anpassungI_furUE: number;
    public abzugVVG_furUE: number;
    public zuschlag_furUE: number;
    public grundbedarfII_furUE: number;
    public anpassungII_furUE: number;
    public keineCheckbox: boolean;
    public total_furUE: number;
    // Group 1: SKOS 2005
    public grundbedarf_furHG_SKOS2005: number;
    public anpassung_furHG_SKOS2005: string;
    public abzugVVG_furHG_SKOS2005: string;
    public total_furHG_SKOS2005: string;

    public grundbedarf_furUE_SKOS2005: number;
    public anpassung_furUE_SKOS2005: number;
    public abzugVVG_furUE_SKOS2005: number;
    public total_furUE_SKOS2005: number;
    // Group 3: Berechnungsgrundlage
    public monatlicher_furHG_Berechnungsgrundlage: string;
    public anpassung_furHG_Berechnungsgrundlage: number;
    public abzugVVG_furHG_Berechnungsgrundlage: string;
    public total_furHG_Berechnungsgrundlage: string;

    public monatlicher_furUE_Berechnungsgrundlage: number;
    public anpassung_furUE_Berechnungsgrundlage: number;
    public abzugVVG_furUE_Berechnungsgrundlage: number;
    public total_furUE_Berechnungsgrundlage: number;

    public kennzahlen_haushaltsgrosse_grundbedarf: string;
    public kennzahlen_haushaltsgrosse_wohnkosten: string;
    public kennzahlen_unterstutzungseinheit_grundbedarf: string;
    public kennzahlen_unterstutzungseinheit_wohnkosten: string;
    public kennzahlen_unterstutzungseinheit_zuschlagI: string;
    public kennzahlen_begrundungen: string;
    constructor(data?: IGrundBedarfFormDataModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// Get status code
export interface IStatusCodeModel {
    bgBewilligungStatusCode: number;
    bgFinanzplanID: number;
    finanzplanBis: Date;
    finanzplanVon: Date;
    geburtsdatum: Date;
    heimatort: string;
    nameVorname: string;
    wohnsitzPLZOrt: string;
    wohnsitzStrasseHausNr: string;
}

export class StatusCodeModel implements IStatusCodeModel {
    public bgBewilligungStatusCode: number;
    public bgFinanzplanID: number;
    public finanzplanBis: Date;
    public finanzplanVon: Date;
    public geburtsdatum: Date;
    public heimatort: string;
    public nameVorname: string;
    public wohnsitzPLZOrt: string;
    public wohnsitzStrasseHausNr: string;
    constructor(data?: IStatusCodeModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IStatusCodeQuery {
    baPersonID: number;
    bgFinanzplanID: number;
}

export class StatusCodeQuery implements IStatusCodeQuery {
    public baPersonID: number;
    public bgFinanzplanID: number;
    constructor(data?: IStatusCodeQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
