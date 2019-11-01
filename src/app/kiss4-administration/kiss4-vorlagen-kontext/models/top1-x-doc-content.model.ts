export interface ITop1XDocContextTemplateDown {
  xDocContext_TemplateID: number;
  parentID: number;
  parentPosition: number;
  folderName: string;
  docContextID: number;
  docTemplateID: number;
  xDocContext_TemplateTS: any;
  modulID: number;
}

export class Top1XDocContextTemplateDown implements ITop1XDocContextTemplateDown {
  xDocContext_TemplateID: number;
  parentID: number;
  parentPosition: number;
  folderName: string;
  docContextID: number;
  docTemplateID: number;
  xDocContext_TemplateTS: any;
  modulID: number;

  constructor(data?: ITop1XDocContextTemplateDown) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface ITop1XDocContextTemplateUp {
  xDocContext_TemplateID: number;
  parentID: number;
  parentPosition: number;
  folderName: string;
  docContextID: number;
  docTemplateID: number;
  xDocContext_TemplateTS: any;
  modulID: number;
}

export class Top1XDocContextTemplateUp implements ITop1XDocContextTemplateUp {
  xDocContext_TemplateID: number;
  parentID: number;
  parentPosition: number;
  folderName: string;
  docContextID: number;
  docTemplateID: number;
  xDocContext_TemplateTS: any;
  modulID: number;

  constructor(data?: ITop1XDocContextTemplateUp) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
