// model for Top grid
export interface IBaland {
    baLandID: number ;
    text: string;
    textFR: string;
    textIT: string;
    textEN: string;
    iso2Code: string;
    iso3Code: string;
    bfsCode: number;
    sortKey: number;
    sapCode: string;
    datumVon: Date;
    datumBis: Date;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    baLanTS: any[];
    bfsDelivered: boolean;
}


export class Baland implements IBaland {
    public baLandID: number;
    public text: string;
    public textFR: string;
    public textIT: string;
    public textEN: string;
    public iso2Code: string;
    public iso3Code: string;
    public bfsCode: number;
    public  sortKey: number;
    public sapCode: string;
    public  datumVon: Date;
    public datumBis: Date;
    public creator: string;
    public  created: Date;
    public modifier: string;
    public modified: Date;
    public baLanTS: any[];
    public bfsDelivered: boolean;

    constructor(data?: IBaland) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
