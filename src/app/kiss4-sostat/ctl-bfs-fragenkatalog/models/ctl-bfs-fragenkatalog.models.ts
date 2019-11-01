// Using for search gridview
export interface ICtlBfsFragenkatalog {
  BFSFeldCode?: number;
  BFSFormat: string;
  BFSFrageID?: number;
  BFSKatalogVersionID?: number;
  BFSKategorieCode?: number;
  BFSLeistungsfilterCodes: string;
  BFSLOVName: string;
  BFSPersonCode?: number;
  BFSValidierungCode?: number;
  Editierbar?: boolean;
  ExportAttribute: string;
  ExportNode: string;
  ExportPredicate: string;
  FFFeld: string;
  FFLOVName: string;
  FFPKFeld: string;
  FFTabelle: string;
  FilterRegel: string;
  Frage: string;
  HerkunftBeschreibung: string;
  HerkunftCode: string;
  HerkunftSQL: string;
  HilfeText: string;
  HilfeTitel: string;
  PersonIndex?: number;
  Reihenfolge?: number;
  UpdateOK: boolean;
  Variable: string;
  VariableAntragsteller: string;
  VariableExpandiert: string;
  Vorgabewert: any;
  Persontext: string;
  Kategorietext: string;
}

export class CtlBfsFragenkatalog implements ICtlBfsFragenkatalog {
  public BFSFeldCode?: number;
  public BFSFormat: string;
  public BFSFrageID?: number;
  public BFSKatalogVersionID?: number;
  public BFSKategorieCode?: number;
  public BFSLeistungsfilterCodes: string;
  public BFSLOVName: string;
  public BFSPersonCode?: number;
  public BFSValidierungCode?: number;
  public Editierbar?: boolean;
  public ExportAttribute: string;
  public ExportNode: string;
  public ExportPredicate: string;
  public FFFeld: string;
  public FFLOVName: string;
  public FFPKFeld: string;
  public FFTabelle: string;
  public FilterRegel: string;
  public Frage: string;
  public HerkunftBeschreibung: string;
  public HerkunftCode: string;
  public HerkunftSQL: string;
  public HilfeText: string;
  public HilfeTitel: string;
  public PersonIndex?: number;
  public Reihenfolge?: number;
  public UpdateOK: boolean;
  public Variable: string;
  public VariableAntragsteller: string;
  public VariableExpandiert: string;
  public Vorgabewert: any;
  public Persontext: string;
  public Kategorietext: string;

  constructor(data?: ICtlBfsFragenkatalog) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

