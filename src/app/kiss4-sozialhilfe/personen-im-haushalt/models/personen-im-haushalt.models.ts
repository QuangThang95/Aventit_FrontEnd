// Using for login
interface IInitData {
  userId: number;
  sender: string;
  nameVorname: string;
}

export class InitData implements IInitData {
  userId: number;
  sender: string;
  nameVorname: string;

  constructor(data?: IInitData) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// Query for API get header
export interface IPersonenImHaushalt {
  bgFinanzplanID: number;
  baPersonID?: number;
  bgBewilligungStatusCode: number;
  finanzplanVon: Date;
  finanzplanBis?: Date;
  nameVorname: string;
  wohnsitzStrasseHausNr: string;
  wohnsitzPLZOrt: string;
  geburtsdatum?: Date;
  heimatort: string;
}
export class PersonenImHaushaltQuery implements IPersonenImHaushalt {
  bgFinanzplanID: number;
  baPersonID?: number;
  bgBewilligungStatusCode: number;
  finanzplanVon: Date;
  finanzplanBis?: Date;
  nameVorname: string;
  wohnsitzStrasseHausNr: string;
  wohnsitzPLZOrt: string;
  geburtsdatum?: Date;
  heimatort: string;
  constructor(data?: IPersonenImHaushalt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// Query for API get WhKennzahlen
export interface IWhKennzahlen {
  bgFinanzplanID?: number;
  hgGrundbedarf: number;
  ueGrundbedarf: number;
  hgWohnkosten?: number;
  ueWohnkosten?: number;
  hgZuschlagI?: number;
  ueZuschlagI?: number;
  b23Amount: number;
  gBUseHgUeFactor?: number;
  rntUseHgUeFactor?: number;
  gBHgUeFactor?: number;
  rntHgUeFactor?: number;
  refDate: Date;
}

export interface IViewWhKennzahlenData {
  grundbedarf: number;
  wohnkosten: number;
  zuschlagI: number;
}
export class WhKennzahlenQuery {
  private WhKennzahlenData: IWhKennzahlen;
  upperViewWhKennzahlen: IViewWhKennzahlenData;
  lowerViewWhKennzahlen: IViewWhKennzahlenData;
  constructor(data?: IWhKennzahlen) {
    if (data) {
      this.WhKennzahlenData = data;
      this.setViewWhKennzahlenData();
    }
  }

  private setViewWhKennzahlenData() {
    this.upperViewWhKennzahlen = {
      grundbedarf: this.WhKennzahlenData.hgGrundbedarf,
      wohnkosten: this.WhKennzahlenData.hgWohnkosten,
      zuschlagI: this.WhKennzahlenData.hgZuschlagI,
    };
    this.lowerViewWhKennzahlen = {
      grundbedarf: this.WhKennzahlenData.ueGrundbedarf,
      wohnkosten: this.WhKennzahlenData.ueWohnkosten,
      zuschlagI: this.WhKennzahlenData.ueZuschlagI,
    };
  }
}

// Query for API get Klientensystem

export interface IKlientenSystem {
  baPersonID: number;
  nameVorname: string;
  geburtsdatum?: Date;
  alter?: number;
  beziehung: string;
  unterstuetzt: boolean;
}

export class KlientenSystemQuery {
  private klientenSystem: IKlientenSystem[] = [];
  constructor(data: IKlientenSystem[]) {
    if (data && data.length) {
      this.klientenSystem = data;
    }
  }

  get ViewKlientenSystem() {
    return this.klientenSystem.map(row => (
      {
        baPersonID: row.baPersonID,
        nameVorname: row.nameVorname,
        geburtsdatum: row.geburtsdatum,
        alter: row.alter,
        beziehung: row.beziehung,
      }
    ));
  }
}

// Query for API get Haushalt
export interface IHaushalt {
  bgFinanzplanID: number;
  baPersonID: number;
  istUnterstuetzt: boolean;
  baZahlungswegID?: number;
  referenzNummer: string;
  kbKostenstelleID?: number;
  kbKostenstelleID_KVG?: number;
  shNrmVerrechnungsbasisID: number;
  prsNummerKanton: string;
  prsNummerHeimat: string;
  nrmVerrechnungVon?: Date;
  nrmVerrechnungBis?: Date;
  nrmVerrechnungsAnteilCode?: number;
  istAuslandCh: boolean;
  auslandChVon?: Date;
  auslandChBis?: Date;
  auslandChMeldungAm?: Date;
  auslandChReferenzNrBund: string;
  burgergemeindeID?: number;
  bemerkung: string;
  bgFinanzplan_BaPersonTS: number[];
  nameVorname: string;
  geburtsdatum?: Date;
  alter?: number;
  beziehung: string;
}
export class HaushaltQuery {
  private haushaltData: IHaushalt[] = [];
  constructor(data: IHaushalt[]) {
    if (data && data.length) {
      this.haushaltData = data;
    }
  }

  get ViewHaushaltData() {
    return this.haushaltData.map(row => (
      {
        baPersonID: row.baPersonID,
        istUnterstuetzt: row.istUnterstuetzt,
        nameVorname: row.nameVorname,
        geburtsdatum: row.geburtsdatum,
        alter: row.alter,
        beziehung: row.beziehung,
        bgFinanzplan_BaPersonTS: row.bgFinanzplan_BaPersonTS,
      }
    ));
  }
}

// Query for API SaveWhPersonen
export interface ISaveWhPersonen {
  value: boolean;
}
export class SaveWhPersonenQuery implements ISaveWhPersonen {
  value: boolean;
  constructor(data: ISaveWhPersonen) {
    if (data) {
      this.value = data.value;
    }
  }
}

// If the function have left menu
interface ITreeNavigator {
  id: number;
  caption: string;
  expanded?: boolean;
  enabled: boolean;
  name: string;
  tag: string;
  count?: number;
  parentId?: number;
  selected?: boolean;
}

export class TreeNav implements ITreeNavigator {
  id: number;
  caption: string;
  expanded?: boolean;
  enabled: boolean;
  name: string;
  tag: string;
  count?: number;
  parentId?: number;
  selected?: boolean;

  constructor(data?: ITreeNavigator) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
