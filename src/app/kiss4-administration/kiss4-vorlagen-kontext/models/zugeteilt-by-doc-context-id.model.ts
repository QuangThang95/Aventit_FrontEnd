export interface IZugeteiltByDocContextID {
  xDocContext_TemplateID?: any;
  parentID?: number;
  parentPosition?: number;
  folderName?: string;
  docContextID?: number;
  docTemplateID?: number;
  xDocContext_TemplateTS?: any;
  modulID?: number;
  itemName?: string;
  iconID?: number;
}
export class ZugeteiltByDocContextID implements IZugeteiltByDocContextID {
  xDocContext_TemplateID?: any;
  parentID?: number;
  parentPosition?: number;
  folderName?: string;
  docContextID?: number;
  docTemplateID?: number;
  xDocContext_TemplateTS?: any;
  modulID?: number;
  itemName?: string;
  iconID?: number;

  constructor(data?: IZugeteiltByDocContextID) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
