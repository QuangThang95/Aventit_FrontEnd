import { Injectable } from '@angular/core';

import { GemeindeDaten } from './models';

@Injectable()
export class GemeindeDatenService {

    static gridAdapter(gemeindeDatens: any): Array<any> {
        return gemeindeDatens.map(
            gemeindeDaten => new GemeindeDaten(gemeindeDaten)
        );
    }

    static syncDataAdapter(response: any): any {
        return { ...response };
    }

    static importDataAdapter(response: any): any {
        return { ...response };
    }

}
