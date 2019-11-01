/************* Add model for parameter ****************************/
export interface IParamModel {
    languageCode: any;
    className: string;
}

export class ParamModel implements IParamModel {
    public languageCode: any;
    public className: string;
    constructor(data?: IParamModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/************* The End add model for parameter ********************/
// Add model for Url
export interface IUrlModel {
    id: any;
    text: string;
    url: any;
}

export class UrlModel implements IUrlModel {
    id: any;
    text: string;
    url: any;
    constructor(data?: IUrlModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// Model for SAR select box data
export interface ISARSelectboxModel {
    userID: number;
    displayText?: string;
    logonName?: string;
    name?: string;
}

export class SARSelectboxModel implements ISARSelectboxModel {
    public userID: number;
    public displayText: string;
    public logonName: string;
    public name: string;
    constructor(data?: ISARSelectboxModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// Model query for SAR select box
export interface ISARSelectboxQueryModel {
    searchText: string;
}

export class SARSelectboxQueryModel implements ISARSelectboxQueryModel {
    public searchText: string;
    constructor(data?: ISARSelectboxQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
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
// Model for Grund select box data
export interface IGrundSelectboxModel {
    code: number;
    text?: string;
    shortText?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    sortKey: number;
    isActive: boolean;
}

export class GrundSelectboxModel implements IGrundSelectboxModel {
    public code: number;
    public text: string;
    public shortText: string;
    public value1: string;
    public value2: string;
    public value3: string;
    public sortKey: number;
    public isActive: boolean;
    constructor(data?: IGrundSelectboxModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// Model query for Grund select box
export interface IGrundSelectboxQueryModel {
    FaPhaseCode: string;
}

export class GrundSelectboxQueryModel implements IGrundSelectboxQueryModel {
    public FaPhaseCode: string;
    constructor(data?: IGrundSelectboxQueryModel) {
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
    fsDienstleistungspaketIdZugewiesen: any;
    fsDienstleistungspaketIdBedarf: any;
    datumBis?: Date;
    bemerkung: string;
    created: any;
    creator: any;
    faLeistungArchivID: any;
    faLeistungId: any;
    faPhaseCode: any;
    faPhaseId: any;
    faPhaseTs: any;
    fallDatumBis: any;
    modified: any;
    modifier: any;
    userId: any;
    status: number;
}

export class BeratungsphaseFormData implements IBeratungsphaseFormData {
    public datumVon: Date;
    public abschlussGrundCode: any;
    public sar: any;
    public fsDienstleistungspaketIdZugewiesen: any;
    public fsDienstleistungspaketIdBedarf: any;
    public datumBis?: Date;
    public bemerkung: string;
    public created: any;
    public creator: any;
    public faLeistungArchivID: any;
    public faLeistungId: any;
    public faPhaseCode: any;
    public faPhaseId: any;
    public faPhaseTs: any;
    public fallDatumBis: any;
    public modified: any;
    public modifier: any;
    public userId: any;
    public status: number;
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
    faLeistungId: any;
    faPhaseCode: any;
    userId: any;
    datumVon: Date;
    datumBis?: any;
    abschlussGrundCode: any;
    bemerkung: any;
    faPhaseTs: any;
    fsDienstleistungspaketIdBedarf: any;
    fsDienstleistungspaketIdZugewiesen: number;
}

export class UpdateFormDataQueryModel implements IUpdateFormDataQueryModel {
    public faPhaseID_old: any;
    public faLeistungId: any;
    public faPhaseCode: any;
    public userId: any;
    public datumVon: any;
    public datumBis?: any;
    public abschlussGrundCode: any;
    public bemerkung: any;
    public faPhaseTs: any;
    public fsDienstleistungspaketIdBedarf: any;
    public fsDienstleistungspaketIdZugewiesen: number;
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
/************* model for get DatumVon **********/
export interface IDatumVonAndFaLeistungID {
    faLeistungID: any;
    datumVon: any;
}

export class DatumVonAndFaLeistungID implements IDatumVonAndFaLeistungID {
    public faLeistungID: any;
    public datumVon: any;
    constructor(data?: IDatumVonAndFaLeistungID) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/************* The end model for get DatumVon **********/
/************* Model for Check DatumVon valid **********/
export interface ICheckDatumVon {
    duplicatedCount: any;
}

export class CheckDatumVon implements ICheckDatumVon {
    public duplicatedCount: any;
    constructor(data?: ICheckDatumVon) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface ICheckDatumVonQuery {
    faLeistungID: any;
    datumVon: any;
    faPhaseID: any;
}

export class CheckDatumVonQuery implements ICheckDatumVonQuery {
    public faLeistungID: any;
    public datumVon: any;
    public faPhaseID: any;
    constructor(data?: ICheckDatumVonQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/************* The end model for Check DatumVon valid **********/
/************* Model for GetMandatoryField **********/
export interface IGetMandatoryField {
    displayText: any;
}

export class GetMandatoryField implements IGetMandatoryField {
    public displayText: any;
    constructor(data?: IGetMandatoryField) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/************* The end model for Get Mandatory Field **********/
/************* Model for Check minimal all targets **********/
export interface ICheckMinimalAllTargetsModel {
    zielText: any;
}

export class CheckMinimalAllTargetsModel implements ICheckMinimalAllTargetsModel {
    public zielText: any;
    constructor(data?: ICheckMinimalAllTargetsModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/************* The end model for Check minimal all targets **********/
/************* Model for Check date bis when add new beratungsphase & Intake **********/
export interface IGetFaLeistungByBaPersonIDModel {
    datumBis: any;
    faLeistungID: any;
}

export class GetFaLeistungByBaPersonIDModel implements IGetFaLeistungByBaPersonIDModel {
    public datumBis: any;
    public faLeistungID: any;
    constructor(data?: IGetFaLeistungByBaPersonIDModel) {
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
export interface IGetFaLeistungByBaPersonIDQueryModel {
    baPersonID: number;
}

export class GetFaLeistungByBaPersonIDQueryModel implements IGetFaLeistungByBaPersonIDQueryModel {
    public baPersonID: number;
    constructor(data?: IGetFaLeistungByBaPersonIDQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/************* The end Model for Check date bis when add new beratungsphase & Intake **********/

export interface IGetIntakeAndBeratungCountItemModel {
    countBeratung: number;
    countIntake: number;
}

export class GetIntakeAndBeratungCountItemModel implements IGetIntakeAndBeratungCountItemModel {
    public countBeratung: number;
    public countIntake: number;
    constructor(data?: IGetIntakeAndBeratungCountItemModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetLicensedModulModel {
    licensed: number;
}

export class GetLicensedModulModel implements IGetLicensedModulModel {
    public licensed: number;
    constructor(data?: IGetLicensedModulModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetLicensedModulQueryModel {
    fSModuleID: number;
}

export class GetLicensedModulQueryModel implements IGetLicensedModulQueryModel {
    public fSModuleID: number;
    constructor(data?: IGetLicensedModulQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IGetFallRightsModel {
    mayRead: boolean;
    mayInsert: boolean;
    mayUpdate: boolean;
    mayDelete: boolean;
    closed?: boolean;
    archived?: boolean;
    mayClose?: boolean;
    mayReOpen?: boolean;

}

export class GetFallRightsModel implements IGetFallRightsModel {
    public mayRead: boolean;
    public mayInsert: boolean;
    public mayUpdate: boolean;
    public mayDelete: boolean;
    public closed?: boolean;
    public archived?: boolean;
    public mayClose?: boolean;
    public mayReOpen?: boolean;
    constructor(data?: IGetFallRightsModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Reopen Phase
export interface IReopenPhaseQueryModel {
    phaseCode: number;
    faLeistungId: number;
}

export class ReopenPhaseQueryModel implements IReopenPhaseQueryModel {
    public phaseCode: number;
    public faLeistungId: number;
    constructor(data?: IReopenPhaseQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
