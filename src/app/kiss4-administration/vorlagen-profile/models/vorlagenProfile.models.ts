export interface IVorlagenProfile {
    xProfileID: number;
    nameTID: number | undefined;
    name: string;
    description: string;
    xProfileTypeCode: number;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    xProfileTS: any;
    text: string;
    tags: string;
}

export class VorlagenProfile implements IVorlagenProfile {
    xProfileID: number;
    nameTID: number;
    name: string;
    description: string;
    xProfileTypeCode: number;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    xProfileTS: any;
    text: string;
    tags: string;
    constructor(data?: IVorlagenProfile) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
