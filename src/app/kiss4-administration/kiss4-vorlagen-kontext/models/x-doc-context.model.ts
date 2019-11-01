export interface IXDocContext {
  docContextID: number;
  docContextName: string;
  description: string;
  system: boolean;
  xDocContextTS: any;
}
export class XDocContext implements IXDocContext {
  docContextID: number;
  docContextName: string;
  description: string;
  system: boolean;
  xDocContextTS: any;

  constructor(data?: IXDocContext) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IInsertXDocContext {
  docContextName: string;
  description: string;
  system: boolean;
}
export class InsertXDocContext implements IInsertXDocContext {
  docContextName: string;
  description: string;
  system: boolean;

  constructor(data?: IInsertXDocContext) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IInsertXDocContextTemplate {
  xDocContext_TemplateID: number;
  docContextID: number;
  docTemplateID: number;
  folderName: string;
  parentID: number;
  parentPosition: number;
}
export class InsertXDocContextTemplate implements IInsertXDocContextTemplate {
  xDocContext_TemplateID: number;
  docContextID: number;
  docTemplateID: number;
  folderName: string;
  parentID: number;
  parentPosition: number;

  constructor(data?: IInsertXDocContextTemplate) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IUpdateXDocContext {
  docContextName: string;
  description: string;
  system: boolean;
  docContextID: number;
  xDocContextTS: any;
}
export class UpdateXDocContext implements IUpdateXDocContext {
  docContextName: string;
  description: string;
  system: boolean;
  docContextID: number;
  xDocContextTS: any;

  constructor(data?: IUpdateXDocContext) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IUpdateXDocContextTemplate {
  xDocContext_TemplateID: number;
  parentPosition: number;
}
export class UpdateXDocContextTemplate implements IUpdateXDocContextTemplate {
  xDocContext_TemplateID: number;
  parentPosition: number;

  constructor(data?: IUpdateXDocContextTemplate) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IXDocInsert {
  docContextID: number;
  xDocContext_TemplateList: InsertXDocContextTemplate [];

}

export class XDocInsert implements IXDocInsert {
  docContextID: number;
  xDocContext_TemplateList: InsertXDocContextTemplate [];

  constructor(data?: IXDocInsert) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
