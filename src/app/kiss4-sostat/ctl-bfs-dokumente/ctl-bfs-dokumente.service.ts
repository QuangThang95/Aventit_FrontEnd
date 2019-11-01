import { Injectable } from '@angular/core';

import { ModelLeitfaden } from './models';

@Injectable()
export class CtlBfsDokumenteService {
    static getHyperlink(Leitfaden: any): any {
        return Leitfaden.map(
            leitfaden => new ModelLeitfaden(leitfaden)
        );
    }
}
