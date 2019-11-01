export interface IVariablen {
    baGemeindeID: any;
    plz: any;
    name: string;
    kanton: string;
    bfsCode: any;
}

export class Variablen implements IVariablen {
    public baGemeindeID: any;
    public plz: any;
    public name: string;
    public kanton: string;
    public bfsCode: any;
    constructor(data?: IVariablen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
