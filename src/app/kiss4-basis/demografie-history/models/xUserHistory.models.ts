export interface IxUserHistory {
    verID: number;
    datum: Date;
    zeit: Date;
    benutzer: string;
    baPersonID: number;

}
// tslint:disable-next-line:class-name
export class xUserHistory implements IxUserHistory {
    public verID: number;
    public datum: Date;
    public zeit: Date;
    public benutzer: string;
    public baPersonID: number;
    constructor(data?: IxUserHistory) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
