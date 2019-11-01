export interface IPendenzenVerwaltungQuery {
    SucheTaskStatusCode?: number;
    SucheTaskTypeCode?: number;
    SucheSubject: string;
    SucheSenderId?: number;
    SucheTaskSenderCode?: number;
    SucheReceiverId?: number;
    SucheTaskReceiverCode?: number;
    SucheCreateDateVon: string;
    SucheCreateDateBis: string;
    SucheExpirationDateVon: string;
    SucheExpirationDateBis: string;
    SucheStartDateVon: string;
    SucheStartDateBis: string;
    SucheDoneDateVon: string;
    SucheDoneDateBis: string;
    SucheName: string;
    SucheVorname: string;
    SucheFallId: string; // number
    SucheSar?: number;
    SucheOrgUnit?: number;
    SucheLeistungId?: number | null;
    NavBarItemName: string | null;
}

export class PendenzenVerwaltungQuery implements IPendenzenVerwaltungQuery {
    SucheTaskStatusCode?: number;
    SucheTaskTypeCode?: number;
    SucheSubject: string;
    SucheSenderId?: number;
    SucheTaskSenderCode?: number;
    SucheReceiverId?: number | null;
    SucheTaskReceiverCode?: number | null; // typeCode
    SucheCreateDateVon: string;
    SucheCreateDateBis: string;
    SucheExpirationDateVon: string;
    SucheExpirationDateBis: string;
    SucheStartDateVon: string;
    SucheStartDateBis: string;
    SucheDoneDateVon: string;
    SucheDoneDateBis: string;
    SucheName: string;
    SucheVorname: string;
    SucheFallId: string;
    SucheSar?: number;
    SucheOrgUnit?: number;
    SucheLeistungId?: number | null;
    NavBarItemName: string | null;

    constructor(data?: IPendenzenVerwaltungQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
