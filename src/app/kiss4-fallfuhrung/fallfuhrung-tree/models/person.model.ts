import { IconModule } from './icon-module.model';
export interface IPerson {
  baPersonID: number;
  fullName?: string;
  userID?: number;
  languageCode?: number;
  name?: string;
  icons?: IconModule;
  titleText?: string;
  imageIndex?: string;
  toolTipText?: string;
}

export class Person implements IPerson {
  baPersonID: number;
  fullName?: string;
  userID?: number;
  languageCode?: number;
  name?: string;
  icons?: IconModule;
  titleText?: string;
  imageIndex?: string;
  toolTipText?: string;

  constructor(data?: IPerson) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
