// Model for Grid Leitfaden
export interface IModelLeitfaden {
    xHyperlinkContext_HyperlinkID: number;
    parentID?: number;
    sortKey?: number;
    folderName: string;
    xHyperlinkContextID: number;
    XHyperlinkID?: number;
    userProfileCode?: number;
    xHyperlinkContext_HyperlinkTS: number[];
    hyperlink: string;
    itemName: string;
    iconID: number;
    _body: any;
    status: number;
}

export class ModelLeitfaden implements IModelLeitfaden {
    public xHyperlinkContext_HyperlinkID: number;
    public parentID?: number;
    public sortKey?: number;
    public folderName: string;
    public xHyperlinkContextID: number;
    public XHyperlinkID?: number;
    public userProfileCode?: number;
    public xHyperlinkContext_HyperlinkTS: any[];
    public hyperlink: string;
    public itemName: string;
    public iconID: number;
    public _body: any;
    public status: number;
    constructor(data?: IModelLeitfaden) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model  for get user profile code
export interface IModelQueryLeitfaden {

    userProfileCode?: number;
}

export class ModelQueryLeitfaden implements IModelQueryLeitfaden {
    public userProfileCode?: number;
    constructor(data?: IModelQueryLeitfaden) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
