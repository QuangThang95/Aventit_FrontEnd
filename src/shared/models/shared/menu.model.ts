export interface IMenuModel {
    id: any | undefined;
    parentID?: number;
    name: string;
    iconSrc?: string;
    sort?: number;
    disabled?: boolean;
    selected?: boolean;
    countedSubItems?: number;
    items?: IMenuModel[] | null;
    url?: string | undefined;
}
export class MenuModel implements IMenuModel {
    id: any | undefined;
    parentID?: number;
    name: string;
    iconSrc?: string;
    sort?: number;
    disabled?: boolean;
    selected?: boolean;
    countedSubItems?: number;
    items?: IMenuModel[] | null;
    url?: string | undefined;
    constructor(data?: IMenuModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class TopMenuItem {
    parentMenuItemID: number | any;
    menuItemId?: number | any;
    controlName?: string;
    caption?: string;
    enabled?: boolean;
    sortKey?: number | any;
    countedSubItems?: number | any;
    beginMenuGroup?: boolean;
    itemShortcutKey?: string;
    imageIndex?: number | any;
    imageIndexDisabled: number | any;
    className?: string;
    showInToolbar: boolean;
    beginToolbarGroup: boolean;
    toolbarSortKey: number | any;
    items: TopMenuItem[];
    constructor(data?: IMenuModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}


// Menu Tree Left
export class MenuTreeModel {
    ID: string;
    name: string;
    expanded?: boolean;
    categoryId?: string;
    selected?: boolean;
    icon?: string;
    age?: number;
    sex?: string;
    constructor(data?: MenuTreeModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Menu Dossiers Left
export class MenuDossiersModel {
    ID: number;
    Name: string;
    Age?: number;
    Sex?: string;
    ImageSrc?: string;
    CategoryName?: string;
    Selected?: boolean;
    CategoryId?: number;
    CreateDate: Date;
    page?: any;
}

export class GridFunctionModel {
    columnChooser = false;
    export = false;
    filterRow = true;
    filterRowHidden = false;
    grouping = false;
    search = false;
    filterBuilder = false;
    _autoSaveSetting = false;
    _saveSetting = true;
    resetAllSetting = false;

    constructor() {

    }

    get autoSaveSetting() {
        return this._autoSaveSetting;
    }
    set autoSaveSetting(value: boolean) {
        this._saveSetting = !value;
        this._autoSaveSetting = value;
    }

    get saveSetting() {
        return this._saveSetting;
    }
    set saveSetting(value: boolean) {
        this._autoSaveSetting = !value;
        this._saveSetting = value;
    }
}
