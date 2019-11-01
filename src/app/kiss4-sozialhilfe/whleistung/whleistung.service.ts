import { Injectable } from '@angular/core';

import { CountRecord, DataGridBottom, ResultValue, TopFaLeistungValue, ValueReturn } from './models';
import { log } from 'util';

@Injectable()
export class WhLeistungService {

    // get data combobox
    static getDataCombobox(data: any): Array<any> {
        return data.map(cb => new ResultValue(cb));
    }

    // load data
    static getDataTop(data: any): TopFaLeistungValue {
        return new TopFaLeistungValue(data[0]);
    }

    // Load data grid bottom
    static getDataGridBottom(data: any): Array<any> {
        return data.map(cb => new DataGridBottom(cb));
    }

    //  Count data

    static getCountRecordData(data: any): CountRecord {
        return new CountRecord(data);
    }

    //  Delete
    static deletetRecordData(data: any): ValueReturn {
        return new ValueReturn(data);
    }

    // Update
    static updateData(data: any): any {
        return data;
    }

    // Update Vorsaldo
    static updateVorsaldoData(data: any): any {
        return new ValueReturn(data);
    }

    // GetAnzahlOffenePendenzen
    static getAnzahlOffenePendenzen(data: any): any {
        return data;
    }

    // Get message
    static getMLMessage(data: any): any {
        return data;
    }
    // getVorsaldoKbKostenstelle
    static getVorsaldoKbKostenstelle(data: any): any {
        return data;
    }
}
