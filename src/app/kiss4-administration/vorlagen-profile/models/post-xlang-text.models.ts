export interface IPostXLangText {
    tid: number;
    languageCode?: number;
    text?: string;
}

export class PostXLangText implements IPostXLangText {
    tid: number;
    languageCode?: number;
    text?: string;

    constructor(data?: IPostXLangText) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
