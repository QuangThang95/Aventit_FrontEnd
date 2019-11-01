// model for detail
export interface IKonfiguration {
    sostatJahr: any;
    sostatDsn: string;
    sostatInstitutionNr: any;
    sostatExportPfad: string;
    sostatExportPfadXml: string;
}

export class Konfiguration implements IKonfiguration {
    public sostatJahr: any;
    public sostatDsn: string;
    public sostatInstitutionNr: any;
    public sostatExportPfad: string;
    public sostatExportPfadXml: string;

    constructor(data?: IKonfiguration) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// model for grid
export interface IKonfigurationList {
    code: any;
    text: string;
}

export class KonfigurationList implements IKonfigurationList {
    public code: any;
    public text: string;

    constructor(data?: IKonfigurationList) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
