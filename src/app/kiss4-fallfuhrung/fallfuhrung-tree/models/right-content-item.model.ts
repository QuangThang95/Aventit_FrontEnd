export class IRightContentItem {
    xlovCodeID: number;
    xlovid:	number;
    lovName: string;
    code: number;
    text: string;
    textTID?: number;
    sortKey?: number;
    shortText: string;
    shortTextTID?: number;
    bfsCode?: number;
    value1: string;
    value1TID?:	number;
    value2:	string;
    value2TID?:	number;
    value3:	string;
    value3TID?:	number;
    description: string;
    lovCodeName: string;
    isActive: boolean;
    system: boolean;
    xlovCodeTS: string;
}
export class RightContentItem implements IRightContentItem {
    public xlovCodeID: number;
    public xlovid:	number;
    public lovName: string;
    public code: number;
    public text: string;
    public textTID?: number;
    public sortKey?: number;
    public shortText: string;
    public shortTextTID?: number;
    public bfsCode?: number;
    public value1: string;
    public value1TID?:	number;
    public value2:	string;
    public value2TID?:	number;
    public value3:	string;
    public value3TID?:	number;
    public description: string;
    public lovCodeName: string;
    public isActive: boolean;
    public system: boolean;
    public xlovCodeTS: string;
    constructor(data?: IRightContentItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
