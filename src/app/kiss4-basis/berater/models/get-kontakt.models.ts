export interface IGetKontakt {
  baInstitutionID?: number;
  name: string;
  vorname: string;
  email: string;
  telefon: string;
}

export class GetKontakt implements IGetKontakt {
  baInstitutionID?: number;
  name: string;
  vorname: string;
  email: string;
  telefon: string;
  constructor(data?: IGetKontakt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
