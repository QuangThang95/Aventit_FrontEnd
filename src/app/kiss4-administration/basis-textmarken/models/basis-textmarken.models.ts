
export interface IBasistextmarken {
  bookmarkName: string;
  displayName: string;
  bookmarkNameTID: number;
  category: string;
  categoryTID: number;
  bookmarkCode: number;
  tableName: string;
  description: string;
  descriptionTID: number;
  sql: string;
  modulID: number;
  alwaysVisible: boolean;
  system: boolean;
  xBookmarkTS: string;
  modul: string;
  bookmarkCodeText: string;
  isUpdate: boolean;
}

export class Basistextmarken implements IBasistextmarken {
  public bookmarkName: string;
  public displayName: string;
  public displayNameCoppy: string;
  public bookmarkNameTID: number;
  public category: string;
  public categoryTID: number;
  public bookmarkCode: number;
  public tableName: string;
  public description: string;
  public descriptionTID: number;
  public sql: string;
  public modulID: number;
  public alwaysVisible: boolean;
  public system: boolean;
  public xBookmarkTS: string;
  public modul: string;
  public bookmarkCodeText: string;
  public languageCode: number;
  public isUpdate: boolean;
  constructor(data?: IBasistextmarken) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// Using for search region
export interface ITextmarkenQuery {
  itemType: string;
}
export class TextmarkenQuery implements ITextmarkenQuery {
  itemType: string;
  constructor(data?: ITextmarkenQuery) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
