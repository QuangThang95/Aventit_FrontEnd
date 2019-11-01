import { Injectable } from '@angular/core';

import { KonfigurationList } from './models';

@Injectable()
export class KonfigurationService {

    static detailAdapter(konfigurations: any): any {
        const konfig = konfigurations;

        return konfig;
    }

    static gridAdapter(konfigurations: any): Array<any> {
        const konfigGrid = konfigurations.map(
            item => new KonfigurationList(item)
        );
        return konfigGrid;
    }

}
