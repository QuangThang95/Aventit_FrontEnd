export interface IFallHeaderModel {
    iconID: number;
    shortName: string;

}

export class FallHeaderModel implements IFallHeaderModel {
    iconID: number;
    shortName: string;
    constructor(data?: IFallHeaderModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}