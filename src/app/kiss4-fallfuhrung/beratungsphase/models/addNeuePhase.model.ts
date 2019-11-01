/********  Model for Add New function  ***********/
export interface IGetCountFaPhaseModel {
    countBeratung: any;
    countIntake: any;
    countOpenBeratung: any;
    countOpenIntake: any;
}

export class GetCountFaPhaseModel implements IGetCountFaPhaseModel {
    public countBeratung: any;
    public countIntake: any;
    public countOpenBeratung: any;
    public countOpenIntake: any;
    constructor(data?: IGetCountFaPhaseModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetCountFaPhaseQueryModel {
    faLeistungID: any;
}

export class GetCountFaPhaseQueryModel implements IGetCountFaPhaseQueryModel {
    public faLeistungID: any;
    constructor(data?: IGetCountFaPhaseQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetNewDateByFaLeistungIDModel {
    newDate: any;
}

export class GetNewDateByFaLeistungIDModel implements IGetNewDateByFaLeistungIDModel {
    public newDate: any;
    constructor(data?: IGetNewDateByFaLeistungIDModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IInsertFaPhaseQueryModel {
    FaLeistungID: any;
    FaPhaseCode: any;
    DatumVon: any;
    UserID: any;
    CreatorModifier: any;
}

export class InsertFaPhaseQueryModel implements IInsertFaPhaseQueryModel {
    public FaLeistungID: any;
    public FaPhaseCode: any;
    public DatumVon: any;
    public UserID: any;
    public CreatorModifier: any;
    constructor(data?: IInsertFaPhaseQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IInsertFaPhaseModel {
    id: any;
}

export class InsertFaPhaseModel implements IInsertFaPhaseModel {
    public id: any;
    constructor(data?: IInsertFaPhaseModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IUpdateFaLeistungQueryModel {
    userID: any;
    modifier: any;
    faLeistungID: any;
}

export class UpdateFaLeistungQueryModel implements IUpdateFaLeistungQueryModel {
    public userID: any;
    public modifier: any;
    public faLeistungID: any;

    constructor(data?: IUpdateFaLeistungQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IUpdateFaLeistungResultModel {
    value: any;
}

export class UpdateFaLeistungResultModel implements IUpdateFaLeistungResultModel {
    public value: any;

    constructor(data?: IUpdateFaLeistungResultModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetConfigIntItemModel {
    value: any;
}

export class GetConfigIntItemModel implements IGetConfigIntItemModel {
    public value: any;

    constructor(data?: IGetConfigIntItemModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetConfigIntQueryModel {
    keyPath: any;
    defaultValue: any;
}

export class GetConfigIntQueryModel implements IGetConfigIntQueryModel {
    public keyPath: any;
    public defaultValue: any;

    constructor(data?: IGetConfigIntQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IListGetConfigIntQuery {
    listGetConfigIntQuery: GetConfigIntQueryModel[];
}

export class ListGetConfigIntQuery implements IListGetConfigIntQuery {
    public listGetConfigIntQuery: GetConfigIntQueryModel[] = [];

    constructor(data?: IListGetConfigIntQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetConfigBoolItemModel {
    value: any;
}

export class GetConfigBoolItemModel implements IGetConfigBoolItemModel {
    public value: any;

    constructor(data?: IGetConfigBoolItemModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IGetConfigBoolQueryModel {
    keyPath: any;
    defaultValue: any;
}

export class GetConfigBoolQueryModel implements IGetConfigBoolQueryModel {
    public keyPath: any;
    public defaultValue: any;

    constructor(data?: IGetConfigBoolQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/******** The End Model for Add New function  ***********/
