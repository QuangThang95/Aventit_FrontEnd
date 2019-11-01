export interface IPostleitzahlenAktualisieren {
    baPLZID: any;
    baPLZTS: any[];
    bfsCode: number;
    created: any;
    creator: string;
    datumBis?: any;
    datumVon?: any;
    kanton: string;
    modified: any;
    modifier: string;
    name: string;
    nameTID?: number;
    onrp?: number;
    plz: number;
    plZ6?: number;
    plzSuffix?: number;
    sortkey: number;
    system: boolean;
}


export class PostleitzahlenAktualisieren implements IPostleitzahlenAktualisieren {
    public baPLZID: any;
    public baPLZTS: any[];
    public bfsCode: number;
    public created: any;
    public creator: string;
    public datumBis?: any;
    public datumVon?: any;
    public kanton: string;
    public modified: any;
    public modifier: string;
    public name: string;
    public nameTID?: number;
    public onrp?: number;
    public plz: number;
    public plZ6?: number;
    public plzSuffix?: number;
    public sortkey: number;
    public system: boolean;

    constructor(data?: IPostleitzahlenAktualisieren) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
