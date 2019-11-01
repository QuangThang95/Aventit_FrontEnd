import { formatNumber } from '@shared/utilites/currencyHelper';
// model for title
export interface IBgSilAHVBeitrag {
  faFallID: number;
  faLeistungID: number;
  bgFinanzplanID: number;
  bgBewilligungStatusCode: number;
  finanzplanVon: any;
  finanzplanBis: any;
  anpassenVon: any;
  anpassenBis: any;
}


export class BgSilAHVBeitrag implements IBgSilAHVBeitrag {
  public faFallID: number;
  public faLeistungID: number;
  public bgFinanzplanID: number;
  public bgBewilligungStatusCode: number;
  public finanzplanVon: any;
  public finanzplanBis: any;
  public anpassenVon: any;
  public anpassenBis: any;

  constructor(data?: IBgSilAHVBeitrag) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// model for person select box
export interface IPersonenUnterstuetzt {
  baPersonID?: number;
  nameVorname: string;
  name: string;
  vorname: string;
  lt: boolean;
}


export class PersonenUnterstuetzt implements IPersonenUnterstuetzt {
  public baPersonID?: number;
  public nameVorname: string;
  public name: string;
  public vorname: string;
  public lt: boolean;

  constructor(data?: IPersonenUnterstuetzt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// model for la select box
export interface ISqlQueryShPositionTyp {
  bgPositionsartID: number;
  name: string;
  code: number;
  text: string;
  hilfeText: string;
  verwaltungSD_Default: boolean;
}


export class SqlQueryShPositionTyp implements ISqlQueryShPositionTyp {
  public bgPositionsartID: number;
  public name: string;
  public code: number;
  public text: string;
  public hilfeText: string;
  public verwaltungSD_Default: boolean;

  constructor(data?: ISqlQueryShPositionTyp) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// model for la gird layout
export interface IAHVBeitragPosition {
  bgPositionID: number;
  anpassenVon?: any;
  bgPositionID_Parent?: number;
  bgPositionID_CopyOf?: number;
  bgBudgetID: number;
  baPersonID?: number;
  baPersonIDNew?: number;
  bgPositionsartID?: number;
  bgPositionsartTitle?: string;
  bgSpezkontoID?: number;
  baInstitutionID?: number;
  erstelltUserID?: number;
  mutiertUserID?: number;
  bgPositionID_AutoForderung?: number;
  bgKategorieCode: number;
  shBelegID?: number;
  betrag: any;
  betragFormat: any;
  reduktion: any;
  abzug: any;
  betragEff?: any;
  maxBeitragSD: any;
  buchungstext: string;
  verwaltungSD: boolean;
  bemerkung: string;
  datumVon?: any;
  datumBis?: any;
  oldID?: number;
  verwPeriodeVon?: any;
  verwPeriodeBis?: any;
  faelligAm?: any;
  rechnungDatum?: any;
  bgBewilligungStatusCode: number;
  value1?: any;
  value2?: any;
  value3?: any;
  betragAnfrage?: number;
  bgAuszahlungID?: number;
  datumEff?: number;
  bemerkungSaldierung: string;
  saldiert: boolean;
  erstelltDatum?: any;
  mutiertDatum?: any;
  bgPositionTS: any;
  betragGBLAufAusgabekonto?: number;
  geburtsdatum?: any;
  nameVorname: string;
  institutionName: string;
  anpassung: boolean;
}

export class AHVBeitragPosition implements IAHVBeitragPosition {
  public bgPositionID: number;
  public anpassenVon?: any;
  public bgPositionID_Parent?: number;
  public bgPositionID_CopyOf?: number;
  public bgBudgetID: number;
  public baPersonID?: number;
  public baPersonIDNew?: number;
  public bgPositionsartID?: number;
  public bgPositionsartTitle?: string;
  public bgSpezkontoID?: number;
  public baInstitutionID?: number;
  public erstelltUserID?: number;
  public mutiertUserID?: number;
  public bgPositionID_AutoForderung?: number;
  public bgKategorieCode: number;
  public shBelegID?: number;
  public betrag: any;
  public betragFormat: any;
  public reduktion: number;
  public abzug: number;
  public betragEff?: number;
  public maxBeitragSD: number;
  public buchungstext: string;
  public verwaltungSD: boolean;
  public bemerkung: string;
  public datumVon?: any;
  public datumBis?: any;
  public oldID?: number;
  public verwPeriodeVon?: any;
  public verwPeriodeBis?: any;
  public faelligAm?: any;
  public rechnungDatum?: any;
  public bgBewilligungStatusCode: number;
  public value1?: any;
  public value2?: any;
  public value3?: any;
  public betragAnfrage?: number;
  public bgAuszahlungID?: number;
  public datumEff?: number;
  public bemerkungSaldierung: string;
  public saldiert: boolean;
  public erstelltDatum?: any;
  public mutiertDatum?: any;
  public bgPositionTS: any;
  public betragGBLAufAusgabekonto?: number;
  public geburtsdatum?: any;
  public nameVorname: string;
  public institutionName: string;
  public anpassung: boolean;

  constructor(data?: IAHVBeitragPosition) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
      this.baPersonIDNew = data.baPersonID;
    }
  }
}

// model for IInstitutionSuchenWh
export interface IInstitutionSuchenWh {
  id: number;
  institution: string;
  adresse: string;
  typen: string;
}

export class InstitutionSuchenWh implements IInstitutionSuchenWh {
  public id: number;
  public institution: string;
  public adresse: string;
  public typen: string;

  constructor(data?: IInstitutionSuchenWh) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// model for DropDownAnpassung
export interface IDropDownAnpassung {
  firstDate: any;
  text: any;
}

export class DropDownAnpassung implements IDropDownAnpassung {
  public firstDate: any;
  public text: any;

  constructor(data?: IDropDownAnpassung) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// model for IInstitutionSuchenWh
export interface ILookUps {
  bfscode?: number;
  code: number;
  description: any;
  isActive?: boolean;
  lovcodeName: string;
  lovname: string;
  lovnameNavigation: any;
  shortText: string;
  shortTextTid?: number;
  sortKey?: number;
  system: boolean;
  text: string;
  textTid?: number;
  value1: string;
  value1Tid?: any;
  value2: any;
  value2Tid?: any;
  value3: any;
  value3Tid?: any;
  xlov: any;
  xlovcodeId: number;
  xlovcodeTs: any;
  xlovid: number;
}

export class LookUps implements ILookUps {
  public bfscode?: number;
  public code: number;
  public description: any;
  public isActive?: boolean;
  public lovcodeName: string;
  public lovname: string;
  public lovnameNavigation: any;
  public shortText: string;
  public shortTextTid?: number;
  public sortKey?: number;
  public system: boolean;
  public text: string;
  public textTid?: number;
  public value1: string;
  public value1Tid?: any;
  public value2: any;
  public value2Tid?: any;
  public value3: any;
  public value3Tid?: any;
  public xlov: any;
  public xlovcodeId: number;
  public xlovcodeTs: any;
  public xlovid: number;

  constructor(data?: ILookUps) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}


