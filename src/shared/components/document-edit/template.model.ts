export interface ITemplateModel {
    FileName: string;
    DisplayName: string;
    Href: string;
}

export class TemplateModel implements ITemplateModel {
    FileName: string;
    DisplayName: string;
    Href: string;
    constructor(model?: ITemplateModel) {
        if (model) {
            this.FileName = model.DisplayName;
            this.DisplayName = model.DisplayName !== null ? model.DisplayName.split('.')[0] : '_blank';
            this.Href = model.Href;
        }
    }
}
