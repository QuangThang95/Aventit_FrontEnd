export interface IButton {
    modulID: number;
    shortName: string;
    isEnabled: boolean;
    tooltipText: string;
    imagePath: string;
    iconID: number;
}

export class Button implements IButton {
    public modulID: number;
    public shortName: string;
    public isEnabled: boolean;
    public tooltipText: string;
    public imagePath: string;
    public iconID: number;

    constructor(data?: IButton) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
