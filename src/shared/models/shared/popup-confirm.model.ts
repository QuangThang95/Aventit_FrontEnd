export interface IPopUpModel {
    title?: string;
    isVisibleTitle?: boolean;
    isVisible: boolean;
    message: string;
    textYes?: string;
    isVisibleYes?: boolean;
    textNo?: string;
    isVisibleNo?: boolean;
    funcYes?: any;
    funcNo?: any;
    funcHiding?: any;
    funcHidden?: any;
}

export class PopUpModel implements IPopUpModel {
    title?: string;
    isVisibleTitle = true;
    isVisible = true;
    message: string;
    textYes?: string;
    isVisibleYes = true;
    textNo?: string;
    isVisibleNo = true;
    funcYes?: any;
    funcNo?: any;
    funcHiding?: any;
    funcHidden?: any;
    constructor(data?: any) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
