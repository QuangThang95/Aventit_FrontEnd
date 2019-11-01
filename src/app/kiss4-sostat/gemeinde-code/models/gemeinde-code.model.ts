export interface IGemeindeCode {
    BaGemeindeID: any;
    PLZ: any;
    Name: string;
    Kanton: string;
    BFSCode: any;
}

export class GemeindeCode implements IGemeindeCode {
    public BaGemeindeID: any;
    public PLZ: any;
    public Name: string;
    public Kanton: string;
    public BFSCode: any;
    constructor(data?: IGemeindeCode) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
