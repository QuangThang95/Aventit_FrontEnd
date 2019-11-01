// Model for list Mitarbeiter
export interface IMitarbeiter {
    userID: number;
    logonName: string;
    name: string;
    displayText: string;
}
export class Mitarbeiter implements IMitarbeiter {
    userID: number;
    logonName: string;
    name: string;
    displayText: string;
    constructor(dataSearch?: IMitarbeiter) {
        if (dataSearch) {
            for (const property in dataSearch) {
                if (dataSearch.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>dataSearch)[property];
                }
            }
        }
    }
}
