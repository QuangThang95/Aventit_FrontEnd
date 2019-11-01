interface ILovCodeQuery {
    isSuchenTaskCode?: boolean;
    lovName: string;
}

export class LovCodeQuery implements ILovCodeQuery {
    isSuchenTaskCode?: boolean;
    lovName: string;

    constructor(data?: ILovCodeQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
