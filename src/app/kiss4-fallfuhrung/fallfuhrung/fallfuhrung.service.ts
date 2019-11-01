import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { ModelFallfuhrung, ModelFallRights, ModelGetConfig, ModelGetDataCombobox } from './models';

@Injectable()
export class FallfuhrungService {
    static getDataFallfuhrung(Fallfuhrung: any): Array<any> {
        return Fallfuhrung.map(
            fallfuhrung => new ModelFallfuhrung(fallfuhrung)
        );
    }

    // Get Config
    static getConfigAdapter(configData: any): any {
        return new ModelGetConfig(configData);
    }

    // Get Fall Rights
    static getFallRightsAdapter(fallRightsData: any): ModelFallRights {
        if (!isNullOrUndefined(fallRightsData)) {
            return new ModelFallRights(fallRightsData);
        }
        return new ModelFallRights();
    }

    // Map data combobox
    static getDataCbboxAdapter(dataCombobox: any): Array<any> {
        return dataCombobox.map(
            item => new ModelGetDataCombobox(item)
        );
    }

    //  Update FaLeistung
    static updateFaLeistungAdapter(data: any): any {
        return new ModelGetConfig(data);
    }

    // Map data AnzahlOffenePendenzen
    static getAnzahlOffenePendenzenAdapter(anzahlOffenePendenzen: any): any {
        if (!isNullOrUndefined(anzahlOffenePendenzen) && !isNullOrUndefined(anzahlOffenePendenzen.count)) {
            return anzahlOffenePendenzen.count;
        }
    }

    // Validation FaLeistung
    static validationFaLeistungAdapter(data: any): any {
        return new ModelGetConfig(data);
    }
}
