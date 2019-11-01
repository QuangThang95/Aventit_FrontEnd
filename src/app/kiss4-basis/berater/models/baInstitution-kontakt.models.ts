export interface IBaInstitutionKontakt {
  statusCode: string;
  msgCode: string;
  msgType: number;
  msgText: string;
}

export class BaInstitutionKontakt implements IBaInstitutionKontakt {
  statusCode: string;
  msgCode: string;
  msgType: number;
  msgText: string;
  constructor(data?: IBaInstitutionKontakt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
