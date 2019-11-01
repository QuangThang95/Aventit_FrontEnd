import { Injectable } from '@angular/core';
import {
    FaAktennotiz,
    TreeNav
} from './models';

@Injectable()
export class FaAktennotizService {
    /**
     * Transforms grid data FaAktennotiz recieved from the API into array of 'fa-aktennotiz' instances
     *
     * @param FaAktennotiz
     */
    static gridAdapter(faAktennotizs: any): Array<any> {
        return faAktennotizs.map(
            faAktennotiz => new FaAktennotiz(faAktennotiz)
        );
    }

    static getTreeNavigatorAdapter(treeNavigators: any): Array<any> {
        return treeNavigators.map(treeNavigator => new TreeNav(treeNavigator));
    }

    static kontaktartAdapter(data: any): any {
        return data;
    }
    static mitarbeiterAdapter(data: any): any {
        return data;
    }
    static theMenAdapter(data: any): any {
        return data;
    }
    static addFaAktennotiz(data: any): boolean {
        return data;
    }
    static deleteFaAktennotiz(data: any): any {
        return data;
    }
    static updateFaAktennotiz(data: any): any {
        return data;
    }
    static dauerAdapter(data: any): any {
        return data;
    }
    static configAdapter(data: any): any {
        return data;
    }
    static dokumentAktennotizenAdapter(data: any): any {
        return data;
    }
    static getDefaultKontartPartner(data: any): any {
        if (data && data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    }

}
