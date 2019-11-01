import { Injectable } from '@angular/core';

import { GemeindeCode } from './models';

@Injectable()
export class GemeindeCodeService {

    static gridAdapter(gemeindeCodes: any): Array<any> {
        return gemeindeCodes.map(gemeindeCode => new GemeindeCode(gemeindeCode));
    }

}
