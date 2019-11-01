export interface IMitarbeiter {
    displayText: string;
    logonName: string;
    name: string;
    userID: number;
}

export class Mitarbeiter implements IMitarbeiter {
    public displayText: string;
    public logonName: string;
    public name: string;
    public userID: number;
    constructor(data?: IMitarbeiter) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
