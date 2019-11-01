export interface IPlausifehler {
    baPersonID?: any;
    dossierID?: any;
    dossierStatus?: string;
    nameVorname?: any;
    person?: any;
    plausiFehler?: any;
    variable?: any;
}


export class Plausifehler implements IPlausifehler {
    baPersonID?: any;
    dossierID?: any;
    dossierStatus?: string;
    nameVorname?: any;
    person?: any;
    plausiFehler?: any;
    variable?: any;
    constructor(data?: IPlausifehler) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
