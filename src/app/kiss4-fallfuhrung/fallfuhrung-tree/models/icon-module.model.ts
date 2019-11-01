export interface IIconModule {
  moduleID?: number;
  shortName?: string;
  iconID?: number;
}

export class IconModule implements IIconModule {
  moduleID?: number;
  shortName?: string;
  iconID?: number;

  constructor(data?: IIconModule) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
