import { Injectable } from '@angular/core';
import { DPLSelectboxModel } from './models';

@Injectable()
export class VermogenService {
    static getPersonSelectboxDataAdapter(PersonSelectbox: any): Array<any> {
        return PersonSelectbox.map(
            item => new DPLSelectboxModel(item)
        );
    }
}
