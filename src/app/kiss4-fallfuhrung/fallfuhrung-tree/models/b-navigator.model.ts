export class IBNavigatorItem {
    pkey: number;
    modulTreeID?: number;
    id: string;
    parentID: string;
    iconID: number;
    name: string;
    baPersonID: number;
    faFallID: number;
    faLeistungID: number;
    editMask: string;
    unterstuetzt: number;
    age: number;
    dmgPersonID: number;
    className: string;
    maskName: string;
}
export class BNavigatorItem implements IBNavigatorItem {
    public pkey: number;
    public modulTreeID?: number;
    public id: string;
    public parentID: string;
    public iconID: number;
    public name: string;
    public baPersonID: number;
    public faFallID: number;
    public faLeistungID: number;
    public editMask: string;
    public unterstuetzt: number;
    public age: number;
    public dmgPersonID: number;
    public className: string;
    public maskName: string;
    constructor(data?: IBNavigatorItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IBNavigatorItemsQuery {
    baPersonID: number;
    faFallID?: number;
    modulID: number;
}
export class BNavigatorItemsQuery implements IBNavigatorItemsQuery {
    baPersonID: number;
    faFallID?: number;
    modulID: number;
    constructor(data?: IBNavigatorItemsQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
