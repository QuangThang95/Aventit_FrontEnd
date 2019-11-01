export interface IPostVorlagenProfile {
    xProfileTypeCode: number;
    nameTID?: number;
    name?: string;
    description?: string;
    creator?: string;
    created?: Date;
    modifier?: string;
    modified?: Date;
}

export class PostVorlagenProfile implements IPostVorlagenProfile {
    xProfileTypeCode: number;
    nameTID?: number;
    name?: string;
    description?: string;
    creator?: string;
    created?: Date;
    modifier?: string;
    modified?: Date;

    constructor(data?: IPostVorlagenProfile) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
