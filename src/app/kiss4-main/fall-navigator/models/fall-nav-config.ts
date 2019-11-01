export interface IFallUserConfig {
    UserId?: any | null;
    ActiveChecked?: boolean;
    ClosedChecked?: boolean;
    ArchivedChecked?: boolean;
    IncludeGroupChecked?: boolean;
    IncludeGuestChecked?: boolean;
    ahvNummerChecked?: boolean;
    versichertennummerChecked?: boolean;
    navigatorZusatzChecked?: boolean;
    nNummerChecked?: boolean;
    gemeindeChecked?: boolean;
    kategorieChecked?: boolean;
    fallPendenzenChecked?: boolean;
}
export class FallUserConfig implements IFallUserConfig {
    UserId?: any | null;
    ActiveChecked?: boolean;
    ClosedChecked?: boolean;
    ArchivedChecked?: boolean;
    IncludeGroupChecked?: boolean;
    IncludeGuestChecked?: boolean;
    ahvNummerChecked?: boolean;
    versichertennummerChecked?: boolean;
    navigatorZusatzChecked?: boolean;
    nNummerChecked?: boolean;
    gemeindeChecked?: boolean;
    kategorieChecked?: boolean;
    fallPendenzenChecked?: boolean;

    constructor(data?: IFallUserConfig) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
