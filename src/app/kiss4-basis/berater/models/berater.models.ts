export interface IBerater{
}

export class Berater implements IBerater {
  constructor(data?: IBerater) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

// Using for search region
export interface IBeraterQuery {
  itemType: string;
}
export class BeraterQuery implements IBeraterQuery {
  itemType: string;
  constructor(data?: IBeraterQuery) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
