export interface IPostKontakt {
  BaInstitutionKontaktID: number;
  BaInstitutionID: number;
  Aktiv: boolean;
  ManuelleAnrede: boolean;
  Anrede: string;
  Name: string;
  Vorname: string;
  GeschlechtCode: number;
  Telefon: string;
  Fax: string;
  EMail: string;
  SprachCode: number;
  Bemerkung: string;
  Creator: string;
  Created: Date;
  Modifier: string;
  Modified: Date;
  BaInstitutionKontaktTS: any;
}

export class PostKontakt implements IPostKontakt {
  BaInstitutionKontaktID: number;
  BaInstitutionID: number;
  Aktiv: boolean;
  ManuelleAnrede: boolean;
  Anrede: string;
  Name: string;
  Vorname: string;
  GeschlechtCode: number;
  Telefon: string;
  Fax: string;
  EMail: string;
  SprachCode: number;
  Bemerkung: string;
  Creator: string;
  Created: Date;
  Modifier: string;
  Modified: Date;
  BaInstitutionKontaktTS: any;
  constructor(data?: IPostKontakt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
