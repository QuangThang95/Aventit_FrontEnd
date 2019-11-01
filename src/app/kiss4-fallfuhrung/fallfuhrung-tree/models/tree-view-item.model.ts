export class ITreeViewItem {
    pkey: number;
    modulTreeID: number;
    id: string;
    parentID: string;
    iconID?: number;
    name: string;
    baPersonID?: number;
    faFallID?: number;
    faLeistungID?: number;
    editMask: string;
    dmgPersonID?: number;
    className: string;
    maskName: string;
    aufnahme: Date;
    sarName: string;
    modulID?: number;
    faPhaseID?: number;
    sqlFilter?: string;
    bgFinanzplanID?: number;
    bgBudgetID?: number;
    masterBudget?: boolean;
    bgBewilligungStatusCode?: number;
    abgeschlossen?: boolean;
}
export class TreeViewItem implements ITreeViewItem {
    public pkey: number;
    public modulTreeID: number;
    public id: string;
    public parentID: string;
    public iconID?: number;
    public name: string;
    public baPersonID?: number;
    public faFallID?: number;
    public faLeistungID?: number;
    public editMask: string;
    public dmgPersonID?: number;
    public className: string;
    public maskName: string;
    public aufnahme: Date;
    public sarName: string;
    public modulID?: number;
    public faPhaseID?: number;
    public sqlFilter?: string;
    public bgFinanzplanID?: number;
    public bgBudgetID?: number;
    public masterBudget?: boolean;
    public bgBewilligungStatusCode?: number;
    public abgeschlossen?: boolean;
    constructor(data?: ITreeViewItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface ITreeViewItemsQuery {
    BaPersonID: string;
    FaFallID?: string;
    ModulID: string;
}
export class TreeViewItemsQuery implements ITreeViewItemsQuery {
    BaPersonID: string;
    FaFallID?: string;
    ModulID: string;
    constructor(data?: ITreeViewItemsQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
