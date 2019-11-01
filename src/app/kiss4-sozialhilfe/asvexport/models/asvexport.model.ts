// model for Top grid
export interface IASVDetenerfassung {
    sstASVSExportID: number;
    bemerkung: string;
    datumExport?: Date;
    anzahl: number;
    documentID?: number;
    sstASVSExportTS: number[];
    modifier: string;
    creator: string;
    modified: string;
    created: Date;

}


export class ASVDetenerfassung implements IASVDetenerfassung {
    public sstASVSExportID: number;
    public bemerkung: string;
    public datumExport?: Date;
    public anzahl: number;
    public documentID?: number;
    public sstASVSExportTS: number[];
    public modifier: string;
    public creator: string;
    public modified: string;
    public created: Date;
    constructor(data?: IASVDetenerfassung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}


// Model for Bottom grid
export interface IZuExportierendeEintrage {
    index: number;
    baPersonID: number;
    nameVorname: string;
    datumVon: Date;
    datumBis?: Date;
    widerruf: boolean;
    itemName: string;
    problem: string;

}


export class ZuExportierendeEintrage implements IZuExportierendeEintrage {
    public index: number;
    public baPersonID: number;
    public nameVorname: string;
    public datumVon: Date;
    public datumBis?: Date;
    public widerruf: boolean;
    public itemName: string;
    public problem: string;
    constructor(data?: IZuExportierendeEintrage) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Bottom grid
export interface IZuExportierendeEintrageQuery {
    sstASVSExportID: number;
    isFindeDieZu: boolean;
    orgUnitID?: number;
}


export class ZuExportierendeEintrageQuery implements IZuExportierendeEintrageQuery {
    public sstASVSExportID: number;
    public isFindeDieZu: boolean;
    public orgUnitID?: number;
    constructor(data?: IZuExportierendeEintrageQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query updateSstASVSExport
export interface IModelQueryUpdateASVSExport {
    datumExport?: Date;
    bemerkung: string;
    documentID?: number;
    sstASVSExportID: number;
    sstASVSExportTS: any[];
}

export class ModelQueryUpdateASVSExport implements IModelQueryUpdateASVSExport {
    public datumExport?: Date;
    public bemerkung: string;
    public documentID?: number;
    public sstASVSExportID: number;
    public sstASVSExportTS: any[];
    constructor(data?: IModelQueryUpdateASVSExport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get File Binary By DocumnetID
export interface IModelFileBinary {
    fileBinary: any[];
    dbName: string;
}

export class ModelFileBinary implements IModelFileBinary {
    public fileBinary: any[];
    public dbName: string;
    constructor(data?: IModelFileBinary) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Get XOrgUnit All for combobox Sektion
export interface IModelXOrgUnit {
    code: number;
    text: string;
}

export class ModelXOrgUnit implements IModelXOrgUnit {
    public code: number;
    public text: string;
    constructor(data?: IModelXOrgUnit) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query insert SstASVSExport
export interface IModelQueryInsertASVSExport {
    datumExport?: Date;
    bemerkung: string;
    documentID?: number;
    creator: string;
    created: Date;
    modifier: string;
    modified: any;
}

export class ModelQueryInsertASVSExport implements IModelQueryInsertASVSExport {
    public datumExport?: Date;
    public bemerkung: string;
    public documentID?: number;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: any;
    constructor(data?: IModelQueryInsertASVSExport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelUpdateTransaction {
    isSuccess: boolean;
    status: number;
    _body: any;
}

export class ModelUpdateTransaction implements IModelUpdateTransaction {
    public isSuccess: boolean;
    public status: number;
    public _body: any;
    constructor(data?: IModelUpdateTransaction) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelQueryUpdateTransaction {
    datumExport?: Date;
    bemerkung: string;
    documentID?: number;
    orgUnitID?: number;
}

export class ModelQueryUpdateTransaction implements IModelQueryUpdateTransaction {
    public datumExport?: Date;
    public bemerkung: string;
    public documentID?: number;
    public orgUnitID?: number;
    constructor(data?: IModelQueryUpdateTransaction) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Update
export interface IModelUpdateASVSExport {
    value: boolean;
    _body: any;
    status: number;

}

export class ModelUpdateASVSExport implements IModelUpdateASVSExport {
    public value: boolean;
    public _body: any;
    public status: number;
    constructor(data?: IModelUpdateASVSExport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
