import { Injectable } from '@angular/core';

import { Baland } from './models/baland.model';

@Injectable()
export class BalandService {

    static gridAdapter(data: any): Array<any> {
        const dataBaland = data.map(
            item => new Baland(item)
        );
        return dataBaland;
    }

    static syncDataAdapter(response: any): any {
        return { ...response };
    }

}
