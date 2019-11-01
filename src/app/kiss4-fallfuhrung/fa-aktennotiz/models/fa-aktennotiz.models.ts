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

// Using for search gridview
export interface IFaAktennotizQueryModel {
    FaLeistungID: number;
    IsDeleted1: boolean;
    IsDeleted2: boolean;
    Themen: string;
    AlleThemen: boolean;
    LanguageCode: number;
    DatumVon?: any;
    DatumBis?: any;
    Stichwort?: string;
    SucheSAR?: number;
    Kontaktart?: number;
    Inhalt: string;
}
export class FaAktennotizQueryModel implements IFaAktennotizQueryModel {
    public FaLeistungID: number;
    public IsDeleted1: boolean;
    public IsDeleted2: boolean;
    public Themen: string;
    public AlleThemen: boolean;
    public LanguageCode: number;
    public DatumVon?: any;
    public DatumBis?: any;
    public Stichwort?: string;
    public SucheSAR?: number;
    public Kontaktart?: number;
    public Inhalt: string;
    constructor(data?: IFaAktennotizQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IFaAktennotiz {
    user: string;
    faAktennotizID: number;
    faLeistungID: number;
    userID?: number;
    datum?: Date;
    zeit?: Date;
    faDauerCode?: number;
    faGespraechsStatusCode?: number;
    faThemaCodes: string;
    faThemaCodesText: string;
    themen: string;
    faGespraechstypCode?: number;
    kontaktpartner: string;
    alimentenstelleTypCode?: number;
    baPersonIDs: string;
    stichwort: string;
    inhaltRTF: string;
    inhalt: string;
    vertraulich: boolean;
    besprechungThema1: boolean;
    besprechungThema2: boolean;
    besprechungThema3: boolean;
    besprechungThema4: boolean;
    besprechungThemaText1: string;
    besprechungThemaText2: string;
    besprechungThemaText3: string;
    besprechungThemaText4: string;
    besprechungZiel1: string;
    besprechungZiel2: string;
    besprechungZiel3: string;
    besprechungZiel4: string;
    besprechungZielGrad1?: number;
    besprechungZielGrad2?: number;
    besprechungZielGrad3?: number;
    besprechungZielGrad4: number;
    faKontaktartCode?: number;
    pendenz1: string;
    pendenz2: string;
    pendenz3: string;
    pendenz4: string;
    pendenzErledigt1?: boolean;
    pendenzErledigt2?: boolean;
    pendenzErledigt3?: boolean;
    pendenzErledigt4?: boolean;
    isDeleted: boolean;
    creator: string;
    created: Date;
    modifier: string;
    modified: Date;
    faAktennotizTS: any[];
}
export class FaAktennotiz implements IFaAktennotiz {
    public user: string;
    public faAktennotizID: number;
    public faLeistungID: number;
    public userID?: number;
    public datum?: Date;
    public zeit?: Date;
    public faDauerCode?: number;
    public faGespraechsStatusCode?: number;
    public faThemaCodes: string;
    public faThemaCodesText: string;
    public themen: string;
    public faGespraechstypCode?: number;
    public kontaktpartner: string;
    public alimentenstelleTypCode?: number;
    public baPersonIDs: string;
    public stichwort: string;
    public inhaltRTF: string;
    public inhalt: string;
    public vertraulich: boolean;
    public besprechungThema1: boolean;
    public besprechungThema2: boolean;
    public besprechungThema3: boolean;
    public besprechungThema4: boolean;
    public besprechungThemaText1: string;
    public besprechungThemaText2: string;
    public besprechungThemaText3: string;
    public besprechungThemaText4: string;
    public besprechungZiel1: string;
    public besprechungZiel2: string;
    public besprechungZiel3: string;
    public besprechungZiel4: string;
    public besprechungZielGrad1?: number;
    public besprechungZielGrad2?: number;
    public besprechungZielGrad3?: number;
    public besprechungZielGrad4: number;
    public faKontaktartCode?: number;
    public pendenz1: string;
    public pendenz2: string;
    public pendenz3: string;
    public pendenz4: string;
    public pendenzErledigt1?: boolean;
    public pendenzErledigt2?: boolean;
    public pendenzErledigt3?: boolean;
    public pendenzErledigt4?: boolean;
    public isDeleted: boolean;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: Date;
    public faAktennotizTS: any[];
    constructor(data?: IFaAktennotiz) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IFaAktennotizModel {
    FaLeistungID: number;
    Datum: Date;
    FaDauerCode: any;
    FaThemaCodes: string;
    Kontaktpartner: string;
    Stichwort: string;
    FaKontaktartCode: number;
    IsDeleted: boolean;
    Modifier: string;
    Modified: Date;
}
export class FaAktennotizDetailModel implements IFaAktennotizModel {
    public FaLeistungID: number;
    public FaAktennotizID: number;
    public FaAktennotizTS: any[];
    public UserID: number;
    public Datum: Date;
    public FaDauerCode: any;
    public FaDauerText: string;
    public FaThemaCodes: string;
    public FaThemaCodesText: string;
    public Kontaktpartner: string;
    public Stichwort: string;
    public InhaltRTF: string;
    public FaKontaktartCode: number;
    public FaKontaktartText: number;
    public AutorText: number;
    public IsDeleted: boolean;
    public Creator: string;
    public Created: Date;
    public Modifier: string;
    public Modified: Date;
    constructor(data?: IFaAktennotizQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export class FaAktennotizUpdateModel implements IFaAktennotizModel {
    public FaAktennotizID: number;
    public FaLeistungID: number;
    public FaAktennotizTS: any[];
    public Datum: Date;
    public FaThemaCodes: string;
    public Kontaktpartner: string;
    public FaDauerCode: any;
    public Stichwort: string;
    public InhaltRTF: string;
    public FaKontaktartCode: number;
    public IsDeleted: boolean;
    public UserID: number;
    public Modifier: string;
    public Modified: Date;
    constructor(data?: IFaAktennotizModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export class FaAktennotizInsertModel implements IFaAktennotizModel {
    public FaLeistungID: number;
    public Datum: Date;
    public FaDauerCode: any;
    public FaThemaCodes: string;
    public Kontaktpartner: string;
    public Stichwort: string;
    public InhaltRTF: string;
    public FaKontaktartCode: number;
    public IsDeleted: boolean;
    public UserID: number;
    public Creator: string;
    public Created: Date;
    public Modifier: string;
    public Modified: Date;
    constructor(data?: IFaAktennotizModel) {
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
export interface IFaAktennotizQuery {
    itemType: string;
}
export class FaAktennotizQuery implements IFaAktennotizQuery {
    itemType: string;
    constructor(data?: IFaAktennotizQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IRadioModel {
    Name: string;
    DisplayName: string;
}
export class RadioModel implements IRadioModel {
    public Name: string;
    public DisplayName: string;
    constructor(data?: IFaAktennotizQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
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

// Model Query Get Config
export interface IModelQueryGetConfig {
    keyPath: string;
    defaultValue: boolean;
}

export class ModelQueryGetConfig implements IModelQueryGetConfig {
    public keyPath: string;
    public defaultValue: boolean;
    constructor(data?: IModelQueryGetConfig) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
