export interface IResSuccess {
  isSuccess: boolean;
}
export class ResSuccess implements IResSuccess {
  public isSuccess: boolean;

  constructor(data?: IResSuccess) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
