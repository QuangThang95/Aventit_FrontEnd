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

export interface IInsertFaPhaseQueryModel {
    FaLeistungID: any;
    FaPhaseCode: any;
    DatumVon: any;
}

export class InsertFaPhaseQueryModel implements IInsertFaPhaseQueryModel {
    public FaLeistungID: any;
    public FaPhaseCode: any;
    public DatumVon: any;
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

export interface IUpdateFaLeistungQueryModel {
    faLeistungID: any;
}

export class UpdateFaLeistungQueryModel implements IUpdateFaLeistungQueryModel {
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

export interface IMessageInformationQueryModel {
    maskName: string;
    messageName: string;
    defaultText: string;
}

export class MessageInformationQueryModel implements IMessageInformationQueryModel {
    public maskName: string;
    public messageName: string;
    public defaultText: string;
    constructor(data?: IMessageInformationQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
