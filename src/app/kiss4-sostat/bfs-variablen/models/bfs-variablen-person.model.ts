export interface IPerson {
    baPersonID: number;
    name: string;
    plzOrt: string;
    strasse: string;
}

export class Person implements IPerson {
    public baPersonID: number;
    public name: string;
    public plzOrt: string;
    public strasse: string;
    constructor(data?: IPerson) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
