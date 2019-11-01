export interface IVerfuegbarByDocContextID {
  docTemplateID: number;
  docFormatCode: number;
  docTemplateName: string;
}

export class VerfuegbarByDocContextID implements IVerfuegbarByDocContextID {
  docTemplateID: number;
  docFormatCode: number;
  docTemplateName: string;

  constructor(data?: IVerfuegbarByDocContextID) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
