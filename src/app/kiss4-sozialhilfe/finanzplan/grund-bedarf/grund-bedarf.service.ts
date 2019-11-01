import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BeratungsphaseFormData, DPLSelectboxModel, Result, StatusCodeModel } from './models';

@Injectable()
export class GrundBedarfService {
    // Map DPL zugewiesen & DPL bedarf select box data
    static getBerechnungsgrundlageSelcectboxDataAdapter(BerechnungsgrundlageSelectbox: any): Array<any> {
        return BerechnungsgrundlageSelectbox.map(
            item => new DPLSelectboxModel(item)
        );
    }
    // Map data when load Form data
    static loadFormDataAdapter(formDataGrundBedarf: any): Array<any> {
        return formDataGrundBedarf.map(
            itemData => new BeratungsphaseFormData(itemData)
        );
    }
    // Map data when update form data
    static updateFormDataAdapter(data: any): Result {
        if (!isNullOrUndefined(data)) {
            return new Result(data);
        }
        return new Result();
    }
    // Map status code data
    static getStatusCodeDataAdapter(StatusCode: any): Array<any> {
        return StatusCode.map(
            item => new StatusCodeModel(item)
        );
    }
}
