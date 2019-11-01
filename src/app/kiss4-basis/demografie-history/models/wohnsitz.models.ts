export interface IWohnsitz {
  baAdresseID: number;
  baPersonID: number;
  baInstitutionID: number;
  userID: number;
  platzierungInstID: number;
  vmMandantID: number;
  vmPriMaID: number;
  kaBetriebID: number;
  kaBetriebKontaktID: number;
  baLandID: number;
  datumVon: Date;
  datumBis: Date;
  ausEinwohnerregister: boolean;
  gesperrt: boolean;
  adresseCode: number;
  careOf: string;
  zusatz: string;
  zuhandenVon: string;
  strasse: string;
  strasseCode: number;
  hausNr: string;
  postfach: string;
  postfachOhneNr: boolean;
  plz: string;
  ort: string;
  ortschaftCode: number;
  kanton: string;
  bezirk: string;
  bemerkung: string;
  institutionName: string;
  platzierungsartCode: number;
  wohnStatusCode: number;
  wohnungsgroesseCode: number;
  quartierCode: number;
  migrationKA: number;
  verID: number;
  creator: string;
  created: Date;
  modifier: string;
  modified: Date;
  verID_DELETED: number;
  wohnungsgroesseName: string;
  wohnStatusName: string;
  baLandName: string;
}

export class Wohnsitz implements IWohnsitz {
  public baAdresseID: number;
  public baPersonID: number;
  public baInstitutionID: number;
  public userID: number;
  public platzierungInstID: number;
  public vmMandantID: number;
  public vmPriMaID: number;
  public kaBetriebID: number;
  public kaBetriebKontaktID: number;
  public baLandID: number;
  public datumVon: Date;
  public datumBis: Date;
  public ausEinwohnerregister: boolean;
  public gesperrt: boolean;
  public adresseCode: number;
  public careOf: string;
  public zusatz: string;
  public zuhandenVon: string;
  public strasse: string;
  public strasseCode: number;
  public hausNr: string;
  public postfach: string;
  public postfachOhneNr: boolean;
  public plz: string;
  public ort: string;
  public ortschaftCode: number;
  public kanton: string;
  public bezirk: string;
  public bemerkung: string;
  public institutionName: string;
  public platzierungsartCode: number;
  public wohnStatusCode: number;
  public wohnungsgroesseCode: number;
  public quartierCode: number;
  public migrationKA: number;
  public verID: number;
  public creator: string;
  public created: Date;
  public modifier: string;
  public modified: Date;
  public verID_DELETED: number;
  public wohnungsgroesseName: string;
  public wohnStatusName: string;
  public baLandName: string;
  public constructor(data?: IWohnsitz) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];

        }
      }
    }
  }
}
