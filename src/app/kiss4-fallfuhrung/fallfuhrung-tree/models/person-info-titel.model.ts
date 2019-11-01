export interface IPersonInfoTitel {
  titleText?: string;
  imageIndex?: string;
  toolTipText?: string;
}

export class PersonInfoTitel implements IPersonInfoTitel {
  titleText?: string;
  imageIndex?: string;
  toolTipText?: string;

  constructor(data?: IPersonInfoTitel) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
