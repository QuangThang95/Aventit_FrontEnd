export interface ILanguage {
  Code: number;
  Text: string;
  ShortText: string;
  Value1: string;
  Value2: string;
  Value3: string;
  ShortKey: number;
  IsActive: boolean;
}

export class Language implements ILanguage {
  Code: number;
  Text: string;
  ShortText: string;
  Value1: string;
  Value2: string;
  Value3: string;
  ShortKey: number;
  IsActive: boolean;
  constructor(data?: ILanguage) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
