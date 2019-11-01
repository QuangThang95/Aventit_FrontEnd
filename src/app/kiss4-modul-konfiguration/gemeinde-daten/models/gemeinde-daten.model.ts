export interface IGemeindeDaten {
    baGemeindeID: any;
    baGemeindeTS: any[];
    bezirkAenderungDatum?: any;
    bezirkAufhebungDatum?: any;
    bezirkAufhebungModus?: any;
    bezirkAufhebungNummer?: any;
    bezirkAufnahmeDatum?: any;
    bezirkAufnahmeModus?: any;
    bezirkAufnahmeNummer?: any;
    bezirkCode?: any;
    bezirkEintragArt?: any;
    bezirkName: string;
    bezirkNameLang: string;
    bezirkNameTID?: any;
    bfsCode?: any;
    bfsDelivered: boolean;
    gemeindeAenderungDatum?: any;
    gemeindeAufhebungDatum?: any;
    gemeindeAufhebungModus?: any;
    gemeindeAufhebungNummer?: any;
    gemeindeAufnahmeDatum?: any;
    gemeindeAufnahmeModus?: any;
    gemeindeAufnahmeNummer?: any;
    gemeindeEintragArt?: any;
    gemeindeHistorisierungID?: any;
    gemeindeStatus?: any;
    kanton: string;
    kantonID?: any;
    kantonNameLang: string;
    name: string;
    nameLang: string;
    nameTID?: any;
    plz?: any;
}


export class GemeindeDaten implements IGemeindeDaten {
    public baGemeindeID: any;
    public baGemeindeTS: any[];
    public bezirkAenderungDatum?: any;
    public bezirkAufhebungDatum?: any;
    public bezirkAufhebungModus?: any;
    public bezirkAufhebungNummer?: any;
    public bezirkAufnahmeDatum?: any;
    public bezirkAufnahmeModus?: any;
    public bezirkAufnahmeNummer?: any;
    public bezirkCode?: any;
    public bezirkEintragArt?: any;
    public bezirkName: string;
    public bezirkNameLang: string;
    public bezirkNameTID?: any;
    public bfsCode?: any;
    public bfsDelivered: boolean;
    public gemeindeAenderungDatum?: any;
    public gemeindeAufhebungDatum?: any;
    public gemeindeAufhebungModus?: any;
    public gemeindeAufhebungNummer?: any;
    public gemeindeAufnahmeDatum?: any;
    public gemeindeAufnahmeModus?: any;
    public gemeindeAufnahmeNummer?: any;
    public gemeindeEintragArt?: any;
    public gemeindeHistorisierungID?: any;
    public gemeindeStatus?: any;
    public kanton: string;
    public kantonID?: any;
    public kantonNameLang: string;
    public name: string;
    public nameLang: string;
    public nameTID?: any;
    public plz?: any;

    constructor(data?: IGemeindeDaten) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
