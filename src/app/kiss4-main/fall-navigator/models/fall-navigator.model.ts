export interface IFallNavFilterModel {
    UserId?: any | null;
    Active?: boolean;
    Closed?: boolean;
    Archived?: boolean;
    IncludeGroup?: boolean;
    IncludeGuest?: boolean;
    IncludeTasks?: boolean;
}
export class FallNavFilterModel implements IFallNavFilterModel {
    UserId?: any | null;
    Active?: boolean;
    Closed?: boolean;
    Archived?: boolean;
    IncludeGroup?: boolean;
    IncludeGuest?: boolean;
    IncludeTasks?: boolean;

    constructor(data?: IFallNavFilterModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
