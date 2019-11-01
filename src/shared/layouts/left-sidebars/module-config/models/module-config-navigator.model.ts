export class IModuleConfigNavigatorItem {
    menuItemID: number;
    parentMenuItemID?: number;
    enabled: boolean;
    visible: boolean;
    imageIndex: number;
    sortKey?: number;
    className: string;
    xClassID?: number;
    text?: string;
}
export class ModuleConfigNavigatorItem implements IModuleConfigNavigatorItem {
    public menuItemID: number;
    public parentMenuItemID?: number;
    public enabled: boolean;
    public visible: boolean;
    public imageIndex: number;
    public sortKey?: number;
    public className: string;
    public xClassID?: number;
    public text?: string;
    constructor(data?: IModuleConfigNavigatorItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModuleConfigNavigatorItemsQuery {
    LanguageCode: string;
    ClassName: string;
}
export class ModuleConfigNavigatorItemsQuery implements IModuleConfigNavigatorItemsQuery {
    LanguageCode: string;
    ClassName: string;
    constructor(data?: IModuleConfigNavigatorItemsQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
