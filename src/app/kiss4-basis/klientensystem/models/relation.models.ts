export interface IRelation {
    baPerson_RelationID: number;
    baPersonID_1: number;
    baPersonID_2: number;
    baRelationID?: number;
    datumVon?: Date;
    datumBis?: Date;
    bemerkung: string;
    baPerson_RelationTS: any;
    person: string;
    personID: number;
    relationID?: number;
    age?: number;
    klient: boolean;
    glHaushalt: boolean;
    unterstuetzt: boolean;
    geschlechtCode?: number;
    code?: number;
    isEdit: boolean;
    dropdownboxData?: any;
    beziehung?: any;
}

export class Relation implements IRelation {
    isEdit: boolean;
    baPerson_RelationID: number;
    baPersonID_1: number;
    baPersonID_2: number;
    baRelationID?: number;
    datumVon?: Date;
    datumBis?: Date;
    bemerkung: string;
    baPerson_RelationTS: any;
    person: string;
    personID: number;
    relationID?: number;
    age?: number;
    klient: boolean;
    glHaushalt: boolean;
    unterstuetzt: boolean;
    geschlechtCode?: number;
    code?: number;
    dropdownboxData?: any;
    beziehung?: any;

    constructor(data?: IRelation) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                    this.code = this.relationID;
                    this.isEdit = false;
                }
            }
        }
    }
}
