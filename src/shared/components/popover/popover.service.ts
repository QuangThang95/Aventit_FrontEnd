import { Injectable } from '@angular/core';

import { Button } from './models';

@Injectable()
export class Service {

    static modelWrapper(buttons: any): Array<any> {
        return buttons.map(button => new Button(button));
    }

}
