export interface IGetInstitution {
  baInstitutionTypId: number;
  onlyActive: boolean;
  userID: number;
  languageCode: number;
}

export class GetInstitution implements IGetInstitution {
  baInstitutionTypId: number;
  onlyActive: boolean;
  userID: number;
  languageCode: number;
  constructor(data?: IGetInstitution) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
