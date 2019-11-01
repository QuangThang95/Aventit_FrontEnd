// Model for DPL select box data
export interface IDPLSelectboxModel {
    code: number;
    text?: string;
}

export class DPLSelectboxModel implements IDPLSelectboxModel {
    public code: number;
    public text: string;
    constructor(data?: IDPLSelectboxModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
