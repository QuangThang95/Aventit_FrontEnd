// Model for list Person
export interface IPerson {
    baPersonID: number;
    name: string;
    plzOrt: string;
    strasse: string;
}
export class Person implements IPerson {
    baPersonID: number;
    name: string;
    plzOrt: string;
    strasse: string;
    constructor(dataSearch?: IPerson) {
        if (dataSearch) {
            for (const property in dataSearch) {
                if (dataSearch.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>dataSearch)[property];
                }
            }
        }
    }
}
