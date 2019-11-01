import { map } from 'rxjs/operators';
import { isArray } from 'util';
import { Injectable } from '@angular/core';
import {
    BarPerSon,
    LOVName,
    BerufSuchen,
    InstitutionSuchen
} from './models';

@Injectable()
export class ArbeitService {

    static bapersonAdapter(baperson: any): any {
        return new BarPerSon(Array.isArray(baperson) && baperson.length ? baperson[0] : null);
    }

    static lOVNameAdapter(lovNames: any): any {
        return lovNames.map(lovName => new LOVName(lovName));
    }

    static berufSuchenAdapter(berufSuchens: any): any {
        return berufSuchens.map(berufSuchen => new BerufSuchen(berufSuchen));
    }

    static institutionSuchenAdapter(institutionSuchens: any): any {

        return institutionSuchens.map(institutionSuchen => new InstitutionSuchen(institutionSuchen));
    }
    static saveAdapter(baperson: any): any {
        return baperson;
    }
}
