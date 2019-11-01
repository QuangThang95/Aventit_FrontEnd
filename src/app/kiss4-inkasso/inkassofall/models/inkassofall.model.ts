export interface IInkassofall {
    eroffnetAm: any;
    typ: any;
    abgeschlossenAm: any;
    eroffnetGrund: any;
    abgeschlossenGrund: any;
    bemerkung: any;
}


export class Inkassofall implements IInkassofall {
    public eroffnetAm: any;
    public typ: any;
    public abgeschlossenAm: any;
    public eroffnetGrund: any;
    public abgeschlossenGrund: any;
    public bemerkung: any;

    constructor(data?: IInkassofall) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
