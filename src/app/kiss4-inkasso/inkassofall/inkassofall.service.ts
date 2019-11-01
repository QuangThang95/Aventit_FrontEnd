import { Injectable } from '@angular/core';

import { Inkassofall } from './models';

@Injectable()
export class InkassofallService {

    static gridAdapter(Inkassofalls: any): any {
        return Inkassofalls;
    }

    static getInkassofalls(Inkassofalls: any): any {
        return Inkassofalls.map(x => new Inkassofall(x));
    }

    static addInkassofallAdapter(Inkassofalls: any): any {
        return Inkassofalls.map(x => new Inkassofall(x));
    }

    static updateInkassofalls(ctlBfsFragenkatalog: any): any {
        return new Inkassofall(ctlBfsFragenkatalog);
    }

    static deleteInkassofallAdapter(response: any): any {
        return { ...response };
    }
}
