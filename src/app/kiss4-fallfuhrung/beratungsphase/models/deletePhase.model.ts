/********  Model for delete function  ***********/
export interface IDeletePhaseItem {
    value: any;
}

export class DeletePhaseItem implements IDeletePhaseItem {
    public value: any;
    constructor(data?: IDeletePhaseItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IDeletePhaseQuery {
    faPhaseID: any;
}

export class DeletePhaseQuery implements IDeletePhaseQuery {
    public faPhaseID: any;
    constructor(data?: IDeletePhaseQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/******** The end Model for delete function  ***********/
