export interface IPendenzenVerwaltung {
    auswahl: string;
    createDate: string;
    datumVon: string;
    expirationDate?: string;
    jumpToPath?: string;
    receiver: string;
    receiverId: number;
    sender?: string;
    senderEMail?: string;
    senderId?: number;
    subject: string;
    taskDescription?: string;
    taskReceiverCode: string;
    taskSenderCode: string;
    taskStatusCode: number;
    taskStatusCodeText: string;
    taskTypeCode: number;
    xTaskId: number;
    xTaskTs: string;
    baPersonId?: number;
    faFall?: string;
    faFallId?: number;
    falBaPersonId?: number;
    faLeistungId?: number;
    fallnummer?: string;
    leistungModul?: string;
    modulId?: number;
    orgUnitId?: number;
    personBp?: string;
    personFt?: string;
    receiverEMail?: string;
    sar?: string;
    userId?: number;
    startDate?: string;
    userIdInBearbeitung?: number;
    doneDate?: string;
    userIdErledigt?: number;
}
export class PendenzenVerwaltung implements IPendenzenVerwaltung {
    auswahl: string;
    createDate: string;
    datumVon: string;
    expirationDate?: string;
    jumpToPath?: string;
    receiver: string;
    receiverId: number;
    sender?: string;
    senderEMail?: string;
    senderId?: number;
    subject: string;
    taskDescription?: string;
    taskReceiverCode: string;
    taskSenderCode: string;
    taskStatusCode: number;
    taskStatusCodeText: string;
    taskTypeCode: number;
    xTaskId: number;
    xTaskTs: string;
    baPersonId?: number;
    faFall?: string;
    faFallId?: number;
    falBaPersonId?: number;
    faLeistungId?: number;
    fallnummer?: string;
    leistungModul?: string;
    modulId?: number;
    orgUnitId?: number;
    personBp?: string;
    personFt?: string;
    receiverEMail?: string;
    sar?: string;
    userId?: number;
    startDate?: string;
    userID_InBearbeitung?: number;
    doneDate?: string;
    userID_Erledigt?: number;

    constructor(data?: IPendenzenVerwaltung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IXLOVCode {
    xlovCodeId: number;
    code: number;
    text: string;
    value1?: string;
    value2?: string;
    sortKey: number;
    isActive: boolean;
}

export class XLOVCode implements IXLOVCode {
    xlovCodeId: number;
    code: number;
    text: string;
    value1?: string;
    value2?: string;
    sortKey: number;
    isActive: boolean;

    constructor(data?: IXLOVCode) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IXOrgUnit {
    code: number;
    text: string;
}

export class XOrgUnit implements IXOrgUnit {
    code: number;
    text: string;

    constructor(data?: IXOrgUnit) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface IVwUser {
    userId: number;
    name: string;
    logonName: string;
    displayText: string;
}

export class VwUser implements IVwUser {
    userId: number;
    name: string;
    logonName: string;
    displayText: string;

    constructor(data?: IVwUser) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface ILeistungsverantw {
    displayText: string;
}

export class Leistungsverantw implements ILeistungsverantw {
    displayText: string;

    constructor(data?: ILeistungsverantw) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface IPendenzgruppe {
    typ: string;
    name: string;
    id: number;
    typeCode: number;
    displayText: string;
    kuerzel?: string;
    abteilung?: string;
}

export class Pendenzgruppe implements IPendenzgruppe {
    typ: string;
    name: string;
    id: number;
    typeCode: number;
    displayText: string;
    kuerzel?: string;
    abteilung?: string;

    constructor(data?: IPendenzgruppe) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

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

interface IFalltraeger {
    id: number;
    name: string;
    vorName: string;
    benutzer: string;
    faFallId: number;
    nameVorname: string;
}

export class Falltraeger implements IFalltraeger {
    id: number;
    name: string;
    vorName: string;
    benutzer: string;
    faFallId: number;
    nameVorname: string;

    constructor(data?: IFalltraeger) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface IBetriffPerson {
    nameVorname: string;
    baPersonId?: number;
}

export class BetriffPerson implements IBetriffPerson {
    nameVorname: string;
    baPersonId?: number;

    constructor(data?: IBetriffPerson) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface IBetreffBeschreibung {
    subject: string;
    taskDescription: string;
}

export class BetreffBeschreibung implements IBetreffBeschreibung {
    subject: string;
    taskDescription: string;

    constructor(data?: IBetreffBeschreibung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

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

interface IModulenStatus {
    iconId: number;
    modulId: number;
    shortName: string;
}

export class ModulenStatus implements IModulenStatus {
    iconId: number;
    modulId: number;
    shortName: string;

    constructor(data?: IModulenStatus) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

interface IStatusEdit {
    jumpDisable: boolean;
    actionsDisable: boolean;
    setErledigtVisible: boolean;
    setBearbeitungDisable: boolean;
    forwardDisable: boolean;
    expirationDateReadOnly: boolean;
    subjectReadOnly: boolean;
    beschreibungReadOnly: boolean;
    receiverReadOnly: boolean;
    fallLeistungBetrifftPersonReadOnly: boolean;
    faLeistungIdReadOnly: boolean;
    responseTextReadOnly: boolean;
}

export class StatusEdit implements IStatusEdit {
    jumpDisable: boolean;
    actionsDisable: boolean;
    setErledigtDisable: boolean;
    setErledigtVisible: boolean;
    setBearbeitungDisable: boolean;
    forwardDisable: boolean;
    expirationDateReadOnly: boolean;
    subjectReadOnly: boolean;
    beschreibungReadOnly: boolean;
    receiverReadOnly: boolean;
    fallLeistungBetrifftPersonReadOnly: boolean;
    faLeistungIdReadOnly: boolean;
    responseTextReadOnly: boolean;

    constructor(data: IStatusEdit = null) {
        this.jumpDisable = data ? data.jumpDisable || false : null;
        this.actionsDisable = data ? data.actionsDisable || false : null;
        this.setErledigtDisable = data ? data.setBearbeitungDisable || false : null;
        this.setErledigtVisible = data ? data.setErledigtVisible || false : null;
        this.setBearbeitungDisable = data
            ? data.setBearbeitungDisable || false
            : null;
        this.forwardDisable = data ? data.forwardDisable || false : null;
        this.expirationDateReadOnly = data
            ? data.expirationDateReadOnly || false
            : null;
        this.subjectReadOnly = data ? data.subjectReadOnly || false : null;
        this.beschreibungReadOnly = data
            ? data.beschreibungReadOnly || false
            : null;
        this.receiverReadOnly = data ? data.receiverReadOnly || false : null;
        this.fallLeistungBetrifftPersonReadOnly = data
            ? data.fallLeistungBetrifftPersonReadOnly || false
            : null;
        this.faLeistungIdReadOnly = data
            ? data.faLeistungIdReadOnly || false
            : null;
        this.responseTextReadOnly = data
            ? data.responseTextReadOnly || false
            : null;

    }
}

interface IErfassungMutation {
    erfassung: string;
    mutation: string;
    toolTipErf: string;
    toolTipMut: string;
}

export class ErfassungMutation implements IErfassungMutation {
    erfassung: string;
    mutation: string;
    toolTipErf: string;
    toolTipMut: string;

    constructor(data: IErfassungMutation = null) {
        this.erfassung = data ? data.erfassung || '---' : null;
        this.mutation = data ? data.mutation || '---' : null;
        this.toolTipErf = data ? data.toolTipErf || '' : null;
        this.toolTipMut = data ? data.toolTipMut || '' : null;
    }
}
