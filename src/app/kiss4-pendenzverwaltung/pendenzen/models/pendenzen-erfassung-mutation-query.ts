export interface IErfassungMutationQuery {
    ErfassungUserId: number | null;
    MutationUserId: number | null;
    ErfassungDate: string;
    MutationDate: string;
}

export class ErfassungMutationQuery implements IErfassungMutationQuery {
    ErfassungUserId: number | null;
    MutationUserId: number | null;
    ErfassungDate: string;
    MutationDate: string;

    constructor(data?: IErfassungMutationQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
