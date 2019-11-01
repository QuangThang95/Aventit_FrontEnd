// Model for api init search
export interface IDataSearch {
  jahr: any;
}
export class DataSearch implements IDataSearch {
  public jahr: any;
  constructor(dataSearch?: IDataSearch) {
    if (dataSearch) {
      for (const property in dataSearch) {
        if (dataSearch.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>dataSearch)[property];
        }
      }
    }
  }
}
// Model for PlausifehlerSearch
export interface IModelSearch {
    Jahr: number;
    Stichtag?:	boolean;
    Anfangszustand?:	boolean;
    NameVorname?:	string;
    UserIDLookup?:	number;
}
export class ModelSearch implements IModelSearch {
    public Jahr: number;
    public Stichtag?:	boolean;
    public Anfangszustand?:	boolean;
    public  NameVorname?:	string;
    public UserIDLookup?:	number;
    constructor(dataSearch?: IModelSearch) {
        if (dataSearch) {
            for (const property in dataSearch) {
                if (dataSearch.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>dataSearch)[property];
                }
            }
        }
    }
}
