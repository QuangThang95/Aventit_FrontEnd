export interface IKontakt {
  id: number;
  baInstitutionKontaktID: number;
  baInstitutionID: number;
  aktiv: boolean;
  manuelleAnrede: boolean;
  anrede: string;
  briefanrede: string;
  titel: string;
  name: string;
  vorname: string;
  geschlechtCode?: number;
  telefon: string;
  fax: string;
  eMail: string;
  sprachCode?: number;
  bemerkung: string;
  creator: string;
  created: Date;
  modifier: string;
  modified: Date;
  baInstitutionKontaktTS: number[];
  institution: string;
  adresse: string;
}

export class Kontakt implements IKontakt {
  id: number;
  baInstitutionKontaktID: number;
  baInstitutionID: number;
  aktiv: boolean;
  manuelleAnrede: boolean;
  anrede: string;
  briefanrede: string;
  titel: string;
  name: string;
  vorname: string;
  geschlechtCode?: number;
  telefon: string;
  fax: string;
  eMail: string;
  sprachCode?: number;
  textSprache?: string;
  bemerkung: string;
  creator: string;
  created: Date;
  modifier: string;
  modified: Date;
  baInstitutionKontaktTS: number[];
  institution: string;
  adresse: string;
  constructor(data?: IKontakt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
