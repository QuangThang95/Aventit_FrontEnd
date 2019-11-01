export interface IFaleistung {
  datumBis: any;
  countPhase: number;
  countDatenErfasst: number;
  hasOtherModul: boolean;
  hasClosedModul: boolean;
  hasClosedF: boolean;
}
export class Faleistung implements IFaleistung {
  public datumBis: any;
  public countPhase: number;
  public countDatenErfasst: number;
  public hasOtherModul: boolean;
  public hasClosedModul: boolean;
  public hasClosedF: boolean;
  constructor(data?: IFaleistung) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IMessage {
  message: string;
}

export class Message implements IMessage {
  public message: string;
  constructor(data?: Message) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IFallNavigator {
  dataFallNavigator: string;
}

export class FallNavigator implements IFallNavigator {
  public dataFallNavigator: string;
  constructor(data?: IFallNavigator) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
