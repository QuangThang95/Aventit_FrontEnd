export class IBapersonRelationQuery {
    baPersonID_1: number;
    baPersonID_2: number;
    name: string;
}
export class BapersonRelationQuery implements IBapersonRelationQuery {
    public baPersonID_1: number;
    public baPersonID_2: number;
    public name: string;
    constructor(data?: IBapersonRelationQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
