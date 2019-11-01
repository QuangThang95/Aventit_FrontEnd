export interface ISidebarMenuModel {
    id: any | undefined;
    name: string;
    iconFa?: string;
    iconSrc?: string;
    sort?: number;
    disabled?: boolean;
    selected?: boolean;
    expanded?: boolean;
    parentId?: any | null;
    url?: string | undefined;
    queryParams?: object | {};
}
export class SidebarMenuModel implements ISidebarMenuModel {
    id: any | undefined;
    name: string;
    iconFa?: string;
    iconSrc?: string;
    sort?: number;
    disabled?: boolean;
    selected?: boolean;
    expanded?: boolean;
    parentId?: any | null;
    url?: string | undefined;
    queryParams?: object | {};

    constructor(data?: ISidebarMenuModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
