import { Injectable } from '@angular/core';

import { Mitarbeiter, Person, Plausifehler } from './models';

@Injectable()
export class PlausifehlerService {

    static gridAdapter(lausifehlerListDatas: any): Array<any> {
        const data = lausifehlerListDatas.map(
            item => new Plausifehler(item)
        );
        return data;
    }

    static searchPlausifehlerAdapter(lausifehlerSearchDatas: any): any {

        return lausifehlerSearchDatas;
    }

    static PersonInitAdapter(PersonDatas: any): Array<any> {
        const data = PersonDatas.map(
            item => new Person(item)
        );
        return data;
    }

    static MitarbeiterAdapter(mitarbeiterDatas: any): Array<any> {
        const data = mitarbeiterDatas.map(
            item => new Mitarbeiter(item)
        );
        return data;
    }

}
