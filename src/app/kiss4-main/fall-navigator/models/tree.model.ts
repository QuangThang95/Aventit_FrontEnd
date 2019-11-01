export interface IFallNavNavigatorTreeModel {
    id: any | undefined;
    parentId: string | null;
    type?: any;
    iconId?: any;
    name?: any;
    baPersonId: any | null;
    userId?: any | null;
    b?: any;
    f?: any;
    s?: any;
    i?: any;
    m?: any;
    a?: any;
    k?: any;
    faLeistungId?: any | null;
    fallTaskCount?: any;
    personCount?: any | undefined;
    taskCount?: any | undefined;
    orgUnitId?: any | null;
    ahvNummer: any;
    nNummer: any;
    navigatorZusatz: any;
    versichertennummer: any;
    gemeinde: any;
    kategorie: any;
    farbe: any | undefined;
    age: any;
    geschlechtName: any;
}
export class FallNavNavigatorTreeModel implements IFallNavNavigatorTreeModel {

    id: any | undefined;
    parentId: string | null;
    type?: any;
    iconId?: any;
    name?: any;
    baPersonId: any | null;
    userId?: any | null;
    b?: any;
    f?: any;
    s?: any;
    i?: any;
    m?: any;
    a?: any;
    k?: any;
    faLeistungId?: any | null;
    fallTaskCount?: any;
    personCount?: any | undefined;
    taskCount?: any | undefined;
    orgUnitId?: any | null;
    ahvNummer: any;
    nNummer: any;
    navigatorZusatz: any;
    versichertennummer: any;
    gemeinde: any;
    kategorie: any;
    farbe: any | undefined;
    age: any;
    geschlechtName: any;

    constructor(data?: FallNavNavigatorTreeModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
